-- Seed companies
INSERT INTO company (name, website)
VALUES
    ('Hamediah', 'https://hamediah.example'),
    ('Acme Corp', 'https://acme.example')
    ON CONFLICT (name) DO NOTHING;

-- Seed user (admin@example.com / password)
-- BCrypt-Hash für "password" (z. B. mit cost=10). Bei Bedarf austauschen.
INSERT INTO app_user (email, password_hash, full_name, role, enabled)
VALUES
    ('admin@example.com', '$2a$10$9bObcCkMIQF0Xy8X5dHcLe4n1r1uJr7q1k6R1a0rVpyW2o0i8Uq2S', 'Admin User', 'ADMIN', TRUE)
    ON CONFLICT (email) DO NOTHING;

-- Seed jobs (referenzen per Subquery)
INSERT INTO job (title, description, location, tags, company_id, created_by)
VALUES
    ('Java Backend Engineer',
     'Build APIs with Spring Boot and PostgreSQL.',
     'Berlin',
     'java,spring,backend',
     (SELECT id FROM company WHERE name = 'Hamediah'),
     (SELECT id FROM app_user WHERE email = 'admin@example.com')),
    ('Frontend Developer',
     'Work with React and accessibility best practices.',
     'Remote',
     'frontend,react,accessibility',
     (SELECT id FROM company WHERE name = 'Acme Corp'),
     (SELECT id FROM app_user WHERE email = 'admin@example.com'));