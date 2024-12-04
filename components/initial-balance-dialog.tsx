'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFinanceStore } from '@/lib/store';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export function InitialBalanceDialog() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const setInitialBalance = useFinanceStore((state) => state.setInitialBalance);
  const initialBalance = useFinanceStore((state) => state.initialBalance);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAmount = parseFloat(amount);
    
    if (newAmount < 1) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Initial balance must be at least €1",
      });
      return;
    }

    try {
      setInitialBalance(newAmount);
      setOpen(false);
      setAmount('');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Initial Balance: €{initialBalance.toFixed(2)}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Initial Balance</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount (minimum €1)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}