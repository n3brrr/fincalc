
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const testimonials = [
  {
    content: {
      en: "This calculator has completely transformed how I plan for retirement. The interface is beautiful and so intuitive to use. I've recommended it to all my colleagues.",
      es: "Esta calculadora ha transformado completamente la forma en que planifico mi jubilación. La interfaz es hermosa y muy intuitiva de usar. Se la he recomendado a todos mis colegas.",
      fr: "Cette calculatrice a complètement transformé ma façon de planifier ma retraite. L'interface est magnifique et très intuitive. Je l'ai recommandée à tous mes collègues.",
      de: "Dieser Rechner hat die Art und Weise, wie ich für den Ruhestand plane, komplett verändert. Die Oberfläche ist schön und so intuitiv zu bedienen. Ich habe es allen meinen Kollegen empfohlen.",
      zh: "这个计算器彻底改变了我规划退休的方式。界面美观且直观易用。我已经向所有同事推荐了它。",
    },
    author: {
      name: "Sarah Johnson",
      title: {
        en: "Marketing Director",
        es: "Directora de Marketing",
        fr: "Directrice Marketing",
        de: "Marketing Direktorin",
        zh: "市场总监",
      },
      image: "/placeholder.svg",
      initial: "SJ"
    }
  },
  {
    content: {
      en: "I've tried many financial tools, but this one stands out for its simplicity and power. The investment projections have been remarkably accurate for my portfolio.",
      es: "He probado muchas herramientas financieras, pero esta destaca por su simplicidad y potencia. Las proyecciones de inversión han sido notablemente precisas para mi cartera.",
      fr: "J'ai essayé de nombreux outils financiers, mais celui-ci se démarque par sa simplicité et sa puissance. Les projections d'investissement ont été remarquablement précises pour mon portefeuille.",
      de: "Ich habe viele Finanztools ausprobiert, aber dieses zeichnet sich durch seine Einfachheit und Leistungsfähigkeit aus. Die Anlageprognosen waren für mein Portfolio bemerkenswert genau.",
      zh: "我尝试过许多财务工具，但这个以其简单性和强大功能脱颖而出。投资预测对我的投资组合来说非常准确。",
    },
    author: {
      name: "Michael Chen",
      title: {
        en: "Software Engineer",
        es: "Ingeniero de Software",
        fr: "Ingénieur Logiciel",
        de: "Softwareingenieur",
        zh: "软件工程师",
      },
      image: "/placeholder.svg",
      initial: "MC"
    }
  },
  {
    content: {
      en: "As a financial advisor, I recommend this tool to all my clients. It makes complex calculations accessible to everyone, regardless of their financial literacy.",
      es: "Como asesor financiero, recomiendo esta herramienta a todos mis clientes. Hace que los cálculos complejos sean accesibles para todos, independientemente de su educación financiera.",
      fr: "En tant que conseiller financier, je recommande cet outil à tous mes clients. Il rend les calculs complexes accessibles à tous, quelle que soit leur culture financière.",
      de: "Als Finanzberater empfehle ich dieses Tool allen meinen Kunden. Es macht komplexe Berechnungen für jeden zugänglich, unabhängig von ihrer finanziellen Bildung.",
      zh: "作为财务顾问，我向所有客户推荐这个工具。它使复杂的计算对每个人都变得易于理解，无论其财务知识如何。",
    },
    author: {
      name: "David Rodriguez",
      title: {
        en: "Financial Advisor",
        es: "Asesor Financiero",
        fr: "Conseiller Financier",
        de: "Finanzberater",
        zh: "财务顾问",
      },
      image: "/placeholder.svg",
      initial: "DR"
    }
  }
];

const TestimonialsSection = () => {
  const { language, t } = useLanguage();
  
  return (
    <div className="bg-finance-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Trusted by thousands of individuals and professionals
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="h-full bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-8 flex flex-col justify-between h-full">
                <div>
                  <Quote className="h-8 w-8 text-finance-300 mb-4" />
                  <p className="text-lg text-gray-700 italic">"{testimonial.content[language as keyof typeof testimonial.content]}"</p>
                </div>
                
                <div className="flex items-center mt-8">
                  <Avatar className="h-12 w-12 border-2 border-finance-100">
                    <AvatarImage src={testimonial.author.image} alt={testimonial.author.name} />
                    <AvatarFallback className="bg-finance-100 text-finance-700">
                      {testimonial.author.initial}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900">{testimonial.author.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.author.title[language as keyof typeof testimonial.author.title]}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
