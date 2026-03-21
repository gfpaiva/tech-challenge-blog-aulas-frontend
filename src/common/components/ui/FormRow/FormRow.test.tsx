import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FormRow } from './FormRow';

describe('FormRow Component', () => {
  it('renders label and children correctly', () => {
    // Arrange & Act
    render(
      <FormRow label="Test Label">
        <input data-testid="child-input" />
      </FormRow>,
    );

    // Assert
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByTestId('child-input')).toBeInTheDocument();
  });

  it('renders error message when error prop is provided', () => {
    // Arrange & Act
    render(
      <FormRow label="Email" error="Invalid email address">
        <input />
      </FormRow>,
    );

    // Assert
    const errorMessage = screen.getByText('Invalid email address');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-error');
  });

  it('does not render error message when error is undefined', () => {
    // Arrange & Act
    render(
      <FormRow label="Email">
        <input />
      </FormRow>,
    );

    // Assert
    const errorElements = screen.queryByText(/invalid/i);
    expect(errorElements).not.toBeInTheDocument();
  });

  it('applies custom className to the fieldset wrapper', () => {
    // Arrange & Act
    const { container } = render(
      <FormRow label="Custom" className="custom-fieldset">
        <div />
      </FormRow>,
    );

    // Assert
    const fieldset = container.querySelector('div.fieldset');
    expect(fieldset).toHaveClass('custom-fieldset');
  });
});
