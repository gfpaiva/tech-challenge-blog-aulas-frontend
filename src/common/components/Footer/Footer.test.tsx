import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Footer } from './Footer';

// Mock routing components
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('Footer Component', () => {
  it('renders brand logo and description', () => {
    // Arrange & Act
    render(<Footer />);

    // Assert
    const brandLink = screen.getByRole('link', { name: /blog aulas/i });
    expect(brandLink).toBeInTheDocument();
    expect(screen.getByText(/Plataforma educacional focada em compartilhar/)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    // Arrange & Act
    render(<Footer />);

    // Assert
    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Aulas' })).toHaveAttribute('href', '/aulas');
  });

  it('renders copyright with current year', () => {
    // Arrange & Act
    render(<Footer />);

    // Assert
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${year} Blog Aulas`))).toBeInTheDocument();
  });
});
