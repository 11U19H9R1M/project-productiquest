
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Bell, 
  Clock, 
  MessageSquare, 
  RotateCcw, 
  Check, 
  ChevronDown 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotificationItemProps {
  title: string;
  description: string;
  defaultChecked?: boolean;
  advancedSettings?: boolean;
}

const NotificationItem = ({
  title,
  description,
  defaultChecked = true,
  advancedSettings = false,
}: NotificationItemProps) => {
  const [isEnabled, setIsEnabled] = useState(defaultChecked);
  const [isOpen, setIsOpen] = useState(false);
  const [frequency, setFrequency] = useState("immediate");
  const [importance, setImportance] = useState(50);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium">{title}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
      </div>
      
      {advancedSettings && isEnabled && (
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="mt-2 px-3 py-1 bg-muted/50 rounded-md"
        >
          <CollapsibleTrigger className="flex items-center text-xs font-medium text-muted-foreground hover:text-foreground">
            Advanced Options
            <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-medium">Delivery frequency</label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="hourly">Hourly digest</SelectItem>
                  <SelectItem value="daily">Daily digest</SelectItem>
                  <SelectItem value="weekly">Weekly digest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium">Importance threshold</label>
                <span className="text-xs font-medium">
                  {importance}%
                </span>
              </div>
              <Slider 
                value={[importance]} 
                onValueChange={(values) => setImportance(values[0])} 
                max={100} 
                step={5}
              />
              <p className="text-xs text-muted-foreground">Only send notifications above this importance level</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

const NotificationSection = () => {
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated",
      duration: 3000,
    });
  };

  const handleResetSettings = () => {
    toast({
      title: "Settings reset",
      description: "Your notification preferences have been reset to default",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Bell className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-xl font-semibold">Notification Preferences</h2>
      </div>
      <p className="text-muted-foreground">Configure how and when you receive notifications</p>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">Email Notifications</h3>
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30">Email</Badge>
          </div>
          
          <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
            <NotificationItem
              title="Task Assignments"
              description="Receive emails when tasks are assigned to you"
              advancedSettings={true}
            />
            
            <NotificationItem
              title="Task Reminders"
              description="Receive reminders for upcoming task deadlines"
              advancedSettings={true}
            />
            
            <NotificationItem
              title="Project Updates"
              description="Get notified about updates to projects you're part of"
              advancedSettings={true}
            />
            
            <NotificationItem
              title="Team Announcements"
              description="Receive important team-wide announcements"
              advancedSettings={true}
            />
            
            <NotificationItem
              title="Weekly Summaries"
              description="Get a weekly summary of your activity"
              defaultChecked={false}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">In-App Notifications</h3>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800">App</Badge>
          </div>
          
          <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
            <NotificationItem
              title="Comments"
              description="Show notifications for comments on your tasks"
              advancedSettings={true}
            />
            
            <NotificationItem
              title="Task Status Changes"
              description="Show notifications when task statuses change"
              advancedSettings={true}
            />
            
            <NotificationItem
              title="Time Tracking Reminders"
              description="Remind you to start/stop timers"
              advancedSettings={true}
            />
            
            <NotificationItem
              title="Mentions"
              description="Show notifications when you're mentioned"
              advancedSettings={true}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">Mobile Notifications</h3>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800">Mobile</Badge>
          </div>
          
          <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
            <NotificationItem
              title="Push Notifications"
              description="Receive push notifications on your mobile device"
              advancedSettings={true}
            />
            
            <NotificationItem
              title="Critical Alerts"
              description="Get notifications for high-priority items even when in Do Not Disturb mode"
              defaultChecked={false}
              advancedSettings={true}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={handleResetSettings} className="flex items-center">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Default
          </Button>
          <Button onClick={handleSaveSettings} className="flex items-center">
            <Check className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;
