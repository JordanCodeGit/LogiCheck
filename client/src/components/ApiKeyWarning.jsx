import { AlertCircle, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const ApiKeyWarning = () => {
  const { t } = useLanguage();
  
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-6 rounded-lg shadow-md transition-colors">
        <div className="flex items-start">
          <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
              {t('apiKeyWarning.title')}
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300 mb-4">
              {t('apiKeyWarning.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/settings"
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 dark:bg-yellow-700 text-white rounded-lg hover:bg-yellow-700 dark:hover:bg-yellow-800 transition-colors"
              >
                <Settings className="w-4 h-4" />
                {t('apiKeyWarning.goToSettings')}
              </Link>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-yellow-700 dark:text-yellow-300 border-2 border-yellow-600 dark:border-yellow-700 rounded-lg hover:bg-yellow-50 dark:hover:bg-gray-700 transition-colors"
              >
                {t('apiKeyWarning.getApiKey')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyWarning;
