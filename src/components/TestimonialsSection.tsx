
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    content: "This calculator has completely transformed how I plan for retirement. The interface is beautiful and so intuitive to use. I've recommended it to all my colleagues.",
    author: {
      name: "Sarah Johnson",
      title: "Marketing Director",
      image: "/placeholder.svg",
      initial: "SJ"
    }
  },
  {
    content: "I've tried many financial tools, but this one stands out for its simplicity and power. The investment projections have been remarkably accurate for my portfolio.",
    author: {
      name: "Michael Chen",
      title: "Software Engineer",
      image: "/placeholder.svg",
      initial: "MC"
    }
  },
  {
    content: "As a financial advisor, I recommend this tool to all my clients. It makes complex calculations accessible to everyone, regardless of their financial literacy.",
    author: {
      name: "David Rodriguez",
      title: "Financial Advisor",
      image: "/placeholder.svg",
      initial: "DR"
    }
  }
];

const TestimonialsSection = () => {
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
                  <p className="text-lg text-gray-700 italic">"{testimonial.content}"</p>
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
                    <p className="text-sm text-gray-500">{testimonial.author.title}</p>
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
