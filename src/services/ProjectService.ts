
import { supabase } from '@/lib/supabase';

export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  visibility: 'private' | 'team' | 'public';
  start_date: string;
  end_date?: string;
  owner_id: string;
  team_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectCreateInput {
  name: string;
  description?: string;
  color?: string;
  visibility?: 'private' | 'team' | 'public';
  start_date?: string;
  end_date?: string;
  team_id?: string;
}

export interface ProjectUpdateInput extends Partial<ProjectCreateInput> {}

class ProjectService {
  async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data as Project[];
  }
  
  async getProjectById(id: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data as Project;
  }
  
  async getRecentProjects(limit: number = 3) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    return data as Project[];
  }
  
  async createProject(project: ProjectCreateInput) {
    const { data: userData } = await supabase.auth.getUser();
    
    if (!userData?.user) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          ...project,
          owner_id: userData.user.id
        }
      ])
      .select()
      .single();
      
    if (error) throw error;
    return data as Project;
  }
  
  async updateProject(id: string, updates: ProjectUpdateInput) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data as Project;
  }
  
  async deleteProject(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return true;
  }
}

export const projectService = new ProjectService();
