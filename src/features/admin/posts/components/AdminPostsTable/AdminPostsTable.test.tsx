import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { AdminPostsTable, AdminPostsTableSkeleton } from './AdminPostsTable';
import { useAdminPosts } from '../../hooks/useAdminPosts';

vi.mock('../../hooks/useAdminPosts');

describe('AdminPostsTable', () => {
  beforeEach(() => {
    vi.mocked(useAdminPosts).mockReturnValue({
      posts: [{ id: '1', title: 'Test Post', subject: 'REACT', date: '2024' }],
      meta: { page: 1, lastPage: 2, total: 15 },
      paginationState: { page: 1, limit: 10, setPage: vi.fn(), setLimit: vi.fn() },
      actions: { deletePost: vi.fn(), isDeleting: false, deletingId: null },
      searchState: { searchTerm: '', setSearchTerm: vi.fn(), debouncedSearchTerm: '' }
    } as any);
  });

  it('renders posts correctly', () => {
    render(<AdminPostsTable />);
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('REACT')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    vi.mocked(useAdminPosts).mockReturnValueOnce({
      posts: [], searchState: { searchTerm: '' }
    } as any);
    render(<AdminPostsTable />);
    expect(screen.getByText('Nenhuma aula encontrada.')).toBeInTheDocument();
  });

  it('renders skeleton', () => {
    const { container } = render(<AdminPostsTableSkeleton />);
    expect(container.querySelector('.flex')).toBeInTheDocument();
  });
});
