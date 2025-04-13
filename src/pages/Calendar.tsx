
import React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Plus, Video, Users, Filter } from 'lucide-react';

const Calendar = () => {
  const { theme } = useTheme();
  const { toast } = useToast();

  const handleAddEvent = () => {
    toast({
      title: "Add Event",
      description: "Event creation form would open here",
    });
  };

  // Mock upcoming events
  const upcomingEvents = [
    { id: 1, title: "Team Standup", time: "9:00 AM - 9:30 AM", date: "Today", attendees: 5, type: "meeting" },
    { id: 2, title: "Client Presentation", time: "11:00 AM - 12:00 PM", date: "Today", attendees: 3, type: "presentation" },
    { id: 3, title: "Project Planning", time: "2:00 PM - 3:30 PM", date: "Today", attendees: 4, type: "planning" },
    { id: 4, title: "Design Review", time: "10:00 AM - 11:00 AM", date: "Tomorrow", attendees: 3, type: "review" },
    { id: 5, title: "Sprint Retrospective", time: "4:00 PM - 5:00 PM", date: "Tomorrow", attendees: 6, type: "meeting" },
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
                <CalendarIcon className="mr-2 h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Calendar</h1>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button onClick={handleAddEvent} variant="default" size="sm" className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <Card className="shadow-sm overflow-hidden card-shine enhanced-card p-4 h-[600px]">
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <CalendarIcon className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600" />
                      <h3 className="mt-4 text-lg font-medium">Calendar View</h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        This would integrate with a full-featured calendar library like FullCalendar.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="lg:col-span-1">
                <Card className="shadow-sm card-shine enhanced-card">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">Upcoming Events</h2>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{event.time}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{event.date}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            {event.type === "meeting" && (
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Video className="h-4 w-4 text-primary" />
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <div className="flex items-center">
                                <Users className="h-4 w-4" />
                                <span className="text-xs ml-1">{event.attendees}</span>
                              </div>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t">
                    <Button variant="ghost" size="sm" className="w-full text-primary">View All Events</Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Calendar;
