import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { usePostDetail } from './usePostDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getPostDetail } from '../api/get-post-detail.api';

vi.mock('../api/get-post-detail.api', () => ({
  getPostDetail: vi.fn(),
}));

describe('usePostDetail Hook', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('does not fetch when id is empty', () => {
    // Arrange & Act
    const { result } = renderHook(() => usePostDetail(''), { wrapper });

    // Assert
    expect(result.current.isPending).toBe(true);
    expect(result.current.fetchStatus).toBe('idle');
    expect(getPostDetail).not.toHaveBeenCalled();
  });

  it('fetches post detail when id is provided', async () => {
    // Arrange
    const mockPost = { id: '1', title: 'Post 1' };
    vi.mocked(getPostDetail).mockResolvedValueOnce(mockPost as any);

    // Act
    const { result } = renderHook(() => usePostDetail('1'), { wrapper });

    // Assert
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockPost);
    });
    expect(getPostDetail).toHaveBeenCalledWith('1');
  });
});
