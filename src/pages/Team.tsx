
import React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Search, Filter, MoreHorizontal, Mail, Phone, Clock, Calendar, Briefcase, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const Team = () => {
  const { theme } = useTheme();
  const { toast } = useToast();

  const handleInviteTeamMember = () => {
    toast({
      title: "Invite Team Member",
      description: "Invitation form would open here",
    });
  };

  // Mock team members data
  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Frontend Developer",
      email: "alex.johnson@example.com",
      phone: "+1 234 567 890",
      avatar: "https://i.pravatar.cc/150?img=1",
      status: "Available",
      workload: 85,
      tasksCompleted: 24,
      lastActive: "10 minutes ago",
      skills: ["React", "TypeScript", "CSS", "UI/UX"]
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Backend Developer",
      email: "sarah.chen@example.com",
      phone: "+1 345 678 901",
      avatar: "https://i.pravatar.cc/150?img=5",
      status: "In a meeting",
      workload: 65,
      tasksCompleted: 18,
      lastActive: "1 hour ago",
      skills: ["Node.js", "Python", "SQL", "API Design"]
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "UI/UX Designer",
      email: "michael.brown@example.com",
      phone: "+1 456 789 012",
      avatar: "https://i.pravatar.cc/150?img=3",
      status: "Away",
      workload: 40,
      tasksCompleted: 12,
      lastActive: "3 hours ago",
      skills: ["Figma", "Adobe XD", "Sketch", "Wireframing"]
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Project Manager",
      email: "emily.davis@example.com",
      phone: "+1 567 890 123",
      avatar: "https://i.pravatar.cc/150?img=4",
      status: "Busy",
      workload: 90,
      tasksCompleted: 32,
      lastActive: "5 minutes ago",
      skills: ["Agile", "Scrum", "JIRA", "Resource Planning"]
    },
    {
      id: 5,
      name: "John Smith",
      role: "QA Engineer",
      email: "john.smith@example.com",
      phone: "+1 678 901 234",
      avatar: "https://i.pravatar.cc/150?img=8",
      status: "Available",
      workload: 70,
      tasksCompleted: 15,
      lastActive: "20 minutes ago",
      skills: ["Automated Testing", "Cypress", "Jest", "QA Processes"]
    },
    {
      id: 6,
      name: "Lisa Wong",
      role: "DevOps Engineer",
      email: "lisa.wong@example.com",
      phone: "+1 789 012 345",
      avatar: "https://i.pravatar.cc/150?img=6",
      status: "Away",
      workload: 60,
      tasksCompleted: 9,
      lastActive: "2 hours ago",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD"]
    },
  ];

  // Function to get the status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-500 hover:bg-green-600";
      case "In a meeting":
        return "bg-blue-500 hover:bg-blue-600";
      case "Away":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Busy":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  // Function to get workload color
  const getWorkloadColor = (workload) => {
    if (workload > 80) return "text-red-500";
    if (workload > 60) return "text-yellow-500";
    return "text-green-500";
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
                <Users className="mr-2 h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Team</h1>
              </div>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search team members..."
                    className="pl-10 pr-4 py-2 text-sm border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white dark:bg-gray-800"
                  />
                </div>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button onClick={handleInviteTeamMember} variant="default" size="sm" className="flex items-center">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite Member
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 shadow-sm card-shine enhanced-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700 dark:text-gray-200">Team Size</h3>
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl font-bold">6</div>
                <p className="text-sm text-gray-500 mt-1">Active members</p>
              </Card>
              
              <Card className="p-6 shadow-sm card-shine enhanced-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700 dark:text-gray-200">Tasks Completed</h3>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-3xl font-bold">110</div>
                <p className="text-sm text-gray-500 mt-1">This month</p>
              </Card>
              
              <Card className="p-6 shadow-sm card-shine enhanced-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700 dark:text-gray-200">Average Workload</h3>
                  <Briefcase className="h-5 w-5 text-amber-500" />
                </div>
                <div className="text-3xl font-bold">68%</div>
                <p className="text-sm text-gray-500 mt-1">Across all members</p>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <Card key={member.id} className="overflow-hidden shadow-sm card-shine enhanced-card hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-gray-500">{member.role}</p>
                          <Badge className={`mt-2 ${getStatusColor(member.status)}`}>{member.status}</Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">{member.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">{member.phone}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">Last active: {member.lastActive}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Workload</span>
                        <span className={`text-sm font-medium ${getWorkloadColor(member.workload)}`}>{member.workload}%</span>
                      </div>
                      <Progress value={member.workload} className="h-2" />
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-primary/5">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t">
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          Schedule
                        </Button>
                        <Button variant="default" size="sm" className="flex items-center">
                          <Briefcase className="mr-1 h-4 w-4" />
                          View Tasks
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Team;
