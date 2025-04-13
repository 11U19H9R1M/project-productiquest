
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  progress: number;
  hoursLogged: number;
  dueDate: string;
}

interface ProjectsOverviewProps {
  projects: Project[];
}

const ProjectsOverview = ({ projects }: ProjectsOverviewProps) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Active Projects</h3>
        <Button variant="ghost" size="sm" className="text-xs">
          View all projects
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <th className="px-4 py-2">Project</th>
              <th className="px-4 py-2">Progress</th>
              <th className="px-4 py-2">Time Logged</th>
              <th className="px-4 py-2">Due Date</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {project.name}
                </td>
                <td className="px-4 py-3">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 inline-block">
                    {project.progress}% Complete
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                    <span>{project.hoursLogged} hours</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                    <span>{formatDate(project.dueDate)}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm">
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsOverview;
