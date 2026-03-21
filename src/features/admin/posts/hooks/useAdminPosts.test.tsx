import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { getAdminPosts } from '../api/get-admin-posts';

import { useAdminPosts } from './useAdminPosts';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
  usePathname: vi.fn(),
}));

vi.mock('../api/get-admin-posts', () => ({
  getAdminPosts: vi.fn(),
}));

describe('useAdminPosts Hook', () => {
  let queryClient: QueryClient;
  let mockReplace: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    mockReplace = vi.fn();
    vi.mocked(useRouter).mockReturnValue({ replace: mockReplace } as any);
    vi.mocked(usePathname).mockReturnValue('/admin/dashboard');
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams('') as any);

    vi.mocked(getAdminPosts).mockResolvedValue({
      data: [{ id: '1', title: 'Test Post', subject: 'Math', date: '01/01/2023' }],
      meta: { total: 1, page: 1, lastPage: 1 },
    });

    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('fetches posts correctly based on default search params', async () => {
    // Arrange & Act
    const { result } = renderHook(() => useAdminPosts(), { wrapper });

    // Assert
    await waitFor(() => {
      expect(result.current.posts).toHaveLength(1);
    });
    expect(result.current.meta.total).toBe(1);
    expect(getAdminPosts).toHaveBeenCalledWith({ q: '', limit: 10, page: 1 });
  });

  it('updates search and resets page', () => {
    // Arrange
    const { result } = renderHook(() => useAdminPosts(), { wrapper });

    // Act
    result.current.searchState.updateSearch('query test');

    // Assert
    expect(mockReplace).toHaveBeenCalledWith('/admin/dashboard?q=query+test&page=1');
  });

  it('updates pagination', () => {
    // Arrange
    const { result } = renderHook(() => useAdminPosts(), { wrapper });

    // Act
    result.current.paginationState.setPage(3);

    // Assert
    expect(mockReplace).toHaveBeenCalledWith('/admin/dashboard?page=3');
  });
});
