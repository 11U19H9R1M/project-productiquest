
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Clock, 
  BarChart2, 
  Calendar,
  BrainCircuit
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DemoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const { toast } = useToast();

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Demo Paused" : "Demo Playing",
      description: isPlaying ? "You've paused the product demonstration" : "You're now watching the product demonstration",
    });
  };

  return (
    <div className="bg-card rounded-xl shadow-lg overflow-hidden">
      <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-purple-400/20 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              {isPlaying ? 
                <Pause className="h-12 w-12 text-primary" /> : 
                <Play className="h-12 w-12 text-primary ml-1" />
              }
            </div>
            <h3 className="text-xl font-medium">ProductiQuest Demo</h3>
            <p className="text-muted-foreground mt-2">Click to {isPlaying ? 'pause' : 'play'} the demo</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div 
            className="h-full bg-primary" 
            style={{ width: `${currentProgress}%` }}
          ></div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute inset-0 w-full h-full bg-transparent hover:bg-black/5"
          onClick={handlePlayPause}
        >
          <span className="sr-only">{isPlaying ? 'Pause' : 'Play'} demo</span>
        </Button>
      </div>
      <div className="px-4 py-3 bg-card flex items-center justify-between">
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handlePlayPause}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon">
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          01:23 / 05:46
        </div>
      </div>
    </div>
  );
};

const FeatureDemo = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow">
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-lg font-medium">{title}</h3>
    <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    <Button variant="link" className="mt-4 p-0 h-auto">
      See it in action
    </Button>
  </div>
);

const Demo = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              <span className="block">See ProductiQuest in Action</span>
              <span className="block gradient-text">Interactive Demo</span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience firsthand how our AI-powered platform transforms remote work productivity and team collaboration.
            </p>
          </div>
          
          <Tabs defaultValue="live-demo" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="live-demo">Live Demo</TabsTrigger>
              <TabsTrigger value="features">Key Features</TabsTrigger>
              <TabsTrigger value="interface">Interface Tour</TabsTrigger>
            </TabsList>
            
            <TabsContent value="live-demo" className="mt-6">
              <DemoPlayer />
              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Want to try it yourself? Start a free 14-day trial today.
                </p>
                <Button size="lg">Start Free Trial</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="features">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <FeatureDemo 
                  icon={Clock}
                  title="Smart Time Tracking"
                  description="Automated tracking with idle detection and AI-powered categorization of your work activities."
                />
                <FeatureDemo 
                  icon={BrainCircuit}
                  title="Predictive Analytics"
                  description="ML-powered insights for deadline risks, burnout detection, and optimal time allocation."
                />
                <FeatureDemo 
                  icon={BarChart2}
                  title="Deep Work Analytics"
                  description="Understand your focus patterns and optimize for maximum productivity and flow states."
                />
                <FeatureDemo 
                  icon={Calendar}
                  title="Intelligent Scheduling"
                  description="AI recommends the best times for meetings, deep work, and breaks based on your patterns."
                />
              </div>
            </TabsContent>
            
            <TabsContent value="interface">
              <div className="bg-card rounded-xl overflow-hidden shadow-md mt-6">
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Interface Tour</h3>
                  <p className="text-muted-foreground mb-6">
                    Get familiar with ProductiQuest's intuitive interface through our guided tour.
                  </p>
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Interface tour video loading...</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Demo;
