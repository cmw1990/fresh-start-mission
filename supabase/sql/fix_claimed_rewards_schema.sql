
-- Check if points_redeemed column doesn't exist, and if it doesn't, add it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'claimed_rewards'
    AND column_name = 'points_redeemed'
  ) THEN
    ALTER TABLE claimed_rewards ADD COLUMN points_redeemed INTEGER NOT NULL DEFAULT 0;
  END IF;
END
$$;
