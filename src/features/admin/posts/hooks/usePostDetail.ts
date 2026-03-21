import { useQuery } from '@tanstack/react-query';

import { getPostDetail } from '../api/get-post-detail.api';

export const GET_POST_DETAIL_QUERY_KEY = 'postDetail';

export const usePostDetail = (id: string) => {
  const query = useQuery({
    queryKey: [GET_POST_DETAIL_QUERY_KEY, id],
    queryFn: () => getPostDetail(id),
    enabled: !!id,
  });

  return query;
};
