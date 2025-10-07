import { useState } from 'react';
import { FileText, Lightbulb, AlertCircle } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { analyzeEssay } from '../api/api';
import { hasApiKey } from '../utils/apiKeyUtils';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import ApiKeyWarning from '../components/ApiKeyWarning';

const EssayClinicPage = () => {
  const [essayText, setEssayText] = useState('');
  const [annotations, setAnnotations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [abortController, setAbortController] = useState(null);

  const handleAnalyze = async () => {
    if (!essayText.trim()) {
      setError('Please enter your essay text');
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
    setAnnotations([]);
    setSelectedAnnotation(null);

    try {
      const result = await analyzeEssay(essayText, controller.signal);
      setAnnotations(result.annotations || []);
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

  const getCategoryColor = (category) => {
    const colors = {
      'Thesis Cohesion': 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700',
      'Evidence-to-Claim Linkage': 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700',
      'Logical Flow': 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-700',
      'Counterargument Engagement': 'bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 border-orange-300 dark:border-orange-700',
      'General': 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600',
    };
    return colors[category] || colors['General'];
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Thesis Cohesion':
        return '🎯';
      case 'Evidence-to-Claim Linkage':
        return '🔗';
      case 'Logical Flow':
        return '🌊';
      case 'Counterargument Engagement':
        return '⚖️';
      default:
        return '💡';
    }
  };

  const highlightAnnotations = (text) => {
    if (!annotations.length) return text;

    let highlightedText = text;
    annotations.forEach((annotation, index) => {
      if (annotation.targetText && text.includes(annotation.targetText)) {
        const color = getCategoryColor(annotation.feedbackCategory);
        const replacement = `<mark class="px-1 py-0.5 rounded cursor-pointer ${color}" data-annotation="${index}">${annotation.targetText}</mark>`;
        highlightedText = highlightedText.replace(annotation.targetText, replacement);
      }
    });

    return highlightedText;
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
          Essay Clinic
        </h1>
  <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Get AI-powered feedback on your argumentative writing. We analyze thesis cohesion, evidence quality, logical flow, and counterargument engagement.
        </p>
      </div>

      {/* Info Cards - now with green accent */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[{
          icon: '🎯', title: 'Thesis Cohesion', desc: 'Does your essay support the main thesis?' },
          { icon: '🔗', title: 'Evidence Linkage', desc: 'Is evidence relevant and sufficient?' },
          { icon: '🌊', title: 'Logical Flow', desc: 'Are there gaps or contradictions?' },
          { icon: '⚖️', title: 'Counterarguments', desc: 'Are opposing views addressed?' },
        ].map((item, index) => (
          <div key={index} className="card text-center border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/20 transition-colors p-3">
            <div className="text-2xl mb-1.5 text-green-600 dark:text-green-400">{item.icon}</div>
            <h3 className="font-semibold text-xs mb-0.5 text-green-600 dark:text-green-400">{item.title}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Two-panel layout */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Left Panel - Editor */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold flex items-center space-x-2 text-green-800 dark:text-green-300">
              <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span>Your Essay</span>
            </h2>
            <span className="text-xs text-green-600 dark:text-green-400">
              {essayText.length} characters
            </span>
          </div>

          <div className="mb-3">
            <ReactQuill
              value={essayText}
              onChange={setEssayText}
              modules={quillModules}
              placeholder="Paste your essay here... Focus on argumentative writing (thesis statements, supporting evidence, logical structure, etc.)"
              className="bg-white dark:bg-gray-800 rounded-lg transition-colors"
              style={{ height: '300px', marginBottom: '45px' }}
            />
          </div>

          <div className="space-y-2">
            {!loading ? (
              <button
                onClick={handleAnalyze}
                disabled={!essayText.trim()}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-base px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Start Analyzing
              </button>
            ) : (
              <>
                <button
                  disabled
                  className="relative w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-base px-6 py-2.5 rounded-lg shadow-lg font-medium opacity-90 cursor-not-allowed overflow-hidden"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Analyzing...</span>
                  </span>
                  <div className="absolute bottom-0 left-0 h-1 bg-white/30 animate-pulse" style={{width: '100%'}}></div>
                </button>
                <button
                  onClick={handleStopAnalysis}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white text-base px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all font-medium"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                    </svg>
                    <span>Stop Analysis</span>
                  </span>
                </button>
              </>
            )}
          </div>

          <div className="mt-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 transition-colors">
            <div className="flex items-start space-x-2">
              <Lightbulb className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> This tool focuses on argumentation quality, not grammar or style. 
                For best results, submit essays with a clear thesis and supporting arguments.
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Feedback */}
        <div className="space-y-4">
          {!hasApiKey() && !loading && annotations.length === 0 && (
            <ApiKeyWarning />
          )}

          {error && (
            <Alert type="error" message={error} onClose={() => setError(null)} />
          )}

          {loading && (
            <div className="card">
              <LoadingSpinner text="Analyzing your essay..." />
            </div>
          )}

          {annotations.length > 0 && !loading && (
            <div className="space-y-3">
              {/* Summary */}
              <div className="card bg-green-50 dark:bg-green-900/20 border-l-4 border-l-green-500 transition-colors p-3">
                <h3 className="font-semibold text-base text-green-800 dark:text-green-300 mb-1.5">
                  Analysis Complete
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Found {annotations.length} area{annotations.length !== 1 ? 's' : ''} for improvement. 
                  Review the feedback below to strengthen your argument.
                </p>
              </div>

              {/* Annotations */}
              <div className="space-y-2.5">
                <h3 className="font-semibold text-base flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                  <AlertCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span>Feedback & Suggestions</span>
                </h3>

                {annotations.map((annotation, index) => (
                  <div
                    key={index}
                    className={`card border-l-4 cursor-pointer transition-all hover:shadow-lg p-3 ${
                      selectedAnnotation === index ? 'ring-2 ring-green-500' : ''
                    }`}
                    onClick={() => setSelectedAnnotation(index === selectedAnnotation ? null : index)}
                    style={{ borderLeftColor: getCategoryColor(annotation.feedbackCategory).split(' ')[0] }}
                  >
                    <div className="flex items-start space-x-2.5">
                      <div className="text-xl">{getCategoryIcon(annotation.feedbackCategory)}</div>
                      <div className="flex-1">
                        <div className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-1.5 ${getCategoryColor(annotation.feedbackCategory)}`}>
                          {annotation.feedbackCategory}
                        </div>
                        
                        {annotation.targetText && (
                          <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg mb-1.5 border-l-2 border-gray-300 dark:border-gray-600 transition-colors">
                            <p className="text-xs text-gray-600 dark:text-gray-300 mb-0.5 font-medium">Highlighted Text:</p>
                            <p className="text-xs text-gray-800 dark:text-gray-100 italic">"{annotation.targetText}"</p>
                          </div>
                        )}

                        <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                          {annotation.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div className="card bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 transition-colors p-3">
                <h3 className="font-semibold mb-1.5 flex items-center space-x-2 text-gray-900 dark:text-gray-100 text-sm">
                  <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Next Steps</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-200">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>Review each piece of feedback and consider how it applies to your argument</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>Revise your essay addressing the suggestions provided</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>Re-analyze after revisions to track your improvement</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {!annotations.length && !loading && !error && (
            <div className="card text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <FileText className="w-16 h-16 mx-auto" />
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your essay in the editor and click "Analyze My Essay" to receive feedback
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EssayClinicPage;
