'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createComment } from '../api/create-comment.api';
import { useToastStore } from '@/infra/store/toast.adapter';
import { commentFormSchema, type CommentFormValues } from '../mappers/post.mapper';
import type { Comment } from '../types/post.type';

export function usePostComments(postId: string, initialComments: Comment[]) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const toast = useToastStore();

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
    onSuccess: (newComment) => {
      setComments((prev) => [newComment, ...prev]);
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
    form,
    onSubmit,
    isSubmitting: mutation.isPending,
    error: mutation.error,
  };
}
