/**
 * Utility functions for API Key management
 */

const API_KEY_STORAGE_KEY = 'GEMINI_API_KEY';
const USE_SERVER_KEY_FLAG = 'USE_SERVER_KEY';
export const SERVER_KEY_MARKER = '__USE_SERVER_KEY__';

/**
 * Get API key from localStorage
 * @returns {string|null} The stored API key or null
 */
export const getApiKey = () => {
  // If using server key, return null (backend will use its own key)
  if (isUsingServerKey()) {
    return null;
  }
  return localStorage.getItem(API_KEY_STORAGE_KEY);
};

/**
 * Save API key to localStorage
 * @param {string} apiKey - The API key to save
 */
export const saveApiKey = (apiKey) => {
  // Clear server key flag when saving custom key
  clearServerKeyFlag();
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
};

/**
 * Remove API key from localStorage
 */
export const clearApiKey = () => {
  localStorage.removeItem(API_KEY_STORAGE_KEY);
};

/**
 * Check if using server-managed API key
 * @returns {boolean} True if using server key
 */
export const isUsingServerKey = () => {
  return localStorage.getItem(USE_SERVER_KEY_FLAG) === 'true';
};

/**
 * Set to use server-managed API key
 */
export const setUseServerKey = () => {
  localStorage.setItem(USE_SERVER_KEY_FLAG, 'true');
  // Clear any custom key when switching to server key
  localStorage.removeItem(API_KEY_STORAGE_KEY);
};

/**
 * Clear server key flag
 */
export const clearServerKeyFlag = () => {
  localStorage.removeItem(USE_SERVER_KEY_FLAG);
};

/**
 * Check if API key exists (either custom or server)
 * @returns {boolean} True if API key exists or using server key
 */
export const hasApiKey = () => {
  if (isUsingServerKey()) return true;
  const key = getApiKey();
  return key !== null && key.trim().length > 0;
};

/**
 * Validate API key format (basic validation)
 * @param {string} key - The API key to validate
 * @returns {boolean} True if format looks valid
 */
export const validateApiKeyFormat = (key) => {
  if (!key) return false;
  // Basic validation: keys are usually alphanumeric with dashes/underscores and > 20 chars
  return /^[A-Za-z0-9\-_]{20,}$/.test(key.trim());
};
