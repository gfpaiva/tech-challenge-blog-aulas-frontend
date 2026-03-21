import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { createPost } from '../api/create-post.api';

import { useCreatePost } from './useCreatePost';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../api/create-post.api', () => ({
  createPost: vi.fn(),
}));

// Mock toast store
const { mockSuccess, mockError } = vi.hoisted(() => ({
  mockSuccess: vi.fn(),
  mockError: vi.fn(),
}));

vi.mock('@/infra/store/toast.adapter', () => ({
  useToastStore: (selector: any) => {
    const state = { success: mockSuccess, error: mockError };
    return selector(state);
  },
}));

describe('useCreatePost Hook', () => {
  let queryClient: QueryClient;
  let mockPush: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    queryClient = new QueryClient();
    mockPush = vi.fn();
    vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any);
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('submits valid data, calls API, toasts success and navigates', async () => {
    // Arrange
    vi.mocked(createPost).mockResolvedValueOnce({ id: '1' } as any);
    const { result } = renderHook(() => useCreatePost(), { wrapper });

    // Act
    result.current.form.setValue('title', 'Valid Title');
    result.current.form.setValue('content', 'Valid Content');
    result.current.form.setValue('categoryId', 1);

    act(() => {
      // Returns promise inside hook
      result.current.onSubmit();
    });

    // Assert
    await waitFor(() => {
      expect(createPost).toHaveBeenCalledWith({ title: 'Valid Title', content: 'Valid Content', categoryId: 1 });
      expect(mockSuccess).toHaveBeenCalledWith('Aula criada com sucesso!');
      expect(mockPush).toHaveBeenCalledWith('/admin/dashboard');
    });
  });

  it('shows error toast when API fails', async () => {
    // Arrange
    vi.mocked(createPost).mockRejectedValueOnce(new Error('API error'));
    const { result } = renderHook(() => useCreatePost(), { wrapper });

    result.current.form.setValue('title', 'Valid Title');
    result.current.form.setValue('content', 'Valid Content');
    result.current.form.setValue('categoryId', 1);

    act(() => {
      result.current.onSubmit();
    });

    await waitFor(() => {
      expect(mockError).toHaveBeenCalledWith('Ocorreu um erro ao criar a aula. Tente novamente.');
    });
  });
});
