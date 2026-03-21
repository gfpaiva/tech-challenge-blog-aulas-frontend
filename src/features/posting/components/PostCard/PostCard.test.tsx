import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PostCard, PostCardSkeleton } from './PostCard';

describe('PostCard Component', () => {
  const mockPost = {
    id: 'post-1',
    title: 'Test Post Title',
    summary: 'Test summary for the post card.',
    category: 'REACT',
    thumbnailUrl: 'thumb.jpg',
    publishedAt: '10/10/2023',
    authorId: 'auth-1',
    authorConfig: { name: 'Author Name', avatarUrl: '' },
  };

  it('renders post details correctly', () => {
    render(<PostCard post={mockPost as any} />);

    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    expect(screen.getByText('Test summary for the post card.')).toBeInTheDocument();
    expect(screen.getByText('REACT')).toBeInTheDocument();
    expect(screen.getByText('10/10/2023')).toBeInTheDocument();
    expect(screen.getByText('Author Name')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Capa da aula/i })).toHaveAttribute('src', 'thumb.jpg');
  });

  it('renders skeleton correctly', () => {
    const { container } = render(<PostCardSkeleton />);
    expect(container.querySelector('.card')).toBeInTheDocument();
  });
});
