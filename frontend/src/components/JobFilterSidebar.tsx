import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Icon } from './ui/Icon';

export interface FilterOptions {
  jobType: string[];
  experienceLevel: string[];
  location: string[];
  salaryRange: { min: number; max: number };
  remote: boolean;
}

interface JobFilterSidebarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onClear: () => void;
}

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Lead/Manager'];
const locations = ['Remote', 'Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Dubai', 'Riyadh'];

export const JobFilterSidebar: React.FC<JobFilterSidebarProps> = ({
  filters,
  onFilterChange,
  onClear
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleArrayFilter = (key: 'jobType' | 'experienceLevel' | 'location', value: string) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    onFilterChange({
      ...filters,
      [key]: newArray
    });
  };

  const updateSalaryRange = (key: 'min' | 'max', value: number) => {
    onFilterChange({
      ...filters,
      salaryRange: {
        ...filters.salaryRange,
        [key]: value
      }
    });
  };

  const toggleRemote = () => {
    onFilterChange({
      ...filters,
      remote: !filters.remote
    });
  };

  const hasActiveFilters = 
    filters.jobType.length > 0 ||
    filters.experienceLevel.length > 0 ||
    filters.location.length > 0 ||
    filters.remote ||
    filters.salaryRange.min > 0 ||
    filters.salaryRange.max < 200000;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Job Type */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Icon name="briefcase" size="16" />
          {t('jobs.filters.type')}
        </h3>
        <div className="space-y-2">
          {jobTypes.map(type => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.jobType.includes(type)}
                onChange={() => toggleArrayFilter('jobType', type)}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Icon name="users" size="16" />
          {t('jobs.filters.level')}
        </h3>
        <div className="space-y-2">
          {experienceLevels.map(level => (
            <label key={level} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.experienceLevel.includes(level)}
                onChange={() => toggleArrayFilter('experienceLevel', level)}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                {level}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Icon name="location" size="16" />
          {t('jobs.search.location')}
        </h3>
        <div className="space-y-2">
          {locations.map(location => (
            <label key={location} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.location.includes(location)}
                onChange={() => toggleArrayFilter('location', location)}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                {location}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Remote Work */}
      <div className="pt-6 border-t border-gray-200">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.remote}
            onChange={toggleRemote}
            className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
          />
          <span className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors flex items-center gap-2">
            <Icon name="globe-feature" size="16" />
            {t('jobs.filters.remote')}
          </span>
        </label>
      </div>

      {/* Salary Range */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Icon name="dollar-sign" size="16" />
          {t('jobs.filters.salary')}
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Minimum ($)</label>
            <input
              type="number"
              value={filters.salaryRange.min}
              onChange={(e) => updateSalaryRange('min', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="0"
              step="10000"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Maximum ($)</label>
            <input
              type="number"
              value={filters.salaryRange.max}
              onChange={(e) => updateSalaryRange('max', parseInt(e.target.value) || 200000)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="200000"
              step="10000"
            />
          </div>
          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
            ${filters.salaryRange.min.toLocaleString()} - ${filters.salaryRange.max.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="pt-6">
          <Button 
            variant="secondary" 
            onClick={onClear}
            className="w-full gap-2"
          >
            <Icon name="x" size="16" />
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );

  // Mobile: Collapsible version
  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="secondary"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full gap-2 justify-between"
        >
          <span className="flex items-center gap-2">
            <Icon name="filter" size="16" />
            Filters
            {hasActiveFilters && (
              <Badge variant="primary" className="ml-2">
                {filters.jobType.length + filters.experienceLevel.length + filters.location.length}
              </Badge>
            )}
          </span>
          <Icon name={isOpen ? "chevron-up" : "chevron-down"} size="16" />
        </Button>
        
        {isOpen && (
          <Card className="mt-4">
            <CardContent className="p-4">
              <FilterContent />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Desktop: Sticky Sidebar */}
      <div className="hidden lg:block">
        <Card className="sticky top-4">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Icon name="filter" size="16" />
              {t('jobs.filters.title')}
              {hasActiveFilters && (
                <Badge variant="primary" className="ml-2">
                  {filters.jobType.length + filters.experienceLevel.length + filters.location.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FilterContent />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default JobFilterSidebar;
