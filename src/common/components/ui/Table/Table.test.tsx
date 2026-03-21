import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Table';

describe('Table Components', () => {
  it('renders a complete table correctly', () => {
    // Arrange & Act
    render(
      <Table data-testid="table">
        <TableHeader data-testid="thead">
          <TableRow data-testid="tr-head">
            <TableHead data-testid="th">Header</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody data-testid="tbody">
          <TableRow data-testid="tr-body">
            <TableCell data-testid="td">Cell Value</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    // Assert base elements
    expect(screen.getByTestId('table')).toHaveClass('table', 'w-full');
    expect(screen.getByTestId('thead')).toBeInTheDocument();
    expect(screen.getByTestId('tbody')).toBeInTheDocument();

    // Assert row classes
    expect(screen.getByTestId('tr-head')).toHaveClass('hover');
    expect(screen.getByTestId('tr-body')).toHaveClass('hover');

    // Assert cell classes
    expect(screen.getByTestId('th')).toHaveClass('text-left', 'align-middle', 'font-medium');
    expect(screen.getByTestId('td')).toHaveClass('align-middle');

    // Assert text content
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Cell Value')).toBeInTheDocument();
  });
});
