import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { PublicPostsList } from './PublicPostsList';

describe('PublicPostsList Component', () => {
  class MockIntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

  it('renders posts and skeleton when fetching', () => {
    const mockPosts = [{ id: '1', title: 'Post 1', authorConfig: { name: 'A' } }];
    const { container } = render(
      <PublicPostsList posts={mockPosts as any} hasNextPage={true} isFetchingNextPage={true} />,
    );
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });
});
