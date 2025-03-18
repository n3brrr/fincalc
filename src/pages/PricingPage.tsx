
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingSection from '@/components/PricingSection';
import { useLanguage } from '@/contexts/LanguageContext';

const PricingPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t('pricing', 'pageTitle') || 'Choose the Right Plan for You'}
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                {t('pricing', 'pageSubtitle') || 'Select a plan that fits your financial goals'}
              </p>
            </div>
            
            <PricingSection />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PricingPage;
