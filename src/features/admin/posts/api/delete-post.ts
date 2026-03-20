import { httpAdapter } from '@/infra/http/fetch.adapter';
import { useAuthStoreAdapter } from '@/infra/store/auth.adapter';

export const deletePost = async (id: string): Promise<void> => {
  const token = useAuthStoreAdapter.getState().token;

  return httpAdapter.delete<void>('/posts/[:postId]', {
    pathParams: { postId: id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
