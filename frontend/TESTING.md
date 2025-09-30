# Testing Documentation

This document outlines the testing strategy and setup for the Hamediah Jobs frontend application.

## Testing Stack

### Unit and Integration Testing
- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing utilities for React components
- **@testing-library/user-event**: User interaction simulation
- **@testing-library/jest-dom**: Custom Jest matchers for DOM testing

### End-to-End Testing
- **Playwright**: Cross-browser end-to-end testing framework
- **Multiple browsers**: Chromium, Firefox, WebKit
- **Mobile testing**: iPhone and Android device simulation

## Test Structure

### Unit Tests
Located in `src/**/__tests__/` directories, following the pattern:
- `ComponentName.test.tsx` for React components
- `utilityName.test.ts` for utility functions

### Integration Tests
Test component interactions and data flow between multiple components.

### End-to-End Tests
Located in `e2e/` directory, testing complete user workflows:
- `job-search.spec.ts`: Job search and application flows
- `admin.spec.ts`: Admin panel functionality

## Running Tests

### Unit and Integration Tests
```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### End-to-End Tests
```bash
# Run all e2e tests
npm run test:e2e

# Run e2e tests with UI mode
npm run test:e2e:ui

# Run e2e tests in headed mode (visible browser)
npm run test:e2e:headed
```

## Test Coverage

### Current Coverage Targets
- **Branches**: 50%
- **Functions**: 50%
- **Lines**: 50%
- **Statements**: 50%

### Key Components Tested

#### UI Components
- **Button**: All variants, states, and interactions
- **Input**: Form validation, accessibility, and user interactions
- **Card**: Layout and content rendering
- **Badge**: Different variants and styling

#### Feature Components
- **JobApplication**: Authentication gating, file upload, form validation
- **AdvancedSearch**: Search filters, user interactions, state management
- **AdminDashboard**: Role-based access, data display
- **ContentModeration**: Content review workflows

#### Utilities
- **File Validation**: Security checks, file type validation
- **Rate Limiting**: Request throttling and user feedback
- **Security Middleware**: Input sanitization and CSRF protection

## Testing Best Practices

### Unit Tests
1. **Test behavior, not implementation**: Focus on what the component does, not how it does it
2. **Use descriptive test names**: Clearly describe what is being tested
3. **Arrange, Act, Assert**: Structure tests with clear setup, action, and verification phases
4. **Mock external dependencies**: Isolate components from external services
5. **Test accessibility**: Ensure components work with screen readers and keyboard navigation

### Integration Tests
1. **Test user workflows**: Simulate real user interactions
2. **Test component communication**: Verify data flow between components
3. **Test error handling**: Ensure graceful error states
4. **Test loading states**: Verify proper loading indicators

### End-to-End Tests
1. **Test critical user paths**: Focus on the most important user journeys
2. **Test across browsers**: Ensure compatibility with different browsers
3. **Test responsive design**: Verify functionality on different screen sizes
4. **Test authentication flows**: Verify login/logout and role-based access

## Mocking Strategy

### API Calls
- Mock HTTP requests using Jest mocks
- Provide realistic response data
- Test both success and error scenarios

### External Libraries
- Mock complex libraries (react-google-recaptcha, react-hot-toast)
- Provide simplified implementations for testing
- Focus on testing integration points

### Browser APIs
- Mock localStorage, sessionStorage
- Mock file upload APIs
- Mock intersection and resize observers

## Accessibility Testing

### Automated Testing
- Use @testing-library/jest-dom matchers for accessibility
- Test ARIA attributes and roles
- Verify keyboard navigation

### Manual Testing
- Test with screen readers
- Verify color contrast
- Test keyboard-only navigation

## Performance Testing

### Component Performance
- Test rendering performance with large datasets
- Verify proper memoization and optimization
- Test loading states and skeleton components

### E2E Performance
- Monitor page load times
- Test with slow network conditions
- Verify proper caching strategies

## Continuous Integration

### Pre-commit Hooks
- Run unit tests before commits
- Ensure code coverage thresholds are met
- Run linting and formatting checks

### CI Pipeline
- Run full test suite on pull requests
- Generate coverage reports
- Run e2e tests on staging environment

## Test Data Management

### Mock Data
- Use realistic but anonymized data
- Maintain consistent test data across tests
- Provide data factories for complex objects

### Test Database
- Use separate test database for integration tests
- Reset database state between test runs
- Seed with consistent test data

## Debugging Tests

### Unit Tests
- Use `screen.debug()` to inspect rendered DOM
- Use `--verbose` flag for detailed output
- Use Jest's `--detectOpenHandles` for async issues

### E2E Tests
- Use Playwright's trace viewer for debugging
- Enable video recording for failed tests
- Use `--headed` mode to watch tests run

## Security Testing

### Input Validation
- Test XSS prevention
- Test SQL injection prevention
- Test file upload security

### Authentication
- Test unauthorized access attempts
- Test session management
- Test role-based permissions

## Internationalization Testing

### Language Support
- Test UI with different languages
- Test RTL (right-to-left) layouts
- Test text expansion and contraction

### Cultural Considerations
- Test date and number formatting
- Test currency display
- Test cultural color meanings

## Future Improvements

### Testing Enhancements
1. **Visual Regression Testing**: Add screenshot comparison tests
2. **Performance Monitoring**: Integrate performance metrics
3. **Accessibility Automation**: Add automated accessibility scanning
4. **API Contract Testing**: Implement contract testing with backend
5. **Load Testing**: Add performance testing under load

### Tool Upgrades
1. **Testing Library Updates**: Keep testing libraries up to date
2. **Playwright Features**: Utilize new Playwright capabilities
3. **Jest Extensions**: Add custom Jest matchers for domain-specific testing
4. **Coverage Tools**: Enhance coverage reporting and visualization

This testing strategy ensures comprehensive coverage of the application while maintaining fast feedback loops and reliable test execution.
