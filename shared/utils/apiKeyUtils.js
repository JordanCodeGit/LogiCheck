/**
 * Shared utility functions for API key management
 */

import { API_KEY_STORAGE_KEY, getApiKey, setApiKey, removeApiKey } from '../api/shared-api';

/**
 * Validate API key format
 * @param {string} apiKey - The API key to validate
 * @returns {boolean} Whether the API key is valid
 */
export const validateApiKey = (apiKey) => {
  if (!apiKey || typeof apiKey !== 'string') {
    return false;
  }
  
  // Gemini API keys typically start with "AIza" and are 39 characters long
  const geminiKeyPattern = /^AIza[0-9A-Za-z_-]{35}$/;
  return geminiKeyPattern.test(apiKey);
};

/**
 * Check if API key is stored
 * @returns {Promise<boolean>} Whether an API key is stored
 */
export const hasApiKey = async () => {
  const apiKey = await getApiKey();
  return !!apiKey;
};

/**
 * Get API key with validation
 * @returns {Promise<{valid: boolean, key: string|null}>}
 */
export const getValidatedApiKey = async () => {
  const apiKey = await getApiKey();
  
  if (!apiKey) {
    return { valid: false, key: null };
  }
  
  const isValid = validateApiKey(apiKey);
  return { valid: isValid, key: apiKey };
};

/**
 * Save API key with validation
 * @param {string} apiKey - The API key to save
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const saveApiKey = async (apiKey) => {
  const trimmedKey = apiKey.trim();
  
  if (!validateApiKey(trimmedKey)) {
    return {
      success: false,
      error: 'Invalid API key format. Please check your Gemini API key.',
    };
  }
  
  try {
    await setApiKey(trimmedKey);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to save API key. Please try again.',
    };
  }
};

/**
 * Clear stored API key
 * @returns {Promise<{success: boolean}>}
 */
export const clearApiKey = async () => {
  try {
    await removeApiKey();
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

/**
 * Get masked API key for display
 * @param {string} apiKey - The API key to mask
 * @returns {string} Masked API key (e.g., "AIza****...****xyz")
 */
export const maskApiKey = (apiKey) => {
  if (!apiKey || apiKey.length < 8) {
    return '****';
  }
  
  const start = apiKey.substring(0, 4);
  const end = apiKey.substring(apiKey.length - 3);
  return `${start}${'*'.repeat(apiKey.length - 7)}${end}`;
};

export default {
  validateApiKey,
  hasApiKey,
  getValidatedApiKey,
  saveApiKey,
  clearApiKey,
  maskApiKey,
  API_KEY_STORAGE_KEY,
};
