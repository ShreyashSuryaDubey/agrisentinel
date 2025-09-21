-- Create a special RLS policy for demo mode
-- Add a policy that allows access for a specific demo user ID

-- First, let's create more permissive policies for demo purposes
CREATE POLICY "Allow demo user access to farmer_queries" 
ON public.farmer_queries 
FOR ALL 
USING (user_id = '00000000-0000-0000-0000-000000000000'::uuid OR auth.uid() = user_id)
WITH CHECK (user_id = '00000000-0000-0000-0000-000000000000'::uuid OR auth.uid() = user_id);

CREATE POLICY "Allow demo user access to profiles" 
ON public.profiles 
FOR ALL 
USING (user_id = '00000000-0000-0000-0000-000000000000'::uuid OR auth.uid() = user_id)
WITH CHECK (user_id = '00000000-0000-0000-0000-000000000000'::uuid OR auth.uid() = user_id);

-- Insert a demo profile
INSERT INTO public.profiles (
  user_id,
  full_name,
  farm_location,
  farm_size,
  primary_crops,
  farming_experience,
  phone_number
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'Demo Farmer',
  'Demo Valley, Agricultural District',
  '10-50 acres',
  ARRAY['wheat', 'corn', 'soybeans'],
  '5-10 years',
  '+1-555-DEMO'
) ON CONFLICT (user_id) DO NOTHING;