# Missing Translation Key Fix - apiKeyWarning.getApiKey

## Problem
Di halaman Analyzer dan Essay Clinic, tombol "Get API Key" menampilkan text literal `apiKeyWarning.getApiKey` instead of proper translation.

## Root Cause
Translation key `apiKeyWarning.getApiKey` digunakan di `ApiKeyWarning.jsx` component tapi tidak didefinisikan di translations file.

## Fix Applied

### Added Missing Translation Keys

**English**:
```javascript
apiKeyWarning: {
  title: 'API Key Required',
  description: '...',
  goToSettings: 'Go to Settings',
  getApiKey: 'Get API Key',  // ✅ ADDED
  learnMore: 'Learn More',
}
```

**Indonesian**:
```javascript
apiKeyWarning: {
  title: 'API Key Diperlukan',
  description: '...',
  goToSettings: 'Ke Pengaturan',
  getApiKey: 'Dapatkan API Key',  // ✅ ADDED
  learnMore: 'Pelajari Lebih Lanjut',
}
```

## Files Modified

1. ✅ `client/src/i18n/translations.js`
   - Added `getApiKey` key to English translations
   - Added `getApiKey` key to Indonesian translations

## Expected Result

### Before ❌:
```
Button text: "apiKeyWarning.getApiKey"
```

### After ✅:
```
English: "Get API Key"
Indonesian: "Dapatkan API Key"
```

## Where This Button Appears

- **Analyzer Page**: When no API key configured
- **Essay Clinic Page**: When no API key configured  
- **Dojo Page**: When no API key configured

The button links to: https://aistudio.google.com/app/apikey

---

**Status**: ✅ FIXED  
**Date**: October 9, 2025  
**Type**: Missing translation key  
**Impact**: Low - Visual/UX issue only
