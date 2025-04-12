
-- Make sure we have the step_rewards table with the correct schema
CREATE TABLE IF NOT EXISTS public.step_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  date DATE NOT NULL,
  steps INTEGER NOT NULL,
  points_earned INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Make sure we have the claimed_rewards table with the correct schema
CREATE TABLE IF NOT EXISTS public.claimed_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  points_redeemed INTEGER NOT NULL,
  claimed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reward_id UUID REFERENCES public.rewards
);

-- Add permissions for step_rewards and claimed_rewards tables
ALTER TABLE IF EXISTS public.step_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.claimed_rewards ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for step_rewards
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'step_rewards' AND policyname = 'Enable read access for users'
  ) THEN
    CREATE POLICY "Enable read access for users" ON public.step_rewards
      FOR SELECT USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'step_rewards' AND policyname = 'Enable insert access for users'
  ) THEN
    CREATE POLICY "Enable insert access for users" ON public.step_rewards
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'step_rewards' AND policyname = 'Enable update access for users'
  ) THEN
    CREATE POLICY "Enable update access for users" ON public.step_rewards
      FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END
$$;

-- Add RLS policies for claimed_rewards
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'claimed_rewards' AND policyname = 'Enable read access for users'
  ) THEN
    CREATE POLICY "Enable read access for users" ON public.claimed_rewards
      FOR SELECT USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'claimed_rewards' AND policyname = 'Enable insert access for users'
  ) THEN
    CREATE POLICY "Enable insert access for users" ON public.claimed_rewards
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
END
$$;
