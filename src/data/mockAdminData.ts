export const mockAdminStats = {
  totalUsers: 24891,
  activeToday: 3247,
  pendingReports: 47,
  mrr: 47892,
  health: 'healthy' as const,
  uptime: 99.8
};

export const mockRecentUsers = [
  {
    id: '1',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    handle: 'mikej',
    avatar: '/placeholder.svg',
    plan: 'premium',
    status: 'active',
    joinDate: '2024-10-01',
    lastActive: '2 min ago',
    strikes: 0
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    handle: 'sarahc',
    avatar: '/placeholder.svg',
    plan: 'pro',
    status: 'active',
    joinDate: '2024-09-28',
    lastActive: '5 min ago',
    strikes: 0
  },
  {
    id: '3',
    name: 'Alex Rivera',
    email: 'alex.rivera@email.com',
    handle: 'alexr',
    avatar: '/placeholder.svg',
    plan: 'free',
    status: 'pending',
    joinDate: '2024-10-10',
    lastActive: '1 hour ago',
    strikes: 1
  },
];

export const mockModerationQueue = [
  {
    id: '1',
    contentType: 'post',
    contentId: 'post-123',
    author: 'John Doe',
    authorId: 'user-456',
    reason: 'spam',
    reporterCount: 3,
    engagement: { likes: 45, comments: 12, shares: 5 },
    accountStatus: 'active',
    content: '"Check out this amazing website! [suspicious link]" - Repeated posts with external links.',
    created: '2024-10-12T10:30:00Z'
  },
  {
    id: '2',
    contentType: 'comment',
    contentId: 'comment-789',
    author: 'Jane Smith',
    authorId: 'user-789',
    reason: 'harassment',
    reporterCount: 7,
    engagement: { likes: 2, comments: 0, shares: 0 },
    accountStatus: 'warned',
    content: 'Aggressive comment targeting another user with personal insults.',
    created: '2024-10-12T09:15:00Z'
  },
  {
    id: '3',
    contentType: 'reel',
    contentId: 'reel-456',
    author: 'Content Creator',
    authorId: 'user-321',
    reason: 'inappropriate',
    reporterCount: 12,
    engagement: { likes: 234, comments: 56, shares: 23 },
    accountStatus: 'active',
    content: 'Reel contains potentially inappropriate imagery flagged by multiple users.',
    created: '2024-10-12T08:00:00Z'
  },
];

export const mockAdminActions = [
  {
    id: '1',
    admin: 'Sarah Chen',
    action: 'Suspended User',
    target: '@abusive_user',
    result: 'success',
    time: '5 min ago'
  },
  {
    id: '2',
    admin: 'Mike Johnson',
    action: 'Removed Post',
    target: 'Post #12345',
    result: 'success',
    time: '12 min ago'
  },
  {
    id: '3',
    admin: 'Alex Rivera',
    action: 'Approved Content',
    target: 'Reel #67890',
    result: 'success',
    time: '25 min ago'
  },
  {
    id: '4',
    admin: 'Emma Davis',
    action: 'Updated Feature Flag',
    target: 'enable_reels_upload',
    result: 'success',
    time: '1 hour ago'
  },
];

export const mockUserGrowth = [
  { week: 'Week 1', users: 850 },
  { week: 'Week 2', users: 920 },
  { week: 'Week 3', users: 1100 },
  { week: 'Week 4', users: 1050 },
  { week: 'Week 5', users: 1200 },
  { week: 'Week 6', users: 1350 },
  { week: 'Week 7', users: 1280 },
  { week: 'Week 8', users: 1420 },
  { week: 'Week 9', users: 1580 },
  { week: 'Week 10', users: 1650 },
  { week: 'Week 11', users: 1820 },
  { week: 'Week 12', users: 1947 },
];

export const mockRevenueAnalytics = {
  gmvThisMonth: 29223,
  subscriptions: 133500,
  transactionFees: 36189,
  totalMonthlyRevenue: 177892,
  growth: '+28.3%'
};

export const mockSystemPerformance = {
  apiErrorRate: 0.12,
  responseTime: 145,
  backgroundJobs: { success: 234, failed: 2 },
  storage: { used: 2.4, total: 5.0 }
};
