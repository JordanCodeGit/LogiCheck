# LogiCheck - Web App & Browser Extension

> 🧠 **Your AI coach for sharpening logical reasoning** - Identify fallacies, detect biases, and improve argumentative writing.

LogiCheck is an integrated platform available as both a web application and browser extension, powered by Google's Gemini AI to help you analyze arguments, practice critical thinking, and write better essays.

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/react-18.2-61dafb.svg)](https://reactjs.org)

## ✨ Features

### 🔍 Core Analyzer
Analyze any text to identify:
- Main claims and arguments
- Hidden assumptions
- Logical fallacies
- Reasoning quality

### 🥋 Fallacy Dojo
Interactive training ground:
- **Fallacy Sparring**: Identify fallacies in realistic scenarios
- **Bias Blindspot**: Compare articles to detect bias
- Socratic dialogue for deeper understanding

### ✍️ Essay Clinic
Get AI-powered feedback on your essays:
- Argumentative quality analysis
- Structure and coherence review
- Suggestions for improvement

### 🌐 Dual Platform
- **Web App**: Full-featured interface at http://localhost:5173
- **Browser Extension**: Analyze text on any webpage

## 📋 Table of Contents
- [Quick Start](#-quick-start)
- [Architecture](#-architecture)
- [Shared Components](#-shared-components)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Build & Deployment](#-build--deployment)
- [Documentation](#-documentation)
- [Troubleshooting](#-troubleshooting)

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18 or higher
- **MongoDB** (optional, for user data persistence)
- **Google Gemini API Key** - Get yours at [Google AI Studio](https://aistudio.google.com/app/apikey)

### Installation

```bash
# Clone repository
git clone https://github.com/RedRNS/LogiCheck.git
cd LogiCheck

# Install all dependencies (root, server, client)
npm run install:all
```

### Running the Application

```bash
# Terminal 1 - Start backend server
npm run dev:server

# Terminal 2 - Start web client
npm run dev:client
```

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173

### Configure API Key

#### Web App
1. Open http://localhost:5173
2. Navigate to **Settings**
3. Paste your Gemini API key
4. Click **Test Key** → **Save**

#### Browser Extension
1. Build extension: `npm run build:extension`
2. Open `chrome://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked** → Select `extension/dist/`
5. Right-click extension icon → **Options**
6. Enter API key → **Save**

## 🏗️ Architecture

LogiCheck uses a **shared component architecture** for consistency between web and extension:

```
LogiCheck/
├── shared/              # 🆕 Shared code (web + extension)
│   ├── components/     # React components (Button, Card, Modal, etc.)
│   ├── api/            # Unified API layer
│   ├── styles/         # Global CSS & Tailwind config
│   └── utils/          # Utility functions
├── client/             # Web application (React + Vite)
│   ├── src/
│   │   ├── pages/      # Main pages (Analyzer, Dojo, Clinic)
│   │   └── components/ # Web-specific components
│   └── vite.config.js  # ✅ Configured for @shared imports
├── extension/          # Browser extension (Manifest V3)
│   ├── popup.jsx       # React popup UI
│   ├── background.js   # Service worker
│   └── manifest.json   # Extension config
├── server/             # Backend API (Node.js + Express)
│   ├── routes/         # API routes
│   ├── controllers/    # Business logic
│   └── models/         # MongoDB schemas
├── tailwind.config.js  # 🆕 Centralized Tailwind config
├── vite.config.extension.js  # 🆕 Extension build config
└── package.json        # 🔄 Updated with unified scripts
```

## 🎨 Shared Components

LogiCheck provides 8 reusable React components:

```jsx
import { 
  Alert,          // Notifications (info, success, warning, error)
  Badge,          // Status indicators
  Button,         // 6 variants × 3 sizes
  Card,           // Content containers
  ChatBubble,     // Socratic dialogue messages
  FallacyCard,    // Display fallacies
  LoadingSpinner, // Loading states
  Modal           // Dialog windows
} from '@shared/components';
```

### Example Usage

```jsx
import { Button, Card, Alert } from '@shared/components';

function MyComponent() {
  return (
    <Card variant="hover">
      <Alert type="success" message="Analysis complete!" />
      <Button variant="primary" onClick={handleAnalyze}>
        Analyze Text
      </Button>
    </Card>
  );
}
```

**[See all components →](./shared/README.md)**

## 🔌 API Documentation

### Unified API Layer

Both web and extension use the same API functions:

```javascript
import { 
  analyzeText,
  getSparringChallenge,
  analyzeEssay 
} from '@shared/api/shared-api';

// Analyze text for fallacies
const result = await analyzeText(userInput);

// Get a new challenge
const challenge = await getSparringChallenge();

// Analyze essay
const feedback = await analyzeEssay(essayText);
```
  - **Description**: Analyze text for logical fallacies, hidden assumptions, and argument structure.
  - **Request Body**:
    ```json
    {
      "text": "Your input text here",
      "apiKey": "Your Gemini API key"
    }
    ```
  - **Response**:
    ```json
    {
      "claims": [...],
      "fallacies": [...],
      "questions": [...]
    }
    ```

### Dojo
- `GET /api/dojo/sparring-challenge`
  - **Description**: Retrieve a fallacy identification challenge.
- `POST /api/dojo/verify-answer`
  - **Description**: Verify the user's answer to a challenge.

### Essay Clinic
- `POST /api/clinic/analyze-essay`
  - **Description**: Analyze an essay for argumentative quality.
  - **Request Body**:
    ```json
    {
      "essay": "Your essay text here",
      "apiKey": "Your Gemini API key"
    }
    ```

## ✨ Features
LogiCheck offers the following features:

### Core Analyzer
- Two-panel interface for text input and analysis.
- Identifies main claims, assumptions, and logical fallacies.
- Provides Socratic questions for deeper reflection.

### The Dojo
- Gamified practice environment for identifying fallacies and biases.
- Tracks progress and mastery levels.
- Immediate feedback with explanations.

### Essay Clinic
- Rich text editor for essay input.
- AI analysis focused on argumentation quality.
- Feedback categories:
  - Thesis Cohesion
  - Evidence-to-Claim Linkage
  - Logical Flow
  - Counterargument Engagement

### Browser Extension
- Context menu integration: "Analyze with LogiCheck".
- Keyboard shortcut: `Ctrl+Shift+L` (Windows/Linux) or `Cmd+Shift+L` (Mac).
- Sidebar UI for analysis results.

## 🧠 AI Model
LogiCheck uses **Google Gemini 2.5 Flash** for fast and efficient analysis. Key details:
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`
- **Why Gemini 2.5 Flash?**
  - ⚡ Fast response time (3-10 seconds).
  - 💰 Cost-effective with a free tier available.
  - 🎯 Optimized for reasoning and critical thinking tasks.

## 🔧 Troubleshooting
If you encounter issues, try the following:

### Web App
- **Frontend not loading**: Ensure `npm run dev:client` is running and visit `http://localhost:5173`.
- **Backend errors**: Check the terminal running `npm run dev:server` for logs.

### Extension
- **Extension not appearing**: Ensure Developer mode is enabled in `chrome://extensions/` and reload the extension.
- **API key errors**: Re-check the key in the Options page and use **Test Key**.

For detailed troubleshooting, see `docs/TROUBLESHOOTING.md`.

## 📚 Documentation
Additional resources:
- [ARCHITECTURE.md](docs/ARCHITECTURE.md): System architecture and design.
- [IMPLEMENTATION_SUMMARY.md](docs/IMPLEMENTATION_SUMMARY.md): Implementation details.
- [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md): Troubleshooting guide.
- [SETUP_GUIDE.md](docs/SETUP_GUIDE.md): Setup instructions.

---

If any specific part still fails (web not loading, extension error, API issues), paste the terminal or browser console error here and I will help debug.
