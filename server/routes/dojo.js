import express from 'express';
import { getSparringChallenge, verifySparringAnswer, getBiasChallenge, analyzeBiasHighlights } from '../controllers/dojoController.js';

const router = express.Router();

// GET /api/dojo/sparring-challenge - Get a new fallacy identification challenge
router.get('/sparring-challenge', getSparringChallenge);

// POST /api/dojo/verify-answer - Verify user's answer
router.post('/verify-answer', verifySparringAnswer);

// POST /api/dojo/bias-challenge - Get a new bias blindspot challenge (POST to support apiKey in body)
router.post('/bias-challenge', getBiasChallenge);

// POST /api/dojo/analyze-bias-highlights - Analyze user's bias highlights
router.post('/analyze-bias-highlights', analyzeBiasHighlights);

export default router;
