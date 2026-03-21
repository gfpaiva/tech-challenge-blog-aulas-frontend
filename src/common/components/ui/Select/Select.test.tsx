import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Select } from './Select';

describe('Select Component', () => {
  it('renders correctly with options', () => {
    // Arrange & Act
    render(
      <Select data-testid="select">
        <option value="1">One</option>
        <option value="2">Two</option>
      </Select>,
    );

    // Assert
    const select = screen.getByTestId('select');
    expect(select).toBeInTheDocument();
    expect(select.children).toHaveLength(2);
    expect(select).toHaveClass('select', 'select-bordered', 'w-full');
  });

  it('applies error class when error prop is true', () => {
    // Arrange & Act
    render(
      <Select data-testid="error-select" error>
        <option>Test</option>
      </Select>,
    );

    // Assert
    const select = screen.getByTestId('error-select');
    expect(select).toHaveClass('select-error');
  });

  it('applies custom className correctly', () => {
    // Arrange & Act
    render(
      <Select data-testid="custom-select" className="my-test-class">
        <option>Test</option>
      </Select>,
    );

    // Assert
    const select = screen.getByTestId('custom-select');
    expect(select).toHaveClass('my-test-class');
  });
});
