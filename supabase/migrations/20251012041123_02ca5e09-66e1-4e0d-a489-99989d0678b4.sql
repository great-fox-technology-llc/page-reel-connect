-- Security Fix: Restrict page_views analytics to prevent data poisoning
-- This prevents attackers from inserting fake analytics data

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can create page views" ON public.page_views;

-- Create new policy that requires authentication
CREATE POLICY "Authenticated users can log their page views"
ON public.page_views FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = user_id OR user_id IS NULL
);

-- Add unique constraint to prevent duplicate entries from the same visitor
CREATE UNIQUE INDEX IF NOT EXISTS page_views_unique_visitor 
ON public.page_views (visitor_id, page_id, page_type, viewed_at)
WHERE visitor_id IS NOT NULL;