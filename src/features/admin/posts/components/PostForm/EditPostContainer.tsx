'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { usePostDetail } from '../../hooks/usePostDetail';
import { useUpdatePost } from '../../hooks/useUpdatePost';

import { PostForm, PostFormSkeleton } from './PostForm';

export const EditPostContainer = () => {
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const { data: postDetail, isLoading } = usePostDetail(postId || '');
  const { form, onSubmit, isPending } = useUpdatePost(postDetail);

  if (!isMounted || (isLoading && !postDetail)) {
    return <PostFormSkeleton />;
  }

  if (!postId || !postDetail) {
    return (
      <div className="text-center text-error mt-10">
        <p className="text-xl font-bold">Aula não encontrada.</p>
      </div>
    );
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
