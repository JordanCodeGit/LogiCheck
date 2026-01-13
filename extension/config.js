// Lightweight config helper for the extension runtime
// This file runs in the browser/service worker and must be a plain ES module.
// It exposes a small helper to read the Gemini API key from chrome.storage.local.

// Backend API URL for server-managed key
export const BACKEND_API_URL = 'https://logicheck-api.onrender.com/api';

// Special marker for server key mode
export const SERVER_KEY_MARKER = '__USE_SERVER_KEY__';

export async function getApiKey() {
  return new Promise((resolve) => {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(['GEMINI_API_KEY'], (result) => {
          const key = result?.GEMINI_API_KEY || null;
          // Return null if it's the server key marker (will trigger server mode)
          if (key === SERVER_KEY_MARKER) {
            resolve(null);
          } else {
            resolve(key);
          }
        });
      } else {
        resolve(null);
      }
    } catch (e) {
      console.error('Error reading GEMINI_API_KEY from storage', e);
      resolve(null);
    }
  });
}

export async function isUsingServerKey() {
  return new Promise((resolve) => {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(['USE_SERVER_KEY'], (result) => {
          resolve(result?.USE_SERVER_KEY === true);
        });
      } else {
        resolve(false);
      }
    } catch (e) {
      resolve(false);
    }
  });
}

export async function setUseServerKey(value) {
  return new Promise((resolve) => {
    try {
      chrome.storage.local.set({ USE_SERVER_KEY: value }, () => {
        if (value) {
          // Clear any existing API key when switching to server mode
          chrome.storage.local.remove('GEMINI_API_KEY', () => resolve(true));
        } else {
          resolve(true);
        }
      });
    } catch (e) {
      resolve(false);
    }
  });
}
