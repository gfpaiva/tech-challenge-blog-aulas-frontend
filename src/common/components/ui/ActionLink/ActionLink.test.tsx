import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ActionLink } from './ActionLink';

describe('ActionLink Component', () => {
  it('renders component with provided text and href', () => {
    // Arrange & Act
    render(<ActionLink href="/test-path" text="Click Me" />);
    
    // Assert
    const link = screen.getByRole('link', { name: /click me/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test-path');
  });

  it('applies custom className correctly', () => {
    // Arrange & Act
    render(<ActionLink href="/another-path" text="Go" className="custom-link-class" />);
    
    // Assert
    const link = screen.getByRole('link', { name: /go/i });
    expect(link).toHaveClass('custom-link-class');
  });
});
