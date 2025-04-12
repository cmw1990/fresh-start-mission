
-- Create user_preferences table for customizable dashboard widgets and notification settings
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  dashboard_widgets TEXT[] DEFAULT ARRAY['keyStats', 'wellness', 'milestone', 'quote', 'supportTools']::TEXT[],
  notification_cravings BOOLEAN DEFAULT TRUE,
  notification_logs BOOLEAN DEFAULT TRUE,
  notification_milestones BOOLEAN DEFAULT TRUE,
  theme TEXT DEFAULT 'light',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Add RLS policies
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Users can only read their own preferences
CREATE POLICY "Users can read own preferences"
  ON public.user_preferences
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert their own preferences
CREATE POLICY "Users can insert own preferences"
  ON public.user_preferences
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own preferences
CREATE POLICY "Users can update own preferences"
  ON public.user_preferences
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create quotes table for motivational quotes
CREATE TABLE IF NOT EXISTS public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT DEFAULT 'motivation',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Allow public read access to quotes (no auth needed)
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read quotes"
  ON public.quotes
  FOR SELECT
  TO PUBLIC 
  USING (true);

-- Insert some initial quotes
INSERT INTO public.quotes (text, author, category)
VALUES
  ('The secret of getting ahead is getting started.', 'Mark Twain', 'motivation'),
  ('Every accomplishment starts with the decision to try.', 'Gail Devers', 'motivation'),
  ('It does not matter how slowly you go as long as you do not stop.', 'Confucius', 'motivation'),
  ('The only person you are destined to become is the person you decide to be.', 'Ralph Waldo Emerson', 'motivation'),
  ('Success is not final, failure is not fatal: It is the courage to continue that counts.', 'Winston Churchill', 'motivation'),
  ('The best time to plant a tree was 20 years ago. The second best time is now.', 'Chinese Proverb', 'motivation'),
  ('Your body is a reflection of your lifestyle.', 'Unknown', 'health'),
  ('Take care of your body. It's the only place you have to live.', 'Jim Rohn', 'health'),
  ('You don't have to be great to start, but you have to start to be great.', 'Zig Ziglar', 'motivation'),
  ('Small changes can make big differences.', 'Unknown', 'health'),
  ('You are never too old to set another goal or to dream a new dream.', 'C.S. Lewis', 'motivation'),
  ('Every day is a new beginning.', 'Unknown', 'motivation'),
  ('The mind is everything. What you think you become.', 'Buddha', 'mindfulness'),
  ('Believe you can and you're halfway there.', 'Theodore Roosevelt', 'motivation'),
  ('Progress, not perfection.', 'Unknown', 'motivation');

-- Add updated_at trigger for user_preferences
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.user_preferences
FOR EACH ROW
EXECUTE PROCEDURE public.update_timestamp();
