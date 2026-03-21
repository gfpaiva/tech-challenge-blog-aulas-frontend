'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useToastStore } from '@/infra/store/toast.adapter';

import { createComment } from '../api/create-comment.api';
import { getPostComments } from '../api/get-post-comments.api';
import { commentFormSchema, type CommentFormValues } from '../mappers/post.mapper';

export const GET_POST_COMMENTS_QUERY_KEY = 'postComments';

export function usePostComments(postId: string) {
  const queryClient = useQueryClient();
  const toast = useToastStore();

  const { data: comments = [], isLoading } = useQuery({
    queryKey: [GET_POST_COMMENTS_QUERY_KEY, postId],
    queryFn: () => getPostComments(postId),
    enabled: !!postId,
  });

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (content: string) => {
      return createComment(postId, { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_POST_COMMENTS_QUERY_KEY, postId] });
      form.reset();
      toast.success('Comentário publicado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao publicar comentário. Tente novamente.');
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data.content);
  });

  return {
    comments,
    isLoading,
    form,
    onSubmit,
    isSubmitting: mutation.isPending,
    error: mutation.error,
  };
}
