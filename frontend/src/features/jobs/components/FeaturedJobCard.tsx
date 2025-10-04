import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Briefcase, DollarSign, Users, Star } from 'lucide-react';
import { JobExtended } from '../types';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

interface FeaturedJobCardProps {
  job: JobExtended;
  className?: string;
}

export const FeaturedJobCard: React.FC<FeaturedJobCardProps> = ({ job, className = '' }) => {
  const { t } = useTranslation('jobs');

  const formatSalary = () => {
    if (!job.salaryMin && !job.salaryMax) return null;
    
    if (job.salaryMin && job.salaryMax) {
      return t('card.salary', {
        min: job.salaryMin.toLocaleString(),
        max: job.salaryMax.toLocaleString(),
        currency: job.salaryCurrency || 'USD',
      });
    }
    
    return t('card.negotiable');
  };

  return (
    <div
      className={`
        relative bg-gradient-to-br from-primary-50 via-white to-primary-50/50
        rounded-2xl border-2 border-primary-200 
        hover:border-primary-300 hover:shadow-lg 
        transition-all duration-200 overflow-hidden
        ${className}
      `}
    >
      {/* Featured Badge */}
      <div className="absolute top-4 right-4 z-10">
        <Badge variant="primary" className="gap-1 shadow-sm">
          <Star className="h-3 w-3 fill-current" />
          {t('card.featured')}
        </Badge>
      </div>

      <div className="p-6 space-y-5">
        {/* Company Logo & Info */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
            <Briefcase className="h-8 w-8 text-primary-600" />
          </div>
          
          <div className="flex-1 min-w-0">
            <Link to={`/jobs/${job.id}`} className="block group">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                {job.title}
              </h3>
            </Link>
            {job.company && (
              <p className="text-base text-gray-600 mt-1.5 font-medium">
                {job.company.name}
              </p>
            )}
          </div>
        </div>

        {/* Job Type & Level Badges */}
        <div className="flex flex-wrap gap-2">
          {job.jobType && (
            <Badge variant="secondary">
              {t(`browse.filters.types.${job.jobType.replace('-', '')}`, job.jobType)}
            </Badge>
          )}
          {job.experienceLevel && (
            <Badge variant="secondary">
              {t(`browse.filters.levels.${job.experienceLevel}`, job.experienceLevel)}
            </Badge>
          )}
          {job.remote && (
            <Badge variant="success">{t('card.remote')}</Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 line-clamp-3">
          {job.description}
        </p>

        {/* Meta Info Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          {job.location && (
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="h-4 w-4 text-primary-500 flex-shrink-0" />
              <span className="truncate font-medium">{job.location}</span>
            </div>
          )}

          {formatSalary() && (
            <div className="flex items-center gap-2 text-gray-700">
              <DollarSign className="h-4 w-4 text-primary-500 flex-shrink-0" />
              <span className="font-medium">{formatSalary()}</span>
            </div>
          )}

          {job.applicationCount !== undefined && (
            <div className="flex items-center gap-2 text-gray-700">
              <Users className="h-4 w-4 text-primary-500 flex-shrink-0" />
              <span>{t('card.applicants', { count: job.applicationCount })}</span>
            </div>
          )}
        </div>

        {/* Skills Tags */}
        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 6).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-white text-gray-700 text-xs font-medium rounded-lg border border-gray-200"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 6 && (
              <span className="px-3 py-1.5 text-gray-600 text-xs font-medium">
                +{job.skills.length - 6}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Link to={`/jobs/${job.id}`} className="flex-1">
            <Button variant="primary" className="w-full">
              {t('card.viewDetails')}
            </Button>
          </Link>
          <Link to={`/jobs/${job.id}#apply`} className="flex-1">
            <Button variant="outline" className="w-full">
              {t('card.apply')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
