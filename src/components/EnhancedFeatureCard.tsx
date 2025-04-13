
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface EnhancedFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string;
  colorVariant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning';
}

const colorVariants = {
  default: "bg-card hover:bg-accent",
  primary: "bg-card hover:bg-primary/10",
  secondary: "bg-card hover:bg-secondary/10",
  success: "bg-card hover:bg-green-500/10",
  warning: "bg-card hover:bg-amber-500/10",
};

const iconColorVariants = {
  default: "text-foreground",
  primary: "text-primary",
  secondary: "text-secondary",
  success: "text-green-500",
  warning: "text-amber-500",
};

const EnhancedFeatureCard = ({ icon: Icon, title, description, details, colorVariant = 'default' }: EnhancedFeatureCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative rounded-lg p-6 transition-all duration-300 ease-in-out border border-border h-full backdrop-blur-sm",
        colorVariants[colorVariant],
        isExpanded ? "cursor-default shadow-xl" : "cursor-pointer shadow-md"
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary/30 to-primary rounded-t-lg"></div>
      <div className="flex flex-col h-full">
        <div className="flex items-start mb-4">
          <div className={cn(
            "p-3 rounded-md mr-4 shadow-sm",
            colorVariant !== 'default' ? "bg-background" : "bg-primary/10"
          )}>
            <Icon className={cn("h-6 w-6", iconColorVariants[colorVariant])} />
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        
        <div className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-20 opacity-80"
        )}>
          <p className="text-muted-foreground mb-4">{description}</p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className={cn("text-sm text-foreground/80", isExpanded ? "block" : "hidden")}
          >
            <p>{details}</p>
            
            <button 
              className="mt-4 text-primary font-medium text-sm hover:underline focus:outline-none flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
            >
              <span>Show less</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </motion.div>
          
          {!isExpanded && (
            <button 
              className="text-primary font-medium text-sm hover:underline focus:outline-none flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
              }}
            >
              <span>Learn more</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedFeatureCard;
