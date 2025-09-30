import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdvancedSearch from '../AdvancedSearch';

// Mock debounce to make tests synchronous
jest.mock('lodash.debounce', () => (fn: any) => fn);

describe('AdvancedSearch Component', () => {
  const mockOnSearch = jest.fn();
  const mockOnResultsChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all search fields', () => {
    render(
      <AdvancedSearch 
        onSearch={mockOnSearch}
        onResultsChange={mockOnResultsChange}
      />
    );

    expect(screen.getByPlaceholderText(/search jobs/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/location/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/company/i)).toBeInTheDocument();
    expect(screen.getByText(/job type/i)).toBeInTheDocument();
    expect(screen.getByText(/experience level/i)).toBeInTheDocument();
  });

  it('handles basic search input', async () => {
    const user = userEvent.setup();
    render(
      <AdvancedSearch 
        onSearch={mockOnSearch}
        onResultsChange={mockOnResultsChange}
      />
    );

    const searchInput = screen.getByPlaceholderText(/search jobs/i);
    await user.type(searchInput, 'developer');

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          query: 'developer'
        })
      );
    });
  });

  it('handles location search', async () => {
    const user = userEvent.setup();
    render(
      <AdvancedSearch 
        onSearch={mockOnSearch}
        onResultsChange={mockOnResultsChange}
      />
    );

    const locationInput = screen.getByPlaceholderText(/location/i);
    await user.type(locationInput, 'San Francisco');

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          location: 'San Francisco'
        })
      );
    });
  });

  it('handles company search', async () => {
    const user = userEvent.setup();
    render(
      <AdvancedSearch 
        onSearch={mockOnSearch}
        onResultsChange={mockOnResultsChange}
      />
    );

    const companyInput = screen.getByPlaceholderText(/company/i);
    await user.type(companyInput, 'Google');

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          company: 'Google'
        })
      );
    });
  });

  it('handles job type selection', async () => {
    const user = userEvent.setup();
    render(
      <AdvancedSearch 
        onSearch={mockOnSearch}
        onResultsChange={mockOnResultsChange}
      />
    );

    const fullTimeCheckbox = screen.getByLabelText(/full.?time/i);
    await user.click(fullTimeCheckbox);

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          jobType: ['Full-time']
        })
      );
    });
  });

  it('handles multiple job type selections', async () => {
    const user = userEvent.setup();
    render(
      <AdvancedSearch 
        onSearch={mockOnSearch}
        onResultsChange={mockOnResultsChange}
      />
    );

    const fullTimeCheckbox = screen.getByLabelText(/full.?time/i);
    const partTimeCheckbox = screen.getByLabelText(/part.?time/i);
    
    await user.click(fullTimeCheckbox);
    await user.click(partTimeCheckbox);

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          jobType: expect.arrayContaining(['Full-time', 'Part-time'])
        })
      );
    });
  });

  it('handles experience level selection', async () => {
    const user = userEvent.setup();
    render(
      <AdvancedSearch 
        onSearch={mockOnSearch}
        onResultsChange={mockOnResultsChange}
      />
    );

    const seniorCheckbox = screen.getByLabelText(/senior/i);
    await user.click(seniorCheckbox);

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          experienceLevel: ['Senior Level']
        })
      );
    });
  });

  it('handles salary range adjustment', async () => {
    const user = userEvent.setup();
    render(
      <AdvancedSearch 
        onSearch={mockOnSearch}
        onResultsChange={mockOnResultsChange}
      />
    );

    // Look for salary range inputs
    const minSalaryInput = screen.getByDisplayValue('0');
    const maxSalaryInput = screen.getByDisplayValue('200000');

    await user.clear(minSalaryInput);
    await user.type(minSalaryInput, '50000');

    await user.clear(maxSalaryInput);
    await user.type(maxSalaryInput, '100000');

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          salaryRange: {
            min: 50000,
            max: 100000
          }
        })
      );
    });
  });

  it('handles remote work toggle', async () => {
    const user = userEvent.setup();
    render(
      <AdvancedSearch 
        onSearch={mockOnSearch}
        onResultsChange={mockOnResultsChange}
      />
    );

    const remoteCheckbox = screen.getByLabelText(/remote work/i);
    await user.click(remoteCheckbox);

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          remoteWork: true
        })
      );
    });
  });

  it('handles date posted filter', async () => {
    const user = userEvent.setup();
    render(
      <AdvancedSearch 
        onSearch={mockOnSearch}
        onResultsChange={mockOnResultsChange}
      />
    );

    const dateSelect = screen.getByDisplayValue(/any time/i);
    await user.selectOptions(dateSelect, 'last_week');

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          datePosted: 'last_week'
        })
      );
    });
  });

  it('handles skill tags addition', async () => {
    const user = userEvent.setup();
    render(
      <AdvancedSearch 
        onSearch={mockOnSearch}
        onResultsChange={mockOnResultsChange}
      />
    );

    const skillInput = screen.getByPlaceholderText(/add skills/i);
    await user.type(skillInput, 'React');
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          skills: ['React']
        })
      );
    });

    // Should show the skill tag
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('handles skill tags removal', async () => {
    const user = userEvent.setup();
    render(
      <AdvancedSearch 
        onSearch={mockOnSearch}
        onResultsChange={mockOnResultsChange}
      />
    );

    // Add a skill first
    const skillInput = screen.getByPlaceholderText(/add skills/i);
    await user.type(skillInput, 'React');
    await user.keyboard('{Enter}');

    // Remove the skill
    const removeButton = screen.getByRole('button', { name: /remove react/i });
    await user.click(removeButton);

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          skills: []
        })
      );
    });

    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });

  it('handles industry selection', async () => {
    const user = userEvent.setup();
    render(
      <AdvancedSearch 
        onSearch={mockOnSearch}
        onResultsChange={mockOnResultsChange}
      />
    );

    const technologyCheckbox = screen.getByLabelText(/technology/i);
    await user.click(technologyCheckbox);

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          industry: ['Technology']
        })
      );
    });
  });

  it('shows and hides advanced filters', async () => {
    const user = userEvent.setup();
    render(
      <AdvancedSearch 
        onSearch={mockOnSearch}
        onResultsChange={mockOnResultsChange}
      />
    );

    // Advanced filters should be hidden initially
    expect(screen.queryByText(/salary range/i)).not.toBeInTheDocument();

    // Show advanced filters
    const showAdvancedButton = screen.getByText(/show advanced/i);
    await user.click(showAdvancedButton);

    expect(screen.getByText(/salary range/i)).toBeInTheDocument();

    // Hide advanced filters
    const hideAdvancedButton = screen.getByText(/hide advanced/i);
    await user.click(hideAdvancedButton);

    expect(screen.queryByText(/salary range/i)).not.toBeInTheDocument();
  });

  it('clears all filters', async () => {
    const user = userEvent.setup();
    render(
      <AdvancedSearch 
        onSearch={mockOnSearch}
        onResultsChange={mockOnResultsChange}
      />
    );

    // Add some filters
    const searchInput = screen.getByPlaceholderText(/search jobs/i);
    await user.type(searchInput, 'developer');

    const locationInput = screen.getByPlaceholderText(/location/i);
    await user.type(locationInput, 'San Francisco');

    // Clear all filters
    const clearButton = screen.getByRole('button', { name: /clear all/i });
    await user.click(clearButton);

    expect(searchInput).toHaveValue('');
    expect(locationInput).toHaveValue('');

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          query: '',
          location: '',
          company: '',
          jobType: [],
          experienceLevel: [],
          skills: [],
          industry: [],
          remoteWork: false,
          datePosted: 'any'
        })
      );
    });
  });

  it('shows search history', async () => {
    const user = userEvent.setup();
    render(
      <AdvancedSearch 
        onSearch={mockOnSearch}
        onResultsChange={mockOnResultsChange}
      />
    );

    // Perform a search to add to history
    const searchInput = screen.getByPlaceholderText(/search jobs/i);
    await user.type(searchInput, 'developer');

    // Look for search history
    const historyButton = screen.getByText(/recent searches/i);
    await user.click(historyButton);

    // Should show recent search
    expect(screen.getByText('developer')).toBeInTheDocument();
  });

  it('applies initial filters correctly', () => {
    const initialFilters = {
      query: 'engineer',
      location: 'New York',
      jobType: ['Full-time'],
      remoteWork: true
    };

    render(
      <AdvancedSearch 
        onSearch={mockOnSearch}
        onResultsChange={mockOnResultsChange}
        initialFilters={initialFilters}
      />
    );

    expect(screen.getByDisplayValue('engineer')).toBeInTheDocument();
    expect(screen.getByDisplayValue('New York')).toBeInTheDocument();
    expect(screen.getByLabelText(/full.?time/i)).toBeChecked();
    expect(screen.getByLabelText(/remote work/i)).toBeChecked();
  });

  it('handles loading state', () => {
    render(
      <AdvancedSearch 
        onSearch={mockOnSearch}
        onResultsChange={mockOnResultsChange}
        loading={true}
      />
    );

    // Search button should show loading state
    expect(screen.getByText(/searching/i)).toBeInTheDocument();
  });
});
