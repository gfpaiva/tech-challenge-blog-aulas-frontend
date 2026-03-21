import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { usePublicPosts } from '../../hooks/usePublicPosts';
import { useSearchPosts } from '../../hooks/useSearchPosts';

import { PublicPostsContainer } from './PublicPostsContainer';

vi.mock('../../hooks/usePublicPosts');
vi.mock('../../hooks/useSearchPosts');
vi.mock('../PublicPostsList/PublicPostsList', () => ({ PublicPostsList: () => <div>PublicPostsList Mock</div> }));
vi.mock('../PostSearchInput/PostSearchInput', () => ({ PostSearchInput: () => <div>PostSearchInput Mock</div> }));
vi.mock('../SearchEmptyState/SearchEmptyState', () => ({ SearchEmptyState: () => <div>SearchEmptyState Mock</div> }));
vi.mock('../PostCard/PostCard', () => ({ PostCard: ({ post }: any) => <div>PostCard Mock - {post.title}</div> }));

describe('PublicPostsContainer Component', () => {
  beforeEach(() => {
    vi.mocked(usePublicPosts).mockReturnValue({
      data: { pages: [{ data: [{ id: '1', title: 'List Post' }] }] },
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    } as any);

    vi.mocked(useSearchPosts).mockReturnValue({
      data: undefined,
      isFetching: false,
    } as any);
  });

  it('renders main list by default', () => {
    render(<PublicPostsContainer initialData={{ data: [], meta: {} as any }} />);
    expect(screen.getByText('PublicPostsList Mock')).toBeInTheDocument();
    expect(screen.getByText('PostSearchInput Mock')).toBeInTheDocument();
  });
});
