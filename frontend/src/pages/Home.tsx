import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen -mt-4 -mx-4">
      {/* Hero Section */}
      <section className="hero-section relative py-24 px-4 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute top-32 right-20 w-96 h-96 bg-red-300 opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-300 opacity-10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            {t('index.headline')}
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up opacity-90">
            {t('index.tagline')}
          </p>
          
          {/* Modern Search Bar */}
          <div className="max-w-4xl mx-auto mb-12 animate-bounce-in">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Job title, keywords, or company"
                    className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                  <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Location"
                    className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                  <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <button className="btn-primary py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Jobs
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in">
            <Link 
              to="/jobs" 
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {t('index.cta.explore')}
            </Link>
            <Link 
              to="/login" 
              className="btn-secondary text-lg px-8 py-4 bg-white/20 border-white/30 text-white hover:bg-white/30 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {t('nav.login')}
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Job Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore opportunities in the most in-demand fields
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="card card-hover p-6 text-center bg-white">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{background: 'var(--gradient-primary)'}}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Technology</h3>
              <p className="text-sm text-gray-600">1,234 jobs</p>
            </div>
            
            <div className="card card-hover p-6 text-center bg-white">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Finance</h3>
              <p className="text-sm text-gray-600">892 jobs</p>
            </div>
            
            <div className="card card-hover p-6 text-center bg-white">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Healthcare</h3>
              <p className="text-sm text-gray-600">756 jobs</p>
            </div>
            
            <div className="card card-hover p-6 text-center bg-white">
              <div className="w-12 h-12 bg-rose-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Education</h3>
              <p className="text-sm text-gray-600">543 jobs</p>
            </div>
            
            <div className="card card-hover p-6 text-center bg-white">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Marketing</h3>
              <p className="text-sm text-gray-600">432 jobs</p>
            </div>
            
            <div className="card card-hover p-6 text-center bg-white">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Engineering</h3>
              <p className="text-sm text-gray-600">678 jobs</p>
            </div>
            
            <div className="card card-hover p-6 text-center bg-white">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Design</h3>
              <p className="text-sm text-gray-600">321 jobs</p>
            </div>
            
            <div className="card card-hover p-6 text-center bg-white">
              <div className="w-12 h-12 bg-rose-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sales</h3>
              <p className="text-sm text-gray-600">567 jobs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Hamediah Jobs?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your gateway to exciting career opportunities with bilingual support
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card card-hover card-premium p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Bilingual Support</h3>
              <p className="text-gray-600">Search and apply for jobs in both English and Arabic with full RTL support</p>
              <div className="mt-4 inline-flex items-center text-green-600 font-medium">
                Learn more 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            
            <div className="card card-hover p-8 text-center border-2 border-red-200 bg-gradient-to-br from-red-50 to-rose-50">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Fast & Easy</h3>
              <p className="text-gray-600">Quick job search with powerful filtering and instant results</p>
              <div className="mt-4 inline-flex items-center text-red-600 font-medium">
                Learn more 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            
            <div className="card card-hover card-premium p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Quality Jobs</h3>
              <p className="text-gray-600">Curated job listings from trusted employers and companies</p>
              <div className="mt-4 inline-flex items-center text-green-600 font-medium">
                Learn more 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{color: 'var(--primary-green)'}}>1000+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{color: 'var(--secondary-red)'}}>500+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{color: 'var(--accent-emerald)'}}>10k+</div>
              <div className="text-gray-600">Job Seekers</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{color: 'var(--secondary-red-dark)'}}>95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how our platform helped professionals find their dream jobs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card card-hover p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold text-lg">SA</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Ahmed</h4>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "I found my dream job in tech within just 2 weeks. The bilingual support made everything so much easier!"
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="card card-hover p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-red-600 font-bold text-lg">MH</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Mohammed Hassan</h4>
                  <p className="text-sm text-gray-500">Marketing Manager</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The platform connected me with amazing opportunities. The search filters are incredibly precise!"
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="card card-hover p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-emerald-600 font-bold text-lg">LK</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Layla Khalil</h4>
                  <p className="text-sm text-gray-500">UX Designer</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Professional, fast, and user-friendly. I got multiple interview invitations in my first week!"
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-white" style={{background: 'var(--gradient-primary)'}}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Dream Job?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of job seekers who found their perfect match through Hamediah Jobs
          </p>
          <Link 
            to="/jobs" 
            className="btn-primary bg-white hover:bg-gray-100 text-lg px-8 py-4 inline-flex items-center gap-2"
            style={{color: 'var(--primary-green)'}}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Start Your Search Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;