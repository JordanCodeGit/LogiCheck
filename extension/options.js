const apiKeyInput = document.getElementById('apiKey');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const testBtn = document.getElementById('testBtn');
const status = document.getElementById('status');

// Special marker that should not be used in extension
const SERVER_KEY_MARKER = '__USE_SERVER_KEY__';

function setStatus(msg, ok = true) {
  status.textContent = msg;
  status.style.color = ok ? '#0a0' : '#a00';
}

// Load stored key on open
async function loadKey() {
  if (chrome && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['GEMINI_API_KEY'], (result) => {
      const key = result?.GEMINI_API_KEY || '';
      // If server key marker was accidentally synced, clear it
      if (key === SERVER_KEY_MARKER) {
        apiKeyInput.value = '';
        setStatus('Server key detected - please enter your own API key', false);
        chrome.storage.local.remove('GEMINI_API_KEY');
      } else {
        apiKeyInput.value = key;
        validateAndToggle();
      }
    });
  }
}

saveBtn.addEventListener('click', () => {
  const key = apiKeyInput.value.trim();
  chrome.storage.local.set({ GEMINI_API_KEY: key }, () => {
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
  chrome.storage.local.remove('GEMINI_API_KEY', () => {
    chrome.runtime.sendMessage({ action: 'setApiKey', key: '' }, (resp) => {
      setStatus('Cleared', true);
    });
  });
});

loadKey();
