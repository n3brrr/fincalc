
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh';

// Define translations interface
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Create translations for different parts of the site
const translations: Translations = {
  header: {
    home: {
      en: 'Home',
      es: 'Inicio',
      fr: 'Accueil',
      de: 'Startseite',
      zh: '主页',
    },
    features: {
      en: 'Features',
      es: 'Características',
      fr: 'Fonctionnalités',
      de: 'Funktionen',
      zh: '功能',
    },
    pricing: {
      en: 'Pricing',
      es: 'Precios',
      fr: 'Tarifs',
      de: 'Preise',
      zh: '价格',
    },
    contact: {
      en: 'Contact',
      es: 'Contacto',
      fr: 'Contact',
      de: 'Kontakt',
      zh: '联系我们',
    },
    startFreeTrial: {
      en: 'Start Free Trial',
      es: 'Comenzar Prueba Gratuita',
      fr: 'Commencer l\'essai gratuit',
      de: 'Kostenlose Testversion starten',
      zh: '开始免费试用',
    },
  },
  hero: {
    title: {
      en: 'Calculate Your Financial Future',
      es: 'Calcula Tu Futuro Financiero',
      fr: 'Calculez Votre Avenir Financier',
      de: 'Berechnen Sie Ihre Finanzielle Zukunft',
      zh: '计算您的财务未来',
    },
    subtitle: {
      en: 'Powerful tools to help you plan, save, and invest with confidence. Take control of your financial journey today.',
      es: 'Herramientas potentes para ayudarte a planificar, ahorrar e invertir con confianza. Toma el control de tu viaje financiero hoy.',
      fr: 'Des outils puissants pour vous aider à planifier, économiser et investir en toute confiance. Prenez le contrôle de votre parcours financier dès aujourd\'hui.',
      de: 'Leistungsstarke Tools, die Ihnen helfen, mit Zuversicht zu planen, zu sparen und zu investieren. Übernehmen Sie noch heute die Kontrolle über Ihre finanzielle Reise.',
      zh: '强大的工具，帮助您自信地规划、储蓄和投资。今天就掌控您的财务之旅。',
    },
    tryCalculators: {
      en: 'Try All Calculators',
      es: 'Probar Todas las Calculadoras',
      fr: 'Essayer Toutes les Calculatrices',
      de: 'Alle Rechner ausprobieren',
      zh: '尝试所有计算器',
    },
    startTrial: {
      en: 'Start 30-Day Free Trial',
      es: 'Comenzar Prueba Gratuita de 30 Días',
      fr: 'Commencer l\'essai gratuit de 30 jours',
      de: '30-tägige kostenlose Testversion starten',
      zh: '开始30天免费试用',
    },
    features: {
      noCreditCard: {
        en: 'No credit card required',
        es: 'No se requiere tarjeta de crédito',
        fr: 'Aucune carte de crédit requise',
        de: 'Keine Kreditkarte erforderlich',
        zh: '无需信用卡',
      },
      cancelAnytime: {
        en: 'Cancel anytime',
        es: 'Cancela cuando quieras',
        fr: 'Annulez à tout moment',
        de: 'Jederzeit kündbar',
        zh: '随时取消',
      },
      support: {
        en: '24/7 support',
        es: 'Soporte 24/7',
        fr: 'Support 24/7',
        de: '24/7 Support',
        zh: '24/7全天候支持',
      },
    },
  },
  calculators: {
    title: {
      en: 'Powerful Calculators at Your Fingertips',
      es: 'Potentes Calculadoras a Tu Alcance',
      fr: 'Des Calculatrices Puissantes à Portée de Main',
      de: 'Leistungsstarke Rechner an Ihren Fingerspitzen',
      zh: '强大的计算器触手可及',
    },
    subtitle: {
      en: 'Our intuitive tools help you make smart financial decisions with ease',
      es: 'Nuestras herramientas intuitivas te ayudan a tomar decisiones financieras inteligentes con facilidad',
      fr: 'Nos outils intuitifs vous aident à prendre facilement des décisions financières intelligentes',
      de: 'Unsere intuitiven Tools helfen Ihnen, mühelos intelligente finanzielle Entscheidungen zu treffen',
      zh: '我们的直观工具帮助您轻松做出明智的财务决策',
    },
  },
  budget: {
    title: {
      en: 'Plan Your Budget',
      es: 'Planifica Tu Presupuesto',
      fr: 'Planifiez Votre Budget',
      de: 'Planen Sie Ihr Budget',
      zh: '规划您的预算',
    },
    subtitle: {
      en: 'Visualize your spending and find ways to save more each month',
      es: 'Visualiza tus gastos y encuentra formas de ahorrar más cada mes',
      fr: 'Visualisez vos dépenses et trouvez des moyens d\'économiser davantage chaque mois',
      de: 'Visualisieren Sie Ihre Ausgaben und finden Sie Wege, jeden Monat mehr zu sparen',
      zh: '可视化您的支出，找到每月节省更多的方法',
    },
  },
  cta: {
    title: {
      en: 'Ready to transform your financial future?',
      es: '¿Listo para transformar tu futuro financiero?',
      fr: 'Prêt à transformer votre avenir financier?',
      de: 'Bereit, Ihre finanzielle Zukunft zu verändern?',
      zh: '准备好改变您的财务未来了吗？',
    },
    subtitle: {
      en: 'Join thousands of users making smarter financial decisions every day.',
      es: 'Únete a miles de usuarios que toman decisiones financieras más inteligentes todos los días.',
      fr: 'Rejoignez des milliers d\'utilisateurs qui prennent des décisions financières plus intelligentes chaque jour.',
      de: 'Schließen Sie sich Tausenden von Benutzern an, die jeden Tag intelligentere finanzielle Entscheidungen treffen.',
      zh: '加入数千名每天做出更明智财务决策的用户。',
    },
    button: {
      en: 'Start Your 30-Day Free Trial',
      es: 'Comienza Tu Prueba Gratuita de 30 Días',
      fr: 'Commencez Votre Essai Gratuit de 30 Jours',
      de: 'Starten Sie Ihre 30-tägige kostenlose Testversion',
      zh: '开始您的30天免费试用',
    },
    noCreditCard: {
      en: 'No credit card required. Cancel anytime.',
      es: 'No se requiere tarjeta de crédito. Cancela cuando quieras.',
      fr: 'Aucune carte de crédit requise. Annulez à tout moment.',
      de: 'Keine Kreditkarte erforderlich. Jederzeit kündbar.',
      zh: '无需信用卡。随时取消。',
    },
  },
  pricing: {
    title: {
      en: 'Choose the right plan for you',
      es: 'Elige el plan adecuado para ti',
      fr: 'Choisissez le forfait qui vous convient',
      de: 'Wählen Sie den richtigen Plan für Sie',
      zh: '选择适合您的计划',
    },
    subtitle: {
      en: 'All plans include a 30-day free trial. No credit card required.',
      es: 'Todos los planes incluyen una prueba gratuita de 30 días. No se requiere tarjeta de crédito.',
      fr: 'Tous les forfaits comprennent un essai gratuit de 30 jours. Aucune carte de crédit requise.',
      de: 'Alle Pläne beinhalten eine 30-tägige kostenlose Testversion. Keine Kreditkarte erforderlich.',
      zh: '所有计划均包含30天免费试用。无需信用卡。',
    },
    monthly: {
      en: 'Monthly',
      es: 'Mensual',
      fr: 'Mensuel',
      de: 'Monatlich',
      zh: '月付',
    },
    annually: {
      en: 'Annually',
      es: 'Anual',
      fr: 'Annuel',
      de: 'Jährlich',
      zh: '年付',
    },
    save: {
      en: 'Save 20%',
      es: 'Ahorra 20%',
      fr: 'Économisez 20%',
      de: 'Sparen Sie 20%',
      zh: '节省20%',
    },
    perMonth: {
      en: '/month',
      es: '/mes',
      fr: '/mois',
      de: '/Monat',
      zh: '/月',
    },
    startFreeTrial: {
      en: 'Start free trial',
      es: 'Comenzar prueba gratuita',
      fr: 'Commencer l\'essai gratuit',
      de: 'Kostenlose Testversion starten',
      zh: '开始免费试用',
    },
    mostPopular: {
      en: 'Most Popular',
      es: 'Más Popular',
      fr: 'Le Plus Populaire',
      de: 'Am beliebtesten',
      zh: '最受欢迎',
    },
    taxNote: {
      en: 'All prices are in USD and exclude applicable taxes',
      es: 'Todos los precios están en USD y excluyen impuestos aplicables',
      fr: 'Tous les prix sont en USD et hors taxes applicables',
      de: 'Alle Preise sind in USD und verstehen sich zuzüglich der geltenden Steuern',
      zh: '所有价格均以美元计算，不包含适用税费',
    },
  },
};

// Define the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (section: string, key: string) => string;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

// Create a provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Translation function
  const t = (section: string, key: string): string => {
    if (translations[section] && translations[section][key] && translations[section][key][language]) {
      return translations[section][key][language];
    }
    return `[${section}.${key}]`;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
