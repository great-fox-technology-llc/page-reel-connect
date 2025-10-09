import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { subWeeks, startOfWeek, endOfWeek } from 'date-fns';

export interface AnalyticsData {
  profileViews: number;
  profileViewsChange: number;
  followers: number;
  followersChange: number;
  totalLikes: number;
  likesChange: number;
  revenue: number;
  revenueChange: number;
}

async function fetchAnalytics(userId: string): Promise<AnalyticsData> {
  const now = new Date();
  const thisWeekStart = startOfWeek(now);
  const thisWeekEnd = endOfWeek(now);
  const lastWeekStart = startOfWeek(subWeeks(now, 1));
  const lastWeekEnd = endOfWeek(subWeeks(now, 1));

  // Profile views this week
  const { count: viewsThisWeek } = await supabase
    .from('page_views')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('viewed_at', thisWeekStart.toISOString())
    .lte('viewed_at', thisWeekEnd.toISOString());

  // Profile views last week
  const { count: viewsLastWeek } = await supabase
    .from('page_views')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('viewed_at', lastWeekStart.toISOString())
    .lte('viewed_at', lastWeekEnd.toISOString());

  // Followers this week
  const { count: followersThisWeek } = await supabase
    .from('followers')
    .select('*', { count: 'exact', head: true })
    .eq('following_id', userId)
    .gte('created_at', thisWeekStart.toISOString());

  // Followers last week
  const { count: followersLastWeek } = await supabase
    .from('followers')
    .select('*', { count: 'exact', head: true })
    .eq('following_id', userId)
    .gte('created_at', lastWeekStart.toISOString())
    .lte('created_at', lastWeekEnd.toISOString());

  // Total followers
  const { count: totalFollowers } = await supabase
    .from('followers')
    .select('*', { count: 'exact', head: true })
    .eq('following_id', userId);

  // Likes this week (posts + reels)
  const { count: postLikesThisWeek } = await supabase
    .from('post_likes')
    .select('*, posts!inner(*)', { count: 'exact', head: true })
    .eq('posts.user_id', userId)
    .gte('created_at', thisWeekStart.toISOString());

  const { count: reelLikesThisWeek } = await supabase
    .from('reel_likes')
    .select('*, reels!inner(*)', { count: 'exact', head: true })
    .eq('reels.user_id', userId)
    .gte('created_at', thisWeekStart.toISOString());

  // Likes last week
  const { count: postLikesLastWeek } = await supabase
    .from('post_likes')
    .select('*, posts!inner(*)', { count: 'exact', head: true })
    .eq('posts.user_id', userId)
    .gte('created_at', lastWeekStart.toISOString())
    .lte('created_at', lastWeekEnd.toISOString());

  const { count: reelLikesLastWeek } = await supabase
    .from('reel_likes')
    .select('*, reels!inner(*)', { count: 'exact', head: true })
    .eq('reels.user_id', userId)
    .gte('created_at', lastWeekStart.toISOString())
    .lte('created_at', lastWeekEnd.toISOString());

  // Revenue (completed orders only)
  const { data: ordersThisWeek } = await supabase
    .from('orders')
    .select('total')
    .eq('buyer_id', userId)
    .in('status', ['completed', 'delivered'])
    .gte('created_at', thisWeekStart.toISOString());

  const { data: ordersLastWeek } = await supabase
    .from('orders')
    .select('total')
    .eq('buyer_id', userId)
    .in('status', ['completed', 'delivered'])
    .gte('created_at', lastWeekStart.toISOString())
    .lte('created_at', lastWeekEnd.toISOString());

  const revenueThisWeek = ordersThisWeek?.reduce((sum, order) => sum + Number(order.total), 0) || 0;
  const revenueLastWeek = ordersLastWeek?.reduce((sum, order) => sum + Number(order.total), 0) || 0;

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  const likesThisWeek = (postLikesThisWeek || 0) + (reelLikesThisWeek || 0);
  const likesLastWeek = (postLikesLastWeek || 0) + (reelLikesLastWeek || 0);

  return {
    profileViews: viewsThisWeek || 0,
    profileViewsChange: calculateChange(viewsThisWeek || 0, viewsLastWeek || 0),
    followers: totalFollowers || 0,
    followersChange: calculateChange(followersThisWeek || 0, followersLastWeek || 0),
    totalLikes: likesThisWeek,
    likesChange: calculateChange(likesThisWeek, likesLastWeek),
    revenue: revenueThisWeek,
    revenueChange: calculateChange(revenueThisWeek, revenueLastWeek),
  };
}

export function useAnalytics(userId?: string) {
  return useQuery({
    queryKey: ['analytics', userId],
    queryFn: () => fetchAnalytics(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
