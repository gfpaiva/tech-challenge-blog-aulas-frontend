import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Header } from './Header';

// Mock routing and ThemeToggle since it connects to a store
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

vi.mock('../ThemeToggle/ThemeToggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Theme Toggle</button>,
}));

describe('Header Component', () => {
  it('renders logo and navigation links', () => {
    // Arrange & Act
    render(<Header />);

    // Assert
    expect(screen.getByRole('link', { name: /blog aulas/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Início' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Aulas' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Área Docente' })).toBeInTheDocument();
  });

  it('renders ThemeToggle', () => {
    // Arrange & Act
    render(<Header />);

    // Assert
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });
});
