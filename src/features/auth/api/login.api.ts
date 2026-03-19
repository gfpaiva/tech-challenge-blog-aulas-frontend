import { httpAdapter } from '@/infra/http/fetch.adapter';
import { LoginRequest, LoginResponse } from '../types/login.types';

export const loginApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    return httpAdapter.post<LoginResponse, LoginRequest>('/auth/login', data);
  },
};
