'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { appRoutes } from '@/common/config/routes';
import { User } from '@/common/types/user';

import { useLogin } from '../hooks/useLogin';

type ProtectedRouteProps = Readonly<{
  role?: User['role'];
  children: React.ReactNode;
}>;

export const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useLogin();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!isAuthenticated) {
      router.replace(appRoutes.login.path);
      return;
    }

    if (role && user?.role !== role) {
      router.replace(appRoutes.home.path);
    }
  }, [mounted, isAuthenticated, router, role, user?.role]);

  // Aguarda hidratação do Zustand antes de qualquer renderização
  if (!mounted) return null;

  return !isAuthenticated ? null : <>{children}</>;
};
