import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../api/delete-post';
import { useToastStore } from '@/infra/store/toast.adapter';
import { GET_ADMIN_POSTS_QUERY_KEY } from './useAdminPosts';

export function useDeletePost() {
  const queryClient = useQueryClient();
  const success = useToastStore((state) => state.success);
  const error = useToastStore((state) => state.error);

  return useMutation({
    mutationFn: deletePost,
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: [GET_ADMIN_POSTS_QUERY_KEY] });

      const previousQueries = queryClient.getQueriesData({ queryKey: [GET_ADMIN_POSTS_QUERY_KEY] });

      queryClient.setQueriesData({ queryKey: [GET_ADMIN_POSTS_QUERY_KEY] }, (oldData: any) => {
        if (!oldData || !oldData.data) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((post: any) => post.id !== postId),
        };
      });

      return { previousQueries };
    },
    onError: (_, __, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, queryData]) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }
      error('Ocorreu um erro ao excluir a aula. Tente novamente.');
    },
    onSuccess: () => {
      success('Aula excluída com sucesso.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ADMIN_POSTS_QUERY_KEY] });
    },
  });
}
