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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing opportunities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load jobs</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={() => loadJobs()} 
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('jobs.list.title')}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover your next career opportunity from our curated list of positions
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input-field pl-12 pr-4 py-4 text-lg"
              placeholder={t('jobs.search.placeholder') || 'Search for jobs, companies, or keywords...'}
            />
          </div>
          <button 
            type="submit"
            className="btn-primary px-8 py-4 text-lg"
          >
            {t('jobs.search.button')}
          </button>
        </form>
      </div>

      {/* Jobs Grid */}
      <div className="max-w-6xl mx-auto">
        {jobs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">{t('jobs.empty')}</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <article key={job.id} className="card p-6 hover:shadow-medium transition-all duration-200 hover:-translate-y-1 group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="font-semibold text-xl text-gray-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                      <Link 
                        to={`/jobs/${job.id}`}
                        className="hover:underline"
                      >
                        {job.title}
                      </Link>
                    </h2>
                    <div className="flex items-center mt-2 text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m-5 0h2m7-4h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m-2 0h-4m-2 0H7a2 2 0 00-2 2v8a2 2 0 002 2h2" />
                      </svg>
                      <span className="font-medium">{job.company?.name || 'Company'}</span>
                    </div>
                    <div className="flex items-center mt-1 text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{job.location || 'Remote'}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg whitespace-nowrap ml-4">
                    {formatDate(job.createdAt)}
                  </span>
                </div>
                
                <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                  {truncateText(job.description, 160)}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Full-time</span>
                  </div>
                  <Link 
                    to={`/jobs/${job.id}`}
                    className="text-primary-600 font-medium hover:text-primary-700 transition-colors duration-200 flex items-center"
                  >
                    View Details
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;