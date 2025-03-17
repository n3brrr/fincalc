
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PiggyBank, TrendingUp, BarChart3 } from "lucide-react";
import { cn } from '@/lib/utils';

type CalculatorProps = {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const SavingsCalculator = ({ 
  activeTab = "savings", 
  onTabChange 
}: CalculatorProps) => {
  const [initialAmount, setInitialAmount] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(100);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [years, setYears] = useState<number>(10);
  const [result, setResult] = useState<number>(0);
  
  const calculateSavings = () => {
    // Compound interest formula: A = P(1 + r)^t + PMT × (((1 + r)^t - 1) / r)
    // where P is principal, r is monthly rate, t is time in months, PMT is monthly contribution
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = years * 12;
    const compoundedPrincipal = initialAmount * Math.pow(1 + monthlyRate, totalMonths);
    const compoundedPayments = monthlyContribution * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
    
    return compoundedPrincipal + compoundedPayments;
  };

  const calculateInvestment = () => {
    // Similar to savings but with potentially higher rates
    const monthlyRate = (interestRate + 2) / 100 / 12; // Assuming higher return for investments
    const totalMonths = years * 12;
    const compoundedPrincipal = initialAmount * Math.pow(1 + monthlyRate, totalMonths);
    const compoundedPayments = monthlyContribution * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
    
    return compoundedPrincipal + compoundedPayments;
  };

  const calculateRetirement = () => {
    // Calculate how much you would need to save for retirement
    // Using the 4% rule as a rough guideline
    const targetAnnualIncome = initialAmount * 12; // Monthly income × 12
    const targetTotal = targetAnnualIncome * 25; // 25× annual expenses (4% rule)
    
    // How much you need to save monthly to reach this goal
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = years * 12;
    
    return targetTotal;
  };

  useEffect(() => {
    let calculatedResult = 0;
    
    if (activeTab === "savings") {
      calculatedResult = calculateSavings();
    } else if (activeTab === "investing") {
      calculatedResult = calculateInvestment();
    } else if (activeTab === "retirement") {
      calculatedResult = calculateRetirement();
    }
    
    setResult(Math.round(calculatedResult));
  }, [initialAmount, monthlyContribution, interestRate, years, activeTab]);

  const handleTabChange = (value: string) => {
    if (onTabChange) {
      onTabChange(value);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="w-full max-w-md mx-auto rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl glass-card">
      <CardHeader className="p-6 bg-gradient-to-r from-finance-600 to-finance-700 text-white">
        <CardTitle className="text-2xl font-medium">Financial Calculator</CardTitle>
        <CardDescription className="text-finance-100">
          Plan your financial future with precision
        </CardDescription>
      </CardHeader>
      <Tabs 
        defaultValue={activeTab} 
        className="w-full" 
        onValueChange={handleTabChange}
      >
        <TabsList className="grid grid-cols-3 w-full p-0 bg-finance-50 rounded-none">
          <TabsTrigger 
            value="savings" 
            className={cn(
              "py-3 data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-finance-500",
              "flex items-center justify-center gap-2 transition-all"
            )}
          >
            <PiggyBank className="h-4 w-4" />
            <span>Savings</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="investing" 
            className={cn(
              "py-3 data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-finance-500",
              "flex items-center justify-center gap-2 transition-all"
            )}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Investing</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="retirement" 
            className={cn(
              "py-3 data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-finance-500",
              "flex items-center justify-center gap-2 transition-all"
            )}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Retirement</span>
          </TabsTrigger>
        </TabsList>

        <CardContent className="p-6 space-y-6">
          <TabsContent value="savings" className="space-y-6 mt-0">
            <div className="space-y-3">
              <label className="text-sm font-medium">
                Initial Deposit
                <span className="float-right text-sm font-semibold text-finance-700">
                  {formatCurrency(initialAmount)}
                </span>
              </label>
              <div className="flex items-center gap-4">
                <Slider 
                  value={[initialAmount]} 
                  min={0} 
                  max={10000} 
                  step={100}
                  onValueChange={(value) => setInitialAmount(value[0])}
                  className="flex-grow"
                />
                <Input
                  type="number"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">
                Monthly Deposit
                <span className="float-right text-sm font-semibold text-finance-700">
                  {formatCurrency(monthlyContribution)}
                </span>
              </label>
              <div className="flex items-center gap-4">
                <Slider 
                  value={[monthlyContribution]} 
                  min={0} 
                  max={2000} 
                  step={50}
                  onValueChange={(value) => setMonthlyContribution(value[0])}
                  className="flex-grow"
                />
                <Input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">
                Interest Rate (%)
                <span className="float-right text-sm font-semibold text-finance-700">
                  {interestRate}%
                </span>
              </label>
              <div className="flex items-center gap-4">
                <Slider 
                  value={[interestRate]} 
                  min={0.1} 
                  max={12} 
                  step={0.1}
                  onValueChange={(value) => setInterestRate(value[0])}
                  className="flex-grow"
                />
                <Input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-24"
                  step="0.1"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">
                Time Period (years)
                <span className="float-right text-sm font-semibold text-finance-700">
                  {years} years
                </span>
              </label>
              <div className="flex items-center gap-4">
                <Slider 
                  value={[years]} 
                  min={1} 
                  max={40} 
                  step={1}
                  onValueChange={(value) => setYears(value[0])}
                  className="flex-grow"
                />
                <Input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="investing" className="space-y-6 mt-0">
            <div className="space-y-3">
              <label className="text-sm font-medium">
                Initial Investment
                <span className="float-right text-sm font-semibold text-finance-700">
                  {formatCurrency(initialAmount)}
                </span>
              </label>
              <div className="flex items-center gap-4">
                <Slider 
                  value={[initialAmount]} 
                  min={0} 
                  max={50000} 
                  step={1000}
                  onValueChange={(value) => setInitialAmount(value[0])}
                  className="flex-grow"
                />
                <Input
                  type="number"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">
                Monthly Contribution
                <span className="float-right text-sm font-semibold text-finance-700">
                  {formatCurrency(monthlyContribution)}
                </span>
              </label>
              <div className="flex items-center gap-4">
                <Slider 
                  value={[monthlyContribution]} 
                  min={0} 
                  max={5000} 
                  step={100}
                  onValueChange={(value) => setMonthlyContribution(value[0])}
                  className="flex-grow"
                />
                <Input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">
                Expected Return (%)
                <span className="float-right text-sm font-semibold text-finance-700">
                  {interestRate}%
                </span>
              </label>
              <div className="flex items-center gap-4">
                <Slider 
                  value={[interestRate]} 
                  min={1} 
                  max={20} 
                  step={0.5}
                  onValueChange={(value) => setInterestRate(value[0])}
                  className="flex-grow"
                />
                <Input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-24"
                  step="0.5"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">
                Investment Period (years)
                <span className="float-right text-sm font-semibold text-finance-700">
                  {years} years
                </span>
              </label>
              <div className="flex items-center gap-4">
                <Slider 
                  value={[years]} 
                  min={1} 
                  max={40} 
                  step={1}
                  onValueChange={(value) => setYears(value[0])}
                  className="flex-grow"
                />
                <Input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="retirement" className="space-y-6 mt-0">
            <div className="space-y-3">
              <label className="text-sm font-medium">
                Desired Monthly Income
                <span className="float-right text-sm font-semibold text-finance-700">
                  {formatCurrency(initialAmount)}
                </span>
              </label>
              <div className="flex items-center gap-4">
                <Slider 
                  value={[initialAmount]} 
                  min={1000} 
                  max={20000} 
                  step={500}
                  onValueChange={(value) => setInitialAmount(value[0])}
                  className="flex-grow"
                />
                <Input
                  type="number"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">
                Current Savings
                <span className="float-right text-sm font-semibold text-finance-700">
                  {formatCurrency(monthlyContribution * 100)}
                </span>
              </label>
              <div className="flex items-center gap-4">
                <Slider 
                  value={[monthlyContribution]} 
                  min={0} 
                  max={100} 
                  step={1}
                  onValueChange={(value) => setMonthlyContribution(value[0])}
                  className="flex-grow"
                />
                <Input
                  type="number"
                  value={monthlyContribution * 100}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value) / 100)}
                  className="w-24"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">
                Expected Return (%)
                <span className="float-right text-sm font-semibold text-finance-700">
                  {interestRate}%
                </span>
              </label>
              <div className="flex items-center gap-4">
                <Slider 
                  value={[interestRate]} 
                  min={1} 
                  max={15} 
                  step={0.5}
                  onValueChange={(value) => setInterestRate(value[0])}
                  className="flex-grow"
                />
                <Input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-24"
                  step="0.5"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">
                Years Until Retirement
                <span className="float-right text-sm font-semibold text-finance-700">
                  {years} years
                </span>
              </label>
              <div className="flex items-center gap-4">
                <Slider 
                  value={[years]} 
                  min={1} 
                  max={50} 
                  step={1}
                  onValueChange={(value) => setYears(value[0])}
                  className="flex-grow"
                />
                <Input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>
          </TabsContent>
          
          <div className="py-4 border-t mt-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Projected Amount</div>
              <div className="text-4xl font-bold text-finance-700 my-2 animate-pulse-subtle">
                {formatCurrency(result)}
              </div>
              <p className="text-xs text-muted-foreground">
                Results are estimates and not financial advice
              </p>
            </div>
          </div>
        </CardContent>
      </Tabs>
      
      <CardFooter className="px-6 py-4 bg-secondary/50 flex justify-between">
        <Button 
          variant="outline" 
          className="text-sm"
          onClick={() => {
            setInitialAmount(1000);
            setMonthlyContribution(100);
            setInterestRate(5);
            setYears(10);
          }}
        >
          Reset
        </Button>
        <Button className="bg-finance-600 hover:bg-finance-700 text-white">Save Results</Button>
      </CardFooter>
    </Card>
  );
};

export default SavingsCalculator;
