import { SearchX } from 'lucide-react';

type SearchEmptyStateProps = Readonly<{
  query: string;
}>;

export function SearchEmptyState({ query }: SearchEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mb-6">
        <SearchX className="w-10 h-10 text-base-content/40" />
      </div>
      <h3 className="text-2xl font-bold font-serif text-base-content mb-3">Nenhuma aula encontrada</h3>
      <p className="text-base-content/70 max-w-md">
        Não conseguimos encontrar resultados para o termo{' '}
        <strong className="text-base-content">&quot;{query}&quot;</strong>. Tente buscar com outras palavras-chave ou
        verifique a ortografia.
      </p>
    </div>
  );
}
