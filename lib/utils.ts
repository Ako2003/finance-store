import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Operation } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateBalance(operations: Operation[]): number {
  return operations.reduce(
    (acc, op) => acc + (op.type === 'income' ? op.amount : -op.amount),
    0
  );
}

export function groupOperationsByMonth(operations: Operation[]): { [key: string]: Operation[] } {
  return operations.reduce((acc: { [key: string]: Operation[] }, op) => {
    const monthKey = new Date(op.date).toLocaleString('en-US', { month: 'long', year: 'numeric' });
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(op);
    return acc;
  }, {});
}