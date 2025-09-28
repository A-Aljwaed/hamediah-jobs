import axios from 'axios';
import { Job, Company } from '../types';

const API_BASE = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const jobService = {
  async getJobs(query?: string): Promise<Job[]> {
    const response = await api.get('/jobs', {
      params: query ? { q: query } : {}
    });
    return response.data;
  },

  async getJob(id: number): Promise<Job> {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  async createJob(jobData: {
    title: string;
    description: string;
    location: string;
    tags: string;
    companyId: number;
  }): Promise<Job> {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },

  async updateJob(id: number, jobData: {
    title: string;
    description: string;
    location: string;
    tags: string;
  }): Promise<Job> {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  async deleteJob(id: number): Promise<void> {
    await api.delete(`/jobs/${id}`);
  },
};

export const applicationService = {
  async submitApplication(applicationData: {
    jobId: number;
    applicantName: string;
    applicantEmail: string;
    coverLetter: string;
    resumeUrl: string;
  }): Promise<any> {
    const response = await api.post('/applications', applicationData);
    return response.data;
  },

  async checkIfApplied(jobId: number, email: string): Promise<boolean> {
    try {
      const response = await api.get('/applications/check', {
        params: { jobId, email }
      });
      return response.data.hasApplied;
    } catch (error) {
      return false;
    }
  },

  async getApplicationsForJob(jobId: number): Promise<any[]> {
    const response = await api.get(`/applications/job/${jobId}`);
    return response.data;
  },
};

export const companyService = {
  async getCompanies(): Promise<Company[]> {
    const response = await api.get('/companies');
    return response.data;
  },

  async getCompany(id: number): Promise<Company> {
    const response = await api.get(`/companies/${id}`);
    return response.data;
  },
};

export default api;