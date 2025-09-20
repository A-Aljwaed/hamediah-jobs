# Hamediah Jobs — Spring Boot Monolith (EN/AR)

Indeed-ähnliche Jobplattform mit Spring Boot, PostgreSQL, OpenSearch, Thymeleaf (SSR), SendGrid.

## Stack
- Java 21, Spring Boot 3 (Web, Security, Validation, Mail, Data JPA, Flyway, Actuator)
- PostgreSQL, OpenSearch, Mailpit (dev), ClamAV
- Thymeleaf, Tailwind (CDN), I18n EN/AR, WCAG AA
- Docker Compose, GitHub Actions CI

## Schnellstart (Dev)
Voraussetzungen: Docker, Docker Compose, Java 21, Maven

1. System vorbereiten (Linux):
   sysctl -w vm.max_map_count=262144
2. Services starten:
   docker compose up -d
3. App starten (erstes Setup migriert DB):
   cd backend
   mvn spring-boot:run
4. Öffnen: http://localhost:8080

Mail (dev): http://localhost:8025 (Mailpit UI)

## Umgebungsvariablen (dev)
- POSTGRES_USER=jobs
- POSTGRES_PASSWORD=jobs
- POSTGRES_DB=jobs
- SPRING_PROFILES_ACTIVE=dev

## Produktion
- Nginx Reverse Proxy auf hamediah.aljwaed.de → App (Port 8080)
- TLS via Let’s Encrypt (Certbot/NGINX Proxy Manager)
- SendGrid SMTP konfigurieren, Tageslimit in der App aktiv
- Datenpersistenz: Postgres Volume, Uploads Volume, OpenSearch Volume

## OpenSearch Index
Siehe: ops/opensearch/jobs-index.json (Analyzer EN/AR, Autocomplete)

## Nächste Schritte
- Repo anlegen (z. B. `hamediah-jobs`)
- Diese Dateien pushen
- GitHub Actions aktiviert lassen (CI)
- Features iterativ nach Milestones umsetzen