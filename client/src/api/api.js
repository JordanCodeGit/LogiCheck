import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://logicheck-production.up.railway.app/api';
const API_KEY_STORAGE_KEY = 'GEMINI_API_KEY';

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
 * Analyze text for logical fallacies and reasoning
 * @param {string} text - The text to analyze
 * @param {AbortSignal} signal - Optional abort signal for cancelling the request
 * @returns {Promise} API response
 */
export const analyzeText = async (text, signal = null) => {
  try {
    const apiKey = getApiKey();
    const response = await api.post('/analyze', { text, apiKey }, {
      signal: signal
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get a new fallacy sparring challenge
 * @returns {Promise} Challenge data
 */
export const getSparringChallenge = async () => {
  try {
    const response = await api.get('/dojo/sparring-challenge');
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
    const response = await api.post('/dojo/verify-answer', answerData);
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
    const response = await api.get('/dojo/bias-challenge');
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
    const response = await api.post('/dojo/analyze-bias-highlights', data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Analyze an essay for argumentative quality
 * @param {string} essayText - The essay to analyze
 * @param {AbortSignal} signal - Optional abort signal for cancelling the request
 * @returns {Promise} Analysis with annotations
 */
export const analyzeEssay = async (essayText, signal = null) => {
  try {
    const apiKey = getApiKey();
    const response = await api.post('/clinic/analyze-essay', { essayText, apiKey }, {
      signal: signal
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Health check endpoint
 * @returns {Promise} Server status
 */
export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Handle API errors consistently
 * @param {Error} error - The error object
 * @returns {Error} Formatted error
 */
const handleApiError = (error) => {
  // Handle abort errors
  if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
    const abortError = new Error('Analysis cancelled');
    abortError.name = 'AbortError';
    return abortError;
  }
  
  if (error.response) {
    // Server responded with error
    const message = error.response.data?.error?.message || 'An error occurred';
    return new Error(message);
  } else if (error.request) {
    // Request made but no response
    return new Error('Unable to connect to server. Please check your connection.');
  } else {
    // Error in request setup
    return new Error(error.message || 'An unexpected error occurred');
  }
};

export default api;
