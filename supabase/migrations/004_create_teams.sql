-- Create teams table
-- This table stores team listings for hackathons, events, and projects

CREATE TABLE IF NOT EXISTS public.teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  team_name TEXT NOT NULL,
  description TEXT NOT NULL,
  event_name TEXT NOT NULL,
  current_members INTEGER NOT NULL DEFAULT 1,
  max_members INTEGER NOT NULL,
  required_skills TEXT[] NOT NULL,
  roles_needed TEXT[] NOT NULL,
  application_deadline TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create updated_at trigger for teams
CREATE TRIGGER teams_updated_at
  BEFORE UPDATE ON public.teams
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row Level Security
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can view all teams
CREATE POLICY "Teams are viewable by everyone"
  ON public.teams FOR SELECT
  USING (true);

-- Users can insert their own teams
CREATE POLICY "Users can insert their own teams"
  ON public.teams FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own teams
CREATE POLICY "Users can update their own teams"
  ON public.teams FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own teams
CREATE POLICY "Users can delete their own teams"
  ON public.teams FOR DELETE
  USING (auth.uid() = user_id);
