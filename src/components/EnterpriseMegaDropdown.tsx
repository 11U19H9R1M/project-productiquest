
import React, { useState, useEffect } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Link } from 'react-router-dom';
import { ChevronDown, Shield, Server, Users, ClipboardList, Database, Headphones, Boxes, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  items = [],
  path,
  isNew = false,
  status = null,
  certification = null
}: { 
  icon: React.ElementType;
  title: string;
  description: string;
  items?: string[];
  path: string;
  isNew?: boolean;
  status?: 'beta' | 'new' | 'updated' | null;
  certification?: string | null;
}) => (
  <div className="space-y-2 transition-all duration-200 hover:translate-x-1">
    <Link to={path} className="group">
      <div className="flex items-center gap-2 font-medium group-hover:text-primary transition-colors">
        <div className="bg-primary/10 p-1.5 rounded-md">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <span>{title}</span>
        {status && (
          <Badge variant="outline" className={cn("ml-2 text-xs py-0 h-5 px-1.5", {
            'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400 border-green-500/20': status === 'new',
            'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/20': status === 'beta',
            'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20': status === 'updated',
          })}>
            {status === 'new' ? 'New' : status === 'beta' ? 'Beta' : 'Updated'}
          </Badge>
        )}
        {certification && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="outline" className="ml-2 text-xs py-0 h-5 px-1.5 bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 border-purple-500/20">
                  {certification}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Certified {certification} Compliant</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </Link>
    <p className="text-xs text-muted-foreground">{description}</p>
    {items.length > 0 && (
      <ul className="space-y-1 mt-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center text-xs">
            <CheckCircle className="h-3 w-3 text-primary mr-1.5 flex-shrink-0" />
            <Link 
              to={path}
              className="hover:text-primary transition-colors"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export const EnterpriseMegaDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Close dropdown when resizing to mobile view
  useEffect(() => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);
  
  return (
    <HoverCard
      openDelay={0}
      closeDelay={100}
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <HoverCardTrigger asChild>
        <button 
          className="flex items-center text-foreground hover:text-primary px-3 py-2 text-sm font-medium"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span>Enterprise</span>
          <ChevronDown className={cn("ml-1 h-4 w-4 transition-transform duration-200", 
            isOpen && "rotate-180")} />
        </button>
      </HoverCardTrigger>
      <HoverCardContent 
        align="start"
        className="w-[90vw] max-w-[750px] p-6 shadow-xl border rounded-xl bg-background animate-scale-in"
        sideOffset={8}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FeatureCard
              icon={Shield}
              title="Compliance Suite"
              description="Enterprise-grade security and compliance tools for sensitive data"
              items={["HIPAA Compliance", "Audit Logs & Reporting", "Data Retention Policies"]}
              path="/enterprise/compliance"
              status="updated"
              certification="SOC2"
            />
            <FeatureCard
              icon={Server}
              title="Deployment Options"
              description="Flexible hosting solutions tailored to your organization's needs"
              items={["On-Premise Installation", "Private Cloud", "Kubernetes Orchestration"]}
              path="/enterprise/deployment"
            />
            <FeatureCard
              icon={Headphones}
              title="Enterprise Support"
              description="24/7 dedicated support with guaranteed response times"
              items={["SLA Guarantees", "Dedicated Success Manager", "Priority Issue Resolution"]}
              path="/enterprise/support"
              status="new"
            />
          </div>
          <div className="space-y-6">
            <FeatureCard
              icon={Users}
              title="AI Workforce Tools"
              description="Machine learning powered productivity optimization"
              items={["Team Burnout Prevention", "Resource Allocation AI", "Performance Insights"]}
              path="/enterprise/ai-tools"
              status="beta"
            />
            <FeatureCard
              icon={ClipboardList}
              title="Governance Tools"
              description="Advanced controls for enterprise management and compliance"
              items={["Role-Based Access Control", "API Security Controls", "Identity Management"]}
              path="/enterprise/governance"
              certification="GDPR"
            />
            <FeatureCard
              icon={Boxes}
              title="Enterprise Integrations"
              description="Seamlessly connect with your existing enterprise systems"
              items={["SAP & Oracle Integration", "Salesforce Connector", "ServiceNow & Workday"]}
              path="/enterprise/integrations"
              status="new"
            />
          </div>
        </div>
        <div className="mt-6 p-4 bg-muted rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-1.5 rounded-md mt-0.5">
              <Info className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Need a custom enterprise solution?</h4>
              <p className="text-xs text-muted-foreground">Our experts will create a tailored implementation plan for your organization</p>
            </div>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90 w-full sm:w-auto whitespace-nowrap">
            Schedule Demo
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
