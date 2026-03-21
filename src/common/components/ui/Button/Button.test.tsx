import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Button } from './Button';

describe('Button Component', () => {
  it('renders correctly with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('renders with primary variant by default', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toHaveClass('btn-primary');
  });

  it('applies custom variant classes properly', () => {
    render(<Button variant="secondary">Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toHaveClass('btn-secondary');
  });

  it('applies standard sizing classes', () => {
    // lg
    const { rerender } = render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button', { name: /large/i })).toHaveClass('btn-lg');

    // sm
    rerender(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button', { name: /small/i })).toHaveClass('btn-sm');
  });

  it('applies circle prop class properly', () => {
    render(<Button isCircle>O</Button>);
    expect(screen.getByRole('button', { name: /o/i })).toHaveClass('btn-circle');
  });

  it('handles custom classNames properly', () => {
    render(<Button className="custom-test-class">Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toHaveClass('custom-test-class');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button', { name: /click me/i }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
