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
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (!job) {
    return <div className="text-center py-8">Job not found</div>;
  }

  return (
    <section className="space-y-6">
      <p className="text-sm">
        <Link 
          to="/jobs" 
          className="text-gray-600 hover:underline"
        >
          {t('jobs.back')}
        </Link>
      </p>
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <p className="text-gray-700 text-lg">
            <span>{job.company?.name || '—'}</span>
            <span> · </span>
            <span>{job.location || '—'}</span>
          </p>
        </div>
        
        <div className="flex gap-2">
          {hasApplied ? (
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded">
              Applied ✓
            </span>
          ) : (
            <button
              onClick={handleApply}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>

      <article className="prose max-w-none">
        <div 
          dangerouslySetInnerHTML={{ 
            __html: job.description.replace(/\n/g, '<br/>') 
          }}
        />
      </article>

      {showApplyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Apply for {job.title}</h2>
            <form onSubmit={handleSubmitApplication} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={applicationData.applicantName}
                  onChange={(e) => setApplicationData({...applicationData, applicantName: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={applicationData.applicantEmail}
                  onChange={(e) => setApplicationData({...applicationData, applicantEmail: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cover Letter</label>
                <textarea
                  value={applicationData.coverLetter}
                  onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                  className="w-full border rounded px-3 py-2 h-32"
                  placeholder="Tell us why you're interested in this position..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Resume URL (optional)</label>
                <input
                  type="url"
                  value={applicationData.resumeUrl}
                  onChange={(e) => setApplicationData({...applicationData, resumeUrl: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {submitLoading ? 'Submitting...' : 'Submit Application'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplyForm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default JobDetail;