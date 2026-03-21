import { useQuery } from '@tanstack/react-query';

import { searchPosts } from '../api/search-posts.api';

export const SEARCH_KEY = 'search-posts';

export function useSearchPosts(q: string) {
  return useQuery({
    queryKey: [SEARCH_KEY, q],
    queryFn: () => searchPosts({ q }),
    // Only search if length is at least 3 chars (Backend requires min 3 chars)
    enabled: q.trim().length >= 3,
    // Add staleTime to naturally cache recent searches momentarily without re-fetching immediately
    staleTime: 60 * 1000,
  });
}
