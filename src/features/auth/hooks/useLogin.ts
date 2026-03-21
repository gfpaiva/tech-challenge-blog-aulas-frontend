'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { appRoutes } from '@/common/config/routes';
import { useAuthStoreAdapter } from '@/infra/store/auth.adapter';

import { login } from '../api/login.api';
import { loginRequestSchema } from '../mappers/login.mapper';
import { LoginRequest, LoginResponse } from '../types/login.types';

export const useLogin = () => {
  const { setAuth, clearAuth, isAuthenticated, user } = useAuthStoreAdapter();
  const router = useRouter();
  const redirectPathRef = useRef<string | undefined>(undefined);

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      router.push(redirectPathRef.current ?? appRoutes.adminDashboard.path);
    },
    onError: (error) => {
      console.error('Falha no login', error);
    },
  });

  const onSubmit = (data: LoginRequest, redirectPath?: string) => {
    redirectPathRef.current = redirectPath;
    mutation.mutate(data);
  };

  const logout = (redirectPath: string = appRoutes.home.path) => {
    clearAuth();
    router.push(redirectPath);
  };

  return {
    form,
    onSubmit: (redirectPath?: string) => form.handleSubmit((data) => onSubmit(data, redirectPath)),
    logout,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isAuthenticated,
    user,
  };
};
