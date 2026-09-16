-- This script makes a user an admin
-- Run this in Supabase SQL Editor to make a user an admin
-- Replace 'YOUR_EMAIL_HERE' with the email of the user you want to make admin

UPDATE public.profiles
SET role = 'admin'
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'YOUR_EMAIL_HERE'
);

-- Verify the change
SELECT email, role 
FROM auth.users 
JOIN public.profiles ON auth.users.id = public.profiles.user_id;
