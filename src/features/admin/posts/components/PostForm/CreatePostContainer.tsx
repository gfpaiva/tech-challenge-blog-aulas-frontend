'use client';

import { PostForm } from './PostForm';
import { useCreatePost } from '../../hooks/useCreatePost';

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
