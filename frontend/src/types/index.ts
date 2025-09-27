export interface Company {
  id: number;
  name: string;
  website?: string;
  createdAt: string;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  location?: string;
  tags?: string;
  company?: Company;
  status: 'DRAFT' | 'PUBLISHED' | 'CLOSED';
  createdAt: string;
  updatedAt?: string;
}

export interface Application {
  id: number;
  jobId: number;
  applicantEmail: string;
  applicantName: string;
  coverLetter?: string;
  resumeUrl?: string;
  createdAt: string;
}