# Popup Button Debugging Guide

## Issue: Buttons in Popup Not Working

### Possible Causes:
1. JavaScript errors preventing event listeners
2. Extension permissions not correct
3. Content script not loaded on active tab
4. Chrome security restrictions

---

## Debug Steps

### Step 1: Check Popup Console

1. Open extension popup (click icon)
2. **Right-click anywhere on popup**
3. Select **"Inspect"** (this opens DevTools for popup)
4. Check Console tab for errors

**Expected logs:**
```
Popup loaded
All event listeners attached
```

**When you click buttons, should see:**
```
Settings button clicked
Website button clicked
Analyze button clicked
Active tab: {id: 123, ...}
```

**If you see errors:**
- Red error messages indicate what's wrong
- Common: "Cannot read property of null" = element not found
- Common: "chrome.tabs is not defined" = permissions issue

---

### Step 2: Verify Manifest Permissions

Check `manifest.json` has:

```json
{
  "permissions": [
    "activeTab",
    "contextMenus",
    "storage"
  ],
  "action": {
    "default_popup": "popup.html"
  }
}
```

**Required:**
- ✅ `activeTab` permission for chrome.tabs.query
- ✅ `action.default_popup` points to correct file

---

### Step 3: Test Each Button Individually

#### Test 1: Configure API Key Button

**Manual Test:**
```javascript
// In popup DevTools console, run:
chrome.runtime.openOptionsPage();
```

**Expected:** Options page opens

**If fails:**
- Check if options.html exists
- Check manifest has "options_ui" section

#### Test 2: Visit Website Button

**Manual Test:**
```javascript
// In popup DevTools console, run:
chrome.tabs.create({ url: 'https://logicheck.com' });
```

**Expected:** New tab opens to logicheck.com

**If fails:**
- Permission issue with tabs API

#### Test 3: Analyze Button

**Manual Test:**
```javascript
// In popup DevTools console, run:
chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => {
  console.log('Active tab:', tabs[0]);
  chrome.tabs.sendMessage(tabs[0].id, { action: 'analyzeSelectedText' });
});
```

**Expected:** 
- Logs active tab info
- Content script receives message
- Sidebar appears

**If fails:**
- Content script might not be loaded
- Check if you're on a valid webpage (not chrome:// pages)

---

### Step 4: Check Content Script Loading

1. Go to any regular webpage (e.g., google.com)
2. Open DevTools (F12)
3. Go to Console
4. Look for: `"LogiCheck content script loaded"`

**If NOT found:**
- Content script not injected
- Check manifest.json content_scripts section
- Reload extension

---

### Step 5: Reload Everything

Sometimes browser cache causes issues:

```
1. chrome://extensions/
2. Find LogiCheck Lens
3. Click "Remove"
4. Click "Load unpacked"
5. Select extension folder
6. Test popup again
```

---

## Quick Fix Checklist

- [ ] Extension is enabled in chrome://extensions/
- [ ] No errors showing in extension card
- [ ] manifest.json is valid JSON (no syntax errors)
- [ ] popup.html exists in extension folder
- [ ] Popup console shows "Popup loaded" message
- [ ] Popup console shows "All event listeners attached"
- [ ] Click button shows "X button clicked" in console
- [ ] No red errors in popup console
- [ ] Testing on regular webpage (not chrome:// or edge:// pages)
- [ ] Content script loaded (check page console)

---

## Common Issues & Solutions

### Issue: "chrome is not defined"

**Cause:** Extension context not available

**Solution:** 
- Verify you're testing as extension, not standalone HTML
- Check popup is loaded via extension icon, not file://

### Issue: "Cannot read property 'addEventListener' of null"

**Cause:** Button element not found

**Solution:**
- Verify button IDs match: `analyzeSelected`, `openSettings`, `openWebsite`
- Check HTML structure is correct
- Ensure no typos in getElementById

### Issue: Buttons visible but clicks do nothing

**Cause:** Event listeners not attached

**Solution:**
- Check console for "All event listeners attached"
- Verify DOMContentLoaded fired
- Try adding `debugger;` in button click handler

### Issue: "Error: Could not establish connection"

**Cause:** Content script not loaded on active tab

**Solution:**
- Reload active tab
- Check you're not on chrome:// page
- Verify manifest content_scripts section

### Issue: Options page doesn't open

**Cause:** options.html doesn't exist or not declared

**Solution:**
- Check extension folder has options.html
- Verify manifest.json has:
  ```json
  "options_ui": {
    "page": "options.html",
    "open_in_tab": true
  }
  ```

---

## Testing Script

Run this in popup DevTools console to test all functions:

```javascript
// Test 1: Check elements exist
console.log('Analyze button:', document.getElementById('analyzeSelected'));
console.log('Settings button:', document.getElementById('openSettings'));
console.log('Website button:', document.getElementById('openWebsite'));

// Test 2: Check Chrome APIs available
console.log('chrome.runtime:', typeof chrome.runtime);
console.log('chrome.tabs:', typeof chrome.tabs);

// Test 3: Test settings
try {
  chrome.runtime.openOptionsPage();
  console.log('✅ Settings opened');
} catch (e) {
  console.error('❌ Settings failed:', e);
}

// Test 4: Test website
try {
  chrome.tabs.create({ url: 'https://google.com' });
  console.log('✅ Tab created');
} catch (e) {
  console.error('❌ Tab creation failed:', e);
}

// Test 5: Test message sending
chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => {
  if (tabs[0]) {
    console.log('✅ Active tab found:', tabs[0].url);
    chrome.tabs.sendMessage(tabs[0].id, { action: 'test' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('❌ Message failed:', chrome.runtime.lastError.message);
      } else {
        console.log('✅ Message sent, response:', response);
      }
    });
  } else {
    console.error('❌ No active tab');
  }
});
```

---

## Expected Output

When everything works:

**Popup Console:**
```
Popup loaded
All event listeners attached
```

**Click Settings:**
```
Settings button clicked
(Options page opens)
```

**Click Website:**
```
Website button clicked
(New tab opens to logicheck.com)
```

**Click Analyze:**
```
Analyze button clicked
Active tab: {id: 123, url: "https://..."}
Response from content script: {success: true}
(Popup closes, sidebar appears)
```

---

## Still Not Working?

If buttons still don't work after all checks:

1. **Share popup console logs** (screenshot of errors)
2. **Share manifest.json** content
3. **Share file structure** of extension folder
4. **Specify which button** specifically doesn't work
5. **Test on different webpage** (e.g., google.com vs local file)

---

## Emergency Fallback

If nothing works, try minimal popup:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
</head>
<body>
  <button id="test">Test Button</button>
  <script>
    document.getElementById('test').onclick = () => {
      alert('Button works!');
      chrome.runtime.openOptionsPage();
    };
  </script>
</body>
</html>
```

If even this doesn't work → Extension installation issue
