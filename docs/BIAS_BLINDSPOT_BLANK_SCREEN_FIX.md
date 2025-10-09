# Bias Blindspot Blank Screen - Troubleshooting Guide

## Problem
When switching to Bias Blindspot module in Dojo, the screen goes blank. Fallacy Sparring works fine.

## Root Cause Analysis

Kemungkinan penyebab:
1. ✅ BiasHighlighter component error (FIXED with error boundary)
2. ✅ Button disabled attribute conflict (FIXED - removed disabled, use conditional onClick)
3. 🔍 BiasChallenge data issue
4. 🔍 localStorage corruption

## Fixes Applied

### 1. Removed `disabled` attribute from buttons
**Problem**: `disabled` attribute pada button kategori mungkin menyebabkan React render issue.

**Solution**: 
```javascript
// Before
<button disabled={!selectedText} onClick={...}>

// After  
<button onClick={() => isActive && handleCategoryClick(...)}>
```

### 2. Added Safety Checks
```javascript
if (!content) {
  console.error('BiasHighlighter: No content provided');
  return <div>Error: No content to display</div>;
}
```

### 3. Added Debug Logs
Console akan menampilkan:
- "BiasHighlighter rendering: ..." setiap component render
- "DojoPage rendering..." di DojoPage
- Error messages jika ada masalah

## How to Debug

### Step 1: Check Browser Console (F12)
Look for these messages:
- ✅ "DojoPage rendering..."
- ✅ "BiasHighlighter rendering: ..." (should appear twice, for Article A and B)
- ❌ Any RED error messages

### Step 2: Check biasChallenge Data
In console, type:
```javascript
const data = JSON.parse(localStorage.getItem('dojo_biasChallenge'));
console.log(data);
```

Expected structure:
```javascript
{
  topic: "...",
  instructions: "...",
  articleA: {
    title: "...",
    content: "...",  // <-- Must not be empty
    source: "...",
    bias: "..."
  },
  articleB: { ... }
}
```

### Step 3: Clear BiasChallenge Cache
If data looks corrupted:
```javascript
localStorage.removeItem('dojo_biasChallenge');
localStorage.removeItem('dojo_articleAHighlights');
localStorage.removeItem('dojo_articleBHighlights');
location.reload();
```

### Step 4: Force Reload New Challenge
1. Click "New Topic" button
2. Wait for articles to load
3. Check if articles appear

## Quick Fix Commands

Run these in browser console:

```javascript
// 1. Clear all Dojo data
['dojo_activeModule', 'dojo_challenge', 'dojo_biasChallenge', 
 'dojo_selectedAnswer', 'dojo_feedback', 'dojo_stats',
 'dojo_articleAHighlights', 'dojo_articleBHighlights'
].forEach(k => localStorage.removeItem(k));

// 2. Reload page
location.reload();

// 3. If still blank, check for errors
console.log('Check above for any RED error messages');
```

## Expected Behavior After Fix

1. ✅ Switch to Bias Blindspot → Page loads normally
2. ✅ Articles A and B visible
3. ✅ Category buttons start as GRAY (inactive)
4. ✅ Select text → Buttons light up with colors
5. ✅ Click button → Text highlighted
6. ✅ No console errors

## Files Modified

1. `client/src/components/BiasHighlighter.jsx`
   - Removed `disabled` attribute
   - Added conditional onClick
   - Added content safety check
   - Added debug logs

2. `client/src/pages/DojoPage.jsx`
   - Added debug log at start

## Next Steps if Still Blank

1. **Check Network Tab**: 
   - Look for failed API calls to `/api/dojo/bias-challenge`
   - Check response data

2. **Check React DevTools**:
   - Is BiasHighlighter component in tree?
   - Check props being passed

3. **Try Different Browser**:
   - Rule out browser-specific issues

4. **Check Server Logs**:
   - Server might be failing to generate bias challenges

---

**Last Updated**: October 9, 2025  
**Status**: Fixes applied, awaiting user test  
**Priority**: High - Blocks Bias Blindspot feature
