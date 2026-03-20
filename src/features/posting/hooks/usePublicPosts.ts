import { useInfiniteQuery } from '@tanstack/react-query';
import { getPublicPosts } from '../api/get-public-posts.api';

export const PUBLIC_LIST = 'public-posts-list';

export function usePublicPosts(limit: number = 10, initialData?: any) {
  return useInfiniteQuery({
    queryKey: [PUBLIC_LIST, limit],
    queryFn: ({ pageParam }) => getPublicPosts({ page: pageParam as number, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.lastPage) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    // Allows hydrating the query with initialData provided by SSG at build time
    ...(initialData ? {
      initialData: {
        pages: [initialData],
        pageParams: [1]
      }
    } : {})
  });
}
