
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
import './App.css';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
