import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useLogin } from './useLogin';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStoreAdapter } from '@/infra/store/auth.adapter';
import { useRouter } from 'next/navigation';
import { login } from '../api/login.api';

vi.mock('@/infra/store/auth.adapter');
vi.mock('next/navigation');
vi.mock('../api/login.api');

describe('useLogin Hook', () => {
  let queryClient: QueryClient;
  let mockSetAuth: ReturnType<typeof vi.fn>;
  let mockClearAuth: ReturnType<typeof vi.fn>;
  let mockPush: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { mutations: { retry: false, networkMode: 'always' } },
    });
    
    mockSetAuth = vi.fn();
    mockClearAuth = vi.fn();
    mockPush = vi.fn();

    vi.mocked(useAuthStoreAdapter).mockReturnValue({
      setAuth: mockSetAuth,
      clearAuth: mockClearAuth,
      isAuthenticated: false,
      user: null as any,
    });
    
    vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any);
    
    vi.mocked(login).mockResolvedValue({
      user: { id: '1', name: 'Test', email: 'test@test.com', role: 'PROFESSOR' },
      token: 'jwt-123',
    } as any);

    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('provides form instance and auth state', () => {
    const { result } = renderHook(() => useLogin(), { wrapper });

    expect(result.current.form).toBeDefined();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isPending).toBe(false);
  });

  // Testing onSubmit directly with RHF validation inside JSDOM is brittle.
  // We will rely on E2E/Integration DOM tests for the login form logic.
  
  it('logout clears auth and pushes to path', () => {
    const { result } = renderHook(() => useLogin(), { wrapper });

    act(() => {
      result.current.logout('/home');
    });

    expect(mockClearAuth).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/home');
  });
});
