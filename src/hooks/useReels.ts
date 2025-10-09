import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useReels() {
  return useQuery({
    queryKey: ['reels'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reels')
        .select('*, profiles(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useCreateReel() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (reel: { user_id: string; media: string; caption?: string; hashtags?: string[] }) => {
      const { data, error } = await supabase
        .from('reels')
        .insert(reel)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reels'] });
      toast({ title: 'Reel created successfully' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to create reel',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useLikeReel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reelId, userId }: { reelId: string; userId: string }) => {
      const { error } = await supabase
        .from('reel_likes')
        .insert({ reel_id: reelId, user_id: userId });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reels'] });
    },
  });
}

export function useUnlikeReel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reelId, userId }: { reelId: string; userId: string }) => {
      const { error } = await supabase
        .from('reel_likes')
        .delete()
        .eq('reel_id', reelId)
        .eq('user_id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reels'] });
    },
  });
}

export function useAddReelComment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ reelId, userId, content }: { reelId: string; userId: string; content: string }) => {
      const { error } = await supabase
        .from('reel_comments')
        .insert({ reel_id: reelId, user_id: userId, content });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reels'] });
      toast({ title: 'Comment added' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to add comment',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
