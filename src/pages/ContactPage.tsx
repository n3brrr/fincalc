
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t('contact', 'title') || 'Contact Us'}
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                {t('contact', 'subtitle') || 'Have questions? We\'re here to help you'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>{t('contact', 'formTitle') || 'Send us a message'}</CardTitle>
                  <CardDescription>
                    {t('contact', 'formDescription') || 'Fill out the form and our team will get back to you within 24 hours'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('contact', 'name') || 'Name'}</Label>
                    <Input id="name" placeholder={t('contact', 'namePlaceholder') || 'Your name'} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('contact', 'email') || 'Email'}</Label>
                    <Input id="email" type="email" placeholder={t('contact', 'emailPlaceholder') || 'Your email'} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">{t('contact', 'message') || 'Message'}</Label>
                    <Textarea id="message" placeholder={t('contact', 'messagePlaceholder') || 'Your message'} rows={4} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-finance-600 hover:bg-finance-700">
                    {t('contact', 'send') || 'Send Message'}
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="flex flex-col justify-center">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">
                    {t('contact', 'reachUs') || 'Other ways to reach us'}
                  </h3>
                  
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-finance-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">{t('contact', 'email') || 'Email'}</h4>
                      <p className="text-gray-600">support@fincalc.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-finance-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">{t('contact', 'phone') || 'Phone'}</h4>
                      <p className="text-gray-600">+1 (800) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-finance-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">{t('contact', 'address') || 'Address'}</h4>
                      <p className="text-gray-600">123 Finance Street, San Francisco, CA 94107</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
