import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Job } from '../types';
import { jobService } from '../services/api';

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mb-4"></div>
          <p className="text-gray-600">Loading amazing job opportunities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => loadJobs()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
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
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input-field pl-12 pr-32 py-4 text-lg rounded-2xl"
                placeholder={t('jobs.search.placeholder')}
              />
              <button 
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <span className="btn-primary py-3 px-6 text-sm">
                  {t('jobs.search.button')}
                </span>
              </button>
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
              <button className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>
              <button className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 4h6" />
                </svg>
                Sort by
              </button>
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="space-y-6">
            {jobs.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-6">{t('jobs.empty')}</p>
                {query && (
                  <button 
                    onClick={() => {
                      setQuery('');
                      loadJobs();
                    }}
                    className="btn-secondary"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              jobs.map((job) => (
                <article key={job.id} className="card card-hover p-6 animate-fade-in">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                    {/* Job Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                          <Link 
                            to={`/jobs/${job.id}`}
                            className="block"
                          >
                            {job.title}
                          </Link>
                        </h2>
                        <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                          {formatDate(job.createdAt)}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-3 text-gray-600">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="font-medium">{job.company?.name || '—'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{job.location || '—'}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {truncateText(job.description, 200)}
                      </p>
                      
                      {/* Job Tags */}
                      <div className="flex flex-wrap gap-2">
                        <span className="job-tag">Full-time</span>
                        <span className="job-tag bg-green-100 text-green-800">Remote</span>
                        <span className="job-tag bg-purple-100 text-purple-800">Senior Level</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 lg:items-end">
                      <Link 
                        to={`/jobs/${job.id}`}
                        className="btn-primary whitespace-nowrap"
                      >
                        View Details
                      </Link>
                      <button className="btn-secondary whitespace-nowrap">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Save Job
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Load More Button */}
          {jobs.length > 0 && (
            <div className="text-center mt-12">
              <button className="btn-secondary px-8 py-3">
                Load More Jobs
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default JobList;