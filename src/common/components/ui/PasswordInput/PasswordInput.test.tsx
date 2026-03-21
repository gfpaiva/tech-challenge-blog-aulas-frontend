import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PasswordInput } from './PasswordInput';

describe('PasswordInput Component', () => {
  it('renders initial input with type="password"', () => {
    // Arrange & Act
    render(<PasswordInput placeholder="Enter password" />);

    // Assert
    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
  });

  it('toggles password visibility when toggle button is clicked', () => {
    // Arrange
    render(<PasswordInput placeholder="Enter password" />);
    const input = screen.getByPlaceholderText('Enter password');
    const toggleBtn = screen.getByLabelText('Mostrar senha');

    // Act - Show
    fireEvent.click(toggleBtn);

    // Assert
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText('Esconder senha')).toBeInTheDocument();

    // Act - Hide
    fireEvent.click(screen.getByLabelText('Esconder senha'));

    // Assert
    expect(input).toHaveAttribute('type', 'password');
    expect(screen.getByLabelText('Mostrar senha')).toBeInTheDocument();
  });
});
