
import React from 'react';
import { Play, Pause, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface FloatingActionButtonProps {
  className?: string;
}

export const FloatingActionButton = ({ className }: FloatingActionButtonProps) => {
  const [isActive, setIsActive] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [timer, setTimer] = React.useState(0);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const { toast } = useToast();
  
  const toggleTimer = () => {
    if (isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      toast({
        title: "Timer stopped",
        description: `You tracked ${formatTime(timer)}`,
      });
    } else {
      intervalRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      
      toast({
        title: "Timer started",
        description: "Tracking your time now",
      });
    }
    
    setIsActive(!isActive);
  };
  
  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimer(0);
    setIsActive(false);
    setIsExpanded(false);
  };
  
  React.useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn("md:hidden fixed bottom-6 right-6 z-40", className)}>
      {isExpanded && (
        <div className="absolute bottom-16 right-0 bg-background rounded-lg shadow-lg p-3 w-48 border animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-sm">Quick Timer</span>
            <button 
              className="p-1 hover:bg-muted rounded-full"
              onClick={() => setIsExpanded(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="text-2xl font-mono text-center my-2">
            {formatTime(timer)}
          </div>
          
          <div className="flex justify-between mt-3">
            <button 
              className="bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded-md text-sm"
              onClick={toggleTimer}
            >
              {isActive ? 'Stop' : 'Start'}
            </button>
            
            <button 
              className="bg-muted hover:bg-muted/80 text-foreground px-3 py-1 rounded-md text-sm"
              onClick={resetTimer}
            >
              Reset
            </button>
          </div>
        </div>
      )}
      
      <button
        className={cn(
          "h-12 w-12 rounded-full shadow-lg flex items-center justify-center transition-colors duration-300",
          isActive 
            ? "bg-destructive text-white" 
            : "bg-primary text-white"
        )}
        onClick={() => isActive ? toggleTimer() : setIsExpanded(!isExpanded)}
      >
        {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </button>
    </div>
  );
};
