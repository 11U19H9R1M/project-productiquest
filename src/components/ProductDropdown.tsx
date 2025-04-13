
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, BarChart2, Shield, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
        Product <ChevronDown className="ml-1 h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-none shadow-lg rounded-xl bg-white dark:bg-gray-800 p-2">
        <DropdownMenuLabel>Product Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <Link to="/features">
          <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-lg p-2">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-lg mr-3">
                <BarChart2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Features</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">AI analytics & integrations</p>
              </div>
            </div>
          </DropdownMenuItem>
        </Link>
        
        <Link to="/security">
          <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-lg p-2">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-lg mr-3">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Security</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">SOC 2 & HIPAA compliance</p>
              </div>
            </div>
          </DropdownMenuItem>
        </Link>
        
        <Link to="/pricing">
          <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-lg p-2">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-lg mr-3">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Pricing</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Plans & comparison</p>
              </div>
            </div>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductDropdown;
