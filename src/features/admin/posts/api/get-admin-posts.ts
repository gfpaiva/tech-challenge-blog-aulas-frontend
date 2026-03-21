import { httpAdapter } from '@/infra/http/fetch.adapter';

import { AdminPostMapper } from '../mappers/admin-post.mapper';
import { AdminPostResponse } from '../types/admin-post.type';

export interface GetAdminPostsParams {
  page?: number;
  limit?: number;
  q?: string;
}

export const getAdminPosts = async (params: GetAdminPostsParams): Promise<AdminPostResponse> => {
  const { q, page = 1, limit = 10 } = params;

  const endpoint = q && q.length >= 3 ? '/posts/search' : '/posts';

  const queryParams: Record<string, string | number> = {};

  if (q && q.length >= 3) {
    queryParams.q = q;
  } else {
    queryParams.page = page;
    queryParams.limit = limit;
  }

  const response = await httpAdapter.get(endpoint, {
    params: queryParams,
  });

  return AdminPostMapper.toViewModel(response);
};
