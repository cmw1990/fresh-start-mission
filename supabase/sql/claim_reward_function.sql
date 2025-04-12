-- Function to claim a specific reward
create or replace function claim_reward (
  reward_id_to_claim uuid,
  user_id_to_check uuid
) 
returns claimed_rewards -- Return the newly created claimed_rewards record
language plpgsql
security definer -- Important for accessing tables securely
as $$
declare
  reward_points_required int;
  user_available_points int;
  claimed_reward_record claimed_rewards%rowtype;
begin
  -- Check if reward exists and is active, get points required
  select points_required into reward_points_required
  from public.rewards
  where id = reward_id_to_claim and active = true;

  if not found then
    raise exception 'Reward not found or is inactive.';
  end if;

  -- Calculate user's available points (using the get_user_points function)
  select public.get_user_points(user_id_to_check) into user_available_points;

  -- Check if user has enough points
  if user_available_points < reward_points_required then
    raise exception 'Not enough points. Required: %, Available: %', reward_points_required, user_available_points;
  end if;

  -- Insert into claimed_rewards table
  insert into public.claimed_rewards (user_id, reward_id, points_redeemed, claimed_at, status)
  values (user_id_to_check, reward_id_to_claim, reward_points_required, now(), 'fulfilled') -- Assuming 'fulfilled' status on successful claim
  returning * into claimed_reward_record; -- Return the inserted row

  return claimed_reward_record;
end;
$$;

-- Function to get user's current point balance (re-added for completeness if needed)
create or replace function get_user_points (
  p_user_id uuid
)
returns int
language plpgsql
security definer
as $$
declare
  total_earned int;
  total_spent int;
begin
  -- Calculate total earned points
  select coalesce(sum(points_earned), 0)
  into total_earned
  from public.step_rewards
  where user_id = p_user_id;

  -- Calculate total spent points
  select coalesce(sum(points_redeemed), 0)
  into total_spent
  from public.claimed_rewards
  where user_id = p_user_id;

  return total_earned - total_spent;
end;
$$;

-- Grant execute permission to the authenticated role
grant execute on function public.claim_reward(uuid, uuid) to authenticated;
grant execute on function public.get_user_points(uuid) to authenticated;

-- Optional: Grant execute permission to service_role if needed for backend operations
-- grant execute on function public.claim_reward(uuid, uuid) to service_role;
-- grant execute on function public.get_user_points(uuid) to service_role;