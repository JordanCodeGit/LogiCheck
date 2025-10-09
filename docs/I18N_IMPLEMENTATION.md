# LogiCheck - Internationalization (i18n) Implementation Guide

## 📋 Overview

LogiCheck now supports **bilingual functionality** with English (EN) and Indonesian (ID) languages. This feature allows users to switch between languages seamlessly across the entire platform, including:

- ✅ Website UI (React App)
- ✅ Browser Extension (Popup, Context Menu, Sidebar)
- ✅ AI Analysis Results (Gemini API responses)
- ✅ Dojo Game Content
- ✅ Essay Clinic Feedback

---

## 🌍 Supported Languages

| Language | Code | Default |
|----------|------|---------|
| English | `en` | ✓ |
| Indonesian (Bahasa Indonesia) | `id` | |

---

## 🏗️ Architecture

### 1. **Translation Files**
- **Location**: `shared/i18n/translations.js`
- **Structure**: Nested JSON objects with keys for each language
- **Access**: Import `translations` object or use `t()` helper function

```javascript
import { translations, t } from '@shared/i18n/translations';

// Get translation
const text = t('en', 'common.analyze'); // "Analyze"
const text = t('id', 'common.analyze'); // "Analisis"
```

### 2. **Language Utilities**
- **Location**: `shared/utils/languageUtils.js`
- **Functions**:
  - `getLanguage()`: Retrieves current language setting
  - `setLanguage(lang)`: Saves language preference
  - `onLanguageChange(callback)`: Listens for language changes

```javascript
import { getLanguage, setLanguage } from '@shared/utils/languageUtils';

// Get current language
const lang = await getLanguage(); // 'en' or 'id'

// Set language
await setLanguage('id');
```

### 3. **React Context (Website)**
- **Location**: `client/src/contexts/LanguageContext.jsx`
- **Provider**: `LanguageProvider`
- **Hook**: `useLanguage()`

```javascript
import { useLanguage } from '../contexts/LanguageContext';

function MyComponent() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <button onClick={() => setLanguage('id')}>
        Switch to Indonesian
      </button>
    </div>
  );
}
```

### 4. **Language Switcher Component**
- **Location**: `client/src/components/LanguageSwitcher.jsx`
- **Variants**:
  - `dropdown`: Full dropdown selector (for Settings page)
  - `toggle`: Compact toggle button (for Navigation bar)

```javascript
import LanguageSwitcher from '../components/LanguageSwitcher';

// Dropdown variant
<LanguageSwitcher variant="dropdown" />

// Toggle variant (compact)
<LanguageSwitcher variant="toggle" />
```

---

## 🔧 Implementation Details

### Website (React App)

#### 1. **App.jsx** - Wrap with LanguageProvider
```javascript
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        {/* Rest of app */}
      </ThemeProvider>
    </LanguageProvider>
  );
}
```

#### 2. **Using Translations in Components**
```javascript
import { useLanguage } from '../contexts/LanguageContext';

function AnalyzerPage() {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('analyzer.title')}</h1>
      <button>{t('analyzer.analyzeButton')}</button>
      <p>{t('analyzer.results.mainClaim')}</p>
    </div>
  );
}
```

#### 3. **API Calls with Language**
The `api.js` automatically includes the current language in API requests:

```javascript
// In client/src/api/api.js
const getLanguage = () => {
  return localStorage.getItem('LOGICHECK_LANGUAGE') || 'en';
};

export const analyzeText = async (text, signal = null) => {
  const apiKey = getApiKey();
  const language = getLanguage();
  const response = await api.post('/analyze', { 
    text, 
    apiKey, 
    language  // ← Sent to backend
  });
  return response.data;
};
```

---

### Server (Node.js/Express)

#### 1. **Gemini Prompt Builder**
- **Location**: `server/config/gemini.js`
- **Function**: `buildSocraticPrompt(userText, promptType, language)`

```javascript
// Multi-language persona
const basePersonas = {
  en: `You are LogiCheck, a conversational AI coach...`,
  id: `Anda adalah LogiCheck, pelatih AI percakapan...`
};

const basePersona = basePersonas[language] || basePersonas.en;
```

#### 2. **Controllers**
Controllers now accept `language` parameter:

```javascript
// server/controllers/analyzeController.js
export const analyzeText = async (req, res) => {
  const { text, apiKey, language = 'en' } = req.body;
  
  // Build prompt with language
  const prompt = buildSocraticPrompt(text, 'analyze', language);
  
  // Call Gemini API
  const aiResponse = await callGeminiAPI(prompt, apiKey);
  
  res.json(aiResponse);
};
```

---

### Browser Extension

#### 1. **Background Script**
- **Location**: `extension/background.js`
- **Features**:
  - Multi-language context menu
  - Multi-language AI prompts
  - Language sync across tabs

```javascript
// Get language from storage
async function getLanguage() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['LOGICHECK_LANGUAGE'], (result) => {
      resolve(result.LOGICHECK_LANGUAGE || 'en');
    });
  });
}

// Update context menu
async function updateContextMenu() {
  const language = await getLanguage();
  const contextMenuText = language === 'id' 
    ? 'Analisis dengan LogiCheck' 
    : 'Analyze with LogiCheck';
  
  chrome.contextMenus.create({
    id: 'analyzeWithLogiCheck',
    title: contextMenuText,
    contexts: ['selection']
  });
}
```

#### 2. **Popup Translations**
- **Location**: `extension/popup-i18n.js`

```javascript
const translations = {
  en: {
    title: 'LogiCheck Lens',
    subtitle: 'Analyze content on any webpage',
    // ...
  },
  id: {
    title: 'LogiCheck Lens',
    subtitle: 'Analisis konten di halaman web mana pun',
    // ...
  }
};
```

---

## 🔄 Language Synchronization

### Cross-Platform Sync

The language setting is synchronized across:
- ✅ Website (localStorage)
- ✅ Extension (chrome.storage.sync)
- ✅ All browser tabs
- ✅ API requests

### Sync Flow

```
User changes language in Settings
         ↓
Saved to localStorage (Website)
         ↓
Saved to chrome.storage.sync (Extension)
         ↓
Event listener triggers
         ↓
All components update automatically
         ↓
Next API call uses new language
```

---

## 📝 Adding New Translations

### 1. **Add to Translation File**
Edit `shared/i18n/translations.js`:

```javascript
export const translations = {
  en: {
    myNewFeature: {
      title: 'My Feature',
      description: 'This is a new feature',
    }
  },
  id: {
    myNewFeature: {
      title: 'Fitur Saya',
      description: 'Ini adalah fitur baru',
    }
  }
};
```

### 2. **Use in Component**
```javascript
const { t } = useLanguage();

<h1>{t('myNewFeature.title')}</h1>
<p>{t('myNewFeature.description')}</p>
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] **Website**:
  - [ ] Switch language in Settings
  - [ ] Verify all UI text updates
  - [ ] Test Analyzer with both languages
  - [ ] Test Essay Clinic with both languages
  - [ ] Test Dojo games with both languages

- [ ] **Extension**:
  - [ ] Verify context menu text changes
  - [ ] Test analysis with selected text
  - [ ] Verify sidebar displays in correct language
  - [ ] Check popup UI translations

- [ ] **API**:
  - [ ] Verify Gemini responses are in selected language
  - [ ] Check fallacy names are translated
  - [ ] Verify Socratic questions are in correct language

- [ ] **Sync**:
  - [ ] Change language on website, check extension
  - [ ] Change language on extension, check website
  - [ ] Verify sync across multiple tabs

---

## 🎯 Translation Coverage

### Fully Translated Sections

✅ **Website UI**:
- Navigation menu
- Home page
- Analyzer page
- Dojo page (all games)
- Essay Clinic page
- Extension page
- Settings page
- API Key warnings
- Loading states
- Error messages

✅ **Extension**:
- Popup interface
- Context menu
- Sidebar analysis results
- Settings UI

✅ **AI Responses**:
- Analysis prompts
- Essay feedback prompts
- Gemini AI instructions
- Result formatting

✅ **Game Content**:
- Fallacy Sparring instructions
- Bias Blindspot instructions
- Feedback messages
- Score displays

---

## 🚀 Usage Examples

### Example 1: Analyzer Page
```javascript
import { useLanguage } from '../contexts/LanguageContext';

function AnalyzerPage() {
  const { t, language } = useLanguage();
  
  return (
    <div>
      <h1>{t('analyzer.title')}</h1>
      <p>{t('analyzer.subtitle')}</p>
      
      <textarea 
        placeholder={t('analyzer.inputPlaceholder')}
      />
      
      <button>{t('analyzer.analyzeButton')}</button>
      
      {/* Results */}
      <h2>{t('analyzer.results.mainClaim')}</h2>
      <h3>{t('analyzer.results.fallacies')}</h3>
    </div>
  );
}
```

### Example 2: Settings Page
```javascript
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

function SettingsPage() {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('settings.title')}</h1>
      
      {/* Language Settings Section */}
      <div>
        <h2>{t('settings.language.title')}</h2>
        <LanguageSwitcher variant="dropdown" />
      </div>
    </div>
  );
}
```

### Example 3: Extension Background
```javascript
// In extension/background.js

// Get language and update context menu
async function updateContextMenu() {
  const language = await getLanguage();
  
  const text = language === 'id' 
    ? 'Analisis dengan LogiCheck' 
    : 'Analyze with LogiCheck';
  
  chrome.contextMenus.create({
    id: 'analyzeWithLogiCheck',
    title: text,
    contexts: ['selection']
  });
}

// Use in prompt
const prompts = {
  en: `Analyze the following text...`,
  id: `Analisis teks berikut...`
};

const prompt = prompts[language] || prompts.en;
```

---

## 📚 Translation Keys Reference

### Common UI Elements
- `common.language` - "Language" / "Bahasa"
- `common.analyze` - "Analyze" / "Analisis"
- `common.save` - "Save" / "Simpan"
- `common.cancel` - "Cancel" / "Batal"
- `common.loading` - "Loading" / "Memuat"

### Navigation
- `nav.home` - "Home" / "Beranda"
- `nav.analyzer` - "Analyzer" / "Analisis"
- `nav.dojo` - "Dojo" / "Dojo"
- `nav.essayClinic` - "Essay Clinic" / "Klinik Esai"

### Analyzer
- `analyzer.title` - "Core Analyzer" / "Analisis Inti"
- `analyzer.analyzeButton` - "Analyze Text" / "Analisis Teks"
- `analyzer.results.mainClaim` - "Main Claim" / "Klaim Utama"

### Settings
- `settings.language.title` - "Language" / "Bahasa"
- `settings.language.english` - "English" / "Inggris (English)"
- `settings.language.indonesian` - "Indonesian" / "Indonesia"

For the complete list, refer to `shared/i18n/translations.js`.

---

## 🔧 Troubleshooting

### Issue: Language not changing
**Solution**: 
1. Check if `LanguageProvider` wraps the app
2. Verify `useLanguage()` is called inside the provider
3. Clear browser cache and localStorage

### Issue: Extension context menu not updating
**Solution**:
1. Reload the extension
2. Check chrome.storage.sync permissions in manifest.json
3. Verify `updateContextMenu()` is called on language change

### Issue: API responses in wrong language
**Solution**:
1. Check if language is being sent in API request
2. Verify `buildSocraticPrompt()` receives language parameter
3. Check server logs for received language value

---

## 📖 Best Practices

1. **Always use translation keys**: Never hardcode text strings
2. **Provide fallbacks**: Use `|| 'en'` when getting language
3. **Test both languages**: Always test features in both EN and ID
4. **Keep translations consistent**: Use the same terminology across the app
5. **Update all platforms**: When adding new text, translate for web, extension, and API

---

## 🎉 Summary

LogiCheck now fully supports English and Indonesian languages across:
- ✅ All UI components (website & extension)
- ✅ AI analysis results from Gemini
- ✅ Game instructions and feedback
- ✅ Error messages and notifications
- ✅ Context menus and shortcuts

Users can switch languages from the Settings page, and the preference is automatically synced across the website and browser extension.

**Default Language**: English (EN)
**Storage Keys**: 
- Website: `localStorage.LOGICHECK_LANGUAGE`
- Extension: `chrome.storage.sync.LOGICHECK_LANGUAGE`

---

**Last Updated**: October 8, 2025
**Version**: 1.0.0
