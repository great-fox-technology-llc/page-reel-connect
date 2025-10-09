import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/shared/StatCard";
import { TrendingUp, Users, Eye, MousePointer } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mockGrowthData } from "@/data/mockAnalytics";

export default function Growth() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Growth Metrics</h1>
          <p className="text-muted-foreground">Monitor your audience growth and engagement</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Users} label="Follower Growth" value="+347" trend="+14.3% ↑" trendUp />
          <StatCard icon={Eye} label="Story Reach" value="18,924" trend="+22.1% ↑" trendUp />
          <StatCard icon={TrendingUp} label="Reel Views" value="127K" trend="+35.6% ↑" trendUp />
          <StatCard icon={MousePointer} label="Profile Visits" value="9,234" trend="+18.9% ↑" trendUp />
        </div>

        <Card className="glass border-white/10 p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Follower Growth Trend (30 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockGrowthData.followerGrowth}>
              <defs>
                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(234 56% 56%)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(234 56% 56%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(18, 23, 38, 0.9)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }} 
              />
              <Area type="monotone" dataKey="value" stroke="hsl(234 56% 56%)" fillOpacity={1} fill="url(#colorGrowth)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="glass border-white/10 p-6">
            <h3 className="font-bold mb-4">Content Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Posts</span>
                  <span className="font-bold">{mockGrowthData.contentPerformance.posts.engagement}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${mockGrowthData.contentPerformance.posts.engagement * 10}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Stories</span>
                  <span className="font-bold">{mockGrowthData.contentPerformance.stories.engagement}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: `${mockGrowthData.contentPerformance.stories.engagement * 10}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Reels</span>
                  <span className="font-bold">{mockGrowthData.contentPerformance.reels.engagement}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500" style={{ width: `${mockGrowthData.contentPerformance.reels.engagement * 10}%` }} />
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass border-white/10 p-6">
            <h3 className="font-bold mb-4">Top Hashtags</h3>
            <div className="flex flex-wrap gap-2">
              {['#design', '#creative', '#art', '#photography', '#ui', '#ux'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </Card>

          <Card className="glass border-white/10 p-6">
            <h3 className="font-bold mb-4">Top Cities</h3>
            <div className="space-y-3">
              {[
                { city: 'New York', count: 847 },
                { city: 'Los Angeles', count: 623 },
                { city: 'London', count: 512 }
              ].map((item) => (
                <div key={item.city} className="flex items-center justify-between">
                  <span className="text-sm">{item.city}</span>
                  <span className="font-semibold">{item.count}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
