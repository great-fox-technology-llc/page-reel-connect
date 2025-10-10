-- Backfill missing profiles for existing users
INSERT INTO public.profiles (id, email, handle, display_name)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'handle', SPLIT_PART(au.email, '@', 1)),
  COALESCE(au.raw_user_meta_data->>'display_name', SPLIT_PART(au.email, '@', 1))
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;