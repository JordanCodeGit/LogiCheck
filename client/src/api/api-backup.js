import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://logicheck-production.up.railway.app/api';
const API_KEY_STORAGE_KEY = 'GEMINI_API_KEY';
const LANGUAGE_KEY = 'LOGICHECK_LANGUAGE';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

/**
 * Get API key from localStorage
 * @returns {string|null} The stored API key or null
 */
const getApiKey = () => {
  return localStorage.getItem(API_KEY_STORAGE_KEY);
};

/**
 * Get language from localStorage
 * @returns {string} The stored language or 'en' as default
 */
const getLanguage = () => {
  return localStorage.getItem(LANGUAGE_KEY) || 'en';
};

/**
 * Analyze text for logical fallacies and reasoning
 * @param {string} text - The text to analyze
 * @param {AbortSignal} signal - Optional abort signal for cancelling the request
 * @returns {Promise} API response
 */
export const analyzeText = async (text, signal = null) => {
  try {
    const apiKey = getApiKey();
    const language = getLanguage();
    const response = await api.post('/analyze', { text, apiKey, language }, {
      signal: signal
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get a random Fallacy Sparring Challenge
 * @returns {Promise} Challenge data with scenario and options
 */
export const getSparringChallenge = async () => {
  try {
    const apiKey = getApiKey();
    const language = getLanguage();
    const response = await api.get('/dojo/sparring-challenge', {
      params: { language, apiKey }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Verify the answer to a sparring challenge
 * @param {object} answerData - { challengeId, userAnswer, scenario }
 * @returns {Promise} Verification result
 */
export const verifySparringAnswer = async (answerData) => {
  try {
    const apiKey = getApiKey();
    const language = getLanguage();
    const response = await api.post('/dojo/verify-answer', { ...answerData, language, apiKey });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get a new bias blindspot challenge
 * @returns {Promise} Challenge data with two articles
 */
export const getBiasChallenge = async () => {
  try {
    const apiKey = getApiKey();
    const language = getLanguage();
    
    console.log('=== getBiasChallenge Frontend ===');
    console.log('Language from localStorage:', language);
    console.log('API Key from localStorage:', apiKey ? 'YES ✅' : 'NO ❌');
    console.log('API Key length:', apiKey ? apiKey.length : 0);
    console.log('API Key preview:', apiKey ? apiKey.substring(0, 20) + '...' : 'null');
    console.log('================================');
    
    const response = await api.post('/dojo/bias-challenge', { language, apiKey });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Analyze user's bias highlights and get feedback
 * @param {object} data - { challengeId, articleAHighlights, articleBHighlights, topic }
 * @returns {Promise} Feedback analysis
 */
export const analyzeBiasHighlights = async (data) => {
  try {
    const apiKey = getApiKey();
    const language = getLanguage();
    const response = await api.post('/dojo/analyze-bias-highlights', { ...data, language, apiKey });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Analyze an essay for logical issues and improvements
 * @param {string} essayText - The essay to analyze
 * @param {AbortSignal} signal - Optional abort signal for cancelling the request
 * @returns {Promise} Analysis results
 */
export const analyzeEssay = async (essayText, signal = null) => {
  try {
    const apiKey = getApiKey();
    const language = getLanguage();
    const response = await api.post('/clinic/analyze-essay', { essayText, apiKey, language }, {
      signal: signal
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Handle API errors and return user-friendly error messages
 * @param {Error} error - The error object from axios
 * @returns {Error} Formatted error object
 */
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    if (status === 429) {
      return new Error('Too many requests. Please try again later.');
    }
    
    if (status === 401) {
      return new Error('Invalid API key. Please check your settings.');
    }
    
    if (data && data.error) {
      return new Error(data.error.message || data.error || 'An error occurred');
    }
    
    return new Error(`Server error: ${status}`);
  } else if (error.request) {
    // Request made but no response
    return new Error('Unable to connect to server. Please check your internet connection.');
  } else {
    // Something else happened
    return new Error(error.message || 'An unexpected error occurred');
  }
};

export default api;
