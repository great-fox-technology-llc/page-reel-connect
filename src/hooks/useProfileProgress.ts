import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ProfileProgress {
  hasAvatar: boolean;
  hasBio: boolean;
  hasPosts: boolean;
  hasProfilePage: boolean;
  completionPercentage: number;
}

async function fetchProfileProgress(userId: string): Promise<ProfileProgress> {
  // Check profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('avatar_url, bio')
    .eq('id', userId)
    .single();

  // Check posts
  const { count: postsCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  // Check profile page
  const { count: profilePagesCount } = await supabase
    .from('profile_pages')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  const hasAvatar = !!profile?.avatar_url;
  const hasBio = !!profile?.bio;
  const hasPosts = (postsCount || 0) > 0;
  const hasProfilePage = (profilePagesCount || 0) > 0;

  const completedTasks = [hasAvatar, hasBio, hasPosts, hasProfilePage].filter(Boolean).length;
  const completionPercentage = Math.round((completedTasks / 4) * 100);

  return {
    hasAvatar,
    hasBio,
    hasPosts,
    hasProfilePage,
    completionPercentage,
  };
}

export function useProfileProgress(userId?: string) {
  return useQuery({
    queryKey: ['profileProgress', userId],
    queryFn: () => fetchProfileProgress(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60, // 1 minute
  });
}
