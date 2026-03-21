import React from 'react';

import { cn } from '@/common/lib/utils';

import { Button } from '../Button/Button';

export type PaginationProps = Readonly<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}>;

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const items: (number | string)[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) items.push(i);
  } else {
    items.push(1);
    if (currentPage > 3) items.push('...');

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      items.push(i);
    }

    if (currentPage < totalPages - 2) items.push('...');
    items.push(totalPages);
  }

  return (
    <div className={cn('join', className)}>
      <Button
        className="join-item"
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Anterior
      </Button>

      {items.map((item, idx) => (
        <React.Fragment key={typeof item === 'number' ? `page-${item}` : `dots-${idx}`}>
          {typeof item === 'number' ? (
            <Button
              className={cn('join-item', currentPage === item && 'btn-active')}
              variant={currentPage === item ? 'primary' : 'outline'}
              onClick={() => onPageChange(item)}
            >
              {item}
            </Button>
          ) : (
            <Button className="join-item btn-disabled" variant="outline" disabled>
              {item}
            </Button>
          )}
        </React.Fragment>
      ))}

      <Button
        className="join-item"
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Próxima
      </Button>
    </div>
  );
}
