import { httpAdapter } from '@/infra/http/fetch.adapter';
import { PostMapper } from '../mappers/post.mapper';
import type { GetPublicPostsResult } from './get-public-posts.api';

export type SearchPostsParams = {
  q: string;
};

export async function searchPosts({ q }: SearchPostsParams): Promise<GetPublicPostsResult> {
  const response = await httpAdapter.get('/posts/search', {
    params: { q },
    debounce: 500,
  });

  const parsed = PostMapper.toDomain(response);

  return {
    data: parsed.data,
    meta: parsed.meta,
  };
}
