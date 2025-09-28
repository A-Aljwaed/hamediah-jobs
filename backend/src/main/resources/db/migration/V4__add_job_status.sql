-- Add status column to job table
ALTER TABLE job ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'DRAFT';

-- Create index for status filtering
CREATE INDEX IF NOT EXISTS idx_job_status ON job(status);

-- Update existing jobs to be published
UPDATE job SET status = 'PUBLISHED' WHERE status = 'DRAFT';