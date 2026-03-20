import { httpAdapter } from '@/infra/http/fetch.adapter';
import { PostMapper } from '../mappers/post.mapper';
import type { Post } from '../types/post.type';

export type GetPublicPostsParams = {
  page?: number;
  limit?: number;
};

export type GetPublicPostsResult = {
  data: Post[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
};

export async function getPublicPosts(params?: GetPublicPostsParams): Promise<GetPublicPostsResult> {
  const { page = 1, limit = 10 } = params || {};
  
  const response = await httpAdapter.get('/posts', {
    params: { page, limit },
  });

  const parsed = PostMapper.toDomain(response);

  return {
    data: parsed.data,
    meta: parsed.meta,
  };
}
