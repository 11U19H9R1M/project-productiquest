
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

type UserRole = 'admin' | 'manager' | 'user';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  trialEndsAt?: Date | null;
  isOnTrial: boolean;
  teamId?: string;
  teamName?: string;
};

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isAdmin: () => boolean;
  isManager: () => boolean;
  isTrialActive: () => boolean;
  daysLeftInTrial: () => number | null;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const setupUser = async () => {
      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsLoading(false);
          return;
        }
        
        // Get user profile from supabase
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching profile:', profileError);
          throw profileError;
        }
        
        // If profile doesn't exist, create it with default values
        if (!profile) {
          const newUser: User = {
            id: session.user.id,
            name: session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            role: 'user',
            isOnTrial: true,
            trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days trial
            teamId: 'default-team',
            teamName: 'Personal Team'
          };
          
          // Insert new profile
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([newUser]);
            
          if (insertError) throw insertError;
          
          setUser(newUser);
        } else {
          // Map database profile to User type
          setUser({
            id: profile.id,
            name: profile.name || session.user.email?.split('@')[0] || 'User',
            email: profile.email || session.user.email || '',
            avatar: profile.avatar_url,
            role: profile.role || 'user',
            isOnTrial: profile.is_on_trial,
            trialEndsAt: profile.trial_ends_at ? new Date(profile.trial_ends_at) : null,
            teamId: profile.team_id,
            teamName: profile.team_name
          });
        }
      } catch (err) {
        console.error('Error setting up user:', err);
        setError('Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setupUser();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });
    
    setupUser();
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  const logout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out"
      });
    } catch (err: any) {
      toast({
        title: "Logout failed",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Convert User type to database format
      const dbUpdates = {
        name: updates.name,
        avatar_url: updates.avatar,
        role: updates.role,
        is_on_trial: updates.isOnTrial,
        trial_ends_at: updates.trialEndsAt,
        team_id: updates.teamId,
        team_name: updates.teamName
      };
      
      // Filter out undefined values
      const filteredUpdates = Object.fromEntries(
        Object.entries(dbUpdates).filter(([_, v]) => v !== undefined)
      );
      
      const { error } = await supabase
        .from('profiles')
        .update(filteredUpdates)
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Update local state
      setUser({
        ...user,
        ...updates
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated"
      });
    } catch (err: any) {
      toast({
        title: "Update failed",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const isAdmin = () => user?.role === 'admin';
  
  const isManager = () => user?.role === 'manager' || user?.role === 'admin';
  
  const isTrialActive = () => {
    if (!user?.isOnTrial || !user?.trialEndsAt) return false;
    return new Date(user.trialEndsAt) > new Date();
  };
  
  const daysLeftInTrial = () => {
    if (!user?.isOnTrial || !user?.trialEndsAt) return null;
    const trialEnd = new Date(user.trialEndsAt);
    const now = new Date();
    const diffTime = trialEnd.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  return (
    <UserContext.Provider 
      value={{ 
        user, 
        isLoading, 
        error, 
        setUser, 
        logout, 
        isAdmin, 
        isManager, 
        isTrialActive, 
        daysLeftInTrial,
        updateUserProfile
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
