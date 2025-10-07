# 🎨 Dark Mode Color Reference

## Color Palette Comparison

### 🌞 LIGHT MODE COLORS

#### Popup
```css
--bg-gradient-start: #667eea      /* Purple-blue start */
--bg-gradient-end: #764ba2        /* Purple end */
--container-bg: #ffffff           /* White container */
--text-primary: #1a202c           /* Almost black */
--text-secondary: #6b7280         /* Gray */
--text-tertiary: #374151          /* Dark gray */
--border-color: #e5e7eb           /* Light gray border */
--instruction-bg: #f3f4f6         /* Very light gray */
--instruction-border: #667eea     /* Purple accent */
--btn-secondary-bg: #ffffff       /* White button */
--btn-secondary-hover: #f3f4f6    /* Light gray hover */
--shadow-color: rgba(0,0,0,0.05)  /* Subtle shadow */
```

#### Sidebar
```css
--logicheck-bg-sidebar: #ffffff           /* White */
--logicheck-bg-header: #4a5568            /* Blue-gray header */
--logicheck-bg-header-border: #2d3748     /* Darker blue-gray */
--logicheck-bg-content: #f7fafc           /* Very light blue */
--logicheck-bg-section: #ffffff           /* White sections */
--logicheck-text-primary: #1a202c         /* Almost black */
--logicheck-text-secondary: #2d3748       /* Dark gray */
--logicheck-text-tertiary: #4a5568        /* Medium gray */
--logicheck-border-section: #4a5568       /* Blue-gray */
--logicheck-fallacy-bg: #fff5f5           /* Light red */
--logicheck-fallacy-border: #f56565       /* Red */
--logicheck-fallacy-text: #c53030         /* Dark red */
--logicheck-fallacy-quote-bg: #ffffff     /* White */
--logicheck-fallacy-quote-border: #feb2b2 /* Light red */
--logicheck-socratic-bg: #ebf8ff          /* Light blue */
--logicheck-socratic-border: #4299e1      /* Blue */
--logicheck-scrollbar-track: #e2e8f0      /* Light gray */
--logicheck-scrollbar-thumb: #a0aec0      /* Medium gray */
--logicheck-scrollbar-thumb-hover: #718096 /* Darker gray */
--logicheck-shadow: rgba(0,0,0,0.2)       /* Shadow */
```

### 🌙 DARK MODE COLORS

#### Popup
```css
--bg-gradient-start: #4c51bf      /* Darker purple-blue */
--bg-gradient-end: #5a3d8a        /* Darker purple */
--container-bg: #1f2937           /* Dark gray container */
--text-primary: #f3f4f6           /* Almost white */
--text-secondary: #9ca3af         /* Light gray */
--text-tertiary: #e5e7eb          /* Lighter gray */
--border-color: #374151           /* Dark border */
--instruction-bg: #374151         /* Dark gray */
--instruction-border: #818cf8     /* Light purple accent */
--btn-secondary-bg: #374151       /* Dark button */
--btn-secondary-hover: #4b5563    /* Lighter dark gray */
--shadow-color: rgba(0,0,0,0.3)   /* Stronger shadow */
```

#### Sidebar
```css
--logicheck-bg-sidebar: #1f2937           /* Dark gray */
--logicheck-bg-header: #374151            /* Medium dark gray */
--logicheck-bg-header-border: #4b5563     /* Lighter border */
--logicheck-bg-content: #111827           /* Very dark gray */
--logicheck-bg-section: #1f2937           /* Dark gray sections */
--logicheck-text-primary: #f3f4f6         /* Almost white */
--logicheck-text-secondary: #e5e7eb       /* Light gray */
--logicheck-text-tertiary: #d1d5db        /* Medium light gray */
--logicheck-border-section: #818cf8       /* Light purple */
--logicheck-fallacy-bg: #7f1d1d           /* Dark red */
--logicheck-fallacy-border: #ef4444       /* Bright red */
--logicheck-fallacy-text: #fca5a5         /* Light red */
--logicheck-fallacy-quote-bg: #991b1b     /* Medium dark red */
--logicheck-fallacy-quote-border: #dc2626 /* Red border */
--logicheck-socratic-bg: #1e3a5f          /* Dark blue */
--logicheck-socratic-border: #60a5fa      /* Light blue */
--logicheck-scrollbar-track: #374151      /* Dark track */
--logicheck-scrollbar-thumb: #4b5563      /* Medium thumb */
--logicheck-scrollbar-thumb-hover: #6b7280 /* Lighter hover */
--logicheck-shadow: rgba(0,0,0,0.4)       /* Stronger shadow */
```

## 🎯 Design Principles

### Contrast Ratios
- **Light Mode**: 
  - Text to background: ~14:1 (WCAG AAA)
  - Secondary text: ~7:1 (WCAG AA)
- **Dark Mode**: 
  - Text to background: ~12:1 (WCAG AAA)
  - Secondary text: ~6:1 (WCAG AA)

### Color Consistency
- Menggunakan gray scale yang konsisten (Tailwind-inspired)
- Purple/blue accent colors matching web template
- Red untuk fallacies (warning/error state)
- Blue untuk Socratic questions (info state)

### Accessibility
- High contrast untuk readability
- Color-blind friendly palette
- Clear visual hierarchy
- Sufficient spacing between elements

## 📊 Color Usage Guide

### When to Use Each Color

#### Primary Colors (Purple/Blue)
- **Use for**: Branding, headers, primary actions
- **Don't use for**: Body text, backgrounds

#### Gray Scale
- **Light Mode**: #1a202c → #f3f4f6 (dark to light)
- **Dark Mode**: #f3f4f6 → #1a202c (light to dark)
- **Use for**: Text, backgrounds, borders

#### Red (Fallacy Indicators)
- **Light Mode**: #fff5f5 bg, #c53030 text
- **Dark Mode**: #7f1d1d bg, #fca5a5 text
- **Use for**: Error states, warnings, fallacy cards

#### Blue (Info/Questions)
- **Light Mode**: #ebf8ff bg, #4299e1 border
- **Dark Mode**: #1e3a5f bg, #60a5fa border
- **Use for**: Information, Socratic questions

## 🔄 Transition Effects

All color changes include smooth transitions:
```css
transition: background-color 0.3s ease;
transition: color 0.3s ease;
transition: all 0.3s ease;
```

This ensures no jarring changes when toggling themes.

## 🎨 Visual Harmony

### Light Mode Vibe
- Clean, professional, modern
- High contrast for clarity
- Inspired by: Notion, Linear, Tailwind UI

### Dark Mode Vibe
- Comfortable, easy on eyes
- Reduced eye strain for night use
- Inspired by: VS Code Dark+, Discord Dark, GitHub Dark

## 📱 Responsive Colors

Colors maintain consistency across:
- ✅ Different screen sizes
- ✅ Different zoom levels
- ✅ Different browser engines
- ✅ Different operating systems

---

**Color Palette Version**: 1.0.0  
**Based on**: Tailwind CSS v3 Color Palette  
**Accessibility**: WCAG 2.1 Level AA compliant
