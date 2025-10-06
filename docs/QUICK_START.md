# 🚀 Quick Start Guide - LogiCheck Integration

Panduan singkat untuk mulai menggunakan shared components dan API di LogiCheck.

## 📦 Instalasi

```bash
# Clone repository
git clone <repository-url>
cd LogiCheck

# Install semua dependencies
npm run install:all
```

## 🎯 Development

### Menjalankan Web Client

```bash
# Terminal 1 - Start backend server
npm run dev:server

# Terminal 2 - Start web client
npm run dev:client
```

Web client akan berjalan di: http://localhost:5173

### Menjalankan Extension

1. Build extension:
```bash
npm run build:extension
```

2. Load extension di Chrome:
   - Buka `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Pilih folder `extension/dist/`

## 🎨 Menggunakan Shared Components

### Import Components

```jsx
// Single import
import { Button } from '@shared/components';

// Multiple imports
import { Button, Card, Alert, LoadingSpinner } from '@shared/components';
```

### Contoh Penggunaan

```jsx
import React, { useState } from 'react';
import { Button, Card, Alert, Modal } from '@shared/components';

function MyComponent() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div>
      <Card variant="hover">
        <h2>My Component</h2>
        <Button 
          variant="primary" 
          onClick={() => setShowModal(true)}
        >
          Open Modal
        </Button>
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Example Modal"
      >
        <p>Modal content here...</p>
      </Modal>

      <Alert 
        type="success" 
        message="Success message!"
      />
    </div>
  );
}
```

## 🔌 Menggunakan Shared API

### Import API Functions

```javascript
import { 
  analyzeText, 
  getSparringChallenge,
  getApiKey 
} from '@shared/api/shared-api';
```

### Contoh Penggunaan

```javascript
async function handleAnalyze() {
  try {
    // Check API key
    const apiKey = await getApiKey();
    if (!apiKey) {
      console.error('API key not configured');
      return;
    }

    // Analyze text
    const result = await analyzeText(userInput);
    console.log('Analysis:', result);

    // Get challenge
    const challenge = await getSparringChallenge();
    console.log('Challenge:', challenge);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

## 🎨 Styling dengan Tailwind

### Menggunakan Utility Classes

```jsx
// Colors
<div className="bg-primary-600 text-white">Primary</div>
<div className="bg-secondary-500">Secondary</div>
<div className="bg-success-600">Success</div>

// Component classes
<button className="btn btn-primary">Button</button>
<div className="card">Card content</div>
<input className="input" />

// Animations
<div className="animate-fade-in">Fading in...</div>
<div className="animate-slide-up">Sliding up...</div>
```

### Custom Styling

```css
/* Import shared styles first */
@import '@shared/styles/globals.css';

/* Then add your custom styles */
.my-custom-class {
  @apply bg-primary-100 text-primary-800 p-4 rounded-lg;
}
```

## 🌍 Environment Variables

### Web Client

Create `client/.env.development`:

```env
VITE_API_URL=http://localhost:5000/api
```

Create `client/.env.production`:

```env
VITE_API_URL=https://your-production-api.com/api
```

### Extension

API URL dikonfigurasi otomatis di `shared/api/shared-api.js`

## 🏗️ Build untuk Production

### Build Web

```bash
npm run build:web
```

Output: `client/dist/`

### Build Extension

```bash
npm run build:extension
```

Output: `extension/dist/`

### Build Semua

```bash
npm run build:all
```

## 📱 Component Variants Cheat Sheet

### Button
```jsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
```

### Alert
```jsx
<Alert type="info" message="Info message" />
<Alert type="success" message="Success!" />
<Alert type="warning" message="Warning!" />
<Alert type="error" message="Error!" />

<Alert 
  type="info"
  title="Title"
  message="Message"
  dismissible
  onDismiss={() => {}}
/>
```

### Badge
```jsx
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>

<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

### Modal
```jsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Modal Title"
  size="md"
  closeOnOverlayClick={true}
  showCloseButton={true}
  footer={<Button onClick={handleClose}>Close</Button>}
>
  Modal content
</Modal>
```

## 🔧 Troubleshooting

### Import Error: Cannot find '@shared'

Pastikan alias dikonfigurasi di `vite.config.js`:

```javascript
resolve: {
  alias: {
    '@shared': path.resolve(__dirname, '../shared'),
  },
}
```

### Styling Tidak Muncul

1. Pastikan import shared styles:
```css
@import '@shared/styles/globals.css';
```

2. Check Tailwind config mengimport root config:
```javascript
import sharedConfig from '../tailwind.config.js';
export default sharedConfig;
```

### API Call Failed

1. Check API key:
```javascript
const apiKey = await getApiKey();
console.log('API Key:', apiKey);
```

2. Check environment variable:
```bash
# .env.development
VITE_API_URL=http://localhost:5000/api
```

3. Check server running:
```bash
npm run dev:server
```

## 📚 Next Steps

1. Baca [Integration Guide](./INTEGRATION_GUIDE.md) untuk detail lengkap
2. Lihat [Shared Components README](../shared/README.md) untuk dokumentasi komponen
3. Check [Architecture Documentation](./ARCHITECTURE.md) untuk arsitektur sistem

## 🆘 Need Help?

- Check dokumentasi lengkap di folder `docs/`
- Review contoh penggunaan di `client/src/pages/`
- Lihat komponen di `shared/components/`

---

Happy coding! 🚀
