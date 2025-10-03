import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Icon } from '../components/ui/Icon';

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

          <div className="max-w-4xl mx-auto mb-12 animate-bounce-in">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20" padding="lg">
              <div className="grid md:grid-cols-3 gap-4">
                <Input
                  placeholder="Job title, keywords, or company"
                  className="bg-white/90 border-white/30 focus:ring-white/50"
                  leftIcon="search"
                />
                <Input
                  placeholder="Location"
                  className="bg-white/90 border-white/30 focus:ring-white/50"
                  leftIcon="location"
                />
                <Button 
                  variant="secondary" 
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 text-white"
                >
                  <Icon name="search" size="20" className="mr-2" aria-hidden="true" />
                  Search Jobs
                </Button>
              </div>
            </Card>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in">
            <Button asChild size="lg" className="text-lg px-8 py-4">
              <Link to="/jobs">
                <Icon name="search" size="20" className="mr-2" aria-hidden="true" />
                {t('index.cta.explore')}
              </Link>
            </Button>
            <Button 
              asChild 
              variant="secondary" 
              size="lg" 
              className="text-lg px-8 py-4 bg-white/20 border-white/30 text-white hover:bg-white/30"
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
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-4" style={{background: 'var(--gradient-primary)'}}>
                <Icon name="desktop" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Technology</h3>
              <p className="text-sm text-gray-600">1,234 jobs</p>
            </div>
            
            <div className="card card-hover p-6 text-center bg-white">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="building" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Finance</h3>
              <p className="text-sm text-gray-600">892 jobs</p>
            </div>
            
            <div className="card card-hover p-6 text-center bg-white">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="heart" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Healthcare</h3>
              <p className="text-sm text-gray-600">756 jobs</p>
            </div>
            
            <div className="card card-hover p-6 text-center bg-white">
              <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="book" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Education</h3>
              <p className="text-sm text-gray-600">543 jobs</p>
            </div>
            
            <div className="card card-hover p-6 text-center bg-white">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="chart-bar" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Marketing</h3>
              <p className="text-sm text-gray-600">432 jobs</p>
            </div>
            
            <div className="card card-hover p-6 text-center bg-white">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="bolt" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Engineering</h3>
              <p className="text-sm text-gray-600">678 jobs</p>
            </div>
            
            <div className="card card-hover p-6 text-center bg-white">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="palette" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Design</h3>
              <p className="text-sm text-gray-600">321 jobs</p>
            </div>
            
            <div className="card card-hover p-6 text-center bg-white">
              <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="users" size="24" className="text-white" aria-hidden="true" />
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
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Icon name="globe-feature" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Bilingual Support</h3>
              <p className="text-gray-600">Search and apply for jobs in both English and Arabic with full RTL support</p>
              <div className="mt-4 inline-flex items-center text-green-600 font-medium">
                Learn more 
                <Icon name="arrow-right" size="16" className="ml-1" aria-hidden="true" />
              </div>
            </div>
            
            <div className="card card-hover p-8 text-center border-2 border-red-200 bg-gradient-to-br from-red-50 to-rose-50">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Icon name="bolt" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Fast & Easy</h3>
              <p className="text-gray-600">Quick job search with powerful filtering and instant results</p>
              <div className="mt-4 inline-flex items-center text-red-600 font-medium">
                Learn more 
                <Icon name="arrow-right" size="16" className="ml-1" aria-hidden="true" />
              </div>
            </div>
            
            <div className="card card-hover card-premium p-8 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Icon name="heart" size="24" className="text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Quality Jobs</h3>
              <p className="text-gray-600">Curated job listings from trusted employers and companies</p>
              <div className="mt-4 inline-flex items-center text-green-600 font-medium">
                Learn more 
                <Icon name="arrow-right" size="16" className="ml-1" aria-hidden="true" />
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
          </p>            <Button asChild size="lg" className="text-lg px-8 py-4" style={{color: 'var(--primary-green)'}} iconRight="arrow-right">
              <Link to="/jobs">
                Start Your Search Now
              </Link>
            </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;