// Popup script for LogiCheck Lens
console.log('Popup script loaded');

// Theme management
function initTheme() {
  chrome.storage.sync.get(['theme'], (result) => {
    const theme = result.theme || 'light';
    applyTheme(theme);
  });
}

function applyTheme(theme) {
  const html = document.documentElement;
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');
  
  if (theme === 'dark') {
    html.classList.add('dark');
    if (sunIcon) sunIcon.style.display = 'block';
    if (moonIcon) moonIcon.style.display = 'none';
  } else {
    html.classList.remove('dark');
    if (sunIcon) sunIcon.style.display = 'none';
    if (moonIcon) moonIcon.style.display = 'block';
  }
  
  // Save theme preference
  chrome.storage.sync.set({ theme });
  
  // Notify content scripts about theme change
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
      chrome.tabs.sendMessage(tab.id, { action: 'themeChanged', theme }, () => {
        // Ignore errors for tabs where content script isn't loaded
        if (chrome.runtime.lastError) {
          // Silent fail - this is expected for some tabs
        }
      });
    });
  });
}

function toggleTheme() {
  chrome.storage.sync.get(['theme'], (result) => {
    const currentTheme = result.theme || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');

  // Initialize theme
  initTheme();

  // Get button elements
  const analyzeBtn = document.getElementById('analyzeSelected');
  const settingsBtn = document.getElementById('openSettings');
  const websiteBtn = document.getElementById('openWebsite');
  const themeToggleBtn = document.getElementById('themeToggle');

  console.log('Analyze button:', analyzeBtn);
  console.log('Settings button:', settingsBtn);
  console.log('Website button:', websiteBtn);
  console.log('Theme toggle button:', themeToggleBtn);

  // Theme Toggle Button
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      console.log('Theme toggle clicked');
      toggleTheme();
    });
    console.log('Theme toggle listener attached');
  }

  // Analyze Selected Text Button
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', async () => {
      console.log('Analyze button clicked');
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        console.log('Active tab:', tab);
        
        if (tab) {
          chrome.tabs.sendMessage(tab.id, { action: 'analyzeSelectedText' }, (response) => {
            if (chrome.runtime.lastError) {
              console.error('Error sending message:', chrome.runtime.lastError);
              alert('Error: ' + chrome.runtime.lastError.message);
            } else {
              console.log('Message sent successfully:', response);
              window.close();
            }
          });
        }
      } catch (error) {
        console.error('Error in analyze button:', error);
        alert('Error: ' + error.message);
      }
    });
    console.log('Analyze button listener attached');
  } else {
    console.error('Analyze button not found!');
  }

  // Configure API Key Button
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      console.log('Settings button clicked');
      try {
        chrome.runtime.openOptionsPage();
        console.log('Opening options page');
      } catch (error) {
        console.error('Error opening settings:', error);
        alert('Error opening settings: ' + error.message);
      }
    });
    console.log('Settings button listener attached');
  } else {
    console.error('Settings button not found!');
  }

  // Visit LogiCheck Website Button
  if (websiteBtn) {
    websiteBtn.addEventListener('click', () => {
      console.log('Website button clicked');
      try {
        chrome.tabs.create({ url: 'https://logi-check.vercel.app/' });
        console.log('Opening website');
        window.close();
      } catch (error) {
        console.error('Error opening website:', error);
        alert('Error opening website: ' + error.message);
      }
    });
    console.log('Website button listener attached');
  } else {
    console.error('Website button not found!');
  }

  console.log('All event listeners attached');
});
