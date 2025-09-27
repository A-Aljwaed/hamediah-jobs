import axios from 'axios';
import { Job } from '../types';

const API_BASE = 'http://localhost:8080/api';

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
};

export default api;