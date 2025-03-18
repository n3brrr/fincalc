
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BudgetPlanner from '@/components/BudgetPlanner';
import { useLanguage } from '@/contexts/LanguageContext';

const BudgetPlannerPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t('budget', 'title') || 'Budget Planner'}
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                {t('budget', 'subtitle') || 'Manage your expenses and plan for a better financial future'}
              </p>
            </div>
            
            <BudgetPlanner />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BudgetPlannerPage;
