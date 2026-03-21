import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useTheme } from '@/common/hooks/useTheme';

import { ThemeToggle } from './ThemeToggle';

vi.mock('@/common/hooks/useTheme');

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading spinner when not hydrated', () => {
    // Arrange
    vi.mocked(useTheme).mockReturnValue({
      theme: 'blog',
      toggleTheme: vi.fn(),
      setTheme: vi.fn(),
      isHydrated: false,
    });

    // Act
    render(<ThemeToggle />);

    // Assert
    expect(screen.getByLabelText('Carregando tema')).toBeInTheDocument();
    expect(screen.queryByLabelText('Alternar tema')).not.toBeInTheDocument();
  });

  it('renders moon icon when theme is blog (light)', () => {
    // Arrange
    vi.mocked(useTheme).mockReturnValue({
      theme: 'blog',
      toggleTheme: vi.fn(),
      setTheme: vi.fn(),
      isHydrated: true,
    });

    // Act
    const { container } = render(<ThemeToggle />);

    // Assert
    const btn = screen.getByLabelText('Alternar tema');
    expect(btn).toBeInTheDocument();
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.classList.contains('lucide-moon')).toBeTruthy();
  });

  it('renders sun icon when theme is dark', () => {
    // Arrange
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      toggleTheme: vi.fn(),
      setTheme: vi.fn(),
      isHydrated: true,
    });

    // Act
    const { container } = render(<ThemeToggle />);

    // Assert
    const btn = screen.getByLabelText('Alternar tema');
    expect(btn).toBeInTheDocument();
    const svg = container.querySelector('svg');
    expect(svg?.classList.contains('lucide-sun')).toBeTruthy();
  });

  it('calls toggleTheme when clicked', () => {
    // Arrange
    const toggleSpy = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      theme: 'blog',
      toggleTheme: toggleSpy,
      setTheme: vi.fn(),
      isHydrated: true,
    });

    // Act
    render(<ThemeToggle />);
    fireEvent.click(screen.getByLabelText('Alternar tema'));

    // Assert
    expect(toggleSpy).toHaveBeenCalledTimes(1);
  });
});
