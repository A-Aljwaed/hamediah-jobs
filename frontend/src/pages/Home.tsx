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
      <section className="hero-section relative py-28 px-4 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-95"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white opacity-[0.08] rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-32 right-20 w-[32rem] h-[32rem] bg-purple-300 opacity-[0.08] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-300 opacity-[0.08] rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in text-shadow-glow">
            {t('index.headline')}
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up opacity-95">
            {t('index.tagline')}
          </p>

          <div className="max-w-4xl mx-auto mb-12 animate-scale-in">
            <Card className="card-glass border-white/20 shadow-glass" padding="lg">
              <form className="grid md:grid-cols-3 gap-4" action="/jobs" method="get">
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
                  className="bg-white/90 hover:bg-white border-white/40 text-gray-900 font-semibold shadow-md hover:shadow-lg backdrop-blur-sm"
                >
                  <Icon name="search" size="20" className="mr-2" aria-hidden="true" />
                  Search Jobs
                </Button>
              </form>
            </Card>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in">
            <Button asChild size="lg" className="text-lg px-10 py-5 shadow-xl hover:shadow-2xl">
              <Link to="/jobs">
                <Icon name="search" size="20" className="mr-2" aria-hidden="true" />
                {t('index.cta.explore')}
              </Link>
            </Button>
            <Button 
              asChild 
              variant="secondary" 
              size="lg" 
              className="text-lg px-10 py-5 bg-white/90 backdrop-blur-md border-white/40 text-gray-900 font-semibold hover:bg-white shadow-lg hover:shadow-xl"
            >
              <Link to="/login">
                <Icon name="user" size="20" className="mr-2" aria-hidden="true" />
                {t('nav.login')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
              Popular Job Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore opportunities in the most in-demand fields
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link 
              to="/jobs?category=technology" 
              className="card card-hover p-6 text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-2xl"
              aria-label="View Technology jobs, 1234 positions available"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110" style={{background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)'}}>
                <Icon name="desktop" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Technology</h3>
              <p className="text-sm text-gray-600 font-medium">1,234 jobs</p>
            </Link>
            
            <Link 
              to="/jobs?category=finance" 
              className="card card-hover p-6 text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-2xl"
              aria-label="View Finance jobs, 892 positions available"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110" style={{background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)'}}>
                <Icon name="building" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Finance</h3>
              <p className="text-sm text-gray-600 font-medium">892 jobs</p>
            </Link>
            
            <Link 
              to="/jobs?category=healthcare" 
              className="card card-hover p-6 text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-2xl"
              aria-label="View Healthcare jobs, 756 positions available"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110" style={{background: 'linear-gradient(135deg, #14b8a6 0%, #10b981 100%)'}}>
                <Icon name="heart" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Healthcare</h3>
              <p className="text-sm text-gray-600 font-medium">756 jobs</p>
            </Link>
            
            <Link 
              to="/jobs?category=education" 
              className="card card-hover p-6 text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-2xl"
              aria-label="View Education jobs, 543 positions available"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110" style={{background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'}}>
                <Icon name="book" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Education</h3>
              <p className="text-sm text-gray-600 font-medium">543 jobs</p>
            </Link>
            
            <Link 
              to="/jobs?category=marketing" 
              className="card card-hover p-6 text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-2xl"
              aria-label="View Marketing jobs, 432 positions available"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110" style={{background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)'}}>
                <Icon name="chart-bar" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Marketing</h3>
              <p className="text-sm text-gray-600 font-medium">432 jobs</p>
            </Link>
            
            <Link 
              to="/jobs?category=engineering" 
              className="card card-hover p-6 text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-2xl"
              aria-label="View Engineering jobs, 678 positions available"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110" style={{background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)'}}>
                <Icon name="bolt" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Engineering</h3>
              <p className="text-sm text-gray-600 font-medium">678 jobs</p>
            </Link>
            
            <Link 
              to="/jobs?category=design" 
              className="card card-hover p-6 text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-2xl"
              aria-label="View Design jobs, 321 positions available"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110" style={{background: 'linear-gradient(135deg, #a855f7 0%, #d946ef 100%)'}}>
                <Icon name="palette" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Design</h3>
              <p className="text-sm text-gray-600 font-medium">321 jobs</p>
            </Link>
            
            <Link 
              to="/jobs?category=sales" 
              className="card card-hover p-6 text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-2xl"
              aria-label="View Sales jobs, 567 positions available"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110" style={{background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)'}}>
                <Icon name="users" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Sales</h3>
              <p className="text-sm text-gray-600 font-medium">567 jobs</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
              Why Choose Hamediah Jobs?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your gateway to exciting career opportunities with bilingual support
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card card-hover card-premium p-8 text-center float-animation group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow" style={{background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)'}}>
                <Icon name="globe-feature" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Bilingual Support</h3>
              <p className="text-gray-600 text-base leading-relaxed">Search and apply for jobs in both English and Arabic with full RTL support</p>
              <div className="mt-6 inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors cursor-pointer">
                Learn more 
                <Icon name="arrow-right" size="16" className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </div>
            
            <div className="card card-hover p-8 text-center float-animation group" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)', animationDelay: '0.2s' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-purple" style={{background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)'}}>
                <Icon name="bolt" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Fast & Easy</h3>
              <p className="text-gray-600 text-base leading-relaxed">Quick job search with powerful filtering and instant results</p>
              <div className="mt-6 inline-flex items-center text-secondary-600 font-semibold hover:text-secondary-700 transition-colors cursor-pointer">
                Learn more 
                <Icon name="arrow-right" size="16" className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </div>
            
            <div className="card card-hover card-premium p-8 text-center float-animation group" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow" style={{background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'}}>
                <Icon name="heart" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Quality Jobs</h3>
              <p className="text-gray-600 text-base leading-relaxed">Curated job listings from trusted employers and companies</p>
              <div className="mt-6 inline-flex items-center text-accent-600 font-semibold hover:text-accent-700 transition-colors cursor-pointer">
                Learn more 
                <Icon name="arrow-right" size="16" className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-primary-50/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-scale-in">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">1000+</div>
              <div className="text-gray-600 font-semibold text-base">Active Jobs</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-secondary-500 to-secondary-600 bg-clip-text text-transparent">500+</div>
              <div className="text-gray-600 font-semibold text-base">Companies</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-accent-500 to-accent-600 bg-clip-text text-transparent">10k+</div>
              <div className="text-gray-600 font-semibold text-base">Job Seekers</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">95%</div>
              <div className="text-gray-600 font-semibold text-base">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how our platform helped professionals find their dream jobs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card card-hover p-8 group">
              <div className="flex items-center mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mr-4 transition-all duration-300 group-hover:scale-110" style={{background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)'}}>
                  <span className="text-white font-bold text-xl">SA</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Sarah Ahmed</h4>
                  <p className="text-sm text-gray-500 font-medium">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-600 mb-5 leading-relaxed">
                "I found my dream job in tech within just 2 weeks. The bilingual support made everything so much easier!"
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="card card-hover p-8 group">
              <div className="flex items-center mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mr-4 transition-all duration-300 group-hover:scale-110" style={{background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)'}}>
                  <span className="text-white font-bold text-xl">MH</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Mohammed Hassan</h4>
                  <p className="text-sm text-gray-500 font-medium">Marketing Manager</p>
                </div>
              </div>
              <p className="text-gray-600 mb-5 leading-relaxed">
                "The platform connected me with amazing opportunities. The search filters are incredibly precise!"
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="card card-hover p-8 group">
              <div className="flex items-center mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mr-4 transition-all duration-300 group-hover:scale-110" style={{background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'}}>
                  <span className="text-white font-bold text-xl">LK</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Layla Khalil</h4>
                  <p className="text-sm text-gray-500 font-medium">UX Designer</p>
                </div>
              </div>
              <p className="text-gray-600 mb-5 leading-relaxed">
                "Professional, fast, and user-friendly. I got multiple interview invitations in my first week!"
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 text-white overflow-hidden" style={{background: 'var(--gradient-primary)'}}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">
            Ready to Find Your Dream Job?
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-95 max-w-2xl mx-auto leading-relaxed">
            Join thousands of job seekers who found their perfect match through Hamediah Jobs
          </p>
          <Button asChild size="lg" className="text-lg px-10 py-5 bg-white text-gray-900 hover:bg-white hover:shadow-2xl font-bold shadow-xl">
            <Link to="/jobs" className="flex items-center gap-2">
              Start Your Search Now
              <Icon name="arrow-right" size="20" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;