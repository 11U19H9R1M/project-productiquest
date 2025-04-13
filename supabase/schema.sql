
-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  is_on_trial BOOLEAN DEFAULT true,
  trial_ends_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '14 days'),
  team_id TEXT,
  team_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create RLS policies for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT 'bg-blue-500',
  visibility TEXT DEFAULT 'private',
  start_date TIMESTAMPTZ DEFAULT NOW(),
  end_date TIMESTAMPTZ,
  owner_id UUID REFERENCES auth.users NOT NULL,
  team_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create RLS policies for projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own projects"
  ON projects FOR SELECT
  USING (auth.uid() = owner_id OR visibility = 'public' OR 
        (visibility = 'team' AND team_id IN (
          SELECT team_id FROM profiles WHERE id = auth.uid()
        )));

CREATE POLICY "Users can insert their own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own projects"
  ON projects FOR DELETE
  USING (auth.uid() = owner_id);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo',
  priority TEXT DEFAULT 'medium',
  due_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  project_id UUID REFERENCES projects,
  assignee_id UUID REFERENCES auth.users,
  created_by UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create RLS policies for tasks
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view tasks they created or are assigned to"
  ON tasks FOR SELECT
  USING (
    auth.uid() = created_by OR 
    auth.uid() = assignee_id OR
    project_id IN (
      SELECT id FROM projects
      WHERE owner_id = auth.uid() OR
            visibility = 'public' OR
            (visibility = 'team' AND team_id IN (
              SELECT team_id FROM profiles WHERE id = auth.uid()
            ))
    )
  );

CREATE POLICY "Users can insert tasks"
  ON tasks FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update tasks they created or are assigned to"
  ON tasks FOR UPDATE
  USING (auth.uid() = created_by OR auth.uid() = assignee_id);

CREATE POLICY "Users can delete tasks they created"
  ON tasks FOR DELETE
  USING (auth.uid() = created_by);

-- Create time_entries table
CREATE TABLE IF NOT EXISTS time_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  duration INTEGER, -- in seconds
  task_id UUID REFERENCES tasks,
  project_id UUID REFERENCES projects,
  user_id UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create RLS policies for time_entries
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own time entries"
  ON time_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own time entries"
  ON time_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own time entries"
  ON time_entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own time entries"
  ON time_entries FOR DELETE
  USING (auth.uid() = user_id);

-- Create functions

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    new.id,
    new.email,
    split_part(new.email, '@', 1)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to auto-update 'updated_at' columns
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for auto-updating 'updated_at'
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_time_entries_updated_at
  BEFORE UPDATE ON time_entries
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
