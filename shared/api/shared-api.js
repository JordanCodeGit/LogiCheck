/**
 * Shared API Layer for LogiCheck
 * This module can be used by both web and extension
 * 
 * Environment Variables:
 * - VITE_API_URL (for web via Vite)
 * - EXTENSION_API_URL (for extension)
 */

/**
 * Get the API base URL based on the environment
 * @returns {string} API base URL
 */
export const getApiBaseUrl = () => {
  // For web (Vite)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_API_URL || 'https://logicheck-production.up.railway.app/api';
  }
  
  // For extension or Node.js environment
  if (typeof process !== 'undefined' && process.env) {
    return process.env.EXTENSION_API_URL || 'https://logicheck-production.up.railway.app/api';
  }
  
  // Fallback
  return 'https://logicheck-production.up.railway.app/api';
};

/**
 * Local storage key for API key
 */
export const API_KEY_STORAGE_KEY = 'GEMINI_API_KEY';

/**
 * Get API key from localStorage or chrome.storage
 * @returns {Promise<string|null>} The stored API key or null
 */
export const getApiKey = async () => {
  // For web (browser localStorage)
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage.getItem(API_KEY_STORAGE_KEY);
  }
  
  // For Chrome extension
  if (typeof chrome !== 'undefined' && chrome.storage) {
    return new Promise((resolve) => {
      chrome.storage.local.get([API_KEY_STORAGE_KEY], (result) => {
        resolve(result[API_KEY_STORAGE_KEY] || null);
      });
    });
  }
  
  return null;
};

/**
 * Set API key to localStorage or chrome.storage
 * @param {string} apiKey - The API key to store
 * @returns {Promise<void>}
 */
export const setApiKey = async (apiKey) => {
  // For web (browser localStorage)
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
    return;
  }
  
  // For Chrome extension
  if (typeof chrome !== 'undefined' && chrome.storage) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [API_KEY_STORAGE_KEY]: apiKey }, resolve);
    });
  }
};

/**
 * Remove API key from storage
 * @returns {Promise<void>}
 */
export const removeApiKey = async () => {
  // For web (browser localStorage)
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.removeItem(API_KEY_STORAGE_KEY);
    return;
  }
  
  // For Chrome extension
  if (typeof chrome !== 'undefined' && chrome.storage) {
    return new Promise((resolve) => {
      chrome.storage.local.remove([API_KEY_STORAGE_KEY], resolve);
    });
  }
};

/**
 * Make an API request
 * @param {string} endpoint - API endpoint (e.g., '/analyze')
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} API response data
 */
export const apiRequest = async (endpoint, options = {}) => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30000,
  };
  
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), mergedOptions.timeout);
    
    const response = await fetch(url, {
      ...mergedOptions,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout. Please try again.');
    }
    throw error;
  }
};

/**
 * Analyze text for logical fallacies and reasoning
 * @param {string} text - The text to analyze
 * @returns {Promise<Object>} Analysis result
 */
export const analyzeText = async (text) => {
  const apiKey = await getApiKey();
  
  return apiRequest('/analyze', {
    method: 'POST',
    body: JSON.stringify({ text, apiKey }),
  });
};

/**
 * Get a new fallacy sparring challenge
 * @returns {Promise<Object>} Challenge data
 */
export const getSparringChallenge = async () => {
  return apiRequest('/dojo/sparring-challenge', {
    method: 'GET',
  });
};

/**
 * Verify the answer to a sparring challenge
 * @param {Object} answerData - { challengeId, userAnswer, scenario }
 * @returns {Promise<Object>} Verification result
 */
export const verifySparringAnswer = async (answerData) => {
  return apiRequest('/dojo/verify-answer', {
    method: 'POST',
    body: JSON.stringify(answerData),
  });
};

/**
 * Get a new bias blindspot challenge
 * @returns {Promise<Object>} Challenge data with two articles
 */
export const getBiasChallenge = async () => {
  return apiRequest('/dojo/bias-challenge', {
    method: 'GET',
  });
};

/**
 * Analyze user's bias highlights and get feedback
 * @param {Object} data - { challengeId, articleAHighlights, articleBHighlights, topic }
 * @returns {Promise<Object>} Feedback analysis
 */
export const analyzeBiasHighlights = async (data) => {
  return apiRequest('/dojo/analyze-bias-highlights', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Analyze an essay for argumentative quality
 * @param {string} essayText - The essay to analyze
 * @returns {Promise<Object>} Analysis with annotations
 */
export const analyzeEssay = async (essayText) => {
  const apiKey = await getApiKey();
  
  return apiRequest('/clinic/analyze-essay', {
    method: 'POST',
    body: JSON.stringify({ essayText, apiKey }),
  });
};

/**
 * Handle API errors consistently
 * @param {Error} error - The error object
 * @returns {Error} Formatted error
 */
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.message.includes('timeout')) {
    return new Error('The request took too long. Please try again.');
  }
  
  if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
    return new Error('Network error. Please check your internet connection.');
  }
  
  if (error.message.includes('API key')) {
    return new Error('Invalid API key. Please check your settings.');
  }
  
  return error;
};

// Export all functions as default object for convenience
export default {
  getApiBaseUrl,
  getApiKey,
  setApiKey,
  removeApiKey,
  apiRequest,
  analyzeText,
  getSparringChallenge,
  verifySparringAnswer,
  getBiasChallenge,
  analyzeBiasHighlights,
  analyzeEssay,
  handleApiError,
  API_KEY_STORAGE_KEY,
};
