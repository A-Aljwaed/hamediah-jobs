import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../types';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';

interface JobCardProps {
  job: Job;
  index?: number;
  onSaveJob?: (jobId: number) => void;
  isSaved?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, index = 0, onSaveJob, isSaved = false }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <Card 
      variant="interactive" 
      className="animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <CardContent className="p-5">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
          {/* Job Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2 gap-4">
              <h2 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                <Link 
                  to={`/jobs/${job.id}`}
                  className="block"
                >
                  {job.title}
                </Link>
              </h2>
              <div className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap">
                <Icon name="calendar" size="16" className="hidden sm:inline" />
                <span className="hidden sm:inline">{formatDate(job.createdAt)}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mb-3 text-gray-600 text-sm">
              <div className="flex items-center gap-1.5">
                <Icon name="building" size="16" className="text-gray-400" />
                <span className="font-medium">{job.company?.name || '—'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="location" size="16" className="text-gray-400" />
                <span>{job.location || '—'}</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-3 leading-relaxed line-clamp-3 text-sm">
              {truncateText(job.description, 200)}
            </p>
            
            {/* Job Tags */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="default" className="text-xs">Full-time</Badge>
              <Badge variant="success" className="text-xs">Remote</Badge>
              <Badge variant="primary" className="text-xs">Senior Level</Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 lg:items-end w-full lg:w-auto">
            <Button asChild size="sm" className="w-full lg:w-auto">
              <Link to={`/jobs/${job.id}`}>
                View Details
              </Link>
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              className="gap-1.5 w-full lg:w-auto group"
              onClick={() => onSaveJob?.(job.id)}
            >
              <Icon 
                name="heart" 
                size="16" 
                className={`transition-all ${isSaved ? 'fill-red-500 text-red-500' : ''}`}
              />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(JobCard, (prevProps, nextProps) => {
  return (
    prevProps.job.id === nextProps.job.id &&
    prevProps.isSaved === nextProps.isSaved &&
    prevProps.index === nextProps.index
  );
});
