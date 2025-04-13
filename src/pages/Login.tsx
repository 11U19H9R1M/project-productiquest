
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { CircleUserRound, Mail, Lock, AlertCircle, Github, Loader2, Info } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { isUsingDefaultCredentials } from '@/lib/supabase';

// Custom Google and Microsoft icons since they're not in lucide-react
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
    <path d="M17.5 12H12.5V7H11.5V13H17.5V12Z"></path>
  </svg>
);

const MicrosoftIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <rect x="3" y="3" width="8" height="8"></rect>
    <rect x="13" y="3" width="8" height="8"></rect>
    <rect x="3" y="13" width="8" height="8"></rect>
    <rect x="13" y="13" width="8" height="8"></rect>
  </svg>
);

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<string>('login');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPasswordReset, setShowPasswordReset] = useState<boolean>(false);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, signup, resetPassword } = useAuth();
  
  useEffect(() => {
    // Check if we're in demo mode (using default Supabase credentials)
    setIsDemoMode(isUsingDefaultCredentials());
  }, []);
  
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const { success, error } = await login(email, password);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Redirecting to dashboard...",
        });
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else if (error) {
        setError(error);
      }
    } catch (err: any) {
      setError(err.message || "Failed to login. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    
    try {
      const { success, error } = await signup(email, password);
      
      if (success) {
        toast({
          title: "Account created successfully",
          description: "Please check your email for verification instructions.",
        });
        
        setActiveTab('login');
      } else if (error) {
        setError(error);
      }
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const { success, error } = await resetPassword(email);
      
      if (success) {
        setShowPasswordReset(false);
        // No need to redirect, user will get an email
      } else if (error) {
        setError(error);
      }
    } catch (err: any) {
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSocialLogin = async (provider: string) => {
    try {
      setIsLoading(true);
      toast({
        title: `${provider} authentication`,
        description: "This feature is coming soon.",
      });
    } catch (err) {
      setError("Social login is not yet implemented");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDemoLogin = () => {
    toast({
      title: "Entering Demo Mode",
      description: "Redirecting to demo dashboard...",
    });
    
    setTimeout(() => {
      navigate('/demo');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="font-bold text-lg gradient-text">ProductiQuest</span>
        </Link>
        <ThemeSwitcher />
      </header>
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isDemoMode && (
              <Alert variant="warning" className="mb-4">
                <Info className="h-4 w-4" />
                <AlertTitle>Demo Mode Active</AlertTitle>
                <AlertDescription>
                  Supabase credentials are not configured. Authentication features are limited. 
                  Connect to Supabase to enable full functionality.
                </AlertDescription>
              </Alert>
            )}
            
            {showPasswordReset ? (
              <Card className="border-2">
                <CardHeader className="space-y-1 text-center">
                  <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
                  <CardDescription>
                    Enter your email address and we'll send you a link to reset your password
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  <form onSubmit={handlePasswordReset} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="reset-email"
                          placeholder="name@example.com"
                          type="email"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading || isDemoMode}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending reset link...
                        </>
                      ) : (
                        'Send Reset Link'
                      )}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="link" size="sm" onClick={() => setShowPasswordReset(false)}>
                    Back to login
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="border-2">
                <CardHeader className="space-y-1 text-center">
                  <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
                  <CardDescription>
                    {activeTab === 'login' ? 'Sign in to access your account' : 'Create an account to get started'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    
                    {error && (
                      <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    
                    <TabsContent value="login">
                      <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="email"
                              placeholder="name@example.com"
                              type="email"
                              className="pl-10"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Button
                              variant="link"
                              className="text-xs"
                              onClick={() => setShowPasswordReset(true)}
                              type="button"
                            >
                              Forgot password?
                            </Button>
                          </div>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="password"
                              type="password"
                              className="pl-10"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading || isDemoMode}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Signing in...
                            </>
                          ) : (
                            'Sign In'
                          )}
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="signup">
                      <form onSubmit={handleSignupSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signup-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signup-email"
                              placeholder="name@example.com"
                              type="email"
                              className="pl-10"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signup-password"
                              type="password"
                              className="pl-10"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="confirm-password"
                              type="password"
                              className="pl-10"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading || isDemoMode}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating account...
                            </>
                          ) : (
                            'Create Account'
                          )}
                        </Button>
                      </form>
                    </TabsContent>
                    
                    {isDemoMode && (
                      <div className="mt-6">
                        <Button onClick={handleDemoLogin} className="w-full bg-yellow-500 hover:bg-yellow-600">
                          Enter Demo Mode
                        </Button>
                        <p className="text-xs text-center mt-2 text-muted-foreground">
                          No authentication needed - try out the app features
                        </p>
                      </div>
                    )}
                    
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-background px-2 text-xs text-muted-foreground">OR CONTINUE WITH</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleSocialLogin('Google')}
                        disabled={isLoading || isDemoMode}
                      >
                        <GoogleIcon />
                        <span className="sr-only">Google</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleSocialLogin('Microsoft')}
                        disabled={isLoading || isDemoMode}
                      >
                        <MicrosoftIcon />
                        <span className="sr-only">Microsoft</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleSocialLogin('GitHub')}
                        disabled={isLoading || isDemoMode}
                      >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </Button>
                    </div>
                  </Tabs>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button variant="link" className="text-xs text-muted-foreground" asChild>
                    <Link to="/demo">See a demo without signing up</Link>
                  </Button>
                </CardFooter>
              </Card>
            )}
          </motion.div>
          
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <span>By continuing, you agree to our </span>
            <Link to="#" className="hover:text-primary underline underline-offset-4">Terms of Service</Link>
            <span> and </span>
            <Link to="#" className="hover:text-primary underline underline-offset-4">Privacy Policy</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
