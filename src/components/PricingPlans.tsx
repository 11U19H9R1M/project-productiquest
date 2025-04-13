
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

type PlanProps = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
};

const PricingPlan = ({ name, price, description, features, highlighted, buttonText }: PlanProps) => (
  <div className={`flex flex-col rounded-lg shadow-lg overflow-hidden ${
    highlighted ? 'border-2 border-primary ring-4 ring-primary/20 transform scale-105' : 'border border-gray-200'
  }`}>
    <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
      <div>
        <h3
          className={`inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase ${
            highlighted ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-700'
          }`}
        >
          {name}
        </h3>
      </div>
      <div className="mt-4 flex items-baseline text-5xl font-extrabold">
        {price}
        <span className="ml-1 text-xl font-medium text-gray-500">/month</span>
      </div>
      <p className="mt-5 text-lg text-gray-500">{description}</p>
    </div>
    <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0">
              <Check className={`h-5 w-5 ${highlighted ? 'text-primary' : 'text-green-500'}`} />
            </div>
            <p className="ml-3 text-sm text-gray-700">{feature}</p>
          </li>
        ))}
      </ul>
      <div className="rounded-md shadow">
        <Button
          className={`w-full ${highlighted ? '' : 'bg-gray-800 hover:bg-gray-700'}`}
          variant={highlighted ? "default" : "outline"}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  </div>
);

const PricingPlans = () => {
  const plans = [
    {
      name: "Freelancer",
      price: "$10",
      description: "Perfect for independent professionals tracking their own time.",
      features: [
        "Automated time tracking",
        "Project management",
        "Basic reporting",
        "Browser extension",
        "Unlimited projects",
        "14-day data retention"
      ],
      buttonText: "Start free trial"
    },
    {
      name: "Team",
      price: "$25",
      description: "All you need for small to medium teams to collaborate effectively.",
      features: [
        "Everything in Freelancer",
        "Team analytics dashboard",
        "Async video updates",
        "Advanced reporting",
        "Goal tracking",
        "30-day data retention",
        "Multiple integrations"
      ],
      highlighted: true,
      buttonText: "Start free trial"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Advanced security and control for large organizations.",
      features: [
        "Everything in Team",
        "Self-hosted option",
        "Blockchain audit trail",
        "HIPAA/GDPR compliance",
        "SSO & SCIM",
        "Dedicated support",
        "Custom integrations",
        "Unlimited data retention"
      ],
      buttonText: "Contact sales"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <PricingPlan
              key={index}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              highlighted={plan.highlighted}
              buttonText={plan.buttonText}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Need a custom plan for your organization?{" "}
            <a href="#" className="text-primary font-medium hover:underline">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
