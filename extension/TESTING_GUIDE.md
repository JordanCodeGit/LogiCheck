# LogiCheck Lens Extension - Testing Guide

## Recent Fixes (October 7, 2025)

### Issues Fixed:
1. ✅ **Removed duplicate popup files** - Cleaned up popup-test.html, popup-simple.jsx, popup-functional.jsx, popup.jsx
2. ✅ **Fixed duplicate message listeners** - Consolidated all message handlers in background.js into one listener
3. ✅ **Added sidebar displayAnalysis handler** - Content script now properly receives and displays API results
4. ✅ **Added loading & error states** - Sidebar now shows loading animation and error messages

### Files Modified:
- `background.js` - Merged duplicate message listeners
- `content-modern.js` - Added displayAnalysis handler, loading state, error handling
- `popup.html` - Already functional, no changes needed
- Deleted: popup-test.html, popup-simple.jsx, popup-functional.jsx, popup.jsx

---

## Testing Steps

### Step 1: Reload Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Find "LogiCheck Lens" extension
4. Click the **Reload** button (circular arrow icon)
5. Check for any errors in the extension card

### Step 2: Configure API Key

1. Right-click the LogiCheck extension icon → Click "Options"
2. OR go to `chrome://extensions/` → Find LogiCheck → Click "Details" → Click "Extension options"
3. Enter your Gemini API key in the input field
4. Click "Save API Key"
5. You should see a green success message

**Get API Key:** https://aistudio.google.com/app/apikey

### Step 3: Test Popup

1. Open any webpage (e.g., http://localhost:8080/test-extension.html)
2. Select some text on the page
3. Click the LogiCheck extension icon in Chrome toolbar
4. **Expected Results:**
   - Popup should show with modern purple gradient design
   - "Selected Text" card should display the text you selected
   - "Analyze Text" button should be enabled (not grayed out)
   - No warning message if API key is configured
5. Click "Analyze Text" button
6. **Expected Results:**
   - Button should show "Analyzing..." with spinner
   - After 2-10 seconds, results should appear:
     - Green "Analysis complete!" message
     - Main Claim card
     - Fallacy count
     - "View Full Analysis" button

**Common Issues:**
- ❌ Button stays "Analyzing..." forever → Check browser console (F12) for API errors
- ❌ "API key not configured" warning → Go back to Step 2
- ❌ Error message appears → Check that API key is valid

### Step 4: Test Context Menu & Sidebar

1. Open any webpage with text
2. Select some text (at least a sentence)
3. Right-click on the selected text
4. Click **"Analyze with LogiCheck"** from context menu
5. **Expected Results:**
   - Sidebar should slide in from the right side
   - Shows "Analyzing text..." with spinner
   - Shows the selected text preview
6. Wait 2-10 seconds
7. **Expected Results:**
   - Sidebar updates with analysis results:
     - 💡 Main Claim section
     - 🤔 Underlying Assumptions section
     - ⚠️ Logical Fallacies section (with color-coded cards)
     - 🔍 Socratic Question section
   - Modern design with purple gradient header
   - Close button (✕) in top-right works
   - "View Full Analysis" button opens logicheck.com

**Common Issues:**
- ❌ Context menu doesn't appear → Reload extension (Step 1)
- ❌ Sidebar doesn't appear after clicking menu → Check browser console for errors
- ❌ Sidebar shows error message → Check API key configuration

### Step 5: Test Keyboard Shortcut

1. Open any webpage
2. Select some text
3. Press `Ctrl+Shift+L` (Windows/Linux) or `Cmd+Shift+L` (Mac)
4. **Expected Results:**
   - Same behavior as context menu test (Step 4)

---

## Debugging Tips

### Check Browser Console

1. Press `F12` to open DevTools
2. Go to **Console** tab
3. Look for:
   - ✅ "LogiCheck content script loaded" - Content script working
   - ❌ Red error messages - Issues to fix
   - API errors like "401" or "403" - API key problem
   - API errors like "429" - Rate limit exceeded

### Check Extension Background Console

1. Go to `chrome://extensions/`
2. Find LogiCheck Lens
3. Click "Inspect views: service worker"
4. Check Console for:
   - API call logs
   - "Analysis successful" messages
   - Error messages with details

### Check Network Requests

1. Open DevTools (`F12`)
2. Go to **Network** tab
3. Click "Analyze Text" in popup or use context menu
4. Look for request to `generativelanguage.googleapis.com`
5. Check:
   - Status code should be `200 OK`
   - Response should contain analysis JSON
   - If `401`/`403` → Invalid API key
   - If `429` → Too many requests

### Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "API key not configured" | No API key set | Configure in options page |
| "Extension communication error" | Background script not responding | Reload extension |
| "Request timeout" | API took too long (>30s) | Try shorter text or check internet |
| "All model endpoints failed" | All API attempts failed | Check API key and quota |
| "Failed to parse AI response" | Gemini returned invalid JSON | Report bug with console logs |

---

## Verification Checklist

- [ ] Extension loads without errors in `chrome://extensions/`
- [ ] API key can be saved in options page
- [ ] Popup opens when clicking extension icon
- [ ] Popup shows selected text correctly
- [ ] Popup "Analyze Text" button triggers analysis
- [ ] Popup shows results after analysis completes
- [ ] Context menu "Analyze with LogiCheck" appears on text selection
- [ ] Sidebar slides in from right when using context menu
- [ ] Sidebar shows loading state during analysis
- [ ] Sidebar shows results after analysis completes
- [ ] Sidebar close button works
- [ ] Keyboard shortcut (Ctrl/Cmd+Shift+L) works
- [ ] Error states display properly (invalid API key, network error, etc.)

---

## Test Text Samples

### Sample 1: Contains Fallacies
```
Everyone I know loves this new smartphone, so it must be the best phone on the market. 
This is clearly the only logical choice for anyone looking to buy a phone.
```

**Expected:** Should detect Appeal to Popularity fallacy

### Sample 2: Slippery Slope
```
If we allow students to retake exams, next they'll want to retake entire courses, 
then they'll expect to graduate without doing any work at all.
```

**Expected:** Should detect Slippery Slope fallacy

### Sample 3: Valid Argument
```
All humans are mortal. Socrates is human. Therefore, Socrates is mortal.
```

**Expected:** Should recognize as valid syllogism with no fallacies

---

## Still Having Issues?

1. **Clear extension data:**
   - Go to `chrome://extensions/`
   - Click "Remove" on LogiCheck Lens
   - Click "Load unpacked" and select extension folder again
   - Reconfigure API key

2. **Check file structure:**
   ```
   extension/
   ├── manifest.json
   ├── background.js
   ├── content-modern.js
   ├── popup.html
   ├── options.html
   ├── options.js
   ├── config.js
   └── images/
       └── logo_logicheck_extension.png
   ```

3. **Verify no extra popup files:**
   - Should NOT have: popup-test.html, popup.jsx, popup-simple.jsx, popup-functional.jsx
   - Should ONLY have: popup.html

4. **Check manifest.json:**
   - `"action.default_popup"` should be `"popup.html"`
   - `"content_scripts"` should include `"content-modern.js"`
   - `"background.service_worker"` should be `"background.js"`

---

## Success Criteria

Extension is working correctly when:

✅ **Popup Test:** Select text → Click extension icon → Click "Analyze Text" → See results in 2-10 seconds

✅ **Sidebar Test:** Select text → Right-click → "Analyze with LogiCheck" → Sidebar appears with results

✅ **Design Test:** Both popup and sidebar have modern purple gradient design matching the web app

✅ **No Console Errors:** No red errors in browser console or extension background console
