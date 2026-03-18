'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '../hooks/useLogin';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
};