
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { CalendarIcon, Clock, ExternalLink, ChevronDown, X } from 'lucide-react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';

// Define article interface
interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
}

// Expanded mock articles list
const MOCK_ARTICLES = [
  {
    id: '1',
    title: 'Stock Market Hits New Record High',
    description: 'Major indexes climbed to record highs on Wednesday as investors remained optimistic about economic growth and corporate earnings.',
    content: 'Major indexes climbed to record highs on Wednesday as investors remained optimistic about economic growth and corporate earnings. The S&P 500 rose 1.2% to close at a new record, while the Nasdaq Composite gained 1.5%. Technology stocks led the rally, with semiconductor companies posting strong gains after positive earnings reports. Analysts point to robust corporate profits and a resilient U.S. economy as the primary drivers of the ongoing bull market, despite concerns about inflation and higher interest rates. Federal Reserve officials have signaled they remain cautious about future rate cuts, preferring to see more consistent evidence that inflation is returning to their 2% target.',
    url: 'https://www.investing.com/news/stock-market-news/stock-market-today-sp-500-dow-close-at-record-highs-as-powell-reassures-markets-93CH',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60',
    publishedAt: new Date().toISOString(),
    source: 'Financial Times'
  },
  {
    id: '2',
    title: 'Central Bank Maintains Interest Rates',
    description: 'The Federal Reserve announced it will keep interest rates steady following its latest policy meeting, citing balanced risks to economic outlook.',
    content: 'The Federal Reserve announced it will keep interest rates steady following its latest policy meeting, with officials citing balanced risks to both economic growth and inflation. The decision to maintain the federal funds rate in the range of 5.25% to 5.50% was unanimous among voting members of the Federal Open Market Committee. In his press conference, Fed Chair Jerome Powell indicated that while inflation has shown signs of moderating, it remains above the central bank\'s 2% target. Market participants are now focusing on economic data releases in coming weeks to gauge the timing of potential rate cuts later this year. Bond yields fell slightly following the announcement, while stocks showed mixed reactions.',
    url: 'https://www.investing.com/news/economy/fed-holds-rates-steady-signals-potential-for-cuts-if-inflation-continues-to-ease-93CH',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=60',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    source: 'Bloomberg'
  },
  {
    id: '3',
    title: 'Tech Giants Report Strong Quarterly Earnings',
    description: 'Major technology companies exceeded analyst expectations with their latest quarterly reports, driven by cloud computing and AI innovations.',
    content: 'Major technology companies have exceeded analyst expectations with their latest quarterly reports, with several tech giants reporting double-digit revenue growth driven primarily by cloud computing services and artificial intelligence innovations. Companies including Microsoft, Alphabet, and Amazon highlighted increasing demand for their AI-powered products and services. Microsoft\'s Azure cloud business grew by 29% year-over-year, while Google Cloud reported a 26% increase. The strong performance in the technology sector has helped lift broader market indices, with the Nasdaq Composite reaching new all-time highs. Analysts are now revising their earnings forecasts upward for the remainder of the year, despite ongoing concerns about technology valuations and regulatory scrutiny.',
    url: 'https://www.investing.com/news/stock-market-news/tech-earnings-power-market-rally-as-ai-investments-pay-off-93CH',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    source: 'Wall Street Journal'
  },
  {
    id: '4',
    title: 'Oil Prices Surge on Middle East Tensions',
    description: 'Crude oil prices jumped more than 3% as geopolitical tensions in the Middle East raised concerns about potential supply disruptions.',
    content: 'Crude oil prices jumped more than 3% on Thursday as geopolitical tensions in the Middle East raised concerns about potential supply disruptions. Brent crude futures rose to $86.75 per barrel, while U.S. West Texas Intermediate crude reached $82.40. The price increase followed reports of escalating conflicts that could potentially affect oil production and transportation in the region. Energy analysts note that the market remains sensitive to geopolitical developments, despite generally adequate global oil supplies. OPEC+ members are scheduled to meet next month to review their production policy, with some analysts suggesting the group might consider increasing output if prices continue to rise. The International Energy Agency has maintained its forecast for global oil demand growth this year, citing recovery in air travel and industrial activity.',
    url: 'https://www.investing.com/news/commodities-news/oil-jumps-3-on-middle-east-tensions-and-improved-demand-outlook-93CH',
    imageUrl: 'https://images.unsplash.com/photo-1510146758428-e5e4b17b8b6a?w=800&auto=format&fit=crop&q=60',
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    source: 'Reuters'
  },
  {
    id: '5',
    title: 'Crypto Market Rebounds as Bitcoin Crosses $60,000',
    description: 'The cryptocurrency market showed signs of recovery with Bitcoin surpassing the $60,000 mark for the first time in several weeks.',
    content: 'The cryptocurrency market showed signs of recovery with Bitcoin surpassing the $60,000 mark for the first time in several weeks, representing a 15% increase over the past seven days. The rally has been attributed to growing institutional adoption and positive regulatory developments in several countries. Ethereum also posted significant gains, rising above $3,500. Industry experts point to the approval of spot Bitcoin ETFs earlier this year as a key factor in bringing more traditional investors into the crypto space. Trading volumes across major exchanges have increased substantially, suggesting renewed interest from both retail and institutional investors. However, analysts caution that volatility remains high, and regulatory challenges continue to present risks to the sector\'s growth trajectory.',
    url: 'https://www.investing.com/news/cryptocurrency-news/bitcoin-surges-past-60000-as-institutional-inflows-accelerate-93CH',
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&auto=format&fit=crop&q=60',
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
    source: 'CoinDesk'
  },
  {
    id: '6',
    title: 'Housing Market Shows Signs of Cooling',
    description: 'U.S. home sales declined for the third consecutive month as higher mortgage rates and elevated prices dampen buyer demand.',
    content: 'U.S. home sales declined for the third consecutive month in April as higher mortgage rates and elevated prices continued to dampen buyer demand. The National Association of Realtors reported that existing home sales fell 3.4% from the previous month to a seasonally adjusted annual rate of 4.14 million units. The median existing-home price rose 4.8% from a year ago to $394,300, marking the tenth consecutive month of year-over-year price increases. Housing inventory showed some improvement, with the number of homes available for sale up 9.2% from a year ago. Economists suggest that the market is gradually moving toward better balance, though affordability remains a significant challenge for many potential buyers. Mortgage rates, which have hovered near 7% for 30-year fixed-rate loans, continue to be a key factor limiting market activity.',
    url: 'https://www.investing.com/news/economic-indicators/us-existing-home-sales-fall-for-third-straight-month-as-affordability-challenges-persist-93CH',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=60',
    publishedAt: new Date(Date.now() - 432000000).toISOString(),
    source: 'CNBC'
  },
  {
    id: '7',
    title: 'EU Passes Landmark AI Regulation',
    description: 'European Union lawmakers approved comprehensive artificial intelligence regulations that will impact global tech companies.',
    content: 'European Union lawmakers have approved comprehensive artificial intelligence regulations that will impact global tech companies and set international precedents for AI governance. The AI Act establishes a risk-based framework, with stricter rules for high-risk applications such as facial recognition, critical infrastructure management, and systems used in education and healthcare. The legislation bans certain AI practices deemed unacceptably risky, while imposing transparency and safety requirements on AI developers. Major technology companies have expressed mixed reactions, with some supporting the clarity provided by the regulations while others warn about potential limitations on innovation. The rules will be phased in over the next two years, giving companies time to adapt their systems and processes. The EU\'s approach contrasts with the more sector-specific regulatory approach being developed in the United States.',
    url: 'https://www.investing.com/news/technology-news/eu-parliament-approves-worlds-first-comprehensive-ai-rules-93CH',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60',
    publishedAt: new Date(Date.now() - 518400000).toISOString(),
    source: 'Financial Times'
  },
  {
    id: '8',
    title: 'Retail Sales Surpass Expectations in Latest Report',
    description: 'Consumer spending showed unexpected strength in April, with retail sales increasing 0.7% despite inflation concerns.',
    content: 'Consumer spending showed unexpected strength in April, with retail sales increasing 0.7% from the previous month, surpassing economists\' expectations of a 0.3% rise. The report from the Commerce Department indicates resilient consumer demand despite ongoing inflation concerns and higher borrowing costs. Sales increased across most categories, with particularly strong performance in electronics, clothing, and online retailers. Restaurant sales also showed healthy growth, suggesting consumers remain willing to spend on services as well as goods. The robust retail figures have led some economists to revise their GDP growth forecasts upward for the second quarter. However, the data also complicates the inflation outlook, potentially giving the Federal Reserve reason to maintain higher interest rates for longer than previously anticipated. Consumer sentiment surveys, meanwhile, continue to show mixed results regarding future spending intentions.',
    url: 'https://www.investing.com/news/economic-indicators/us-retail-sales-jump-in-april-signaling-resilient-consumer-demand-93CH',
    imageUrl: 'https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=800&auto=format&fit=crop&q=60',
    publishedAt: new Date(Date.now() - 604800000).toISOString(),
    source: 'Bloomberg'
  },
  {
    id: '9',
    title: 'Automakers Accelerate Electric Vehicle Production Plans',
    description: 'Major automobile manufacturers announced expanded investment in electric vehicle production facilities and battery technology.',
    content: 'Major automobile manufacturers have announced expanded investments in electric vehicle production facilities and battery technology, with several companies accelerating their timelines for transitioning away from internal combustion engines. The announcements include new factory constructions, retrofitting of existing plants, and joint ventures with battery producers. Industry analysts note that improving battery technology, government incentives, and growing consumer acceptance are driving the accelerated shift toward electrification. However, challenges remain, including charging infrastructure development, battery material supply chains, and grid capacity concerns. Auto industry employment patterns are also shifting, with companies and unions negotiating transitions that recognize the different skill sets required for EV production. Market competition is intensifying, with traditional automakers working to defend their market positions against both established EV specialists and emerging competitors from the technology sector and new entrants from Asia.',
    url: 'https://www.investing.com/news/stock-market-news/automakers-accelerate-ev-investments-as-adoption-rates-climb-93CH',
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba13938c9?w=800&auto=format&fit=crop&q=60',
    publishedAt: new Date(Date.now() - 691200000).toISOString(),
    source: 'Reuters'
  },
  {
    id: '10',
    title: 'Global Supply Chain Pressures Ease, Logistics Report Shows',
    description: 'A new report indicates that global supply chain disruptions have decreased significantly compared to last year.',
    content: 'A new report indicates that global supply chain disruptions have decreased significantly compared to last year, with shipping rates normalizing and port congestion showing substantial improvement. The Global Supply Chain Pressure Index, developed by the Federal Reserve Bank of New York, has fallen to its lowest level since early 2020, suggesting that many of the logistics challenges that contributed to inflation over the past few years are abating. Container shipping rates between Asia and North America have declined by more than 80% from their pandemic-era peaks. Manufacturing lead times have also shortened across multiple industries, though they remain longer than pre-pandemic levels in sectors such as semiconductors and automotive components. The improvement in supply chain conditions is expected to help moderate price pressures for a range of consumer and industrial goods, potentially supporting central banks\' efforts to bring inflation back to target levels.',
    url: 'https://www.investing.com/news/economy/global-supply-chain-pressures-ease-to-lowest-level-since-2020-93CH',
    imageUrl: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&auto=format&fit=crop&q=60',
    publishedAt: new Date(Date.now() - 777600000).toISOString(),
    source: 'Wall Street Journal'
  }
];

const BlogPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleReadMore = (article: Article) => {
    setSelectedArticle(article);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t('blog', 'title') || 'Financial News'}
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                {t('blog', 'subtitle') || 'Stay updated with the latest financial news and market trends'}
              </p>
            </div>
            
            {loading ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
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
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="outline" 
                        className="text-finance-600 border-finance-600 hover:bg-finance-50"
                        onClick={() => handleReadMore(article)}
                      >
                        {t('blog', 'readMore') || 'Read More'}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        asChild
                        className="text-gray-500 hover:text-finance-600"
                      >
                        <a href={article.url} target="_blank" rel="noopener noreferrer" title="View on Investing.com">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-external-link">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
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
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedArticle && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedArticle.title}</DialogTitle>
                <DialogDescription className="flex items-center text-sm pt-2">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  {format(new Date(selectedArticle.publishedAt), 'MMMM d, yyyy')}
                  <span className="mx-2">•</span>
                  <span className="font-medium">{selectedArticle.source}</span>
                </DialogDescription>
              </DialogHeader>
              
              <div className="my-4">
                <img 
                  src={selectedArticle.imageUrl} 
                  alt={selectedArticle.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              
              <div className="space-y-4">
                <p className="font-semibold text-lg">{selectedArticle.description}</p>
                <p className="text-gray-700 leading-relaxed">{selectedArticle.content}</p>
              </div>
              
              <div className="flex justify-between mt-6">
                <DialogClose asChild>
                  <Button variant="outline">
                    Close
                  </Button>
                </DialogClose>
                
                <Button asChild>
                  <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    Read on Investing.com
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
