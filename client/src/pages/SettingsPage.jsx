import ApiKeySettings from '../components/ApiKeySettings';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe, MessageSquare, ExternalLink } from 'lucide-react';

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

        {/* Testimonial & Feedback Section */}
        <div className="max-w-2xl mx-auto mt-6 px-4">
          <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20 rounded-lg shadow-md border-2 border-purple-200 dark:border-purple-700 p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {t('settings.feedback.title')}
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {t('settings.feedback.description')}
            </p>
            <a
              href="https://forms.gle/k1E8PUjuyhJVZLDMA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{t('settings.feedback.button')}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
