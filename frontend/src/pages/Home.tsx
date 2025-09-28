import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[80vh] flex items-center">
      <div className="w-full">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              <span className="block">{t('index.headline')}</span>
              <span className="block bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                Opportunities
              </span>
            </h1>
          </div>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('index.tagline')} Connect with top employers across the region and build your career.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              to="/jobs" 
              className="btn-primary text-lg px-8 py-4 min-w-[200px] shadow-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              {t('index.cta.explore')}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/login"
              className="btn-secondary text-lg px-8 py-4 min-w-[200px] hover:shadow-medium transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Post a Job
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Job Search</h3>
            <p className="text-gray-600 leading-relaxed">Find relevant opportunities with our intelligent matching system and advanced search filters.</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Top Companies</h3>
            <p className="text-gray-600 leading-relaxed">Connect with leading employers and startups across the Middle East and beyond.</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Reach</h3>
            <p className="text-gray-600 leading-relaxed">Access opportunities worldwide with bilingual support in English and Arabic.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;