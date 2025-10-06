# Shared Components & API

This folder contains reusable components, API functions, and utilities that are shared between the LogiCheck web application and browser extension.

## 📁 Structure

```
shared/
├── components/     # Reusable React components
├── api/           # API client functions
├── styles/        # Global CSS and Tailwind styles
└── utils/         # Utility functions
```

## 🎨 Components

All components are built with React and styled using Tailwind CSS. They follow a consistent design system defined in the root `tailwind.config.js`.

### Available Components

- **Alert** - Notification messages (info, success, warning, error)
- **Badge** - Small status indicators and tags
- **Button** - Buttons with multiple variants and sizes
- **Card** - Container for content
- **ChatBubble** - Chat message bubbles for Socratic Dialogue
- **FallacyCard** - Display logical fallacy information
- **LoadingSpinner** - Loading indicators
- **Modal** - Dialog/popup windows

### Usage Example

```jsx
import { Button, Card, Alert } from '@shared/components';

function MyComponent() {
  return (
    <Card>
      <Alert type="success" message="Analysis complete!" />
      <Button variant="primary" onClick={handleClick}>
        Analyze Text
      </Button>
    </Card>
  );
}
```

## 🔌 API

The shared API layer provides consistent access to backend services for both web and extension.

### Features

- Environment-aware base URL configuration
- Cross-platform storage (localStorage for web, chrome.storage for extension)
- Consistent error handling
- Type-safe API functions

### Usage Example

```javascript
import { analyzeText, getSparringChallenge } from '@shared/api/shared-api';

// Analyze text for fallacies
const result = await analyzeText(userInput);

// Get a new challenge
const challenge = await getSparringChallenge();
```

## 🎨 Styles

Global styles and Tailwind configuration are shared across both platforms.

### Tailwind Classes

All components use utility classes from the shared Tailwind config:

- **Colors**: `primary`, `secondary`, `accent`, `success`, `warning`
- **Component classes**: `btn`, `card`, `input`, `badge`, `alert`
- **Animations**: `animate-fade-in`, `animate-slide-up`, `animate-slide-down`

### Importing Styles

```css
/* Import shared global styles */
@import '../../shared/styles/globals.css';
```

## 🛠️ Utilities

Utility functions for common tasks:

- **apiKeyUtils.js** - API key validation, storage, and masking

## 🔧 Development

### Adding New Components

1. Create component file in `shared/components/`
2. Export from `shared/components/index.js`
3. Use Tailwind utility classes from shared config
4. Document props with JSDoc comments

### Adding New API Functions

1. Add function to `shared/api/shared-api.js`
2. Use `apiRequest` helper for consistency
3. Export function for use in web and extension
4. Handle errors with `handleApiError`

## 📦 Build Configuration

### Web (Vite)

```javascript
// vite.config.js
resolve: {
  alias: {
    '@shared': path.resolve(__dirname, '../shared'),
  },
}
```

### Extension (Vite)

```javascript
// vite.config.extension.js
resolve: {
  alias: {
    '@shared': path.resolve(__dirname, '../shared'),
  },
}
```

## 🎯 Design Principles

1. **Platform Agnostic** - Components work in both web and extension contexts
2. **Consistent Styling** - All styling via shared Tailwind configuration
3. **Type Safety** - JSDoc comments for better IDE support
4. **Accessibility** - ARIA labels and keyboard navigation
5. **Performance** - Optimized bundle size and lazy loading support

## 🚀 Future Enhancements

- [ ] Add unit tests with Jest
- [ ] Storybook for component documentation
- [ ] TypeScript migration
- [ ] More reusable hooks
- [ ] Icon component library
