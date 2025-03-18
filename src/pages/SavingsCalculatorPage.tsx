
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SavingsCalculator from '@/components/SavingsCalculator';
import { useLanguage } from '@/contexts/LanguageContext';

const SavingsCalculatorPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t('calculators', 'savingsTitle') || 'Savings Calculator'}
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                {t('calculators', 'savingsSubtitle') || 'Plan your savings and see how your money can grow over time'}
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <SavingsCalculator />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SavingsCalculatorPage;
