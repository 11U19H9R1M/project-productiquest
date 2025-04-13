
import React from 'react';
import { Check, Clock, MessageSquare, Users, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Activity {
  id: number;
  text: string;
  time: string;
  type?: 'task' | 'comment' | 'time' | 'team' | 'document';
}

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  const { toast } = useToast();

  const getActivityIcon = (type?: string) => {
    switch (type) {
      case 'task':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'comment':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'team':
        return <Users className="h-4 w-4 text-purple-500" />;
      case 'document':
        return <FileText className="h-4 w-4 text-orange-500" />;
      case 'time':
      default:
        return <Clock className="h-4 w-4 text-primary" />;
    }
  };

  const handleActivityClick = (activity: Activity) => {
    toast({
      title: "Activity Details",
      description: `${activity.text} - ${activity.time}`,
    });
  };

  return (
    <div className="overflow-y-auto h-[330px] pr-2 space-y-1">
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
          <Clock className="h-12 w-12 mb-2 opacity-50" />
          <p>No recent activity</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {activities.map((activity) => (
            <li 
              key={activity.id} 
              className="flex items-start space-x-3 p-3 border border-gray-100 dark:border-gray-700 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer animate-fade-in"
              onClick={() => handleActivityClick(activity)}
            >
              <div className="rounded-full p-1.5 bg-primary/10 dark:bg-primary/20 flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">{activity.text}</p>
                <div className="flex items-center mt-1">
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityFeed;
