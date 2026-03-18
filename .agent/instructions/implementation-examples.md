## Port & Adapter (Exemplo Http)
```typescript
// src/common/ports/http.port.ts
export interface IHttpPort {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
}

// src/infra/http/axios.adapter.ts
import axios from 'axios';
import { IHttpPort } from '@/common/ports/http.port';

export const httpAdapter: IHttpPort = {
  get: async (url) => (await axios.get(url)).data,
  post: async (url, data) => (await axios.post(url, data)).data,
};
```

## ViewModel (MVVM Hook)
```typescript
// src/features/posting/hooks/useCreatePostViewModel.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPostSchema } from '../mappers/post.mapper';
import { httpAdapter } from '@/infra/http/axios.adapter'; // Uso do Adapter via Port

export const useCreatePostViewModel = () => {
  const form = useForm({
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit = async (data: any) => {
    await httpAdapter.post('/posts', data);
    // Lógica de sucesso (toast, redirect)
  };

  return { form, onSubmit };
};
```

## Componente & Storybook
```typescript
// src/common/components/Button.tsx
export const Button = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => (
  <button className="btn btn-primary" onClick={onClick}>{children}</button>
);

// src/common/components/Button.stories.tsx
import { Button } from './Button';
export default { component: Button };
export const Primary = { args: { children: 'Enviar Post' } };
```

## Teste de Unidade (Vitest)
```typescript
// src/features/posting/hooks/useCreatePostViewModel.spec.ts
import { renderHook, act } from '@testing-library/react';
import { useCreatePostViewModel } from './useCreatePostViewModel';
import { describe, it, expect, vi } from 'vitest';

describe('useCreatePostViewModel', () => {
  it('deve inicializar o formulário corretamente', () => {
    const { result } = renderHook(() => useCreatePostViewModel());
    expect(result.current.form).toBeDefined();
  });
});
```