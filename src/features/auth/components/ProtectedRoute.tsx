'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { appRoutes } from '@/common/config/routes';
import { User } from '@/common/types/user';

import { useLogin } from '../hooks/useLogin';

type ProtectedRouteProps = {
  role?: User['role'];
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(appRoutes.login.path);
    }

    if (isAuthenticated && role && user?.role !== role) {
      router.replace(appRoutes.home.path);
    }
  }, [isAuthenticated, router, role, user?.role]);

  return !isAuthenticated ? null : <>{children}</>;
};
