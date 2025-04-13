
import React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListChecks, Plus, Search, Filter, CheckCircle2, Clock, AlertCircle, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Tasks = () => {
  const { theme } = useTheme();
  const { toast } = useToast();

  const handleCreateTask = () => {
    toast({
      title: "Create Task",
      description: "Task creation form would open here",
    });
  };

  // Mock tasks data with priorities and statuses
  const tasks = [
    {
      id: 1,
      title: "Design new dashboard UI",
      description: "Create wireframes and mockups for the admin dashboard interface.",
      project: "Website Redesign",
      assignee: "Alex Johnson",
      dueDate: "Oct 5, 2023",
      priority: "High",
      status: "In Progress",
      comments: 5,
      attachments: 2
    },
    {
      id: 2,
      title: "Implement user authentication",
      description: "Add JWT-based authentication system with social login options.",
      project: "Mobile App",
      assignee: "Sarah Chen",
      dueDate: "Oct 10, 2023",
      priority: "Critical",
      status: "To Do",
      comments: 3,
      attachments: 1
    },
    {
      id: 3,
      title: "Fix navigation bug on mobile",
      description: "Address issue with hamburger menu not opening on certain devices.",
      project: "Website Redesign",
      assignee: "Michael Brown",
      dueDate: "Sep 30, 2023",
      priority: "Medium",
      status: "In Progress",
      comments: 8,
      attachments: 0
    },
    {
      id: 4,
      title: "Write API documentation",
      description: "Create comprehensive documentation for all REST endpoints.",
      project: "Backend API",
      assignee: "Emily Davis",
      dueDate: "Oct 15, 2023",
      priority: "Low",
      status: "To Do",
      comments: 2,
      attachments: 3
    },
    {
      id: 5,
      title: "Create end-to-end tests",
      description: "Implement Cypress tests for critical user flows.",
      project: "Quality Assurance",
      assignee: "John Smith",
      dueDate: "Oct 12, 2023",
      priority: "Medium",
      status: "In Progress",
      comments: 0,
      attachments: 1
    },
    {
      id: 6,
      title: "Deploy beta version to staging",
      description: "Push latest changes to staging environment for testing.",
      project: "DevOps",
      assignee: "Alex Johnson",
      dueDate: "Sep 28, 2023",
      priority: "High",
      status: "Completed",
      comments: 4,
      attachments: 0
    },
  ];

  // Get priority badge color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-500 hover:bg-red-600";
      case "High":
        return "bg-orange-500 hover:bg-orange-600";
      case "Medium":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Low":
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "To Do":
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

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
                <ListChecks className="mr-2 h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Tasks</h1>
              </div>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    className="pl-10 pr-4 py-2 text-sm border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white dark:bg-gray-800"
                  />
                </div>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button onClick={handleCreateTask} variant="default" size="sm" className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  New Task
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 shadow-sm card-shine enhanced-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700 dark:text-gray-200">To Do</h3>
                  <Badge className="bg-blue-500 hover:bg-blue-600">2</Badge>
                </div>
                <div className="text-3xl font-bold">2</div>
                <p className="text-sm text-gray-500 mt-1">Tasks waiting to be started</p>
              </Card>
              
              <Card className="p-6 shadow-sm card-shine enhanced-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700 dark:text-gray-200">In Progress</h3>
                  <Badge className="bg-amber-500 hover:bg-amber-600">3</Badge>
                </div>
                <div className="text-3xl font-bold">3</div>
                <p className="text-sm text-gray-500 mt-1">Tasks currently being worked on</p>
              </Card>
              
              <Card className="p-6 shadow-sm card-shine enhanced-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700 dark:text-gray-200">Completed</h3>
                  <Badge className="bg-green-500 hover:bg-green-600">1</Badge>
                </div>
                <div className="text-3xl font-bold">1</div>
                <p className="text-sm text-gray-500 mt-1">Tasks finished this week</p>
              </Card>
            </div>
            
            <Card className="shadow-sm overflow-hidden card-shine enhanced-card">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">All Tasks</h2>
                <div className="flex">
                  <Button variant="ghost" size="sm" className="text-primary">
                    View as Board
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Task</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assignee</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {tasks.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium">{task.title}</span>
                            <span className="text-xs text-gray-500 mt-1">{task.description}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">{task.project}</td>
                        <td className="px-6 py-4 text-sm">{task.assignee}</td>
                        <td className="px-6 py-4 text-sm">{task.dueDate}</td>
                        <td className="px-6 py-4">
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {getStatusIcon(task.status)}
                            <span className="ml-2 text-sm">{task.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
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

export default Tasks;
