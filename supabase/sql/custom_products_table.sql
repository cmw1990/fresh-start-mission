
-- Create custom_products table for user-defined product types
CREATE TABLE IF NOT EXISTS public.custom_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS policies for custom_products
ALTER TABLE public.custom_products ENABLE ROW LEVEL SECURITY;

-- Users can read their own custom products
CREATE POLICY "Users can read own custom products"
  ON public.custom_products
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own custom products
CREATE POLICY "Users can insert own custom products"
  ON public.custom_products
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own custom products
CREATE POLICY "Users can update own custom products"
  ON public.custom_products
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own custom products
CREATE POLICY "Users can delete own custom products"
  ON public.custom_products
  FOR DELETE
  USING (auth.uid() = user_id);

-- Add updated_at trigger for custom_products
CREATE TRIGGER set_timestamp_custom_products
BEFORE UPDATE ON public.custom_products
FOR EACH ROW
EXECUTE PROCEDURE public.update_timestamp();

-- Automatically set user_id to the authenticated user on insert
CREATE OR REPLACE FUNCTION public.set_auth_user_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id := auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER set_custom_products_user_id
BEFORE INSERT ON public.custom_products
FOR EACH ROW
EXECUTE PROCEDURE public.set_auth_user_id();
