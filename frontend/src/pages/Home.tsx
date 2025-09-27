import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-16">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            {t('index.headline')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('index.tagline')}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/jobs" 
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {t('index.cta.explore')}
          </Link>
          <Link 
            to="/login" 
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors duration-200"
          >
            Post a Job
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Job Posting</h3>
          <p className="text-gray-600">Create and publish job listings with our intuitive interface. Manage applications effortlessly.</p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Reach</h3>
          <p className="text-gray-600">Connect with talent worldwide. Support for English and Arabic with RTL layout support.</p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Modern Platform</h3>
          <p className="text-gray-600">Built with the latest technology for a fast, secure, and reliable experience.</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white p-12 text-center">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl font-bold mb-2">1000+</div>
            <div className="text-blue-100">Active Jobs</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-blue-100">Companies</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">5000+</div>
            <div className="text-blue-100">Job Seekers</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;