-- Create an enum for moderation status
CREATE TYPE moderation_status AS ENUM ('pending', 'approved', 'rejected');

-- Reviews table
CREATE TABLE IF NOT EXISTS smokeless_product_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES smokeless_products(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  moderation_status moderation_status DEFAULT 'pending',
  is_moderated BOOLEAN DEFAULT false,
  is_verified_purchase BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- One review per user per product
  UNIQUE(user_id, product_id)
);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update timestamp
CREATE TRIGGER update_smokeless_product_reviews_updated_at
  BEFORE UPDATE ON smokeless_product_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id 
ON smokeless_product_reviews(product_id);

CREATE INDEX IF NOT EXISTS idx_product_reviews_user_id 
ON smokeless_product_reviews(user_id);

CREATE INDEX IF NOT EXISTS idx_product_reviews_moderation 
ON smokeless_product_reviews(moderation_status);

-- Security policies
ALTER TABLE smokeless_product_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved reviews
CREATE POLICY "Public can view approved reviews" ON smokeless_product_reviews
FOR SELECT USING (is_moderated = true);

-- Users can insert their own reviews
CREATE POLICY "Users can create reviews" ON smokeless_product_reviews
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews" ON smokeless_product_reviews
FOR UPDATE USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews" ON smokeless_product_reviews
FOR DELETE USING (auth.uid() = user_id);

-- Grant access to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON smokeless_product_reviews TO authenticated;
GRANT SELECT ON smokeless_product_reviews TO anon;

-- Add review count and average rating columns to products table if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'smokeless_products' 
    AND column_name = 'review_count'
  ) THEN
    ALTER TABLE smokeless_products 
    ADD COLUMN review_count INTEGER DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'smokeless_products' 
    AND column_name = 'average_rating'
  ) THEN
    ALTER TABLE smokeless_products 
    ADD COLUMN average_rating DECIMAL(3,1) DEFAULT NULL;
  END IF;
END $$;

-- Function to recalculate product statistics
CREATE OR REPLACE FUNCTION recalculate_product_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update product statistics
  WITH stats AS (
    SELECT 
      COUNT(*) as review_count,
      ROUND(AVG(rating)::numeric, 1) as avg_rating
    FROM smokeless_product_reviews
    WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
    AND is_moderated = true
  )
  UPDATE smokeless_products
  SET 
    review_count = stats.review_count,
    average_rating = stats.avg_rating
  FROM stats
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for product stats updates
DROP TRIGGER IF EXISTS update_product_stats ON smokeless_product_reviews;
CREATE TRIGGER update_product_stats
AFTER INSERT OR UPDATE OR DELETE ON smokeless_product_reviews
FOR EACH ROW EXECUTE FUNCTION recalculate_product_stats();

-- Initial stats calculation
WITH stats AS (
  SELECT 
    product_id,
    COUNT(*) as review_count,
    ROUND(AVG(rating)::numeric, 1) as avg_rating
  FROM smokeless_product_reviews
  WHERE is_moderated = true
  GROUP BY product_id
)
UPDATE smokeless_products p
SET 
  review_count = stats.review_count,
  average_rating = stats.avg_rating
FROM stats
WHERE p.id = stats.product_id;