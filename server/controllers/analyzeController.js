import { buildSocraticPrompt, callGeminiAPI } from '../config/gemini.js';

/**
 * Analyze text for logical fallacies, assumptions, and main claim
 * POST /api/analyze
 */
export const analyzeText = async (req, res) => {
  try {
    const { text, apiKey, language = 'en' } = req.body;

    // Validation
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({
        error: {
          message: 'Please provide valid text to analyze',
          status: 400
        }
      });
    }

    if (text.length > 10000) {
      return res.status(400).json({
        error: {
          message: 'Text is too long. Please limit to 10,000 characters.',
          status: 400
        }
      });
    }

    // Check if API key is provided (either from request or env)
    if (!apiKey && !process.env.GEMINI_API_KEY) {
      return res.status(401).json({
        error: {
          message: 'API key required. Please configure your Gemini API key in Settings.',
          status: 401
        }
      });
    }

    // Build the Socratic prompt (Layer 1, 2, and 3 combined) with language support
    const prompt = buildSocraticPrompt(text, 'analyze', language);

    // Call Gemini API with user's API key
    const aiResponse = await callGeminiAPI(prompt, apiKey);

    // Validate response structure
    const response = {
      mainClaim: aiResponse.mainClaim || 'No clear main claim identified.',
      assumptions: Array.isArray(aiResponse.assumptions) ? aiResponse.assumptions : [],
      fallacies: Array.isArray(aiResponse.fallacies) ? aiResponse.fallacies : [],
      socraticQuestion: aiResponse.socraticQuestion || 'What evidence would strengthen this argument?'
    };

    // Ensure fallacies have the correct structure
    response.fallacies = response.fallacies.map(fallacy => ({
      fallacyName: fallacy.fallacyName || 'Unknown Fallacy',
      quote: fallacy.quote || '',
      explanation: fallacy.explanation || 'No explanation provided.'
    }));

    res.json(response);

  } catch (error) {
    console.error('Error in analyzeText:', error);
    res.status(500).json({
      error: {
        message: 'Failed to analyze text. Please try again.',
        status: 500,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }
    });
  }
};
