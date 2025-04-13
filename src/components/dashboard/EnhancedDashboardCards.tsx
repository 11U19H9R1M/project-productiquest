
import React from 'react';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Briefcase, 
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Card, CardContent } from '@/components/ui/card';

type CardData = {
  title: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  details?: {
    previousValue: string;
    period: string;
    insight?: string;
  };
};

const EnhancedDashboardCards = () => {
  const cards: CardData[] = [
    {
      title: 'Hours Tracked',
      value: '32.5',
      subtext: 'This week',
      icon: <Clock className="h-5 w-5 text-primary" />,
      change: '+5.2',
      changeType: 'positive',
      details: {
        previousValue: '27.3',
        period: 'Last week',
        insight: 'Your productivity is increasing! Keep up the good work.'
      }
    },
    {
      title: 'Active Tasks',
      value: '12',
      subtext: 'In progress',
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
      change: '+3',
      changeType: 'positive',
      details: {
        previousValue: '9',
        period: 'Last week',
        insight: 'Consider prioritizing tasks to maintain focus.'
      }
    },
    {
      title: 'Overdue Tasks',
      value: '3',
      subtext: 'Requires attention',
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      change: '-2',
      changeType: 'positive',
      details: {
        previousValue: '5',
        period: 'Last week',
        insight: 'Good job reducing your overdue tasks!'
      }
    },
    {
      title: 'Active Projects',
      value: '5',
      subtext: 'Currently managing',
      icon: <Briefcase className="h-5 w-5 text-primary" />,
      change: '0',
      changeType: 'neutral',
      details: {
        previousValue: '5',
        period: 'Last week',
        insight: 'Your project load is stable.'
      }
    },
  ];

  const getChangeIcon = (changeType: 'positive' | 'negative' | 'neutral') => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp className="h-3 w-3 mr-1" />;
      case 'negative':
        return <TrendingDown className="h-3 w-3 mr-1" />;
      case 'neutral':
        return <Minus className="h-3 w-3 mr-1" />;
    }
  };

  const getChangeColor = (changeType: 'positive' | 'negative' | 'neutral', value: string) => {
    if (changeType === 'neutral') return 'text-gray-500';
    
    // For overdue tasks, negative change (-2) is actually positive
    if (value.includes('-') && changeType === 'positive') {
      return 'text-green-500';
    }
    
    return changeType === 'positive' ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <HoverCard key={index}>
          <HoverCardTrigger asChild>
            <Card className="shadow-sm overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary"></div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="bg-primary/10 p-2 rounded-full">
                    {card.icon}
                  </div>
                  <div 
                    className={`flex items-center text-xs font-medium ${getChangeColor(card.changeType, card.value)}`}
                  >
                    {getChangeIcon(card.changeType)}
                    {card.change}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</h3>
                  <div className="flex items-baseline mt-1">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</span>
                    {card.title === 'Hours Tracked' && (
                      <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">hours</span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{card.subtext}</p>
                </div>
              </CardContent>
            </Card>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 p-0 bg-white dark:bg-gray-800 shadow-lg">
            <div className="p-4 border-b">
              <h4 className="font-medium text-sm">{card.title} Details</h4>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Current:</span>
                <span className="font-medium">{card.value}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">{card.details?.period}:</span>
                <span className="font-medium">{card.details?.previousValue}</span>
              </div>
              {card.details?.insight && (
                <div className="mt-2 p-3 bg-primary/5 rounded-md text-xs">
                  <p>{card.details.insight}</p>
                </div>
              )}
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
};

export default EnhancedDashboardCards;
