import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useLogin } from '@/features/auth/hooks/useLogin';
import { useAuthStoreAdapter } from '@/infra/store/auth.adapter';

import { AdminHeader } from './AdminHeader';

vi.mock('@/infra/store/auth.adapter');
vi.mock('@/features/auth/hooks/useLogin');

describe('AdminHeader Component', () => {
  it('renders user info and calls logout', () => {
    const mockLogout = vi.fn();
    vi.mocked(useAuthStoreAdapter).mockReturnValue({
      user: { name: 'Admin Test', email: 'admin@test.com' },
    } as any);
    vi.mocked(useLogin).mockReturnValue({ logout: mockLogout } as any);

    render(<AdminHeader />);

    expect(screen.getByText('Admin Test')).toBeInTheDocument();
    expect(screen.getByText('admin@test.com')).toBeInTheDocument();
    expect(screen.getByText('AD')).toBeInTheDocument(); // avatar initials

    const logoutBtn = screen.getByRole('button', { name: /Sair/i });
    fireEvent.click(logoutBtn);
    expect(mockLogout).toHaveBeenCalled();
  });
});
