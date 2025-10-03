import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from './ui/Button';
import { Briefcase, Plus, LogOut, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo and Navigation Links */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2 text-lg font-bold group">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-primary-600 text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <span className="text-gray-900">{t('app.title')}</span>
              </Link>
              
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link 
                    to="/jobs" 
                    className={`flex items-center gap-2 font-semibold transition-all duration-200 ${isActivePath('/jobs') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} px-4 py-2 rounded-xl`}
                  >
                    <Briefcase className="w-4 h-4" />
                    {t('nav.jobs')}
                  </Link>
                </Button>
                
                {isAuthenticated && (
                  <Button variant="ghost" asChild>
                    <Link 
                      to="/create-job" 
                      className={`flex items-center gap-2 font-semibold transition-all duration-200 ${isActivePath('/create-job') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} px-4 py-2 rounded-xl`}
                    >
                      <Plus className="w-4 h-4" />
                      {t('nav.createJob')}
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-4">
              {/* Language switcher */}
              <LanguageSwitcher />

              {/* User authentication */}
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                    <div className="w-6 h-6 rounded flex items-center justify-center bg-primary-600 text-white">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {user?.username}
                    </span>
                  </div>
                  <Button 
                    variant="secondary"
                    size="sm"
                    onClick={logout}
                    className="flex items-center gap-2 rounded-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('nav.logout')}</span>
                  </Button>
                </div>
              ) : (
                <Button asChild className="rounded-lg">
                  <Link to="/login" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {t('nav.login')}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4">
        {children}
      </main>

      <footer className="bg-gradient-to-br from-gray-50 to-white border-t border-gray-200/50 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary-600">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">{t('app.title')}</span>
              </div>
              <p className="text-gray-600 mb-6 max-w-md text-sm leading-relaxed">
                {t('index.tagline')}
              </p>
              <div className="flex gap-2">
                <a href="#" className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">{t('footer.quickLinks')}</h4>
              <ul className="space-y-2">
                <li><Link to="/jobs" className="text-gray-600 hover:text-primary-600 transition-colors">{t('footer.browseJobs')}</Link></li>
                <li><Link to="/login" className="text-gray-600 hover:text-primary-600 transition-colors">{t('footer.signIn')}</Link></li>
                <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">{t('footer.helpCenter')}</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">{t('footer.contactUs')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">{t('footer.company')}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">{t('footer.aboutUs')}</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">{t('footer.privacyPolicy')}</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">{t('footer.termsOfService')}</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">{t('footer.careers')}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Hamediah. {t('footer.copyright')}
            </p>
            <p className="text-gray-500 text-sm mt-2 md:mt-0">
              {t('footer.madeWith')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;