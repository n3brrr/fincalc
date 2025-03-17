
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e0f2fe_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
      </div>

      <div className="relative pt-28 pb-20 sm:pt-36 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-finance-700 via-finance-600 to-finance-800 animate-fade-up">
              Calculate Your Financial Future
            </h1>
            
            <p className="max-w-2xl mx-auto mt-6 text-xl text-gray-600 animate-fade-up" style={{animationDelay: '0.2s'}}>
              Powerful tools to help you plan, save, and invest with confidence.
              Take control of your financial journey today.
            </p>
            
            <div className="mt-8 flex justify-center gap-4 animate-fade-up" style={{animationDelay: '0.3s'}}>
              <Button 
                className="bg-finance-600 hover:bg-finance-700 text-white px-6 py-6 rounded-xl text-lg"
              >
                Start 30-Day Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="border-finance-200 text-finance-700 hover:bg-finance-50 px-6 py-6 rounded-xl text-lg"
              >
                View Live Demo
              </Button>
            </div>
            
            <div className="mt-12">
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                {['No credit card required', 'Cancel anytime', '24/7 support'].map((item) => (
                  <div key={item} className="flex items-center text-sm text-muted-foreground">
                    <Check className="mr-2 h-4 w-4 text-finance-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white"
        aria-hidden="true"
      ></div>
    </div>
  );
};

export default HeroSection;
