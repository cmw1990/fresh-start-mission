-- Function to calculate average rating
CREATE OR REPLACE FUNCTION calculate_average_rating() 
RETURNS TRIGGER AS $$
BEGIN
  -- Update the average rating for the product
  UPDATE smokeless_products
  SET average_rating = (
    SELECT ROUND(AVG(rating)::numeric, 1)
    FROM smokeless_product_reviews
    WHERE product_id = NEW.product_id
    AND is_moderated = true
  )
  WHERE id = NEW.product_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for review updates
DROP TRIGGER IF EXISTS update_product_rating ON smokeless_product_reviews;
CREATE TRIGGER update_product_rating
  AFTER INSERT OR UPDATE OR DELETE ON smokeless_product_reviews
  FOR EACH ROW
  EXECUTE FUNCTION calculate_average_rating();

-- Function to increment review count
CREATE OR REPLACE FUNCTION update_review_count() 
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE smokeless_products
    SET review_count = review_count + 1
    WHERE id = NEW.product_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE smokeless_products
    SET review_count = GREATEST(0, review_count - 1)
    WHERE id = OLD.product_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for review count
DROP TRIGGER IF EXISTS update_product_review_count ON smokeless_product_reviews;
CREATE TRIGGER update_product_review_count
  AFTER INSERT OR DELETE ON smokeless_product_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_review_count();

-- Add review_count column if it doesn't exist
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
END $$;

-- Add average_rating column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'smokeless_products' 
    AND column_name = 'average_rating'
  ) THEN
    ALTER TABLE smokeless_products 
    ADD COLUMN average_rating DECIMAL(3,1) DEFAULT NULL;
  END IF;
END $$;

-- Recalculate all product ratings
WITH review_stats AS (
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
  review_count = COALESCE(r.review_count, 0),
  average_rating = r.avg_rating
FROM review_stats r
WHERE p.id = r.product_id;