
import React, { useState, useRef, useEffect } from 'react';
import { Building, Shield, Server, Users, ChevronDown, ChevronRight, Check, FileText, Globe, Lock, BarChart2, Zap, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Types for our enterprise sections
type ComplianceItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'pending' | 'upcoming';
  progress: number;
  path: string;
};

type DeploymentOption = {
  title: string;
  description: string;
  icon: React.ReactNode;
  requirements: string[];
  badgeText: string;
  path: string;
};

type AITool = {
  title: string;
  description: string;
  icon: React.ReactNode;
  riskLevel: 'low' | 'medium' | 'high';
  suggestion: string;
  path: string;
};

type SupportOption = {
  title: string;
  description: string;
  icon: React.ReactNode;
  response: string;
  path: string;
};

type IntegrationOption = {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'available' | 'beta' | 'coming-soon';
  path: string;
};

export const EnterpriseDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('compliance');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRequestDemo = () => {
    toast({
      title: "Demo request submitted",
      description: "Our team will contact you shortly to schedule your personalized demo.",
    });
  };

  // Sample data
  const complianceItems: ComplianceItem[] = [
    {
      title: "HIPAA Compliance",
      description: "AES-256 Encryption with audit trail",
      icon: <Shield className="text-green-500" size={18} />,
      status: 'active',
      progress: 85,
      path: "/enterprise/compliance/hipaa"
    },
    {
      title: "FedRAMP Ready",
      description: "Government-grade security",
      icon: <Shield className="text-blue-500" size={18} />,
      status: 'pending',
      progress: 65,
      path: "/enterprise/compliance/fedramp"
    },
    {
      title: "SOC 2 Type II",
      description: "Annual audit compliance",
      icon: <FileText className="text-indigo-500" size={18} />,
      status: 'active',
      progress: 100,
      path: "/enterprise/compliance/soc2"
    },
    {
      title: "GDPR Framework",
      description: "EU data protection compliance",
      icon: <Globe className="text-purple-500" size={18} />,
      status: 'active',
      progress: 90,
      path: "/enterprise/compliance/gdpr"
    }
  ];

  const deploymentOptions: DeploymentOption[] = [
    {
      title: "Cloud Hosted",
      description: "99.99% uptime SLA",
      icon: <Server size={18} />,
      requirements: ["Auto-scaling", "24/7 Monitoring", "Geo-redundancy"],
      badgeText: "Popular",
      path: "/enterprise/deployment/cloud"
    },
    {
      title: "On-Premise",
      description: "Deploy in your environment",
      icon: <Server size={18} />,
      requirements: ["4vCPU", "16GB RAM", "PostgreSQL 14+"],
      badgeText: "Secure",
      path: "/enterprise/deployment/on-premise"
    },
    {
      title: "Hybrid Solution",
      description: "Best of both worlds",
      icon: <Server size={18} />,
      requirements: ["VPN Connection", "Data Sync", "Failover Support"],
      badgeText: "Flexible",
      path: "/enterprise/deployment/hybrid"
    }
  ];

  const aiTools: AITool[] = [
    {
      title: "Productivity Analytics",
      description: "Team efficiency patterns",
      icon: <Users size={18} />,
      riskLevel: 'low',
      suggestion: "Optimize meetings by 15%",
      path: "/enterprise/ai-tools/analytics"
    },
    {
      title: "Burnout Prevention",
      description: "Monitor team wellness",
      icon: <Users size={18} />,
      riskLevel: 'medium',
      suggestion: "Schedule downtime hours",
      path: "/enterprise/ai-tools/wellness"
    },
    {
      title: "Revenue Forecasting",
      description: "AI-driven financial predictions",
      icon: <BarChart2 size={18} />,
      riskLevel: 'medium',
      suggestion: "Adjust Q3 targets based on trends",
      path: "/enterprise/ai-tools/forecasting"
    },
    {
      title: "Anomaly Detection",
      description: "Identify security threats",
      icon: <Lock size={18} />,
      riskLevel: 'high',
      suggestion: "Review unusual access patterns",
      path: "/enterprise/ai-tools/security"
    }
  ];

  const supportOptions: SupportOption[] = [
    {
      title: "Dedicated Account Manager",
      description: "Personalized enterprise support",
      icon: <Users size={18} />,
      response: "1 business day",
      path: "/enterprise/support/account-manager"
    },
    {
      title: "Technical Support",
      description: "24/7 priority assistance",
      icon: <Zap size={18} />,
      response: "4 hours",
      path: "/enterprise/support/technical"
    },
    {
      title: "Implementation Consulting",
      description: "Expert deployment assistance",
      icon: <Server size={18} />,
      response: "Custom schedule",
      path: "/enterprise/support/implementation"
    },
    {
      title: "Training & Resources",
      description: "Custom training sessions",
      icon: <HelpCircle size={18} />,
      response: "On-demand",
      path: "/enterprise/support/training"
    }
  ];

  const integrationOptions: IntegrationOption[] = [
    {
      title: "SSO Integration",
      description: "SAML, OAuth 2.0 support",
      icon: <Lock size={18} />,
      status: 'available',
      path: "/enterprise/integrations/sso"
    },
    {
      title: "Data Warehouse Connector",
      description: "Snowflake, BigQuery, Redshift",
      icon: <Database size={18} />,
      status: 'available',
      path: "/enterprise/integrations/data-warehouse"
    },
    {
      title: "Advanced API Access",
      description: "Custom endpoints & webhooks",
      icon: <Code size={18} />,
      status: 'beta',
      path: "/enterprise/integrations/api"
    },
    {
      title: "Legacy System Bridges",
      description: "Connect with proprietary systems",
      icon: <RefreshCw size={18} />,
      status: 'coming-soon',
      path: "/enterprise/integrations/legacy"
    }
  ];

  // Risk level color coding
  const getRiskColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Status badge styling
  const getStatusBadge = (status: 'active' | 'pending' | 'upcoming') => {
    switch (status) {
      case 'active': return (
        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400">
          Active
        </span>
      );
      case 'pending': return (
        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400">
          Pending
        </span>
      );
      case 'upcoming': return (
        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400">
          Upcoming
        </span>
      );
    }
  };

  // Integration status badge styling
  const getIntegrationStatusBadge = (status: 'available' | 'beta' | 'coming-soon') => {
    switch (status) {
      case 'available': return (
        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400">
          Available
        </span>
      );
      case 'beta': return (
        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400">
          Beta
        </span>
      );
      case 'coming-soon': return (
        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-400">
          Coming Soon
        </span>
      );
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Dropdown trigger */}
      <button 
        className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Enterprise
        <ChevronDown 
          className={`ml-1 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown content */}
      {isOpen && (
        <div 
          className={cn(
            "absolute z-50 mt-2 bg-background shadow-lg rounded-lg overflow-hidden border border-border",
            "w-[90vw] left-1/2 -translate-x-1/2 md:w-[600px] lg:w-[800px]",
            "animate-scale-in"
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-4">
            {/* Navigation sidebar */}
            <div className="col-span-1 bg-muted/50 p-4 md:border-r border-border">
              <nav>
                <ul className="space-y-2 md:space-y-1 flex md:block overflow-x-auto pb-2 md:pb-0">
                  <li className="shrink-0 md:shrink">
                    <button 
                      onClick={() => setActiveTab('compliance')}
                      className={cn(
                        "w-full text-left flex items-center px-3 py-2 rounded-md text-sm font-medium", 
                        activeTab === 'compliance' 
                          ? "bg-primary/10 text-primary" 
                          : "hover:bg-accent"
                      )}
                    >
                      <Shield size={16} className="mr-2" />
                      <span>Compliance</span>
                      <ChevronRight size={16} className="ml-auto hidden md:block" />
                    </button>
                  </li>
                  <li className="shrink-0 md:shrink">
                    <button 
                      onClick={() => setActiveTab('ai')}
                      className={cn(
                        "w-full text-left flex items-center px-3 py-2 rounded-md text-sm font-medium", 
                        activeTab === 'ai' 
                          ? "bg-primary/10 text-primary" 
                          : "hover:bg-accent"
                      )}
                    >
                      <Users size={16} className="mr-2" />
                      <span>AI Tools</span>
                      <ChevronRight size={16} className="ml-auto hidden md:block" />
                    </button>
                  </li>
                  <li className="shrink-0 md:shrink">
                    <button 
                      onClick={() => setActiveTab('deployment')}
                      className={cn(
                        "w-full text-left flex items-center px-3 py-2 rounded-md text-sm font-medium", 
                        activeTab === 'deployment' 
                          ? "bg-primary/10 text-primary" 
                          : "hover:bg-accent"
                      )}
                    >
                      <Server size={16} className="mr-2" />
                      <span>Deployment</span>
                      <ChevronRight size={16} className="ml-auto hidden md:block" />
                    </button>
                  </li>
                  <li className="shrink-0 md:shrink">
                    <button 
                      onClick={() => setActiveTab('support')}
                      className={cn(
                        "w-full text-left flex items-center px-3 py-2 rounded-md text-sm font-medium", 
                        activeTab === 'support' 
                          ? "bg-primary/10 text-primary" 
                          : "hover:bg-accent"
                      )}
                    >
                      <HelpCircle size={16} className="mr-2" />
                      <span>Support</span>
                      <ChevronRight size={16} className="ml-auto hidden md:block" />
                    </button>
                  </li>
                  <li className="shrink-0 md:shrink">
                    <button 
                      onClick={() => setActiveTab('integrations')}
                      className={cn(
                        "w-full text-left flex items-center px-3 py-2 rounded-md text-sm font-medium", 
                        activeTab === 'integrations' 
                          ? "bg-primary/10 text-primary" 
                          : "hover:bg-accent"
                      )}
                    >
                      <Zap size={16} className="mr-2" />
                      <span>Integrations</span>
                      <ChevronRight size={16} className="ml-auto hidden md:block" />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Content area */}
            <div className="col-span-1 md:col-span-3 p-4 md:p-6 max-h-[70vh] overflow-y-auto">
              {activeTab === 'compliance' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Enterprise Compliance Suite</h3>
                    <p className="text-sm text-muted-foreground">Industry-leading security standards and certifications</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {complianceItems.map((item) => (
                      <Link
                        to={item.path}
                        key={item.title}
                        className="bg-background rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all p-4"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            {item.icon}
                            <h4 className="font-medium ml-2">{item.title}</h4>
                          </div>
                          {getStatusBadge(item.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        <div className="mb-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-muted-foreground">Compliance Level</span>
                            <span className="text-xs font-medium">{item.progress}%</span>
                          </div>
                          <Progress value={item.progress} className="h-1.5" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">AI Workforce Tools</h3>
                    <p className="text-sm text-muted-foreground">Smart solutions for team productivity and wellbeing</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aiTools.map((tool) => (
                      <Link
                        to={tool.path}
                        key={tool.title}
                        className="bg-background rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all p-4"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            {tool.icon}
                            <h4 className="font-medium ml-2">{tool.title}</h4>
                          </div>
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full ${getRiskColor(tool.riskLevel)} mr-1`}></div>
                            <span className="text-xs">{tool.riskLevel.charAt(0).toUpperCase() + tool.riskLevel.slice(1)} Risk</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                        <div className="bg-muted p-2 rounded-md text-sm">
                          <span className="text-xs font-medium">Smart Suggestion:</span>
                          <p className="text-sm">{tool.suggestion}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'deployment' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Deployment Options</h3>
                    <p className="text-sm text-muted-foreground">Flexible infrastructure deployment for your security needs</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {deploymentOptions.map((option) => (
                      <Link
                        to={option.path}
                        key={option.title}
                        className="bg-background rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all p-4"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            {option.icon}
                            <h4 className="font-medium ml-2">{option.title}</h4>
                          </div>
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                            {option.badgeText}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                        <div className="space-y-1">
                          <h5 className="text-sm font-medium">Requirements</h5>
                          <ul className="text-xs text-muted-foreground">
                            {option.requirements.map((req) => (
                              <li key={req} className="flex items-center">
                                <Check size={12} className="text-green-500 mr-1" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'support' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Enterprise Support</h3>
                    <p className="text-sm text-muted-foreground">Dedicated resources for your business needs</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {supportOptions.map((option) => (
                      <Link
                        to={option.path}
                        key={option.title}
                        className="bg-background rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all p-4"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            {option.icon}
                            <h4 className="font-medium ml-2">{option.title}</h4>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium">Response Time:</span>
                          <span className="text-primary">{option.response}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'integrations' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Enterprise Integrations</h3>
                    <p className="text-sm text-muted-foreground">Connect with your existing tech stack</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {integrationOptions.map((option) => (
                      <Link
                        to={option.path}
                        key={option.title}
                        className="bg-background rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all p-4"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            {option.icon}
                            <h4 className="font-medium ml-2">{option.title}</h4>
                          </div>
                          {getIntegrationStatusBadge(option.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Call to action */}
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Need a personalized solution?</h4>
                    <p className="text-xs text-muted-foreground">Get a demo tailored to your company's needs</p>
                  </div>
                  <Button size="sm" onClick={handleRequestDemo}>
                    Request Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import { Database, Code, RefreshCw } from 'lucide-react';
