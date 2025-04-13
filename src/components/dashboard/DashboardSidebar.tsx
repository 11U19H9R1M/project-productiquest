
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { projectService } from '@/services/ProjectService';
import { supabase } from '@/lib/supabase';
import { 
  LayoutDashboard, 
  Clock, 
  Calendar, 
  Briefcase, 
  ListChecks, 
  FileBarChart, 
  Users, 
  Settings, 
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from '@/components/ui/use-toast';

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [recentProjects, setRecentProjects] = useState<{ id: string, name: string, path: string }[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user, logout } = useUser();
  const { toast } = useToast();
  
  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [location.pathname, isMobile]);
  
  // Adjust collapsed state based on screen size
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);
  
  // Fetch recent projects
  useEffect(() => {
    const fetchRecentProjects = async () => {
      try {
        const projects = await projectService.getRecentProjects(3);
        setRecentProjects(
          projects.map(project => ({
            id: project.id,
            name: project.name,
            path: `/projects?id=${project.id}`
          }))
        );
      } catch (error) {
        console.error('Error fetching recent projects:', error);
        // Use fallback demo data if there's an error
        setRecentProjects([
          { id: "1", name: "Website Redesign", path: "/projects" },
          { id: "2", name: "Mobile App Development", path: "/projects" },
          { id: "3", name: "Marketing Campaign", path: "/projects" }
        ]);
      }
    };
    
    if (user?.id) {
      fetchRecentProjects();
    }
  }, [user?.id]);
  
  const navItems = [
    { 
      name: 'Dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      path: '/dashboard',
      description: 'Overview of your productivity'
    },
    { 
      name: 'Time Tracking', 
      icon: <Clock className="h-5 w-5" />, 
      path: '/time-tracking',
      description: 'Monitor your work hours'
    },
    { 
      name: 'Calendar', 
      icon: <Calendar className="h-5 w-5" />, 
      path: '/calendar',
      description: 'Manage your schedule' 
    },
    { 
      name: 'Projects', 
      icon: <Briefcase className="h-5 w-5" />, 
      path: '/projects',
      description: 'Manage your projects'
    },
    { 
      name: 'Tasks', 
      icon: <ListChecks className="h-5 w-5" />, 
      path: '/tasks',
      description: 'Track your to-dos'
    },
    { 
      name: 'Reports', 
      icon: <FileBarChart className="h-5 w-5" />, 
      path: '/reports',
      description: 'View performance analytics'
    },
    { 
      name: 'Team', 
      icon: <Users className="h-5 w-5" />, 
      path: '/team',
      description: 'Collaborate with your team'
    },
    { 
      name: 'Settings', 
      icon: <Settings className="h-5 w-5" />, 
      path: '/settings',
      description: 'Configure your account'
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "There was an error logging out. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Mobile toggle button (outside the sidebar)
  const MobileToggle = () => (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden fixed bottom-6 right-6 z-50 bg-primary text-white rounded-full shadow-lg h-14 w-14"
      onClick={() => setMobileOpen(!mobileOpen)}
    >
      {mobileOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <Menu className="h-6 w-6" />
      )}
    </Button>
  );

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "U";
    const names = user.name.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <>
      <MobileToggle />
      
      <aside 
        className={cn(
          "h-full bg-white dark:bg-gray-800 border-r dark:border-gray-700 transition-all duration-300 z-40",
          collapsed ? "w-16" : "w-72", // Increased width for better readability
          isMobile ? "fixed inset-y-0 left-0 transform" : "",
          isMobile && !mobileOpen ? "-translate-x-full" : "translate-x-0",
          isMobile && mobileOpen ? "shadow-2xl" : ""
        )}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-end p-2">
            {!isMobile && (
              <button 
                onClick={() => setCollapsed(!collapsed)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? 
                  <ChevronRight className="h-4 w-4 text-gray-500" /> : 
                  <ChevronLeft className="h-4 w-4 text-gray-500" />
                }
              </button>
            )}
          </div>
          
          <nav className="flex-1 py-4 overflow-y-auto">
            <div className="px-4 py-2 mb-2">
              <h2 className={cn(
                "text-xs uppercase font-semibold text-gray-500 dark:text-gray-400",
                collapsed && !mobileOpen ? "text-center" : "px-2"
              )}>
                {collapsed && !mobileOpen ? "Menu" : "Navigation"}
              </h2>
            </div>
            <ul className="space-y-3 px-2"> {/* Increased spacing between nav items */}
              {navItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigate(item.path)}
                    className={cn(
                      "w-full flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                      location.pathname === item.path 
                        ? "bg-primary/10 text-primary dark:bg-primary/20" 
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    <span className="inline-flex items-center justify-center">
                      {item.icon}
                    </span>
                    {(!collapsed || (isMobile && mobileOpen)) && (
                      <div className="ml-3 flex flex-col items-start">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                          {item.description}
                        </span>
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Recent Projects Section */}
            {(!collapsed || (isMobile && mobileOpen)) && (
              <div className="mt-6 px-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 px-2">
                    Recent Projects
                  </h3>
                  <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => navigate('/projects')}>
                    View all
                  </Button>
                </div>
                <ul className="space-y-2 px-2">
                  {recentProjects.length > 0 ? (
                    recentProjects.map((project, index) => (
                      <li key={project.id} className="w-full">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full justify-start text-muted-foreground h-8 px-2"
                          onClick={() => navigate(project.path)}
                        >
                          {project.name}
                        </Button>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-muted-foreground px-2">
                      No recent projects
                    </li>
                  )}
                </ul>
              </div>
            )}
          </nav>
          
          <div className="p-4 border-t dark:border-gray-700">
            <div className={cn(
              "flex items-center",
              collapsed && !mobileOpen ? "justify-center" : "justify-between"
            )}>
              <div className={cn(
                "flex items-center",
                collapsed && !mobileOpen ? "" : "space-x-3"
              )}>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.avatar || ''} alt={user?.name || 'User'} />
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                {(!collapsed || (isMobile && mobileOpen)) && (
                  <div className="overflow-hidden">
                    <div className="text-sm font-medium truncate">{user?.name || 'User'}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email || ''}</div>
                  </div>
                )}
              </div>
              
              {(!collapsed || (isMobile && mobileOpen)) && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleLogout}
                  className="h-9 w-9 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </aside>
      
      {/* Overlay for mobile sidebar */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30" 
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardSidebar;
