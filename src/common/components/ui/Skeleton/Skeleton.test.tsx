import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Skeleton } from './Skeleton';

describe('Skeleton Component', () => {
  it('renders correctly with skeleton base class', () => {
    // Arrange & Act
    render(<Skeleton data-testid="skeleton" />);

    // Assert
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('skeleton');
  });

  it('applies custom className correctly and merges', () => {
    // Arrange & Act
    render(<Skeleton data-testid="skeleton-custom" className="w-10 h-10 rounded-full" />);

    // Assert
    const skeleton = screen.getByTestId('skeleton-custom');
    expect(skeleton).toHaveClass('skeleton', 'w-10', 'h-10', 'rounded-full');
  });
});
