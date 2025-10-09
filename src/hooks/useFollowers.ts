import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useFollowers(userId?: string) {
  return useQuery({
    queryKey: ['followers', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('followers')
        .select(`
          *,
          profiles!followers_follower_id_fkey(*)
        `)
        .eq('following_id', userId!);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
}

export function useFollowing(userId?: string) {
  return useQuery({
    queryKey: ['following', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('followers')
        .select(`
          *,
          profiles!followers_following_id_fkey(*)
        `)
        .eq('follower_id', userId!);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
}

export function useIsFollowing(userId?: string, targetUserId?: string) {
  return useQuery({
    queryKey: ['isFollowing', userId, targetUserId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('followers')
        .select('id')
        .eq('follower_id', userId!)
        .eq('following_id', targetUserId!)
        .maybeSingle();

      if (error) throw error;
      return !!data;
    },
    enabled: !!userId && !!targetUserId,
  });
}

export function useFollowUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ followerId, followingId }: { followerId: string; followingId: string }) => {
      const { error } = await supabase
        .from('followers')
        .insert({ follower_id: followerId, following_id: followingId });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['following'] });
      queryClient.invalidateQueries({ queryKey: ['isFollowing'] });
      toast({ title: 'Followed successfully' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to follow',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useUnfollowUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ followerId, followingId }: { followerId: string; followingId: string }) => {
      const { error } = await supabase
        .from('followers')
        .delete()
        .eq('follower_id', followerId)
        .eq('following_id', followingId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['following'] });
      queryClient.invalidateQueries({ queryKey: ['isFollowing'] });
      toast({ title: 'Unfollowed successfully' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to unfollow',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
