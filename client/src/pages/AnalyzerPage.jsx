import { Sparkles, Brain } from 'lucide-react';
import { analyzeText } from '../api/api';
import { hasApiKey } from '../utils/apiKeyUtils';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import FallacyCard from '../components/FallacyCard';
import ApiKeyWarning from '../components/ApiKeyWarning';
import { useAnalyzer } from '../contexts/AnalyzerContext';

const AnalyzerPage = () => {
  const {
    inputText,
    setInputText,
    analysis,
    setAnalysis,
    loading,
    setLoading,
    error,
    setError,
    abortController,
    setAbortController,
  } = useAnalyzer();

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    if (!hasApiKey()) {
      setError('Please configure your API key in Settings first');
      return;
    }

    // Create new AbortController for this request
    const controller = new AbortController();
    setAbortController(controller);

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeText(inputText, controller.signal);
      setAnalysis(result);
    } catch (err) {
      if (err.name === 'AbortError' || err.message === 'Analysis cancelled') {
        setError('Analysis was cancelled');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
      setAbortController(null);
    }
  };

  const handleStopAnalysis = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
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
          <div className="mt-4 space-y-2">
            {!loading ? (
              <button
                onClick={handleAnalyze}
                disabled={!inputText.trim()}
                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-lg px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Start Analyzing
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  disabled
                  className="relative w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-lg px-8 py-3 rounded-lg shadow-lg font-medium opacity-90 cursor-not-allowed overflow-hidden"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Analyzing...</span>
                  </span>
                  <div className="absolute bottom-0 left-0 h-1 bg-white/30 animate-pulse" style={{width: '100%'}}></div>
                </button>
                <button
                  onClick={handleStopAnalysis}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white text-lg px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all font-medium"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                    </svg>
                    <span>Stop Analysis</span>
                  </span>
                </button>
              </div>
            )}
          </div>
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
