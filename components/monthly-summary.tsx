'use client';

import { Operation } from '@/lib/types';
import { MonthlyChart } from './monthly-chart';
import { OperationsTable } from './operations-table';
import { calculateBalance } from '@/lib/utils';
import { useFinanceStore } from '@/lib/store';

interface MonthlyOperationsProps {
  month: string;
  operations: Operation[];
  allOperations: Operation[];
}

export function MonthlySummary({ month, operations, allOperations }: MonthlyOperationsProps) {
  const initialBalance = useFinanceStore((state) => state.initialBalance);
  const balance = calculateBalance(operations);
  const previousOperationsBalance = calculateBalance(
    allOperations.filter(
      (op) => new Date(op.date) < new Date(operations[0]?.date || new Date())
    )
  );

  const monthlyDataObj = {
    month,
    operations,
    startingBalance: initialBalance + previousOperationsBalance,
    endingBalance: initialBalance + previousOperationsBalance + balance,
  };

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{month}</h2>
        <div className="text-xl">
          Balance:{' '}
          <span className={monthlyDataObj.endingBalance >= 0 ? 'text-green-600' : 'text-red-600'}>
            €{monthlyDataObj.endingBalance.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="mb-6">
        <MonthlyChart data={monthlyDataObj} />
      </div>
      <OperationsTable operations={operations} />
    </div>
  );
}