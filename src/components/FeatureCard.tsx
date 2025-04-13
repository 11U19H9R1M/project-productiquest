
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string;
}

const FeatureCard = ({ icon: Icon, title, description, details }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div 
          className="p-6 border rounded-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 bg-white cursor-pointer transform-gpu card-shine enhanced-card"
          whileHover={{ 
            y: -6,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 15px 5px rgba(124, 58, 237, 0.15)'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{title}</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          
          <motion.div 
            className="mt-4 text-primary text-sm flex items-center"
            initial={{ opacity: 0, x: -5 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -5
            }}
            transition={{ duration: 0.2 }}
          >
            <span>Learn more</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </motion.div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {details}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureCard;
