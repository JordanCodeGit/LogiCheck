import { createContext, useContext, useState, useEffect } from 'react';

const AnalyzerContext = createContext();

export const useAnalyzer = () => {
  const context = useContext(AnalyzerContext);
  if (!context) {
    throw new Error('useAnalyzer must be used within AnalyzerProvider');
  }
  return context;
};

export const AnalyzerProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [inputText, setInputText] = useState(() => {
    const saved = localStorage.getItem('analyzer_inputText');
    return saved || '';
  });

  const [analysis, setAnalysis] = useState(() => {
    const saved = localStorage.getItem('analyzer_analysis');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [abortController, setAbortController] = useState(null);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('analyzer_inputText', inputText);
  }, [inputText]);

  useEffect(() => {
    if (analysis) {
      localStorage.setItem('analyzer_analysis', JSON.stringify(analysis));
    } else {
      localStorage.removeItem('analyzer_analysis');
    }
  }, [analysis]);

  const clearAnalyzer = () => {
    setInputText('');
    setAnalysis(null);
    setError(null);
    localStorage.removeItem('analyzer_inputText');
    localStorage.removeItem('analyzer_analysis');
  };

  const value = {
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
    clearAnalyzer,
  };

  return (
    <AnalyzerContext.Provider value={value}>
      {children}
    </AnalyzerContext.Provider>
  );
};

export default AnalyzerContext;
