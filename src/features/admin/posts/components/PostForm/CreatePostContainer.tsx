'use client';

import { useCreatePost } from '../../hooks/useCreatePost';

import { PostForm } from './PostForm';

export const CreatePostContainer = () => {
  const { form, onSubmit, isPending } = useCreatePost();

  return (
    <PostForm
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      submitLabel="Publicar Aula"
      title="Nova Aula"
      description="Preencha os detalhes para publicar uma nova aula."
    />
  );
};
