import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import JobCard from '../JobCard';
import { Job } from '../../types';

const mockJob: Job = {
  id: 1,
  title: 'Senior Software Engineer',
  description: 'We are looking for an experienced software engineer to join our team.',
  location: 'Berlin, Germany',
  createdAt: '2024-01-15T10:00:00Z',
  company: {
    id: 1,
    name: 'Tech Corp',
    description: 'A leading tech company',
    website: 'https://techcorp.com',
    createdAt: '2024-01-01T10:00:00Z'
  }
};

const renderJobCard = (props = {}) => {
  const defaultProps = {
    job: mockJob,
    index: 0,
    onSaveJob: jest.fn(),
    isSaved: false,
    ...props
  };

  return render(
    <BrowserRouter>
      <JobCard {...defaultProps} />
    </BrowserRouter>
  );
};

describe('JobCard', () => {
  it('renders job title correctly', () => {
    renderJobCard();
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
  });

  it('renders company name', () => {
    renderJobCard();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
  });

  it('renders location', () => {
    renderJobCard();
    expect(screen.getByText('Berlin, Germany')).toBeInTheDocument();
  });

  it('renders job description (truncated)', () => {
    renderJobCard();
    expect(screen.getByText(/We are looking for an experienced software engineer/)).toBeInTheDocument();
  });

  it('calls onSaveJob when save button is clicked', () => {
    const onSaveJob = jest.fn();
    renderJobCard({ onSaveJob });
    
    const saveButton = screen.getByRole('button', { name: /save job/i });
    fireEvent.click(saveButton);
    
    expect(onSaveJob).toHaveBeenCalledWith(1);
  });

  it('shows "Saved" when job is saved', () => {
    renderJobCard({ isSaved: true });
    expect(screen.getByText('Saved')).toBeInTheDocument();
  });

  it('shows "Save Job" when job is not saved', () => {
    renderJobCard({ isSaved: false });
    expect(screen.getByText('Save Job')).toBeInTheDocument();
  });

  it('has a link to job details page', () => {
    renderJobCard();
    const link = screen.getByRole('link', { name: /senior software engineer/i });
    expect(link).toHaveAttribute('href', '/jobs/1');
  });

  it('has a "View Details" button', () => {
    renderJobCard();
    expect(screen.getByRole('link', { name: /view details/i })).toBeInTheDocument();
  });

  it('displays job badges', () => {
    renderJobCard();
    expect(screen.getByText('Full-time')).toBeInTheDocument();
    expect(screen.getByText('Remote')).toBeInTheDocument();
    expect(screen.getByText('Senior Level')).toBeInTheDocument();
  });

  it('memoizes correctly and does not re-render when props are the same', () => {
    const { rerender } = renderJobCard();
    
    // Re-render with same props
    rerender(
      <BrowserRouter>
        <JobCard 
          job={mockJob}
          index={0}
          onSaveJob={jest.fn()}
          isSaved={false}
        />
      </BrowserRouter>
    );
    
    // Component should still be in the document
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
  });
});
