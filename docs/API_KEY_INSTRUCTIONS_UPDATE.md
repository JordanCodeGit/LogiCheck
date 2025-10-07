# API Key Instructions Update

## Overview
Updated Settings page dengan menghapus info box di atas dan menambahkan **dropdown accordion** dengan instruksi lengkap cara mendapatkan API key di dalam section "Optimal Performance".

## Changes Made

### ❌ Removed
- Info box berwarna biru di atas halaman settings
- Text: "Get your own API key for better performance"
- Direct link di luar kotak Optimal Performance

### ✅ Added
**Interactive Dropdown/Accordion** di dalam kotak "Optimal Performance - Your Own API Key":

#### Dropdown Button:
- Text: "📝 How to Get Your Free API Key"
- Icon: ChevronDown/ChevronUp (toggle)
- Style: Indigo background dengan hover effect
- Full-width button

#### Dropdown Content (when opened):
**Step-by-Step Guide dengan 6 langkah:**

1. **Visit Google AI Studio**
   - Link: https://aistudio.google.com/app/apikey
   - Icon: ExternalLink

2. **Sign in with your Google Account**
   - Description: Use any Google account (Gmail, Workspace, etc.)

3. **Click "Create API Key" button**
   - Description: You'll see it in the main page after signing in

4. **Select or Create a Google Cloud Project**
   - Description: You can create a new project or use an existing one

5. **Copy your API Key**
   - Description: It starts with "AIza..." - Click the copy button

6. **Paste the key in the field below**
   - Description: Then click "Save API Key" to start using LogiCheck!

#### Visual Features:
- ✅ Numbered circles (1-6) dengan background indigo
- ✅ Each step has title dan description
- ✅ Link dengan ExternalLink icon
- ✅ Fade-in animation saat dibuka
- ✅ Green box di bawah: "Free Tier: Google provides generous free quotas..."

## User Experience Flow

### Before:
```
[Header]
  ↓
[Blue Info Box - Get API Key link] ← Terpisah dari section
  ↓
[Quick Start - Shared Keys]
  ↓
[Optimal Performance]
  └─ Input field
```

### After:
```
[Header]
  ↓
[Quick Start - Shared Keys]
  ↓
[Optimal Performance]
  ├─ [📝 How to Get Your Free API Key] ← Dropdown button
  │   └─ [Step-by-step guide] ← Expandable content
  └─ Input field
```

## Benefits

1. **Better Organization**: Instruksi sekarang ada DI DALAM section yang relevan
2. **Cleaner Interface**: Less clutter di atas, lebih organized
3. **Progressive Disclosure**: User hanya lihat instruksi kalau mereka butuh
4. **Comprehensive Guide**: 6 langkah detail dengan visual numbering
5. **Dark Mode Support**: Full support untuk dark mode
6. **Interactive**: Smooth animation dan clear visual feedback

## Technical Implementation

### New State:
```javascript
const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
```

### New Icons:
```javascript
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
```

### Styling:
- Numbered circles: `bg-indigo-500 text-white rounded-full`
- Dropdown button: `bg-indigo-100 dark:bg-indigo-900/30`
- Content box: `bg-white dark:bg-gray-800`
- Animation: `animate-fade-in`

## Files Modified

1. **client/src/components/ApiKeySettings.jsx**
   - Removed blue info box
   - Added isInstructionsOpen state
   - Added dropdown accordion with full instructions
   - Added ChevronDown, ChevronUp, ExternalLink icons

## Visual Elements

### Dropdown Closed:
```
┌─────────────────────────────────────────┐
│ ⚡ Optimal Performance - Your Own API Key│
├─────────────────────────────────────────┤
│ For faster and more reliable...         │
│                                          │
│ ┌─────────────────────────────────────┐ │
│ │ 📝 How to Get Your Free API Key   ▼ │ │ ← Clickable
│ └─────────────────────────────────────┘ │
│                                          │
│ Gemini API Key                           │
│ [Input field...]                         │
└─────────────────────────────────────────┘
```

### Dropdown Open:
```
┌─────────────────────────────────────────┐
│ ⚡ Optimal Performance - Your Own API Key│
├─────────────────────────────────────────┤
│ For faster and more reliable...         │
│                                          │
│ ┌─────────────────────────────────────┐ │
│ │ 📝 How to Get Your Free API Key   ▲ │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ 🔑 Step-by-Step Guide:              │ │
│ │                                     │ │
│ │ ① Visit Google AI Studio           │ │
│ │   aistudio.google.com/app/apikey 🔗│ │
│ │                                     │ │
│ │ ② Sign in with your Google Account │ │
│ │   Use any Google account...        │ │
│ │                                     │ │
│ │ ... (steps 3-6)                    │ │
│ │                                     │ │
│ │ ✅ Free Tier: Google provides...   │ │
│ └─────────────────────────────────────┘ │
│                                          │
│ Gemini API Key                           │
│ [Input field...]                         │
└─────────────────────────────────────────┘
```

## Accessibility

- ✅ Keyboard accessible (button can be focused and activated)
- ✅ Clear visual states (open/closed)
- ✅ Semantic HTML (ol for ordered list)
- ✅ Color contrast compliant
- ✅ Screen reader friendly

## Performance

- Lightweight: No external dependencies
- Fast: Smooth CSS transitions
- Efficient: Only renders when opened
- Responsive: Works on all screen sizes
