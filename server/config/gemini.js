import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Get the Gemini model instance
 * @param {string} apiKey - Optional API key from user (takes priority over env)
 * @returns {Object} Gemini generative model
 */
export const getGeminiModel = (apiKey = null) => {
  // Use user-provided API key if available, otherwise fall back to server env
  const key = apiKey || process.env.GEMINI_API_KEY;
  
  if (!key) {
    throw new Error('No API key provided. Please configure your Gemini API key.');
  }
  
  const genAI = new GoogleGenerativeAI(key);
  // Use gemini-2.5-flash for the latest capabilities and best performance
  return genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
};

/**
 * The Socratic Prompt Architecture - Multi-layered prompt system
 * This is the "brain" of LogiCheck
 */
export const buildSocraticPrompt = (userText, promptType = 'analyze') => {
  const basePersona = `You are LogiCheck, a conversational AI coach. Your purpose is to help users sharpen their logical reasoning. You are analytical, neutral, and encouraging. You do not give opinions or declare information 'true' or 'false.' Your entire focus is on the structure and quality of the argument.`;

  const prompts = {
    analyze: `${basePersona}

Analyze the following text. Your output must be a JSON object with these exact keys:
- 'mainClaim' (a one-sentence summary of the author's central argument)
- 'assumptions' (a list of key unstated assumptions)
- 'fallacies' (a list of objects, where each object has 'fallacyName', 'quote', and 'explanation')

If a key has no findings, return an empty list.

Based on your analysis, generate one Socratic question that encourages the user to evaluate the argument's weakest point. The question should not contain the answer. Frame it to foster curiosity and further reflection. Include this as 'socraticQuestion' in your JSON response.

Text to analyze:
${userText}

Respond ONLY with valid JSON. No additional text before or after the JSON object.`,

    essay: `${basePersona}

Analyze the following essay focusing EXCLUSIVELY on argumentation, not grammar or style. Your output must be a JSON object with the key 'annotations', which is a list of objects. Each object must have:
- 'targetText' (the specific excerpt from the essay)
- 'feedbackCategory' (one of: "Thesis Cohesion", "Evidence-to-Claim Linkage", "Logical Flow", "Counterargument Engagement")
- 'comment' (constructive, formative advice)

Focus on these areas:
1. Thesis Cohesion: Does the essay consistently support the main thesis?
2. Evidence-to-Claim Linkage: Is the evidence sufficient and directly relevant?
3. Logical Flow: Are there logical gaps or contradictions?
4. Counterargument Engagement: Does the essay acknowledge and refute counterarguments?

Essay to analyze:
${userText}

Respond ONLY with valid JSON. No additional text before or after the JSON object.`
  };

  return prompts[promptType] || prompts.analyze;
};

/**
 * Call Gemini API with the constructed prompt
 * @param {string} prompt - The constructed prompt
 * @param {string} apiKey - Optional user API key
 * @returns {Promise<Object>} Parsed JSON response from Gemini
 */
export const callGeminiAPI = async (prompt, apiKey = null) => {
  try {
    const model = getGeminiModel(apiKey);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    // Sometimes the model wraps JSON in markdown code blocks
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || 
                      text.match(/```\s*([\s\S]*?)\s*```/) ||
                      [null, text];
    
    const jsonText = jsonMatch[1] || text;
    
    return JSON.parse(jsonText.trim());
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Check if it's a quota exceeded error
    if (error.message && error.message.includes('429')) {
      const quotaError = new Error('API quota exceeded. You have reached the free tier limit (250 requests per day). Please wait 24 hours, use your own API key in Settings, atau kamu bisa ganti ke pilihan shared API lain.');
      quotaError.statusCode = 429;
      throw quotaError;
    }
    
    // Check for other rate limit errors
    if (error.message && (error.message.includes('quota') || error.message.includes('Too Many Requests'))) {
      const quotaError = new Error('API quota exceeded. Please wait a few moments, use your own API key in Settings, atau kamu bisa ganti ke pilihan shared API lain.');
      quotaError.statusCode = 429;
      throw quotaError;
    }
    
    throw new Error(`Failed to get AI response: ${error.message}`);
  }
};
