
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { CalendarIcon, Clock, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

// Define article interface
interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
}

const MOCK_ARTICLES = [
  {
    id: '1',
    title: 'Stock Market Hits New Record High',
    description: 'Major indexes climbed to record highs on Wednesday as investors remained optimistic about economic growth and corporate earnings.',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60',
    publishedAt: new Date().toISOString(),
    source: 'Financial Times'
  },
  {
    id: '2',
    title: 'Central Bank Maintains Interest Rates',
    description: 'The Federal Reserve announced it will keep interest rates steady following its latest policy meeting, citing balanced risks to economic outlook.',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=60',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    source: 'Bloomberg'
  },
  {
    id: '3',
    title: 'Tech Giants Report Strong Quarterly Earnings',
    description: 'Major technology companies exceeded analyst expectations with their latest quarterly reports, driven by cloud computing and AI innovations.',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    source: 'Wall Street Journal'
  },
];

const BlogPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // In a real implementation, this would be an API call to the server
        // For now, we'll use mock data
        // const response = await fetch('/api/financial-news');
        // const data = await response.json();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setArticles(MOCK_ARTICLES);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: t('blog', 'error'),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [t, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t('blog', 'title')}
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                {t('blog', 'subtitle')}
              </p>
            </div>
            
            {loading ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-video w-full">
                      <Skeleton className="h-full w-full" />
                    </div>
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-10 w-1/3" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <Card key={article.id} className="overflow-hidden flex flex-col h-full">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        {format(new Date(article.publishedAt), 'MMM d, yyyy')}
                        <span className="mx-2">•</span>
                        <span>{article.source}</span>
                      </div>
                      <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="line-clamp-3">
                        {article.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="text-finance-600 border-finance-600 hover:bg-finance-50"
                        asChild
                      >
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                          {t('blog', 'readMore')}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
