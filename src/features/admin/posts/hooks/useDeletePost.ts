import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../api/delete-post';
import { useToastStore } from '@/infra/store/toast.adapter';

export function useDeletePost() {
  const queryClient = useQueryClient();
  const success = useToastStore((state) => state.success);
  const error = useToastStore((state) => state.error);

  return useMutation({
    mutationFn: deletePost,
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: ['adminPosts'] });

      const previousQueries = queryClient.getQueriesData({ queryKey: ['adminPosts'] });

      queryClient.setQueriesData({ queryKey: ['adminPosts'] }, (oldData: any) => {
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
      queryClient.invalidateQueries({ queryKey: ['adminPosts'] });
    },
  });
}
