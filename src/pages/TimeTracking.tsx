
import React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Download, BarChart, Calendar } from 'lucide-react';
import TimeTrackingChart from '@/components/dashboard/TimeTrackingChart';

const TimeTracking = () => {
  const { theme } = useTheme();
  const { toast } = useToast();

  // Mock data for the time tracking
  const timeTrackingData = [
    { day: 'Mon', hours: 7.5 },
    { day: 'Tue', hours: 8 },
    { day: 'Wed', hours: 6.5 },
    { day: 'Thu', hours: 8.5 },
    { day: 'Fri', hours: 7 },
    { day: 'Sat', hours: 3 },
    { day: 'Sun', hours: 1.5 },
  ];

  const handleExportData = () => {
    toast({
      title: "Data exported",
      description: "Your time tracking data has been exported successfully.",
    });
  };

  const timeEntries = [
    { id: 1, project: "Website Redesign", task: "UI Implementation", duration: "2:45", startTime: "9:00 AM", endTime: "11:45 AM", date: "Today" },
    { id: 2, project: "API Development", task: "Backend Integration", duration: "3:20", startTime: "1:00 PM", endTime: "4:20 PM", date: "Today" },
    { id: 3, project: "Client Meeting", task: "Project Planning", duration: "1:15", startTime: "5:00 PM", endTime: "6:15 PM", date: "Today" },
    { id: 4, project: "Mobile App", task: "Feature Development", duration: "4:30", startTime: "10:00 AM", endTime: "2:30 PM", date: "Yesterday" },
    { id: 5, project: "Documentation", task: "API Docs", duration: "1:45", startTime: "3:00 PM", endTime: "4:45 PM", date: "Yesterday" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <DashboardHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Clock className="mr-2 h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Time Tracking</h1>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleExportData} variant="outline" size="sm" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                <Button variant="default" size="sm" className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Start Timer
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 shadow-sm card-shine enhanced-card">
                <h3 className="text-lg font-medium mb-2">Today</h3>
                <div className="text-3xl font-bold text-primary">4:25</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Hours tracked</p>
              </Card>
              
              <Card className="p-6 shadow-sm card-shine enhanced-card">
                <h3 className="text-lg font-medium mb-2">This Week</h3>
                <div className="text-3xl font-bold text-indigo-500">26:15</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Hours tracked</p>
              </Card>
              
              <Card className="p-6 shadow-sm card-shine enhanced-card">
                <h3 className="text-lg font-medium mb-2">This Month</h3>
                <div className="text-3xl font-bold text-emerald-500">112:30</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Hours tracked</p>
              </Card>
            </div>
            
            <Card className="shadow-sm overflow-hidden mb-8 card-shine enhanced-card p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">Time Overview</h2>
                <div className="flex space-x-1">
                  <button className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Daily</button>
                  <button className="text-xs px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Weekly</button>
                  <button className="text-xs px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Monthly</button>
                </div>
              </div>
              <TimeTrackingChart data={timeTrackingData} />
            </Card>
            
            <Card className="shadow-sm card-shine enhanced-card">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">Recent Time Entries</h2>
                <Button variant="ghost" size="sm" className="text-primary">View All</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                      <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Project</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Task</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Duration</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Time</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {timeEntries.map((entry) => (
                      <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-4 py-3 text-sm">{entry.project}</td>
                        <td className="px-4 py-3 text-sm">{entry.task}</td>
                        <td className="px-4 py-3 text-sm font-medium">{entry.duration}</td>
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{entry.startTime} - {entry.endTime}</td>
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{entry.date}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex space-x-2">
                            <button className="text-gray-400 hover:text-primary">Edit</button>
                            <button className="text-gray-400 hover:text-red-500">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default TimeTracking;
