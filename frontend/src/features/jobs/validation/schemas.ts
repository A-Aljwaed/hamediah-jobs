/**
 * Validation Schemas for Jobs Feature
 * Using Zod for runtime type checking and form validation
 */

import { z } from 'zod';

// Job Post Form Schema
export const postJobSchema = z.object({
  // Job Info
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .min(30, 'Description must be at least 30 characters')
    .max(5000, 'Description must be less than 5000 characters'),
  location: z.string()
    .min(2, 'Location is required')
    .max(100, 'Location must be less than 100 characters'),
  jobType: z.enum(['full-time', 'part-time', 'contract', 'internship']),
  experienceLevel: z.enum(['entry', 'mid', 'senior', 'lead']),
  salaryMin: z.number()
    .min(0, 'Salary must be positive')
    .optional()
    .nullable(),
  salaryMax: z.number()
    .min(0, 'Salary must be positive')
    .optional()
    .nullable(),
  salaryCurrency: z.string()
    .optional()
    .default('USD'),
  remote: z.boolean().default(false),
  skills: z.array(z.string()).min(1, 'At least one skill is required').max(20),
  benefits: z.array(z.string()).optional(),
  applicationDeadline: z.string().optional().nullable(),
  
  // Company Info
  companyName: z.string()
    .min(2, 'Company name is required')
    .max(100, 'Company name must be less than 100 characters'),
  companyWebsite: z.string()
    .url('Invalid website URL')
    .optional()
    .or(z.literal('')),
  
  // Recruiter Info
  recruiterName: z.string()
    .min(2, 'Recruiter name is required')
    .max(100, 'Recruiter name must be less than 100 characters'),
  recruiterEmail: z.string()
    .email('Invalid email address'),
  recruiterPhone: z.string()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
}).refine(
  (data) => {
    if (data.salaryMin && data.salaryMax) {
      return data.salaryMax >= data.salaryMin;
    }
    return true;
  },
  {
    message: 'Maximum salary must be greater than minimum salary',
    path: ['salaryMax'],
  }
);

export type PostJobFormData = z.infer<typeof postJobSchema>;

// Job Filter Schema
export const jobFilterSchema = z.object({
  keyword: z.string().optional(),
  location: z.string().optional(),
  category: z.array(z.string()).optional(),
  jobType: z.array(z.string()).optional(),
  experienceLevel: z.array(z.string()).optional(),
  salaryMin: z.number().min(0).optional(),
  salaryMax: z.number().min(0).optional(),
  remote: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export type JobFilterFormData = z.infer<typeof jobFilterSchema>;

// Application Schema (for future use)
export const applicationSchema = z.object({
  jobId: z.number(),
  applicantName: z.string()
    .min(2, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  applicantEmail: z.string().email('Invalid email address'),
  phone: z.string()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
  coverLetter: z.string()
    .max(2000, 'Cover letter must be less than 2000 characters')
    .optional(),
  resumeUrl: z.string().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
