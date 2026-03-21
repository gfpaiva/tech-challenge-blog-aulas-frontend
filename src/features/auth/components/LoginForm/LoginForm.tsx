'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { Input } from '@/common/components/ui/Input/Input';
import { PasswordInput } from '@/common/components/ui/PasswordInput/PasswordInput';
import { FormRow } from '@/common/components/ui/FormRow/FormRow';
import { Button } from '@/common/components/ui/Button/Button';
import { appRoutes } from '@/common/config/routes';

export const LoginForm = () => {
  const { form, onSubmit, isPending, isError, isAuthenticated } = useLogin();
  const { register, formState: { errors } } = form;
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') ?? undefined;

  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectTo ?? appRoutes.adminDashboard.path);
    }
  }, [isAuthenticated, router, redirectTo]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <form onSubmit={onSubmit(redirectTo)} className="flex flex-col gap-4 w-full">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold font-serif text-primary">Login</h1>
        <p className="text-sm text-base-content/70">Acesse sua conta para continuar</p>
      </div>

      <FormRow label="E-mail" error={errors.email?.message}>
        <Input
          type="email"
          placeholder="exemplo@email.com"
          {...register('email')}
          error={!!errors.email}
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Senha" error={errors.password?.message}>
        <PasswordInput
          placeholder="Sua senha"
          {...register('password')}
          error={!!errors.password}
          disabled={isPending}
        />
      </FormRow>

      {isError && (
        <div className="alert alert-error mt-2 p-2 text-sm rounded-md">
          <span>E-mail ou senha inválidos. Tente novamente.</span>
        </div>
      )}

      <Button
        type="submit"
        className="w-full mt-4"
        disabled={isPending}
        variant="primary"
      >
        {isPending ? <span className="loading loading-spinner"></span> : 'Entrar'}
      </Button>
    </form>
  );
};
