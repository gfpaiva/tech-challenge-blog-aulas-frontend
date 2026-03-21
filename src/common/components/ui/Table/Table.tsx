import React from 'react';

import { cn } from '@/common/lib/utils';

export const Table = React.forwardRef<HTMLTableElement, Readonly<React.HTMLAttributes<HTMLTableElement>>>(
  ({ className, ...props }, ref) => (
    <div className="overflow-x-auto w-full">
      <table ref={ref} className={cn('table w-full', className)} {...props} />
    </div>
  ),
);
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  Readonly<React.HTMLAttributes<HTMLTableSectionElement>>
>(({ className, ...props }, ref) => <thead ref={ref} className={className} {...props} />);
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  Readonly<React.HTMLAttributes<HTMLTableSectionElement>>
>(({ className, ...props }, ref) => <tbody ref={ref} className={className} {...props} />);
TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef<HTMLTableRowElement, Readonly<React.HTMLAttributes<HTMLTableRowElement>>>(
  ({ className, ...props }, ref) => <tr ref={ref} className={cn('hover', className)} {...props} />,
);
TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<HTMLTableCellElement, Readonly<React.ThHTMLAttributes<HTMLTableCellElement>>>(
  ({ className, ...props }, ref) => (
    <th ref={ref} className={cn('text-left align-middle font-medium text-base-content/70', className)} {...props} />
  ),
);
TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<HTMLTableCellElement, Readonly<React.TdHTMLAttributes<HTMLTableCellElement>>>(
  ({ className, ...props }, ref) => <td ref={ref} className={cn('align-middle', className)} {...props} />,
);
TableCell.displayName = 'TableCell';
