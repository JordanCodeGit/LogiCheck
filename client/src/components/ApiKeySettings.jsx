import { useState, useEffect } from 'react';
import { AlertCircle, Check, Key, TestTube } from 'lucide-react';
import Alert from './Alert';
import { getApiKey, saveApiKey, clearApiKey, validateApiKeyFormat } from '../utils/apiKeyUtils';
import { syncApiKeyToExtension, listenToExtensionChanges, initializeSync } from '../utils/extensionSync';

const ApiKeySettings = () => {
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState({ message: '', type: '' });
  const [isTesting, setIsTesting] = useState(false);
  const [isValid, setIsValid] = useState(false);

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
        setStatus({ 
          message: '🔄 API Key updated from extension', 
          type: 'success' 
        });
      } else {
        setApiKey('');
        setIsValid(false);
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
    
    if (value && !valid) {
      setStatus({ message: 'Key format looks invalid', type: 'error' });
    } else if (valid) {
      setStatus({ message: 'Key format looks OK', type: 'success' });
    } else {
      setStatus({ message: '', type: '' });
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
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center gap-3 mb-6">
          <Key className="w-8 h-8 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">API Key Settings</h2>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Enter your Gemini API key below. This key is stored <strong>locally</strong> in 
            your browser and is <strong>never uploaded</strong> to any server.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
              <div className="text-sm text-blue-700">
                <p className="font-semibold mb-1">Get your API key:</p>
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-800"
                >
                  Google AI Studio → Create API Key
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
            Gemini API Key
          </label>
          <input
            id="apiKey"
            type="text"
            value={apiKey}
            onChange={handleInputChange}
            placeholder="PASTE_YOUR_GEMINI_KEY_HERE"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Check className="w-5 h-5" />
            Save API Key
          </button>

          <button
            onClick={handleTest}
            disabled={!isValid || isTesting}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <TestTube className="w-5 h-5" />
            {isTesting ? 'Testing...' : 'Test Key'}
          </button>

          <button
            onClick={handleClear}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear
          </button>
        </div>

        {status.message && (
          <Alert type={status.type} message={status.message} />
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🔐 Security Note
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
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
