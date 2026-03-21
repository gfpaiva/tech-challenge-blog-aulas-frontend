import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { LatestPosts } from './LatestPosts';

describe('LatestPosts Component', () => {
  it('renders a list of posts', () => {
    const mockPosts = [
      { id: '1', title: 'Post 1', authorConfig: { name: 'A1' } },
      { id: '2', title: 'Post 2', authorConfig: { name: 'A2' } },
    ];
    render(<LatestPosts posts={mockPosts as any} />);

    expect(screen.getByText('Últimas Aulas')).toBeInTheDocument();
    expect(screen.getByText('Ver todas')).toBeInTheDocument();
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });
});
