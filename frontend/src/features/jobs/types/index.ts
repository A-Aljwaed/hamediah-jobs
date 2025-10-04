/**
 * Domain Types for Jobs Feature
 * Extends base Job type with additional fields for UI module
 */

import { Job as BaseJob, Company } from '../../../types';

export interface JobExtended extends BaseJob {
  salary?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  jobType?: 'full-time' | 'part-time' | 'contract' | 'internship';
  experienceLevel?: 'entry' | 'mid' | 'senior' | 'lead';
  remote?: boolean;
  featured?: boolean;
  hot?: boolean;
  applicationDeadline?: string;
  skills?: string[];
  benefits?: string[];
  postedBy?: string;
  viewCount?: number;
  applicationCount?: number;
}

export interface JobCategory {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  count: number;
  description?: string;
}

export interface JobFilters {
  keyword?: string;
  location?: string;
  category?: string[];
  jobType?: string[];
  experienceLevel?: string[];
  salaryMin?: number;
  salaryMax?: number;
  remote?: boolean;
  featured?: boolean;
}

export interface PaginationParams {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export interface JobsResponse {
  content: JobExtended[];
  pagination: PaginationParams;
}

export interface PostJobFormData {
  // Job Info
  title: string;
  description: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  remote: boolean;
  skills: string[];
  benefits?: string[];
  applicationDeadline?: string;
  
  // Company Info
  companyId?: number;
  companyName?: string;
  companyWebsite?: string;
  companyLogo?: File;
  
  // Recruiter Info
  recruiterName: string;
  recruiterEmail: string;
  recruiterPhone?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  company: string;
  avatar: string;
  text: string;
  textAr: string;
  rating: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  currency: string;
  period: string;
  periodAr: string;
  features: string[];
  featuresAr: string[];
  featured?: boolean;
  cta: string;
  ctaAr: string;
}

export interface BlogTeaser {
  id: number;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  image: string;
  author: string;
  date: string;
  category: string;
  categoryAr: string;
  readTime: number;
}
