
import React, { useState, useEffect } from 'react';
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
import { Check, X } from 'lucide-react';

const AuthPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, signIn, signUp, loading } = useAuth();
  
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    hasNumber: false,
    hasSpecial: false,
    hasUppercase: false
  });

  // Validate password as user types
  useEffect(() => {
    if (!isSignIn) {
      setPasswordErrors({
        length: password.length >= 8,
        hasNumber: /\d/.test(password),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        hasUppercase: /[A-Z]/.test(password)
      });
    }
  }, [password, isSignIn]);

  // If user is already authenticated, redirect to home
  if (user) {
    return <Navigate to="/" />;
  }

  const validatePassword = () => {
    return (
      passwordErrors.length &&
      passwordErrors.hasNumber &&
      passwordErrors.hasSpecial &&
      passwordErrors.hasUppercase
    );
  };

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
        // Validate password for sign up
        if (!validatePassword()) {
          toast({
            variant: 'destructive',
            title: 'Invalid Password',
            description: 'Please ensure your password meets all requirements',
          });
          return;
        }
        
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
                  {isSignIn ? 'Sign In' : 'Create Account'}
                </CardTitle>
                <CardDescription>
                  {isSignIn ? "Don't have an account?" : "Already have an account?"}
                  {' '}
                  <button 
                    onClick={() => setIsSignIn(!isSignIn)}
                    className="text-finance-600 hover:underline"
                  >
                    {isSignIn ? 'Sign Up' : 'Sign In'}
                  </button>
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
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
                      <Label htmlFor="password">Password</Label>
                      {isSignIn && (
                        <button 
                          type="button"
                          className="text-sm text-finance-600 hover:underline"
                        >
                          Forgot Password?
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

                  {/* Password requirements for sign up */}
                  {!isSignIn && (
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                      <p className="text-sm font-medium mb-2">Password must have:</p>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                          {passwordErrors.length 
                            ? <Check className="h-4 w-4 text-green-500" /> 
                            : <X className="h-4 w-4 text-red-500" />}
                          At least 8 characters
                        </li>
                        <li className="flex items-center gap-2">
                          {passwordErrors.hasUppercase 
                            ? <Check className="h-4 w-4 text-green-500" /> 
                            : <X className="h-4 w-4 text-red-500" />}
                          At least one uppercase letter
                        </li>
                        <li className="flex items-center gap-2">
                          {passwordErrors.hasNumber 
                            ? <Check className="h-4 w-4 text-green-500" /> 
                            : <X className="h-4 w-4 text-red-500" />}
                          At least one number
                        </li>
                        <li className="flex items-center gap-2">
                          {passwordErrors.hasSpecial 
                            ? <Check className="h-4 w-4 text-green-500" /> 
                            : <X className="h-4 w-4 text-red-500" />}
                          At least one special character
                        </li>
                      </ul>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bg-finance-600 hover:bg-finance-700"
                    disabled={loading || (!isSignIn && !validatePassword())}
                  >
                    {isSignIn ? 'Sign In' : 'Create Account'}
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
