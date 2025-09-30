import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import JobApplication from '../JobApplication';
import { AuthContext } from '../../contexts/AuthContext';

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

// Mock react-google-recaptcha
jest.mock('react-google-recaptcha', () => {
  return function MockReCAPTCHA({ onChange }: { onChange: (token: string | null) => void }) {
    return (
      <div data-testid="recaptcha">
        <button onClick={() => onChange('mock-token')}>Verify</button>
      </div>
    );
  };
});

// Mock file validation utility
jest.mock('../../utils/fileValidation', () => ({
  validateFile: jest.fn().mockResolvedValue({
    isValid: true,
    errors: [],
    securityChecks: {
      magicNumber: true,
      malwarePatterns: true,
      fileSize: true,
      fileType: true
    }
  })
}));

// Mock rate limiter
jest.mock('../../utils/rateLimiter', () => ({
  checkRateLimit: jest.fn().mockReturnValue({ allowed: true, remaining: 5 })
}));

const mockAuthContextValue = {
  user: {
    id: '1',
    username: 'testuser',
    email: 'test@example.com',
    role: 'user'
  },
  isAuthenticated: true,
  login: jest.fn(),
  logout: jest.fn(),
  loading: false
};

const mockUnauthenticatedContextValue = {
  user: null,
  isAuthenticated: false,
  login: jest.fn(),
  logout: jest.fn(),
  loading: false
};

const renderWithAuth = (component: React.ReactElement, authenticated = true) => {
  const contextValue = authenticated ? mockAuthContextValue : mockUnauthenticatedContextValue;
  
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={contextValue}>
        {component}
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe('JobApplication Component', () => {
  const mockJob = {
    id: '1',
    title: 'Software Engineer',
    company: { name: 'Tech Corp' },
    location: 'San Francisco, CA'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows login required message for unauthenticated users', () => {
    renderWithAuth(<JobApplication job={mockJob} />, false);
    
    expect(screen.getByText('Login Required')).toBeInTheDocument();
    expect(screen.getByText('You need to be logged in to apply for jobs.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  });

  it('renders application form for authenticated users', () => {
    renderWithAuth(<JobApplication job={mockJob} />);
    
    expect(screen.getByText('Apply for Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('at Tech Corp')).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByText(/upload resume/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cover letter/i)).toBeInTheDocument();
  });

  it('pre-fills user information for authenticated users', () => {
    renderWithAuth(<JobApplication job={mockJob} />);
    
    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    renderWithAuth(<JobApplication job={mockJob} />);
    
    const submitButton = screen.getByRole('button', { name: /submit application/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please upload your resume')).toBeInTheDocument();
    });
  });

  it('handles file upload', async () => {
    const user = userEvent.setup();
    renderWithAuth(<JobApplication job={mockJob} />);
    
    const file = new File(['test content'], 'resume.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText(/upload resume/i);
    
    await user.upload(fileInput, file);
    
    await waitFor(() => {
      expect(screen.getByText('resume.pdf')).toBeInTheDocument();
    });
  });

  it('validates file type (PDF only)', async () => {
    const user = userEvent.setup();
    renderWithAuth(<JobApplication job={mockJob} />);
    
    const file = new File(['test content'], 'resume.txt', { type: 'text/plain' });
    const fileInput = screen.getByLabelText(/upload resume/i);
    
    await user.upload(fileInput, file);
    
    await waitFor(() => {
      expect(screen.getByText('Only PDF files are allowed')).toBeInTheDocument();
    });
  });

  it('validates file size (max 5MB)', async () => {
    const user = userEvent.setup();
    renderWithAuth(<JobApplication job={mockJob} />);
    
    // Create a file larger than 5MB
    const largeContent = 'x'.repeat(6 * 1024 * 1024); // 6MB
    const file = new File([largeContent], 'resume.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText(/upload resume/i);
    
    await user.upload(fileInput, file);
    
    await waitFor(() => {
      expect(screen.getByText('File size must be less than 5MB')).toBeInTheDocument();
    });
  });

  it('shows CAPTCHA when required', async () => {
    renderWithAuth(<JobApplication job={mockJob} />);
    
    // CAPTCHA should be visible
    expect(screen.getByTestId('recaptcha')).toBeInTheDocument();
  });

  it('enables submit button only when form is valid', async () => {
    const user = userEvent.setup();
    renderWithAuth(<JobApplication job={mockJob} />);
    
    const submitButton = screen.getByRole('button', { name: /submit application/i });
    expect(submitButton).toBeDisabled();
    
    // Fill required fields
    const file = new File(['test content'], 'resume.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText(/upload resume/i);
    await user.upload(fileInput, file);
    
    // Verify CAPTCHA
    const verifyButton = screen.getByRole('button', { name: /verify/i });
    await user.click(verifyButton);
    
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });

  it('handles form submission successfully', async () => {
    const user = userEvent.setup();
    renderWithAuth(<JobApplication job={mockJob} />);
    
    // Fill form
    const phoneInput = screen.getByLabelText(/phone/i);
    await user.type(phoneInput, '123-456-7890');
    
    const coverLetterInput = screen.getByLabelText(/cover letter/i);
    await user.type(coverLetterInput, 'I am interested in this position.');
    
    // Upload file
    const file = new File(['test content'], 'resume.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText(/upload resume/i);
    await user.upload(fileInput, file);
    
    // Verify CAPTCHA
    const verifyButton = screen.getByRole('button', { name: /verify/i });
    await user.click(verifyButton);
    
    // Submit form
    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /submit application/i });
      expect(submitButton).toBeEnabled();
    });
    
    const submitButton = screen.getByRole('button', { name: /submit application/i });
    await user.click(submitButton);
    
    // Should show loading state
    expect(screen.getByText('Submitting...')).toBeInTheDocument();
  });

  it('handles drag and drop file upload', async () => {
    renderWithAuth(<JobApplication job={mockJob} />);
    
    const dropZone = screen.getByText(/drag and drop your resume here/i).closest('div');
    const file = new File(['test content'], 'resume.pdf', { type: 'application/pdf' });
    
    fireEvent.dragEnter(dropZone!);
    fireEvent.dragOver(dropZone!);
    fireEvent.drop(dropZone!, {
      dataTransfer: {
        files: [file],
      },
    });
    
    await waitFor(() => {
      expect(screen.getByText('resume.pdf')).toBeInTheDocument();
    });
  });

  it('shows file validation status', async () => {
    const user = userEvent.setup();
    renderWithAuth(<JobApplication job={mockJob} />);
    
    const file = new File(['test content'], 'resume.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText(/upload resume/i);
    
    await user.upload(fileInput, file);
    
    await waitFor(() => {
      expect(screen.getByText('Security validation passed')).toBeInTheDocument();
    });
  });

  it('allows file removal', async () => {
    const user = userEvent.setup();
    renderWithAuth(<JobApplication job={mockJob} />);
    
    const file = new File(['test content'], 'resume.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText(/upload resume/i);
    
    await user.upload(fileInput, file);
    
    await waitFor(() => {
      expect(screen.getByText('resume.pdf')).toBeInTheDocument();
    });
    
    const removeButton = screen.getByRole('button', { name: /remove file/i });
    await user.click(removeButton);
    
    expect(screen.queryByText('resume.pdf')).not.toBeInTheDocument();
  });

  it('handles rate limiting', async () => {
    // Mock rate limiter to return not allowed
    const { checkRateLimit } = require('../../utils/rateLimiter');
    checkRateLimit.mockReturnValue({ allowed: false, remaining: 0, resetTime: Date.now() + 60000 });
    
    const user = userEvent.setup();
    renderWithAuth(<JobApplication job={mockJob} />);
    
    const submitButton = screen.getByRole('button', { name: /submit application/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/too many attempts/i)).toBeInTheDocument();
    });
  });
});
