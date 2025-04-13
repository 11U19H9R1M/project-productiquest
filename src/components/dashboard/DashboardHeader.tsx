import React, { useState, useEffect } from 'react';
import { Bell, Settings, Clock, PlayCircle, PauseCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { timeTrackingService, TimeEntry } from '@/services/TimeTrackingService';
import { projectService } from '@/services/ProjectService';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/lib/supabase';

const DashboardHeader = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const [isTracking, setIsTracking] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [currentTimeEntry, setCurrentTimeEntry] = useState<TimeEntry | null>(null);
  const [projects, setProjects] = useState<{id: string, name: string}[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Project deadline approaching", description: "Website Redesign due in 2 days", read: false },
    { id: 2, title: "New team member added", description: "Sarah Johnson joined your team", read: false },
    { id: 3, title: "Comment on task", description: "Alex left a comment on 'API Integration'", read: true },
  ]);
  const isMobile = useIsMobile();
  const [showTimerInput, setShowTimerInput] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkActiveTimer = async () => {
      try {
        const { data } = await supabase
          .from('time_entries')
          .select('*')
          .is('end_time', null)
          .eq('user_id', user?.id)
          .order('start_time', { ascending: false })
          .limit(1)
          .single();
        
        if (data) {
          setCurrentTimeEntry(data as TimeEntry);
          setCurrentTask(data.description || '');
          setSelectedProjectId(data.project_id);
          setIsTracking(true);
          
          const startTime = new Date(data.start_time).getTime();
          const now = Date.now();
          const elapsed = Math.floor((now - startTime) / 1000);
          setElapsedTime(elapsed);
          
          const id = setInterval(() => {
            setElapsedTime(prev => prev + 1);
          }, 1000);
          
          setIntervalId(id);
        }
      } catch (error) {
        console.error('Error checking active timer:', error);
      }
    };
    
    if (user?.id) {
      checkActiveTimer();
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [user?.id]);
  
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await projectService.getProjects();
        setProjects(projectsData.map(p => ({ id: p.id, name: p.name })));
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    };
    
    if (user?.id) {
      loadProjects();
    }
  }, [user?.id]);

  useEffect(() => {
    const notificationTimer = setTimeout(() => {
      setNotifications(prev => [
        { id: 4, title: "Weekly report ready", description: "Your productivity report is available", read: false },
        ...prev
      ]);
      
      toast({
        title: "New notification",
        description: "Your weekly report is ready to view",
      });
    }, 30000);
    
    return () => clearTimeout(notificationTimer);
  }, [toast]);

  const startTimer = async () => {
    if (!currentTask.trim()) {
      toast({
        title: "Task name required",
        description: "Please enter a task name before starting the timer",
        variant: "destructive",
      });
      return;
    }

    try {
      const newTimeEntry = await timeTrackingService.createTimeEntry({
        description: currentTask,
        start_time: new Date().toISOString(),
        project_id: selectedProjectId
      });
      
      setCurrentTimeEntry(newTimeEntry);
      setIsTracking(true);
      
      toast({
        title: "Timer started",
        description: `Now tracking time for "${currentTask}"`,
      });

      const id = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      
      setIntervalId(id);
      setShowTimerInput(false);
      setElapsedTime(0);
    } catch (error: any) {
      toast({
        title: "Error starting timer",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const stopTimer = async () => {
    if (!currentTimeEntry) return;
    
    try {
      await timeTrackingService.stopTimeEntry(currentTimeEntry.id);
      
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      
      setIsTracking(false);
      setCurrentTimeEntry(null);
      
      toast({
        title: "Timer stopped",
        description: `Logged ${formatTime(elapsedTime)} for "${currentTask}"`,
      });
      
      setElapsedTime(0);
      setCurrentTask('');
      setSelectedProjectId(undefined);
    } catch (error: any) {
      toast({
        title: "Error stopping timer",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast({
      title: "Notifications cleared",
      description: "All notifications marked as read",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isTracking ? (
              <>
                <Clock className="h-5 w-5 text-primary animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Currently tracking</span>
                  <span className="font-medium">
                    {currentTask} {selectedProjectId && `(${projects.find(p => p.id === selectedProjectId)?.name})`} - {formatTime(elapsedTime)}
                  </span>
                </div>
              </>
            ) : showTimerInput ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <input
                  type="text"
                  placeholder="What are you working on?"
                  value={currentTask}
                  onChange={(e) => setCurrentTask(e.target.value)}
                  className="border-gray-300 dark:border-gray-600 rounded-md text-sm p-2 w-full sm:w-60 dark:bg-gray-700 dark:text-white"
                  autoFocus
                />
                {projects.length > 0 && (
                  <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <Button size="sm" variant="ghost" onClick={() => setShowTimerInput(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowTimerInput(true)}
                className="flex items-center gap-1"
              >
                <Clock className="h-4 w-4" />
                {isMobile ? "Track" : "What are you working on?"}
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isTracking ? (
              <Button size="sm" variant="outline" onClick={stopTimer} className="flex items-center gap-1">
                <PauseCircle className="h-4 w-4" />
                Stop Timer
              </Button>
            ) : showTimerInput ? (
              <Button size="sm" onClick={startTimer} className="flex items-center gap-1">
                <PlayCircle className="h-4 w-4" />
                Start Timer
              </Button>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="sm" 
                      onClick={() => setShowTimerInput(true)} 
                      className={`${isMobile ? "w-10 h-10 rounded-full p-0" : "flex items-center gap-1"}`}
                    >
                      {isMobile ? (
                        <PlayCircle className="h-5 w-5" />
                      ) : (
                        <>
                          <PlayCircle className="h-4 w-4" />
                          Start Timer
                        </>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Start tracking your time</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon" variant="ghost" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotificationCount > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] text-white flex items-center justify-center">
                      {unreadNotificationCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-2 border-b">
                  <h4 className="font-medium">Notifications</h4>
                  {unreadNotificationCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-7">
                      Mark all as read
                    </Button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={`p-3 border-b last:border-0 flex items-start gap-2 ${
                          notification.read ? '' : 'bg-primary/5'
                        }`}
                      >
                        {notification.read ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-xs text-gray-500">{notification.description}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-2 border-t text-center">
                  <Button variant="link" size="sm" className="text-xs h-7">
                    View all notifications
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button size="icon" variant="ghost" onClick={() => navigate('/settings')}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
