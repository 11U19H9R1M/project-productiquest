
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Clock, Building, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { NavigationMegaMenu } from './NavigationMegaMenu';
import { SmartSearch } from './SmartSearch';
import { FloatingActionButton } from './FloatingActionButton';
import { EnterpriseMegaDropdown } from './EnterpriseMegaDropdown';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DemoForm = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      toast({
        title: "Demo Scheduled!",
        description: "We'll contact you shortly to confirm your demo time.",
      });
    }, 500);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
          <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-lg font-medium">Thank you for scheduling a demo!</h3>
        <p className="text-muted-foreground mt-2">Our team will contact you shortly to confirm the details.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">Full Name</label>
        <input 
          id="name" 
          type="text" 
          required 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-background"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Work Email</label>
        <input 
          id="email" 
          type="email" 
          required 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-background"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="company" className="text-sm font-medium">Company</label>
        <input 
          id="company" 
          type="text" 
          required 
          value={company} 
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-background"
        />
      </div>
      
      <div className="pt-4">
        <Button type="submit" className="w-full">Schedule Demo</Button>
      </div>
    </form>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.navbar-menu') && !target.closest('.navbar-trigger')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menu when window resizes to desktop
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);
  
  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className={cn(
        "bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b transition-all duration-300",
        isScrolled && "shadow-sm"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold gradient-text">ProductiQuest</span>
              </Link>
              
              <div className="hidden md:ml-10 md:flex md:space-x-4">
                {/* Navigation mega menu with product, solutions, etc. */}
                <NavigationMegaMenu />
                
                <Link 
                  to="/solutions" 
                  className={cn(
                    "text-foreground hover:text-primary px-3 py-2 text-sm font-medium",
                    "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0",
                    "after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300",
                    "after:hover:scale-x-100 after:hover:origin-bottom-left relative inline-block",
                    location.pathname.includes('/solutions') && "text-primary after:scale-x-100"
                  )}
                >
                  Solutions
                </Link>
                
                <Link 
                  to="/blog" 
                  className={cn(
                    "text-foreground hover:text-primary px-3 py-2 text-sm font-medium",
                    "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0",
                    "after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300",
                    "after:hover:scale-x-100 after:hover:origin-bottom-left relative inline-block",
                    location.pathname === '/blog' && "text-primary after:scale-x-100"
                  )}
                >
                  Blog
                </Link>
                
                {/* Enhanced Enterprise dropdown for larger screens */}
                <div className="hidden md:block">
                  <EnterpriseMegaDropdown />
                </div>
                
                <Link 
                  to="/dashboard" 
                  className={cn(
                    "text-foreground hover:text-primary px-3 py-2 text-sm font-medium",
                    location.pathname === '/dashboard' && "text-primary"
                  )}
                >
                  Dashboard
                </Link>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <SmartSearch 
                placeholder="Ask AI..." 
                className="relative mr-2"
              />
              
              <ThemeSwitcher />
              
              <Link to="/login" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
                Log in
              </Link>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className="animate-fade-in">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Demo
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Schedule a Demo</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to schedule a personalized demo with our team.
                    </DialogDescription>
                  </DialogHeader>
                  <DemoForm />
                </DialogContent>
              </Dialog>
              
              <Link to="/trial">
                <Button size="sm" className="bg-primary text-white hover:bg-primary/90 animate-fade-in relative overflow-hidden group">
                  <span className="absolute right-0 h-full w-8 bg-white/20 transform -skew-x-12 -translate-x-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-32 transition-all duration-700"></span>
                  {isMobile ? "Get App" : "Start Free Trial"}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center md:hidden">
              <SmartSearch 
                placeholder="Search" 
                className="mr-2"
              />
              
              <ThemeSwitcher />
              
              <button
                className="navbar-trigger ml-2 p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="navbar-menu md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="border-b pb-2 mb-2">
                <div className="text-xs uppercase font-semibold text-muted-foreground mb-2 px-3">
                  Product
                </div>
                <Link to="/features" className="text-foreground hover:bg-accent block px-3 py-2 rounded-md text-base font-medium">
                  Features
                </Link>
                <Link to="/integrations" className="text-foreground hover:bg-accent block px-3 py-2 rounded-md text-base font-medium">
                  Integrations
                </Link>
                <Link to="/security" className="text-foreground hover:bg-accent block px-3 py-2 rounded-md text-base font-medium">
                  Security
                </Link>
              </div>
              
              <div className="border-b pb-2 mb-2">
                <div className="text-xs uppercase font-semibold text-muted-foreground mb-2 px-3">
                  Solutions
                </div>
                <Link to="/solutions" className="text-foreground hover:bg-accent block px-3 py-2 rounded-md text-base font-medium">
                  All Solutions
                </Link>
                <Link to="/solutions?tab=teams" className="text-foreground hover:bg-accent block px-3 py-2 rounded-md text-base font-medium">
                  For Teams
                </Link>
                <Link to="/solutions?tab=enterprise" className="text-foreground hover:bg-accent block px-3 py-2 rounded-md text-base font-medium">
                  For Enterprises
                </Link>
                <Link to="/solutions?tab=freelancers" className="text-foreground hover:bg-accent block px-3 py-2 rounded-md text-base font-medium">
                  For Freelancers
                </Link>
              </div>

              <div className="border-b pb-2 mb-2">
                <div className="text-xs uppercase font-semibold text-muted-foreground mb-2 px-3">
                  Enterprise
                </div>
                <Link to="/enterprise/compliance" className="text-foreground hover:bg-accent block px-3 py-2 rounded-md text-base font-medium">
                  Compliance Suite
                </Link>
                <Link to="/enterprise/ai-tools" className="text-foreground hover:bg-accent block px-3 py-2 rounded-md text-base font-medium">
                  AI Workforce Tools
                </Link>
                <Link to="/enterprise/deployment" className="text-foreground hover:bg-accent block px-3 py-2 rounded-md text-base font-medium">
                  Deployment Options
                </Link>
                <Link to="/enterprise/governance" className="text-foreground hover:bg-accent block px-3 py-2 rounded-md text-base font-medium">
                  Governance Tools
                </Link>
                <Link to="/enterprise/support" className="text-foreground hover:bg-accent block px-3 py-2 rounded-md text-base font-medium">
                  Enterprise Support
                </Link>
                <Link to="/enterprise/integrations" className="text-foreground hover:bg-accent block px-3 py-2 rounded-md text-base font-medium">
                  Enterprise Integrations
                </Link>
              </div>

              <Link to="/pricing" className="text-foreground hover:bg-accent block px-3 py-2 rounded-md text-base font-medium">
                Pricing
              </Link>
              
              <Link to="/blog" className="text-foreground hover:bg-accent block px-3 py-2 rounded-md text-base font-medium">
                Blog
              </Link>
              
              <Link to="/dashboard" className="text-foreground hover:bg-accent block px-3 py-2 rounded-md text-base font-medium">
                Dashboard
              </Link>
            </div>
            
            <div className="pt-4 pb-3 border-t border-border">
              <div className="px-4 flex items-center justify-between">
                <Link to="/login" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
                  Log in
                </Link>
                
                <Link to="/trial">
                  <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Floating Action Button for mobile */}
      <FloatingActionButton />
    </>
  );
};

export default Navbar;
