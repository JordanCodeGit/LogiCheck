import { useEffect, useRef, useState } from 'react';
import { Sword, Trophy, Target, CheckCircle, XCircle, RefreshCw, Send } from 'lucide-react';
import { getSparringChallenge, verifySparringAnswer, getBiasChallenge, analyzeBiasHighlights } from '../api/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import BiasHighlighter from '../components/BiasHighlighter';
import BiasFeedback from '../components/BiasFeedback';
import { useDojo } from '../contexts/DojoContext';
import { useLanguage } from '../contexts/LanguageContext';

const DojoPage = () => {
  const { t } = useLanguage();
  
  // Separate loading states for each module
  const [sparringLoading, setSparringLoading] = useState(false);
  const [biasLoading, setBiasLoading] = useState(false);
  
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
    setSparringLoading(true);
    setError(null);
    setSelectedAnswer(null);
    setFeedback(null);

    try {
      const data = await getSparringChallenge();
      setChallenge(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSparringLoading(false);
    }
  };

  const loadBiasChallenge = async () => {
    // Don't clear challenge immediately - keep showing current one while loading
    setBiasLoading(true);
    setError(null);
    setArticleAHighlights([]);
    setArticleBHighlights([]);
    setBiasFeedback(null);

    try {
      const data = await getBiasChallenge();
      console.log('📥 Received bias challenge data:', {
        topic: data.topic,
        articleA_title: data.articleA.title,
        articleB_title: data.articleB.title
      });
      // Only update challenge after translation is complete
      setBiasChallenge(data);
    } catch (err) {
      console.error('Error loading bias challenge:', err);
      // Show more specific error message
      const errorMessage = err.response?.data?.error?.message || err.message || t('errors.loadFailed');
      setError(errorMessage);
      // Log detailed error information for debugging
      console.error('Detailed error:', {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        message: err.message
      });
    } finally {
      setBiasLoading(false);
    }
  };

  const handleSubmitBiasAnalysis = async () => {
    if (articleAHighlights.length === 0 && articleBHighlights.length === 0) {
      setError(t('dojo.bias.errorNoHighlights'));
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
        scenario: challenge.scenario,
        scenarioIndex: challenge.scenarioIndex // Add scenarioIndex for matching
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
          {t('dojo.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t('dojo.subtitle')}
        </p>
      </div>

      {/* Stats Bar */}
      <div className="card bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('dojo.stats.progress')}</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {stats.correct} / {stats.total} {t('dojo.stats.correct')}
                {stats.total > 0 && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    ({Math.round((stats.correct / stats.total) * 100)}%)
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-300">{t('dojo.stats.mastery')}</p>
            <p className="font-semibold text-purple-600 dark:text-purple-400">
              {stats.total < 5 ? t('dojo.stats.novice') : stats.total < 15 ? t('dojo.stats.apprentice') : t('dojo.stats.expert')}
            </p>
          </div>
        </div>
      </div>

      {/* Module Selection */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setActiveModule('sparring')}
          className={`card transition-all p-3 sm:p-4 ${
            activeModule === 'sparring'
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg'
              : 'hover:shadow-lg'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center sm:space-x-2 text-center sm:text-left">
            <Sword className="w-6 h-6 mb-1 sm:mb-0" />
            <div>
              <h3 className="font-semibold text-sm sm:text-base">{t('dojo.sparring.title')}</h3>
              <p className={`text-xs hidden sm:block ${activeModule === 'sparring' ? 'text-purple-100' : 'text-gray-600 dark:text-gray-300'}`}>
                {t('dojo.sparring.description')}
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setActiveModule('bias')}
          className={`card transition-all p-3 sm:p-4 ${
            activeModule === 'bias'
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg'
              : 'hover:shadow-lg'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center sm:space-x-2 text-center sm:text-left">
            <Target className="w-6 h-6 mb-1 sm:mb-0" />
            <div>
              <h3 className="font-semibold text-sm sm:text-base">{t('dojo.bias.title')}</h3>
              <p className={`text-xs hidden sm:block ${activeModule === 'bias' ? 'text-purple-100' : 'text-gray-600 dark:text-gray-300'}`}>
                {t('dojo.bias.description')}
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
                <span>{t('dojo.sparring.title')}</span>
              </h2>
              {challenge && !sparringLoading && (
                <button
                  onClick={handleNextChallenge}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{t('dojo.sparring.newChallenge')}</span>
                </button>
              )}
            </div>

            {sparringLoading && (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full"></div>
                  <div className="w-16 h-16 border-4 border-purple-600 dark:border-purple-400 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t('dojo.sparring.loadingChallenge')}</p>
                </div>
              </div>
            )}

            {challenge && !sparringLoading && (
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
                    {t('dojo.sparring.question')}
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
                          {feedback.isCorrect ? t('dojo.sparring.correct') : t('dojo.sparring.incorrect')}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                          <strong>{t('dojo.sparring.correctAnswer')}:</strong> {feedback.correctAnswer}
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
                      <span>{t('dojo.sparring.nextChallenge')}</span>
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
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{t('dojo.bias.challengeTitle')}</h2>
              </div>
              {!biasLoading && (
                <button
                  onClick={loadBiasChallenge}
                  disabled={biasLoading}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 whitespace-nowrap flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{t('dojo.bias.newTopic')}</span>
                </button>
              )}
            </div>

            {biasLoading && (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full"></div>
                  <div className="w-16 h-16 border-4 border-purple-600 dark:border-purple-400 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t('dojo.bias.loadingChallenge')}</p>
                </div>
              </div>
            )}

            {biasChallenge && !biasLoading && (
              <div className="space-y-4">
                {/* Topic and Instructions */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border-l-4 border-l-purple-500 transition-colors">
                  <h3 className="font-bold text-lg mb-2 text-purple-900 dark:text-purple-300">
                    {t('dojo.bias.topic')}: {biasChallenge.topic}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {biasChallenge.instructions}
                  </p>
                </div>

                {/* Legend */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-colors">
                  <p className="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-300">{t('dojo.bias.categories')}:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-100 border-2 border-red-500 rounded"></div>
                      <span><strong>{t('dojo.bias.loadedLanguage')}:</strong> {t('dojo.bias.loadedLanguageDesc')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-orange-100 border-2 border-orange-500 rounded"></div>
                      <span><strong>{t('dojo.bias.emotionalAppeals')}:</strong> {t('dojo.bias.emotionalAppealsDesc')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-purple-100 border-2 border-purple-500 rounded"></div>
                      <span><strong>{t('dojo.bias.biasedFraming')}:</strong> {t('dojo.bias.biasedFramingDesc')}</span>
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
                        <span>{t('dojo.bias.getFeedback')}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Reflection Prompt */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-xl border-l-4 border-l-blue-500 transition-colors">
                  <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-300">{t('dojo.bias.reflectionTitle')}:</h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                    <li>{t('dojo.bias.reflectionQ1')}</li>
                    <li>{t('dojo.bias.reflectionQ2')}</li>
                    <li>{t('dojo.bias.reflectionQ3')}</li>
                    <li>{t('dojo.bias.reflectionQ4')}</li>
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
