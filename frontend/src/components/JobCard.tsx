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
      className="animate-fade-in hover:shadow-lg transition-all duration-200"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
          {/* Job Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3 gap-4">
              <h2 className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                <Link 
                  to={`/jobs/${job.id}`}
                  className="block"
                >
                  {job.title}
                </Link>
              </h2>
              <div className="flex items-center gap-1 text-sm text-gray-500 whitespace-nowrap">
                <Icon name="calendar" size="16" />
                <span className="hidden sm:inline">{formatDate(job.createdAt)}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mb-3 text-gray-600">
              <div className="flex items-center gap-1">
                <Icon name="building" size="16" />
                <span className="font-medium">{job.company?.name || '—'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="location" size="16" />
                <span>{job.location || '—'}</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
              {truncateText(job.description, 200)}
            </p>
            
            {/* Job Tags */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Full-time</Badge>
              <Badge variant="success">Remote</Badge>
              <Badge variant="primary">Senior Level</Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 lg:items-end w-full lg:w-auto">
            <Button asChild className="w-full lg:w-auto">
              <Link to={`/jobs/${job.id}`}>
                <Icon name="arrow-right" size="16" className="mr-2" />
                View Details
              </Link>
            </Button>
            <Button 
              variant="secondary" 
              className="gap-2 w-full lg:w-auto group"
              onClick={() => onSaveJob?.(job.id)}
            >
              <Icon 
                name="heart" 
                size="16" 
                className={`transition-all ${isSaved ? 'fill-red-500 text-red-500' : 'group-hover:scale-110'}`}
              />
              {isSaved ? 'Saved' : 'Save Job'}
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
