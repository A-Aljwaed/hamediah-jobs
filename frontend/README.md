# Hamediah Jobs Frontend Application

This project is the frontend application for Hamediah Jobs, a modern job board platform. It has undergone a significant modernization effort, focusing on an enhanced user experience, robust security, advanced search capabilities, and comprehensive administrative tools.

## Table of Contents

- [Features](#features)
- [Technical Stack](#technical-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Internationalization](#internationalization)
- [Security](#security)
- [Admin & Moderation](#admin--moderation)
- [Contributing](#contributing)
- [License](#license)

## Features

This application provides a rich set of features for job seekers, employers, and administrators:

- **Modern UI/UX**: A clean, intuitive, and responsive user interface built with a custom design system.
- **Advanced Job Search**: Powerful search and filtering capabilities, including faceted search, location-based search, salary range, job type, experience level, and skill-based filtering.
- **Job Application Flow**: Streamlined application process with resume upload, cover letter, and secure submission.
- **Internationalization (i18n)**: Full support for multiple languages, including Right-to-Left (RTL) layout for Arabic.
- **Robust Security**: Enhanced security measures including CAPTCHA, rate limiting, file upload validation, and input sanitization.
- **Admin Panel**: Comprehensive dashboard for managing jobs, users, and content moderation with role-based access control.
- **Content Moderation**: Automated and manual content flagging, review workflows, and reporting for inappropriate content.
- **Search Analytics**: Insights into trending searches, popular locations, industry demand, and skill impact.
- **User Authentication**: Secure login and registration with role-based access for different user types (job seeker, employer, admin).
- **Responsive Design**: Optimized for seamless experience across various devices (desktop, tablet, mobile).

## Technical Stack

The frontend is built using modern web technologies:

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Craco**: Configuration-over-convention for Create React App, allowing customization without ejecting.
- **React Router DOM**: Declarative routing for React applications.
- **i18next & React-i18next**: Internationalization framework for handling multiple languages.
- **Lucide React**: A collection of beautiful and customizable open-source icons.
- **React Hot Toast**: Lightweight and customizable toast notifications.
- **React Google reCAPTCHA**: Integration for CAPTCHA security.
- **date-fns**: Modern JavaScript date utility library.

## Getting Started

To get the project up and running locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/A-Aljwaed/hamediah-jobs.git
    cd hamediah-jobs/frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

In the project directory, you can run:

-   `npm start`: Runs the app in development mode.
-   `npm run build`: Builds the app for production.
-   `npm test`: Runs all unit and integration tests.
-   `npm run test:watch`: Runs tests in interactive watch mode.
-   `npm run test:coverage`: Runs tests and generates a coverage report.
-   `npm run test:e2e`: Runs end-to-end tests using Playwright.
-   `npm run test:e2e:ui`: Runs end-to-end tests with Playwright UI mode.
-   `npm run test:e2e:headed`: Runs end-to-end tests with a visible browser.
-   `npm run eject`: Ejects the Create React App configuration (use with caution).

## Testing

The project includes a comprehensive testing suite:

-   **Unit & Integration Tests**: Implemented using Jest and React Testing Library for components, utilities, and core logic.
-   **End-to-End (E2E) Tests**: Implemented using Playwright to simulate user flows across different browsers and devices.

For detailed information on the testing strategy, setup, and how to run tests, please refer to the [TESTING.md](TESTING.md) document.

## Deployment

To deploy the application, run `npm run build` to create an optimized production build in the `build` folder. This folder can then be served by any static file server or integrated into a backend application.

## Internationalization

The application supports multiple languages, including English (LTR) and Arabic (RTL). Language switching is available in the UI, and the system automatically detects and applies the correct text direction and translations.

## Security

Security is a top priority. The application incorporates:

-   **File Upload Validation**: Strict checks for file types (PDF only), size limits, magic number verification, and malware pattern detection.
-   **CAPTCHA**: Google reCAPTCHA v2 integration to prevent bot abuse on forms.
-   **Rate Limiting**: Client-side rate limiting on critical actions (e.g., login attempts, job applications) to mitigate brute-force and spam attacks.
-   **Input Sanitization**: Protection against XSS and other injection attacks.
-   **Authentication & Authorization**: Secure user authentication and role-based access control to protect sensitive routes and actions.

## Admin & Moderation

Access to the `/admin` route provides a powerful administrative interface:

-   **Admin Dashboard**: Overview of platform metrics, recent activity, and quick stats.
-   **Job Moderation**: Review, approve, reject, or escalate job postings.
-   **User Management**: Manage user accounts, roles, and statuses (active, suspended, banned).
-   **Content Reports**: Handle flagged content (jobs, user profiles, applications) with automated flagging and manual review workflows.

## Contributing

We welcome contributions to the Hamediah Jobs project! Please refer to our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Hamediah Jobs** - *Your next career starts here.*

