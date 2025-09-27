# Hamediah Jobs — React Frontend + Spring Boot API (EN/AR)

Indeed-ähnliche Jobplattform mit React Frontend, Spring Boot REST API, PostgreSQL, OpenSearch, SendGrid.

## Architecture

### Frontend (React)
- React 18, TypeScript, React Router
- Tailwind CSS, i18n EN/AR support, WCAG AA
- Responsive design with RTL support for Arabic

### Backend (Spring Boot API)
- Java 17, Spring Boot 3 (Web, Security, Validation, Mail, Data JPA, Flyway, Actuator)
- REST API endpoints under `/api/**`
- PostgreSQL, OpenSearch, Mailpit (dev), ClamAV
- CORS enabled for React frontend

## Development

### Prerequisites
- Java 17+
- Node.js 18+
- Docker & Docker Compose

### Quick Start

1. Start required services:
```bash
docker compose up -d postgres
```

2. Start backend (port 8080):
```bash
cd backend
mvn spring-boot:run
```

3. Start frontend (port 3000):
```bash
cd frontend
npm install
npm start
```

### API Endpoints
- `GET /api/jobs` - List jobs (with optional search query)
- `GET /api/jobs/{id}` - Get job details

The frontend communicates with the backend via REST API calls.

## Features
- ✅ Modern React frontend with TypeScript
- ✅ REST API backend
- ✅ Bilingual support (English/Arabic) with RTL layout
- ✅ Job search and filtering
- ✅ Responsive design with Tailwind CSS
- ✅ Cross-origin resource sharing (CORS) configured
- ✅ Production-ready build process

