// LogiCheck Lens - Content Script
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

// Inject CSS styles
function injectStyles() {
  if (document.getElementById('logicheck-styles')) return; // Already injected
  
  const styleElement = document.createElement('style');
  styleElement.id = 'logicheck-styles';
  styleElement.textContent = `
    #logicheck-sidebar-root {
      position: fixed;
      top: 0;
      right: 0;
      width: 350px;
      height: 100vh;
      z-index: 2147483647;
      box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    }
    
    .logicheck-sidebar {
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    .logicheck-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      background-color: #4a5568;
      color: white;
      border-bottom: 2px solid #2d3748;
    }
    
    .logicheck-header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
    }
    
    .logicheck-close-btn {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: background-color 0.2s;
    }
    
    .logicheck-close-btn:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .logicheck-content {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      background-color: #f7fafc;
    }
    
    .logicheck-section {
      margin-bottom: 24px;
      background-color: white;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .logicheck-section h3 {
      margin: 0 0 12px 0;
      font-size: 16px;
      font-weight: 600;
      color: #2d3748;
      border-bottom: 2px solid #4a5568;
      padding-bottom: 8px;
    }
    
    .main-claim {
      margin: 0;
      font-size: 14px;
      line-height: 1.6;
      color: #1a202c;
      font-weight: 500;
    }
    
    .assumptions-list {
      margin: 0;
      padding-left: 20px;
      list-style-type: disc;
    }
    
    .assumptions-list li {
      margin-bottom: 8px;
      font-size: 14px;
      line-height: 1.5;
      color: #2d3748;
    }
    
    .fallacy-card {
      padding: 12px;
      background-color: #fff5f5;
      border-left: 4px solid #f56565;
      border-radius: 4px;
      margin-bottom: 12px;
    }
    
    .fallacy-card:last-child {
      margin-bottom: 0;
    }
    
    .fallacy-name {
      margin: 0 0 8px 0;
      font-size: 15px;
      font-weight: 600;
      color: #c53030;
    }
    
    .fallacy-quote {
      margin: 0 0 8px 0;
      padding: 8px 12px;
      background-color: white;
      border-left: 3px solid #feb2b2;
      font-style: italic;
      font-size: 13px;
      color: #4a5568;
    }
    
    .fallacy-explanation {
      margin: 0;
      font-size: 13px;
      line-height: 1.5;
      color: #2d3748;
    }
    
    .socratic-question {
      margin: 0;
      font-size: 14px;
      line-height: 1.6;
      color: #2d3748;
      font-style: italic;
      padding: 12px;
      background-color: #ebf8ff;
      border-left: 4px solid #4299e1;
      border-radius: 4px;
    }
    
    .logicheck-content::-webkit-scrollbar {
      width: 8px;
    }
    
    .logicheck-content::-webkit-scrollbar-track {
      background: #e2e8f0;
    }
    
    .logicheck-content::-webkit-scrollbar-thumb {
      background: #a0aec0;
      border-radius: 4px;
    }
    
    .logicheck-content::-webkit-scrollbar-thumb:hover {
      background: #718096;
    }
  `;
  document.head.appendChild(styleElement);
}

// Create sidebar HTML
function createSidebarHTML(data) {
  return `
    <div class="logicheck-sidebar">
      <div class="logicheck-header">
        <h2>LogiCheck Analysis</h2>
        <button class="logicheck-close-btn" onclick="document.getElementById('logicheck-sidebar-root').style.display='none'">✕</button>
      </div>
      <div class="logicheck-content">
        <section class="logicheck-section">
          <h3>Main Claim</h3>
          <p class="main-claim">${data.mainClaim}</p>
        </section>
        
        <section class="logicheck-section">
          <h3>Underlying Assumptions</h3>
          <ul class="assumptions-list">
            ${data.assumptions.map(assumption => `<li>${assumption}</li>`).join('')}
          </ul>
        </section>
        
        <section class="logicheck-section">
          <h3>Identified Logical Fallacies</h3>
          ${data.fallacies.map(fallacy => `
            <div class="fallacy-card">
              <h4 class="fallacy-name">${fallacy.fallacyName}</h4>
              <blockquote class="fallacy-quote">"${fallacy.quote}"</blockquote>
              <p class="fallacy-explanation">${fallacy.explanation}</p>
            </div>
          `).join('')}
        </section>
        
        <section class="logicheck-section">
          <h3>Socratic Question</h3>
          <p class="socratic-question">${data.socraticQuestion}</p>
        </section>
      </div>
    </div>
  `;
}

// Create sidebar container div and append to body
let sidebarContainer = document.getElementById('logicheck-sidebar-root');
if (!sidebarContainer) {
  sidebarContainer = document.createElement('div');
  sidebarContainer.id = 'logicheck-sidebar-root';
  sidebarContainer.style.display = 'none';
  document.body.appendChild(sidebarContainer);
}

// Inject styles
injectStyles();

// Function to show sidebar with analysis data
function showSidebar(analysisData = mockAnalysisData) {
  // Render the sidebar HTML
  sidebarContainer.innerHTML = createSidebarHTML(analysisData);
  sidebarContainer.style.display = 'block';
}

// Function to show loading state
function showLoadingState() {
  sidebarContainer.innerHTML = `
    <div class="logicheck-sidebar">
      <div class="logicheck-header">
        <h2>LogiCheck Analysis</h2>
        <button class="logicheck-close-btn" onclick="document.getElementById('logicheck-sidebar-root').style.display='none'">✕</button>
      </div>
      <div class="logicheck-content">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 40px; text-align: center;">
          <div style="width: 50px; height: 50px; border: 4px solid #e2e8f0; border-top: 4px solid #4a5568; border-radius: 50%; animation: spin 1s linear infinite;"></div>
          <p style="margin-top: 20px; font-size: 16px; color: #4a5568;">Analyzing text...</p>
        </div>
      </div>
    </div>
    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  `;
  sidebarContainer.style.display = 'block';
}

// Function to show error state
function showErrorState(errorMessage) {
  const errorData = {
    mainClaim: "Analysis Error",
    assumptions: [],
    fallacies: [],
    socraticQuestion: ""
  };
  
  // Create user-friendly error message
  let friendlyMessage = errorMessage;
  if (errorMessage.includes('API key')) {
    friendlyMessage = 'API key belum dikonfigurasi. Klik kanan pada icon extension > Options untuk mengatur API key.';
  } else if (errorMessage.includes('timeout')) {
    friendlyMessage = 'Request timeout - API terlalu lama merespons. Silakan coba lagi.';
  } else if (errorMessage.includes('401')) {
    friendlyMessage = 'API key tidak valid. Silakan periksa API key Anda di extension options.';
  } else if (errorMessage.includes('429')) {
    friendlyMessage = 'Terlalu banyak request. Silakan tunggu beberapa saat dan coba lagi.';
  } else if (errorMessage.includes('500') || errorMessage.includes('503')) {
    friendlyMessage = 'Server API sedang bermasalah. Silakan coba lagi nanti.';
  }
  
  sidebarContainer.innerHTML = `
    <div class="logicheck-sidebar">
      <div class="logicheck-header">
        <h2>LogiCheck Analysis</h2>
        <button class="logicheck-close-btn" onclick="document.getElementById('logicheck-sidebar-root').style.display='none'">✕</button>
      </div>
      <div class="logicheck-content">
        <div style="padding: 20px; text-align: center;">
          <div style="font-size: 48px; color: #f56565; margin-bottom: 16px;">⚠️</div>
          <h3 style="color: #c53030; margin-bottom: 12px;">Analysis Failed</h3>
          <p style="color: #4a5568; line-height: 1.6; margin-bottom: 12px;">${friendlyMessage}</p>
          <details style="margin-top: 16px; text-align: left; background: #f7fafc; padding: 12px; border-radius: 6px;">
            <summary style="cursor: pointer; color: #718096; font-size: 14px; margin-bottom: 8px;">Detail Error Teknis</summary>
            <p style="color: #718096; font-size: 13px; font-family: monospace; word-break: break-word;">${errorMessage}</p>
          </details>
          <p style="color: #718096; font-size: 14px; margin-top: 16px;">Butuh bantuan? Periksa console browser (F12) untuk detail lebih lanjut.</p>
        </div>
      </div>
    </div>
  `;
  sidebarContainer.style.display = 'block';
}

// Function to hide sidebar
function hideSidebar() {
  sidebarContainer.style.display = 'none';
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showLoading") {
    // Show loading state
    console.log("Showing loading state for text:", request.text);
    showLoadingState();
    sendResponse({ status: "loading shown" });
  } else if (request.action === "displayAnalysis") {
    // Display the analysis result
    if (request.result.success) {
      console.log("Displaying analysis:", request.result.data);
      showSidebar(request.result.data);
    } else {
      console.error("Analysis error:", request.result.error);
      showErrorState(request.result.error);
    }
    sendResponse({ status: "analysis displayed" });
  } else if (request.action === "getSelectedText") {
    // Received request from keyboard shortcut
    const selectedText = window.getSelection().toString().trim();
    
    if (selectedText) {
      // Show loading state immediately
      showLoadingState();
      
      // Send the selected text back to background script for analysis
      chrome.runtime.sendMessage({
        action: "analyzeSelectedText",
        text: selectedText
      });
      
      sendResponse({ status: "text sent" });
    } else {
      console.log("No text selected");
      sendResponse({ status: "no text selected" });
    }
  } else if (request.action === "syncApiKeyFromExtension") {
    // Sync API key changes from extension to web page
    window.postMessage({
      type: "LOGICHECK_API_KEY_SYNC",
      source: "logicheck-extension",
      apiKey: request.apiKey
    }, "*");
    sendResponse({ status: "synced to page" });
  }
  
  return true; // Keep the message channel open for async response
});

// Listen for messages from the web page (for syncing API key from web to extension)
window.addEventListener("message", (event) => {
  // Only accept messages from the same window
  if (event.source !== window) return;
  
  // Check if it's a LogiCheck API key sync message
  if (event.data.type === "LOGICHECK_API_KEY_SYNC" && event.data.source === "logicheck-web") {
    // Forward to background script
    chrome.runtime.sendMessage({
      action: "syncApiKeyFromWeb",
      apiKey: event.data.apiKey
    }, (response) => {
      // Notify the web page about the result
      window.postMessage({
        type: "LOGICHECK_API_KEY_SYNC_RESPONSE",
        source: "logicheck-extension",
        success: response?.status === "ok"
      }, "*");
    });
  } else if (event.data.type === "LOGICHECK_GET_API_KEY" && event.data.source === "logicheck-web") {
    // Web page is requesting the current API key from extension
    chrome.runtime.sendMessage({
      action: "getApiKey"
    }, (response) => {
      window.postMessage({
        type: "LOGICHECK_GET_API_KEY_RESPONSE",
        source: "logicheck-extension",
        apiKey: response?.apiKey || null
      }, "*");
    });
  }
});

