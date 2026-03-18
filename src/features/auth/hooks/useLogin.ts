import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginRequest, LoginResponse, loginRequestSchema } from '../mappers/login.mapper';
import { httpAdapter } from '@/infra/http/axios.adapter';
import { useAuthStoreAdapter } from '@/infra/store/auth.adapter';

export const useLogin = () => {
  const { setAuth, isAuthenticated } = useAuthStoreAdapter();

  const form = useForm({
    resolver: zodResolver(loginRequestSchema),
  });

  const onLogin = async (data: LoginRequest) => {
    try {
      const response = await httpAdapter.post<LoginResponse, LoginRequest>('/auth/login', data);

      setAuth(response.user, response.token);
    } catch (error) {
      console.error("Falha no login", error);
    }
  };

  return { form, onLogin, isAuthenticated };
};