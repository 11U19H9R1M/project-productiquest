
import React from 'react';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Briefcase, 
  TrendingUp 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const DashboardCards = () => {
  const cards = [
    {
      title: 'Hours Tracked',
      value: '32.5',
      subtext: 'This week',
      icon: <Clock className="h-5 w-5 text-primary" />,
      change: '+5.2',
      changeType: 'positive',
    },
    {
      title: 'Active Tasks',
      value: '12',
      subtext: 'In progress',
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
      change: '+3',
      changeType: 'positive',
    },
    {
      title: 'Overdue Tasks',
      value: '3',
      subtext: 'Requires attention',
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      change: '-2',
      changeType: 'positive',
    },
    {
      title: 'Active Projects',
      value: '5',
      subtext: 'Currently managing',
      icon: <Briefcase className="h-5 w-5 text-primary" />,
      change: '0',
      changeType: 'neutral',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-full bg-primary/10">{card.icon}</div>
              <div 
                className={`flex items-center text-xs ${
                  card.changeType === 'positive' 
                    ? 'text-green-500' 
                    : card.changeType === 'negative' 
                      ? 'text-red-500' 
                      : 'text-gray-500'
                }`}
              >
                {card.changeType !== 'neutral' && (
                  <TrendingUp className={`h-3 w-3 mr-1 ${card.changeType === 'negative' ? 'rotate-180' : ''}`} />
                )}
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
      ))}
    </div>
  );
};

export default DashboardCards;
