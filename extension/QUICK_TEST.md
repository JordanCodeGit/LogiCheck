# Quick Test Checklist - LogiCheck Extension

## ⚡ Quick Reload Steps

1. Go to `chrome://extensions/`
2. Find "LogiCheck Lens"
3. Click **Reload** button (circular arrow)
4. Check for errors - should show "No errors"

---

## ✅ Test 1: Logo in Sidebar (30 seconds)

1. Open any webpage (e.g., http://localhost:8080/test-extension.html)
2. Select any text
3. Right-click → "Analyze with LogiCheck"
4. Sidebar slides in from right
5. **Check:** Logo appears at top (not broken image icon)

**✅ PASS if:** LogiCheck brain logo visible
**❌ FAIL if:** Broken image icon or no logo

---

## ✅ Test 2: API Key Web → Extension (1 minute)

1. Open web app: http://localhost:5173/settings (or your URL)
2. Enter your own API key (get from https://aistudio.google.com/app/apikey)
3. Click "Save API Key"
4. Look for green success with "synced to extension"
5. Right-click extension icon → **Options**
6. **Check:** Same API key appears in extension

**✅ PASS if:** API keys match in both places
**❌ FAIL if:** Extension shows different or empty key

---

## ✅ Test 3: API Key Extension → Web (1 minute)

1. Right-click extension icon → **Options**
2. Enter different key: `TestKey12345678901234567890`
3. Click "Save API Key"
4. Go to web app Settings: http://localhost:5173/settings
5. **Check:** New key appears (may need refresh)

**✅ PASS if:** Web shows new key from extension
**❌ FAIL if:** Web still shows old key

---

## ✅ Test 4: Full Analysis Flow (2 minutes)

### Via Popup:
1. Open any webpage
2. Select text: "Everyone loves this phone, so it must be the best"
3. Click extension icon
4. Click "Analyze Text"
5. **Check:** Loading → Results appear in 2-10 seconds

### Via Sidebar:
1. Select same text
2. Right-click → "Analyze with LogiCheck"
3. **Check:** Sidebar shows loading → Results appear

**✅ PASS if:** Both methods show real analysis results
**❌ FAIL if:** Stuck on loading or shows error

---

## 🐛 Debug Console Checks

### Browser Console (F12):
```
✅ "LogiCheck content script loaded"
✅ "API key sync request sent to extension"
❌ No red errors
```

### Extension Background (chrome://extensions/ → "Inspect views: service worker"):
```
✅ "API key synced from web app: Set"
✅ "Analysis successful"
❌ No red errors
```

---

## 🎯 Success Criteria

All of these should be true:

- [ ] Extension reloads without errors
- [ ] Logo visible in sidebar (not broken)
- [ ] API key syncs Web → Extension
- [ ] API key syncs Extension → Web  
- [ ] Popup analysis works (shows results)
- [ ] Sidebar analysis works (shows results)
- [ ] No console errors anywhere

---

## 🔧 If Something Fails:

### Logo not showing:
- Verify `web_accessible_resources` in manifest.json
- Check file exists: `extension/images/logo_logicheck_extension.png`
- Hard reload: Remove extension and re-add

### API key not syncing:
- Check browser console for postMessage errors
- Verify content script loaded: "LogiCheck content script loaded"
- Try reloading both web page and extension

### Analysis not working:
- Check API key is valid (test at https://aistudio.google.com)
- Look at extension background console for API errors
- Verify internet connection

### Popup shows double:
- This may be visual artifact from scrolling
- Check if `popup.html` has only 1 header div
- Try different zoom level in browser

---

## ⏱️ Total Test Time: ~5 minutes

Quick run through all tests to verify everything works!
