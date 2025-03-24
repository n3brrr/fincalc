
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

const MortgageCalculatorPage = () => {
  const { t } = useLanguage();
  const [homePrice, setHomePrice] = useState<number>(300000);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [mortgageRate, setMortgageRate] = useState<number>(3.5);
  const [mortgageTerm, setMortgageTerm] = useState<number>(30);
  const [mortgagePayment, setMortgagePayment] = useState<number | null>(null);

  const calculateMortgagePayment = () => {
    const principal = homePrice - downPayment;
    const interest = mortgageRate / 100 / 12;
    const payments = mortgageTerm * 12;
    
    const x = Math.pow(1 + interest, payments);
    const monthly = (principal * x * interest) / (x - 1);
    
    setMortgagePayment(isNaN(monthly) ? null : parseFloat(monthly.toFixed(2)));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t('calculators', 'mortgageTitle') || 'Mortgage Calculator'}
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                {t('calculators', 'mortgageSubtitle') || 'Estimate your monthly mortgage payments'}
              </p>
            </div>
            
            <div className="max-w-lg mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Home className="h-6 w-6 text-finance-600" />
                    <CardTitle>Mortgage Calculator</CardTitle>
                  </div>
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
                      min={50000}
                      max={2000000}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="down-payment">Down Payment ($)</Label>
                    <Input 
                      id="down-payment" 
                      type="number" 
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      min={0}
                      max={500000}
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
                        min={0.1}
                        max={20}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mortgage-term">Loan Term (years)</Label>
                      <Input 
                        id="mortgage-term" 
                        type="number" 
                        value={mortgageTerm}
                        onChange={(e) => setMortgageTerm(Number(e.target.value))}
                        min={1}
                        max={50}
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
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MortgageCalculatorPage;
