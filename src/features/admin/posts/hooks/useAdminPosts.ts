import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { getAdminPosts } from '../api/get-admin-posts';
import { useDeletePost } from './useDeletePost';

export function useAdminPosts() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const q = searchParams.get('q') || '';
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['adminPosts', { q, page, limit }],
    queryFn: () => getAdminPosts({ q, page, limit }),
  });

  const deletePostMutation = useDeletePost();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params.toString();
  };

  const updateSearch = (newTerm: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newTerm) {
      params.set('q', newTerm);
    } else {
      params.delete('q');
    }
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  };

  const setPage = (newPage: number) => {
    router.replace(`${pathname}?${createQueryString('page', newPage.toString())}`);
  };

  const setLimit = (newLimit: number) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    params.set('page', '1');
    params.set('limit', newLimit.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  return {
    posts: data?.data || [],
    meta: data?.meta || { total: 0, page: 1, lastPage: 1 },
    isLoading,
    error,
    searchState: {
      searchTerm: q,
      updateSearch,
    },
    paginationState: {
      page,
      limit,
      setPage,
      setLimit,
    },
    actions: {
      deletePost: deletePostMutation.mutate,
      isDeleting: deletePostMutation.isPending,
      deletingId: deletePostMutation.variables,
      refetch,
    },
  };
}
