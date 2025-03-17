
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, CreditCard, LineChart, Home, PiggyBank } from 'lucide-react';

const DialogCalculator = () => {
  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [loanInterest, setLoanInterest] = useState<number>(5);
  const [loanTerm, setLoanTerm] = useState<number>(3);
  const [loanPayment, setLoanPayment] = useState<number | null>(null);

  // Mortgage Calculator State
  const [homePrice, setHomePrice] = useState<number>(300000);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [mortgageRate, setMortgageRate] = useState<number>(3.5);
  const [mortgageTerm, setMortgageTerm] = useState<number>(30);
  const [mortgagePayment, setMortgagePayment] = useState<number | null>(null);

  // Credit Card Payoff Calculator State
  const [creditBalance, setCreditBalance] = useState<number>(5000);
  const [creditAPR, setCreditAPR] = useState<number>(18);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(200);
  const [payoffTime, setPayoffTime] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  // Calculate loan payment
  const calculateLoanPayment = () => {
    const principal = loanAmount;
    const interest = loanInterest / 100 / 12;
    const payments = loanTerm * 12;
    
    const x = Math.pow(1 + interest, payments);
    const monthly = (principal * x * interest) / (x - 1);
    
    setLoanPayment(parseFloat(monthly.toFixed(2)));
  };

  // Calculate mortgage payment
  const calculateMortgagePayment = () => {
    const principal = homePrice - downPayment;
    const interest = mortgageRate / 100 / 12;
    const payments = mortgageTerm * 12;
    
    const x = Math.pow(1 + interest, payments);
    const monthly = (principal * x * interest) / (x - 1);
    
    setMortgagePayment(parseFloat(monthly.toFixed(2)));
  };

  // Calculate credit card payoff
  const calculateCreditPayoff = () => {
    const balance = creditBalance;
    const monthlyInterestRate = creditAPR / 100 / 12;
    let remainingBalance = balance;
    let months = 0;
    let interestPaid = 0;
    
    while (remainingBalance > 0) {
      const interestThisMonth = remainingBalance * monthlyInterestRate;
      interestPaid += interestThisMonth;
      
      if (monthlyPayment > remainingBalance + interestThisMonth) {
        remainingBalance = 0;
      } else {
        remainingBalance = remainingBalance + interestThisMonth - monthlyPayment;
      }
      
      months++;
      
      // Safety check to prevent infinite loops
      if (months > 600) break;
    }
    
    setPayoffTime(months);
    setTotalInterest(parseFloat(interestPaid.toFixed(2)));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-white text-finance-600 hover:bg-finance-50 border-finance-200 px-6 py-6 rounded-xl text-lg"
        >
          <Calculator className="mr-2 h-5 w-5" />
          Try Our Calculators
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">Financial Calculators</DialogTitle>
          <DialogDescription className="text-center">
            Use our suite of financial tools to make informed decisions
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="loan" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="loan" className="flex items-center gap-1.5">
              <CreditCard className="h-4 w-4" />
              <span>Loan</span>
            </TabsTrigger>
            <TabsTrigger value="mortgage" className="flex items-center gap-1.5">
              <Home className="h-4 w-4" />
              <span>Mortgage</span>
            </TabsTrigger>
            <TabsTrigger value="credit" className="flex items-center gap-1.5">
              <LineChart className="h-4 w-4" />
              <span>Credit Card</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Loan Calculator Tab */}
          <TabsContent value="loan">
            <Card>
              <CardHeader>
                <CardTitle>Loan Calculator</CardTitle>
                <CardDescription>Calculate your monthly loan payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loan-amount">Loan Amount ($)</Label>
                  <Input 
                    id="loan-amount" 
                    type="number" 
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loan-interest">Interest Rate (%)</Label>
                  <Input 
                    id="loan-interest" 
                    type="number" 
                    step="0.1"
                    value={loanInterest}
                    onChange={(e) => setLoanInterest(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loan-term">Loan Term (years)</Label>
                  <Input 
                    id="loan-term" 
                    type="number" 
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-stretch gap-4">
                <Button 
                  onClick={calculateLoanPayment}
                  className="w-full bg-finance-600 hover:bg-finance-700"
                >
                  Calculate Payment
                </Button>
                {loanPayment !== null && (
                  <div className="p-4 rounded-md bg-finance-50 text-center">
                    <p className="text-sm text-finance-700 mb-1">Your Monthly Payment</p>
                    <p className="text-2xl font-bold text-finance-800">${loanPayment.toLocaleString()}</p>
                  </div>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Mortgage Calculator Tab */}
          <TabsContent value="mortgage">
            <Card>
              <CardHeader>
                <CardTitle>Mortgage Calculator</CardTitle>
                <CardDescription>Estimate your monthly mortgage payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="home-price">Home Price ($)</Label>
                  <Input 
                    id="home-price" 
                    type="number" 
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="down-payment">Down Payment ($)</Label>
                  <Input 
                    id="down-payment" 
                    type="number" 
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mortgage-rate">Interest Rate (%)</Label>
                    <Input 
                      id="mortgage-rate" 
                      type="number" 
                      step="0.1"
                      value={mortgageRate}
                      onChange={(e) => setMortgageRate(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mortgage-term">Loan Term (years)</Label>
                    <Input 
                      id="mortgage-term" 
                      type="number" 
                      value={mortgageTerm}
                      onChange={(e) => setMortgageTerm(Number(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-stretch gap-4">
                <Button 
                  onClick={calculateMortgagePayment}
                  className="w-full bg-finance-600 hover:bg-finance-700"
                >
                  Calculate Payment
                </Button>
                {mortgagePayment !== null && (
                  <div className="p-4 rounded-md bg-finance-50 text-center">
                    <p className="text-sm text-finance-700 mb-1">Your Monthly Payment</p>
                    <p className="text-2xl font-bold text-finance-800">${mortgagePayment.toLocaleString()}</p>
                  </div>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Credit Card Payoff Calculator Tab */}
          <TabsContent value="credit">
            <Card>
              <CardHeader>
                <CardTitle>Credit Card Payoff</CardTitle>
                <CardDescription>See how long it will take to pay off your credit card</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="credit-balance">Current Balance ($)</Label>
                  <Input 
                    id="credit-balance" 
                    type="number" 
                    value={creditBalance}
                    onChange={(e) => setCreditBalance(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credit-apr">APR (%)</Label>
                  <Input 
                    id="credit-apr" 
                    type="number" 
                    step="0.1"
                    value={creditAPR}
                    onChange={(e) => setCreditAPR(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthly-payment">Monthly Payment ($)</Label>
                  <Input 
                    id="monthly-payment" 
                    type="number" 
                    value={monthlyPayment}
                    onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-stretch gap-4">
                <Button 
                  onClick={calculateCreditPayoff}
                  className="w-full bg-finance-600 hover:bg-finance-700"
                >
                  Calculate Payoff
                </Button>
                {payoffTime !== null && totalInterest !== null && (
                  <div className="p-4 rounded-md bg-finance-50 grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-finance-700 mb-1">Months to Pay Off</p>
                      <p className="text-2xl font-bold text-finance-800">{payoffTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-finance-700 mb-1">Total Interest</p>
                      <p className="text-2xl font-bold text-finance-800">${totalInterest.toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCalculator;
