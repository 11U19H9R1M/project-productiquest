
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Settings as SettingsIcon, Shield, User, Bell, Smartphone, Globe, Key, Database, Save, Trash2, Upload } from 'lucide-react';
import SettingsTabs from '@/components/settings/SettingsTabs';
import NotificationSection from '@/components/settings/NotificationSection';
import SystemSettingsSection from '@/components/settings/SystemSettingsSection';
import AccountSection from '@/components/settings/AccountSection';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent } from '@/components/ui/tabs';

// Create sections for each settings tab
const SecuritySection = () => {
  const { toast } = useToast();
  
  const handleSaveChanges = () => {
    toast({
      title: "Security settings updated",
      description: "Your security preferences have been saved successfully."
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Enable 2FA</h4>
                <p className="text-sm text-muted-foreground">Secure your account with two-factor authentication</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Authentication Methods</h4>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-primary/20" />
                  <span className="text-sm">Authenticator App (Recommended)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-gray-200" />
                  <span className="text-sm">SMS Authentication</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-gray-200" />
                  <span className="text-sm">Email Authentication</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveChanges}>Set Up 2FA</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Password Settings</CardTitle>
          <CardDescription>
            Update your password and password recovery options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveChanges}>Update Password</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Login Sessions</CardTitle>
          <CardDescription>
            Manage your active sessions and devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Current Session</p>
                  <p className="text-sm text-muted-foreground">Chrome on Windows • New York, USA</p>
                  <p className="text-xs text-muted-foreground mt-1">Started 2 hours ago</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-1 rounded text-xs">
                  Active
                </div>
              </div>
            </div>
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Mobile App</p>
                  <p className="text-sm text-muted-foreground">iPhone 13 • Seattle, USA</p>
                  <p className="text-xs text-muted-foreground mt-1">Last active 1 day ago</p>
                </div>
                <Button variant="outline" size="sm">Sign Out</Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full text-red-500 hover:text-red-600">Sign Out All Devices</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const DevicesSection = () => {
  const { toast } = useToast();
  
  const handleRemoveDevice = () => {
    toast({
      title: "Device removed",
      description: "The device has been removed from your account."
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Connected Devices</CardTitle>
          <CardDescription>
            Manage devices that are connected to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex">
                <div className="mr-3 mt-1 bg-primary/10 p-2 rounded-full">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">iPhone 13 Pro</h4>
                  <p className="text-sm text-muted-foreground">iOS 16.1</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-0.5 rounded">Current Device</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">Manage</Button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex">
                <div className="mr-3 mt-1 bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
                  <Smartphone className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-medium">MacBook Pro</h4>
                  <p className="text-sm text-muted-foreground">macOS 13.0</p>
                  <p className="text-xs text-muted-foreground mt-1">Last active: 2 days ago</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={handleRemoveDevice}>Remove</Button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex">
                <div className="mr-3 mt-1 bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
                  <Smartphone className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-medium">Windows PC</h4>
                  <p className="text-sm text-muted-foreground">Windows 11</p>
                  <p className="text-xs text-muted-foreground mt-1">Last active: 1 week ago</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={handleRemoveDevice}>Remove</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-between items-center">
            <span className="text-sm text-muted-foreground">3 devices connected</span>
            <Button variant="outline" className="text-red-500 hover:text-red-600" onClick={handleRemoveDevice}>
              Remove All Devices
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Device Notifications</CardTitle>
          <CardDescription>
            Manage how you receive notifications on your devices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">New Device Alerts</h4>
              <p className="text-sm text-muted-foreground">Receive notifications when a new device logs into your account</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Suspicious Activity</h4>
              <p className="text-sm text-muted-foreground">Get alerts for unusual login attempts</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Inactive Device Reminders</h4>
              <p className="text-sm text-muted-foreground">Receive reminders about devices you haven't used in 30 days</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const IntegrationsSection = () => {
  const { toast } = useToast();
  
  const handleConnect = (service: string) => {
    toast({
      title: `${service} Connected`,
      description: `Your ${service} account has been successfully connected.`
    });
  };
  
  const handleDisconnect = (service: string) => {
    toast({
      title: `${service} Disconnected`,
      description: `Your ${service} account has been disconnected.`
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Connected Services</CardTitle>
          <CardDescription>
            Manage third-party services connected to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                  <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.5 12H3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.5 17L20.5 12L15.5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Google</h4>
                  <p className="text-sm text-muted-foreground">Connected • Last sync: 2 hours ago</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => handleDisconnect("Google")}>Disconnect</Button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-4">
                  <svg className="h-6 w-6 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Slack</h4>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => handleConnect("Slack")}>Connect</Button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-4">
                  <svg className="h-6 w-6 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 8V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V8M21 8L16.5 3.5M21 8H3M3 8L7.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Dropbox</h4>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => handleConnect("Dropbox")}>Connect</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Sharing</CardTitle>
          <CardDescription>
            Control how your data is shared with connected services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Share Usage Data</h4>
              <p className="text-sm text-muted-foreground">Allow connected services to access your usage information</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Profile Information</h4>
              <p className="text-sm text-muted-foreground">Share your profile details with connected services</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Calendar Access</h4>
              <p className="text-sm text-muted-foreground">Allow services to view and update your calendar</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Save Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const ApiKeysSection = () => {
  const { toast } = useToast();
  
  const handleGenerateKey = () => {
    toast({
      title: "API Key Generated",
      description: "Your new API key has been generated successfully."
    });
  };
  
  const handleRevokeKey = () => {
    toast({
      title: "API Key Revoked",
      description: "The API key has been revoked successfully."
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Manage your API keys for integrating with our platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Button onClick={handleGenerateKey}>Generate New API Key</Button>
              <span className="text-sm text-muted-foreground">2/5 keys used</span>
            </div>
            
            <div className="border rounded-lg divide-y">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Production Key</h4>
                    <p className="text-xs text-muted-foreground mt-1">Created on Apr 2, 2023</p>
                    <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded font-mono text-sm">
                      sk_live_*****************FGHI
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={handleRevokeKey}>Revoke</Button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Development Key</h4>
                    <p className="text-xs text-muted-foreground mt-1">Created on Mar 15, 2023</p>
                    <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded font-mono text-sm">
                      sk_test_*****************ABCD
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={handleRevokeKey}>Revoke</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>API Usage</CardTitle>
          <CardDescription>
            Monitor your API usage and limits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">API Calls This Month</span>
                <span className="text-sm font-medium">25,432 / 50,000</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '50.8%' }}></div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 space-y-4">
              <h4 className="font-medium">Recent API Calls</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>GET /api/users</span>
                  <span className="text-muted-foreground">5 minutes ago</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>POST /api/projects</span>
                  <span className="text-muted-foreground">15 minutes ago</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>PUT /api/tasks/123</span>
                  <span className="text-muted-foreground">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View Full API Logs</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const DataManagementSection = () => {
  const { toast } = useToast();
  
  const handleDataExport = () => {
    toast({
      title: "Data Export Requested",
      description: "Your data export has been initiated. You'll receive an email when it's ready."
    });
  };
  
  const handleDataDeletion = () => {
    toast({
      title: "Data Deletion Requested",
      description: "Your account deletion request has been submitted."
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Export</CardTitle>
          <CardDescription>
            Download a copy of your data stored in our system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm">
              You can export the following data from your account:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Profile information</li>
              <li>Projects and tasks</li>
              <li>Time tracking records</li>
              <li>Reports and analytics</li>
              <li>Team collaboration data</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              The export will be prepared in JSON and CSV formats and may take up to 24 hours to generate.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">Last export: Never</div>
          <Button className="flex items-center" onClick={handleDataExport}>
            <Upload className="mr-2 h-4 w-4" />
            Request Data Export
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Retention</CardTitle>
          <CardDescription>
            Control how long we keep your data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Activity Logs</h4>
              <p className="text-sm text-muted-foreground">How long to keep your activity history</p>
            </div>
            <select className="border rounded px-2 py-1 text-sm">
              <option>1 year</option>
              <option>6 months</option>
              <option>3 months</option>
              <option>1 month</option>
            </select>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Completed Projects</h4>
              <p className="text-sm text-muted-foreground">Retention period for finished projects</p>
            </div>
            <select className="border rounded px-2 py-1 text-sm">
              <option>Forever</option>
              <option>5 years</option>
              <option>3 years</option>
              <option>1 year</option>
            </select>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Usage Analytics</h4>
              <p className="text-sm text-muted-foreground">Data used for personalization</p>
            </div>
            <select className="border rounded px-2 py-1 text-sm">
              <option>3 months</option>
              <option>6 months</option>
              <option>1 year</option>
              <option>Do not store</option>
            </select>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Save Preferences</Button>
        </CardFooter>
      </Card>
      
      <Card className="border-red-200 dark:border-red-900">
        <CardHeader className="text-red-600 dark:text-red-400">
          <CardTitle>Account Deletion</CardTitle>
          <CardDescription className="text-red-600/80 dark:text-red-400/80">
            Permanently delete your account and all associated data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            This action cannot be undone. Once your account is deleted, all of your data will be permanently removed from our systems.
          </p>
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md text-sm">
            <p className="font-medium text-red-600 dark:text-red-400">Please note:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-red-600/80 dark:text-red-400/80">
              <li>All your projects and tasks will be permanently deleted</li>
              <li>Your team members will lose access to shared resources</li>
              <li>You will lose access to all premium features</li>
              <li>Your subscription will be canceled</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300" onClick={handleDataDeletion}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const Settings = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const currentTab = location.pathname.split('/').pop() || 'notifications';
  
  // Ensure URL has a valid tab parameter
  useEffect(() => {
    if (location.pathname === '/settings') {
      navigate('/settings/notifications');
    }
  }, [location.pathname, navigate]);
  
  // Function to handle saving changes
  const handleSaveChanges = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <DashboardHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center">
                <SettingsIcon className="mr-2 h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h1>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </div>
            </div>
            
            <SettingsTabs />
            
            <div className="mt-6">
              <Tabs value={currentTab}>
                <TabsContent value="notifications">
                  <NotificationSection />
                </TabsContent>
                <TabsContent value="account">
                  <AccountSection />
                </TabsContent>
                <TabsContent value="devices">
                  <DevicesSection />
                </TabsContent>
                <TabsContent value="security">
                  <SecuritySection />
                </TabsContent>
                <TabsContent value="integrations">
                  <IntegrationsSection />
                </TabsContent>
                <TabsContent value="api-keys">
                  <ApiKeysSection />
                </TabsContent>
                <TabsContent value="data-management">
                  <DataManagementSection />
                </TabsContent>
                <TabsContent value="system">
                  <SystemSettingsSection />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Settings;
