import { useState, useEffect } from 'react';
import { AlertCircle, Check, Key, TestTube, Zap, Clock, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import Alert from './Alert';
import { getApiKey, saveApiKey, clearApiKey, validateApiKeyFormat } from '../utils/apiKeyUtils';
import { syncApiKeyToExtension, listenToExtensionChanges, initializeSync } from '../utils/extensionSync';

// Shared API Keys yang disediakan
const SHARED_API_KEYS = [
  { id: 1, key: 'AIzaSyDfRha-Fa2HcEO_iLSKv8EpTklKud6hhi8', label: 'Shared Key 1' },
  { id: 2, key: 'AIzaSyDfRha-Fa2HcEO_iLSKv8EpTklKud6hhi8', label: 'Shared Key 2' },
  { id: 3, key: 'AIzaSyBdb8YgwUjjt8Ucd20kHP0IoTKtejytsUU', label: 'Shared Key 3' },
  { id: 4, key: 'AIzaSyDV6bL_YFF6qdPHTIP37EIhV2jeUnYBaHo', label: 'Shared Key 4' },
];

const ApiKeySettings = () => {
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState({ message: '', type: '' });
  const [isTesting, setIsTesting] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isUsingSharedKey, setIsUsingSharedKey] = useState(false);
  const [selectedSharedKeyId, setSelectedSharedKeyId] = useState(null);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  // Load stored key on mount and initialize sync with extension
  useEffect(() => {
    const initializeApiKey = async () => {
      // First, try to sync from extension
      const syncResult = await initializeSync();
      
      // Then load the key (either synced or existing)
      const storedKey = getApiKey();
      if (storedKey) {
        setApiKey(storedKey);
        setIsValid(validateApiKeyFormat(storedKey));
        
        // Check if it's a shared key and get its ID
        const sharedKeyMatch = SHARED_API_KEYS.find(k => k.key === storedKey);
        if (sharedKeyMatch) {
          setIsUsingSharedKey(true);
          setSelectedSharedKeyId(sharedKeyMatch.id);
        }
        
        if (syncResult.synced) {
          setStatus({ 
            message: '🔄 API Key synced from extension', 
            type: 'success' 
          });
        }
      }
    };

    initializeApiKey();

    // Listen for API key updates from extension
    listenToExtensionChanges((newApiKey) => {
      if (newApiKey) {
        setApiKey(newApiKey);
        setIsValid(validateApiKeyFormat(newApiKey));
        const sharedKeyMatch = SHARED_API_KEYS.find(k => k.key === newApiKey);
        if (sharedKeyMatch) {
          setIsUsingSharedKey(true);
          setSelectedSharedKeyId(sharedKeyMatch.id);
        } else {
          setIsUsingSharedKey(false);
          setSelectedSharedKeyId(null);
        }
        setStatus({ 
          message: '🔄 API Key updated from extension', 
          type: 'success' 
        });
      } else {
        setApiKey('');
        setIsValid(false);
        setIsUsingSharedKey(false);
        setSelectedSharedKeyId(null);
        setStatus({ 
          message: '🔄 API Key cleared from extension', 
          type: 'success' 
        });
      }
    });
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setApiKey(value);
    const valid = validateApiKeyFormat(value);
    setIsValid(valid);
    
    // Check if it's a shared key and get its ID
    const sharedKeyMatch = SHARED_API_KEYS.find(k => k.key === value);
    if (sharedKeyMatch) {
      setIsUsingSharedKey(true);
      setSelectedSharedKeyId(sharedKeyMatch.id);
    } else {
      setIsUsingSharedKey(false);
      setSelectedSharedKeyId(null);
    }
    
    if (value && !valid) {
      setStatus({ message: 'Key format looks invalid', type: 'error' });
    } else if (valid) {
      setStatus({ message: 'Key format looks OK', type: 'success' });
    } else {
      setStatus({ message: '', type: '' });
    }
  };

  // Handle selecting a shared API key
  const handleSelectSharedKey = async (sharedKey) => {
    setApiKey(sharedKey.key);
    setIsValid(true);
    setIsUsingSharedKey(true);
    setSelectedSharedKeyId(sharedKey.id);
    
    // Automatically save the shared key
    saveApiKey(sharedKey.key);
    
    // Sync to extension
    const syncResult = await syncApiKeyToExtension(sharedKey.key);
    
    if (syncResult.success) {
      setStatus({ 
        message: `✅ ${sharedKey.label} activated! Note: Shared keys may have slower performance.`, 
        type: 'warning' 
      });
    } else {
      setStatus({ 
        message: `✅ ${sharedKey.label} activated! (extension not available) Note: Shared keys may have slower performance.`, 
        type: 'warning' 
      });
    }
  };

  // Save API key to localStorage
  const handleSave = async () => {
    const trimmedKey = apiKey.trim();
    if (!validateApiKeyFormat(trimmedKey)) {
      setStatus({ message: 'Invalid API key format', type: 'error' });
      return;
    }

    saveApiKey(trimmedKey);
    
    // Sync to extension
    const syncResult = await syncApiKeyToExtension(trimmedKey);
    
    if (syncResult.success) {
      setStatus({ 
        message: '✅ API Key saved and synced to extension!', 
        type: 'success' 
      });
    } else {
      setStatus({ 
        message: '✅ API Key saved (extension not available)', 
        type: 'success' 
      });
    }
  };

  // Test API key by making a lightweight request
  const handleTest = async () => {
    const trimmedKey = apiKey.trim();
    if (!validateApiKeyFormat(trimmedKey)) {
      setStatus({ message: 'Key failed validation', type: 'error' });
      return;
    }

    setIsTesting(true);
    setStatus({ message: 'Testing API key...', type: 'info' });

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
          message: '✅ API Key is valid and working!', 
          type: 'success' 
        });
      } else if (response.status === 401 || response.status === 403) {
        setStatus({ 
          message: '❌ API Key is invalid or access denied', 
          type: 'error' 
        });
      } else {
        setStatus({ 
          message: `⚠️ Unexpected response: ${response.status}`, 
          type: 'error' 
        });
      }
    } catch (error) {
      setStatus({ 
        message: '❌ Network error while testing key', 
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
    setIsValid(false);
    setIsUsingSharedKey(false);
    setSelectedSharedKeyId(null);
    
    // Sync to extension
    const syncResult = await syncApiKeyToExtension('');
    
    if (syncResult.success) {
      setStatus({ 
        message: '🗑️ API Key cleared and synced to extension', 
        type: 'success' 
      });
    } else {
      setStatus({ 
        message: '🗑️ API Key cleared (extension not available)', 
        type: 'success' 
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 transition-colors">
        <div className="flex items-center gap-3 mb-6">
          <Key className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">API Key Settings</h2>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You have two options: use a <strong>shared API key</strong> for quick start (may be slower), 
            or use <strong>your own API key</strong> for optimal performance.
          </p>
        </div>

        {/* API Key Input Section - At the Top */}
        <div className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border-2 border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Your API Key
            </h3>
          </div>

          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gemini API Key
          </label>
          <input
            id="apiKey"
            type="text"
            value={apiKey}
            onChange={handleInputChange}
            placeholder="PASTE_YOUR_GEMINI_KEY_HERE"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all mb-3"
          />
          
          {isUsingSharedKey && (
            <p className="mb-4 text-sm text-yellow-600 dark:text-yellow-400 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>You are currently using a shared key. For better performance, consider using your own key.</span>
            </p>
          )}

          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={handleSave}
              disabled={!isValid}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <Check className="w-5 h-5" />
              Save API Key
            </button>

            <button
              onClick={handleTest}
              disabled={!isValid || isTesting}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <TestTube className="w-5 h-5" />
              {isTesting ? 'Testing...' : 'Test Key'}
            </button>

            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              <AlertCircle className="w-5 h-5" />
              Clear
            </button>
          </div>

          {status.message && (
            <Alert type={status.type} message={status.message} />
          )}
        </div>

        {/* Shared API Keys Section */}
        <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Quick Start - Shared API Keys
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Click any button below to instantly use a shared key. <strong>Note:</strong> These keys are shared among users and may have slower response times due to API rate limits.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {SHARED_API_KEYS.map((sharedKey) => (
              <button
                key={sharedKey.id}
                onClick={() => handleSelectSharedKey(sharedKey)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  selectedSharedKeyId === sharedKey.id
                    ? 'bg-yellow-500 text-white ring-2 ring-yellow-600'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-600'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {selectedSharedKeyId === sharedKey.id && <Check className="w-4 h-4" />}
                  {sharedKey.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom API Key Section */}
        <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Optimal Performance - Your Own API Key
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            For faster and more reliable performance, use your own Gemini API key. Your key is stored <strong>locally</strong> and <strong>never uploaded</strong> to our servers.
          </p>

          {/* Instructions Dropdown */}
          <div className="mb-4">
            <button
              onClick={() => setIsInstructionsOpen(!isInstructionsOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 rounded-lg transition-colors text-left"
            >
              <span className="font-medium text-indigo-900 dark:text-indigo-200">
                📝 How to Get Your Free API Key
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
                  Step-by-Step Guide:
                </h4>
                <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <div>
                      <p className="font-medium mb-1">Visit Google AI Studio</p>
                      <a 
                        href="https://aistudio.google.com/app/apikey" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline"
                      >
                        aistudio.google.com/app/apikey
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <div>
                      <p className="font-medium mb-1">Sign in with your Google Account</p>
                      <p className="text-gray-600 dark:text-gray-400">Use any Google account (Gmail, Workspace, etc.)</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <div>
                      <p className="font-medium mb-1">Click "Create API Key" button</p>
                      <p className="text-gray-600 dark:text-gray-400">You'll see it in the main page after signing in</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <div>
                      <p className="font-medium mb-1">Select or Create a Google Cloud Project</p>
                      <p className="text-gray-600 dark:text-gray-400">You can create a new project or use an existing one</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                    <div>
                      <p className="font-medium mb-1">Copy your API Key</p>
                      <p className="text-gray-600 dark:text-gray-400">It starts with "AIza..." - Click the copy button</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span>
                    <div>
                      <p className="font-medium mb-1">Paste the key in the field below</p>
                      <p className="text-gray-600 dark:text-gray-400">Then click "Save API Key" to start using LogiCheck!</p>
                    </div>
                  </li>
                </ol>

                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                  <p className="text-sm text-green-800 dark:text-green-300 flex items-start gap-2">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span><strong>Free Tier:</strong> Google provides generous free quotas for Gemini API. No credit card required to start!</span>
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
            🔐 Security Note
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <li>• Your API key is stored only in your browser's localStorage</li>
            <li>• The key is sent directly to Google's Gemini API from your browser</li>
            <li>• LogiCheck servers never see or store your API key</li>
            <li>• You can clear your key at any time</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySettings;
