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
  createdAt: string;
  updatedAt?: string;
}