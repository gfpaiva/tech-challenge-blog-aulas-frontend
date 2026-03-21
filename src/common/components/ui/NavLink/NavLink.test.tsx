import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavLink } from './NavLink';

// Mock usePathname to test active states
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

import { usePathname } from 'next/navigation';

describe('NavLink Component', () => {
  it('renders correctly', () => {
    // Arrange
    vi.mocked(usePathname).mockReturnValue('/other-path');
    
    // Act
    render(<NavLink href="/test" text="Test Link" />);
    
    // Assert
    const link = screen.getByRole('link', { name: 'Test Link' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('applies activeClassName when pathname matches href', () => {
    // Arrange
    vi.mocked(usePathname).mockReturnValue('/test');
    
    // Act
    render(<NavLink href="/test" text="Test Link" activeClassName="custom-active" />);
    
    // Assert
    const link = screen.getByRole('link', { name: 'Test Link' });
    expect(link).toHaveClass('custom-active');
  });

  it('applies normal classes when not active', () => {
    // Arrange
    vi.mocked(usePathname).mockReturnValue('/other');
    
    // Act
    render(<NavLink href="/test" text="Test Link" />);
    
    // Assert
    const link = screen.getByRole('link', { name: 'Test Link' });
    expect(link).not.toHaveClass('text-primary', 'font-bold');
    expect(link).toHaveClass('font-medium', 'text-base-content/80', 'hover:text-primary');
  });

  it('ignores active tracking when hasActiveHighlight is false', () => {
    // Arrange
    vi.mocked(usePathname).mockReturnValue('/test');
    
    // Act
    render(<NavLink href="/test" text="Test Link" hasActiveHighlight={false} />);
    
    // Assert
    const link = screen.getByRole('link', { name: 'Test Link' });
    expect(link).not.toHaveClass('text-primary', 'font-bold');
  });
});
