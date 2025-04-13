
import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Calendar, 
  Users, 
  Clock,
  CheckCircle,
  AlertCircle,
  CircleSlash
} from 'lucide-react';
import ProjectManagement from '@/components/dashboard/ProjectManagement';
import { motion } from 'framer-motion';

// Sample project data - in a real app this would come from an API
const sampleProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of company website with new branding",
    startDate: "2023-05-15",
    endDate: "2023-07-30",
    progress: 75,
    status: "in-progress",
    team: ["John D.", "Emma S.", "Michael T."],
    color: "bg-blue-500"
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Native mobile app for iOS and Android platforms",
    startDate: "2023-06-01",
    endDate: "2023-09-15",
    progress: 45,
    status: "in-progress",
    team: ["Sarah L.", "David R.", "Anna K."],
    color: "bg-purple-500"
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Q3 digital marketing campaign for product launch",
    startDate: "2023-07-01",
    endDate: "2023-08-31",
    progress: 90,
    status: "in-progress",
    team: ["Robert J.", "Lisa M."],
    color: "bg-green-500"
  },
  {
    id: 4,
    name: "Data Migration",
    description: "Migrate customer data to new CRM system",
    startDate: "2023-04-10",
    endDate: "2023-05-20",
    progress: 100,
    status: "completed",
    team: ["Chris P.", "Sandra B.", "Thomas W."],
    color: "bg-orange-500"
  },
  {
    id: 5,
    name: "Product Research",
    description: "Market research for upcoming product features",
    startDate: "2023-06-15",
    endDate: "2023-07-15",
    progress: 100,
    status: "completed",
    team: ["Jessica H.", "Mark R."],
    color: "bg-red-500"
  },
  {
    id: 6,
    name: "Security Audit",
    description: "Annual security audit and compliance check",
    startDate: "2023-08-01",
    endDate: "2023-08-15",
    progress: 0,
    status: "not-started",
    team: ["Eric S.", "Rebecca T."],
    color: "bg-gray-500"
  }
];

const getStatusIcon = (status: string) => {
  switch(status) {
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'in-progress':
      return <Clock className="h-5 w-5 text-amber-500" />;
    case 'at-risk':
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case 'not-started':
      return <CircleSlash className="h-5 w-5 text-gray-500" />;
    default:
      return <Clock className="h-5 w-5 text-amber-500" />;
  }
};

const getStatusText = (status: string) => {
  switch(status) {
    case 'completed':
      return 'Completed';
    case 'in-progress':
      return 'In Progress';
    case 'at-risk':
      return 'At Risk';
    case 'not-started':
      return 'Not Started';
    default:
      return 'In Progress';
  }
};

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(sampleProjects);
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredProjects(sampleProjects);
      return;
    }
    
    const filtered = sampleProjects.filter(project => 
      project.name.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProjects(filtered);
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Projects</h1>
              <p className="text-muted-foreground">Manage and track all your team's projects</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <ProjectManagement />
              
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" /> Filters
              </Button>
              
              <Button variant="outline" className="gap-2">
                <ArrowUpDown className="h-4 w-4" /> Sort
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
                className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-all duration-300"
              >
                <div className={`h-2 ${project.color}`}></div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-xs">
                      {getStatusIcon(project.status)}
                      <span>{getStatusText(project.status)}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member, i) => (
                        <div 
                          key={i} 
                          className="h-8 w-8 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-xs font-medium" 
                          title={member}
                        >
                          {member.split(' ')[0][0]}{member.split(' ')[1][0]}
                        </div>
                      ))}
                      {project.team.length > 3 && (
                        <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                          +{project.team.length - 3}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium">{project.progress}%</span>
                      <div className="h-2 w-24 bg-muted rounded-full mt-1">
                        <div 
                          className={`h-full rounded-full ${project.color}`} 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;
