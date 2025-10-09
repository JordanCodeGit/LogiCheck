/**
 * Language utility functions for LogiCheck Client
 * Handles language storage and retrieval in browser
 */

const LANGUAGE_KEY = 'LOGICHECK_LANGUAGE';
const DEFAULT_LANGUAGE = 'en';

/**
 * Get the current language setting from localStorage
 * @returns {string} Language code ('en' or 'id')
 */
export const getLanguage = () => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(LANGUAGE_KEY) || DEFAULT_LANGUAGE;
  }
  return DEFAULT_LANGUAGE;
};

/**
 * Set the language preference in localStorage
 * @param {string} language - Language code ('en' or 'id')
 */
export const setLanguage = (language) => {
  // Validate language
  if (!['en', 'id'].includes(language)) {
    console.warn('Invalid language:', language, 'Defaulting to en');
    language = DEFAULT_LANGUAGE;
  }
  
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(LANGUAGE_KEY, language);
  }
  
  // Also sync to chrome.storage if extension is available
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
    chrome.storage.sync.set({ [LANGUAGE_KEY]: language });
  }
};

/**
 * Listen for language changes
 * @param {Function} callback - Callback function that receives new language
 */
export const onLanguageChange = (callback) => {
  // Listen to localStorage changes (web app - across tabs)
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key === LANGUAGE_KEY && e.newValue) {
        callback(e.newValue);
      }
    });
  }
  
  // Listen to chrome.storage changes (extension sync)
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'sync' && changes[LANGUAGE_KEY]) {
        callback(changes[LANGUAGE_KEY].newValue);
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
