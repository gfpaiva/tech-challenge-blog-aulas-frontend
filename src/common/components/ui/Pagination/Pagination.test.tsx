import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
  it('returns null if totalPages <= 1', () => {
    // Arrange & Act
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
    );
    
    // Assert
    expect(container).toBeEmptyDOMElement();
  });

  it('renders basic pagination without dots when totalPages <= 7', () => {
    // Arrange & Act
    render(<Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />);
    
    // Assert
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.queryByText('...')).not.toBeInTheDocument();
    expect(screen.getByText('Anterior')).not.toBeDisabled();
    expect(screen.getByText('Próxima')).not.toBeDisabled();
  });

  it('renders correctly for many pages (e.g., ellipses in the middle)', () => {
    // Arrange & Act
    render(<Pagination currentPage={5} totalPages={10} onPageChange={() => {}} />);
    
    // Assert
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    // At page 5, we should see dots both before and after
    expect(screen.getAllByText('...')).toHaveLength(2);
  });

  it('disables "Anterior" on first page', () => {
    // Arrange & Act
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
    
    // Assert
    expect(screen.getByText('Anterior')).toBeDisabled();
  });

  it('disables "Próxima" on last page', () => {
    // Arrange & Act
    render(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />);
    
    // Assert
    expect(screen.getByText('Próxima')).toBeDisabled();
  });

  it('calls onPageChange when a page number is clicked', () => {
    // Arrange
    const onPageChangeMock = vi.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChangeMock} />);
    
    // Act
    fireEvent.click(screen.getByText('4'));
    
    // Assert
    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });

  it('calls onPageChange when Next or Previous is clicked', () => {
    // Arrange
    const onPageChangeMock = vi.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChangeMock} />);
    
    // Act
    fireEvent.click(screen.getByText('Próxima'));
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
    
    fireEvent.click(screen.getByText('Anterior'));
    expect(onPageChangeMock).toHaveBeenCalledWith(1);
  });
});
