
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

const LoanCalculatorPage = () => {
  const { t } = useLanguage();
  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [loanInterest, setLoanInterest] = useState<number>(5);
  const [loanTerm, setLoanTerm] = useState<number>(3);
  const [loanPayment, setLoanPayment] = useState<number | null>(null);

  const calculateLoanPayment = () => {
    const principal = loanAmount;
    const interest = loanInterest / 100 / 12;
    const payments = loanTerm * 12;
    
    const x = Math.pow(1 + interest, payments);
    const monthly = (principal * x * interest) / (x - 1);
    
    setLoanPayment(parseFloat(monthly.toFixed(2)));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t('calculators', 'loanTitle') || 'Loan Calculator'}
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                {t('calculators', 'loanSubtitle') || 'Calculate your monthly loan payments and plan your finances better'}
              </p>
            </div>
            
            <div className="max-w-lg mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-finance-600" />
                    <CardTitle>Loan Calculator</CardTitle>
                  </div>
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
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoanCalculatorPage;
