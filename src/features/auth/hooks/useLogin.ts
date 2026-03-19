'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { loginRequestSchema } from '../mappers/login.mapper';
import { LoginRequest, LoginResponse } from '../types/login.types';
import { loginApi } from '../api/login.api';
import { useAuthStoreAdapter } from '@/infra/store/auth.adapter';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const { setAuth, isAuthenticated, user } = useAuthStoreAdapter();
  const router = useRouter();

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginApi.login,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
    },
    onError: (error) => {
      console.error("Falha no login", error);
    }
  });

  const onSubmit = (data: LoginRequest, redirectPath?: string) => {
    mutation.mutate(data);
    if (mutation.isSuccess && redirectPath) {
      router.push(redirectPath);
    }
  };

  return {
    form,
    onSubmit: (redirectPath?: string) => form.handleSubmit((data) => onSubmit(data, redirectPath)),
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isAuthenticated,
    user
  };
};