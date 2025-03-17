
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { DollarSign, PiggyBank, ArrowRight } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A259FF', '#4BC0C0'];

const BudgetPlanner = () => {
  const [income, setIncome] = useState<number>(5000);
  const [expenses, setExpenses] = useState<{
    housing: number;
    transportation: number;
    food: number;
    utilities: number;
    entertainment: number;
    other: number;
  }>({
    housing: 1500,
    transportation: 400,
    food: 600,
    utilities: 300,
    entertainment: 200,
    other: 300,
  });

  const handleExpenseChange = (category: keyof typeof expenses, value: number) => {
    setExpenses((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const totalExpenses = Object.values(expenses).reduce((sum, expense) => sum + expense, 0);
  const savings = income - totalExpenses;
  const savingsPercentage = (savings / income) * 100;

  const chartData = Object.entries(expenses).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: value,
  }));

  const recommendation = () => {
    if (savingsPercentage < 0) {
      return "Your expenses exceed your income. Consider cutting back on non-essential spending.";
    } else if (savingsPercentage < 10) {
      return "You're saving less than 10% of your income. Financial experts recommend saving at least 20%.";
    } else if (savingsPercentage < 20) {
      return "You're saving a good amount, but aim for 20% to build a strong financial foundation.";
    } else {
      return "Great job! You're saving more than 20% of your income, which is excellent for long-term financial health.";
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <PiggyBank className="h-6 w-6 text-finance-600" />
          <CardTitle>Budget Planner</CardTitle>
        </div>
        <CardDescription>
          Track your monthly budget and see where your money goes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="income" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-finance-600" />
                Monthly Income
              </Label>
              <Input
                id="income"
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="border-finance-200 focus:border-finance-400"
              />
            </div>
            
            <div className="space-y-3">
              <h4 className="text-md font-medium">Monthly Expenses</h4>
              
              {Object.entries(expenses).map(([category, amount]) => (
                <div key={category} className="space-y-1">
                  <Label htmlFor={category} className="text-sm capitalize">
                    {category}
                  </Label>
                  <Input
                    id={category}
                    type="number"
                    value={amount}
                    onChange={(e) => 
                      handleExpenseChange(
                        category as keyof typeof expenses, 
                        Number(e.target.value)
                      )
                    }
                    className="border-finance-200 focus:border-finance-400"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <h4 className="text-md font-medium mb-2">Expense Breakdown</h4>
            <div className="w-full h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="bg-finance-50 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <h4 className="text-sm text-gray-500">Total Income</h4>
              <p className="text-lg font-bold text-finance-700">${income.toLocaleString()}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500">Total Expenses</h4>
              <p className="text-lg font-bold text-gray-700">${totalExpenses.toLocaleString()}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500">Monthly Savings</h4>
              <p className={`text-lg font-bold ${savings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${savings.toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="pt-2 border-t border-finance-100">
            <p className="text-sm text-gray-600">{recommendation()}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-finance-600 hover:bg-finance-700">
          Save Your Budget Plan
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BudgetPlanner;
