-- Users
CREATE TABLE IF NOT EXISTS app_user (
    id            BIGSERIAL PRIMARY KEY,
    email         VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255)       NOT NULL,
    full_name     VARCHAR(255)       NOT NULL,
    role          VARCHAR(50)        NOT NULL DEFAULT 'USER',
    enabled       BOOLEAN            NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMPTZ        NOT NULL DEFAULT NOW()
);

-- Companies
CREATE TABLE IF NOT EXISTS company (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255) UNIQUE NOT NULL,
    website     VARCHAR(255),
    created_at  TIMESTAMPTZ         NOT NULL DEFAULT NOW()
);

-- Jobs
CREATE TABLE IF NOT EXISTS job (
    id           BIGSERIAL PRIMARY KEY,
    title        VARCHAR(255) NOT NULL,
    description  TEXT         NOT NULL,
    location     VARCHAR(255),
    tags         TEXT,
    company_id   BIGINT REFERENCES company(id) ON DELETE SET NULL,
    created_by   BIGINT REFERENCES app_user(id) ON DELETE SET NULL,
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ
);

-- Applications
CREATE TABLE IF NOT EXISTS job_application (
    id           BIGSERIAL PRIMARY KEY,
    job_id       BIGINT REFERENCES job(id) ON DELETE CASCADE,
    applicant_id BIGINT REFERENCES app_user(id) ON DELETE SET NULL,
    cv_file      VARCHAR(255),
    cover_letter TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_job_created_at ON job(created_at DESC);