import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useAuthStoreAdapter } from '@/infra/store/auth.adapter';

import { CreatePostSchema, CreatePostFormData } from '../../mappers/create-post.mapper';

import { PostForm } from './PostForm';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const FormWrapper = () => {
  const form = useForm<CreatePostFormData>({
    resolver: zodResolver(CreatePostSchema) as any,
    defaultValues: {
      title: 'Título da Aula',
      categoryId: 1,
      content: 'Conteúdo de exemplo...',
    },
  });

  return (
    <PostForm
      form={form}
      onSubmit={async (e) => {
        e?.preventDefault();
      }}
      isPending={false}
      submitLabel="Publicar Aula"
      title="Nova Aula"
      description="Preencha os detalhes para publicar uma nova aula."
    />
  );
};

const WithProviders = (Story: any) => {
  useEffect(() => {
    useAuthStoreAdapter.setState({
      token: 'fake-jwt-token',
      isAuthenticated: true,
      user: { id: '1', name: 'Professor Teste', email: 'prof@test.com', role: 'PROFESSOR' },
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex justify-center p-10 bg-base-200 min-h-screen">
        <Story />
      </div>
    </QueryClientProvider>
  );
};

const meta: Meta<typeof PostForm> = {
  title: 'Features/Admin/Posts/PostForm',
  component: PostForm,
  decorators: [WithProviders],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/admin/aulas/nova',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PostForm>;

export const Default: Story = {
  render: () => <FormWrapper />,
};
