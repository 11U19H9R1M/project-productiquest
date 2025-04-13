import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardCards from '@/components/dashboard/DashboardCards';
import EnhancedDashboardCards from '@/components/dashboard/EnhancedDashboardCards';
import TimeTrackingChart from '@/components/dashboard/TimeTrackingChart';
import ProjectsOverview from '@/components/dashboard/ProjectsOverview';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Info, Calendar, Clock, BarChart2, ArrowUpRight, Settings, ChevronRight, Bell } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Sample data for TimeTrackingChart
  const timeTrackingData = [
    { day: "Mon", hours: 6.5 },
    { day: "Tue", hours: 7.2 },
    { day: "Wed", hours: 8.0 },
    { day: "Thu", hours: 5.5 },
    { day: "Fri", hours: 6.8 },
    { day: "Sat", hours: 2.5 },
    { day: "Sun", hours: 0.0 },
  ];
  
  // Sample data for ProjectsOverview
  const projectsData = [
    { id: 1, name: "Website Redesign", progress: 75, hoursLogged: 45, dueDate: "2025-05-15" },
    { id: 2, name: "Mobile App Development", progress: 30, hoursLogged: 28, dueDate: "2025-06-20" },
    { id: 3, name: "Marketing Campaign", progress: 50, hoursLogged: 18, dueDate: "2025-04-30" },
    { id: 4, name: "Database Migration", progress: 90, hoursLogged: 32, dueDate: "2025-04-25" },
  ];
  
  // Sample data for ActivityFeed
  const activitiesData = [
    { id: 1, text: "You logged 3 hours on Website Redesign", time: "2 hours ago", type: "time" as const },
    { id: 2, text: "Sara K. commented on Mobile App wireframes", time: "4 hours ago", type: "comment" as const },
    { id: 3, text: "Task 'Create API endpoints' marked as complete", time: "Yesterday", type: "task" as const },
    { id: 4, text: "Weekly team meeting scheduled", time: "Yesterday", type: "team" as const },
    { id: 5, text: "Marketing report was updated", time: "2 days ago", type: "document" as const },
    { id: 6, text: "New project 'Customer Portal' was created", time: "3 days ago", type: "task" as const },
  ];
  
  const handleViewAll = () => {
    toast({
      title: "Coming soon!",
      description: "This feature is under development.",
    });
  };

  const navigateToSection = (section) => {
    navigate(`/${section}`);
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      
      <main className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <div className="flex-1">
          <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 px-4 py-6">
            {/* Sidebar for tablet and desktop */}
            <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
              <ScrollArea className="h-full py-6 pr-6">
                <h2 className="mb-4 text-lg font-semibold">Dashboard</h2>
                <Tabs defaultValue={activeTab} orientation="vertical" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="flex flex-col items-start justify-start space-y-1">
                    <TabsTrigger value="overview" className="w-full justify-start" onClick={() => navigate('/dashboard')}>Overview</TabsTrigger>
                    <TabsTrigger value="projects" className="w-full justify-start" onClick={() => navigate('/projects')}>Projects</TabsTrigger>
                    <TabsTrigger value="tasks" className="w-full justify-start" onClick={() => navigate('/tasks')}>My Tasks</TabsTrigger>
                    <TabsTrigger value="time" className="w-full justify-start" onClick={() => navigate('/time-tracking')}>Time Tracking</TabsTrigger>
                    <TabsTrigger value="reports" className="w-full justify-start" onClick={() => navigate('/reports')}>Reports</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Separator className="my-6" />
              </ScrollArea>
            </aside>
            
            {/* Main content */}
            <div className="flex-1 lg:max-w-5xl">
              <Tabs defaultValue={activeTab} className="w-full md:hidden mb-6">
                <TabsList className="w-full grid grid-cols-5 h-auto">
                  <TabsTrigger value="overview" onClick={() => navigate('/dashboard')}>Overview</TabsTrigger>
                  <TabsTrigger value="projects" onClick={() => navigate('/projects')}>Projects</TabsTrigger>
                  <TabsTrigger value="tasks" onClick={() => navigate('/tasks')}>Tasks</TabsTrigger>
                  <TabsTrigger value="time" onClick={() => navigate('/time-tracking')}>Time</TabsTrigger>
                  <TabsTrigger value="reports" onClick={() => navigate('/reports')}>Reports</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="grid grid-cols-1 gap-6">
                {/* Overview Section */}
                {activeTab === "overview" && (
                  <>
                    <div className="flex flex-col md:flex-row gap-4 items-start">
                      <Card className="w-full md:w-2/3">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-base font-medium">Trial Status</CardTitle>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Premium Trial</p>
                                <p className="text-xs text-muted-foreground">10 days remaining</p>
                              </div>
                              <Button size="sm" onClick={() => navigate('/trial')}>Upgrade Now</Button>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="bg-primary h-full rounded-full" style={{ width: "30%" }}></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="w-full md:w-1/3">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-base font-medium">Upcoming</CardTitle>
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2.5">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm font-medium">Team Meeting</p>
                                <p className="text-xs text-muted-foreground">Today, 3:00 PM</p>
                              </div>
                              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => navigate('/calendar')}>
                                <Bell className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm font-medium">Project Deadline</p>
                                <p className="text-xs text-muted-foreground">Tomorrow</p>
                              </div>
                              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => navigate('/projects')}>
                                <Bell className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <DashboardCards />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="md:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-base font-medium">Time Tracking</CardTitle>
                          <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => navigate('/time-tracking')}>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </CardHeader>
                        <CardContent>
                          <TimeTrackingChart data={timeTrackingData} />
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="text-xs w-full" onClick={() => navigate('/time-tracking')}>
                            View Detailed Reports
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-base font-medium">Productivity</CardTitle>
                          <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => navigate('/reports')}>
                            <BarChart2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm">Focus Time</p>
                              <p className="text-sm font-medium">4h 26m</p>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="bg-green-500 h-full rounded-full" style={{ width: "65%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm">Meeting Time</p>
                              <p className="text-sm font-medium">2h 15m</p>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="bg-yellow-500 h-full rounded-full" style={{ width: "35%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm">Break Time</p>
                              <p className="text-sm font-medium">1h 05m</p>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="bg-blue-500 h-full rounded-full" style={{ width: "15%" }}></div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="ghost" size="sm" className="gap-1 text-xs w-full" onClick={() => navigate('/reports')}>
                            AI Recommendations
                            <ArrowUpRight className="h-3 w-3" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                    
                    <EnhancedDashboardCards />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="md:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-base font-medium">Projects Overview</CardTitle>
                          <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => navigate('/projects')}>
                            <Settings className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </CardHeader>
                        <CardContent>
                          <ProjectsOverview projects={projectsData} />
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-base font-medium">Activity</CardTitle>
                          <Button variant="ghost" size="sm" className="text-xs h-8" onClick={() => navigate('/dashboard')}>
                            View all
                          </Button>
                        </CardHeader>
                        <CardContent>
                          <ActivityFeed activities={activitiesData} />
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}
                
                {activeTab === "projects" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Projects</CardTitle>
                      <CardDescription>View and manage your team projects.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-left" 
                          onClick={() => navigate('/projects')}
                        >
                          View All Projects
                          <ChevronRight className="ml-auto h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {activeTab === "tasks" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>My Tasks</CardTitle>
                      <CardDescription>Manage your personal tasks and to-dos.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-left" 
                          onClick={() => navigate('/tasks')}
                        >
                          View All Tasks
                          <ChevronRight className="ml-auto h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {activeTab === "time" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Time Tracking</CardTitle>
                      <CardDescription>Track your work hours and monitor productivity.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-left" 
                          onClick={() => navigate('/time-tracking')}
                        >
                          Go to Time Tracking
                          <ChevronRight className="ml-auto h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {activeTab === "reports" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Reports</CardTitle>
                      <CardDescription>Analyze performance and track metrics.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-left" 
                          onClick={() => navigate('/reports')}
                        >
                          View All Reports
                          <ChevronRight className="ml-auto h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
