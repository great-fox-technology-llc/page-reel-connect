import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ProfilePage {
  id: string;
  user_id: string;
  slug: string;
  header_block: any;
  body_blocks: any[];
  footer_block: any;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export function useProfilePages(userId?: string) {
  return useQuery({
    queryKey: ['profilePages', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profile_pages')
        .select('*')
        .eq('user_id', userId!)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ProfilePage[];
    },
    enabled: !!userId,
  });
}

export function useProfilePageBySlug(slug?: string) {
  return useQuery({
    queryKey: ['profilePage', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profile_pages')
        .select('*, profiles(*)')
        .eq('slug', slug!)
        .eq('published', true)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
}

export function useProfilePageBySlugForPreview(slug?: string) {
  return useQuery({
    queryKey: ['profilePagePreview', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profile_pages')
        .select('*, profiles(*)')
        .eq('slug', slug!)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
}

export function useCreateProfilePage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (page: { user_id: string; slug: string; header_block?: any; body_blocks?: any[]; footer_block?: any; published?: boolean }) => {
      const { data, error } = await supabase
        .from('profile_pages')
        .insert([page])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profilePages'] });
      toast({ title: 'Profile page created successfully' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to create profile page',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateProfilePage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ProfilePage> & { id: string }) => {
      const { data, error } = await supabase
        .from('profile_pages')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profilePages'] });
      queryClient.invalidateQueries({ queryKey: ['profilePage'] });
      toast({ title: 'Profile page updated successfully' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to update profile page',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteProfilePage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('profile_pages')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profilePages'] });
      toast({ title: 'Profile page deleted successfully' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to delete profile page',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useTrackPageView() {
  return useMutation({
    mutationFn: async ({ pageId, userId, pageType }: { pageId: string; userId?: string; pageType: string }) => {
      const { error } = await supabase
        .from('page_views')
        .insert({
          page_id: pageId,
          user_id: userId,
          page_type: pageType,
          visitor_id: userId || `anon-${Date.now()}`,
        });

      if (error) throw error;
    },
  });
}
