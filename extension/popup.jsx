/**
 * LogiCheck Extension Popup
 * Uses shared components and API
 */

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Button, Card, LoadingSpinner, Alert } from '@shared/components';
import { analyzeText, hasApiKey } from '@shared/api/shared-api';
import '@shared/styles/globals.css';

const Popup = () => {
  const [selectedText, setSelectedText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKeyConfigured, setApiKeyConfigured] = useState(false);

  useEffect(() => {
    // Check if API key is configured
    const checkApiKey = async () => {
      const hasKey = await hasApiKey();
      setApiKeyConfigured(hasKey);
    };
    checkApiKey();

    // Get selected text from active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: 'getSelectedText' },
        (response) => {
          if (response && response.text) {
            setSelectedText(response.text);
          }
        }
      );
    });
  }, []);

  const handleAnalyze = async () => {
    if (!selectedText.trim()) {
      setError('No text selected. Please select text on the page.');
      return;
    }

    if (!apiKeyConfigured) {
      setError('Please configure your API key in the extension options.');
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeText(selectedText);
      setAnalysis(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-primary-600">LogiCheck</h1>
        <p className="text-sm text-gray-600">Analyze selected text</p>
      </div>

      {/* API Key Warning */}
      {!apiKeyConfigured && (
        <Alert
          type="warning"
          message="API key not configured"
          dismissible={false}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={openOptions}
            className="mt-2"
          >
            Configure API Key
          </Button>
        </Alert>
      )}

      {/* Selected Text */}
      {selectedText && (
        <Card variant="flat">
          <p className="text-xs text-gray-500 mb-2">Selected Text:</p>
          <p className="text-sm text-gray-800 line-clamp-3">
            {selectedText}
          </p>
        </Card>
      )}

      {/* Analyze Button */}
      <Button
        variant="primary"
        onClick={handleAnalyze}
        disabled={!selectedText || !apiKeyConfigured || loading}
        className="w-full"
      >
        {loading ? 'Analyzing...' : 'Analyze Text'}
      </Button>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="md" text="Analyzing..." />
        </div>
      )}

      {/* Error */}
      {error && (
        <Alert
          type="error"
          message={error}
          dismissible
          onDismiss={() => setError(null)}
        />
      )}

      {/* Results */}
      {analysis && (
        <div className="space-y-3">
          <Alert type="success" message="Analysis complete!" />
          
          {/* Main Claim */}
          {analysis.mainClaim && (
            <Card>
              <h3 className="font-semibold text-sm text-gray-700 mb-2">
                Main Claim
              </h3>
              <p className="text-sm">{analysis.mainClaim}</p>
            </Card>
          )}

          {/* Fallacies Count */}
          {analysis.fallacies && analysis.fallacies.length > 0 && (
            <div className="text-sm text-center">
              <span className="text-red-600 font-semibold">
                {analysis.fallacies.length}
              </span>{' '}
              {analysis.fallacies.length === 1 ? 'fallacy' : 'fallacies'} detected
            </div>
          )}

          {/* View Full Results */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Open full results in a new tab or side panel
              chrome.tabs.create({
                url: chrome.runtime.getURL('results.html') + '?data=' + encodeURIComponent(JSON.stringify(analysis))
              });
            }}
            className="w-full"
          >
            View Full Results
          </Button>
        </div>
      )}
    </div>
  );
};

// Render popup
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Popup />);
