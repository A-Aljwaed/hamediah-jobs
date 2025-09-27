import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Job } from '../types';
import { jobService, applicationService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const JobDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [applicationData, setApplicationData] = useState({
    applicantName: user?.username || '',
    applicantEmail: user?.email || '',
    coverLetter: '',
    resumeUrl: ''
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await jobService.getJob(parseInt(id));
        setJob(data);
        
        // Check if user has already applied
        if (isAuthenticated && user) {
          const applied = await applicationService.checkIfApplied(parseInt(id), user.email);
          setHasApplied(applied);
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to load job details');
        console.error('Error loading job:', err);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id, isAuthenticated, user]);

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }
    setShowApplyForm(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job || !user) return;

    setSubmitLoading(true);
    try {
      await applicationService.submitApplication({
        jobId: job.id,
        ...applicationData
      });
      setHasApplied(true);
      setShowApplyForm(false);
      alert('Application submitted successfully!');
    } catch (err) {
      alert('Failed to submit application. Please try again.');
      console.error('Error submitting application:', err);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load job</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link to="/jobs" className="btn-primary">
          Back to Jobs
        </Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Job not found</h3>
        <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
        <Link to="/jobs" className="btn-primary">
          Browse Other Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm">
        <Link 
          to="/jobs" 
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('jobs.back')}
        </Link>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 font-medium truncate">{job.title}</span>
      </nav>
      
      {/* Job Header */}
      <div className="card p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m-5 0h2m7-4h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m-2 0h-4m-2 0H7a2 2 0 00-2 2v8a2 2 0 002 2h2" />
                </svg>
                <span className="font-medium text-lg">{job.company?.name || 'Company'}</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{job.location || 'Remote'}</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Full-time</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[200px]">
            {hasApplied ? (
              <div className="flex items-center justify-center px-6 py-3 bg-green-50 text-green-700 border border-green-200 rounded-xl font-medium">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Application Submitted
              </div>
            ) : (
              <button
                onClick={handleApply}
                className="btn-primary text-lg px-8 py-4 shadow-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Apply Now
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            )}
            
            <button className="btn-secondary px-6 py-3">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Save Job
            </button>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
          <div 
            dangerouslySetInnerHTML={{ 
              __html: job.description.replace(/\n/g, '<br/>') 
            }}
          />
        </div>
      </div>

      {showApplyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Apply for {job.title}</h2>
              <button
                onClick={() => setShowApplyForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmitApplication} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={applicationData.applicantName}
                  onChange={(e) => setApplicationData({...applicationData, applicantName: e.target.value})}
                  className="input-field"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={applicationData.applicantEmail}
                  onChange={(e) => setApplicationData({...applicationData, applicantEmail: e.target.value})}
                  className="input-field"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
                <textarea
                  value={applicationData.coverLetter}
                  onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                  className="input-field resize-none h-32"
                  placeholder="Tell us why you're the perfect fit for this role..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resume URL <span className="text-gray-400">(optional)</span></label>
                <input
                  type="url"
                  value={applicationData.resumeUrl}
                  onChange={(e) => setApplicationData({...applicationData, resumeUrl: e.target.value})}
                  className="input-field"
                  placeholder="https://your-resume-link.com"
                />
              </div>
              
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    'Submit Application'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplyForm(false)}
                  className="px-6 btn-secondary"
                  disabled={submitLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;