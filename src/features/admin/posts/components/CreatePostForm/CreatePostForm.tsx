'use client';

import { Input } from '@/common/components/ui/Input/Input';
import { Select } from '@/common/components/ui/Select/Select';
import { Textarea } from '@/common/components/ui/Textarea/Textarea';
import { FormRow } from '@/common/components/ui/FormRow/FormRow';
import { Skeleton } from '@/common/components/ui/Skeleton';
import { Button } from '@/common/components/ui/Button/Button';
import { useCreatePost } from '../../hooks/useCreatePost';

export const CreatePostForm = () => {
  const { form, onSubmit, isPending } = useCreatePost();
  const { register, formState: { errors } } = form;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 w-full max-w-2xl bg-base-100 p-8 rounded-xl shadow-lg border border-base-200">
      <div className="mb-4">
        <h2 className="text-2xl font-bold font-serif text-primary">Nova Aula</h2>
        <p className="text-sm text-base-content/70 mt-1">Preencha os detalhes para publicar uma nova aula.</p>
      </div>

      <FormRow label="Título" error={errors.title?.message}>
        <Input
          placeholder="Ex: Introdução à Gramática"
          {...register('title')}
          error={!!errors.title}
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Categoria" error={errors.categoryId?.message}>
        <Select
          {...register('categoryId')}
          error={!!errors.categoryId}
          disabled={isPending}
        >
          <option value="1">Português</option>
          <option value="2">Matemática</option>
        </Select>
      </FormRow>

      <FormRow label="Conteúdo" error={errors.content?.message}>
        <Textarea
          rows={8}
          placeholder="Escreva o conteúdo completo da aula aqui..."
          {...register('content')}
          error={!!errors.content}
          disabled={isPending}
        />
      </FormRow>

      <div className="flex justify-end gap-4 mt-4">
        <Button
          type="submit"
          disabled={isPending}
          variant="primary"
          className="min-w-32"
        >
          {isPending ? <span className="loading loading-spinner"></span> : 'Publicar Aula'}
        </Button>
      </div>
    </form>
  );
};

export const CreatePostFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl bg-base-100 p-8 rounded-xl shadow-lg border border-base-200">
      <div className="mb-4">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64 mt-1" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-12 w-full" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-12 w-full" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-48 w-full" />
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <Skeleton className="h-12 w-32" />
      </div>
    </div>
  );
};
