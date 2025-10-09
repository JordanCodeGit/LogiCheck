import { Trophy, TrendingUp, Lightbulb, CheckCircle, AlertCircle } from 'lucide-react';

/**
 * BiasFeedback Component
 * Displays feedback analysis for user's bias highlights
 */
const BiasFeedback = ({ feedback, onClose }) => {
  if (!feedback) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-50 dark:bg-green-900/20 border-green-500';
    if (score >= 60) return 'bg-blue-50 dark:bg-blue-900/20 border-blue-500';
    if (score >= 40) return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500';
    return 'bg-orange-50 dark:bg-orange-900/20 border-orange-500';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transition-colors">
        {/* Header */}
        <div className={`p-6 border-b-4 ${getScoreBgColor(feedback.overallScore)}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Trophy className={`w-8 h-8 ${getScoreColor(feedback.overallScore)}`} />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Your Analysis Results</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{feedback.performanceLevel} Level</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl leading-none"
            >
              ✕
            </button>
          </div>
          
          {/* Score Display */}
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700">
                      Overall Score
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`text-3xl font-bold ${getScoreColor(feedback.overallScore)}`}>
                      {feedback.overallScore}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">/100</span>
                  </div>
                </div>
                <div className="overflow-hidden h-3 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    style={{ width: `${feedback.overallScore}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${
                      feedback.overallScore >= 80 ? 'bg-green-500' :
                      feedback.overallScore >= 60 ? 'bg-blue-500' :
                      feedback.overallScore >= 40 ? 'bg-yellow-500' : 'bg-orange-500'
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="mt-4 text-gray-700 dark:text-gray-200 font-medium">{feedback.message}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Category Breakdown */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl transition-colors">
            <h3 className="font-semibold mb-3 flex items-center space-x-2 text-gray-900 dark:text-gray-100">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>Bias Categories Identified</span>
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center border-2 border-red-200 dark:border-red-700 transition-colors">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{feedback.categoryBreakdown.loaded}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">Loaded Language</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center border-2 border-orange-200 dark:border-orange-700 transition-colors">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{feedback.categoryBreakdown.emotional}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">Emotional Appeals</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center border-2 border-purple-200 dark:border-purple-700 transition-colors">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{feedback.categoryBreakdown.framing}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">Biased Framing</div>
              </div>
            </div>
          </div>

          {/* Strengths */}
          {feedback.strengths.length > 0 && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border-l-4 border-l-green-500 transition-colors">
              <h3 className="font-semibold mb-3 flex items-center space-x-2 text-green-900 dark:text-green-300">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span>Strengths</span>
              </h3>
              <ul className="space-y-2">
                {feedback.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-200">
                    <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Areas for Improvement */}
          {feedback.improvements.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border-l-4 border-l-blue-500 transition-colors">
              <h3 className="font-semibold mb-3 flex items-center space-x-2 text-blue-900 dark:text-blue-300">
                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Areas for Improvement</span>
              </h3>
              <ul className="space-y-2">
                {feedback.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-200">
                    <span className="text-blue-600 dark:text-blue-400 mt-0.5">→</span>
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Insights */}
          {feedback.insights.length > 0 && (
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border-l-4 border-l-purple-500 transition-colors">
              <h3 className="font-semibold mb-3 flex items-center space-x-2 text-purple-900 dark:text-purple-300">
                <Lightbulb className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Key Insights</span>
              </h3>
              <ul className="space-y-2">
                {feedback.insights.map((insight, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-200">
                    <span className="text-purple-600 dark:text-purple-400 mt-0.5">💡</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600 transition-colors">
          <button
            onClick={onClose}
            className="btn-primary w-full"
          >
            Continue Practicing
          </button>
        </div>
      </div>
    </div>
  );
};

export default BiasFeedback;
