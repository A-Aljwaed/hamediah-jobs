import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Filter as FilterIcon } from 'lucide-react';
import { JobFilters } from '../types';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';

interface FilterPanelProps {
  filters: JobFilters;
  onFilterChange: (filters: JobFilters) => void;
  onClear?: () => void;
  className?: string;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onClear,
  className = '',
  isMobileOpen = false,
  onMobileClose,
}) => {
  const { t } = useTranslation('jobs');
  const [localFilters, setLocalFilters] = useState<JobFilters>(filters);

  // Sync local filters with props
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Debounced keyword search
  const [keywordDebounce, setKeywordDebounce] = useState<NodeJS.Timeout | null>(null);

  const handleKeywordChange = useCallback(
    (value: string) => {
      setLocalFilters((prev) => ({ ...prev, keyword: value }));

      // Clear existing timeout
      if (keywordDebounce) {
        clearTimeout(keywordDebounce);
      }

      // Set new timeout for debounced search
      const timeout = setTimeout(() => {
        onFilterChange({ ...localFilters, keyword: value });
      }, 500);

      setKeywordDebounce(timeout);
    },
    [localFilters, keywordDebounce, onFilterChange]
  );

  const handleLocationChange = useCallback(
    (value: string) => {
      const newFilters = { ...localFilters, location: value };
      setLocalFilters(newFilters);

      if (keywordDebounce) {
        clearTimeout(keywordDebounce);
      }

      const timeout = setTimeout(() => {
        onFilterChange(newFilters);
      }, 500);

      setKeywordDebounce(timeout);
    },
    [localFilters, keywordDebounce, onFilterChange]
  );

  const handleJobTypeToggle = (type: string) => {
    const currentTypes = localFilters.jobType || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type];

    const newFilters = { ...localFilters, jobType: newTypes };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleExperienceLevelToggle = (level: string) => {
    const currentLevels = localFilters.experienceLevel || [];
    const newLevels = currentLevels.includes(level)
      ? currentLevels.filter((l) => l !== level)
      : [...currentLevels, level];

    const newFilters = { ...localFilters, experienceLevel: newLevels };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRemoteToggle = () => {
    const newFilters = { ...localFilters, remote: !localFilters.remote };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClear = () => {
    const emptyFilters: JobFilters = {};
    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
    if (onClear) onClear();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.keyword) count++;
    if (localFilters.location) count++;
    if (localFilters.jobType && localFilters.jobType.length > 0) count += localFilters.jobType.length;
    if (localFilters.experienceLevel && localFilters.experienceLevel.length > 0)
      count += localFilters.experienceLevel.length;
    if (localFilters.remote) count++;
    return count;
  };

  const activeCount = getActiveFilterCount();

  const jobTypes = ['full-time', 'part-time', 'contract', 'internship'];
  const experienceLevels = ['entry', 'mid', 'senior', 'lead'];

  const panelContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FilterIcon className="h-5 w-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">
            {t('browse.filters.title')}
          </h3>
          {activeCount > 0 && (
            <Badge variant="primary" className="ml-2">
              {activeCount}
            </Badge>
          )}
        </div>

        {/* Mobile Close Button */}
        {onMobileClose && (
          <button
            onClick={onMobileClose}
            className="lg:hidden p-2 -m-2 text-gray-500 hover:text-gray-700"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Keyword Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('browse.filters.keyword')}
        </label>
        <Input
          type="text"
          value={localFilters.keyword || ''}
          onChange={(e) => handleKeywordChange(e.target.value)}
          placeholder={t('landing.hero.searchPlaceholder')}
          className="w-full"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('browse.filters.location')}
        </label>
        <Input
          type="text"
          value={localFilters.location || ''}
          onChange={(e) => handleLocationChange(e.target.value)}
          placeholder={t('landing.hero.locationPlaceholder')}
          className="w-full"
        />
      </div>

      {/* Job Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('browse.filters.jobType')}
        </label>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={localFilters.jobType?.includes(type) || false}
                onChange={() => handleJobTypeToggle(type)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {t(`browse.filters.types.${type.replace('-', '')}`)}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('browse.filters.experienceLevel')}
        </label>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <label key={level} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={localFilters.experienceLevel?.includes(level) || false}
                onChange={() => handleExperienceLevelToggle(level)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {t(`browse.filters.levels.${level}`)}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Remote Only */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={localFilters.remote || false}
            onChange={handleRemoteToggle}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            {t('browse.filters.remote')}
          </span>
        </label>
      </div>

      {/* Clear Filters */}
      {activeCount > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handleClear}
            className="w-full"
          >
            {t('browse.filters.clear')}
          </Button>
        </div>
      )}
    </div>
  );

  // Mobile: Full-screen overlay
  if (isMobileOpen) {
    return (
      <div className="fixed inset-0 z-50 lg:hidden">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onMobileClose}
        />

        {/* Panel */}
        <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto">
          <div className="p-6">{panelContent}</div>
        </div>
      </div>
    );
  }

  // Desktop: Sidebar
  return (
    <div
      className={`
        bg-white rounded-xl border border-gray-200 p-6
        ${className}
      `}
    >
      {panelContent}
    </div>
  );
};
