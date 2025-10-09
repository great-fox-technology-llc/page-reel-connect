-- Phase 6: Profile Builder & Preview - Profile Pages

-- Profile pages table (for Profile Builder drafts and published pages)
CREATE TABLE public.profile_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  header_block JSONB,
  body_blocks JSONB[] DEFAULT '{}',
  footer_block JSONB,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, slug)
);

-- Create index
CREATE INDEX idx_profile_pages_user_id ON public.profile_pages(user_id);
CREATE INDEX idx_profile_pages_slug ON public.profile_pages(slug);
CREATE INDEX idx_profile_pages_published ON public.profile_pages(published);

-- Trigger for updated_at
CREATE TRIGGER update_profile_pages_updated_at
  BEFORE UPDATE ON public.profile_pages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.profile_pages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profile pages
CREATE POLICY "Published profile pages are viewable by everyone"
  ON public.profile_pages FOR SELECT
  USING (published = true);

CREATE POLICY "Users can view their own profile pages"
  ON public.profile_pages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile pages"
  ON public.profile_pages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile pages"
  ON public.profile_pages FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile pages"
  ON public.profile_pages FOR DELETE
  USING (auth.uid() = user_id);

-- Phase 11: Storage Buckets

-- Insert storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
  ('avatars', 'avatars', true),
  ('post-media', 'post-media', true),
  ('story-media', 'story-media', true),
  ('reel-media', 'reel-media', true),
  ('product-images', 'product-images', true),
  ('profile-media', 'profile-media', true),
  ('private-files', 'private-files', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies for avatars bucket
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage RLS Policies for post-media bucket
CREATE POLICY "Post media are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'post-media');

CREATE POLICY "Users can upload post media"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'post-media' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own post media"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'post-media' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage RLS Policies for story-media bucket
CREATE POLICY "Story media are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'story-media');

CREATE POLICY "Users can upload story media"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'story-media' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own story media"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'story-media' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage RLS Policies for reel-media bucket
CREATE POLICY "Reel media are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'reel-media');

CREATE POLICY "Users can upload reel media"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'reel-media' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own reel media"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'reel-media' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage RLS Policies for product-images bucket
CREATE POLICY "Product images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Users can upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own product images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'product-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage RLS Policies for profile-media bucket
CREATE POLICY "Profile media are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile-media');

CREATE POLICY "Users can upload profile media"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'profile-media' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own profile media"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'profile-media' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage RLS Policies for private-files bucket
CREATE POLICY "Users can view their own private files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'private-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can upload their own private files"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'private-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own private files"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'private-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own private files"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'private-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );