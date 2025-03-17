
import React from 'react';
import { 
  Calculator, 
  PiggyBank, 
  LineChart, 
  BarChart3, 
  RefreshCw, 
  Shield, 
  Clock, 
  User, 
  CreditCard,
  Home,
  DollarSign,
  BriefcaseBusiness,
  BanknoteIcon,
  CoinsIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    title: 'Savings Calculator',
    description: 'Plan your savings strategy with our powerful compound interest calculator.',
    icon: PiggyBank,
    color: 'bg-blue-100 text-blue-700',
  },
  {
    title: 'Investment Projections',
    description: 'Visualize potential investment growth based on different strategies.',
    icon: LineChart,
    color: 'bg-green-100 text-green-700',
  },
  {
    title: 'Retirement Planning',
    description: 'Calculate how much you need to save for a comfortable retirement.',
    icon: BarChart3,
    color: 'bg-purple-100 text-purple-700',
  },
  {
    title: 'Budget Optimizer',
    description: 'Find the optimal allocation of your income across various expense categories.',
    icon: Calculator,
    color: 'bg-amber-100 text-amber-700',
  },
  {
    title: 'Real-time Updates',
    description: 'See how market changes affect your financial plans with instant recalculations.',
    icon: RefreshCw,
    color: 'bg-sky-100 text-sky-700',
  },
  {
    title: 'Secure Data',
    description: 'Your financial information is always protected with enterprise-grade security.',
    icon: Shield,
    color: 'bg-red-100 text-red-700',
  },
  {
    title: 'Loan Calculator',
    description: 'Calculate monthly payments, interest costs, and amortization for any loan.',
    icon: CreditCard,
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    title: 'Mortgage Calculator',
    description: 'Find out how much home you can afford and estimate your monthly payments.',
    icon: Home,
    color: 'bg-indigo-100 text-indigo-700',
  },
  {
    title: 'Tax Estimator',
    description: 'Predict your tax liability and plan for refunds or payments.',
    icon: BriefcaseBusiness,
    color: 'bg-rose-100 text-rose-700',
  },
  {
    title: 'Net Worth Tracker',
    description: 'Track all your assets and liabilities in one place to calculate your net worth.',
    icon: DollarSign,
    color: 'bg-violet-100 text-violet-700',
  },
  {
    title: 'Debt Payoff Planner',
    description: 'Create a strategy to eliminate debt quickly using snowball or avalanche methods.',
    icon: CoinsIcon,
    color: 'bg-orange-100 text-orange-700',
  },
  {
    title: 'Income Calculator',
    description: 'Calculate your take-home pay after taxes and deductions.',
    icon: BanknoteIcon,
    color: 'bg-teal-100 text-teal-700',
  },
];

const FeaturesSection = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Powerful Financial Tools
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Everything you need to make informed financial decisions
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.title} className="group relative">
                <div className={cn(
                  "absolute flex h-14 w-14 items-center justify-center rounded-xl",
                  feature.color
                )}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="pl-20">
                  <h3 className="text-lg font-medium text-gray-900 transition duration-200 group-hover:text-finance-600">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
