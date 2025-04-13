
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Check } from 'lucide-react';

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      toast({
        title: "Subscribed successfully!",
        description: "Thank you for subscribing to our newsletter.",
      });
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-r from-primary to-purple-500 text-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            <span className="block">Ready to transform your remote work?</span>
            <span className="block text-white/90">Start your free trial today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-white/80 max-w-2xl mx-auto">
            No credit card required. Full access to all features for 14 days.
            Experience the future of productivity and time management.
          </p>
          
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <div className="inline-flex rounded-md shadow">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Get started for free
              </Button>
            </div>
            <div className="inline-flex">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Contact sales
              </Button>
            </div>
          </div>
          
          <div className="mt-10 max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Stay updated</h3>
              <p className="text-sm text-white/80 mb-4">
                Subscribe to our newsletter for productivity tips and product updates.
              </p>
              
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/20 text-white placeholder:text-white/60 border-transparent focus:border-white"
                  />
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-white text-primary hover:bg-gray-100"
                  >
                    {isSubmitting ? "Subscribing..." : (
                      <>
                        Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="flex items-center justify-center bg-white/20 rounded py-2 text-white">
                  <Check className="h-5 w-5 mr-2" />
                  <span>Thanks for subscribing!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
