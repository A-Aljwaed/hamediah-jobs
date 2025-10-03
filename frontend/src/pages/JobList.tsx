import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Job } from '../types';
import { jobService } from '../services/api';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { SkeletonJobCard } from '../components/ui/Skeleton';
import { Icon } from '../components/ui/Icon';
import JobFilterSidebar, { FilterOptions } from '../components/JobFilterSidebar';
import JobCard from '../components/JobCard';
import toast from 'react-hot-toast';

type SortOption = 'relevance' | 'date' | 'salary';

const JobList: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set());
  
  const [filters, setFilters] = useState<FilterOptions>({
    jobType: [],
    experienceLevel: [],
    location: [],
    salaryRange: { min: 0, max: 200000 },
    remote: false
  });

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
    loadJobs(query || undefined);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      jobType: [],
      experienceLevel: [],
      location: [],
      salaryRange: { min: 0, max: 200000 },
      remote: false
    });
    setCurrentPage(1);
  };

  // Filter and sort jobs
  const filteredAndSortedJobs = useMemo(() => {
    let result = [...jobs];

    // Apply filters (client-side for demo purposes)
    if (filters.jobType.length > 0) {
      // In a real app, these would be actual fields on the job object
      // For demo, we'll keep all jobs
    }
    
    if (filters.experienceLevel.length > 0) {
      // Filter by experience level
    }
    
    if (filters.location.length > 0) {
      result = result.filter(job => 
        filters.location.some(loc => 
          job.location?.toLowerCase().includes(loc.toLowerCase())
        )
      );
    }

    if (filters.remote) {
      // Filter for remote jobs
    }

    // Apply sorting
    if (sortBy === 'date') {
      result.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortBy === 'salary') {
      // Sort by salary if available
    }

    return result;
  }, [jobs, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedJobs.length / jobsPerPage);
  const paginatedJobs = filteredAndSortedJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const handleLoadMore = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleSaveJob = useCallback((jobId: number) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
        toast.success('Job removed from saved');
      } else {
        newSet.add(jobId);
        toast.success('Job saved successfully!');
      }
      return newSet;
    });
  }, []);

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
            <Icon name="alert-triangle" size="20" className="text-red-600" />
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
                leftIcon="search"
              />
              <Button type="submit" size="lg" className="px-8">
                <Icon name="search" size="16" className="mr-2" />
                {t('jobs.search.button')}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              <JobFilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClear={handleClearFilters}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Job Count & Sort */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <p className="text-gray-600">
                    {filteredAndSortedJobs.length > 0 ? (
                      <>
                        <span className="font-semibold text-primary-600">{filteredAndSortedJobs.length}</span> 
                        {filteredAndSortedJobs.length === 1 ? ' job found' : ' jobs found'}
                        {query && <span> for "{query}"</span>}
                      </>
                    ) : (
                      'No jobs found'
                    )}
                  </p>
                </div>
                
                {/* Sort dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white cursor-pointer"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="date">Date Posted</option>
                    <option value="salary">Salary</option>
                  </select>
                </div>
              </div>

              {/* Job Cards Grid */}
              <div className="space-y-6">
                {paginatedJobs.length === 0 ? (
                  <Card className="text-center py-16" padding="lg">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon name="briefcase" size="20" className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                    <p className="text-gray-600 mb-6">{t('jobs.empty')}</p>
                    {(query || filters.jobType.length > 0 || filters.location.length > 0) && (
                      <Button 
                        variant="secondary"
                        onClick={() => {
                          setQuery('');
                          setSearchParams({});
                          handleClearFilters();
                        }}
                      >
                        Clear All Filters
                      </Button>
                    )}
                  </Card>
                ) : (
                  paginatedJobs.map((job, index) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      index={index}
                      onSaveJob={handleSaveJob}
                      isSaved={savedJobs.has(job.id)}
                    />
                  ))
                )}
              </div>

              {/* Pagination */}
              {filteredAndSortedJobs.length > jobsPerPage && (
                <div className="mt-12">
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-sm text-gray-600">
                      Showing {((currentPage - 1) * jobsPerPage) + 1} to {Math.min(currentPage * jobsPerPage, filteredAndSortedJobs.length)} of {filteredAndSortedJobs.length} jobs
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        <Icon name="chevron-left" size="16" />
                        Previous
                      </Button>
                      
                      <div className="flex gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum: number;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <Button
                              key={pageNum}
                              variant={currentPage === pageNum ? 'default' : 'secondary'}
                              onClick={() => setCurrentPage(pageNum)}
                              className="w-10"
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
                      </div>
                      
                      <Button
                        variant="secondary"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <Icon name="chevron-right" size="16" />
                      </Button>
                    </div>

                    {/* Alternative: Load More Button */}
                    {currentPage < totalPages && (
                      <Button 
                        variant="secondary"
                        onClick={handleLoadMore}
                        className="gap-2"
                      >
                        <Icon name="refresh" size="16" />
                        {t('jobs.loadMore')}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobList;