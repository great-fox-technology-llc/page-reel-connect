export interface AnalyticsData {
  views: { date: string; value: number }[];
  likes: { date: string; value: number }[];
  comments: { date: string; value: number }[];
  followers: { date: string; value: number }[];
  revenue: { date: string; value: number }[];
}

export const mockAnalyticsData: AnalyticsData = {
  views: [
    { date: "Mon", value: 12450 },
    { date: "Tue", value: 15230 },
    { date: "Wed", value: 18940 },
    { date: "Thu", value: 16780 },
    { date: "Fri", value: 21340 },
    { date: "Sat", value: 24560 },
    { date: "Sun", value: 18540 }
  ],
  likes: [
    { date: "Mon", value: 2340 },
    { date: "Tue", value: 2890 },
    { date: "Wed", value: 3420 },
    { date: "Thu", value: 3120 },
    { date: "Fri", value: 4230 },
    { date: "Sat", value: 4890 },
    { date: "Sun", value: 3640 }
  ],
  comments: [
    { date: "Mon", value: 320 },
    { date: "Tue", value: 430 },
    { date: "Wed", value: 520 },
    { date: "Thu", value: 480 },
    { date: "Fri", value: 640 },
    { date: "Sat", value: 720 },
    { date: "Sun", value: 560 }
  ],
  followers: [
    { date: "Mon", value: 2380 },
    { date: "Tue", value: 2395 },
    { date: "Wed", value: 2410 },
    { date: "Thu", value: 2418 },
    { date: "Fri", value: 2425 },
    { date: "Sat", value: 2431 },
    { date: "Sun", value: 2431 }
  ],
  revenue: [
    { date: "Mon", value: 425 },
    { date: "Tue", value: 590 },
    { date: "Wed", value: 680 },
    { date: "Thu", value: 520 },
    { date: "Fri", value: 750 },
    { date: "Sat", value: 890 },
    { date: "Sun", value: 392 }
  ]
};

export interface SalesData {
  monthly: { month: string; sales: number }[];
  byCategory: { category: string; sales: number }[];
}

export const mockSalesData: SalesData = {
  monthly: [
    { month: "Aug", sales: 8420 },
    { month: "Sep", sales: 9670 },
    { month: "Oct", sales: 10890 },
    { month: "Nov", sales: 11230 },
    { month: "Dec", sales: 12340 },
    { month: "Jan", sales: 12847 }
  ],
  byCategory: [
    { category: "Templates", sales: 4520 },
    { category: "Digital Art", sales: 3280 },
    { category: "Fonts", sales: 2150 },
    { category: "Audio", sales: 1670 },
    { category: "Video", sales: 1227 }
  ]
};

export interface GrowthData {
  followerGrowth: { date: string; value: number }[];
  engagementByHour: { hour: string; engagement: number }[];
  contentPerformance: {
    posts: { published: number; engagement: number; reach: number };
    stories: { published: number; engagement: number; reach: number };
    reels: { published: number; engagement: number; reach: number };
  };
}

export const mockGrowthData: GrowthData = {
  followerGrowth: Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    value: 2084 + Math.floor(Math.random() * 20) + i * 10
  })),
  engagementByHour: [
    { hour: "12AM", engagement: 12 },
    { hour: "1AM", engagement: 8 },
    { hour: "2AM", engagement: 5 },
    { hour: "3AM", engagement: 3 },
    { hour: "4AM", engagement: 2 },
    { hour: "5AM", engagement: 4 },
    { hour: "6AM", engagement: 15 },
    { hour: "7AM", engagement: 28 },
    { hour: "8AM", engagement: 42 },
    { hour: "9AM", engagement: 56 },
    { hour: "10AM", engagement: 68 },
    { hour: "11AM", engagement: 72 },
    { hour: "12PM", engagement: 85 },
    { hour: "1PM", engagement: 78 },
    { hour: "2PM", engagement: 92 },
    { hour: "3PM", engagement: 88 },
    { hour: "4PM", engagement: 94 },
    { hour: "5PM", engagement: 96 },
    { hour: "6PM", engagement: 100 },
    { hour: "7PM", engagement: 98 },
    { hour: "8PM", engagement: 95 },
    { hour: "9PM", engagement: 86 },
    { hour: "10PM", engagement: 72 },
    { hour: "11PM", engagement: 45 }
  ],
  contentPerformance: {
    posts: { published: 12, engagement: 4.2, reach: 18500 },
    stories: { published: 34, engagement: 6.8, reach: 24300 },
    reels: { published: 8, engagement: 9.2, reach: 127000 }
  }
};
