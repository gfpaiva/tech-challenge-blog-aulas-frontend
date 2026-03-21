import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSearchPosts } from './useSearchPosts';
import { searchPosts } from '../api/search-posts.api';
import React from 'react';

// Mock API call
vi.mock('../api/search-posts.api', () => ({
  searchPosts: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useSearchPosts Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('runs query when string length is >= 3', async () => {
    (searchPosts as any).mockResolvedValue({ data: [], meta: { total: 0 } });

    const { result } = renderHook(() => useSearchPosts('React'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(searchPosts).toHaveBeenCalledWith({ q: 'React' });
  });

  it('does NOT run query if string length is < 3', () => {
    const { result } = renderHook(() => useSearchPosts('Re'), {
      wrapper: createWrapper(),
    });

    // Its fetchStatus should be 'idle' indicating it is disabled
    expect(result.current.fetchStatus).toBe('idle');
    expect(searchPosts).not.toHaveBeenCalled();
  });
});
