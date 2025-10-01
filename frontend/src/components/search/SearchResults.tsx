import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Skeleton } from '../ui/Skeleton';
import { 
  MapPin, 
  Building, 
  Clock, 
  DollarSign,
  Star,
  Bookmark,
  BookmarkCheck,
  ArrowUpDown,
  Filter,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { SearchResult } from './AdvancedSearch';
import { formatDistanceToNow } from 'date-fns';

interface SearchResultsProps {
  results: SearchResult[];
  loading?: boolean;
  totalCount?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onSortChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  onSaveJob?: (jobId: string) => void;
  onUnsaveJob?: (jobId: string) => void;
  savedJobs?: string[];
}

type ViewMode = 'list' | 'grid';
type SortOption = 'relevance' | 'date' | 'salary' | 'company' | 'title';

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  loading = false,
  totalCount = 0,
  currentPage = 1,
  pageSize = 10,
  onPageChange,
  onSortChange,
  onSaveJob,
  onUnsaveJob,
  savedJobs = []
}) => {
  const { t } = useTranslation();
  
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortOptions = [
    { value: 'relevance', label: t('search.sort.relevance') },
    { value: 'date', label: t('search.sort.date') },
    { value: 'salary', label: t('search.sort.salary') },
    { value: 'company', label: t('search.sort.company') },
    { value: 'title', label: t('search.sort.title') }
  ];

  const sortedResults = useMemo(() => {
    if (!results.length) return [];

    return [...results].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'date':
          comparison = new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
          break;
        case 'salary':
          const aSalary = a.salary ? (a.salary.min + a.salary.max) / 2 : 0;
          const bSalary = b.salary ? (b.salary.min + b.salary.max) / 2 : 0;
          comparison = bSalary - aSalary;
          break;
        case 'company':
          comparison = a.company.localeCompare(b.company);
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'relevance':
        default:
          // Featured jobs first, then by date
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          comparison = new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [results, sortBy, sortOrder]);

  const handleSortChange = (newSortBy: SortOption) => {
    if (newSortBy === sortBy) {
      const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(newOrder);
      onSortChange?.(sortBy, newOrder);
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
      onSortChange?.(newSortBy, 'desc');
    }
  };

  const formatSalary = (salary: SearchResult['salary']) => {
    if (!salary) return null;
    
    const { min, max, currency } = salary;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    if (min === max) {
      return formatter.format(min);
    }
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return dateString;
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  const JobCard: React.FC<{ job: SearchResult; compact?: boolean }> = ({ job, compact = false }) => {
    const isSaved = savedJobs.includes(job.id);

    return (
      <Card className={`transition-all duration-200 hover:shadow-md ${job.featured ? 'ring-2 ring-primary-200' : ''}`}>
        <CardContent className={compact ? 'p-4' : 'p-6'}>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {job.title}
                    </h3>
                    {job.featured && (
                      <Badge variant="accent" className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                      {job.isRemote && (
                        <Badge variant="secondary" className="ml-1 text-xs">
                          Remote
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(job.postedDate)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => isSaved ? onUnsaveJob?.(job.id) : onSaveJob?.(job.id)}
                    className="text-gray-400 hover:text-primary-600"
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                  >
                    <a href={`/jobs/${job.id}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Job Details */}
              <div className="flex flex-wrap items-center gap-4 mb-3">
                <Badge variant="outline">{job.type}</Badge>
                <Badge variant="outline">{job.experienceLevel}</Badge>
                <Badge variant="outline">{job.industry}</Badge>
                
                {job.salary && (
                  <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                    <DollarSign className="w-4 h-4" />
                    {formatSalary(job.salary)}
                  </div>
                )}
              </div>

              {/* Description */}
              {!compact && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {job.description}
                </p>
              )}

              {/* Skills */}
              {job.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {job.skills.slice(0, compact ? 3 : 5).map(skill => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {job.skills.length > (compact ? 3 : 5) && (
                    <Badge variant="secondary" className="text-xs">
                      +{job.skills.length - (compact ? 3 : 5)} more
                    </Badge>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button size="sm" asChild>
                  <a href={`/jobs/${job.id}`}>
                    View Details
                  </a>
                </Button>
                
                <Button variant="outline" size="sm" asChild>
                  <a href={`/jobs/${job.id}/apply`}>
                    Apply Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-64" />
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-18" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {totalCount > 0 ? (
              <>
                {totalCount.toLocaleString()} {t('search.results.found')}
                {currentPage > 1 && (
                  <span className="text-gray-500 font-normal">
                    {' '}(Page {currentPage} of {totalPages})
                  </span>
                )}
              </>
            ) : (
              t('search.results.none')
            )}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSortChange(sortBy)}
            className="flex items-center gap-1"
          >
            <ArrowUpDown className="w-4 h-4" />
            {sortOrder === 'asc' ? '↑' : '↓'}
          </Button>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {sortedResults.length > 0 ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : 'space-y-4'}>
          {sortedResults.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              compact={viewMode === 'grid'} 
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('search.results.noResults')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('search.results.tryAdjusting')}
            </p>
            <Button variant="outline">
              {t('search.results.clearFilters')}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
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
                  variant={pageNum === currentPage ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onPageChange?.(pageNum)}
                  className="w-8 h-8 p-0"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
