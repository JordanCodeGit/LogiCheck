import { createContext, useContext, useState, useEffect } from 'react';

const EssayClinicContext = createContext();

export const useEssayClinic = () => {
  const context = useContext(EssayClinicContext);
  if (!context) {
    throw new Error('useEssayClinic must be used within EssayClinicProvider');
  }
  return context;
};

export const EssayClinicProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [essayText, setEssayText] = useState(() => {
    const saved = localStorage.getItem('essayClinic_essayText');
    return saved || '';
  });

  const [annotations, setAnnotations] = useState(() => {
    const saved = localStorage.getItem('essayClinic_annotations');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedAnnotation, setSelectedAnnotation] = useState(() => {
    const saved = localStorage.getItem('essayClinic_selectedAnnotation');
    return saved ? parseInt(saved) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [abortController, setAbortController] = useState(null);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('essayClinic_essayText', essayText);
  }, [essayText]);

  useEffect(() => {
    if (annotations && annotations.length > 0) {
      localStorage.setItem('essayClinic_annotations', JSON.stringify(annotations));
    } else {
      localStorage.removeItem('essayClinic_annotations');
    }
  }, [annotations]);

  useEffect(() => {
    if (selectedAnnotation !== null) {
      localStorage.setItem('essayClinic_selectedAnnotation', selectedAnnotation.toString());
    } else {
      localStorage.removeItem('essayClinic_selectedAnnotation');
    }
  }, [selectedAnnotation]);

  const clearEssayClinic = () => {
    setEssayText('');
    setAnnotations([]);
    setSelectedAnnotation(null);
    setError(null);
    localStorage.removeItem('essayClinic_essayText');
    localStorage.removeItem('essayClinic_annotations');
    localStorage.removeItem('essayClinic_selectedAnnotation');
  };

  const value = {
    essayText,
    setEssayText,
    annotations,
    setAnnotations,
    selectedAnnotation,
    setSelectedAnnotation,
    loading,
    setLoading,
    error,
    setError,
    abortController,
    setAbortController,
    clearEssayClinic,
  };

  return (
    <EssayClinicContext.Provider value={value}>
      {children}
    </EssayClinicContext.Provider>
  );
};

export default EssayClinicContext;
