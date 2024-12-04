export type Operation = {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
  category: string;
};

export type MonthlyData = {
  month: string;
  operations: Operation[];
  startingBalance: number;
  endingBalance: number;
};