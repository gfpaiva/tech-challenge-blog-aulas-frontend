import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Toast } from './Toast';

// Mock the Zustand store manually
const mockRemove = vi.fn();
vi.mock('@/infra/store/toast.adapter', () => ({
  useToastStore: (selector: any) => {
    // Always return our mockRemove for any selected state for the sake of tests
    return mockRemove;
  },
}));

describe('Toast Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders success toast correctly', () => {
    // Arrange
    const toastMock = { id: '1', type: 'success' as const, message: 'Success msg' };
    
    // Act
    render(<Toast toast={toastMock} />);
    
    // Assert
    expect(screen.getByText('Success msg')).toBeInTheDocument();
    // Because it's a success toast, it should have alert-success class
    expect(screen.getByText('Success msg').parentElement).toHaveClass('alert-success');
  });

  it('calls removeToast when close button is clicked', () => {
    // Arrange
    const toastMock = { id: '2', type: 'error' as const, message: 'Error msg' };
    render(<Toast toast={toastMock} />);
    
    // Act
    const closeBtn = screen.getByRole('button');
    fireEvent.click(closeBtn);
    
    // Assert
    expect(mockRemove).toHaveBeenCalledWith('2');
  });

  it('calls setTimeout to auto-remove toast based on duration', async () => {
    // Arrange
    vi.useFakeTimers();
    const toastMock = { id: '3', type: 'info' as const, message: 'Auto close', duration: 1000 };
    render(<Toast toast={toastMock} />);
    
    // Act
    vi.advanceTimersByTime(1000);
    
    // Assert
    expect(mockRemove).toHaveBeenCalledWith('3');
    vi.useRealTimers();
  });
});
