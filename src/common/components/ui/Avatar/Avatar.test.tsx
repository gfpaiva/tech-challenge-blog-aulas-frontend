import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar Component', () => {
  it('renders image when src is provided', () => {
    // Arrange & Act
    render(<Avatar src="https://example.com/avatar.png" alt="Test User" />);
    
    // Assert
    const img = screen.getByRole('img', { name: 'Test User' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.png');
  });

  it('renders initials when src is not provided', () => {
    // Arrange & Act
    render(<Avatar initials="GP" />);
    
    // Assert
    const initials = screen.getByText('GP');
    expect(initials).toBeInTheDocument();
  });

  it('renders default initial "A" when no src and no initials are provided', () => {
    // Arrange & Act
    render(<Avatar />);
    
    // Assert
    const initials = screen.getByText('A');
    expect(initials).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    // Arrange & Act
    const { container } = render(<Avatar size="lg" />);
    
    // Assert
    const innerDiv = container.querySelector('.avatar > div');
    expect(innerDiv).toHaveClass('w-16', 'h-16', 'text-lg');
  });

  it('applies correct shape classes', () => {
    // Arrange & Act
    const { container } = render(<Avatar shape="square" />);
    
    // Assert
    const innerDiv = container.querySelector('.avatar > div');
    expect(innerDiv).toHaveClass('rounded-xl');
  });
});
