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
    
    :root {
      /* Light mode colors */
      --logicheck-bg-root: #f9fafb;
      --logicheck-bg-sidebar: #f9fafb;
      --logicheck-bg-section: #ffffff;
      --logicheck-text-primary: #111827;
      --logicheck-text-secondary: #374151;
      --logicheck-text-tertiary: #6b7280;
      --logicheck-border: #e5e7eb;
      --logicheck-shadow: rgba(0, 0, 0, 0.1);
      --logicheck-shadow-hover: rgba(0, 0, 0, 0.15);
      --logicheck-gradient-start: #2563eb;
      --logicheck-gradient-end: #0891b2;
      --logicheck-fallacy-bg: #fef2f2;
      --logicheck-fallacy-border: #ef4444;
      --logicheck-fallacy-text: #b91c1c;
      --logicheck-socratic-bg: #eff6ff;
      --logicheck-socratic-border: #3b82f6;
    }

    .logicheck-dark {
      /* Dark mode colors */
      --logicheck-bg-root: #111827;
      --logicheck-bg-sidebar: #111827;
      --logicheck-bg-section: #1f2937;
      --logicheck-text-primary: #f9fafb;
      --logicheck-text-secondary: #e5e7eb;
      --logicheck-text-tertiary: #9ca3af;
      --logicheck-border: #374151;
      --logicheck-shadow: rgba(0, 0, 0, 0.3);
      --logicheck-shadow-hover: rgba(0, 0, 0, 0.4);
      --logicheck-gradient-start: #1e40af;
      --logicheck-gradient-end: #0e7490;
      --logicheck-fallacy-bg: #7f1d1d;
      --logicheck-fallacy-border: #ef4444;
      --logicheck-fallacy-text: #fca5a5;
      --logicheck-socratic-bg: #1e3a5f;
      --logicheck-socratic-border: #60a5fa;
    }
    
    #logicheck-sidebar-root {
      position: fixed;
      top: 0;
      right: 0;
      width: 400px;
      height: 100vh;
      z-index: 2147483647;
      box-shadow: -4px 0 24px var(--logicheck-shadow);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      animation: slideInRight 0.3s ease-out;
      transition: box-shadow 0.3s ease;
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
      background: var(--logicheck-bg-sidebar);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition: background-color 0.3s ease;
    }
    
    .logicheck-header {
      background: linear-gradient(135deg, var(--logicheck-gradient-start) 0%, var(--logicheck-gradient-end) 100%);
      color: white;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
      transition: all 0.3s ease;
      padding: 20px 24px;
    }
    
    .logicheck-header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .logicheck-header-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .logicheck-logo {
      width: 48px;
      height: 48px;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
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
    
    .logicheck-theme-toggle {
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(255, 255, 255, 0.2);
      color: white;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      padding: 8px 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border-radius: 8px;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
      white-space: nowrap;
      width: auto;
    }
    
    .logicheck-theme-toggle:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
      border-color: rgba(255, 255, 255, 0.3);
    }
    
    .logicheck-theme-icon {
      width: 18px;
      height: 18px;
      transition: transform 0.3s ease;
      flex-shrink: 0;
    }
    
    .logicheck-theme-toggle:hover .logicheck-theme-icon {
      transform: rotate(180deg);
    }
    
    .logicheck-theme-text {
      font-size: 13px;
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
      background: var(--logicheck-bg-root);
      transition: background-color 0.3s ease;
    }
    
    .logicheck-section {
      margin-bottom: 24px;
      background: var(--logicheck-bg-section);
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 1px 3px var(--logicheck-shadow);
      border: 1px solid var(--logicheck-border);
      transition: all 0.3s ease;
    }
    
    .logicheck-section:hover {
      box-shadow: 0 4px 12px var(--logicheck-shadow-hover);
      transform: translateY(-2px);
    }
    
    .logicheck-section h3 {
      margin: 0 0 12px 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--logicheck-text-primary);
      display: flex;
      align-items: center;
      gap: 8px;
      transition: color 0.3s ease;
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
      color: var(--logicheck-text-secondary);
      transition: color 0.3s ease;
    }
    
    .logicheck-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .logicheck-list li {
      margin-bottom: 12px;
      padding: 12px;
      background: var(--logicheck-bg-root);
      border-radius: 8px;
      border-left: 4px solid var(--logicheck-border);
      font-size: 14px;
      line-height: 1.5;
      color: var(--logicheck-text-secondary);
      transition: all 0.3s ease;
    }
    
    .logicheck-dark .logicheck-list li {
      background: #374151;
      border-left-color: #4b5563;
      color: #e5e7eb;
    }
    
    .logicheck-list li:hover {
      border-left-color: #3b82f6;
      background: #eff6ff;
    }
    
    .logicheck-dark .logicheck-list li:hover {
      background: #1e3a5f;
      border-left-color: #60a5fa;
    }
    
    .logicheck-fallacy {
      border: 1px solid var(--logicheck-fallacy-border);
      background: var(--logicheck-fallacy-bg);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      transition: all 0.3s ease;
    }
    
    .logicheck-fallacy-name {
      font-weight: 600;
      color: var(--logicheck-fallacy-text);
      font-size: 15px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: color 0.3s ease;
    }
    
    .logicheck-fallacy-quote {
      font-style: italic;
      color: var(--logicheck-text-tertiary);
      background: var(--logicheck-bg-section);
      padding: 12px;
      border-radius: 8px;
      border-left: 4px solid var(--logicheck-fallacy-border);
      margin: 8px 0;
      font-size: 13px;
      transition: all 0.3s ease;
    }
    
    .logicheck-dark .logicheck-fallacy-quote {
      color: #d1d5db;
      background: #111827;
      border-left-color: #ef4444;
    }
    
    .logicheck-fallacy-explanation {
      color: var(--logicheck-text-secondary);
      font-size: 14px;
      line-height: 1.5;
      transition: color 0.3s ease;
    }
    
    .logicheck-question {
      background: var(--logicheck-socratic-bg);
      border: 1px solid var(--logicheck-socratic-border);
      border-radius: 12px;
      padding: 16px;
      color: var(--logicheck-text-primary);
      font-size: 14px;
      line-height: 1.6;
      font-weight: 500;
      transition: all 0.3s ease;
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
    
    .logicheck-selected-text {
      color: var(--logicheck-text-tertiary);
      font-size: 14px;
      line-height: 1.6;
      transition: color 0.3s ease;
    }
    
    .logicheck-dark .logicheck-selected-text {
      color: #d1d5db;
    }
    
    .logicheck-error-section {
      background: #fee2e2;
      border-color: #fecaca;
    }
    
    .logicheck-dark .logicheck-error-section {
      background: #7f1d1d;
      border-color: #991b1b;
    }
    
    .logicheck-error-title {
      color: #dc2626 !important;
    }
    
    .logicheck-dark .logicheck-error-title {
      color: #fca5a5 !important;
    }
    
    .logicheck-error-message {
      color: #991b1b;
      font-size: 14px;
      line-height: 1.6;
    }
    
    .logicheck-dark .logicheck-error-message {
      color: #fecaca;
    }
    
    .logicheck-error-help {
      color: #6b7280;
      font-size: 13px;
      margin-top: 12px;
    }
    
    .logicheck-dark .logicheck-error-help {
      color: #d1d5db;
    }
    
    .logicheck-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      color: var(--logicheck-text-tertiary);
      transition: color 0.3s ease;
    }
    
    .logicheck-dark .logicheck-loading {
      color: #d1d5db;
    }
    
    .logicheck-spinner {
      width: 24px;
      height: 24px;
      border: 3px solid #e5e7eb;
      border-top: 3px solid #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 12px;
      transition: border-color 0.3s ease;
    }
    
    .logicheck-dark .logicheck-spinner {
      border: 3px solid #374151;
      border-top: 3px solid #60a5fa;
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
        <div class="logicheck-header-top">
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
        <button class="logicheck-theme-toggle" title="Toggle dark mode">
          <svg class="logicheck-theme-icon logicheck-sun-icon" fill="currentColor" viewBox="0 0 20 20" style="display: none; color: #fbbf24;">
            <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
          </svg>
          <span class="logicheck-theme-text logicheck-sun-text" style="display: none;">Switch to Light Mode</span>
          <svg class="logicheck-theme-icon logicheck-moon-icon" fill="currentColor" viewBox="0 0 20 20" style="display: block; color: #e0f2fe;">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
          </svg>
          <span class="logicheck-theme-text logicheck-moon-text" style="display: block;">Switch to Dark Mode</span>
        </button>
      </div>
      
      <div class="logicheck-content">
        ${contentHTML}
      </div>
    </div>
  `;
  
  document.body.appendChild(sidebarRoot);
  
  // Apply current theme after rendering
  chrome.storage.sync.get(['theme'], (result) => {
    const theme = result.theme || 'light';
    applySidebarTheme(theme);
    updateSidebarThemeIcons(theme);
  });
  
  // Add theme toggle listener
  const themeToggleBtn = sidebarRoot.querySelector('.logicheck-theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      chrome.storage.sync.get(['theme'], (result) => {
        const currentTheme = result.theme || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        chrome.storage.sync.set({ theme: newTheme }, () => {
          applySidebarTheme(newTheme);
          updateSidebarThemeIcons(newTheme);
          
          // Notify other tabs about theme change
          chrome.runtime.sendMessage({
            action: 'broadcastThemeChange',
            theme: newTheme
          });
        });
      });
    });
  }
  
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
  let html = '';
  
  if (selectedText) {
    html += `
      <div class="logicheck-section" style="margin-bottom: 20px;">
        <h3>Selected Text:</h3>
        <p class="logicheck-selected-text">${selectedText.substring(0, 200)}${selectedText.length > 200 ? '...' : ''}</p>
      </div>
    `;
  }
  
  html += `
    <div class="logicheck-loading">
      <div class="logicheck-spinner"></div>
      <span>Analyzing text...</span>
    </div>
  `;
  
  return html;
}

// Create error content
function createErrorContent(errorMessage) {
  return `
    <div class="logicheck-section logicheck-error-section">
      <h3 class="logicheck-error-title">
        <span class="logicheck-section-icon">⚠️</span>
        Analysis Error
      </h3>
      <p class="logicheck-error-message">${errorMessage}</p>
      <p class="logicheck-error-help">
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
  
  // Handle sync server key mode FROM web TO extension
  if (event.data.type === 'LOGICHECK_SERVER_KEY_SYNC' && event.data.source === 'logicheck-web') {
    const enabled = event.data.enabled;
    chrome.runtime.sendMessage({
      action: 'setServerKeyMode',
      enabled: enabled
    }, (response) => {
      window.postMessage({
        type: 'LOGICHECK_SERVER_KEY_SYNC_RESPONSE',
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
          apiKey: response?.apiKey || null,
          useServerKey: response?.useServerKey || false
        }, '*');
      }
    );
  }
});

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'themeChanged') {
    // Apply theme change to sidebar
    applySidebarTheme(request.theme);
    updateSidebarThemeIcons(request.theme);
    sendResponse({ status: 'theme applied' });
    return true;
  }
  
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
      type: 'LOGICHECK_API_KEY_SYNC',
      source: 'logicheck-extension',
      apiKey: request.apiKey
    }, '*');
    return true;
  }
  
  // Handle server key mode sync notification from background
  if (request.action === 'syncServerKeyModeFromExtension') {
    // Notify web page about server key mode change
    window.postMessage({
      type: 'LOGICHECK_SERVER_KEY_SYNC',
      source: 'logicheck-extension',
      enabled: request.enabled
    }, '*');
    return true;
  }
});

// Initialize when DOM is ready
function initialize() {
  console.log('LogiCheck: Content script initialized');
  injectStyles();
  
  // Initialize theme from storage
  chrome.storage.sync.get(['theme'], (result) => {
    const theme = result.theme || 'light';
    applySidebarTheme(theme);
  });
}

// Apply theme to sidebar
function applySidebarTheme(theme) {
  const sidebarRoot = document.getElementById('logicheck-sidebar-root');
  const sidebar = sidebarRoot?.querySelector('.logicheck-sidebar');
  
  if (sidebar) {
    if (theme === 'dark') {
      sidebar.classList.add('logicheck-dark');
    } else {
      sidebar.classList.remove('logicheck-dark');
    }
  }
}

// Update theme icons in sidebar
function updateSidebarThemeIcons(theme) {
  const sidebarRoot = document.getElementById('logicheck-sidebar-root');
  const sunIcon = sidebarRoot?.querySelector('.logicheck-sun-icon');
  const moonIcon = sidebarRoot?.querySelector('.logicheck-moon-icon');
  const sunText = sidebarRoot?.querySelector('.logicheck-sun-text');
  const moonText = sidebarRoot?.querySelector('.logicheck-moon-text');
  
  if (theme === 'dark') {
    if (sunIcon) sunIcon.style.display = 'block';
    if (moonIcon) moonIcon.style.display = 'none';
    if (sunText) sunText.style.display = 'block';
    if (moonText) moonText.style.display = 'none';
  } else {
    if (sunIcon) sunIcon.style.display = 'none';
    if (moonIcon) moonIcon.style.display = 'block';
    if (sunText) sunText.style.display = 'none';
    if (moonText) moonText.style.display = 'block';
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}