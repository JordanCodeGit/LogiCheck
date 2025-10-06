# Panduan Integrasi Web & Extension LogiCheck

Dokumen ini menjelaskan bagaimana versi web dan extension LogiCheck diintegrasikan untuk berbagi styling, komponen, dan API.

## 📋 Daftar Isi

1. [Struktur Proyek](#struktur-proyek)
2. [Komponen Shared](#komponen-shared)
3. [API Terpusat](#api-terpusat)
4. [Konfigurasi Styling](#konfigurasi-styling)
5. [Build & Deployment](#build--deployment)
6. [Panduan Migrasi](#panduan-migrasi)
7. [FAQ](#faq)

## 📁 Struktur Proyek

```
LogiCheck/
├── shared/                    # 🆕 Kode bersama untuk web & extension
│   ├── components/           # Komponen React reusable
│   │   ├── Alert.jsx
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── ChatBubble.jsx
│   │   ├── FallacyCard.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Modal.jsx
│   │   └── index.js
│   ├── api/                  # API client functions
│   │   └── shared-api.js
│   ├── styles/               # Global CSS & Tailwind
│   │   └── globals.css
│   ├── utils/                # Utility functions
│   │   └── apiKeyUtils.js
│   └── README.md
├── client/                    # Web application
│   ├── src/
│   │   ├── components/       # Web-specific components
│   │   ├── pages/
│   │   └── api/
│   │       └── api.js        # 🔄 Now uses @shared/api
│   ├── tailwind.config.js    # 🔄 Imports from root
│   ├── postcss.config.js     # 🔄 Imports from root
│   └── vite.config.js        # 🔄 Added alias for @shared
├── extension/                 # Browser extension
│   ├── background.js
│   ├── content.js
│   ├── options.html
│   └── manifest.json
├── server/                    # Backend API
├── tailwind.config.js        # 🆕 Root Tailwind config
├── postcss.config.js         # 🆕 Root PostCSS config
├── vite.config.extension.js  # 🆕 Build config for extension
└── package.json              # 🔄 Updated with build scripts
```

## 🎨 Komponen Shared

### Komponen yang Tersedia

Semua komponen di folder `shared/components/` dapat digunakan di web dan extension:

#### 1. **Button**
```jsx
import { Button } from '@shared/components';

<Button variant="primary" size="md" onClick={handleClick}>
  Analyze Text
</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `ghost`, `danger`, `success`  
**Sizes**: `sm`, `md`, `lg`

#### 2. **Card**
```jsx
import { Card } from '@shared/components';

<Card variant="hover">
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>
```

**Variants**: `default`, `flat`, `hover`

#### 3. **Modal**
```jsx
import { Modal } from '@shared/components';

<Modal 
  isOpen={isOpen} 
  onClose={handleClose}
  title="Modal Title"
  size="md"
>
  Modal content...
</Modal>
```

**Sizes**: `sm`, `md`, `lg`, `xl`

#### 4. **Alert**
```jsx
import { Alert } from '@shared/components';

<Alert 
  type="success" 
  title="Success!"
  message="Analysis complete."
  dismissible
  onDismiss={handleDismiss}
/>
```

**Types**: `info`, `success`, `warning`, `error`

#### 5. **ChatBubble**
```jsx
import { ChatBubble } from '@shared/components';

<ChatBubble 
  message="Hello, this is a message"
  isUser={false}
  timestamp="2:30 PM"
/>
```

#### 6. **FallacyCard**
```jsx
import { FallacyCard } from '@shared/components';

<FallacyCard 
  fallacy={{
    fallacyName: "Ad Hominem",
    quote: "You're wrong because you're stupid",
    explanation: "Attacking the person instead of the argument"
  }}
/>
```

#### 7. **LoadingSpinner**
```jsx
import { LoadingSpinner } from '@shared/components';

<LoadingSpinner 
  size="md"
  color="primary"
  text="Analyzing..."
  fullScreen={false}
/>
```

#### 8. **Badge**
```jsx
import { Badge } from '@shared/components';

<Badge variant="success" size="md">
  Completed
</Badge>
```

## 🔌 API Terpusat

### Setup Environment Variables

#### Web (.env.development)
```env
VITE_API_URL=http://localhost:5000/api
```

#### Extension
API URL dikonfigurasi dalam `shared/api/shared-api.js`

### Penggunaan API

```javascript
import { 
  analyzeText,
  getSparringChallenge,
  analyzeEssay,
  getApiKey,
  setApiKey
} from '@shared/api/shared-api';

// Analyze text
const result = await analyzeText(inputText);

// Get challenge
const challenge = await getSparringChallenge();

// Manage API key
await setApiKey('your-api-key');
const apiKey = await getApiKey();
```

### API Functions Available

- `analyzeText(text)` - Analyze text for fallacies
- `getSparringChallenge()` - Get fallacy sparring challenge
- `verifySparringAnswer(data)` - Verify challenge answer
- `getBiasChallenge()` - Get bias detection challenge
- `analyzeBiasHighlights(data)` - Analyze bias highlights
- `analyzeEssay(essayText)` - Analyze essay quality
- `getApiKey()` - Get stored API key
- `setApiKey(key)` - Store API key
- `removeApiKey()` - Remove API key

## 🎨 Konfigurasi Styling

### Tailwind CSS

Semua styling menggunakan konfigurasi Tailwind terpusat di `tailwind.config.js` (root).

#### Custom Colors
```javascript
// Primary (Blue)
primary-50 to primary-950

// Secondary (Purple)
secondary-50 to secondary-950

// Accent (Red)
accent-50 to accent-950

// Success (Green)
success-50 to success-950

// Warning (Yellow)
warning-50 to warning-950
```

#### Utility Classes

**Button Classes**
```css
.btn, .btn-primary, .btn-secondary, .btn-outline, .btn-ghost
.btn-danger, .btn-success, .btn-sm, .btn-lg
```

**Card Classes**
```css
.card, .card-hover, .card-flat
```

**Input Classes**
```css
.input, .input-error, .textarea
```

**Alert Classes**
```css
.alert, .alert-info, .alert-success, .alert-warning, .alert-error
```

**Badge Classes**
```css
.badge, .badge-primary, .badge-secondary, .badge-success
.badge-warning, .badge-danger
```

**Animations**
```css
.animate-fade-in, .animate-slide-up, .animate-slide-down
```

### Import Shared Styles

```css
/* In your CSS file */
@import '@shared/styles/globals.css';
```

## 🚀 Build & Deployment

### Install Dependencies

```bash
# Install all dependencies (root, server, client)
npm run install:all
```

### Development

```bash
# Run web client
npm run dev:client

# Run server
npm run dev:server
```

### Build

```bash
# Build web version
npm run build:web

# Build extension version
npm run build:extension

# Build both
npm run build:all
```

### Scripts Available

- `install:all` - Install dependencies for all projects
- `dev:server` - Start development server
- `dev:client` - Start web client dev server
- `build:web` - Build web application
- `build:extension` - Build browser extension
- `build:all` - Build both web and extension
- `preview:web` - Preview built web app

## 🔄 Panduan Migrasi

### Migrasi Komponen Existing ke Shared

#### Langkah 1: Update Import

**Before:**
```jsx
import Button from '../components/Button';
import Card from '../components/Card';
```

**After:**
```jsx
import { Button, Card } from '@shared/components';
```

#### Langkah 2: Update Styling

Pastikan komponen menggunakan utility classes dari shared config:

**Before:**
```jsx
<button className="bg-blue-600 hover:bg-blue-700...">
```

**After:**
```jsx
<Button variant="primary">
```

#### Langkah 3: Update API Calls

**Before:**
```javascript
import { analyzeText } from '../api/api';
```

**After:**
```javascript
import { analyzeText } from '@shared/api/shared-api';
```

### Migrasi Web Components

1. Identifikasi komponen yang bisa direuse
2. Copy ke `shared/components/`
3. Update untuk menggunakan Tailwind shared config
4. Export dari `shared/components/index.js`
5. Update imports di web app

### Migrasi Extension

1. Setup React untuk extension (jika belum)
2. Configure Vite untuk extension build
3. Import shared components
4. Update styling untuk menggunakan Tailwind

## ❓ FAQ

### Q: Bagaimana cara menambah komponen baru?

**A:** 
1. Buat file di `shared/components/NewComponent.jsx`
2. Export dari `shared/components/index.js`
3. Gunakan utility classes dari Tailwind config
4. Import dengan `import { NewComponent } from '@shared/components'`

### Q: Bagaimana cara custom styling untuk web atau extension saja?

**A:**
Gunakan CSS file lokal untuk override:

```css
/* client/src/styles/index.css */
@import '@shared/styles/globals.css';

/* Custom web-only styles */
.custom-web-class {
  /* ... */
}
```

### Q: Apakah shared components mendukung TypeScript?

**A:** Saat ini menggunakan JSDoc. Untuk TypeScript migration:
1. Rename `.jsx` to `.tsx`
2. Add proper type definitions
3. Update build configs

### Q: Bagaimana cara test shared components?

**A:**
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react jest

# Add test file
shared/components/__tests__/Button.test.jsx
```

### Q: API key disimpan dimana?

**A:**
- **Web**: localStorage
- **Extension**: chrome.storage.local

Shared API layer menangani perbedaan ini secara otomatis.

### Q: Bagaimana cara update Tailwind theme?

**A:** Edit `tailwind.config.js` di root. Perubahan akan berlaku untuk web dan extension.

### Q: Build extension error, apa yang harus dilakukan?

**A:**
1. Pastikan semua dependencies terinstall: `npm install`
2. Check vite.config.extension.js
3. Pastikan manifest.json sesuai dengan output build
4. Cek browser console untuk error spesifik

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Chrome Extension API](https://developer.chrome.com/docs/extensions/)
- [React Documentation](https://react.dev/)

## 🤝 Contributing

Saat menambah fitur baru:

1. ✅ Gunakan shared components jika memungkinkan
2. ✅ Ikuti design system (colors, spacing, typography)
3. ✅ Test di web dan extension
4. ✅ Update dokumentasi
5. ✅ Gunakan environment variables untuk config

## 📝 Changelog

### v1.0.0 - Integration Complete

- ✅ Shared components library
- ✅ Unified API layer
- ✅ Centralized Tailwind configuration
- ✅ Build scripts for web and extension
- ✅ Environment variable support
- ✅ Documentation

---

**Happy Coding! 🚀**
