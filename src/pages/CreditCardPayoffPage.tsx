
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, LineChart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

const CreditCardPayoffPage = () => {
  const { t } = useLanguage();
  const [creditBalance, setCreditBalance] = useState<number>(5000);
  const [creditAPR, setCreditAPR] = useState<number>(18);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(200);
  const [payoffTime, setPayoffTime] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPaid, setTotalPaid] = useState<number | null>(null);

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
    setTotalPaid(parseFloat((creditBalance + interestPaid).toFixed(2)));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t('calculators', 'creditTitle') || 'Credit Card Payoff Calculator'}
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                {t('calculators', 'creditSubtitle') || 'See how long it will take to pay off your credit card debt'}
              </p>
            </div>
            
            <div className="max-w-lg mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <LineChart className="h-6 w-6 text-finance-600" />
                    <CardTitle>Credit Card Payoff</CardTitle>
                  </div>
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
                      min={100}
                      max={100000}
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
                      min={0.1}
                      max={35}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthly-payment">Monthly Payment ($)</Label>
                    <Input 
                      id="monthly-payment" 
                      type="number" 
                      value={monthlyPayment}
                      onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                      min={10}
                      max={10000}
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
                      
                      {totalPaid !== null && (
                        <div className="col-span-2 mt-3 pt-3 border-t border-finance-100 grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="text-gray-500">Total Investment</p>
                            <p className="font-semibold">${creditBalance.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Total Interest</p>
                            <p className="font-semibold text-green-600">+${totalInterest.toLocaleString()}</p>
                          </div>
                        </div>
                      )}
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

export default CreditCardPayoffPage;
