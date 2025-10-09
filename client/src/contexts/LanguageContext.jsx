import { createContext, useContext, useState, useEffect } from 'react';
import { translations, t } from '../i18n/translations';
import { getLanguage, setLanguage as saveLanguage, onLanguageChange } from '../utils/languageUtils';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState('en');
  const [loading, setLoading] = useState(true);

  // Load language on mount
  useEffect(() => {
    const loadLanguage = () => {
      try {
        const savedLanguage = getLanguage();
        setLanguageState(savedLanguage);
      } catch (error) {
        console.error('Failed to load language:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLanguage();

    // Listen for language changes
    onLanguageChange((newLanguage) => {
      setLanguageState(newLanguage);
    });
  }, []);

  // Change language
  const setLanguage = (newLanguage) => {
    try {
      saveLanguage(newLanguage);
      setLanguageState(newLanguage);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

  // Translation function
  const translate = (key, replacements = {}) => {
    let translation = t(language, key);
    
    // Replace placeholders like {{name}}
    Object.keys(replacements).forEach(placeholder => {
      translation = translation.replace(
        new RegExp(`{{${placeholder}}}`, 'g'),
        replacements[placeholder]
      );
    });
    
    return translation;
  };

  const value = {
    language,
    setLanguage,
    t: translate,
    translations: translations[language],
    loading,
  };

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
