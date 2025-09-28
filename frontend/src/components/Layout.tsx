import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className="font-semibold text-xl text-gray-900">
                  {t('app.title')}
                </span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link 
                  to="/jobs" 
                  className="text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200"
                >
                  {t('nav.jobs')}
                </Link>
                {isAuthenticated && (
                  <Link 
                    to="/create-job" 
                    className="text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200"
                  >
                    Create Job
                  </Link>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => changeLanguage('en')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    i18n.language === 'en' 
                      ? 'bg-primary-100 text-primary-700 border border-primary-200' 
                      : 'text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  EN
                </button>
                <button 
                  onClick={() => changeLanguage('ar')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    i18n.language === 'ar' 
                      ? 'bg-primary-100 text-primary-700 border border-primary-200' 
                      : 'text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  AR
                </button>
              </div>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 hidden sm:block">
                    Welcome, <span className="font-medium text-gray-900">{user?.username}</span>
                  </span>
                  <button 
                    onClick={logout}
                    className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                  >
                    {t('nav.logout')}
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="btn-primary"
                >
                  {t('nav.login')}
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Hamediah. All rights reserved.</p>
            <p className="mt-1">Building the future of work in the Middle East.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;