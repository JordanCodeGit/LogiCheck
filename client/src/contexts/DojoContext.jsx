import { createContext, useContext, useState, useEffect } from 'react';

const DojoContext = createContext();

export const useDojo = () => {
  const context = useContext(DojoContext);
  if (!context) {
    throw new Error('useDojo must be used within DojoProvider');
  }
  return context;
};

export const DojoProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [activeModule, setActiveModule] = useState(() => {
    const saved = localStorage.getItem('dojo_activeModule');
    return saved || 'sparring';
  });

  const [challenge, setChallenge] = useState(() => {
    const saved = localStorage.getItem('dojo_challenge');
    return saved ? JSON.parse(saved) : null;
  });

  const [biasChallenge, setBiasChallenge] = useState(() => {
    const saved = localStorage.getItem('dojo_biasChallenge');
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedAnswer, setSelectedAnswer] = useState(() => {
    const saved = localStorage.getItem('dojo_selectedAnswer');
    return saved || null;
  });

  const [feedback, setFeedback] = useState(() => {
    const saved = localStorage.getItem('dojo_feedback');
    return saved ? JSON.parse(saved) : null;
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('dojo_stats');
    return saved ? JSON.parse(saved) : { total: 0, correct: 0 };
  });

  const [articleAHighlights, setArticleAHighlights] = useState(() => {
    const saved = localStorage.getItem('dojo_articleAHighlights');
    return saved ? JSON.parse(saved) : [];
  });

  const [articleBHighlights, setArticleBHighlights] = useState(() => {
    const saved = localStorage.getItem('dojo_articleBHighlights');
    return saved ? JSON.parse(saved) : [];
  });

  const [biasFeedback, setBiasFeedback] = useState(() => {
    const saved = localStorage.getItem('dojo_biasFeedback');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('dojo_activeModule', activeModule);
  }, [activeModule]);

  useEffect(() => {
    if (challenge) {
      localStorage.setItem('dojo_challenge', JSON.stringify(challenge));
    } else {
      localStorage.removeItem('dojo_challenge');
    }
  }, [challenge]);

  useEffect(() => {
    if (biasChallenge) {
      localStorage.setItem('dojo_biasChallenge', JSON.stringify(biasChallenge));
    } else {
      localStorage.removeItem('dojo_biasChallenge');
    }
  }, [biasChallenge]);

  useEffect(() => {
    if (selectedAnswer) {
      localStorage.setItem('dojo_selectedAnswer', selectedAnswer);
    } else {
      localStorage.removeItem('dojo_selectedAnswer');
    }
  }, [selectedAnswer]);

  useEffect(() => {
    if (feedback) {
      localStorage.setItem('dojo_feedback', JSON.stringify(feedback));
    } else {
      localStorage.removeItem('dojo_feedback');
    }
  }, [feedback]);

  useEffect(() => {
    localStorage.setItem('dojo_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('dojo_articleAHighlights', JSON.stringify(articleAHighlights));
  }, [articleAHighlights]);

  useEffect(() => {
    localStorage.setItem('dojo_articleBHighlights', JSON.stringify(articleBHighlights));
  }, [articleBHighlights]);

  useEffect(() => {
    if (biasFeedback) {
      localStorage.setItem('dojo_biasFeedback', JSON.stringify(biasFeedback));
    } else {
      localStorage.removeItem('dojo_biasFeedback');
    }
  }, [biasFeedback]);

  const clearDojo = () => {
    setChallenge(null);
    setBiasChallenge(null);
    setSelectedAnswer(null);
    setFeedback(null);
    setArticleAHighlights([]);
    setArticleBHighlights([]);
    setBiasFeedback(null);
    localStorage.removeItem('dojo_challenge');
    localStorage.removeItem('dojo_biasChallenge');
    localStorage.removeItem('dojo_selectedAnswer');
    localStorage.removeItem('dojo_feedback');
    localStorage.removeItem('dojo_articleAHighlights');
    localStorage.removeItem('dojo_articleBHighlights');
    localStorage.removeItem('dojo_biasFeedback');
  };

  const value = {
    activeModule,
    setActiveModule,
    challenge,
    setChallenge,
    biasChallenge,
    setBiasChallenge,
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
    loading,
    setLoading,
    error,
    setError,
    submittingFeedback,
    setSubmittingFeedback,
    clearDojo,
  };

  return (
    <DojoContext.Provider value={value}>
      {children}
    </DojoContext.Provider>
  );
};

export default DojoContext;
