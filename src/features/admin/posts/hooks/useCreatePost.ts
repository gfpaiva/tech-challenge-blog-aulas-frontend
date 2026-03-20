import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { appRoutes } from '@/common/config/routes';
import { CreatePostSchema, CreatePostFormData, CreatePostMapper } from '../mappers/create-post.mapper';
import { createPost } from '../api/create-post.api';
import { useToastStore } from '@/infra/store/toast.adapter';

export const useCreatePost = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const success = useToastStore((state) => state.success);
  const error = useToastStore((state) => state.error);

  const form = useForm<CreatePostFormData>({
    resolver: zodResolver(CreatePostSchema) as any,
    defaultValues: {
      title: '',
      categoryId: 1,
      content: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: CreatePostFormData) => {
      const payload = CreatePostMapper.toPayload(data);
      return createPost(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPosts'] });
      success('Aula criada com sucesso!');
      router.push(appRoutes.adminDashboard.path);
    },
    onError: () => {
      error('Ocorreu um erro ao criar a aula. Tente novamente.');
    }
  });

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
