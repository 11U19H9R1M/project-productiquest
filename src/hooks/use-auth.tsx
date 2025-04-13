
import { useState, useEffect } from 'react';
import { supabase, isUsingDefaultCredentials } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setIsLoggedIn(!!session);
        setIsLoading(false);
      }
    );
    
    // Get initial session
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        setIsLoggedIn(!!session);
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUser();
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      // Check for demo/default credentials
      if (isUsingDefaultCredentials()) {
        toast({
          title: "Demo Mode",
          description: "You are in demo mode. Please set up Supabase credentials to enable authentication.",
          variant: "destructive"
        });
        return { success: false, error: "Demo mode active. Authentication disabled." };
      }
      
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      setUser(data.user);
      setIsLoggedIn(true);
      return { success: true };
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Failed to connect to authentication service",
        variant: "destructive"
      });
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };
  
  const signup = async (email: string, password: string) => {
    try {
      // Check for demo/default credentials
      if (isUsingDefaultCredentials()) {
        toast({
          title: "Demo Mode",
          description: "You are in demo mode. Please set up Supabase credentials to enable authentication.",
          variant: "destructive"
        });
        return { success: false, error: "Demo mode active. Authentication disabled." };
      }
      
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      
      if (error) throw error;
      
      toast({
        title: "Account created",
        description: "Please check your email for verification link"
      });
      
      return { success: true };
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Failed to connect to authentication service",
        variant: "destructive"
      });
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      // Check for demo/default credentials
      if (isUsingDefaultCredentials()) {
        toast({
          title: "Demo Mode",
          description: "You are in demo mode. Please set up Supabase credentials to enable authentication.",
          variant: "destructive"
        });
        return;
      }
      
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setIsLoggedIn(false);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out"
      });
    } catch (error: any) {
      toast({
        title: "Logout failed",
        description: error.message || "Failed to connect to authentication service",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetPassword = async (email: string) => {
    try {
      // Check for demo/default credentials
      if (isUsingDefaultCredentials()) {
        toast({
          title: "Demo Mode",
          description: "You are in demo mode. Please set up Supabase credentials to enable authentication.",
          variant: "destructive"
        });
        return { success: false, error: "Demo mode active. Authentication disabled." };
      }
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link"
      });
      
      return { success: true };
    } catch (error: any) {
      toast({
        title: "Failed to send reset email",
        description: error.message || "Failed to connect to authentication service",
        variant: "destructive"
      });
      return { success: false, error: error.message };
    }
  };
  
  return { 
    isLoggedIn, 
    isLoading, 
    user, 
    login, 
    signup, 
    logout, 
    resetPassword 
  };
};
