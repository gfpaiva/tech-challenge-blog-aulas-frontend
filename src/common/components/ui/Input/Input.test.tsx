import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Input } from './Input';

describe('Input Component', () => {
  it('renders correctly with default props', () => {
    // Arrange & Act
    render(<Input placeholder="Test input" />);
    
    // Assert
    const input = screen.getByPlaceholderText('Test input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('input', 'input-bordered', 'w-full');
  });

  it('applies error class when error prop is true', () => {
    // Arrange & Act
    render(<Input data-testid="error-input" error />);
    
    // Assert
    const input = screen.getByTestId('error-input');
    expect(input).toHaveClass('input-error');
  });

  it('applies custom className correctly', () => {
    // Arrange & Act
    render(<Input data-testid="custom-input" className="custom-test-class" />);
    
    // Assert
    const input = screen.getByTestId('custom-input');
    expect(input).toHaveClass('custom-test-class');
  });
});
