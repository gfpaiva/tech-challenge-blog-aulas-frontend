import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { PostForm, PostFormSkeleton } from './PostForm';

describe('PostForm Component', () => {
  const mockForm = {
    register: vi.fn(),
    formState: { errors: {} }
  };

  it('renders form elements', () => {
    render(
      <PostForm 
        form={mockForm as any} 
        onSubmit={vi.fn()} 
        isPending={false} 
      />
    );
    expect(screen.getByText('Nova Aula')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Publicar Aula' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ex: Introdução à Gramática')).toBeInTheDocument();
  });

  it('shows loading state when pending', () => {
    const { container } = render(
      <PostForm 
        form={mockForm as any} 
        onSubmit={vi.fn()} 
        isPending={true} 
      />
    );
    expect(container.querySelector('.loading-spinner')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders skeleton', () => {
    const { container } = render(<PostFormSkeleton />);
    expect(container.querySelector('.flex')).toBeInTheDocument();
  });
});
