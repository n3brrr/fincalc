
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import SavingsCalculator from '@/components/SavingsCalculator';
import BudgetPlanner from '@/components/BudgetPlanner';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PricingSection from '@/components/PricingSection';
import { Button } from '@/components/ui/button';
import { ArrowRight, MousePointerClick } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* Calculator Preview Section */}
        <div className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Powerful Calculators at Your Fingertips
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Our intuitive tools help you make smart financial decisions with ease
              </p>
              <div className="absolute right-24 top-28 hidden lg:block animate-float">
                <MousePointerClick className="h-8 w-8 text-finance-500" />
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <SavingsCalculator />
            </div>
            
            <div className="mt-16 text-center">
              <Button 
                className="bg-finance-600 hover:bg-finance-700 text-white px-6 py-6 rounded-xl text-lg"
              >
                Try All Calculators
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Budget Planner Section */}
        <div className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Plan Your Budget
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Visualize your spending and find ways to save more each month
              </p>
            </div>
            
            <BudgetPlanner />
          </div>
        </div>
        
        <FeaturesSection />
        
        <TestimonialsSection />
        
        <PricingSection />
        
        {/* CTA Section */}
        <div className="bg-finance-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Ready to transform your financial future?
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-finance-100">
                Join thousands of users making smarter financial decisions every day.
              </p>
              <div className="mt-8">
                <Button 
                  className="bg-white text-finance-600 hover:bg-finance-50 px-6 py-6 rounded-xl text-lg"
                >
                  Start Your 30-Day Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <p className="mt-4 text-sm text-finance-200">
                No credit card required. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
