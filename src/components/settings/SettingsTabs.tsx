
import React, { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";
import { useIsMobile, useIsBelow } from "@/hooks/use-mobile";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  User,
  Bell,
  Smartphone,
  Shield,
  Globe,
  Key,
  Database,
  Settings as SettingsIcon,
} from "lucide-react";

const SettingsTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const currentTab = path.split("/").pop() || "notifications";
  const isMobile = useIsMobile();
  const isSmallScreen = useIsBelow("lg");
  
  const tabs = [
    { id: "account", label: "Account", icon: <User className="h-4 w-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
    { id: "devices", label: "Devices", icon: <Smartphone className="h-4 w-4" /> },
    { id: "security", label: "Security", icon: <Shield className="h-4 w-4" /> },
    { id: "integrations", label: "Integrations", icon: <Globe className="h-4 w-4" /> },
    { id: "api-keys", label: "API Keys", icon: <Key className="h-4 w-4" /> },
    { id: "data-management", label: "Data", icon: <Database className="h-4 w-4" /> },
    { id: "system", label: "System", icon: <SettingsIcon className="h-4 w-4" /> },
  ];

  const handleTabChange = (value: string) => {
    navigate(`/settings/${value}`);
  };
  
  // Ensure the current tab is valid or redirect to a default
  useEffect(() => {
    if (currentTab && !tabs.some(tab => tab.id === currentTab)) {
      navigate('/settings/notifications');
    }
  }, [currentTab, navigate]);

  // For extra small screens, use a dropdown select
  if (isMobile) {
    return (
      <div className="w-full mb-6">
        <Select value={currentTab} onValueChange={handleTabChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Setting" />
          </SelectTrigger>
          <SelectContent>
            {tabs.map((tab) => (
              <SelectItem key={tab.id} value={tab.id}>
                <div className="flex items-center gap-2">
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  // For normal screens, use tabs with responsive grid
  return (
    <Tabs
      defaultValue={currentTab}
      value={currentTab}
      className="w-full"
      onValueChange={handleTabChange}
    >
      <TabsList 
        className={cn(
          "grid gap-1 bg-muted h-auto p-1 rounded-lg",
          isSmallScreen ? "grid-cols-4" : "grid-cols-8"
        )}
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="flex items-center gap-1.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            {tab.icon}
            <span className={cn(
              isSmallScreen ? "hidden sm:inline-block" : "inline-block"
            )}>
              {tab.label}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

// Helper function to conditionally join classnames
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default SettingsTabs;
