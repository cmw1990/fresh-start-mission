# Mission Fresh - Supabase Backend Tasks

This file lists the necessary backend tasks to be performed in Supabase to support the frontend application development.

## Database Schema

1.  **Create `smokeless_products` Table:**
    *   Define columns based on `t1.md` specification for the Smokeless Directory:
        *   `id` (uuid, primary key)
        *   `name` (text, not null)
        *   `brand` (text)
        *   `description` (text)
        *   `image_url` (text)
        *   `nicotine_strength_mg` (numeric) // Or text if variable (e.g., "6mg", "12mg")
        *   `flavor_category` (text) // e.g., Mint, Fruit, Tobacco
        *   `ingredients` (text[]) // Array of text
        *   `expert_notes_chemicals` (text)
        *   `expert_notes_gum_health` (text)
        *   `user_rating_avg` (numeric, default 0)
        *   `user_rating_count` (integer, default 0)
        *   `created_at` (timestamp with time zone, default now())
        *   `updated_at` (timestamp with time zone, default now())
    *   Enable Row Level Security (RLS) - Allow public read access.

2.  **Create `smokeless_product_reviews` Table:**
    *   `id` (uuid, primary key)
    *   `product_id` (uuid, foreign key references `smokeless_products.id`, not null)
    *   `user_id` (uuid, foreign key references `auth.users.id`, not null) // Or allow anonymous reviews? TBD based on spec refinement.
    *   `rating` (integer, check between 1 and 5, not null)
    *   `review_text` (text)
    *   `created_at` (timestamp with time zone, default now())
    *   `is_moderated` (boolean, default false)
    *   Enable RLS - Allow public read access, authenticated users insert/update/delete own reviews.

3.  **Create `smokeless_vendors` Table:**
    *   `id` (uuid, primary key)
    *   `name` (text, not null)
    *   `website_url` (text)
    *   `description` (text)
    *   `logo_url` (text)
    *   `affiliate_link_template` (text) // e.g., "https://vendor.com/product?ref={productId}&aff={affiliateId}"
    *   `shipping_info_summary` (text)
    *   `regions_served` (text[]) // Array of text (e.g., "USA", "EU", "UK")
    *   `user_rating_avg` (numeric, default 0)
    *   `user_rating_count` (integer, default 0)
    *   `created_at` (timestamp with time zone, default now())
    *   `updated_at` (timestamp with time zone, default now())
    *   Enable RLS - Allow public read access.

4.  **Create `smokeless_vendor_reviews` Table:** (Similar to product reviews, if needed)
    *   `id` (uuid, primary key)
    *   `vendor_id` (uuid, foreign key references `smokeless_vendors.id`, not null)
    *   `user_id` (uuid, foreign key references `auth.users.id`, not null)
    *   `rating` (integer, check between 1 and 5, not null)
    *   `review_text` (text)
    *   `created_at` (timestamp with time zone, default now())
    *   `is_moderated` (boolean, default false)
    *   Enable RLS - Allow public read access, authenticated users insert/update/delete own reviews.

5.  **Define other tables based on `t1.md`:**
    *   `user_profiles` (linking to `auth.users`, storing name, avatar_url, etc.)
    *   `goals` (user_id, goal_type, method, target, start_date, quit_date, motivation, etc.)
    *   `log_entries` (user_id, timestamp, mood, energy, focus, sleep_quality, sleep_hours, journal_note)
    *   `nicotine_use_logs` (log_entry_id, product_type, quantity, is_slip_up)
    *   `craving_logs` (log_entry_id, timestamp, intensity, trigger, coping_mechanism_used)
    *   `rewards` (Define structure for available rewards - e.g., discount codes, descriptions)
    *   `user_rewards` (user_id, reward_id, claimed_at, redeemed_at)
    *   `user_steps` (user_id, date, step_count, points_earned) - Consider if needed or calculated dynamically.

## Type Generation

1.  **Regenerate Supabase Types:** After creating/modifying tables, run the Supabase CLI command to generate TypeScript types for the frontend:
    ```bash
    npx supabase gen types typescript --project-id <your-project-id> --schema public > src/integrations/supabase/types.ts 
    # Or use the linked project command:
    # npx supabase gen types typescript --linked > src/integrations/supabase/types.ts
    ```
    Ensure the output path `src/integrations/supabase/types.ts` is correct.

## Edge Functions

1.  **Implement `claim-reward` Function:**
    *   Input: `user_id`, `reward_id`
    *   Logic: Verify user eligibility (points balance), mark reward as claimed in `user_rewards`, potentially deduct points (if applicable). Handle concurrency and idempotency.
    *   Requires authenticated user context.

2.  **Implement `process-step-data` Function (Optional/Future):**
    *   Input: `user_id`, `date`, `step_count`
    *   Logic: Calculate points earned based on steps, update user's points balance (potentially in `user_profiles` or a dedicated `points` table).
    *   Could be triggered periodically or when mobile app syncs.

## Storage

1.  **Configure Storage Buckets:**
    *   `avatars`: For user profile pictures (if implemented). Public read access, authenticated write access for own avatar.
    *   `product_images`: For smokeless product images. Public read access. Admin/restricted write access.
    *   `vendor_logos`: For vendor logos. Public read access. Admin/restricted write access.

## Authentication

1.  **Enable Social Providers:** Configure Google and Apple OAuth providers in Supabase Auth settings as per `t1.md`.
2.  **Email Templates:** Customize email verification and password reset templates to match Mission Fresh branding.

## Seed Data (Optional)

1.  **Create Seed Script:** Populate `smokeless_products` and `smokeless_vendors` with initial sample data for development and testing.