import { httpAdapter } from '@/infra/http/fetch.adapter';
import { useAuthStoreAdapter } from '@/infra/store/auth.adapter';

import { CreatePostResponse } from '../types/create-post.type';

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  categoryId?: number;
}

export async function updatePost(id: string, payload: UpdatePostRequest): Promise<CreatePostResponse> {
  const token = useAuthStoreAdapter.getState().token;

  return httpAdapter.put<CreatePostResponse>(`/posts/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
