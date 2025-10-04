import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, MapPin, Building2, Users } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { CategoryTile } from '../components/CategoryTile';
import { FeaturedJobCard } from '../components/FeaturedJobCard';
import { JobExtended, JobCategory } from '../types';

export const JobsLandingPage: React.FC = () => {
  const { t } = useTranslation('jobs');
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set('q', keyword);
    if (location) params.set('loc', location);
    navigate(`/jobs/browse?${params.toString()}`);
  };

  // Mock categories
  const categories: JobCategory[] = [
    { id: 'tech', name: 'Technology', nameAr: 'التقنية', icon: 'Code', count: 1234 },
    { id: 'design', name: 'Design', nameAr: 'التصميم', icon: 'Palette', count: 567 },
    { id: 'business', name: 'Business', nameAr: 'الأعمال', icon: 'Briefcase', count: 890 },
    { id: 'marketing', name: 'Marketing', nameAr: 'التسويق', icon: 'TrendingUp', count: 445 },
    { id: 'sales', name: 'Sales', nameAr: 'المبيعات', icon: 'ShoppingBag', count: 678 },
    { id: 'healthcare', name: 'Healthcare', nameAr: 'الرعاية الصحية', icon: 'Stethoscope', count: 334 },
    { id: 'education', name: 'Education', nameAr: 'التعليم', icon: 'GraduationCap', count: 223 },
    { id: 'finance', name: 'Finance', nameAr: 'المالية', icon: 'DollarSign', count: 456 },
  ];

  // Mock featured jobs - in real app, fetch from API
  const featuredJobs: JobExtended[] = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      description: 'We are looking for an experienced full stack developer to join our team and build amazing products.',
      location: 'Remote',
      company: { id: 1, name: 'TechCorp Inc.', createdAt: new Date().toISOString() },
      createdAt: new Date().toISOString(),
      featured: true,
      jobType: 'full-time',
      experienceLevel: 'senior',
      remote: true,
      salaryMin: 80000,
      salaryMax: 120000,
      salaryCurrency: 'USD',
      skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      description: 'Join our design team to create beautiful and intuitive user experiences for our products.',
      location: 'New York, NY',
      company: { id: 2, name: 'DesignHub', createdAt: new Date().toISOString() },
      createdAt: new Date().toISOString(),
      featured: true,
      jobType: 'full-time',
      experienceLevel: 'mid',
      salaryMin: 60000,
      salaryMax: 90000,
      salaryCurrency: 'USD',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-white mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              {t('landing.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 animate-slide-up">
              {t('landing.hero.subtitle')}
            </p>

            {/* Search Form */}
            <form
              onSubmit={handleSearch}
              className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-3 flex flex-col md:flex-row gap-3 animate-bounce-in"
            >
              <div className="flex-1 flex items-center gap-2 px-4 border-b md:border-b-0 md:border-r border-gray-200 pb-3 md:pb-0">
                <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <Input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder={t('landing.hero.searchPlaceholder')}
                  className="border-0 focus:ring-0 px-0"
                />
              </div>

              <div className="flex-1 flex items-center gap-2 px-4 border-b md:border-b-0 md:border-r border-gray-200 pb-3 md:pb-0">
                <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <Input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t('landing.hero.locationPlaceholder')}
                  className="border-0 focus:ring-0 px-0"
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="md:w-auto">
                {t('landing.hero.searchButton')}
              </Button>
            </form>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12 text-white">
              <div>
                <div className="text-3xl font-bold mb-1">5,000+</div>
                <div className="text-sm text-white/80">{t('landing.hero.stats.activeJobs')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">1,200+</div>
                <div className="text-sm text-white/80">{t('landing.hero.stats.companies')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">95%</div>
                <div className="text-sm text-white/80">{t('landing.hero.stats.successRate')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('landing.categories.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('landing.categories.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {categories.map((category) => (
              <CategoryTile key={category.id} category={category} />
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => navigate('/jobs/browse')}
            >
              {t('landing.categories.viewAll')}
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('landing.featured.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('landing.featured.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {featuredJobs.map((job) => (
              <FeaturedJobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/jobs/browse')}
            >
              {t('landing.featured.viewAll')}
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Employer CTA */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Building2 className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t('landing.cta.employer.title')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('landing.cta.employer.subtitle')}
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/jobs/post')}
                className="w-full md:w-auto"
              >
                {t('landing.cta.employer.button')}
              </Button>
            </div>

            {/* Job Seeker CTA */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Users className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t('landing.cta.seeker.title')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('landing.cta.seeker.subtitle')}
              </p>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/jobs/browse')}
                className="w-full md:w-auto"
              >
                {t('landing.cta.seeker.button')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
