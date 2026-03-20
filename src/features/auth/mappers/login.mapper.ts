import { z } from 'zod';
import { LoginResponse } from '../types/login.types';

export const loginRequestSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().nonempty('A senha é obrigatória'),
});


export const loginResponseSchema = z.object({
  user: z.object({
    id: z.uuid(),
    name: z.string(),
    email: z.email(),
    role: z.enum(['PROFESSOR', 'ALUNO']),
  }),
  access_token: z.string(),
}).transform((data) => ({
  user: data.user,
  token: data.access_token,
}));

export class LoginMapper {
  static toViewModel(data: unknown): LoginResponse {
    return loginResponseSchema.parse(data);
  }
}
