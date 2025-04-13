
import React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileBarChart, Download, Calendar, BarChart2, LineChart, PieChart, Users, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const Reports = () => {
  const { theme } = useTheme();
  const { toast } = useToast();

  const handleExportReport = () => {
    toast({
      title: "Export Report",
      description: "Report export started",
    });
  };

  // Mock data for charts
  const productivityData = [
    { name: 'Mon', productivity: 65 },
    { name: 'Tue', productivity: 75 },
    { name: 'Wed', productivity: 85 },
    { name: 'Thu', productivity: 70 },
    { name: 'Fri', productivity: 80 },
    { name: 'Sat', productivity: 45 },
    { name: 'Sun', productivity: 30 },
  ];

  const projectTimeData = [
    { name: 'Website Redesign', value: 35 },
    { name: 'Mobile App', value: 25 },
    { name: 'Backend API', value: 20 },
    { name: 'Marketing', value: 10 },
    { name: 'Other', value: 10 },
  ];

  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

  // Mock report types
  const reportTypes = [
    { id: 1, name: "Weekly Summary", icon: Calendar, description: "Overview of tasks and time tracked in the last 7 days" },
    { id: 2, name: "Project Analysis", icon: BarChart2, description: "Detailed breakdown of time spent on each project" },
    { id: 3, name: "Team Performance", icon: Users, description: "Individual and team productivity metrics" },
    { id: 4, name: "Time Distribution", icon: Clock, description: "Analysis of how time is spent across different activities" },
    { id: 5, name: "Custom Report", icon: FileBarChart, description: "Create a customized report with specific metrics" },
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
                <FileBarChart className="mr-2 h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Reports</h1>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleExportReport} variant="outline" size="sm" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
                <select className="text-sm border rounded-md px-3 py-1.5 bg-white dark:bg-gray-800">
                  <option>Last 7 days</option>
                  <option>Last 14 days</option>
                  <option>Last 30 days</option>
                  <option>Custom range</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="shadow-sm overflow-hidden card-shine enhanced-card p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">Productivity Insights</h2>
                  <Button variant="ghost" size="sm" className="text-primary">View Details</Button>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={productivityData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="productivity" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <Card className="shadow-sm overflow-hidden card-shine enhanced-card p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">Time Distribution by Project</h2>
                  <Button variant="ghost" size="sm" className="text-primary">View Details</Button>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={projectTimeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {projectTimeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
            
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Available Reports</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reportTypes.map((report) => (
                <Card key={report.id} className="overflow-hidden card-shine enhanced-card hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-full bg-primary/10 mr-3">
                        <report.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">{report.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{report.description}</p>
                    <Button variant="outline" size="sm" className="w-full">Generate Report</Button>
                  </div>
                </Card>
              ))}
            </div>
            
            <Card className="mt-8 shadow-sm overflow-hidden card-shine enhanced-card">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">AI-Generated Insights</h2>
              </div>
              <div className="p-6">
                <div className="flex items-start mb-6">
                  <BarChart className="h-8 w-8 text-primary mr-4 mt-1 p-1.5 bg-primary/10 rounded-full" />
                  <div>
                    <h3 className="font-medium mb-1">Productivity peaks on Wednesdays</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Your team shows 15% higher productivity on Wednesdays compared to other weekdays. 
                      Consider scheduling important meetings and complex tasks for this day.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start mb-6">
                  <LineChart className="h-8 w-8 text-emerald-500 mr-4 mt-1 p-1.5 bg-emerald-500/10 rounded-full" />
                  <div>
                    <h3 className="font-medium mb-1">Backend API project ahead of schedule</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      The Backend API project is 10% ahead of planned progress. Current velocity suggests 
                      potential early completion by 4 days.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <PieChart className="h-8 w-8 text-amber-500 mr-4 mt-1 p-1.5 bg-amber-500/10 rounded-full" />
                  <div>
                    <h3 className="font-medium mb-1">Resource allocation opportunity</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      20% of team time is spent on administrative tasks. Consider implementing automation 
                      to reduce this by half and redirect efforts to development.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Reports;
