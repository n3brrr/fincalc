import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const tiers = [
  {
    name: {
      en: 'Basic',
      es: 'Básico',
      fr: 'Basique',
      de: 'Basis',
      zh: '基础版',
    },
    id: 'basic',
    price: {
      monthly: 9.99,
      annually: 7.99
    },
    description: {
      en: 'Perfect for beginners to manage personal finances',
      es: 'Perfecto para principiantes en la gestión de finanzas personales',
      fr: 'Parfait pour les débutants pour gérer les finances personnelles',
      de: 'Perfekt für Anfänger zur Verwaltung persönlicher Finanzen',
      zh: '非常适合初学者管理个人财务',
    },
    features: {
      en: [
        'Essential financial calculators',
        'Save & export your calculations',
        'Basic financial reports',
        'Email support',
        'Desktop & mobile access',
      ],
      es: [
        'Calculadoras financieras esenciales',
        'Guarda y exporta tus cálculos',
        'Informes financieros básicos',
        'Soporte por email',
        'Acceso desde escritorio y móvil',
      ],
      fr: [
        'Calculatrices financières essentielles',
        'Sauvegardez et exportez vos calculs',
        'Rapports financiers de base',
        'Support par e-mail',
        'Accès depuis bureau et mobile',
      ],
      de: [
        'Wesentliche Finanzrechner',
        'Speichern & Exportieren Ihrer Berechnungen',
        'Grundlegende Finanzberichte',
        'E-Mail-Support',
        'Desktop- & Mobilzugriff',
      ],
      zh: [
        '基本财务计算器',
        '保存和导出您的计算结果',
        '基本财务报告',
        '电子邮件支持',
        '桌面和移动端访问',
      ],
    },
    notIncluded: {
      en: [
        'Advanced investment strategies',
        'Portfolio analysis',
        'Tax optimization tools',
        'Financial advisor access',
      ],
      es: [
        'Estrategias de inversión avanzadas',
        'Análisis de cartera',
        'Herramientas de optimización fiscal',
        'Acceso a asesor financiero',
      ],
      fr: [
        'Stratégies d\'investissement avancées',
        'Analyse de portefeuille',
        'Outils d\'optimisation fiscale',
        'Accès à un conseiller financier',
      ],
      de: [
        'Fortgeschrittene Anlagestrategien',
        'Portfolio-Analyse',
        'Steueroptimierungstools',
        'Zugang zu Finanzberatern',
      ],
      zh: [
        '高级投资策略',
        '投资组合分析',
        '税务优化工具',
        '财务顾问访问',
      ],
    },
    popular: false,
    buttonVariant: 'outline' as const,
  },
  {
    name: 'Pro',
    id: 'pro',
    price: {
      monthly: 19.99,
      annually: 16.99
    },
    description: 'For individuals with diverse financial goals',
    features: [
      'All Basic features',
      'Advanced investment strategies',
      'Portfolio analysis',
      'Retirement planning tools',
      'Priority support',
      'Goal tracking & projections',
      'Multi-account management',
    ],
    notIncluded: [
      'Tax optimization tools',
      'Financial advisor access',
    ],
    popular: true,
    buttonVariant: 'default' as const,
  },
  {
    name: 'Enterprise',
    id: 'enterprise',
    price: {
      monthly: 39.99,
      annually: 33.99
    },
    description: 'Complete financial management solution',
    features: [
      'All Pro features',
      'Tax optimization tools',
      'Financial advisor access',
      'Family account sharing',
      'Dedicated account manager',
      'Custom financial models',
      'API access',
      'White-label options',
    ],
    notIncluded: [],
    popular: false,
    buttonVariant: 'outline' as const,
  },
];

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
  const { language, t } = useLanguage();
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t('pricing', 'title')}
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          {t('pricing', 'subtitle')}
        </p>
        
        <div className="inline-flex items-center rounded-full p-1 bg-secondary mt-6">
          <Button
            variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBillingCycle('monthly')}
            className="rounded-full"
          >
            {t('pricing', 'monthly')}
          </Button>
          <Button
            variant={billingCycle === 'annually' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBillingCycle('annually')}
            className="rounded-full relative"
          >
            {t('pricing', 'annually')}
            <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] bg-finance-600 text-white">
              {t('pricing', 'save')}
            </Badge>
          </Button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <Card
            key={tier.id}
            className={cn(
              "relative flex flex-col justify-between transition-all duration-200 hover:shadow-xl",
              tier.popular ? "border-finance-500 shadow-lg" : "border-border"
            )}
          >
            {tier.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Badge className="px-3 py-1 bg-finance-600 text-white">
                  {t('pricing', 'mostPopular')}
                </Badge>
              </div>
            )}
            <div>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">{tier.name[language as keyof typeof tier.name]}</CardTitle>
                <CardDescription>{tier.description[language as keyof typeof tier.description]}</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">
                    ${billingCycle === 'monthly' ? tier.price.monthly : tier.price.annually}
                  </span>
                  <span className="ml-1 text-sm text-muted-foreground">
                    {t('pricing', 'perMonth')}
                  </span>
                </div>
                <ul className="space-y-2 text-sm">
                  {tier.features[language as keyof typeof tier.features].map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {tier.notIncluded[language as keyof typeof tier.notIncluded].map((feature) => (
                    <li key={feature} className="flex items-center text-muted-foreground">
                      <XIcon className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </div>
            <CardFooter>
              <Button 
                className={cn(
                  "w-full",
                  tier.popular 
                    ? "bg-finance-600 hover:bg-finance-700 text-white" 
                    : "border-finance-600 text-finance-700 hover:bg-finance-50"
                )}
                variant={tier.buttonVariant}
              >
                {t('pricing', 'startFreeTrial')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8 text-sm text-muted-foreground">
        {t('pricing', 'taxNote')}
      </div>
    </div>
  );
};

export default PricingSection;
