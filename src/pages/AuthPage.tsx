
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

const AuthPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, signIn, signUp, loading } = useAuth();
  
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // If user is already authenticated, redirect to home
  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isSignIn) {
        await signIn(email, password);
        toast({
          title: 'Success',
          description: 'You have successfully signed in',
        });
        navigate('/');
      } else {
        await signUp(email, password);
        toast({
          title: 'Success',
          description: 'Account created successfully. You can now sign in.',
        });
        setIsSignIn(true);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="py-12 bg-gray-50">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle>
                  {isSignIn 
                    ? t('auth', 'signInTitle') 
                    : t('auth', 'signUpTitle')}
                </CardTitle>
                <CardDescription>
                  {isSignIn 
                    ? t('auth', 'noAccount') 
                    : t('auth', 'haveAccount')}
                  {' '}
                  <button 
                    onClick={() => setIsSignIn(!isSignIn)}
                    className="text-finance-600 hover:underline"
                  >
                    {isSignIn 
                      ? t('auth', 'signUp') 
                      : t('auth', 'signIn')}
                  </button>
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('auth', 'email')}</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">{t('auth', 'password')}</Label>
                      {isSignIn && (
                        <button 
                          type="button"
                          className="text-sm text-finance-600 hover:underline"
                        >
                          {t('auth', 'forgotPassword')}
                        </button>
                      )}
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bg-finance-600 hover:bg-finance-700"
                    disabled={loading}
                  >
                    {isSignIn 
                      ? t('auth', 'signInButton') 
                      : t('auth', 'signUpButton')}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthPage;
