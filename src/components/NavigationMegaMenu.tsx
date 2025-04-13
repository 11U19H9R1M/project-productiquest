
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BarChart2, CloudCog, Shield, Smartphone, Server, Users, Clock, Briefcase } from 'lucide-react';

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function NavigationMegaMenu() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-foreground hover:text-primary">Product</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                    to="/features"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium text-white">
                      ProductiQuest
                    </div>
                    <p className="text-sm leading-tight text-white/90">
                      AI-powered productivity toolkit for modern teams
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/features" title="AI Analytics">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart2 className="h-4 w-4 text-primary" />
                  <span>Predictive insights</span>
                </div>
                Optimize productivity with AI-powered analytics
              </ListItem>
              <ListItem href="/integrations" title="Integrations">
                <div className="flex items-center gap-2 mb-1">
                  <CloudCog className="h-4 w-4 text-primary" />
                  <span>Connect your stack</span>
                </div>
                Seamlessly integrate with your favorite tools
              </ListItem>
              <ListItem href="/security" title="Security & Compliance">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>GDPR, HIPAA, SOC 2</span>
                </div>
                Enterprise-grade security for your data
              </ListItem>
              <ListItem href="/mobile" title="Mobile App">
                <div className="flex items-center gap-2 mb-1">
                  <Smartphone className="h-4 w-4 text-primary" />
                  <span>iOS & Android</span>
                </div>
                Track time on the go with our mobile app
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-foreground hover:text-primary">Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <ListItem href="/solutions/teams" title="For Teams">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-primary" />
                  <span>Agile Workflows</span>
                </div>
                Optimize team collaboration and productivity
              </ListItem>
              <ListItem href="/solutions/enterprises" title="For Enterprises">
                <div className="flex items-center gap-2 mb-1">
                  <Server className="h-4 w-4 text-primary" />
                  <span>Custom AI Models</span>
                </div>
                Tailored solutions for large organizations
              </ListItem>
              <ListItem href="/solutions/freelancers" title="For Freelancers">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <span>Client Billing</span>
                </div>
                Simplified time tracking and invoicing
              </ListItem>
              <ListItem href="/solutions/remote" title="For Remote Teams">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Remote Work Toolkit</span>
                </div>
                Stay connected and productive from anywhere
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/pricing" className="flex items-center text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
            Pricing
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
