
import { Route, Routes } from 'react-router-dom';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import SavingsCalculatorPage from '@/pages/SavingsCalculatorPage';
import BudgetPlannerPage from '@/pages/BudgetPlannerPage';
import LoanCalculatorPage from '@/pages/LoanCalculatorPage';
import MortgageCalculatorPage from '@/pages/MortgageCalculatorPage';
import CreditCardPayoffPage from '@/pages/CreditCardPayoffPage';
import PricingPage from '@/pages/PricingPage';
import FeaturesPage from '@/pages/FeaturesPage';
import ContactPage from '@/pages/ContactPage';
import BlogPage from '@/pages/BlogPage';
import AuthPage from '@/pages/AuthPage';
import './App.css';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from './lib/supabase';

function App() {
  useEffect(() => {
    // Show toast message if Supabase credentials are missing
    if (!supabase) {
      toast({
        title: "Development Mode",
        description: "Supabase credentials are missing. Authentication features will be simulated.",
        duration: 5000,
      });
    }
  }, []);

  return (
    <LanguageProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/savings-calculator" element={<SavingsCalculatorPage />} />
          <Route path="/budget-planner" element={<BudgetPlannerPage />} />
          <Route path="/loan-calculator" element={<LoanCalculatorPage />} />
          <Route path="/mortgage-calculator" element={<MortgageCalculatorPage />} />
          <Route path="/credit-card-payoff" element={<CreditCardPayoffPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
