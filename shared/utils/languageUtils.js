/**
 * Language utility functions for LogiCheck
 * Handles language storage and retrieval across web and extension
 */

const LANGUAGE_KEY = 'LOGICHECK_LANGUAGE';
const DEFAULT_LANGUAGE = 'en';

/**
 * Get the current language setting
 * Works in both browser (localStorage) and extension (chrome.storage.sync)
 * @returns {Promise<string>} Language code ('en' or 'id')
 */
export const getLanguage = async () => {
  // Try extension storage first (if available)
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
    return new Promise((resolve) => {
      chrome.storage.sync.get([LANGUAGE_KEY], (result) => {
        resolve(result[LANGUAGE_KEY] || DEFAULT_LANGUAGE);
      });
    });
  }
  
  // Fallback to localStorage for web app
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(LANGUAGE_KEY) || DEFAULT_LANGUAGE;
  }
  
  return DEFAULT_LANGUAGE;
};

/**
 * Set the language preference
 * Saves to both localStorage and chrome.storage.sync (if available)
 * @param {string} language - Language code ('en' or 'id')
 * @returns {Promise<void>}
 */
export const setLanguage = async (language) => {
  // Validate language
  if (!['en', 'id'].includes(language)) {
    console.warn('Invalid language:', language, 'Defaulting to en');
    language = DEFAULT_LANGUAGE;
  }
  
  // Save to localStorage (web app)
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(LANGUAGE_KEY, language);
  }
  
  // Save to chrome.storage.sync (extension)
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ [LANGUAGE_KEY]: language }, () => {
        resolve();
      });
    });
  }
};

/**
 * Listen for language changes
 * @param {Function} callback - Callback function that receives new language
 */
export const onLanguageChange = (callback) => {
  // Listen to chrome.storage changes (extension)
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'sync' && changes[LANGUAGE_KEY]) {
        callback(changes[LANGUAGE_KEY].newValue);
      }
    });
  }
  
  // Listen to localStorage changes (web app - across tabs)
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key === LANGUAGE_KEY && e.newValue) {
        callback(e.newValue);
      }
    });
  }
};

export default {
  getLanguage,
  setLanguage,
  onLanguageChange,
  LANGUAGE_KEY,
  DEFAULT_LANGUAGE,
};
