import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Icon } from '../components/ui/Icon';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen -mt-4 -mx-4">
      {/* Hero Section with Modern Gradient */}
      <section className="hero-section relative py-20 px-4 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-95"></div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            {t('index.headline')}
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up opacity-90">
            {t('index.tagline')}
          </p>

          <div className="max-w-4xl mx-auto mb-8 animate-scale-in">
            <Card className="card-glass border-white/20" padding="lg">
              <form className="grid md:grid-cols-3 gap-3" action="/jobs" method="get">
                <Input
                  name="q"
                  placeholder="Job title, keywords, or company"
                  className="bg-white/95 backdrop-blur-sm border-white/40 focus:ring-white/60 focus:bg-white"
                  leftIcon="search"
                  aria-label="Job title or keywords"
                />
                <Input
                  name="location"
                  placeholder="Location"
                  className="bg-white/95 backdrop-blur-sm border-white/40 focus:ring-white/60 focus:bg-white"
                  leftIcon="location"
                  aria-label="Job location"
                />
                <Button 
                  type="submit"
                  variant="secondary" 
                  className="bg-white/90 hover:bg-white border-white/40 text-gray-900 font-semibold"
                >
                  <Icon name="search" size="16" className="mr-2" aria-hidden="true" />
                  Search Jobs
                </Button>
              </form>
            </Card>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-bounce-in">
            <Button asChild size="default" className="px-6 py-3">
              <Link to="/jobs">
                <Icon name="search" size="16" className="mr-2" aria-hidden="true" />
                {t('index.cta.explore')}
              </Link>
            </Button>
            <Button 
              asChild 
              variant="secondary" 
              size="default" 
              className="px-6 py-3 bg-white/90 backdrop-blur-md border-white/40 text-gray-900 font-semibold hover:bg-white"
            >
              <Link to="/login">
                <Icon name="user" size="16" className="mr-2" aria-hidden="true" />
                {t('nav.login')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 animate-fade-in">
              Popular Job Categories
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Explore opportunities in the most in-demand fields
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              to="/jobs?category=technology" 
              className="card p-5 text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
              aria-label="View Technology jobs, 1234 positions available"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3 bg-gray-100 text-gray-600 transition-all duration-200">
                <Icon name="desktop" size="16" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-base">Technology</h3>
              <p className="text-sm text-gray-500">1,234 jobs</p>
            </Link>
            
            <Link 
              to="/jobs?category=finance" 
              className="card p-5 text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
              aria-label="View Finance jobs, 892 positions available"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3 bg-gray-100 text-gray-600 transition-all duration-200">
                <Icon name="building" size="16" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-base">Finance</h3>
              <p className="text-sm text-gray-500">892 jobs</p>
            </Link>
            
            <Link 
              to="/jobs?category=healthcare" 
              className="card p-5 text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
              aria-label="View Healthcare jobs, 756 positions available"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3 bg-gray-100 text-gray-600 transition-all duration-200">
                <Icon name="heart" size="16" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-base">Healthcare</h3>
              <p className="text-sm text-gray-500">756 jobs</p>
            </Link>
            
            <Link 
              to="/jobs?category=education" 
              className="card p-5 text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
              aria-label="View Education jobs, 543 positions available"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3 bg-gray-100 text-gray-600 transition-all duration-200">
                <Icon name="book" size="16" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-base">Education</h3>
              <p className="text-sm text-gray-500">543 jobs</p>
            </Link>
            
            <Link 
              to="/jobs?category=marketing" 
              className="card p-5 text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
              aria-label="View Marketing jobs, 432 positions available"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3 bg-gray-100 text-gray-600 transition-all duration-200">
                <Icon name="chart-bar" size="16" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-base">Marketing</h3>
              <p className="text-sm text-gray-500">432 jobs</p>
            </Link>
            
            <Link 
              to="/jobs?category=engineering" 
              className="card p-5 text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
              aria-label="View Engineering jobs, 678 positions available"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3 bg-gray-100 text-gray-600 transition-all duration-200">
                <Icon name="bolt" size="16" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-base">Engineering</h3>
              <p className="text-sm text-gray-500">678 jobs</p>
            </Link>
            
            <Link 
              to="/jobs?category=design" 
              className="card p-5 text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
              aria-label="View Design jobs, 321 positions available"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3 bg-gray-100 text-gray-600 transition-all duration-200">
                <Icon name="palette" size="16" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-base">Design</h3>
              <p className="text-sm text-gray-500">321 jobs</p>
            </Link>
            
            <Link 
              to="/jobs?category=sales" 
              className="card p-5 text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
              aria-label="View Sales jobs, 567 positions available"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3 bg-gray-100 text-gray-600 transition-all duration-200">
                <Icon name="users" size="16" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-base">Sales</h3>
              <p className="text-sm text-gray-500">567 jobs</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 animate-fade-in">
              Why Choose Hamediah Jobs?
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Your gateway to exciting career opportunities with bilingual support
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6 text-center group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-4 bg-gray-100 text-gray-600">
                <Icon name="globe-feature" size="20" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Bilingual Support</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Search and apply for jobs in both English and Arabic with full RTL support</p>
            </div>
            
            <div className="card p-6 text-center group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-4 bg-gray-100 text-gray-600">
                <Icon name="bolt" size="20" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Fast & Easy</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Quick job search with powerful filtering and instant results</p>
            </div>
            
            <div className="card p-6 text-center group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-4 bg-gray-100 text-gray-600">
                <Icon name="heart" size="20" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Quality Jobs</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Curated job listings from trusted employers and companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1 text-gray-900">1000+</div>
              <div className="text-gray-600 text-sm">Active Jobs</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1 text-gray-900">500+</div>
              <div className="text-gray-600 text-sm">Companies</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1 text-gray-900">10k+</div>
              <div className="text-gray-600 text-sm">Job Seekers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1 text-gray-900">95%</div>
              <div className="text-gray-600 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 animate-fade-in">
              Success Stories
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              See how our platform helped professionals find their dream jobs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6 group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 bg-gray-200 text-gray-700">
                  <span className="font-semibold text-sm">SA</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-base">Sarah Ahmed</h4>
                  <p className="text-xs text-gray-500">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
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
            
            <div className="card p-6 group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 bg-gray-200 text-gray-700">
                  <span className="font-semibold text-sm">MH</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-base">Mohammed Hassan</h4>
                  <p className="text-xs text-gray-500">Marketing Manager</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
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
            
            <div className="card p-6 group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 bg-gray-200 text-gray-700">
                  <span className="font-semibold text-sm">LK</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-base">Layla Khalil</h4>
                  <p className="text-xs text-gray-500">UX Designer</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
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
      <section className="relative py-16 px-4 text-white overflow-hidden" style={{background: 'var(--gradient-primary)'}}>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-fade-in">
            Ready to Find Your Dream Job?
          </h2>
          <p className="text-base md:text-lg mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Join thousands of job seekers who found their perfect match through Hamediah Jobs
          </p>
          <Button asChild size="default" className="px-6 py-3 bg-white text-gray-900 hover:bg-white font-semibold">
            <Link to="/jobs" className="flex items-center gap-2">
              Start Your Search Now
              <Icon name="arrow-right" size="16" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;