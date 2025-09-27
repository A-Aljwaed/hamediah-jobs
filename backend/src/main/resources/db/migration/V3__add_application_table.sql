-- Add the new application table to match our domain model
CREATE TABLE IF NOT EXISTS application (
    id              BIGSERIAL PRIMARY KEY,
    job_id          BIGINT NOT NULL REFERENCES job(id) ON DELETE CASCADE,
    applicant_email VARCHAR(255) NOT NULL,
    applicant_name  VARCHAR(255) NOT NULL,
    cover_letter    TEXT,
    resume_url      VARCHAR(500),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_application_job_id ON application(job_id);
CREATE INDEX IF NOT EXISTS idx_application_email_job ON application(applicant_email, job_id);