import { httpAdapter } from '@/infra/http/fetch.adapter';

import { CreatePostResponse } from '../types/create-post.type';

export async function getPostDetail(id: string): Promise<CreatePostResponse> {
  return httpAdapter.get<CreatePostResponse>(`/posts/${id}`);
}
