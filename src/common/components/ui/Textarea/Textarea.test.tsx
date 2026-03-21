import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Textarea } from './Textarea';

describe('Textarea Component', () => {
  it('renders correctly with default props', () => {
    // Arrange & Act
    render(<Textarea placeholder="Test area" />);

    // Assert
    const textarea = screen.getByPlaceholderText('Test area');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass('textarea', 'textarea-bordered', 'w-full');
  });

  it('applies error class when error prop is true', () => {
    // Arrange & Act
    render(<Textarea data-testid="error-area" error />);

    // Assert
    const textarea = screen.getByTestId('error-area');
    expect(textarea).toHaveClass('textarea-error');
  });

  it('applies custom className correctly', () => {
    // Arrange & Act
    render(<Textarea data-testid="custom-area" className="my-class" />);

    // Assert
    const textarea = screen.getByTestId('custom-area');
    expect(textarea).toHaveClass('my-class');
  });
});
