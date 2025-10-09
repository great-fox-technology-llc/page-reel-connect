import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useStories() {
  return useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stories')
        .select('*, profiles(*)')
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useCreateStory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (story: { user_id: string; media: string; category?: string }) => {
      const { data, error } = await supabase
        .from('stories')
        .insert(story)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      toast({ title: 'Story created successfully' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to create story',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useTrackStoryView() {
  return useMutation({
    mutationFn: async ({ storyId, userId }: { storyId: string; userId: string }) => {
      const { error } = await supabase
        .from('story_views')
        .insert({ story_id: storyId, user_id: userId });

      if (error) throw error;
    },
  });
}

export function useDeleteStory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (storyId: string) => {
      const { error } = await supabase
        .from('stories')
        .delete()
        .eq('id', storyId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      toast({ title: 'Story deleted successfully' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to delete story',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
