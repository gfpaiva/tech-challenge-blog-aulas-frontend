import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/common/components/ui/Input/Input';
import { useAdminPosts } from '../../hooks/useAdminPosts';

export function SearchInput() {
  const { searchState: { searchTerm, updateSearch } } = useAdminPosts();
  const [searchInput, setSearchInput] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput.length >= 3 || searchInput.length === 0) {
        updateSearch(searchInput);
      }
    }, 500);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return (
    <div className="form-control max-w-sm w-full">
      <div className="relative">
        <Search className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 z-10 pointer-events-none" />
        <Input
          type="search"
          placeholder="Busque por aulas"
          className="pl-10"
          value={searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
        />
      </div>
    </div>
  );
}
