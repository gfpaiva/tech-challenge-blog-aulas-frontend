import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Table';

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table className="table-zebra">
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Job</TableHead>
          <TableHead>Company</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>Cy Ganderton</TableCell>
          <TableCell>Quality Control Specialist</TableCell>
          <TableCell>Littel, Schaden and Vandervort</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell>Hart Hagerty</TableCell>
          <TableCell>Desktop Support Technician</TableCell>
          <TableCell>Zemlak, Daniel and Leannon</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>3</TableCell>
          <TableCell>Brice Swyre</TableCell>
          <TableCell>Tax Accountant</TableCell>
          <TableCell>Carroll Group</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
