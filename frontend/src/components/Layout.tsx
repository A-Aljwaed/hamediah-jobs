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
    <div className="min-h-screen bg-gray-50 text-gray-900" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-semibold text-lg">
              {t('app.title')}
            </Link>
            <Link 
              to="/jobs" 
              className="text-sm text-gray-700 hover:text-black"
            >
              {t('nav.jobs')}
            </Link>
            {isAuthenticated && (
              <Link 
                to="/create-job" 
                className="text-sm text-gray-700 hover:text-black"
              >
                Create Job
              </Link>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => changeLanguage('en')}
              className={`text-xs px-2 py-1 border rounded ${i18n.language === 'en' ? 'bg-gray-100' : ''}`}
            >
              EN
            </button>
            <button 
              onClick={() => changeLanguage('ar')}
              className={`text-xs px-2 py-1 border rounded ${i18n.language === 'ar' ? 'bg-gray-100' : ''}`}
            >
              AR
            </button>
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Welcome, {user?.username}</span>
                <button 
                  onClick={logout}
                  className="text-sm text-gray-700 hover:text-black"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="text-sm text-gray-700 hover:text-black"
              >
                {t('nav.login')}
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto p-4">
        {children}
      </main>
      <footer className="max-w-6xl mx-auto p-4 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Hamediah.</p>
      </footer>
    </div>
  );
};

export default Layout;