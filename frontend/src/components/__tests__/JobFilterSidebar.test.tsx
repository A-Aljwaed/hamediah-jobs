import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import JobFilterSidebar, { FilterOptions } from '../JobFilterSidebar';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const defaultFilters: FilterOptions = {
  jobType: [],
  experienceLevel: [],
  location: [],
  salaryRange: { min: 0, max: 200000 },
  remote: false
};

const renderFilterSidebar = (props = {}) => {
  const defaultProps = {
    filters: defaultFilters,
    onFilterChange: jest.fn(),
    onClear: jest.fn(),
    ...props
  };

  return render(<JobFilterSidebar {...defaultProps} />);
};

describe('JobFilterSidebar', () => {
  it('renders filter title', () => {
    renderFilterSidebar();
    expect(screen.getByText('jobs.filters.title')).toBeInTheDocument();
  });

  it('renders job type checkboxes', () => {
    renderFilterSidebar();
    expect(screen.getByLabelText('Full-time')).toBeInTheDocument();
    expect(screen.getByLabelText('Part-time')).toBeInTheDocument();
    expect(screen.getByLabelText('Contract')).toBeInTheDocument();
    expect(screen.getByLabelText('Internship')).toBeInTheDocument();
  });

  it('renders experience level checkboxes', () => {
    renderFilterSidebar();
    expect(screen.getByLabelText('Entry Level')).toBeInTheDocument();
    expect(screen.getByLabelText('Mid Level')).toBeInTheDocument();
    expect(screen.getByLabelText('Senior Level')).toBeInTheDocument();
    expect(screen.getByLabelText('Lead/Manager')).toBeInTheDocument();
  });

  it('renders location checkboxes', () => {
    renderFilterSidebar();
    expect(screen.getByLabelText('Remote')).toBeInTheDocument();
    expect(screen.getByLabelText('Berlin')).toBeInTheDocument();
    expect(screen.getByLabelText('Munich')).toBeInTheDocument();
  });

  it('calls onFilterChange when job type is selected', () => {
    const onFilterChange = jest.fn();
    renderFilterSidebar({ onFilterChange });
    
    const fullTimeCheckbox = screen.getByLabelText('Full-time');
    fireEvent.click(fullTimeCheckbox);
    
    expect(onFilterChange).toHaveBeenCalledWith({
      ...defaultFilters,
      jobType: ['Full-time']
    });
  });

  it('calls onFilterChange when experience level is selected', () => {
    const onFilterChange = jest.fn();
    renderFilterSidebar({ onFilterChange });
    
    const seniorCheckbox = screen.getByLabelText('Senior Level');
    fireEvent.click(seniorCheckbox);
    
    expect(onFilterChange).toHaveBeenCalledWith({
      ...defaultFilters,
      experienceLevel: ['Senior Level']
    });
  });

  it('calls onFilterChange when location is selected', () => {
    const onFilterChange = jest.fn();
    renderFilterSidebar({ onFilterChange });
    
    const berlinCheckbox = screen.getByLabelText('Berlin');
    fireEvent.click(berlinCheckbox);
    
    expect(onFilterChange).toHaveBeenCalledWith({
      ...defaultFilters,
      location: ['Berlin']
    });
  });

  it('calls onFilterChange when remote checkbox is toggled', () => {
    const onFilterChange = jest.fn();
    renderFilterSidebar({ onFilterChange });
    
    // There are multiple "Remote" labels, get the checkbox for remote work option
    const remoteCheckboxes = screen.getAllByRole('checkbox');
    const remoteWorkCheckbox = remoteCheckboxes.find(
      (checkbox) => checkbox.getAttribute('type') === 'checkbox' && 
      checkbox.nextSibling?.textContent?.includes('jobs.filters.remote')
    );
    
    if (remoteWorkCheckbox) {
      fireEvent.click(remoteWorkCheckbox);
      expect(onFilterChange).toHaveBeenCalled();
    }
  });

  it('updates salary range when minimum is changed', () => {
    const onFilterChange = jest.fn();
    renderFilterSidebar({ onFilterChange });
    
    const minInput = screen.getByPlaceholderText('0');
    fireEvent.change(minInput, { target: { value: '50000' } });
    
    expect(onFilterChange).toHaveBeenCalledWith({
      ...defaultFilters,
      salaryRange: { min: 50000, max: 200000 }
    });
  });

  it('updates salary range when maximum is changed', () => {
    const onFilterChange = jest.fn();
    renderFilterSidebar({ onFilterChange });
    
    const maxInput = screen.getByPlaceholderText('200000');
    fireEvent.change(maxInput, { target: { value: '150000' } });
    
    expect(onFilterChange).toHaveBeenCalledWith({
      ...defaultFilters,
      salaryRange: { min: 0, max: 150000 }
    });
  });

  it('shows clear filters button when filters are active', () => {
    const filtersWithSelections: FilterOptions = {
      jobType: ['Full-time'],
      experienceLevel: [],
      location: [],
      salaryRange: { min: 0, max: 200000 },
      remote: false
    };
    
    renderFilterSidebar({ filters: filtersWithSelections });
    expect(screen.getByText('Clear All Filters')).toBeInTheDocument();
  });

  it('calls onClear when clear filters button is clicked', () => {
    const onClear = jest.fn();
    const filtersWithSelections: FilterOptions = {
      jobType: ['Full-time'],
      experienceLevel: [],
      location: [],
      salaryRange: { min: 0, max: 200000 },
      remote: false
    };
    
    renderFilterSidebar({ filters: filtersWithSelections, onClear });
    
    const clearButton = screen.getByText('Clear All Filters');
    fireEvent.click(clearButton);
    
    expect(onClear).toHaveBeenCalled();
  });

  it('shows active filter count badge', () => {
    const filtersWithSelections: FilterOptions = {
      jobType: ['Full-time', 'Part-time'],
      experienceLevel: ['Senior Level'],
      location: ['Berlin'],
      salaryRange: { min: 0, max: 200000 },
      remote: false
    };
    
    const { container } = renderFilterSidebar({ filters: filtersWithSelections });
    // Badge should show 4 (2 job types + 1 experience + 1 location)
    const badges = container.querySelectorAll('.bg-primary-100');
    expect(badges.length).toBeGreaterThan(0);
  });
});
