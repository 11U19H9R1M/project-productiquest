
import { supabase } from '@/lib/supabase';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  completed_at?: string;
  project_id?: string;
  assignee_id?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface TaskCreateInput {
  title: string;
  description?: string;
  status?: 'todo' | 'in_progress' | 'review' | 'done';
  priority?: 'low' | 'medium' | 'high';
  due_date?: string;
  project_id?: string;
  assignee_id?: string;
}

export interface TaskUpdateInput extends Partial<TaskCreateInput> {
  completed_at?: string | null;
}

class TaskService {
  async getTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*, projects(name, color)')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data as (Task & { projects: { name: string; color: string } })[];
  }
  
  async getTaskById(id: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*, projects(name, color)')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data as (Task & { projects: { name: string; color: string } });
  }
  
  async getTasksByProject(projectId: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data as Task[];
  }
  
  async createTask(task: TaskCreateInput) {
    const { data: userData } = await supabase.auth.getUser();
    
    if (!userData?.user) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('tasks')
      .insert([
        {
          ...task,
          created_by: userData.user.id
        }
      ])
      .select()
      .single();
      
    if (error) throw error;
    return data as Task;
  }
  
  async updateTask(id: string, updates: TaskUpdateInput) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data as Task;
  }
  
  async completeTask(id: string) {
    const { data, error } = await supabase
      .from('tasks')
      .update({ 
        status: 'done', 
        completed_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data as Task;
  }
  
  async deleteTask(id: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return true;
  }
}

export const taskService = new TaskService();
