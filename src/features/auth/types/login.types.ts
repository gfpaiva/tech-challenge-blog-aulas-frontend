import { z } from 'zod';
import { loginRequestSchema, loginResponseSchema } from '../mappers/login.mapper';

export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
