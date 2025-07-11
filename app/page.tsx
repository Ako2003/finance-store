'use client';

import { AddOperationDialog } from '@/components/add-operation-dialog';
import { InitialBalanceDialog } from '@/components/initial-balance-dialog';
import { ThemeToggle } from '@/components/theme-toggle';
import { useFinanceStore } from '@/lib/store';
import { groupOperationsByMonth } from '@/lib/utils';
import { MonthlySummary } from '@/components/monthly-summary';

export default function Home() {
  const operations = useFinanceStore((state) => state.operations);
  const initialBalance = useFinanceStore((state) => state.initialBalance);
  const monthlyData = groupOperationsByMonth(operations);

  return (
    <div className="container mx-auto py-10">
      <div className="flex max-lg:flex-col justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Finance Tracker Made By Akif</h1>
        <div className={"lg:hidden"}>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-4">
          <InitialBalanceDialog />
          <AddOperationDialog />
          <div className={"max-lg:hidden"}>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {Object.entries(monthlyData)
        .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
        .map(([month, ops]) => (
          <MonthlySummary
            key={month}
            month={month}
            operations={ops}
            allOperations={operations}
          />
        ))}
    </div>
  );
}