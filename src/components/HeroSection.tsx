
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import DialogCalculator from './DialogCalculator';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e0f2fe_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
      </div>

      <div className="relative pt-28 pb-20 sm:pt-36 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-finance-700 via-finance-600 to-finance-800 animate-fade-up">
              {t('hero', 'title')}
            </h1>
            
            <p className="max-w-2xl mx-auto mt-6 text-xl text-gray-600 animate-fade-up" style={{animationDelay: '0.2s'}}>
              {t('hero', 'subtitle')}
            </p>
            
            <div className="mt-8 flex justify-center gap-4 animate-fade-up" style={{animationDelay: '0.3s'}}>
              <Link to="/auth">
                <Button 
                  className="bg-finance-600 hover:bg-finance-700 text-white px-6 py-6 rounded-xl text-lg"
                >
                  {t('hero', 'startTrial')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <DialogCalculator />
            </div>
            
            <div className="mt-12">
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                {[
                  { key: 'noCreditCard' },
                  { key: 'cancelAnytime' },
                  { key: 'support' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center text-sm text-muted-foreground">
                    <Check className="mr-2 h-4 w-4 text-finance-600" />
                    {t('hero', `features.${item.key}`)}
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
