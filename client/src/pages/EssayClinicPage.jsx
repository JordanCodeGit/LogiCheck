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

  const handleAnalyze = async () => {
    if (!essayText.trim()) {
      setError('Please enter your essay text');
      return;
    }

    if (!hasApiKey()) {
      setError('Please configure your API key in Settings first');
      return;
    }

    setLoading(true);
    setError(null);
    setAnnotations([]);
    setSelectedAnnotation(null);

    try {
      const result = await analyzeEssay(essayText);
      setAnnotations(result.annotations || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Thesis Cohesion': 'bg-blue-100 text-blue-800 border-blue-300',
      'Evidence-to-Claim Linkage': 'bg-green-100 text-green-800 border-green-300',
      'Logical Flow': 'bg-purple-100 text-purple-800 border-purple-300',
      'Counterargument Engagement': 'bg-orange-100 text-orange-800 border-orange-300',
      'General': 'bg-gray-100 text-gray-800 border-gray-300',
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
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
          Essay Clinic
        </h1>
  <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Get AI-powered feedback on your argumentative writing. We analyze thesis cohesion, evidence quality, logical flow, and counterargument engagement.
        </p>
      </div>

      {/* Info Cards - now with green accent */}
      <div className="grid md:grid-cols-4 gap-4">
        {[{
          icon: '🎯', title: 'Thesis Cohesion', desc: 'Does your essay support the main thesis?' },
          { icon: '🔗', title: 'Evidence Linkage', desc: 'Is evidence relevant and sufficient?' },
          { icon: '🌊', title: 'Logical Flow', desc: 'Are there gaps or contradictions?' },
          { icon: '⚖️', title: 'Counterarguments', desc: 'Are opposing views addressed?' },
        ].map((item, index) => (
          <div key={index} className="card text-center border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/20 transition-colors">
            <div className="text-3xl mb-2 text-green-600 dark:text-green-400">{item.icon}</div>
            <h3 className="font-semibold text-sm mb-1 text-green-600 dark:text-green-400">{item.title}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Two-panel layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Panel - Editor */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center space-x-2 text-green-800 dark:text-green-300">
              <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span>Your Essay</span>
            </h2>
            <span className="text-sm text-green-600 dark:text-green-400">
              {essayText.length} characters
            </span>
          </div>

          <div className="mb-4">
            <ReactQuill
              value={essayText}
              onChange={setEssayText}
              modules={quillModules}
              placeholder="Paste your essay here... Focus on argumentative writing (thesis statements, supporting evidence, logical structure, etc.)"
              className="bg-white dark:bg-gray-800 rounded-lg transition-colors"
              style={{ height: '400px', marginBottom: '50px' }}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !essayText.trim()}
            className="btn-primary w-full"
          >
            {loading ? 'Analyzing...' : 'Analyze My Essay'}
          </button>

          <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 transition-colors">
            <div className="flex items-start space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800 dark:text-yellow-200">
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
            <div className="space-y-4">
              {/* Summary */}
              <div className="card bg-green-50 dark:bg-green-900/20 border-l-4 border-l-green-500 transition-colors">
                <h3 className="font-semibold text-lg text-green-800 dark:text-green-300 mb-2">
                  Analysis Complete
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Found {annotations.length} area{annotations.length !== 1 ? 's' : ''} for improvement. 
                  Review the feedback below to strengthen your argument.
                </p>
              </div>

              {/* Annotations */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                  <AlertCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span>Feedback & Suggestions</span>
                </h3>

                {annotations.map((annotation, index) => (
                  <div
                    key={index}
                    className={`card border-l-4 cursor-pointer transition-all hover:shadow-lg ${
                      selectedAnnotation === index ? 'ring-2 ring-green-500' : ''
                    }`}
                    onClick={() => setSelectedAnnotation(index === selectedAnnotation ? null : index)}
                    style={{ borderLeftColor: getCategoryColor(annotation.feedbackCategory).split(' ')[0] }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{getCategoryIcon(annotation.feedbackCategory)}</div>
                      <div className="flex-1">
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor(annotation.feedbackCategory)}`}>
                          {annotation.feedbackCategory}
                        </div>
                        
                        {annotation.targetText && (
                          <div className="bg-gray-50 p-3 rounded-lg mb-2 border-l-2 border-gray-300">
                            <p className="text-sm text-gray-600 mb-1 font-medium">Highlighted Text:</p>
                            <p className="text-sm text-gray-800 italic">"{annotation.targetText}"</p>
                          </div>
                        )}

                        <p className="text-gray-700 leading-relaxed">
                          {annotation.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div className="card bg-blue-50">
                <h3 className="font-semibold mb-2 flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  <span>Next Steps</span>
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600">•</span>
                    <span>Review each piece of feedback and consider how it applies to your argument</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600">•</span>
                    <span>Revise your essay addressing the suggestions provided</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600">•</span>
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
