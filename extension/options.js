const apiKeyInput = document.getElementById('apiKey');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const testBtn = document.getElementById('testBtn');
const serverKeyBtn = document.getElementById('serverKeyBtn');
const status = document.getElementById('status');

// Backend API URL
const BACKEND_API_URL = 'https://logicheck-api.onrender.com/api';

function setStatus(msg, ok = true) {
  status.textContent = msg;
  status.style.color = ok ? '#0a0' : '#a00';
}

// Load stored settings on open
async function loadKey() {
  if (chrome && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['GEMINI_API_KEY', 'USE_SERVER_KEY'], (result) => {
      const key = result?.GEMINI_API_KEY || '';
      const useServer = result?.USE_SERVER_KEY === true;
      
      if (useServer) {
        // Server key mode is active
        serverKeyBtn.textContent = '✓ Using Server Key';
        serverKeyBtn.classList.add('active');
        apiKeyInput.value = '';
        apiKeyInput.disabled = true;
        setStatus('Server key mode active - no setup needed!', true);
      } else if (key) {
        apiKeyInput.value = key;
        apiKeyInput.disabled = false;
        validateAndToggle();
      } else {
        apiKeyInput.disabled = false;
      }
    });
  }
}

// Server key button handler
serverKeyBtn.addEventListener('click', async () => {
  setStatus('Activating server key...', true);
  
  // First test if server is reachable
  try {
    const res = await fetch(`${BACKEND_API_URL}/health`);
    if (!res.ok) throw new Error('Server not reachable');
    
    // Server is up, enable server key mode
    chrome.storage.local.set({ USE_SERVER_KEY: true }, () => {
      chrome.storage.local.remove('GEMINI_API_KEY', () => {
        serverKeyBtn.textContent = '✓ Using Server Key';
        serverKeyBtn.classList.add('active');
        apiKeyInput.value = '';
        apiKeyInput.disabled = true;
        setStatus('✅ Server key activated! You can now use LogiCheck.', true);
        
        // Notify background
        chrome.runtime.sendMessage({ action: 'setServerKeyMode', enabled: true });
      });
    });
  } catch (e) {
    setStatus('Server is waking up... Please try again in 30 seconds.', false);
  }
});

saveBtn.addEventListener('click', () => {
  const key = apiKeyInput.value.trim();
  // Disable server key mode when saving custom key
  chrome.storage.local.set({ GEMINI_API_KEY: key, USE_SERVER_KEY: false }, () => {
    serverKeyBtn.textContent = 'Use Server Key';
    serverKeyBtn.classList.remove('active');
    // notify background
    chrome.runtime.sendMessage({ action: 'setApiKey', key }, (resp) => {
      setStatus(resp?.status === 'ok' ? 'Saved' : 'Error saving', resp?.status === 'ok');
    });
  });
});

// Basic client-side validation for API key shape (very simple heuristic)
function validateKey(key) {
  if (!key) return false;
  // Heuristic: keys often contain letters, numbers, dashes, underscores and are > 20 chars
  return /^[A-Za-z0-9\-_]{20,}$/.test(key);
}

function validateAndToggle() {
  const ok = validateKey(apiKeyInput.value.trim());
  saveBtn.disabled = !ok;
  if (!ok) setStatus('Key looks invalid (local validation)', false);
  else setStatus('Key format looks OK', true);
}

apiKeyInput.addEventListener('input', () => {
  validateAndToggle();
});

// Test the key by triggering a lightweight fetch to the generativelanguage endpoint.
// Note: This actually performs a network call and may consume quota. Use responsibly.
testBtn.addEventListener('click', async () => {
  const key = apiKeyInput.value.trim();
  if (!validateKey(key)) {
    setStatus('Key failed local validation', false);
    return;
  }
  setStatus('Testing key (making lightweight request)...', true);
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(key)}`;
    const body = {
      contents: [{ parts: [{ text: 'Hello' }] }]
    };
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (res.status === 200) {
      setStatus('Key test succeeded (valid and reachable)', true);
    } else if (res.status === 401 || res.status === 403) {
      setStatus('Key rejected (401/403) - invalid or no access', false);
    } else {
      setStatus(`Unexpected response: ${res.status}`, false);
    }
  } catch (e) {
    setStatus('Network/error while testing key', false);
    console.error(e);
  }
});

clearBtn.addEventListener('click', () => {
  apiKeyInput.value = '';
  apiKeyInput.disabled = false;
  serverKeyBtn.textContent = 'Use Server Key';
  serverKeyBtn.classList.remove('active');
  chrome.storage.local.remove(['GEMINI_API_KEY', 'USE_SERVER_KEY'], () => {
    chrome.runtime.sendMessage({ action: 'setApiKey', key: '' }, (resp) => {
      setStatus('Cleared', true);
    });
  });
});

loadKey();
