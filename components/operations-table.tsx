'use client';

import { DataTable } from '@/components/ui/data-table';
import { Operation } from '@/lib/types';
import { format } from 'date-fns';
import { ColumnDef } from '@tanstack/react-table';
import { useFinanceStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { EditOperationDialog } from './edit-operation-dialog';
import { useState } from 'react';

export function OperationsTable({ operations }: { operations: Operation[] }) {
  const deleteOperation = useFinanceStore((state) => state.deleteOperation);
  const [editingOperation, setEditingOperation] = useState<Operation | null>(null);

  const columns: ColumnDef<Operation>[] = [
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => format(new Date(row.original.date), 'dd MMM yyyy HH:mm'),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => (
        <span
          className={
            row.original.type === 'income'
              ? 'text-green-600 font-medium dark:text-green-400'
              : 'text-red-600 font-medium dark:text-red-400'
          }
        >
          {row.original.type}
        </span>
      ),
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => (
        <span
          className={
            row.original.type === 'income'
              ? 'text-green-600 font-medium dark:text-green-400'
              : 'text-red-600 font-medium dark:text-red-400'
          }
        >
          €{row.original.amount.toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEditingOperation(row.original)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteOperation(row.original.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={operations} />
      {editingOperation && (
        <EditOperationDialog
          operation={editingOperation}
          onClose={() => setEditingOperation(null)}
        />
      )}
    </>
  );
}