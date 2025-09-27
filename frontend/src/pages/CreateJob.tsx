import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { jobService, companyService } from '../services/api';
import { Company } from '../types';

const CreateJob: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    tags: '',
    companyId: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const loadCompanies = async () => {
      try {
        const data = await companyService.getCompanies();
        setCompanies(data);
      } catch (err) {
        console.error('Error loading companies:', err);
      }
    };

    loadCompanies();
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await jobService.createJob({
        ...jobData,
        companyId: parseInt(jobData.companyId)
      });
      navigate('/jobs');
    } catch (err) {
      alert('Failed to create job. Please try again.');
      console.error('Error creating job:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value
    });
  };

  if (!isAuthenticated) {
    return <div className="text-center py-8">Redirecting to login...</div>;
  }

  return (
    <section className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Create New Job</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Job Title</label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <select
            name="companyId"
            value={jobData.companyId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select a company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., Remote, New York, NY"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          <input
            type="text"
            name="tags"
            value={jobData.tags}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., JavaScript, React, Full-time"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Job Description</label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 h-48"
            placeholder="Describe the role, responsibilities, requirements..."
            required
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Job'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/jobs')}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateJob;