import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ToastContainer } from './ToastContainer';

const mockToasts = [
  { id: '1', type: 'info', message: 'Test Info' },
  { id: '2', type: 'error', message: 'Test Error' },
];

vi.mock('@/infra/store/toast.adapter', () => ({
  useToastStore: (selector: any) => {
    // Mock the specific slice selector
    return mockToasts;
  },
}));

describe('ToastContainer Component', () => {
  it('renders all active toasts from the store', () => {
    // Arrange & Act
    render(<ToastContainer />);
    
    // Assert
    expect(screen.getByText('Test Info')).toBeInTheDocument();
    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });
});
