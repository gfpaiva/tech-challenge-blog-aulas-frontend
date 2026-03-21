import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AdminDashboardView, AdminDashboardSkeleton } from './AdminDashboardView';
import { useAdminPosts } from '../../hooks/useAdminPosts';

vi.mock('../../hooks/useAdminPosts');
vi.mock('../SearchInput/SearchInput', () => ({ SearchInput: () => <div>SearchInput Mock</div> }));
vi.mock('../AdminPostsTable/AdminPostsTable', () => ({ 
  AdminPostsTable: () => <div>AdminPostsTable Mock</div>,
  AdminPostsTableSkeleton: () => <div>AdminPostsTableSkeleton Mock</div>
}));

describe('AdminDashboardView Component', () => {
  it('renders table when not loading', () => {
    vi.mocked(useAdminPosts).mockReturnValue({ isLoading: false } as any);
    render(<AdminDashboardView />);
    
    expect(screen.getByText('Aulas')).toBeInTheDocument();
    expect(screen.getByText('SearchInput Mock')).toBeInTheDocument();
    expect(screen.getByText('AdminPostsTable Mock')).toBeInTheDocument();
  });

  it('renders skeleton when loading', () => {
    vi.mocked(useAdminPosts).mockReturnValue({ isLoading: true } as any);
    render(<AdminDashboardView />);
    
    expect(screen.getByText('AdminPostsTableSkeleton Mock')).toBeInTheDocument();
  });

  it('renders outer dashboard skeleton', () => {
    const { container } = render(<AdminDashboardSkeleton />);
    expect(container.querySelector('.flex')).toBeInTheDocument();
  });
});
