import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Briefcase, Clock, DollarSign, Bookmark, Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { JobExtended } from '../types';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

interface JobCardProps {
  job: JobExtended;
  onSave?: (jobId: number) => void;
  isSaved?: boolean;
  variant?: 'default' | 'compact';
  className?: string;
}

export const JobCard: React.FC<JobCardProps> = React.memo(
  ({ job, onSave, isSaved = false, variant = 'default', className = '' }) => {
    const { t, i18n } = useTranslation('jobs');
    const isRTL = i18n.language === 'ar';

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

    const postedDate = formatDistanceToNow(new Date(job.createdAt), { addSuffix: true });

    return (
      <div
        className={`
          bg-white rounded-xl border border-gray-200 
          hover:border-primary-300 hover:shadow-md 
          transition-all duration-200 
          ${className}
        `}
      >
        <div className={`p-6 ${variant === 'compact' ? 'space-y-3' : 'space-y-4'}`}>
          {/* Header: Company Logo + Badges */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              {/* Company Logo */}
              {job.company && (
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-gray-400" />
                </div>
              )}

              {/* Job Title & Company */}
              <div className="flex-1 min-w-0">
                <Link
                  to={`/jobs/${job.id}`}
                  className="block group"
                >
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {job.title}
                  </h3>
                </Link>
                {job.company && (
                  <p className="text-sm text-gray-600 mt-1">{job.company.name}</p>
                )}
              </div>
            </div>

            {/* Save Button */}
            {onSave && (
              <button
                onClick={() => onSave(job.id)}
                className={`
                  flex-shrink-0 p-2 rounded-lg transition-colors
                  ${
                    isSaved
                      ? 'text-primary-600 bg-primary-50 hover:bg-primary-100'
                      : 'text-gray-400 hover:text-primary-600 hover:bg-gray-50'
                  }
                `}
                aria-label={isSaved ? t('card.saved') : t('card.save')}
              >
                <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {job.featured && (
              <Badge variant="primary" className="gap-1">
                <Star className="h-3 w-3" />
                {t('card.featured')}
              </Badge>
            )}
            {job.hot && (
              <Badge variant="danger" className="gap-1">
                {t('card.hot')}
              </Badge>
            )}
            {job.remote && (
              <Badge variant="success" className="gap-1">
                {t('card.remote')}
              </Badge>
            )}
            {job.jobType && (
              <Badge variant="secondary">
                {t(`browse.filters.types.${job.jobType.replace('-', '')}`, job.jobType)}
              </Badge>
            )}
          </div>

          {/* Description */}
          {variant === 'default' && (
            <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
          )}

          {/* Job Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            {job.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{job.location}</span>
              </div>
            )}

            {formatSalary() && (
              <div className="flex items-center gap-1.5">
                <DollarSign className="h-4 w-4 flex-shrink-0" />
                <span>{formatSalary()}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>{postedDate}</span>
            </div>
          </div>

          {/* Skills (if available) */}
          {job.skills && job.skills.length > 0 && variant === 'default' && (
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 5).map((skill, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 5 && (
                <span className="px-2.5 py-1 text-gray-600 text-xs">
                  +{job.skills.length - 5} more
                </span>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Link to={`/jobs/${job.id}`} className="flex-1">
              <Button variant="primary" size="sm" className="w-full">
                {t('card.viewDetails')}
              </Button>
            </Link>
            <Link to={`/jobs/${job.id}#apply`}>
              <Button variant="outline" size="sm">
                {t('card.apply')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
);

JobCard.displayName = 'JobCard';
