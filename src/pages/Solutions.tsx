
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, ExternalLink, Users, Building, Briefcase, Clock, Globe, Shield, Server, Brain, Terminal, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

// Define solution card type
type SolutionCard = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  cta: string;
  ctaLink: string;
  badge?: {
    text: string;
    variant: 'outline' | 'secondary' | 'destructive' | 'default';
  };
  certifications?: string[];
};

const Solutions = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  // Load last viewed solution from localStorage
  useEffect(() => {
    const lastViewed = localStorage.getItem('lastViewedSolution');
    if (lastViewed) {
      const tab = solutionCards.find(card => card.id === lastViewed)?.id.split('-')[0] || 'all';
      setActiveTab(tab);
      
      // Use a small delay to ensure the card is rendered before expanding
      setTimeout(() => {
        setExpandedCard(lastViewed);
      }, 100);
    }
  }, []);

  // Save expanded card to localStorage
  useEffect(() => {
    if (expandedCard) {
      localStorage.setItem('lastViewedSolution', expandedCard);
    }
  }, [expandedCard]);

  const handleCardExpand = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleRequestDemo = (solutionName: string) => {
    toast({
      title: "Demo requested",
      description: `We'll contact you soon about the ${solutionName} solution.`,
    });
  };

  // Solution cards data
  const solutionCards: SolutionCard[] = [
    {
      id: 'teams-collaboration',
      title: 'Team Collaboration',
      description: 'Optimize team collaboration and productivity across your organization.',
      icon: Users,
      features: [
        'Real-time collaboration tools',
        'Team performance analytics',
        'Custom workflow templates',
        'Agile sprint planning',
        'Team capacity planning'
      ],
      cta: 'Start Team Trial',
      ctaLink: '/trial?plan=team',
    },
    {
      id: 'teams-remote',
      title: 'Remote Teams',
      description: 'Keep remote teams connected, engaged and productive from anywhere.',
      icon: Globe,
      features: [
        'Time zone management',
        'Asynchronous workflows',
        'Virtual team building',
        'Remote onboarding tools',
        'Global compliance support'
      ],
      cta: 'Try Remote Features',
      ctaLink: '/trial?plan=remote',
      badge: {
        text: 'Popular',
        variant: 'default',
      }
    },
    {
      id: 'enterprise-security',
      title: 'Enterprise Security',
      description: 'Advanced security features for enterprise organizations.',
      icon: Shield,
      features: [
        'Single Sign-On (SSO)',
        'Role-based access control',
        'Audit logs and compliance reports',
        'Data encryption at rest and in transit',
        'Custom security policies'
      ],
      cta: 'Request Security Demo',
      ctaLink: '/enterprise/security',
      certifications: ['HIPAA', 'SOC2', 'GDPR', 'ISO 27001']
    },
    {
      id: 'enterprise-deployment',
      title: 'Deployment Options',
      description: 'Flexible deployment models for large organizations.',
      icon: Server,
      features: [
        'On-premise installation',
        'Private cloud deployment',
        'Hybrid cloud options',
        'Containerized architecture',
        'High availability configurations'
      ],
      cta: 'Discuss Deployment',
      ctaLink: '/enterprise/deployment',
    },
    {
      id: 'enterprise-ai',
      title: 'AI Productivity',
      description: 'AI-powered tools to optimize workforce productivity.',
      icon: Brain,
      features: [
        'Productivity pattern analysis',
        'Smart workload distribution',
        'Burnout prevention alerts',
        'Meeting efficiency optimization',
        'Automated time tracking'
      ],
      cta: 'Try AI Features',
      ctaLink: '/enterprise/ai',
      badge: {
        text: 'New',
        variant: 'outline',
      }
    },
    {
      id: 'freelancers-billing',
      title: 'Freelancer Billing',
      description: 'Simplified time tracking and client billing for independent professionals.',
      icon: Briefcase,
      features: [
        'Automatic time capture',
        'Client-specific rates',
        'Customizable invoice templates',
        'Multiple currency support',
        'Payment tracking and reminders'
      ],
      cta: 'Start Free Trial',
      ctaLink: '/trial?plan=freelancer',
    },
    {
      id: 'freelancers-time',
      title: 'Time Management',
      description: 'Advanced time tracking tools for optimizing your billable hours.',
      icon: Clock,
      features: [
        'Project time budgeting',
        'Time utilization analytics',
        'Pomodoro technique integration',
        'Calendar sync capabilities',
        'Client-specific dashboards'
      ],
      cta: 'Try Time Features',
      ctaLink: '/trial?plan=time',
    },
    {
      id: 'freelancers-integration',
      title: 'Developer Tools',
      description: 'Integrate with your development workflow and tools.',
      icon: Terminal,
      features: [
        'GitHub & GitLab integration',
        'JIRA & Asana connectors',
        'VS Code extension',
        'API access for custom integrations',
        'CI/CD pipeline tracking'
      ],
      cta: 'Explore Integrations',
      ctaLink: '/integrations',
      badge: {
        text: 'Beta',
        variant: 'secondary',
      }
    },
  ];

  // Filter solutions based on active tab and search term
  const filteredSolutions = solutionCards
    .filter(card => searchTerm ? 
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
      : true)
    .filter(card => activeTab === 'all' ? true : card.id.startsWith(activeTab));

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-secondary/70 to-secondary/40 py-16 dark:from-secondary/40 dark:to-background">
          <div className="container px-4 mx-auto text-center">
            <motion.h1 
              className="text-3xl md:text-5xl font-bold mb-4 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Tailored Solutions for Every Team
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover the perfect productivity solution for your specific needs
            </motion.p>
            
            {/* Search input */}
            <motion.div
              className="relative max-w-md mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search solutions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Solutions Tabs */}
        <section className="py-12">
          <div className="container px-4 mx-auto">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid sm:grid-cols-4 grid-cols-2 gap-2 sm:gap-0 w-full max-w-xl">
                  <TabsTrigger value="all">All Solutions</TabsTrigger>
                  <TabsTrigger value="teams">Teams</TabsTrigger>
                  <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
                  <TabsTrigger value="freelancers">Freelancers</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value={activeTab} className="mt-0">
                {filteredSolutions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-lg text-muted-foreground">No solutions found matching your search.</p>
                    <Button onClick={() => setSearchTerm('')} variant="outline" className="mt-4">
                      Clear Search
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredSolutions.map((solution, index) => (
                      <motion.div
                        key={solution.id}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                        className="h-full"
                      >
                        <Card 
                          className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg ${
                            expandedCard === solution.id ? 'border-primary shadow-md' : ''
                          }`}
                          onClick={() => handleCardExpand(solution.id)}
                        >
                          <CardHeader className="relative">
                            <div className="flex justify-between items-start">
                              <div className="bg-primary/10 p-2 rounded-lg mb-3">
                                <solution.icon className="h-6 w-6 text-primary" />
                              </div>
                              {solution.badge && (
                                <Badge variant={solution.badge.variant} className="absolute top-4 right-6">
                                  {solution.badge.text}
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-xl">{solution.title}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">{solution.description}</p>
                          </CardHeader>
                          
                          <CardContent>
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ 
                                height: expandedCard === solution.id ? 'auto' : 0,
                                opacity: expandedCard === solution.id ? 1 : 0
                              }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-3 pt-2">
                                <h4 className="text-sm font-medium">Key Features:</h4>
                                <ul className="space-y-2">
                                  {solution.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start text-sm group">
                                      <CheckCircle className="h-4 w-4 mr-2 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                                
                                {solution.certifications && (
                                  <div className="pt-3">
                                    <h4 className="text-xs font-medium mb-2">Certifications:</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {solution.certifications.map((cert, idx) => (
                                        <Badge key={idx} variant="outline" className="text-xs">
                                          {cert}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          </CardContent>
                          
                          <CardFooter className="flex justify-between items-center pt-2">
                            <Link to={solution.ctaLink} className="flex-1">
                              <Button size="sm" className="w-full">
                                {solution.cta}
                              </Button>
                            </Link>
                            
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRequestDemo(solution.title);
                              }}
                              className="ml-2"
                              title="Request a demo"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">Request demo</span>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Enterprise Section Highlight */}
        {activeTab === 'enterprise' && (
          <section className="py-8 bg-muted/50">
            <div className="container px-4 mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-background rounded-xl border p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold mb-4">Enterprise Solutions</h2>
                <p className="text-muted-foreground mb-6">
                  Our enterprise solutions are designed to meet the unique needs of large organizations with advanced security, 
                  deployment flexibility, and AI-powered productivity tools.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Security Compliance</h3>
                      <p className="text-sm text-muted-foreground">HIPAA, SOC2, GDPR, and ISO 27001 certified solutions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Server className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Flexible Deployment</h3>
                      <p className="text-sm text-muted-foreground">On-premise, private cloud, or hybrid deployment options</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">AI-Powered Insights</h3>
                      <p className="text-sm text-muted-foreground">Predictive analytics and productivity optimization</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="w-full sm:w-auto">
                    Schedule Enterprise Consultation
                  </Button>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Download Enterprise Whitepaper
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        )}
        
        {/* Call to Action */}
        <section className="bg-muted py-12">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Not sure which solution is right for you?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Our product specialists can help you find the perfect solution for your organization's needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Button className="w-full sm:w-auto">Schedule a Consultation</Button>
              <Button variant="outline" className="w-full sm:w-auto">Compare All Features</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
