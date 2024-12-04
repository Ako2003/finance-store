import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Operation } from './types';

interface FinanceStore {
  initialBalance: number;
  operations: Operation[];
  setInitialBalance: (amount: number) => void;
  addOperation: (operation: Omit<Operation, 'id'>) => void;
  editOperation: (id: string, operation: Omit<Operation, 'id'>) => void;
  deleteOperation: (id: string) => void;
}

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set) => ({
      initialBalance: 1,
      operations: [],
      setInitialBalance: (amount) => {
        if (amount < 1) {
          throw new Error('Initial balance must be at least €1');
        }
        set({ initialBalance: amount });
      },
      addOperation: (operation) =>
        set((state) => ({
          operations: [
            ...state.operations,
            { ...operation, id: crypto.randomUUID() },
          ],
        })),
      editOperation: (id, operation) =>
        set((state) => ({
          operations: state.operations.map((op) =>
            op.id === id ? { ...operation, id } : op
          ),
        })),
      deleteOperation: (id) =>
        set((state) => ({
          operations: state.operations.filter((op) => op.id !== id),
        })),
    }),
    {
      name: 'finance-store',
    }
  )
);