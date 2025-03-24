import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

// Create a functional component for the Header
const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };

  const handleLanguageChange = (lang: 'en' | 'es' | 'fr' | 'de' | 'zh') => {
    setLanguage(lang);
    setLanguageMenuOpen(false);
  };

  const navigationItems = [
    { name: t('header', 'home'), path: '/' },
    { name: t('header', 'features'), path: '/features' },
    { name: t('header', 'pricing'), path: '/pricing' },
    { name: t('header', 'contact'), path: '/contact' },
    { name: 'Blog', path: '/blog' }, // Add the new Blog link
  ];

  const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-finance-600 to-finance-800 bg-clip-text text-transparent">
                FinCalc
              </span>
            </Link>
          </div>

          {/* Navigation for desktop */}
          <nav className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium ${
                  location.pathname === item.path
                    ? 'text-finance-600'
                    : 'text-gray-500 hover:text-finance-600'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Language selector */}
            <div className="relative ml-2">
              <button
                type="button"
                className="flex items-center text-sm font-medium text-gray-500 hover:text-finance-600"
                onClick={toggleLanguageMenu}
              >
                {languageOptions.find(lang => lang.code === language)?.name}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code as any)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        language === lang.code
                          ? 'bg-gray-100 text-finance-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth buttons */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  className="flex items-center text-gray-500 hover:text-finance-600"
                  onClick={handleSignOut}
                >
                  <User className="h-4 w-4 mr-1" />
                  {user.email?.split('@')[0]}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/auth">
                  <Button
                    variant="ghost"
                    className="text-gray-500 hover:text-finance-600"
                  >
                    {t('auth', 'signIn')}
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-finance-600 hover:bg-finance-700 text-white">
                    {t('header', 'startFreeTrial')}
                  </Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-finance-600"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 text-base font-medium ${
                  location.pathname === item.path
                    ? 'text-finance-600'
                    : 'text-gray-500 hover:text-finance-600'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Language options for mobile */}
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-gray-500 mb-2">Language</p>
              <div className="grid grid-cols-2 gap-2">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as any)}
                    className={`text-left px-2 py-1 text-sm rounded ${
                      language === lang.code
                        ? 'bg-gray-100 text-finance-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Auth buttons for mobile */}
            <div className="px-3 py-2 space-y-2">
              {user ? (
                <>
                  <div className="flex items-center px-2 py-1 text-sm font-medium text-gray-700">
                    <User className="h-4 w-4 mr-1" />
                    {user.email?.split('@')[0]}
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth" className="block w-full" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      {t('auth', 'signIn')}
                    </Button>
                  </Link>
                  <Link to="/auth" className="block w-full" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      className="w-full bg-finance-600 hover:bg-finance-700 text-white"
                    >
                      {t('header', 'startFreeTrial')}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
