# 🏗️ Dark Mode Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     LOGICHECK EXTENSION                         │
│                      Dark Mode System                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         USER ACTION                             │
│                                                                 │
│         User clicks theme toggle button 🌙/☀️                  │
│                          ↓                                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      POPUP.JS (popup.js)                        │
│                                                                 │
│  1. toggleTheme() called                                        │
│     ├─ Get current theme from chrome.storage                   │
│     ├─ Switch: 'light' ↔ 'dark'                                │
│     └─ Call applyTheme(newTheme)                               │
│                          ↓                                      │
│  2. applyTheme(theme)                                          │
│     ├─ Add/remove 'dark' class to <html>                      │
│     ├─ Update icon (moon ↔ sun)                               │
│     ├─ Save to chrome.storage.sync                            │
│     └─ Broadcast to all tabs                                  │
│                          ↓                                      │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                  CHROME STORAGE SYNC API                        │
│                                                                 │
│  chrome.storage.sync.set({ theme: 'dark' })                   │
│                                                                 │
│  ┌──────────────────────────────────────┐                     │
│  │  Storage:                             │                     │
│  │  {                                    │                     │
│  │    "theme": "dark"  // or "light"    │                     │
│  │  }                                    │                     │
│  └──────────────────────────────────────┘                     │
│                          ↓                                      │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    MESSAGE BROADCASTING                         │
│                                                                 │
│  chrome.tabs.query({}, (tabs) => {                            │
│    tabs.forEach(tab => {                                      │
│      chrome.tabs.sendMessage(tab.id, {                        │
│        action: 'themeChanged',                                │
│        theme: 'dark'                                          │
│      })                                                       │
│    })                                                         │
│  })                                                           │
│                          ↓                                      │
└─────────────────────────────────────────────────────────────────┘
        ↓                    ↓                    ↓
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   TAB 1      │    │   TAB 2      │    │   TAB 3      │
│ (content.js) │    │ (content.js) │    │ (content.js) │
└──────────────┘    └──────────────┘    └──────────────┘
        ↓                    ↓                    ↓
┌─────────────────────────────────────────────────────────────────┐
│              CONTENT.JS (Message Listener)                      │
│                                                                 │
│  chrome.runtime.onMessage.addListener((request) => {           │
│    if (request.action === 'themeChanged') {                    │
│      applySidebarTheme(request.theme)                         │
│    }                                                           │
│  })                                                           │
│                          ↓                                      │
│  applySidebarTheme(theme)                                     │
│    ├─ Find sidebar element                                    │
│    └─ Add/remove 'logicheck-dark' class                      │
│                          ↓                                      │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    CSS VARIABLES APPLY                          │
│                                                                 │
│  Light Mode:                   Dark Mode:                      │
│  ┌─────────────────┐          ┌─────────────────┐            │
│  │ .logicheck-     │          │ .logicheck-dark │            │
│  │ sidebar         │          │ .logicheck-     │            │
│  │                 │          │ sidebar         │            │
│  │ --bg: #fff      │          │ --bg: #1f2937   │            │
│  │ --text: #1a202c │          │ --text: #f3f4f6 │            │
│  └─────────────────┘          └─────────────────┘            │
│                          ↓                                      │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                      VISUAL RESULT                              │
│                                                                 │
│  ┌─────────────────────────────────────────────┐              │
│  │  POPUP           All Sidebars               │              │
│  │  ┌──────┐        ┌──────┐ ┌──────┐          │              │
│  │  │ 🌙   │        │      │ │      │          │              │
│  │  │ DARK │  ═══>  │ DARK │ │ DARK │          │              │
│  │  │ MODE │        │ MODE │ │ MODE │          │              │
│  │  └──────┘        └──────┘ └──────┘          │              │
│  │                  Tab 1    Tab 2             │              │
│  └─────────────────────────────────────────────┘              │
│                                                                 │
│  All UI elements updated simultaneously! ✨                    │
└─────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════
                      DATA FLOW SUMMARY
═══════════════════════════════════════════════════════════════════

1. USER CLICKS → popup.js
2. popup.js → chrome.storage (save preference)
3. popup.js → Broadcast to all tabs
4. All content.js → Receive message
5. All content.js → Update sidebar theme
6. CSS Variables → Visual update

═══════════════════════════════════════════════════════════════════
                    PERSISTENCE FLOW
═══════════════════════════════════════════════════════════════════

┌─────────────────┐
│ User sets theme │
│   to 'dark'     │
└────────┬────────┘
         │
         ↓
┌─────────────────────────┐
│ chrome.storage.sync     │
│ .set({ theme: 'dark' }) │
└────────┬────────────────┘
         │
         ↓
┌───────────────────────────┐
│ Saved to cloud storage    │
│ (synced across devices)   │
└────────┬──────────────────┘
         │
         ↓
┌─────────────────────────────┐
│ User closes browser         │
│ User reopens browser        │
└────────┬────────────────────┘
         │
         ↓
┌─────────────────────────────┐
│ popup.js → initTheme()      │
│ chrome.storage.sync.get()   │
└────────┬────────────────────┘
         │
         ↓
┌─────────────────────────────┐
│ Theme 'dark' retrieved      │
│ Applied automatically ✅    │
└─────────────────────────────┘


═══════════════════════════════════════════════════════════════════
                   COMPONENT INTERACTIONS
═══════════════════════════════════════════════════════════════════

┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│              │         │              │         │              │
│  POPUP.HTML  │◄───────►│  POPUP.JS    │◄───────►│ STORAGE API  │
│              │         │              │         │              │
│  - UI        │         │  - Logic     │         │  - Persist   │
│  - Button    │         │  - Toggle    │         │  - Sync      │
│  - Icons     │         │  - Broadcast │         │              │
│              │         │              │         │              │
└──────────────┘         └──────┬───────┘         └──────────────┘
                                │
                                │ sendMessage()
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ↓                       ↓
            ┌──────────────┐        ┌──────────────┐
            │              │        │              │
            │ CONTENT.JS   │        │ CONTENT.JS   │
            │  (Tab 1)     │        │  (Tab 2)     │
            │              │        │              │
            │  - Listen    │        │  - Listen    │
            │  - Apply     │        │  - Apply     │
            │  - Sidebar   │        │  - Sidebar   │
            │              │        │              │
            └──────────────┘        └──────────────┘


═══════════════════════════════════════════════════════════════════
                      KEY FUNCTIONS
═══════════════════════════════════════════════════════════════════

POPUP.JS:
├── initTheme()          → Load saved theme on popup open
├── applyTheme(theme)    → Apply theme and broadcast
└── toggleTheme()        → Switch between light/dark

CONTENT.JS:
├── applySidebarTheme(theme)  → Apply theme to sidebar
├── showSidebar(data)         → Show sidebar with theme
└── Message Listener          → Listen for theme changes

STORAGE:
├── chrome.storage.sync.set() → Save theme preference
└── chrome.storage.sync.get() → Load theme preference


═══════════════════════════════════════════════════════════════════
                    CSS CLASS STRUCTURE
═══════════════════════════════════════════════════════════════════

POPUP:
<html class="dark">                    // Added/removed by JS
  <body>
    <div class="container">
      <!-- CSS variables automatically change -->
    </div>
  </body>
</html>

SIDEBAR:
<div id="logicheck-sidebar-root">
  <div class="logicheck-sidebar logicheck-dark">  // Class toggled
    <!-- CSS variables automatically change -->
  </div>
</div>


═══════════════════════════════════════════════════════════════════

This architecture ensures:
✅ Real-time synchronization
✅ Persistent theme preference
✅ No page refresh needed
✅ Smooth transitions
✅ Cross-tab consistency

═══════════════════════════════════════════════════════════════════
```
