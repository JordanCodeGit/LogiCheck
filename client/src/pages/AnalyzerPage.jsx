import { useState } from 'react';
import { Sparkles, Brain } from 'lucide-react';
import { analyzeText } from '../api/api';
import { hasApiKey } from '../utils/apiKeyUtils';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import FallacyCard from '../components/FallacyCard';
import ApiKeyWarning from '../components/ApiKeyWarning';

const AnalyzerPage = () => {
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    if (!hasApiKey()) {
      setError('Please configure your API key in Settings first');
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeText(inputText);
      setAnalysis(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-300 dark:to-secondary-300 bg-clip-text text-transparent">
          Core Analyzer
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Paste any text below to analyze its logical structure, identify fallacies, and uncover hidden assumptions.
        </p>
      </div>

      {/* Two-panel layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Panel - Input */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-primary-600" />
            <span>Text to Analyze</span>
          </h2>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your text here...
(articles, arguments, social media posts, etc.)"
            className="textarea min-h-[500px] font-sans text-base"
            rows="20"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading || !inputText.trim()}
            className="btn btn-primary w-full mt-4"
          >
            {loading ? 'Analyzing...' : 'Analyze Text'}
          </button>
        </div>

        {/* Right Panel - Results */}
        <div className="space-y-4">
          {!hasApiKey() && !loading && !analysis && (
            <ApiKeyWarning />
          )}

          {error && (
            <Alert type="error" message={error} onClose={() => setError(null)} />
          )}

          {loading && (
            <div className="card">
              <LoadingSpinner text="Analyzing your text..." />
            </div>
          )}

          {analysis && !loading && (
            <div className="space-y-4">
              {/* Main Claim */}
              <div className="card border-l-4 border-l-primary-500">
                <h3 className="font-semibold text-lg text-primary-700 dark:text-primary-400 mb-2">Main Claim</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{analysis.mainClaim}</p>
              </div>

              {/* Assumptions */}
              {analysis.assumptions && analysis.assumptions.length > 0 && (
                <div className="card border-l-4 border-l-yellow-500">
                  <h3 className="font-semibold text-lg text-yellow-700 dark:text-yellow-400 mb-3">Underlying Assumptions</h3>
                  <ul className="space-y-2">
                    {analysis.assumptions.map((assumption, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-yellow-600 dark:text-yellow-400 font-bold">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{assumption}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Fallacies */}
              {analysis.fallacies && analysis.fallacies.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-red-700 dark:text-red-400">Identified Logical Fallacies</h3>
                  {analysis.fallacies.map((fallacy, index) => (
                    <FallacyCard key={index} fallacy={fallacy} />
                  ))}
                </div>
              )}

              {/* No fallacies found */}
              {analysis.fallacies && analysis.fallacies.length === 0 && (
                <Alert 
                  type="success" 
                  message="No obvious logical fallacies detected in this text. However, always evaluate arguments critically!" 
                />
              )}

              {/* Socratic Questions */}
              {analysis.socraticQuestion && (
                <div className="card bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900/20 dark:to-primary-900/20 border-l-4 border-l-secondary-500">
                  <h3 className="font-semibold text-lg mb-3 flex items-center space-x-2 text-secondary-700 dark:text-secondary-400">
                    <Sparkles className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                    <span>Socratic Questions</span>
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    {analysis.socraticQuestion}
                  </p>
                </div>
              )}
            </div>
          )}

          {!analysis && !loading && !error && (
            <div className="card text-center py-12">
              <div className="text-gray-400 dark:text-gray-600 mb-4">
                <Brain className="w-16 h-16 mx-auto" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Enter text in the left panel and click "Analyze Text" to begin
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyzerPage;
