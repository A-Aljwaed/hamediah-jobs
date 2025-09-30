import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Job } from '../types';
import { jobService } from '../services/api';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { SkeletonJobCard } from '../components/ui/Skeleton';
import { Search, MapPin, Building, Calendar, Heart, Filter, SortAsc, AlertCircle, Briefcase } from 'lucide-react';

const JobList: React.FC = () => {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const loadJobs = async (searchQuery?: string) => {
    try {
      setLoading(true);
      const data = await jobService.getJobs(searchQuery);
      setJobs(data);
      setError(null);
    } catch (err) {
      setError('Failed to load jobs');
      console.error('Error loading jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadJobs(query || undefined);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="-mx-4 -mt-4">
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t('jobs.list.title')}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover your next career opportunity from our curated collection of job listings
              </p>
            </div>
          </div>
        </section>
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto space-y-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} variant="default">
                <SkeletonJobCard />
              </Card>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="text-center max-w-md" padding="lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => loadJobs()}>
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="-mx-4 -mt-4">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('jobs.list.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover your next career opportunity from our curated collection of job listings
            </p>
          </div>

          {/* Enhanced Search */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="text-lg py-4 rounded-2xl"
                placeholder={t('jobs.search.placeholder')}
                leftIcon={<Search className="h-5 w-5" />}
              />
              <Button type="submit" size="lg" className="px-8">
                {t('jobs.search.button')}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Job Count & Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">
                {jobs.length > 0 ? (
                  <>
                    <span className="font-semibold text-blue-600">{jobs.length}</span> 
                    {jobs.length === 1 ? ' job found' : ' jobs found'}
                    {query && <span> for "{query}"</span>}
                  </>
                ) : (
                  'No jobs found'
                )}
              </p>
            </div>
            
            {/* Filter buttons */}
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="secondary" size="sm">
                <SortAsc className="w-4 h-4 mr-2" />
                Sort by
              </Button>
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="space-y-6">
            {jobs.length === 0 ? (
              <Card className="text-center py-16" padding="lg">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-6">{t('jobs.empty')}</p>
                {query && (
                  <Button 
                    variant="secondary"
                    onClick={() => {
                      setQuery('');
                      loadJobs();
                    }}
                  >
                    Clear Search
                  </Button>
                )}
              </Card>
            ) : (
              jobs.map((job) => (
                <Card key={job.id} variant="interactive" className="animate-fade-in">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                      {/* Job Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                            <Link 
                              to={`/jobs/${job.id}`}
                              className="block"
                            >
                              {job.title}
                            </Link>
                          </h2>
                          <div className="flex items-center gap-1 text-sm text-gray-500 whitespace-nowrap ml-4">
                            <Calendar className="w-4 h-4" />
                            {formatDate(job.createdAt)}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 mb-3 text-gray-600">
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            <span className="font-medium">{job.company?.name || '—'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location || '—'}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {truncateText(job.description, 200)}
                        </p>
                        
                        {/* Job Tags */}
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="default">Full-time</Badge>
                          <Badge variant="success">Remote</Badge>
                          <Badge variant="primary">Senior Level</Badge>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2 lg:items-end">
                        <Button asChild>
                          <Link to={`/jobs/${job.id}`}>
                            View Details
                          </Link>
                        </Button>
                        <Button variant="secondary">
                          <Heart className="w-4 h-4 mr-2" />
                          Save Job
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Load More Button */}
          {jobs.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="secondary" size="lg" className="px-8">
                Load More Jobs
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default JobList;