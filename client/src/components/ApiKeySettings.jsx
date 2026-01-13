import { useState, useEffect } from 'react';
import { AlertCircle, Check, Key, TestTube, Zap, Server, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import Alert from './Alert';
import { getApiKey, saveApiKey, clearApiKey, validateApiKeyFormat, isUsingServerKey, setUseServerKey, clearServerKeyFlag } from '../utils/apiKeyUtils';
import { syncApiKeyToExtension, listenToExtensionChanges, initializeSync } from '../utils/extensionSync';
import { useLanguage } from '../contexts/LanguageContext';

// Special marker for server-managed API key (tidak mengekspos key sebenarnya)
const SERVER_KEY_MARKER = '__USE_SERVER_KEY__';

const ApiKeySettings = () => {
  const { t } = useLanguage();
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState({ message: '', type: '' });
  const [isTesting, setIsTesting] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [usingServerKey, setUsingServerKey] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  // Load stored key on mount and initialize sync with extension
  useEffect(() => {
    const initializeApiKey = async () => {
      // First, try to sync from extension
      const syncResult = await initializeSync();
      
      // Check if using server key
      if (isUsingServerKey()) {
        setUsingServerKey(true);
        setIsValid(true);
        return;
      }
      
      // Then load the key (either synced or existing)
      const storedKey = getApiKey();
      if (storedKey && storedKey !== SERVER_KEY_MARKER) {
        setApiKey(storedKey);
        setIsValid(validateApiKeyFormat(storedKey));
        
        if (syncResult.synced) {
          setStatus({ 
            message: t('settings.apiKey.status.syncedFrom'), 
            type: 'success' 
          });
        }
      }
    };

    initializeApiKey();

    // Listen for API key updates from extension
    listenToExtensionChanges((newApiKey) => {
      if (newApiKey) {
        if (newApiKey === SERVER_KEY_MARKER) {
          setUsingServerKey(true);
          setIsValid(true);
          setApiKey('');
        } else {
          setUsingServerKey(false);
          setApiKey(newApiKey);
          setIsValid(validateApiKeyFormat(newApiKey));
        }
        setStatus({ 
          message: t('settings.apiKey.status.updatedFrom'), 
          type: 'success' 
        });
      } else {
        setApiKey('');
        setIsValid(false);
        setUsingServerKey(false);
        setStatus({ 
          message: t('settings.apiKey.status.clearedNoExt'), 
          type: 'success' 
        });
      }
    });
  }, [t]);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setApiKey(value);
    const valid = validateApiKeyFormat(value);
    setIsValid(valid);
    
    if (value && !valid) {
      setStatus({ message: t('settings.apiKey.status.invalidFormat'), type: 'error' });
    } else if (valid) {
      setStatus({ message: t('settings.apiKey.status.formatOk'), type: 'success' });
    } else {
      setStatus({ message: '', type: '' });
    }
  };

  // Handle selecting server-managed API key
  const handleUseServerKey = async () => {
    setUsingServerKey(true);
    setIsValid(true);
    setApiKey('');
    
    // Save the server key marker
    setUseServerKey();
    
    // Sync to extension
    const syncResult = await syncApiKeyToExtension(SERVER_KEY_MARKER);
    
    if (syncResult.success) {
      setStatus({ 
        message: t('settings.apiKey.status.serverKeyActivated') || '✅ Server key activated! Synced with extension.', 
        type: 'success' 
      });
    } else {
      setStatus({ 
        message: t('settings.apiKey.status.serverKeyActivatedNoExt') || '✅ Server key activated! (Extension not detected)', 
        type: 'success' 
      });
    }
  };

  // Save API key to localStorage
  const handleSave = async () => {
    const trimmedKey = apiKey.trim();
    if (!validateApiKeyFormat(trimmedKey)) {
      setStatus({ message: t('settings.apiKey.status.invalidFormat'), type: 'error' });
      return;
    }

    saveApiKey(trimmedKey);
    
    // Sync to extension
    const syncResult = await syncApiKeyToExtension(trimmedKey);
    
    if (syncResult.success) {
      setStatus({ 
        message: t('settings.apiKey.status.saved'), 
        type: 'success' 
      });
    } else {
      setStatus({ 
        message: t('settings.apiKey.status.savedNoExt'), 
        type: 'success' 
      });
    }
  };

  // Test API key by making a lightweight request
  const handleTest = async () => {
    const trimmedKey = apiKey.trim();
    if (!validateApiKeyFormat(trimmedKey)) {
      setStatus({ message: t('settings.apiKey.status.failed'), type: 'error' });
      return;
    }

    setIsTesting(true);
    setStatus({ message: t('settings.apiKey.status.testing'), type: 'info' });

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${encodeURIComponent(trimmedKey)}`;
      const body = {
        contents: [{ parts: [{ text: 'Hello' }] }]
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.status === 200) {
        setStatus({ 
          message: t('settings.apiKey.status.valid'), 
          type: 'success' 
        });
      } else if (response.status === 401 || response.status === 403) {
        setStatus({ 
          message: t('settings.apiKey.status.accessDenied'), 
          type: 'error' 
        });
      } else {
        setStatus({ 
          message: `${t('settings.apiKey.status.unexpectedResponse')} ${response.status}`, 
          type: 'error' 
        });
      }
    } catch (error) {
      setStatus({ 
        message: t('settings.apiKey.status.networkError'), 
        type: 'error' 
      });
      console.error('API Key test error:', error);
    } finally {
      setIsTesting(false);
    }
  };

  // Clear API key
  const handleClear = async () => {
    setApiKey('');
    clearApiKey();
    clearServerKeyFlag();
    setIsValid(false);
    setUsingServerKey(false);
    
    // Sync to extension
    const syncResult = await syncApiKeyToExtension('');
    
    if (syncResult.success) {
      setStatus({ 
        message: t('settings.apiKey.status.cleared'), 
        type: 'success' 
      });
    } else {
      setStatus({ 
        message: t('settings.apiKey.status.clearedNoExt'), 
        type: 'success' 
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-8 transition-colors">
        <div className="flex items-center gap-3 mb-6">
          <Key className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('settings.apiKey.title')}</h2>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('settings.apiKey.description')}
          </p>
        </div>

        {/* API Key Input Section - At the Top */}
        <div className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border-2 border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {t('settings.apiKey.yourApiKey')}
            </h3>
          </div>

          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('settings.apiKey.label')}
          </label>
          
          {usingServerKey ? (
            // Show placeholder when using server key
            <div className="w-full px-4 py-3 border border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg mb-3 flex items-center gap-2">
              <Server className="w-4 h-4" />
              <span>{t('settings.apiKey.serverKeyActive') || 'Using Server-Managed API Key'}</span>
            </div>
          ) : (
            // Show input field for custom key
            <input
              id="apiKey"
              type="text"
              value={apiKey}
              onChange={handleInputChange}
              placeholder={t('settings.apiKey.placeholder')}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all mb-3"
            />
          )}
          
          {usingServerKey && (
            <p className="mb-4 text-sm text-green-600 dark:text-green-400 flex items-start gap-2">
              <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{t('settings.apiKey.serverKeyNote') || 'API key is securely managed on the server. No key is stored in your browser.'}</span>
            </p>
          )}

          <div className="flex flex-wrap gap-3 mb-4">
            {usingServerKey ? (
              // When using server key, show "Use Custom Key" button
              <button
                onClick={() => {
                  setUsingServerKey(false);
                  clearServerKeyFlag();
                  setApiKey('');
                  setIsValid(false);
                  setStatus({ 
                    message: t('settings.apiKey.enterCustomKey'), 
                    type: 'info' 
                  });
                }}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                <Key className="w-5 h-5" />
                {t('settings.apiKey.useCustomKey')}
              </button>
            ) : (
              // When using custom key, show Save and Test buttons
              <>
                <button
                  onClick={handleSave}
                  disabled={!isValid}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  <Check className="w-5 h-5" />
                  {t('settings.apiKey.save')}
                </button>

                <button
                  onClick={handleTest}
                  disabled={!isValid || isTesting}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  <TestTube className="w-5 h-5" />
                  {isTesting ? t('settings.apiKey.testing') : t('settings.apiKey.test')}
                </button>
              </>
            )}

            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              <AlertCircle className="w-5 h-5" />
              {t('settings.apiKey.clear')}
            </button>
          </div>

          {status.message && (
            <Alert type={status.type} message={status.message} />
          )}
        </div>

        {/* Server-Managed API Key Section */}
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-700">
          <div className="flex items-center gap-2 mb-3">
            <Server className="w-5 h-5 text-green-600 dark:text-green-400" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {t('settings.apiKey.quickStart.title') || 'Quick Start - Server Key'}
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            {t('settings.apiKey.quickStart.description') || 'Use our server-managed API key to get started instantly. No setup required!'}
          </p>
          <button
            onClick={handleUseServerKey}
            className={`w-full px-4 py-3 rounded-lg font-medium transition-all ${
              usingServerKey
                ? 'bg-green-500 text-white ring-2 ring-green-600'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-900/30 border border-green-300 dark:border-green-600'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {usingServerKey && <Check className="w-4 h-4" />}
              <Server className="w-4 h-4" />
              {t('settings.apiKey.useServerKey') || 'Use Server Key'}
            </div>
          </button>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            {t('settings.apiKey.serverKeyInfo') || '⚡ Instant access • 🔒 Secure • May have rate limits during high traffic'}
          </p>
        </div>

        {/* Custom API Key Section */}
        <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {t('settings.apiKey.ownKey.title')}
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            {t('settings.apiKey.ownKey.description')}
          </p>

          {/* Instructions Dropdown */}
          <div className="mb-4">
            <button
              onClick={() => setIsInstructionsOpen(!isInstructionsOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 rounded-lg transition-colors text-left"
            >
              <span className="font-medium text-indigo-900 dark:text-indigo-200">
                {t('settings.apiKey.ownKey.instructionsTitle')}
              </span>
              {isInstructionsOpen ? (
                <ChevronUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              )}
            </button>

            {isInstructionsOpen && (
              <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-indigo-200 dark:border-indigo-700 animate-fade-in">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  {t('settings.apiKey.ownKey.stepByStep')}
                </h4>
                <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium mb-1">{t('settings.apiKey.ownKey.step1Title')}</p>
                      <a 
                        href="https://aistudio.google.com/app/apikey" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline break-all text-sm"
                      >
                        aistudio.google.com/app/apikey
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <div>
                      <p className="font-medium mb-1">{t('settings.apiKey.ownKey.step2Title')}</p>
                      <p className="text-gray-600 dark:text-gray-400">{t('settings.apiKey.ownKey.step2Desc')}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <div>
                      <p className="font-medium mb-1">{t('settings.apiKey.ownKey.step3Title')}</p>
                      <p className="text-gray-600 dark:text-gray-400">{t('settings.apiKey.ownKey.step3Desc')}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <div>
                      <p className="font-medium mb-1">{t('settings.apiKey.ownKey.step4Title')}</p>
                      <p className="text-gray-600 dark:text-gray-400">{t('settings.apiKey.ownKey.step4Desc')}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                    <div>
                      <p className="font-medium mb-1">{t('settings.apiKey.ownKey.step5Title')}</p>
                      <p className="text-gray-600 dark:text-gray-400">{t('settings.apiKey.ownKey.step5Desc')}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span>
                    <div>
                      <p className="font-medium mb-1">{t('settings.apiKey.ownKey.step6Title')}</p>
                      <p className="text-gray-600 dark:text-gray-400">{t('settings.apiKey.ownKey.step6Desc')}</p>
                    </div>
                  </li>
                </ol>

                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                  <p className="text-sm text-green-800 dark:text-green-300 flex items-start gap-2">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{t('settings.apiKey.ownKey.freeTier')}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security Note Section */}
        <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            {t('settings.apiKey.security.title')}
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <li>• {t('settings.apiKey.security.point1')}</li>
            <li>• {t('settings.apiKey.security.point2')}</li>
            <li>• {t('settings.apiKey.security.point3')}</li>
            <li>• {t('settings.apiKey.security.point4')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySettings;
