import { useEffect, useRef } from 'react';
import { Sword, Trophy, Target, CheckCircle, XCircle, RefreshCw, Send } from 'lucide-react';
import { getSparringChallenge, verifySparringAnswer, getBiasChallenge, analyzeBiasHighlights } from '../api/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import BiasHighlighter from '../components/BiasHighlighter';
import BiasFeedback from '../components/BiasFeedback';
import { useDojo } from '../contexts/DojoContext';

const DojoPage = () => {
  const {
    activeModule,
    setActiveModule,
    challenge,
    setChallenge,
    biasChallenge,
    setBiasChallenge,
    loading,
    setLoading,
    error,
    setError,
    selectedAnswer,
    setSelectedAnswer,
    feedback,
    setFeedback,
    stats,
    setStats,
    articleAHighlights,
    setArticleAHighlights,
    articleBHighlights,
    setArticleBHighlights,
    biasFeedback,
    setBiasFeedback,
    submittingFeedback,
    setSubmittingFeedback,
  } = useDojo();

  // Load initial challenges only once when component mounts
  useEffect(() => {
    // Load sparring challenge if on sparring module and no challenge exists
    if (activeModule === 'sparring' && !challenge) {
      loadNewChallenge();
    }
    // Load bias challenge if on bias module and no challenge exists
    if (activeModule === 'bias' && !biasChallenge) {
      loadBiasChallenge();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeModule, challenge, biasChallenge]);

  const loadNewChallenge = async () => {
    setLoading(true);
    setError(null);
    setSelectedAnswer(null);
    setFeedback(null);

    try {
      const data = await getSparringChallenge();
      setChallenge(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadBiasChallenge = async () => {
    setLoading(true);
    setError(null);
    setArticleAHighlights([]);
    setArticleBHighlights([]);
    setBiasFeedback(null);

    try {
      const data = await getBiasChallenge();
      setBiasChallenge(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitBiasAnalysis = async () => {
    if (articleAHighlights.length === 0 && articleBHighlights.length === 0) {
      setError('Please highlight some text in both articles before submitting.');
      return;
    }

    setSubmittingFeedback(true);
    setError(null);

    try {
      const feedbackData = await analyzeBiasHighlights({
        challengeId: biasChallenge.challengeId,
        articleAHighlights,
        articleBHighlights,
        topic: biasChallenge.topic
      });
      
      setBiasFeedback(feedbackData);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const handleAnswerSelection = async (answer) => {
    if (feedback) return; // Already answered

    setSelectedAnswer(answer);
    setLoading(true);

    try {
      const result = await verifySparringAnswer({
        challengeId: challenge.challengeId,
        userAnswer: answer,
        scenario: challenge.scenario
      });

      setFeedback(result);
      
      // Update stats
      setStats(prev => ({
        total: prev.total + 1,
        correct: prev.correct + (result.isCorrect ? 1 : 0)
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNextChallenge = () => {
    loadNewChallenge();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          The Dojo
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Sharpen your logical reasoning skills through gamified practice
        </p>
      </div>

      {/* Stats Bar */}
      <div className="card bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Your Progress</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {stats.correct} / {stats.total} Correct
                {stats.total > 0 && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    ({Math.round((stats.correct / stats.total) * 100)}%)
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-300">Mastery Level</p>
            <p className="font-semibold text-purple-600 dark:text-purple-400">
              {stats.total < 5 ? 'Novice' : stats.total < 15 ? 'Apprentice' : 'Expert'}
            </p>
          </div>
        </div>
      </div>

      {/* Module Selection */}
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveModule('sparring')}
          className={`flex-1 card transition-all ${
            activeModule === 'sparring'
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg'
              : 'hover:shadow-lg'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Sword className="w-6 h-6" />
            <div className="text-left">
              <h3 className="font-semibold text-lg">Fallacy Sparring</h3>
              <p className={`text-sm ${activeModule === 'sparring' ? 'text-purple-100' : 'text-gray-600 dark:text-gray-300'}`}>
                Identify fallacies in scenarios
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setActiveModule('bias')}
          className={`flex-1 card transition-all ${
            activeModule === 'bias'
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg'
              : 'hover:shadow-lg'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6" />
            <div className="text-left">
              <h3 className="font-semibold text-lg">Bias Blindspot</h3>
              <p className={`text-sm ${activeModule === 'bias' ? 'text-purple-100' : 'text-gray-600 dark:text-gray-300'}`}>
                Identify biased language
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Module Content */}
      <div className="card">
        {error && (
          <Alert type="error" message={error} onClose={() => setError(null)} />
        )}

        {/* Fallacy Sparring Module */}
        {activeModule === 'sparring' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                <Sword className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <span>Fallacy Sparring</span>
              </h2>
              {challenge && !loading && (
                <button
                  onClick={handleNextChallenge}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>New Challenge</span>
                </button>
              )}
            </div>

            {loading && !challenge && <LoadingSpinner text="Loading challenge..." />}

            {challenge && !loading && (
              <div className="space-y-6">
                {/* Scenario */}
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border-l-4 border-l-purple-500 transition-colors">
                  <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
                    {challenge.scenario}
                  </p>
                </div>

                {/* Options */}
                <div>
                  <p className="font-semibold mb-3 text-gray-700 dark:text-gray-300">
                    Which logical fallacy is present in this scenario?
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {challenge.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelection(option)}
                        disabled={!!feedback || loading}
                        className={`p-4 rounded-lg border-2 transition-all text-left font-medium ${
                          !feedback
                            ? 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/30 dark:hover:border-purple-400'
                            : feedback.correctAnswer === option
                            ? 'border-green-500 bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300 dark:border-green-400'
                            : selectedAnswer === option
                            ? 'border-red-500 bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300 dark:border-red-400'
                            : 'border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400'
                        } ${!!feedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {feedback && (
                            <>
                              {feedback.correctAnswer === option && (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              )}
                              {selectedAnswer === option && selectedAnswer !== feedback.correctAnswer && (
                                <XCircle className="w-5 h-5 text-red-600" />
                              )}
                            </>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback */}
                {feedback && (
                  <div className={`p-6 rounded-xl animate-fade-in ${
                    feedback.isCorrect
                      ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-l-green-500'
                      : 'bg-red-50 dark:bg-red-900/20 border-l-4 border-l-red-500'
                  }`}>
                    <div className="flex items-start space-x-3 mb-3">
                      {feedback.isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                      )}
                      <div>
                        <h3 className={`font-bold text-lg mb-2 ${
                          feedback.isCorrect ? 'text-green-800 dark:text-green-400' : 'text-red-800 dark:text-red-400'
                        }`}>
                          {feedback.isCorrect ? 'Correct!' : 'Not quite right'}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                          <strong>Correct Answer:</strong> {feedback.correctAnswer}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {feedback.explanation}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleNextChallenge}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 mt-4"
                    >
                      <RefreshCw className="w-5 h-5" />
                      <span>Next Challenge</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Bias Blindspot Module */}
        {activeModule === 'bias' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center space-x-2">
                <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Bias Blindspot Challenge</h2>
              </div>
              {biasChallenge && !loading && (
                <button
                  onClick={loadBiasChallenge}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 whitespace-nowrap flex-shrink-0"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>New Topic</span>
                </button>
              )}
            </div>

            {loading && !biasChallenge && <LoadingSpinner text="Loading challenge..." />}

            {biasChallenge && !loading && (
              <div className="space-y-4">
                {/* Topic and Instructions */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border-l-4 border-l-purple-500 transition-colors">
                  <h3 className="font-bold text-lg mb-2 text-purple-900 dark:text-purple-300">
                    Topic: {biasChallenge.topic}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {biasChallenge.instructions}
                  </p>
                </div>

                {/* Legend */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-colors">
                  <p className="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-300">Bias Categories:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-100 border-2 border-red-500 rounded"></div>
                      <span><strong>Loaded Language:</strong> Words with strong connotations</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-orange-100 border-2 border-orange-500 rounded"></div>
                      <span><strong>Emotional Appeals:</strong> Appeals to emotion over logic</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-purple-100 border-2 border-purple-500 rounded"></div>
                      <span><strong>Biased Framing:</strong> Selective presentation</span>
                    </div>
                  </div>
                </div>

                {/* Side-by-side Articles */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Article A */}
                  <div className="border-2 border-blue-300 dark:border-blue-600 rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 h-[600px] transition-colors">
                    <BiasHighlighter
                      content={biasChallenge.articleA.content}
                      title={biasChallenge.articleA.title}
                      source={biasChallenge.articleA.source}
                      bias={biasChallenge.articleA.bias}
                      side="A"
                      initialHighlights={articleAHighlights}
                      onHighlightsChange={setArticleAHighlights}
                    />
                  </div>

                  {/* Article B */}
                  <div className="border-2 border-orange-300 dark:border-orange-600 rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 h-[600px] transition-colors">
                    <BiasHighlighter
                      content={biasChallenge.articleB.content}
                      title={biasChallenge.articleB.title}
                      source={biasChallenge.articleB.source}
                      bias={biasChallenge.articleB.bias}
                      side="B"
                      initialHighlights={articleBHighlights}
                      onHighlightsChange={setArticleBHighlights}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleSubmitBiasAnalysis}
                    disabled={submittingFeedback || (articleAHighlights.length === 0 && articleBHighlights.length === 0)}
                    className={`flex items-center space-x-2 px-8 py-4 text-lg font-bold rounded-lg shadow-lg transition-all duration-200 ${
                      (articleAHighlights.length === 0 && articleBHighlights.length === 0)
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        : submittingFeedback
                        ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white cursor-wait'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transform hover:scale-105 hover:shadow-xl'
                    }`}
                  >
                    {submittingFeedback ? (
                      <>
                        <LoadingSpinner />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Get Feedback on My Analysis</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Reflection Prompt */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-xl border-l-4 border-l-blue-500 transition-colors">
                  <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-300">Reflection Questions:</h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                    <li>What patterns of bias did you notice in each article?</li>
                    <li>How does each source frame the issue differently?</li>
                    <li>Which specific words or phrases reveal the author's perspective?</li>
                    <li>How might a neutral presentation of this topic differ from both articles?</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Feedback Modal */}
            {biasFeedback && (
              <BiasFeedback
                feedback={biasFeedback}
                onClose={() => setBiasFeedback(null)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DojoPage;
