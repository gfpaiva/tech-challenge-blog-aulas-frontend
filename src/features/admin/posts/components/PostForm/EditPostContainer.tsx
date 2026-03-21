'use client';

import { useSearchParams } from 'next/navigation';

import { usePostDetail } from '../../hooks/usePostDetail';
import { useUpdatePost } from '../../hooks/useUpdatePost';

import { PostForm, PostFormSkeleton } from './PostForm';

export const EditPostContainer = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get('id') as string;

  const { data: postDetail, isLoading } = usePostDetail(postId);
  const { form, onSubmit, isPending } = useUpdatePost(postDetail);

  if (isLoading) {
    return <PostFormSkeleton />;
  }

  if (!postDetail) {
    return <div className="text-center text-error mt-10">Aula não encontrada.</div>;
  }

  return (
    <PostForm
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      submitLabel="Salvar Alterações"
      title="Editar Aula"
      description="Faça as edições necessárias nesta aula."
    />
  );
};
