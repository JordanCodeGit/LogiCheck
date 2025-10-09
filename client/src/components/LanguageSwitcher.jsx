import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = ({ variant = 'dropdown' }) => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = async (newLanguage) => {
    await setLanguage(newLanguage);
  };

  if (variant === 'toggle') {
    // Toggle button variant (for compact spaces like navbar)
    return (
      <button
        onClick={() => handleLanguageChange(language === 'en' ? 'id' : 'en')}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        title={t('common.language')}
      >
        <Globe className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {language === 'en' ? 'EN' : 'ID'}
        </span>
      </button>
    );
  }

  // Dropdown variant (for settings page)
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('settings.language.label')}
      </label>
      <div className="relative">
        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none
                   transition-colors cursor-pointer"
        >
          <option value="en">{t('settings.language.english')}</option>
          <option value="id">{t('settings.language.indonesian')}</option>
        </select>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t('settings.language.description')}
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500 italic">
        {t('settings.language.note')}
      </p>
    </div>
  );
};

export default LanguageSwitcher;
