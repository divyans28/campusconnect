-- Create lost_found_items table
-- This table stores lost and found items reported by students

CREATE TABLE IF NOT EXISTS public.lost_found_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('lost', 'found')),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  date TEXT NOT NULL,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'resolved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create updated_at trigger for lost_found_items
CREATE TRIGGER lost_found_items_updated_at
  BEFORE UPDATE ON public.lost_found_items
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row Level Security
ALTER TABLE public.lost_found_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can view all lost_found_items
CREATE POLICY "Lost found items are viewable by everyone"
  ON public.lost_found_items FOR SELECT
  USING (true);

-- Users can insert their own lost_found_items
CREATE POLICY "Users can insert their own lost_found_items"
  ON public.lost_found_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own lost_found_items
CREATE POLICY "Users can update their own lost_found_items"
  ON public.lost_found_items FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own lost_found_items
CREATE POLICY "Users can delete their own lost_found_items"
  ON public.lost_found_items FOR DELETE
  USING (auth.uid() = user_id);
