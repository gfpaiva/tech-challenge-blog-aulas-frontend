import { httpAdapter } from '@/infra/http/fetch.adapter';

import { LoginMapper } from '../mappers/login.mapper';
import { LoginRequest, LoginResponse } from '../types/login.types';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await httpAdapter.post<unknown, LoginRequest>('/auth/login', data);

  return LoginMapper.toViewModel(response);
};
