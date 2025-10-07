// Popup script for LogiCheck Lens
console.log('Popup script loaded');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');

  // Get button elements
  const analyzeBtn = document.getElementById('analyzeSelected');
  const settingsBtn = document.getElementById('openSettings');
  const websiteBtn = document.getElementById('openWebsite');

  console.log('Analyze button:', analyzeBtn);
  console.log('Settings button:', settingsBtn);
  console.log('Website button:', websiteBtn);

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
