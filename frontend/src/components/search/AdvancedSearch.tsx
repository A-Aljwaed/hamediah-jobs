import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { 
  Search, 
  Filter, 
  X, 
  MapPin, 
  Building, 
  Clock, 
  DollarSign,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Calendar
} from 'lucide-react';
import { searchRateLimiter } from '../../utils/rateLimiter';
import toast from 'react-hot-toast';

export interface SearchFilters {
  query: string;
  location: string;
  company: string;
  jobType: string[];
  experienceLevel: string[];
  salaryRange: {
    min: number;
    max: number;
  };
  datePosted: string;
  remoteWork: boolean;
  skills: string[];
  industry: string[];
}

export interface SearchResult {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  experienceLevel: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  postedDate: string;
  description: string;
  skills: string[];
  isRemote: boolean;
  industry: string;
  featured: boolean;
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onResultsChange: (results: SearchResult[]) => void;
  loading?: boolean;
  initialFilters?: Partial<SearchFilters>;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onSearch,
  onResultsChange,
  loading = false,
  initialFilters = {}
}) => {
  const { t } = useTranslation();
  
  const [filters, setFilters] = useState<SearchFilters>({
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
    ...initialFilters
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem('job-search-history');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Save search to history
  const saveToHistory = useCallback((query: string) => {
    if (query.trim() && !searchHistory.includes(query)) {
      const newHistory = [query, ...searchHistory.slice(0, 4)]; // Keep last 5 searches
      setSearchHistory(newHistory);
      localStorage.setItem('job-search-history', JSON.stringify(newHistory));
    }
  }, [searchHistory]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (filters.query.length >= 2 || Object.values(filters).some(v => 
        Array.isArray(v) ? v.length > 0 : v !== '' && v !== false && v !== 'any'
      )) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters]);

  const handleSearch = useCallback(() => {
    // Rate limiting check
    const rateLimitKey = 'search-' + Date.now().toString().slice(-6);
    if (!searchRateLimiter.isAllowed(rateLimitKey)) {
      toast.error('Too many search requests. Please wait a moment.');
      return;
    }

    if (filters.query.trim()) {
      saveToHistory(filters.query);
    }

    onSearch(filters);
  }, [filters, onSearch, saveToHistory]);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !filters.skills.includes(skillInput.trim())) {
      updateFilter('skills', [...filters.skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    updateFilter('skills', filters.skills.filter(s => s !== skill));
  };

  const toggleArrayFilter = (key: 'jobType' | 'experienceLevel' | 'industry', value: string) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      location: '',
      company: '',
      jobType: [],
      experienceLevel: [],
      salaryRange: { min: 0, max: 200000 },
      datePosted: 'any',
      remoteWork: false,
      skills: [],
      industry: []
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.query) count++;
    if (filters.location) count++;
    if (filters.company) count++;
    if (filters.jobType.length > 0) count++;
    if (filters.experienceLevel.length > 0) count++;
    if (filters.salaryRange.min > 0 || filters.salaryRange.max < 200000) count++;
    if (filters.datePosted !== 'any') count++;
    if (filters.remoteWork) count++;
    if (filters.skills.length > 0) count++;
    if (filters.industry.length > 0) count++;
    return count;
  };

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];
  const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Sales', 'Design', 'Engineering'];
  const dateOptions = [
    { value: 'any', label: 'Any time' },
    { value: '1d', label: 'Past 24 hours' },
    { value: '3d', label: 'Past 3 days' },
    { value: '1w', label: 'Past week' },
    { value: '1m', label: 'Past month' }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            {t('search.title')}
          </CardTitle>
          <div className="flex items-center gap-2">
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="text-xs">
                {getActiveFilterCount()} {t('search.filtersActive')}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {showAdvanced ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Main Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder={t('search.placeholder')}
            value={filters.query}
            onChange={(e) => updateFilter('query', e.target.value)}
            className="pl-10 pr-4"
          />
          
          {/* Search History Dropdown */}
          {searchHistory.length > 0 && filters.query === '' && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
              <div className="p-2 border-b border-gray-100">
                <p className="text-xs text-gray-500 font-medium">Recent searches</p>
              </div>
              {searchHistory.map((query, index) => (
                <button
                  key={index}
                  onClick={() => updateFilter('query', query)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                >
                  <Clock className="w-3 h-3 inline mr-2 text-gray-400" />
                  {query}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder={t('search.location')}
              value={filters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
              className="w-40"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder={t('search.company')}
              value={filters.company}
              onChange={(e) => updateFilter('company', e.target.value)}
              className="w-40"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.remoteWork}
              onChange={(e) => updateFilter('remoteWork', e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm">{t('search.remote')}</span>
          </label>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('search.jobType')}
              </label>
              <div className="flex flex-wrap gap-2">
                {jobTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => toggleArrayFilter('jobType', type)}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      filters.jobType.includes(type)
                        ? 'bg-primary-100 border-primary-300 text-primary-700'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('search.experienceLevel')}
              </label>
              <div className="flex flex-wrap gap-2">
                {experienceLevels.map(level => (
                  <button
                    key={level}
                    onClick={() => toggleArrayFilter('experienceLevel', level)}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      filters.experienceLevel.includes(level)
                        ? 'bg-primary-100 border-primary-300 text-primary-700'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('search.industry')}
              </label>
              <div className="flex flex-wrap gap-2">
                {industries.map(industry => (
                  <button
                    key={industry}
                    onClick={() => toggleArrayFilter('industry', industry)}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      filters.industry.includes(industry)
                        ? 'bg-primary-100 border-primary-300 text-primary-700'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                {t('search.salaryRange')}
              </label>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.salaryRange.min || ''}
                  onChange={(e) => updateFilter('salaryRange', {
                    ...filters.salaryRange,
                    min: parseInt(e.target.value) || 0
                  })}
                  className="w-24"
                />
                <span className="text-gray-400">to</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.salaryRange.max || ''}
                  onChange={(e) => updateFilter('salaryRange', {
                    ...filters.salaryRange,
                    max: parseInt(e.target.value) || 200000
                  })}
                  className="w-24"
                />
              </div>
            </div>

            {/* Date Posted */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                {t('search.datePosted')}
              </label>
              <select
                value={filters.datePosted}
                onChange={(e) => updateFilter('datePosted', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {dateOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('search.skills')}
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  type="text"
                  placeholder="Add a skill..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  className="flex-1"
                />
                <Button onClick={addSkill} size="sm">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.skills.map(skill => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <Button
            variant="ghost"
            onClick={clearFilters}
            disabled={getActiveFilterCount() === 0}
            className="text-gray-600"
          >
            <X className="w-4 h-4 mr-1" />
            {t('search.clearFilters')}
          </Button>
          
          <Button
            onClick={handleSearch}
            loading={loading}
            className="flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            {loading ? t('search.searching') : t('search.search')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedSearch;
