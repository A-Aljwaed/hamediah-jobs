import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Job } from '../types';
import { jobService } from '../services/api';

const JobDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJob = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await jobService.getJob(parseInt(id));
        setJob(data);
        setError(null);
      } catch (err) {
        setError('Failed to load job details');
        console.error('Error loading job:', err);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (!job) {
    return <div className="text-center py-8">Job not found</div>;
  }

  return (
    <section className="space-y-3">
      <p className="text-sm">
        <Link 
          to="/jobs" 
          className="text-gray-600 hover:underline"
        >
          {t('jobs.back')}
        </Link>
      </p>
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-gray-700">
        <span>{job.company?.name || '—'}</span>
        <span> · </span>
        <span>{job.location || '—'}</span>
      </p>
      <article className="prose max-w-none">
        <div 
          dangerouslySetInnerHTML={{ 
            __html: job.description.replace(/\n/g, '<br/>') 
          }}
        />
      </article>
    </section>
  );
};

export default JobDetail;