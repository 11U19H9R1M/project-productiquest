import { supabase } from '@/lib/supabase';

export interface TimeEntry {
  id: string;
  description?: string;
  start_time: string;
  end_time?: string;
  duration?: number;
  task_id?: string;
  project_id?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface TimeEntryCreateInput {
  description?: string;
  start_time: string;
  end_time?: string;
  duration?: number;
  task_id?: string;
  project_id?: string;
}

export interface TimeEntryUpdateInput extends Partial<TimeEntryCreateInput> {}

class TimeTrackingService {
  async getTimeEntries() {
    const { data, error } = await supabase
      .from('time_entries')
      .select('*, projects(name, color)')
      .order('start_time', { ascending: false });
      
    if (error) throw error;
    return data as (TimeEntry & { projects: { name: string; color: string } })[];
  }
  
  async getTimeEntryById(id: string) {
    const { data, error } = await supabase
      .from('time_entries')
      .select('*, projects(name, color)')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data as (TimeEntry & { projects: { name: string; color: string } });
  }
  
  async getTimeEntriesByProject(projectId: string) {
    const { data, error } = await supabase
      .from('time_entries')
      .select('*')
      .eq('project_id', projectId)
      .order('start_time', { ascending: false });
      
    if (error) throw error;
    return data as TimeEntry[];
  }
  
  async createTimeEntry(entry: TimeEntryCreateInput) {
    const { data: userData } = await supabase.auth.getUser();
    
    if (!userData?.user) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('time_entries')
      .insert([
        {
          ...entry,
          user_id: userData.user.id
        }
      ])
      .select()
      .single();
      
    if (error) throw error;
    return data as TimeEntry;
  }
  
  async updateTimeEntry(id: string, updates: TimeEntryUpdateInput) {
    const { data, error } = await supabase
      .from('time_entries')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data as TimeEntry;
  }
  
  async stopTimeEntry(id: string) {
    const now = new Date();
    const entryData = await this.getTimeEntryById(id);
    
    if (!entryData) {
      throw new Error('Time entry not found');
    }
    
    const startTime = new Date(entryData.start_time);
    const duration = Math.floor((now.getTime() - startTime.getTime()) / 1000); // in seconds
    
    const { data, error } = await supabase
      .from('time_entries')
      .update({ 
        end_time: now.toISOString(),
        duration: duration
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data as TimeEntry;
  }
  
  async deleteTimeEntry(id: string) {
    const { error } = await supabase
      .from('time_entries')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return true;
  }
  
  async getRecentTimeEntries(limit: number = 5) {
    const { data, error } = await supabase
      .from('time_entries')
      .select('*, projects(name, color)')
      .order('start_time', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    return data as (TimeEntry & { projects: { name: string; color: string } })[];
  }
  
  async getTimeEntriesForDay(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    const { data, error } = await supabase
      .from('time_entries')
      .select('*, projects(name, color)')
      .gte('start_time', startOfDay.toISOString())
      .lte('start_time', endOfDay.toISOString())
      .order('start_time', { ascending: true });
      
    if (error) throw error;
    return data as (TimeEntry & { projects: { name: string; color: string } })[];
  }
  
  async getTimeStats(days: number = 7) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const { data, error } = await supabase
      .from('time_entries')
      .select('*')
      .gte('start_time', startDate.toISOString())
      .lte('start_time', endDate.toISOString());
      
    if (error) throw error;
    
    const entries = data as TimeEntry[];
    
    const dailyTotals: Record<string, number> = {};
    const projectTotals: Record<string, number> = {};
    
    for (const entry of entries) {
      const day = entry.start_time.split('T')[0];
      const duration = entry.duration || 0;
      
      // Add to daily totals
      if (!dailyTotals[day]) {
        dailyTotals[day] = 0;
      }
      dailyTotals[day] += duration;
      
      // Add to project totals
      if (entry.project_id) {
        if (!projectTotals[entry.project_id]) {
          projectTotals[entry.project_id] = 0;
        }
        projectTotals[entry.project_id] += duration;
      }
    }
    
    return {
      dailyTotals,
      projectTotals,
      totalTime: entries.reduce((sum, entry) => sum + (entry.duration || 0), 0)
    };
  }
}

export const timeTrackingService = new TimeTrackingService();
