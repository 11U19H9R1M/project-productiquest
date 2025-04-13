
import React from 'react';
import { 
  Clock, Calendar, BarChart2, Zap, Shield, GitBranch, 
  Server, Video, BrainCircuit, Boxes, Globe, Fingerprint
} from 'lucide-react';
import EnhancedFeatureCard from './EnhancedFeatureCard';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Features = () => {
  const features = [
    {
      icon: Clock,
      title: "Smart Time Tracking",
      description: "Automated tracking with idle detection and AI-powered categorization of your work activities.",
      details: "Our AI-powered time tracking system automatically detects when you're working and categorizes your activities. It also detects idle time and prompts you to categorize it or discard it. The system learns from your patterns to provide increasingly accurate categorization over time.",
      colorVariant: 'primary' as const
    },
    {
      icon: BrainCircuit,
      title: "Predictive Analytics",
      description: "ML-powered insights for deadline risks, burnout detection, and optimal time allocation.",
      details: "Using machine learning algorithms trained on millions of work patterns, our predictive analytics can forecast deadline risks, detect potential burnout before it happens, and recommend optimal time allocation strategies based on your historical productivity data.",
      colorVariant: 'secondary' as const
    },
    {
      icon: Video,
      title: "Async Updates",
      description: "Record and share video updates with AI transcription for seamless team collaboration.",
      details: "Record quick video updates for your team and our AI automatically transcribes them, extracts action items, and distributes them to relevant team members. Perfect for remote teams across time zones who need to minimize meetings.",
      colorVariant: 'warning' as const
    },
    {
      icon: BarChart2,
      title: "Deep Work Analytics",
      description: "Understand your focus patterns and optimize for maximum productivity and flow states.",
      details: "Analyze your focus patterns to identify when you do your best deep work. The system tracks flow state indicators and helps you protect and optimize your high-productivity periods while scheduling meetings and administrative tasks during your natural energy dips.",
      colorVariant: 'success' as const
    },
    {
      icon: Calendar,
      title: "Intelligent Scheduling",
      description: "AI recommends the best times for meetings, deep work, and breaks based on your patterns.",
      details: "Our calendar intelligence analyzes your historical productivity data and recommends optimal times for different types of work. It integrates with your calendar to suggest meeting times that won't disrupt your deep work periods.",
      colorVariant: 'primary' as const
    },
    {
      icon: Zap,
      title: "Distraction Analytics",
      description: "Browser extension identifies distractions and helps you stay focused with actionable insights.",
      details: "Our browser extension analyzes your app and website usage to identify potential distractions. It provides gentle nudges to keep you on track and generates weekly reports with actionable suggestions to improve your focus.",
      colorVariant: 'warning' as const
    },
    {
      icon: GitBranch,
      title: "Developer Integrations",
      description: "Connect with GitHub, Jira, and other dev tools for automatic work correlation.",
      details: "Seamlessly connect with your development tools to automatically correlate time spent with specific tasks, pull requests, and projects. This provides accurate data for project estimation and helps identify productivity bottlenecks in your development workflow.",
      colorVariant: 'secondary' as const
    },
    {
      icon: Globe,
      title: "Global Edge Computing",
      description: "Minimal latency worldwide with distributed cloud architecture and local processing.",
      details: "Our global edge computing infrastructure ensures that your experience is fast and responsive no matter where you are in the world. Critical data processing happens locally on your device to minimize latency and ensure privacy.",
      colorVariant: 'success' as const
    },
    {
      icon: Boxes,
      title: "Self-Hosted Option",
      description: "Enterprise-ready Kubernetes deployments for complete data control and compliance.",
      details: "For organizations with strict data sovereignty requirements, we offer fully self-hosted deployment options. Our Kubernetes-based deployment is designed for enterprise environments with high availability and scalability requirements.",
      colorVariant: 'primary' as const
    },
    {
      icon: Shield,
      title: "Compliance-First",
      description: "HIPAA, GDPR, and SOC2 compliant architecture with comprehensive audit trails.",
      details: "Built from the ground up with compliance in mind. Our architecture follows privacy-by-design principles and includes comprehensive audit trails. We maintain compliance with major regulations including HIPAA, GDPR, and SOC2.",
      colorVariant: 'success' as const
    },
    {
      icon: Server,
      title: "Blockchain Verification",
      description: "Optional tamper-proof timesheet auditing using distributed ledger technology.",
      details: "For industries where timesheet accuracy is critical, we offer optional blockchain verification. This creates an immutable record of work sessions that can be independently verified for auditing purposes.",
      colorVariant: 'secondary' as const
    },
    {
      icon: Fingerprint,
      title: "Zero-Trust Security",
      description: "End-to-end encryption and hardware MFA for enterprise-grade data protection.",
      details: "Our zero-trust security model assumes no network, device, or user is inherently trusted. All data is encrypted end-to-end, and we support hardware MFA devices like YubiKey for the highest level of authentication security.",
      colorVariant: 'warning' as const
    }
  ];

  return (
    <section id="features" className="py-20 bg-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Powerful Features for Modern Teams
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            Our platform combines AI intelligence with enterprise security to transform how remote teams work.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <EnhancedFeatureCard 
                icon={feature.icon} 
                title={feature.title} 
                description={feature.description} 
                details={feature.details} 
                colorVariant={feature.colorVariant}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
