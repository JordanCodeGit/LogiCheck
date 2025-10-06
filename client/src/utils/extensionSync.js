/**
 * Extension Sync Utility
 * Handles bidirectional synchronization of API key between web app and browser extension
 */

const API_KEY_STORAGE_KEY = 'GEMINI_API_KEY';

/**
 * Check if the LogiCheck extension is installed
 * @returns {Promise<boolean>} Whether the extension is available
 */
export const isExtensionInstalled = async () => {
  // Try to communicate with the extension via content script
  return new Promise((resolve) => {
    let responded = false;
    
    const listener = (event) => {
      if (event.source !== window) return;
      if (event.data.type === "LOGICHECK_GET_API_KEY_RESPONSE" && 
          event.data.source === "logicheck-extension") {
        responded = true;
        window.removeEventListener("message", listener);
        resolve(true);
      }
    };
    
    window.addEventListener("message", listener);
    
    // Send a test message
    window.postMessage({
      type: "LOGICHECK_GET_API_KEY",
      source: "logicheck-web"
    }, "*");
    
    // Timeout after 500ms
    setTimeout(() => {
      window.removeEventListener("message", listener);
      if (!responded) {
        resolve(false);
      }
    }, 500);
  });
};

/**
 * Sync API key from localStorage to extension storage
 * @param {string} apiKey - The API key to sync
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const syncApiKeyToExtension = async (apiKey) => {
  try {
    return new Promise((resolve) => {
      let responded = false;
      
      const listener = (event) => {
        if (event.source !== window) return;
        if (event.data.type === "LOGICHECK_API_KEY_SYNC_RESPONSE" && 
            event.data.source === "logicheck-extension") {
          responded = true;
          window.removeEventListener("message", listener);
          resolve({ 
            success: event.data.success, 
            message: event.data.success ? 'API key synced to extension' : 'Failed to sync' 
          });
        }
      };
      
      window.addEventListener("message", listener);
      
      // Send message to content script
      window.postMessage({
        type: "LOGICHECK_API_KEY_SYNC",
        source: "logicheck-web",
        apiKey: apiKey
      }, "*");
      
      // Timeout after 1 second
      setTimeout(() => {
        window.removeEventListener("message", listener);
        if (!responded) {
          resolve({ 
            success: false, 
            message: 'Extension not available or timeout' 
          });
        }
      }, 1000);
    });
  } catch (error) {
    console.error('Error syncing to extension:', error);
    return { 
      success: false, 
      message: error.message 
    };
  }
};

/**
 * Listen for API key changes from the extension
 * @param {Function} callback - Called when API key is updated from extension
 */
export const listenToExtensionChanges = (callback) => {
  const messageListener = (event) => {
    if (event.source !== window) return;
    
    if (event.data.type === "LOGICHECK_API_KEY_SYNC" && 
        event.data.source === "logicheck-extension") {
      // Update localStorage
      if (event.data.apiKey) {
        localStorage.setItem(API_KEY_STORAGE_KEY, event.data.apiKey);
      } else {
        localStorage.removeItem(API_KEY_STORAGE_KEY);
      }
      
      // Notify the callback
      callback(event.data.apiKey);
    }
  };

  window.addEventListener("message", messageListener);
  
  // Return cleanup function
  return () => {
    window.removeEventListener("message", messageListener);
  };
};

/**
 * Initialize sync on page load
 * Checks if extension has an API key and syncs it to localStorage if needed
 * @returns {Promise<{synced: boolean, apiKey: string|null}>}
 */
export const initializeSync = async () => {
  try {
    return new Promise((resolve) => {
      let responded = false;
      
      const listener = (event) => {
        if (event.source !== window) return;
        if (event.data.type === "LOGICHECK_GET_API_KEY_RESPONSE" && 
            event.data.source === "logicheck-extension") {
          responded = true;
          window.removeEventListener("message", listener);
          
          if (event.data.apiKey) {
            // Extension has an API key, sync it to localStorage
            const localApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
            if (!localApiKey || localApiKey !== event.data.apiKey) {
              localStorage.setItem(API_KEY_STORAGE_KEY, event.data.apiKey);
              resolve({ synced: true, apiKey: event.data.apiKey });
            } else {
              resolve({ synced: false, apiKey: event.data.apiKey });
            }
          } else {
            resolve({ synced: false, apiKey: null });
          }
        }
      };
      
      window.addEventListener("message", listener);
      
      // Request API key from extension
      window.postMessage({
        type: "LOGICHECK_GET_API_KEY",
        source: "logicheck-web"
      }, "*");
      
      // Timeout after 1 second
      setTimeout(() => {
        window.removeEventListener("message", listener);
        if (!responded) {
          resolve({ synced: false, apiKey: null });
        }
      }, 1000);
    });
  } catch (error) {
    console.error('Error initializing sync:', error);
    return { synced: false, apiKey: null };
  }
};
