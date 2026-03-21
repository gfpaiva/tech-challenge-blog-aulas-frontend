import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm, type UseFormReturn } from 'react-hook-form';

import { appRoutes } from '@/common/config/routes';
import { useToastStore } from '@/infra/store/toast.adapter';

import { updatePost } from '../api/update-post.api';
import { CreatePostSchema, CreatePostFormData, CreatePostMapper } from '../mappers/create-post.mapper';
import { CreatePostResponse } from '../types/create-post.type';

import { GET_ADMIN_POSTS_QUERY_KEY } from './useAdminPosts';
import { GET_POST_DETAIL_QUERY_KEY } from './usePostDetail';

export type UseUpdatePostReturn = {
  form: UseFormReturn<CreatePostFormData>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isPending: boolean;
};

export const useUpdatePost = (postDetail?: CreatePostResponse): UseUpdatePostReturn => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const success = useToastStore((state) => state.success);
  const error = useToastStore((state) => state.error);

  const form = useForm<CreatePostFormData>({
    resolver: zodResolver(CreatePostSchema) as any,
    values: postDetail
      ? {
          title: postDetail.title,
          categoryId: postDetail.category.id,
          content: postDetail.content,
        }
      : undefined,
  });

  const mutation = useMutation({
    mutationFn: (data: CreatePostFormData) => {
      if (!postDetail) throw new Error('Post Detail not loaded');
      const payload = CreatePostMapper.toPayload(data);
      return updatePost(postDetail.id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ADMIN_POSTS_QUERY_KEY] });
      if (postDetail) {
        queryClient.invalidateQueries({ queryKey: [GET_POST_DETAIL_QUERY_KEY, postDetail.id] });
      }
      success('Aula atualizada com sucesso!');
      router.push(appRoutes.adminDashboard.path);
    },
    onError: () => {
      error('Ocorreu um erro ao atualizar a aula. Tente novamente.');
    },
  });

  const onSubmit = form.handleSubmit((data: CreatePostFormData) => {
    mutation.mutate(data);
  });

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
  };
};
