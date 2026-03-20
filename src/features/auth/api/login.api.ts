import { httpAdapter } from '@/infra/http/fetch.adapter';
import { LoginRequest, LoginResponse } from '../types/login.types';
import { LoginMapper } from '../mappers/login.mapper';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await httpAdapter.post<unknown, LoginRequest>('/auth/login', data);

  return LoginMapper.toViewModel(response);
};
