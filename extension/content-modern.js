// LogiCheck Lens - Content Script with Modern Design
// Injects into webpages to handle text selection and sidebar UI

console.log("LogiCheck content script loaded");

// Mock analysis data
const mockAnalysisData = {
  mainClaim: "The author argues that remote work is the future for all industries.",
  assumptions: [
    "Assumes all jobs can be done remotely.",
    "Assumes employees prefer working from home."
  ],
  fallacies: [
    {
      fallacyName: "Hasty Generalization",
      quote: "I saw one successful tech company go fully remote, so it proves every company should.",
      explanation: "Drawing a broad conclusion from a single, possibly unrepresentative, example."
    }
  ],
  socraticQuestion: "What evidence might challenge the idea that this model works for 'all' industries?"
};

// Inject modern CSS styles
function injectStyles() {
  if (document.getElementById('logicheck-styles')) return; // Already injected
  
  const styleElement = document.createElement('style');
  styleElement.id = 'logicheck-styles';
  styleElement.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    
    #logicheck-sidebar-root {
      position: fixed;
      top: 0;
      right: 0;
      width: 400px;
      height: 100vh;
      z-index: 2147483647;
      box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      animation: slideInRight 0.3s ease-out;
    }
    
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    .logicheck-sidebar {
      width: 100%;
      height: 100%;
      background: #f9fafb;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    .logicheck-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 24px;
      background: linear-gradient(135deg, #2563eb 0%, #0891b2 100%);
      color: white;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
    }
    
    .logicheck-header-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .logicheck-logo {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .logicheck-logo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .logicheck-header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      background: linear-gradient(45deg, #ffffff 0%, #e0f2fe 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .logicheck-subtitle {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.8);
      margin-top: 2px;
    }
    
    .logicheck-close-btn {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      padding: 8px;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      transition: all 0.2s ease;
      backdrop-filter: blur(10px);
    }
    
    .logicheck-close-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
    }
    
    .logicheck-content {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      background: #f9fafb;
    }
    
    .logicheck-section {
      margin-bottom: 24px;
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e5e7eb;
      transition: all 0.2s ease;
    }
    
    .logicheck-section:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }
    
    .logicheck-section h3 {
      margin: 0 0 12px 0;
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .logicheck-section-icon {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }
    
    .icon-claim {
      background: #dbeafe;
      color: #2563eb;
    }
    
    .icon-assumptions {
      background: #fef3c7;
      color: #d97706;
    }
    
    .icon-fallacies {
      background: #fee2e2;
      color: #dc2626;
    }
    
    .icon-question {
      background: #d1fae5;
      color: #059669;
    }
    
    .logicheck-section p {
      margin: 0;
      font-size: 14px;
      line-height: 1.6;
      color: #4b5563;
    }
    
    .logicheck-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .logicheck-list li {
      margin-bottom: 12px;
      padding: 12px;
      background: #f9fafb;
      border-radius: 8px;
      border-left: 4px solid #e5e7eb;
      font-size: 14px;
      line-height: 1.5;
      color: #374151;
      transition: all 0.2s ease;
    }
    
    .logicheck-list li:hover {
      border-left-color: #3b82f6;
      background: #eff6ff;
    }
    
    .logicheck-fallacy {
      border: 1px solid #fee2e2;
      background: #fef2f2;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
    }
    
    .logicheck-fallacy-name {
      font-weight: 600;
      color: #dc2626;
      font-size: 15px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .logicheck-fallacy-quote {
      font-style: italic;
      color: #6b7280;
      background: white;
      padding: 12px;
      border-radius: 8px;
      border-left: 4px solid #fca5a5;
      margin: 8px 0;
      font-size: 13px;
    }
    
    .logicheck-fallacy-explanation {
      color: #374151;
      font-size: 14px;
      line-height: 1.5;
    }
    
    .logicheck-question {
      background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
      border: 1px solid #6ee7b7;
      border-radius: 12px;
      padding: 16px;
      color: #065f46;
      font-size: 14px;
      line-height: 1.6;
      font-weight: 500;
    }
    
    .logicheck-badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 8px;
      background: #fee2e2;
      color: #dc2626;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      margin-left: 8px;
    }
    
    .logicheck-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      color: #6b7280;
    }
    
    .logicheck-spinner {
      width: 24px;
      height: 24px;
      border: 3px solid #e5e7eb;
      border-top: 3px solid #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 12px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .logicheck-footer {
      padding: 16px 24px;
      background: white;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 12px;
    }
    
    .logicheck-btn {
      flex: 1;
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .logicheck-btn-primary {
      background: linear-gradient(135deg, #2563eb 0%, #0891b2 100%);
      color: white;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
    }
    
    .logicheck-btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
    }
    
    .logicheck-btn-secondary {
      background: white;
      color: #374151;
      border: 1px solid #d1d5db;
    }
    
    .logicheck-btn-secondary:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }
    
    /* Custom scrollbar */
    .logicheck-content::-webkit-scrollbar {
      width: 8px;
    }
    
    .logicheck-content::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    
    .logicheck-content::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    
    .logicheck-content::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  `;
  
  document.head.appendChild(styleElement);
}

// Create and show modern sidebar
function createSidebar(data) {
  // Remove existing sidebar if any
  const existingSidebar = document.getElementById('logicheck-sidebar-root');
  if (existingSidebar) {
    existingSidebar.remove();
  }

  // Inject styles if not already present
  injectStyles();

  // Create sidebar root
  const sidebarRoot = document.createElement('div');
  sidebarRoot.id = 'logicheck-sidebar-root';
  
  // Determine content based on data state
  let contentHTML = '';
  if (!data || data.loading) {
    contentHTML = createLoadingContent(data?.selectedText);
  } else if (data.error || !data.success) {
    contentHTML = createErrorContent(data.error || 'Analysis failed');
  } else {
    contentHTML = createAnalysisContent(data);
  }
  
  // Create sidebar content
  sidebarRoot.innerHTML = `
    <div class="logicheck-sidebar">
      <div class="logicheck-header">
        <div class="logicheck-header-content">
          <div class="logicheck-logo">
            <img src="${chrome.runtime.getURL('images/logo_logicheck_extension.png')}" alt="LogiCheck Logo">
          </div>
          <div>
            <h2>LogiCheck Analysis</h2>
            <div class="logicheck-subtitle">Logical reasoning insights</div>
          </div>
        </div>
        <button class="logicheck-close-btn">✕</button>
      </div>
      
      <div class="logicheck-content">
        ${contentHTML}
      </div>
    </div>
  `;
  
  document.body.appendChild(sidebarRoot);
  
  // Make close function available via event listener instead of inline onclick
  const closeBtn = sidebarRoot.querySelector('.logicheck-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      sidebarRoot.remove();
    });
  }
}

// Create loading content
function createLoadingContent(selectedText) {
  let html = `
    <div class="logicheck-loading">
      <div class="logicheck-spinner"></div>
      <span>Analyzing text...</span>
    </div>
  `;
  
  if (selectedText) {
    html += `
      <div class="logicheck-section" style="margin-top: 20px;">
        <h3>Selected Text:</h3>
        <p style="color: #6b7280; font-size: 14px;">${selectedText.substring(0, 200)}${selectedText.length > 200 ? '...' : ''}</p>
      </div>
    `;
  }
  
  return html;
}

// Create error content
function createErrorContent(errorMessage) {
  return `
    <div class="logicheck-section" style="background: #fee2e2; border-color: #fecaca;">
      <h3 style="color: #dc2626;">
        <span class="logicheck-section-icon">⚠️</span>
        Analysis Error
      </h3>
      <p style="color: #991b1b;">${errorMessage}</p>
      <p style="color: #6b7280; font-size: 13px; margin-top: 12px;">
        Please check your API key configuration in the extension options and try again.
      </p>
    </div>
  `;
}

// Create analysis content with modern design
function createAnalysisContent(data) {
  let html = '';
  
  // Main Claim
  if (data.mainClaim) {
    html += `
      <div class="logicheck-section">
        <h3>
          <span class="logicheck-section-icon icon-claim">💡</span>
          Main Claim
        </h3>
        <p>${data.mainClaim}</p>
      </div>
    `;
  }
  
  // Underlying Assumptions
  if (data.assumptions && data.assumptions.length > 0) {
    html += `
      <div class="logicheck-section">
        <h3>
          <span class="logicheck-section-icon icon-assumptions">🤔</span>
          Underlying Assumptions
        </h3>
        <ul class="logicheck-list">
          ${data.assumptions.map(assumption => `<li>${assumption}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  // Fallacies
  if (data.fallacies && data.fallacies.length > 0) {
    html += `
      <div class="logicheck-section">
        <h3>
          <span class="logicheck-section-icon icon-fallacies">🚫</span>
          Logical Fallacies
          <span class="logicheck-badge">${data.fallacies.length} found</span>
        </h3>
        ${data.fallacies.map(fallacy => `
          <div class="logicheck-fallacy">
            <div class="logicheck-fallacy-name">
              ⚠️ ${fallacy.fallacyName}
            </div>
            <div class="logicheck-fallacy-quote">"${fallacy.quote}"</div>
            <div class="logicheck-fallacy-explanation">${fallacy.explanation}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  // Socratic Question
  if (data.socraticQuestion) {
    html += `
      <div class="logicheck-section">
        <h3>
          <span class="logicheck-section-icon icon-question">❓</span>
          Socratic Question
        </h3>
        <div class="logicheck-question">
          ${data.socraticQuestion}
        </div>
      </div>
    `;
  }
  
  return html;
}

// Initialize content script
function initialize() {
  injectStyles();
  
  // Add context menu listener for selected text analysis
  document.addEventListener('contextmenu', function(event) {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      // Store selected text for context menu action
      sessionStorage.setItem('logicheck-selected-text', selectedText);
    }
  });
}

// Listen for API key sync from web page
window.addEventListener('message', (event) => {
  // Only accept messages from same origin/window
  if (event.source !== window) return;
  
  // Handle sync API key FROM web TO extension
  if (event.data.type === 'LOGICHECK_API_KEY_SYNC' && event.data.source === 'logicheck-web') {
    const apiKey = event.data.apiKey;
    // Send to background script to save
    chrome.runtime.sendMessage({
      action: 'syncApiKeyFromWeb',
      apiKey: apiKey
    }, (response) => {
      // Send response back to web page
      window.postMessage({
        type: 'LOGICHECK_API_KEY_SYNC_RESPONSE',
        source: 'logicheck-extension',
        success: response?.status === 'ok'
      }, '*');
    });
  }
  
  // Handle get API key request FROM web
  if (event.data.type === 'LOGICHECK_GET_API_KEY' && event.data.source === 'logicheck-web') {
    // Get API key from extension storage
    chrome.runtime.sendMessage(
      { action: 'getApiKey' },
      (response) => {
        window.postMessage({
          type: 'LOGICHECK_GET_API_KEY_RESPONSE',
          source: 'logicheck-extension',
          apiKey: response?.apiKey || null
        }, '*');
      }
    );
  }
});

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSelectedText') {
    const selectedText = window.getSelection().toString().trim();
    sendResponse({ text: selectedText });
    return true;
  } 
  
  if (request.action === 'showLoading') {
    // Show loading sidebar with the selected text
    const loadingData = {
      success: false,
      loading: true,
      selectedText: request.text
    };
    createSidebar(loadingData);
    sendResponse({ success: true });
    return true;
  }
  
  if (request.action === 'displayAnalysis') {
    // Display the analysis result in sidebar
    const result = request.result;
    
    if (result && result.success && result.data) {
      createSidebar({
        success: true,
        loading: false,
        ...result.data
      });
    } else {
      // Show error state
      createSidebar({
        success: false,
        loading: false,
        error: result?.error || 'Analysis failed'
      });
    }
    
    sendResponse({ success: true });
    return true;
  }
  
  if (request.action === 'analyzeSelectedText') {
    const selectedText = sessionStorage.getItem('logicheck-selected-text') || 
                        window.getSelection().toString().trim();
    
    if (selectedText) {
      // Show loading sidebar first
      createSidebar({
        success: false,
        loading: true,
        selectedText: selectedText
      });
      
      // Send to background for actual analysis
      chrome.runtime.sendMessage({
        action: 'analyzeSelectedText',
        text: selectedText
      });
    }
    
    sendResponse({ success: true });
    return true;
  }
  
  // Handle API key sync notification from background
  if (request.action === 'syncApiKeyFromExtension') {
    // Notify web page about API key change
    window.postMessage({
      type: 'LOGICHECK_API_KEY_CHANGED',
      source: 'logicheck-extension',
      apiKey: request.apiKey
    }, '*');
    return true;
  }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}