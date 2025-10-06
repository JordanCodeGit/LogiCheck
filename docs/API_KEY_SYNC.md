# API Key Synchronization

## Overview
LogiCheck now supports **bidirectional synchronization** of the Gemini API key between the web application and the browser extension. This means:

- ✅ When you save an API key in the web app, it automatically syncs to the extension
- ✅ When you save an API key in the extension, it automatically syncs to the web app
- ✅ Both directions work seamlessly without user intervention

## How It Works

### Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────────┐
│   Web App       │ <-----> │ Content Script   │ <-----> │ Background Script   │
│  (localStorage) │         │   (Bridge)       │         │ (chrome.storage)    │
└─────────────────┘         └──────────────────┘         └─────────────────────┘
                                                                     │
                                                                     v
                                                          ┌─────────────────────┐
                                                          │  Extension Options  │
                                                          │  (chrome.storage)   │
                                                          └─────────────────────┘
```

### Communication Flow

#### Web App → Extension
1. User saves API key in web app (`ApiKeySettings.jsx`)
2. Web app saves to `localStorage`
3. Web app sends message via `window.postMessage()`
4. Content script receives message and forwards to background script
5. Background script saves to `chrome.storage.local`
6. Extension's API key is updated

#### Extension → Web App
1. User saves API key in extension options
2. Extension saves to `chrome.storage.local`
3. `chrome.storage.onChanged` listener detects the change
4. Background script notifies all content scripts
5. Content script sends message to web page via `window.postMessage()`
6. Web app receives message and updates `localStorage`
7. React component state is updated

### Key Components

#### 1. **extensionSync.js** (`client/src/utils/extensionSync.js`)
Utility functions for syncing between web app and extension:
- `syncApiKeyToExtension(apiKey)` - Send API key from web to extension
- `listenToExtensionChanges(callback)` - Listen for updates from extension
- `initializeSync()` - Initialize sync on page load

#### 2. **Content Script** (`extension/content.js`)
Acts as a bridge between web page and extension:
- Listens for `LOGICHECK_API_KEY_SYNC` messages from web page
- Forwards sync requests to background script
- Receives updates from background script and notifies web page

#### 3. **Background Script** (`extension/background.js`)
Manages extension storage and notifies content scripts:
- Handles `syncApiKeyFromWeb` action
- Handles `getApiKey` action
- Listens to `chrome.storage.onChanged` events
- Broadcasts changes to all tabs

#### 4. **ApiKeySettings Component** (`client/src/components/ApiKeySettings.jsx`)
React component with sync integration:
- Calls `initializeSync()` on mount
- Calls `syncApiKeyToExtension()` when saving/clearing
- Listens for updates via `listenToExtensionChanges()`

## Message Types

### Web Page → Content Script
```javascript
{
  type: "LOGICHECK_API_KEY_SYNC",
  source: "logicheck-web",
  apiKey: "AIza..."
}
```

```javascript
{
  type: "LOGICHECK_GET_API_KEY",
  source: "logicheck-web"
}
```

### Content Script → Web Page
```javascript
{
  type: "LOGICHECK_API_KEY_SYNC",
  source: "logicheck-extension",
  apiKey: "AIza..."
}
```

```javascript
{
  type: "LOGICHECK_GET_API_KEY_RESPONSE",
  source: "logicheck-extension",
  apiKey: "AIza..."
}
```

### Content Script → Background Script
```javascript
{
  action: "syncApiKeyFromWeb",
  apiKey: "AIza..."
}
```

```javascript
{
  action: "getApiKey"
}
```

## Security Considerations

1. **Local Storage Only**: API keys are stored locally in:
   - `localStorage` for web app
   - `chrome.storage.local` for extension

2. **No Server Communication**: API keys are never sent to LogiCheck servers

3. **Direct to Google**: API keys are sent directly from browser to Google's Gemini API

4. **Message Validation**: All messages are validated by source to prevent XSS attacks

## Testing

### Test Scenario 1: Web → Extension
1. Open LogiCheck web app
2. Go to Settings page
3. Enter a Gemini API key and click "Save"
4. Open extension options (right-click extension icon → Options)
5. Verify the same API key appears in the extension

### Test Scenario 2: Extension → Web
1. Open extension options
2. Enter a Gemini API key and click "Save"
3. Open LogiCheck web app
4. Go to Settings page
5. Verify the same API key appears in the web app

### Test Scenario 3: Clear Sync
1. Clear API key in either web app or extension
2. Verify it's cleared in both locations

## Troubleshooting

### API Key Not Syncing
- **Check if extension is installed**: Sync only works when the extension is installed
- **Check browser console**: Look for sync-related messages
- **Verify permissions**: Extension needs `storage` permission (already configured)
- **Check tab/page**: Make sure you're on a tab where the content script can run

### Extension Not Detected
- The sync will gracefully fail with a timeout message
- Web app will still work independently with localStorage
- Status message will indicate "Extension not available"

## Implementation Files

- `client/src/utils/extensionSync.js` - Web app sync utility
- `client/src/components/ApiKeySettings.jsx` - Settings component with sync
- `extension/content.js` - Content script message bridge
- `extension/background.js` - Background script with storage listener
- `extension/options.js` - Extension options page (unchanged, uses chrome.storage)

## Future Enhancements

- [ ] Add sync indicator UI showing sync status
- [ ] Add conflict resolution for simultaneous changes
- [ ] Add sync logs for debugging
- [ ] Support syncing other settings (theme, preferences, etc.)
