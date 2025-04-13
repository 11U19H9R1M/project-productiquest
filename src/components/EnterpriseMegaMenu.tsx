
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Shield, Brain, Server } from 'lucide-react';
import { Link } from 'react-router-dom';

const EnterpriseOption = ({ 
  icon: Icon, 
  title, 
  description, 
  path 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  path: string; 
}) => (
  <Link to={path} className="block">
    <div className="flex items-start p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <div className="bg-primary/10 p-2 rounded-lg mr-3 mt-1">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  </Link>
);

const EnterpriseMegaMenu = () => {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
        Enterprise <ChevronDown className="ml-1 h-4 w-4" />
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 border-none shadow-lg rounded-xl bg-white dark:bg-gray-800">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Enterprise Solutions</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Advanced tools for large organizations
          </p>
          
          <div className="grid gap-3">
            <EnterpriseOption 
              icon={Shield} 
              title="Compliance Suite" 
              description="HIPAA, FedRAMP & international regulations" 
              path="/enterprise/compliance" 
            />
            
            <EnterpriseOption 
              icon={Brain} 
              title="AI Workforce Tools" 
              description="Advanced productivity analytics & insights" 
              path="/enterprise/ai-tools" 
            />
            
            <EnterpriseOption 
              icon={Server} 
              title="Deployment Options" 
              description="Cloud, on-premise & hybrid solutions" 
              path="/enterprise/deployment" 
            />
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Need a custom enterprise solution? <Link to="/enterprise" className="text-primary font-medium hover:underline">Contact sales →</Link>
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EnterpriseMegaMenu;
