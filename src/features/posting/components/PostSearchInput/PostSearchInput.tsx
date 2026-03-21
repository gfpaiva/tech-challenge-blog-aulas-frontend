import { Search } from 'lucide-react';

import { Input } from '@/common/components/ui/Input/Input';

type PostSearchInputProps = {
  value: string;
  onChange: (val: string) => void;
  isLoading?: boolean;
};

export function PostSearchInput({ value, onChange, isLoading }: PostSearchInputProps) {
  return (
    <div className="form-control w-full max-w-md relative">
      <div className="relative flex items-center w-full">
        <Search className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 z-10 pointer-events-none" />
        <Input
          type="text"
          placeholder="Buscar aulas"
          className="input input-bordered input-primary w-full pl-12 pr-12 rounded-full shadow-sm bg-base-100 placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {isLoading && <span className="loading loading-spinner loading-sm absolute right-4 text-primary"></span>}
      </div>
    </div>
  );
}
