/**
 * Extension Popup Internationalization
 * Simplified translations for extension popup
 */

const translations = {
  en: {
    title: 'LogiCheck Lens',
    subtitle: 'Analyze content on any webpage',
    instructions: 'Select text on any webpage, then:',
    method1: 'Right-click → "Analyze with LogiCheck"',
    method2: 'Press Ctrl+Shift+L',
    openWebApp: 'Open Web App',
    settings: 'Settings',
    apiKeyConfigured: 'API Key: Configured ✓',
    apiKeyNotConfigured: 'API Key: Not Configured',
    configureApiKey: 'Configure API Key',
    language: 'Language',
    themeToggle: 'Toggle Theme',
  },
  id: {
    title: 'LogiCheck Lens',
    subtitle: 'Analisis konten di halaman web mana pun',
    instructions: 'Pilih teks di halaman web mana pun, lalu:',
    method1: 'Klik kanan → "Analisis dengan LogiCheck"',
    method2: 'Tekan Ctrl+Shift+L',
    openWebApp: 'Buka Aplikasi Web',
    settings: 'Pengaturan',
    apiKeyConfigured: 'API Key: Terkonfigurasi ✓',
    apiKeyNotConfigured: 'API Key: Belum Terkonfigurasi',
    configureApiKey: 'Konfigurasi API Key',
    language: 'Bahasa',
    themeToggle: 'Ganti Tema',
  }
};

// Context menu translations
const contextMenuTranslations = {
  en: 'Analyze with LogiCheck',
  id: 'Analisis dengan LogiCheck'
};

/**
 * Get translation for a specific key
 * @param {string} language - 'en' or 'id'
 * @param {string} key - Translation key
 * @returns {string} Translated text
 */
function t(language, key) {
  return translations[language]?.[key] || translations.en[key] || key;
}

/**
 * Get context menu translation
 * @param {string} language - 'en' or 'id'
 * @returns {string} Context menu text
 */
function getContextMenuText(language) {
  return contextMenuTranslations[language] || contextMenuTranslations.en;
}

// Export for use in extension
if (typeof window !== 'undefined') {
  window.ExtensionI18n = { t, getContextMenuText, translations };
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { t, getContextMenuText, translations };
}
