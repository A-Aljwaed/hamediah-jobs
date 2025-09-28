import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Job } from '../types';
import { jobService } from '../services/api';

const JobManagement: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'DRAFT' | 'PUBLISHED' | 'CLOSED'>('ALL');

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await jobService.getJobs();
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
    if (isAuthenticated) {
      loadJobs();
    }
  }, [isAuthenticated]);

  const handlePublish = async (jobId: number) => {
    try {
      await jobService.publishJob(jobId);
      loadJobs(); // Refresh the list
    } catch (err) {
      console.error('Error publishing job:', err);
      alert('Failed to publish job');
    }
  };

  const handleUnpublish = async (jobId: number) => {
    try {
      await jobService.unpublishJob(jobId);
      loadJobs(); // Refresh the list
    } catch (err) {
      console.error('Error unpublishing job:', err);
      alert('Failed to unpublish job');
    }
  };

  const handleDelete = async (jobId: number) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await jobService.deleteJob(jobId);
        loadJobs(); // Refresh the list
      } catch (err) {
        console.error('Error deleting job:', err);
        alert('Failed to delete job');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
            Published
          </span>
        );
      case 'DRAFT':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-1.5"></div>
            Draft
          </span>
        );
      case 'CLOSED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5"></div>
            Closed
          </span>
        );
      default:
        return null;
    }
  };

  const filteredJobs = filter === 'ALL' ? jobs : jobs.filter(job => job.status === filter);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-16">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-4">
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">Authentication Required</h3>
          <p className="text-yellow-700 mb-4">Please log in to manage your job postings</p>
          <Link to="/login" className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors duration-200">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 font-medium">Loading your jobs...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
          <p className="text-gray-600 mt-1">Manage your job postings and their publication status</p>
        </div>
        <Link
          to="/create-job"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create New Job
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap gap-2">
          {(['ALL', 'DRAFT', 'PUBLISHED', 'CLOSED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status === 'ALL' ? 'All Jobs' : status.charAt(0) + status.slice(1).toLowerCase()}
              <span className="ml-2 text-sm">
                ({status === 'ALL' ? jobs.length : jobs.filter(job => job.status === status).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-800 text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {filteredJobs.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-50 rounded-lg p-8">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">
                {filter === 'ALL' 
                  ? "You haven't created any job postings yet." 
                  : `No ${filter.toLowerCase()} jobs found.`}
              </p>
              <Link
                to="/create-job"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Create Your First Job
              </Link>
            </div>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      {getStatusBadge(job.status)}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 space-x-4 mb-3">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6" />
                        </svg>
                        {job.company?.name || 'No Company'}
                      </div>
                      {job.location && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </div>
                      )}
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Created {formatDate(job.createdAt)}
                      </div>
                    </div>

                    <p className="text-gray-700 line-clamp-2 mb-4">
                      {job.description.length > 150 
                        ? job.description.substring(0, 150) + '...' 
                        : job.description}
                    </p>

                    {job.tags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags.split(',').slice(0, 3).map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {tag.trim()}
                          </span>
                        ))}
                        {job.tags.split(',').length > 3 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            +{job.tags.split(',').length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-2 ml-4">
                    <Link
                      to={`/jobs/${job.id}`}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </Link>

                    {job.status === 'DRAFT' && (
                      <button
                        onClick={() => handlePublish(job.id)}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-green-600 hover:text-green-800 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Publish
                      </button>
                    )}

                    {job.status === 'PUBLISHED' && (
                      <button
                        onClick={() => handleUnpublish(job.id)}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14L21 3m0 0h-5.5M21 3v5.5M7.5 21L3 16.5m0 0L7.5 12M3 16.5h5.5" />
                        </svg>
                        Unpublish
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(job.id)}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobManagement;