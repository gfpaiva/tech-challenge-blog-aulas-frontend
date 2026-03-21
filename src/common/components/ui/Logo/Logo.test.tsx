import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Logo } from './Logo';

describe('Logo Component', () => {
  it('renders the logo text and links to home', () => {
    // Arrange & Act
    render(<Logo />);
    
    // Assert
    const link = screen.getByRole('link', { name: /blog aulas/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
    
    const text = screen.getByText('Blog Aulas');
    expect(text).toBeInTheDocument();
  });

  it('renders the Next Image inside the logo', () => {
    // Arrange & Act
    render(<Logo />);
    
    // Assert
    const img = screen.getByRole('img', { name: /blog aulas/i });
    expect(img).toBeInTheDocument();
    // In JSDOM, next/image renders slightly differently depending on setup,
    // but the alt text is consistently applied to the image element
  });

  it('applies custom className', () => {
    // Arrange & Act
    render(<Logo className="text-xl" />);
    
    // Assert
    const link = screen.getByRole('link', { name: /blog aulas/i });
    expect(link).toHaveClass('text-xl');
  });
});
