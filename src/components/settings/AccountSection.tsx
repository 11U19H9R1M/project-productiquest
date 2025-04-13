
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Save, User, Mail, Lock, Trash2, ExternalLink, Upload } from "lucide-react";

const AccountSection = () => {
  const { toast } = useToast();
  const [fullName, setFullName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane.doe@example.com");
  const [role, setRole] = useState("Administrator");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your account information has been saved.",
      duration: 3000,
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "Please check your email to confirm account deletion.",
      variant: "destructive",
      duration: 5000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <User className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-xl font-semibold">Account Settings</h2>
      </div>
      <p className="text-muted-foreground">Manage your account information and preferences</p>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-fit">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 mt-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="flex items-center">
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administrator">Administrator</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Developer">Developer</SelectItem>
                      <SelectItem value="Viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea 
                  id="bio" 
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Tell us about yourself"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <Switch id="public-profile" />
              <Label htmlFor="public-profile">Make profile public</Label>
            </div>
            <Button onClick={handleSaveProfile} className="flex items-center">
              <Save className="h-4 w-4 mr-2" />
              Save Profile
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="email" className="space-y-6 mt-6">
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="your.email@example.com"
                className="w-full"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch 
                id="marketing-emails" 
                defaultChecked 
              />
              <Label htmlFor="marketing-emails">Receive product updates and marketing emails</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch 
                id="security-emails" 
                defaultChecked 
              />
              <Label htmlFor="security-emails">Receive security alerts (cannot be disabled)</Label>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={handleSaveProfile} className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Update Email Settings
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="password" className="space-y-6 mt-6">
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" placeholder="••••••••" />
            </div>

            <div className="pt-4 space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="two-factor" 
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
                <div>
                  <Label htmlFor="two-factor">Two-factor authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
              </div>
              
              {twoFactorEnabled && (
                <div className="ml-6 pl-2 border-l-2 border-muted">
                  <p className="text-sm mb-2">Choose 2FA method:</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="authenticator" name="2fa-method" defaultChecked />
                      <Label htmlFor="authenticator" className="text-sm">Authenticator app</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="sms" name="2fa-method" />
                      <Label htmlFor="sms" className="text-sm">SMS</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="backup" name="2fa-method" />
                      <Label htmlFor="backup" className="text-sm">Backup codes</Label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={handleSaveProfile} className="flex items-center">
              <Lock className="h-4 w-4 mr-2" />
              Update Password
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-6" />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
        <div className="p-4 border border-destructive/20 rounded-md bg-destructive/5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h4 className="font-medium">Delete Account</h4>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleDeleteAccount}
              className="flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
        
        <div className="p-4 border rounded-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h4 className="font-medium">Connected Services</h4>
              <p className="text-sm text-muted-foreground">
                Manage third-party services connected to your account
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Manage Connections
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSection;
