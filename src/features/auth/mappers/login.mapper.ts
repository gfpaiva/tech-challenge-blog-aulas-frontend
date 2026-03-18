import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});


export const loginResponseSchema = z.object({
  user: z.object({
    id: z.uuid(),
    name: z.string(),
    email: z.email(),
    role: z.enum(['admin', 'student']),
  }),
  access_token: z.string(),
}).transform((data) => ({
  user: data.user,
  token: data.access_token,
}));

export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;