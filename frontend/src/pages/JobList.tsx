import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Job } from '../types';
import { jobService } from '../services/api';

const JobList: React.FC = () => {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const loadJobs = async (searchQuery?: string) => {
    try {
      setLoading(true);
      const data = await jobService.getJobs(searchQuery);
      setJobs(data);
      setError(null);
    } catch (err) {
      setError('Failed to load jobs');
      console.error('Error loading jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadJobs(query || undefined);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">{t('jobs.list.title')}</h1>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          placeholder={t('jobs.search.placeholder')}
        />
        <button 
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          {t('jobs.search.button')}
        </button>
      </form>

      <div className="grid gap-3">
        {jobs.length === 0 ? (
          <p className="text-gray-600">{t('jobs.empty')}</p>
        ) : (
          jobs.map((job) => (
            <article key={job.id} className="p-4 bg-white border rounded">
              <div className="flex justify-between">
                <h2 className="font-semibold text-lg">
                  <Link 
                    to={`/jobs/${job.id}`}
                    className="hover:underline"
                  >
                    {job.title}
                  </Link>
                </h2>
                <span className="text-xs text-gray-500">
                  {formatDate(job.createdAt)}
                </span>
              </div>
              <p className="text-gray-700">
                <span>{job.company?.name || '—'}</span>
                <span> · </span>
                <span>{job.location || '—'}</span>
              </p>
              <p className="text-gray-600 line-clamp-2">
                {truncateText(job.description, 160)}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default JobList;