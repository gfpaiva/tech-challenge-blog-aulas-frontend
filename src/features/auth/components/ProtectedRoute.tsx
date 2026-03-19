'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '../hooks/useLogin';
import { appRoutes } from '@/common/config/routes';
import { User } from '@/common/types/user';

type ProtectedRouteProps = {
  role?: User['role'];
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(appRoutes.login.path);
    }

    if ((isAuthenticated && role) && user?.role !== role) {
      router.replace(appRoutes.home.path);
    }
  }, [isAuthenticated, router]);

  return (
    !isAuthenticated ? null : <>{children}</>
  );
};