
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, Users, Database, Clock, Zap, BarChart2, Check, Star, Award, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Trial = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [teamSize, setTeamSize] = useState<string | null>(null);
  const [focusArea, setFocusArea] = useState<string | null>(null);
  const [addOns, setAddOns] = useState<string[]>([]);

  const features = [
    { icon: Clock, text: "AI-Powered Time Tracking & Analytics" },
    { icon: ShieldCheck, text: "SOC 2 & GDPR-Compliant Security" },
    { icon: Zap, text: "Priority Support During Trial" },
  ];

  const toggleAddOn = (value: string) => {
    setAddOns((prev) => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    toast({
      title: `${plan} plan selected`,
      description: "You can customize your trial in the next step.",
    });
    setCurrentStep(2);
  };

  const handleTeamSize = (size: string) => {
    setTeamSize(size);
    toast({
      title: "Team size saved",
      description: "We'll customize your experience based on your team size.",
    });
  };

  const handleFocusArea = (area: string) => {
    setFocusArea(area);
    toast({
      title: "Focus area saved",
      description: `Your trial will focus on ${area}.`,
    });
  };

  const startTrial = () => {
    toast({
      title: "Trial started!",
      description: "Welcome to ProductiQuest. Your workspace is being set up.",
    });
    
    // Normally we would submit form data to an API here
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  const trustLogos = [
    "https://placehold.co/100x40/e5e7eb/a3a3a3?text=NASA",
    "https://placehold.co/100x40/e5e7eb/a3a3a3?text=Shopify",
    "https://placehold.co/100x40/e5e7eb/a3a3a3?text=Stripe",
    "https://placehold.co/100x40/e5e7eb/a3a3a3?text=Microsoft"
  ];

  const plans = [
    {
      name: "Starter Trial",
      recommended: false,
      description: "For small teams getting started with AI productivity",
      price: "Free",
      period: "14-day trial",
      features: [
        "5 users",
        "Basic AI Analytics",
        "5 GB Storage",
        "Email Support",
        "Automated Time Tracking",
        "Project Management",
      ],
      buttonText: "Start Starter Trial",
      highlightColor: "bg-gradient-to-r from-blue-500 to-cyan-400",
    },
    {
      name: "Pro Trial",
      recommended: true,
      description: "For growing teams that need advanced AI features",
      price: "Free",
      period: "14-day trial",
      features: [
        "20 users",
        "Advanced JIT AI Insights",
        "50 GB Storage",
        "Priority Chat Support",
        "All Starter features",
        "Team Analytics Dashboard",
        "Custom Reporting",
      ],
      buttonText: "Start Pro Trial",
      highlightColor: "bg-gradient-to-r from-primary to-purple-400",
    },
    {
      name: "Enterprise Trial",
      recommended: false,
      description: "For large organizations with custom needs",
      price: "Contact Sales",
      period: "30-day trial",
      features: [
        "Custom user limit",
        "Dedicated AI Model Training",
        "Unlimited Storage",
        "24/7 SLA-Guaranteed Support",
        "All Pro features",
        "On-premises deployment options",
        "Custom integrations",
        "Advanced security features",
      ],
      buttonText: "Contact Sales",
      highlightColor: "bg-gradient-to-r from-gray-700 to-gray-900",
    }
  ];

  const caseStudies = [
    {
      company: "TechCo",
      stat: "reduced overtime by 40%",
      logo: "https://placehold.co/60x60/e5e7eb/a3a3a3?text=TC",
      quote: "The AI insights helped us identify inefficiencies and optimize our workflows."
    },
    {
      company: "Consulting Firm",
      stat: "improved client billing accuracy by 95%",
      logo: "https://placehold.co/60x60/e5e7eb/a3a3a3?text=CF",
      quote: "Automated time tracking eliminated guesswork in our billing process."
    },
    {
      company: "Marketing Agency",
      stat: "increased productivity by 32%",
      logo: "https://placehold.co/60x60/e5e7eb/a3a3a3?text=MA",
      quote: "The focus time tracking and AI suggestions dramatically improved our team's efficiency."
    }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-5xl font-extrabold tracking-tight gradient-text"
              >
                Experience AI-Driven Productivity: 14-Day Free Trial
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300"
              >
                No credit card required. Get instant access to all enterprise features.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6"
              >
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm md:text-base">
                    <feature.icon className="h-5 w-5 text-primary" />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                  className={`relative ${plan.recommended ? 'md:scale-105 z-10' : ''}`}
                >
                  <Card className={`h-full enhanced-card card-shine ${
                    plan.recommended 
                      ? 'border-primary shadow-lg gradient-border' 
                      : 'border-gray-200'
                  }`}>
                    {plan.recommended && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Badge className={`${plan.highlightColor} text-white`}>Recommended</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {plan.name}
                      </CardTitle>
                      <CardDescription className="min-h-[50px]">{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-gray-500 ml-2">{plan.period}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="flex items-start">
                            <Check className={`h-5 w-5 mr-2 ${plan.recommended ? 'text-primary' : 'text-green-500'}`} />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className={`w-full ${
                          plan.name === "Enterprise Trial" 
                          ? "bg-gray-800 hover:bg-gray-700" 
                          : ""
                        }`}
                        variant={plan.name === "Enterprise Trial" ? "outline" : "default"}
                        onClick={() => handleSelectPlan(plan.name)}
                      >
                        {plan.buttonText}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Trusted by 5,000+ leading companies</h2>
                <div className="flex flex-wrap justify-center gap-8">
                  {trustLogos.map((logo, i) => (
                    <img 
                      key={i} 
                      src={logo} 
                      alt="Company logo" 
                      className="h-10 object-contain opacity-70 hover:opacity-100 transition-opacity" 
                    />
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mt-12">
                <h2 className="text-2xl font-bold mb-6 text-center">See the impact on real companies</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {caseStudies.map((study, i) => (
                    <Card key={i} className="enhanced-card">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-4">
                          <img src={study.logo} alt={`${study.company} logo`} className="w-12 h-12 rounded-full" />
                          <div>
                            <CardTitle className="text-lg">{study.company}</CardTitle>
                            <Badge variant="outline" className="mt-1">Success Story</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4 text-sm">
                          <span className="font-bold text-primary">{study.company}</span> {study.stat} using our platform
                        </p>
                        <blockquote className="italic text-gray-600 dark:text-gray-400 text-sm">
                          "{study.quote}"
                        </blockquote>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="max-w-3xl mx-auto space-y-12">
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Customize Your {selectedPlan}</h2>
                <div className="text-sm text-gray-500">
                  Step {currentStep}/3
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm">
                  <h3 className="text-lg font-medium mb-4">Help us tailor your trial</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="mb-3 text-gray-700 dark:text-gray-300">How many people are on your team?</p>
                      <div className="flex flex-wrap gap-3">
                        {["1-10", "11-50", "51-200", "201+"].map((size) => (
                          <Button
                            key={size}
                            variant={teamSize === size ? "default" : "outline"}
                            onClick={() => handleTeamSize(size)}
                          >
                            {size}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="mb-3 text-gray-700 dark:text-gray-300">What's your primary focus?</p>
                      <div className="flex flex-wrap gap-3">
                        {[
                          {name: "Time Tracking", icon: Clock},
                          {name: "Team Analytics", icon: BarChart2},
                          {name: "Security & Compliance", icon: Shield},
                          {name: "Project Management", icon: Users},
                        ].map((area) => (
                          <Button
                            key={area.name}
                            variant={focusArea === area.name ? "default" : "outline"}
                            className="flex items-center gap-2"
                            onClick={() => handleFocusArea(area.name)}
                          >
                            <area.icon className="h-4 w-4" />
                            {area.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm">
                  <h3 className="text-lg font-medium mb-4">Enterprise-Grade Add-Ons</h3>
                  <p className="text-sm text-gray-500 mb-4">Enhance your trial with premium features</p>
                  
                  <div className="space-y-3">
                    {[
                      {id: "private-cloud", name: "Private Cloud Deployment", price: "$2,000/month"},
                      {id: "custom-ai", name: "Custom AI Model Training", price: "$5,000 setup"},
                      {id: "soc-team", name: "Dedicated SOC Team", price: "$3,500/month"},
                    ].map((addon) => (
                      <div key={addon.id} className="flex items-start space-x-3">
                        <Checkbox
                          id={addon.id}
                          checked={addOns.includes(addon.id)}
                          onCheckedChange={() => toggleAddOn(addon.id)}
                        />
                        <div>
                          <label
                            htmlFor={addon.id}
                            className="font-medium cursor-pointer"
                          >
                            {addon.name}
                          </label>
                          <p className="text-sm text-gray-500">{addon.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">ROI Calculator</h3>
                  </div>
                  
                  <p className="text-sm mb-4">
                    Based on your selections, we estimate your annual savings with our AI-powered platform:
                  </p>
                  
                  <div className="text-2xl font-bold text-center py-4 bg-white dark:bg-gray-800 rounded-lg shadow-inner mb-4">
                    $124,000
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    Calculation based on industry averages for teams of your size. Actual results may vary.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setCurrentStep(3)}>
                  Continue to Final Step
                </Button>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Review & Complete Setup</h2>
              <div className="text-sm text-gray-500">
                Step {currentStep}/3
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm mb-6">
              <h3 className="text-lg font-medium mb-4">Your Trial Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between pb-3 border-b">
                  <span className="font-medium">Selected Plan:</span>
                  <span className="text-primary font-medium">{selectedPlan}</span>
                </div>
                
                <div className="flex justify-between pb-3 border-b">
                  <span className="font-medium">Team Size:</span>
                  <span>{teamSize || "Not specified"}</span>
                </div>
                
                <div className="flex justify-between pb-3 border-b">
                  <span className="font-medium">Primary Focus:</span>
                  <span>{focusArea || "Not specified"}</span>
                </div>
                
                {addOns.length > 0 && (
                  <div className="pb-3 border-b">
                    <span className="font-medium">Add-Ons:</span>
                    <ul className="mt-2 space-y-1">
                      {addOns.includes("private-cloud") && (
                        <li className="text-sm">• Private Cloud Deployment</li>
                      )}
                      {addOns.includes("custom-ai") && (
                        <li className="text-sm">• Custom AI Model Training</li>
                      )}
                      {addOns.includes("soc-team") && (
                        <li className="text-sm">• Dedicated SOC Team</li>
                      )}
                    </ul>
                  </div>
                )}
                
                <div className="pt-2">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <Check className="h-5 w-5" />
                    <span className="font-medium">14-day trial with all features enabled</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Your trial will begin immediately after you complete this setup.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-lg border border-primary/20 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Enterprise-Grade Security</h3>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="outline" className="bg-white dark:bg-gray-800 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> SOC2
                </Badge>
                <Badge variant="outline" className="bg-white dark:bg-gray-800 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> GDPR
                </Badge>
                <Badge variant="outline" className="bg-white dark:bg-gray-800 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> HIPAA
                </Badge>
                <Badge variant="outline" className="bg-white dark:bg-gray-800 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> ISO 27001
                </Badge>
              </div>
              
              <p className="text-sm">
                Your data is protected with enterprise-grade security measures including AES-256 encryption,
                SSO/SAML options, and data residency controls.
              </p>
            </div>
            
            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                Back
              </Button>
              <Button onClick={startTrial}>
                Start My Free Trial
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="container mx-auto">
          {renderStep()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Trial;
