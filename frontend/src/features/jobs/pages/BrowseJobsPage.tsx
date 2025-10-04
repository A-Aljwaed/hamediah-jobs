import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { JobExtended, JobFilters, PaginationParams } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FilterPanel } from '../components/FilterPanel';
import { JobCard } from '../components/JobCard';
import { Pagination } from '../components/Pagination';
import { Button } from '../../../components/ui/Button';
import { Skeleton } from '../../../components/ui/Skeleton';

export const BrowseJobsPage: React.FC = () => {
  const { t } = useTranslation('jobs');
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [jobs, setJobs] = useState<JobExtended[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set());

  // Parse filters from URL
  const [filters, setFilters] = useState<JobFilters>({
    keyword: searchParams.get('q') || undefined,
    location: searchParams.get('loc') || undefined,
    category: searchParams.get('category')?.split(',').filter(Boolean) || undefined,
    jobType: searchParams.get('jobType')?.split(',').filter(Boolean) || undefined,
    experienceLevel: searchParams.get('experienceLevel')?.split(',').filter(Boolean) || undefined,
    remote: searchParams.get('remote') === 'true' || undefined,
  });

  const [pagination, setPagination] = useState<PaginationParams>({
    page: parseInt(searchParams.get('page') || '1'),
    size: 12,
    totalPages: 1,
    totalElements: 0,
  });

  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'relevance');

  // Mock data - in real app, fetch from API
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock jobs
      const mockJobs: JobExtended[] = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `Software Engineer ${i + 1}`,
        description: 'We are looking for a talented software engineer to join our growing team...',
        location: i % 3 === 0 ? 'Remote' : `City ${i + 1}`,
        company: {
          id: i + 1,
          name: `Company ${i + 1}`,
          createdAt: new Date().toISOString(),
        },
        createdAt: new Date(Date.now() - i * 86400000).toISOString(),
        jobType: ['full-time', 'part-time', 'contract'][i % 3] as any,
        experienceLevel: ['entry', 'mid', 'senior'][i % 3] as any,
        remote: i % 3 === 0,
        featured: i % 4 === 0,
        hot: i % 5 === 0,
        salaryMin: 50000 + i * 5000,
        salaryMax: 80000 + i * 10000,
        salaryCurrency: 'USD',
        skills: ['JavaScript', 'TypeScript', 'React', 'Node.js'].slice(0, (i % 4) + 1),
      }));

      setJobs(mockJobs);
      setPagination({
        page: 1,
        size: 12,
        totalPages: 3,
        totalElements: 28,
      });
      setLoading(false);
    };

    fetchJobs();
  }, [filters, pagination.page, sortBy]);

  // Update URL when filters change
  const handleFilterChange = (newFilters: JobFilters) => {
    setFilters(newFilters);
    
    const params = new URLSearchParams();
    if (newFilters.keyword) params.set('q', newFilters.keyword);
    if (newFilters.location) params.set('loc', newFilters.location);
    if (newFilters.category?.length) params.set('category', newFilters.category.join(','));
    if (newFilters.jobType?.length) params.set('jobType', newFilters.jobType.join(','));
    if (newFilters.experienceLevel?.length)
      params.set('experienceLevel', newFilters.experienceLevel.join(','));
    if (newFilters.remote) params.set('remote', 'true');
    params.set('page', '1');
    if (sortBy !== 'relevance') params.set('sort', sortBy);

    setSearchParams(params);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
    
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    const params = new URLSearchParams(searchParams);
    params.set('sort', sort);
    setSearchParams(params);
  };

  const handleSaveJob = (jobId: number) => {
    setSavedJobs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const breadcrumbItems = [
    { label: t('breadcrumbs.jobs'), path: '/jobs' },
    { label: t('breadcrumbs.browse') },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumbs items={breadcrumbItems} className="mb-4" />
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t('browse.title')}
              </h1>
              <p className="text-gray-600">
                {loading
                  ? t('common.loading')
                  : t('browse.results', { count: pagination.totalElements })}
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden gap-2"
            >
              <Filter className="h-4 w-4" />
              {t('browse.filters.title')}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-8">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClear={() => handleFilterChange({})}
              />
            </div>
          </aside>

          {/* Mobile Filter Panel */}
          {isMobileFilterOpen && (
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClear={() => handleFilterChange({})}
              isMobileOpen={isMobileFilterOpen}
              onMobileClose={() => setIsMobileFilterOpen(false)}
            />
          )}

          {/* Jobs List */}
          <main className="lg:col-span-9">
            {/* Toolbar */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Sort */}
                <div className="flex items-center gap-3">
                  <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                    {t('browse.sort.label')}:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="text-sm border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="relevance">{t('browse.sort.relevance')}</option>
                    <option value="date">{t('browse.sort.date')}</option>
                    <option value="salary">{t('browse.sort.salary')}</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                    }`}
                    aria-label={t('browse.view.grid')}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                    }`}
                    aria-label={t('browse.view.list')}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Jobs Grid/List */}
            {loading ? (
              <div
                className={`
                  grid gap-6
                  ${viewMode === 'grid' ? 'sm:grid-cols-2' : 'grid-cols-1'}
                `}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-64 rounded-xl" />
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <SlidersHorizontal className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('browse.noResults')}
                </h3>
                <p className="text-gray-600 mb-6">{t('browse.noResultsMessage')}</p>
                <Button variant="primary" onClick={() => handleFilterChange({})}>
                  {t('browse.filters.clear')}
                </Button>
              </div>
            ) : (
              <>
                <div
                  className={`
                    grid gap-6 mb-8
                    ${viewMode === 'grid' ? 'sm:grid-cols-2' : 'grid-cols-1'}
                  `}
                >
                  {jobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onSave={handleSaveJob}
                      isSaved={savedJobs.has(job.id)}
                      variant={viewMode === 'list' ? 'compact' : 'default'}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                  totalItems={pagination.totalElements}
                  itemsPerPage={pagination.size}
                />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
