import { Link, useLocation } from 'react-router-dom';
import { Brain, Home, Gamepad2, FileText, Menu, X, Settings, Puzzle, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Layout = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const navigation = [
    { name: t('nav.home'), path: '/', icon: Home },
    { name: t('nav.analyzer'), path: '/analyzer', icon: Brain },
    { name: t('nav.dojo'), path: '/dojo', icon: Gamepad2 },
    { name: t('nav.essayClinic'), path: '/essay-clinic', icon: FileText },
    { name: t('nav.extension'), path: '/extension', icon: Puzzle },
    { name: t('nav.settings'), path: '/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
              <img 
                src="/logo-logicheck.png" 
                alt="LogiCheck Logo" 
                className="w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-110 transition-transform"
              />
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-cyan-300 dark:to-purple-300 bg-clip-text text-transparent ml-1">
                LogiCheck
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1 flex-shrink-0">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 xl:px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                      isActive(item.path)
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm xl:text-base">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Theme Toggle & Mobile menu button */}
            <div className="flex items-center space-x-2">
              {/* Language Switcher */}
              <LanguageSwitcher variant="toggle" />
              
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
                aria-label={theme === 'light' ? t('settings.theme.dark') : t('settings.theme.light')}
                title={theme === 'light' ? t('settings.theme.dark') : t('settings.theme.light')}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden pb-4 animate-fade-in border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all my-1 ${
                      isActive(item.path)
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p className="text-sm">
              © 2025 LogiCheck. {t('home.subtitle')}
            </p>
            <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
              {t('home.description')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
