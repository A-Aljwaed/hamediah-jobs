/**
 * Validation Schemas for Jobs Feature
 * Using Zod for runtime type checking and form validation
 */

import { z } from 'zod';

// Job Post Form Schema
export const postJobSchema = z.object({
  // Job Info
  title: z.string().min(3).max(100),
  description: z.string().min(30).max(5000),
  location: z.string().min(2).max(100),
  jobType: z.string(),
  experienceLevel: z.string(),
  salaryMin: z.number().min(0).optional().nullable(),
  salaryMax: z.number().min(0).optional().nullable(),
  salaryCurrency: z.string().optional(),
  remote: z.boolean().optional(),
  skills: z.array(z.string()).min(1).max(20),
  benefits: z.array(z.string()).optional(),
  applicationDeadline: z.string().optional().nullable(),
  
  // Company Info
  companyName: z.string().min(2).max(100),
  companyWebsite: z.string().optional(),
  
  // Recruiter Info
  recruiterName: z.string().min(2).max(100),
  recruiterEmail: z.string().email(),
  recruiterPhone: z.string().optional(),
});

export type PostJobFormData = z.infer<typeof postJobSchema>;

// Job Filter Schema (simplified for Zod v4)
export const jobFilterSchema = z.object({
  keyword: z.string().optional(),
  location: z.string().optional(),
  category: z.array(z.string()).optional(),
  jobType: z.array(z.string()).optional(),
  experienceLevel: z.array(z.string()).optional(),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  remote: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export type JobFilterFormData = z.infer<typeof jobFilterSchema>;

// Application Schema (for future use, simplified for Zod v4)
export const applicationSchema = z.object({
  jobId: z.number(),
  applicantName: z.string().min(2).max(100),
  applicantEmail: z.string().email(),
  phone: z.string().optional(),
  coverLetter: z.string().max(2000).optional(),
  resumeUrl: z.string().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
