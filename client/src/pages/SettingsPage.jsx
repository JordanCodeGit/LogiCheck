import ApiKeySettings from '../components/ApiKeySettings';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

const SettingsPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950 dark:via-gray-900 dark:to-purple-950 py-8 sm:py-12 transition-colors">
      <div className="container mx-auto">
        <div className="text-center mb-8 px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {t('settings.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t('settings.subtitle')}
          </p>
        </div>
        
        {/* Language Settings Section */}
        <div className="max-w-2xl mx-auto mb-6 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border-2 border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {t('settings.language.title')}
              </h2>
            </div>
            <LanguageSwitcher variant="dropdown" />
          </div>
        </div>

        <ApiKeySettings />
      </div>
    </div>
  );
};

export default SettingsPage;
