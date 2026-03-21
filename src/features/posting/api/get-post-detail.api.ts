import { httpAdapter } from '@/infra/http/fetch.adapter';

import { PostMapper } from '../mappers/post.mapper';
import type { PostDetail } from '../types/post.type';

export async function getPostDetail(id: string): Promise<PostDetail> {
  const response = await httpAdapter.get('/posts/[:postId]', {
    pathParams: { postId: id },
  });

  return PostMapper.toDetail(response);
}
