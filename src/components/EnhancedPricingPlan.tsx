
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: PricingFeature[];
  highlighted?: boolean;
  callToAction: string;
  discountBadge?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const EnhancedPricingPlan = ({ pricingTiers }: { pricingTiers: PricingTier[] }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Choose the plan that's right for you and your team
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ 
              y: -10,
              boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.2)",
              scale: 1.02
            }}
            className={cn(
              "rounded-lg p-8 border border-border transition-all duration-300 backdrop-blur-sm shadow-lg",
              tier.highlighted 
                ? "bg-primary/5 border-primary/50 relative transform-gpu"
                : "bg-card"
            )}
          >
            {tier.highlighted && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                <Star className="h-3 w-3" />
                <span>MOST POPULAR</span>
              </div>
            )}

            {tier.discountBadge && (
              <div className="absolute top-6 right-6 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md animate-pulse">
                {tier.discountBadge}
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
              <div className="mt-4 flex items-baseline text-foreground">
                <span className="text-4xl font-extrabold">{tier.price}</span>
                <span className="ml-1 text-xl font-semibold text-muted-foreground">/month</span>
              </div>
              <p className="mt-4 text-muted-foreground">{tier.description}</p>

              <div className="mt-8 space-y-5">
                {tier.features.map((feature, featureIdx) => (
                  <motion.div
                    key={featureIdx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + featureIdx * 0.05, duration: 0.3 }}
                  >
                    <div className="flex items-start">
                      <div className={cn(
                        "flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center",
                        feature.included 
                          ? "bg-primary/10 text-primary" 
                          : "bg-muted text-muted-foreground"
                      )}>
                        <Check className={cn(
                          "h-4 w-4",
                          !feature.included && "opacity-50"
                        )} />
                      </div>
                      <span className={cn(
                        "ml-3 text-sm",
                        feature.included ? "text-foreground" : "text-muted-foreground line-through"
                      )}>
                        {feature.text}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <Button 
                  className={cn(
                    "w-full py-6 transition-all",
                    tier.highlighted 
                      ? "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" 
                      : "bg-primary/80 hover:bg-primary"
                  )}
                >
                  {tier.callToAction}
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12 text-sm text-muted-foreground">
        <p>All plans include 24/7 support, regular updates, and a 30-day money-back guarantee.</p>
        <p className="mt-2">Need a custom plan? <a href="#" className="text-primary hover:underline">Contact us</a></p>
      </div>
    </div>
  );
};

export default EnhancedPricingPlan;
