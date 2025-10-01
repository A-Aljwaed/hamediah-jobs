import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import AdvancedSearch, { SearchFilters, SearchResult } from '../components/search/AdvancedSearch';
import SearchResults from '../components/search/SearchResults';
import SearchAnalytics from '../components/search/SearchAnalytics';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TrendingUp, BarChart3, Search, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const EnhancedJobList: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Initialize filters from URL params
  const getInitialFilters = (): Partial<SearchFilters> => {
    return {
      query: searchParams.get('q') || '',
      location: searchParams.get('location') || '',
      company: searchParams.get('company') || '',
      jobType: searchParams.get('type')?.split(',').filter(Boolean) || [],
      experienceLevel: searchParams.get('level')?.split(',').filter(Boolean) || [],
      remoteWork: searchParams.get('remote') === 'true',
      datePosted: searchParams.get('date') || 'any',
    };
  };

  // Mock data for demonstration
  const generateMockResults = (filters: SearchFilters): SearchResult[] => {
    const mockJobs: SearchResult[] = [
      {
        id: '1',
        title: 'Senior React Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        type: 'Full-time',
        experienceLevel: 'Senior Level',
        salary: { min: 120000, max: 160000, currency: 'USD' },
        postedDate: '2024-01-15T10:00:00Z',
        description: 'We are looking for an experienced React developer to join our growing team. You will be responsible for building scalable web applications using modern React patterns and best practices.',
        skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
        isRemote: true,
        industry: 'Technology',
        featured: true
      },
      {
        id: '2',
        title: 'Product Manager',
        company: 'StartupXYZ',
        location: 'New York, NY',
        type: 'Full-time',
        experienceLevel: 'Mid Level',
        salary: { min: 90000, max: 130000, currency: 'USD' },
        postedDate: '2024-01-14T14:30:00Z',
        description: 'Join our product team to drive the development of innovative features that will impact millions of users worldwide.',
        skills: ['Product Strategy', 'Analytics', 'Agile', 'User Research'],
        isRemote: false,
        industry: 'Technology',
        featured: false
      },
      {
        id: '3',
        title: 'Data Scientist',
        company: 'DataFlow Analytics',
        location: 'Remote',
        type: 'Full-time',
        experienceLevel: 'Senior Level',
        salary: { min: 110000, max: 150000, currency: 'USD' },
        postedDate: '2024-01-13T09:15:00Z',
        description: 'We are seeking a talented data scientist to help us extract insights from large datasets and build predictive models.',
        skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Statistics'],
        isRemote: true,
        industry: 'Technology',
        featured: false
      },
      {
        id: '4',
        title: 'UX Designer',
        company: 'Design Studio Pro',
        location: 'Austin, TX',
        type: 'Contract',
        experienceLevel: 'Mid Level',
        salary: { min: 70000, max: 95000, currency: 'USD' },
        postedDate: '2024-01-12T16:45:00Z',
        description: 'Create beautiful and intuitive user experiences for our clients\' digital products.',
        skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
        isRemote: true,
        industry: 'Design',
        featured: false
      },
      {
        id: '5',
        title: 'DevOps Engineer',
        company: 'CloudTech Solutions',
        location: 'Seattle, WA',
        type: 'Full-time',
        experienceLevel: 'Senior Level',
        salary: { min: 130000, max: 170000, currency: 'USD' },
        postedDate: '2024-01-11T11:20:00Z',
        description: 'Help us build and maintain scalable cloud infrastructure that powers our applications.',
        skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
        isRemote: true,
        industry: 'Technology',
        featured: true
      }
    ];

    // Filter results based on search criteria
    return mockJobs.filter(job => {
      if (filters.query && !job.title.toLowerCase().includes(filters.query.toLowerCase()) &&
          !job.company.toLowerCase().includes(filters.query.toLowerCase()) &&
          !job.skills.some(skill => skill.toLowerCase().includes(filters.query.toLowerCase()))) {
        return false;
      }
      
      if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      
      if (filters.company && !job.company.toLowerCase().includes(filters.company.toLowerCase())) {
        return false;
      }
      
      if (filters.jobType.length > 0 && !filters.jobType.includes(job.type)) {
        return false;
      }
      
      if (filters.experienceLevel.length > 0 && !filters.experienceLevel.includes(job.experienceLevel)) {
        return false;
      }
      
      if (filters.industry.length > 0 && !filters.industry.includes(job.industry)) {
        return false;
      }
      
      if (filters.remoteWork && !job.isRemote) {
        return false;
      }
      
      if (filters.skills.length > 0 && !filters.skills.some(skill => 
        job.skills.some(jobSkill => jobSkill.toLowerCase().includes(skill.toLowerCase()))
      )) {
        return false;
      }

      return true;
    });
  };

  const handleSearch = useCallback(async (filters: SearchFilters) => {
    setLoading(true);
    
    try {
      // Update URL params
      const params = new URLSearchParams();
      if (filters.query) params.set('q', filters.query);
      if (filters.location) params.set('location', filters.location);
      if (filters.company) params.set('company', filters.company);
      if (filters.jobType.length > 0) params.set('type', filters.jobType.join(','));
      if (filters.experienceLevel.length > 0) params.set('level', filters.experienceLevel.join(','));
      if (filters.remoteWork) params.set('remote', 'true');
      if (filters.datePosted !== 'any') params.set('date', filters.datePosted);
      
      setSearchParams(params);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const results = generateMockResults(filters);
      setSearchResults(results);
      setTotalCount(results.length);
      setCurrentPage(1);
      
      if (results.length === 0 && (filters.query || Object.values(filters).some(v => 
        Array.isArray(v) ? v.length > 0 : v !== '' && v !== false && v !== 'any'
      ))) {
        toast('No jobs found matching your criteria. Try adjusting your filters.', { 
          icon: 'ℹ️',
          duration: 4000 
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [setSearchParams]);

  const handleSortChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    // Sort logic is handled in SearchResults component
    console.log('Sort changed:', sortBy, sortOrder);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In a real app, this would trigger a new API call with pagination
  };

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prev => [...prev, jobId]);
    toast.success('Job saved successfully!');
  };

  const handleUnsaveJob = (jobId: string) => {
    setSavedJobs(prev => prev.filter(id => id !== jobId));
    toast.success('Job removed from saved list.');
  };

  // Load initial results
  useEffect(() => {
    const initialFilters: SearchFilters = {
      query: '',
      location: '',
      company: '',
      jobType: [],
      experienceLevel: [],
      salaryRange: { min: 0, max: 200000 },
      datePosted: 'any',
      remoteWork: false,
      skills: [],
      industry: [],
      ...getInitialFilters()
    };
    
    handleSearch(initialFilters);
  }, [handleSearch]);

  return (
    <div className="-mx-4 -mt-4">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary-50 to-accent-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('search.title')} <span className="text-primary-600">Enhanced</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover your perfect job with our advanced search and filtering capabilities. 
              Find opportunities that match your skills, preferences, and career goals.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Card>
              <CardContent className="text-center p-4">
                <div className="text-2xl font-bold text-primary-600">{totalCount.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Active Jobs</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center p-4">
                <div className="text-2xl font-bold text-green-600">95%</div>
                <div className="text-sm text-gray-600">Match Accuracy</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center p-4">
                <div className="text-2xl font-bold text-blue-600">24h</div>
                <div className="text-sm text-gray-600">Avg Response</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Search Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-4">
                <AdvancedSearch
                  onSearch={handleSearch}
                  onResultsChange={setSearchResults}
                  loading={loading}
                  initialFilters={getInitialFilters()}
                />
                
                {/* Analytics Toggle */}
                <Card>
                  <CardContent className="p-4">
                    <Button
                      variant={showAnalytics ? 'default' : 'outline'}
                      onClick={() => setShowAnalytics(!showAnalytics)}
                      className="w-full flex items-center gap-2"
                    >
                      <BarChart3 className="w-4 h-4" />
                      {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Quick Actions
                    </h3>
                    <div className="space-y-2">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Trending Jobs
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Search className="w-4 h-4 mr-2" />
                        Saved Searches
                      </Button>
                      <div className="pt-2 border-t">
                        <Badge variant="secondary" className="w-full justify-center">
                          {savedJobs.length} Saved Jobs
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Results Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Analytics Section */}
              {showAnalytics && (
                <SearchAnalytics
                  loading={loading}
                  timeframe="week"
                />
              )}

              {/* Search Results */}
              <SearchResults
                results={searchResults}
                loading={loading}
                totalCount={totalCount}
                currentPage={currentPage}
                pageSize={10}
                onPageChange={handlePageChange}
                onSortChange={handleSortChange}
                onSaveJob={handleSaveJob}
                onUnsaveJob={handleUnsaveJob}
                savedJobs={savedJobs}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedJobList;
