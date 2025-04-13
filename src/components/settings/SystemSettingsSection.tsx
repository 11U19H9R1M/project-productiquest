import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  Save,
  RotateCcw,
  Clock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SystemSettingsSection = () => {
  const { toast } = useToast();
  const [autoTimeTracking, setAutoTimeTracking] = useState(true);
  const [idleDetection, setIdleDetection] = useState("15");
  const [trackingMethod, setTrackingMethod] = useState("auto");
  const [syncInterval, setSyncInterval] = useState("realtime");
  const [dateFormat, setDateFormat] = useState("YYYY-MM-DD");
  const [timeFormat, setTimeFormat] = useState("24h");

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your system preferences have been updated",
      duration: 3000,
    });
  };

  const handleResetSettings = () => {
    toast({
      title: "Settings reset",
      description: "Your system preferences have been reset to default",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Settings className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-xl font-semibold">System Settings</h2>
      </div>
      <p className="text-muted-foreground">Configure general system preferences</p>

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        <div className="space-y-3 p-4 border rounded-lg shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Automatic Time Tracking</h3>
              <p className="text-sm text-muted-foreground">Automatically track time based on activity</p>
            </div>
            <Switch 
              checked={autoTimeTracking} 
              onCheckedChange={setAutoTimeTracking} 
            />
          </div>
          
          {autoTimeTracking && (
            <div className="mt-3 space-y-3 pt-3 border-t">
              <div className="space-y-1">
                <Label className="text-sm">Idle detection timeout</Label>
                <Select value={idleDetection} onValueChange={setIdleDetection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Pause tracking after inactivity</p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm">Tracking method</Label>
                <RadioGroup value={trackingMethod} onValueChange={setTrackingMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="auto" id="auto" />
                    <Label htmlFor="auto" className="text-sm font-normal">Fully automatic</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manual" id="manual" />
                    <Label htmlFor="manual" className="text-sm font-normal">Manual confirmation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hybrid" id="hybrid" />
                    <Label htmlFor="hybrid" className="text-sm font-normal">Hybrid (suggest but don't auto-track)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3 p-4 border rounded-lg shadow-sm hover:shadow-md transition-all">
          <h3 className="text-lg font-medium">Language</h3>
          <p className="text-sm text-muted-foreground">Choose your preferred language</p>
          <Select defaultValue="en">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
              <SelectItem value="pt">Portuguese</SelectItem>
              <SelectItem value="ru">Russian</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3 p-4 border rounded-lg shadow-sm hover:shadow-md transition-all">
          <h3 className="text-lg font-medium">Time Zone</h3>
          <p className="text-sm text-muted-foreground">Set your local time zone</p>
          <Select defaultValue="UTC">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UTC">UTC (GMT+0)</SelectItem>
              <SelectItem value="EST">Eastern Time (GMT-5)</SelectItem>
              <SelectItem value="PST">Pacific Time (GMT-8)</SelectItem>
              <SelectItem value="CET">Central European Time (GMT+1)</SelectItem>
              <SelectItem value="JST">Japan Standard Time (GMT+9)</SelectItem>
              <SelectItem value="IST">India Standard Time (GMT+5:30)</SelectItem>
              <SelectItem value="AEST">Australian Eastern Time (GMT+10)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3 p-4 border rounded-lg shadow-sm hover:shadow-md transition-all">
          <h3 className="text-lg font-medium">Date & Time Format</h3>
          <p className="text-sm text-muted-foreground">Set your preferred date and time display format</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-sm">Date format</Label>
              <Select value={dateFormat} onValueChange={setDateFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <Label className="text-sm">Time format</Label>
              <Select value={timeFormat} onValueChange={setTimeFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                  <SelectItem value="24h">24-hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-3 p-4 border rounded-lg shadow-sm hover:shadow-md transition-all">
          <h3 className="text-lg font-medium">Data Synchronization</h3>
          <p className="text-sm text-muted-foreground">Configure how your data syncs across devices</p>
          
          <div className="space-y-2">
            <Select value={syncInterval} onValueChange={setSyncInterval}>
              <SelectTrigger>
                <SelectValue placeholder="Select sync interval" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-time</SelectItem>
                <SelectItem value="5min">Every 5 minutes</SelectItem>
                <SelectItem value="15min">Every 15 minutes</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="manual">Manual only</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="pt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="syncBackground" />
                <label
                  htmlFor="syncBackground"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sync in background when app is closed
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="syncWifi" defaultChecked />
                <label
                  htmlFor="syncWifi"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Only sync on Wi-Fi
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={handleResetSettings} className="flex items-center">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Default
        </Button>
        <Button onClick={handleSaveSettings} className="flex items-center">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SystemSettingsSection;
