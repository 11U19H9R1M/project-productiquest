
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Calendar as CalendarIcon,
  Plus,
  Users,
  Tag,
  Check,
  Loader2
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { projectService, ProjectCreateInput } from '@/services/ProjectService';
import { useNavigate } from 'react-router-dom';

const colorOptions = [
  { name: 'Gray', value: 'bg-gray-500' },
  { name: 'Red', value: 'bg-red-500' },
  { name: 'Orange', value: 'bg-orange-500' },
  { name: 'Green', value: 'bg-green-500' },
  { name: 'Blue', value: 'bg-blue-500' },
  { name: 'Purple', value: 'bg-purple-500' },
  { name: 'Pink', value: 'bg-pink-500' },
];

const projectVisibility = [
  { name: 'Private', value: 'private', description: 'Only visible to you and invited team members' },
  { name: 'Team', value: 'team', description: 'Visible to everyone in your organization' },
  { name: 'Public', value: 'public', description: 'Visible to anyone with the link' },
];

const ProjectManagement = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [selectedColor, setSelectedColor] = useState('bg-blue-500');
  const [selectedVisibility, setSelectedVisibility] = useState('private');
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const resetForm = () => {
    setProjectName('');
    setProjectDescription('');
    setStartDate(new Date());
    setEndDate(undefined);
    setSelectedColor('bg-blue-500');
    setSelectedVisibility('private');
  };
  
  const handleSubmit = async () => {
    if (!projectName.trim()) {
      toast({
        title: "Project name required",
        description: "Please enter a name for your project",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newProject: ProjectCreateInput = {
        name: projectName,
        description: projectDescription,
        color: selectedColor,
        visibility: selectedVisibility as 'private' | 'team' | 'public',
        start_date: startDate?.toISOString(),
        end_date: endDate?.toISOString(),
      };
      
      const createdProject = await projectService.createProject(newProject);
      
      toast({
        title: "Project created",
        description: `"${projectName}" has been created successfully.`,
      });
      
      // Reset form and close dialog
      resetForm();
      setIsOpen(false);
      
      // Navigate to the new project
      setTimeout(() => {
        navigate(`/projects?id=${createdProject.id}`);
      }, 500);
    } catch (error: any) {
      toast({
        title: "Error creating project",
        description: error.message || "There was an error creating your project",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetForm();
      }}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Project
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Create a new project</DialogTitle>
            <DialogDescription>
              Add the details for your new project. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Enter project description"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid gap-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Project Color</Label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    className={cn(
                      "w-8 h-8 rounded-full transition-all",
                      color.value,
                      selectedColor === color.value ? "ring-2 ring-offset-2 ring-primary" : ""
                    )}
                    title={color.name}
                    onClick={() => setSelectedColor(color.value)}
                  >
                    {selectedColor === color.value && (
                      <Check className="h-4 w-4 mx-auto text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Project Visibility</Label>
              <div className="grid gap-2">
                {projectVisibility.map((option) => (
                  <div
                    key={option.value}
                    className={cn(
                      "flex items-center p-3 rounded-md border cursor-pointer",
                      selectedVisibility === option.value
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    )}
                    onClick={() => setSelectedVisibility(option.value)}
                  >
                    <div className="flex-1">
                      <div className="font-medium">{option.name}</div>
                      <div className="text-sm text-muted-foreground">{option.description}</div>
                    </div>
                    {selectedVisibility === option.value && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Assign Team Members</Label>
              <Button variant="outline" className="justify-start" disabled>
                <Users className="mr-2 h-4 w-4" />
                <span>Team assignment coming soon</span>
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Project'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectManagement;
