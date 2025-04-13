
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart2, Clock, Shield, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-background border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 md:pt-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-5">
                <Sparkles className="h-3.5 w-3.5 inline mr-1" />
                Now in beta • Join the waitlist
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                <span className="block">AI-Powered</span>
                <span className="block text-gradient-primary">Remote Work Platform</span>
              </h1>
              <p className="mt-3 text-base text-muted-foreground sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Transcend traditional time tracking with predictive analytics, deep work optimization, 
                and enterprise-grade security. Built for the future of distributed teams.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link to="/trial">
                    <Button size="lg" className="w-full px-8 py-3 md:py-4 md:text-lg md:px-10 group transition-all duration-300 relative overflow-hidden">
                      <span className="relative z-10">Start Free Trial</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link to="/demo">
                    <Button variant="outline" size="lg" className="w-full px-8 py-3 md:py-4 md:text-lg md:px-10">
                      Schedule a Demo <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
            
            <div className="mt-12 flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>Time Tracking</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <BarChart2 className="h-5 w-5 text-primary" />
                <span>AI Analytics</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Zap className="h-5 w-5 text-primary" />
                <span>Productivity</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="h-5 w-5 text-primary" />
                <span>Enterprise Security</span>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Hero image with animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
      >
        <div className="h-56 w-full bg-gradient-to-br from-primary/80 to-purple-400/80 sm:h-72 md:h-96 lg:h-full lg:w-full rounded-bl-3xl shadow-lg overflow-hidden">
          <div className="h-full w-full bg-background/5 backdrop-blur-sm flex items-center justify-center">
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 3 
              }}
              className="relative w-[80%] h-[80%] bg-background/90 rounded-lg shadow-xl overflow-hidden border border-border animate-float"
            >
              <div className="absolute top-0 inset-x-0 h-10 bg-muted flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="ml-auto flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-primary">AI</span>
                  </div>
                  <div className="text-xs text-foreground/70">AI Assistant Active</div>
                </div>
              </div>
              <div className="mt-10 p-4">
                <div className="flex justify-between mb-4">
                  <div className="bg-muted h-8 w-40 rounded"></div>
                  <div className="bg-primary/20 h-8 w-20 rounded"></div>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="bg-muted h-4 w-full rounded"></div>
                  <div className="bg-muted h-4 w-full rounded"></div>
                  <div className="bg-muted h-4 w-2/3 rounded"></div>
                </div>
                <div className="mt-8">
                  <div className="bg-muted/50 h-32 w-full rounded relative overflow-hidden">
                    <div className="absolute left-0 top-0 h-full w-[30%] bg-primary/10 rounded"></div>
                    <div className="absolute right-4 bottom-4 h-5 w-5 rounded-full bg-primary animate-pulse"></div>
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <div className="bg-primary/20 h-8 w-24 rounded"></div>
                  <div className="bg-muted h-8 w-24 rounded"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
