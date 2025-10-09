import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/shared/StatCard";
import { Eye, Users, Heart, TrendingUp, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mockAnalyticsData } from "@/data/mockAnalytics";

export default function Analytics() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics Overview</h1>
          <p className="text-muted-foreground">Track your performance and growth</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <StatCard icon={Eye} label="Total Views" value="127,847" trend="+12.5% ↑" trendUp />
          <StatCard icon={Users} label="Followers" value="2,431" trend="+8.2% ↑" trendUp />
          <StatCard icon={TrendingUp} label="Engagement" value="4.7%" trend="+0.3% ↑" trendUp />
          <StatCard icon={Heart} label="Likes" value="18,924" trend="+15.8% ↑" trendUp />
          <StatCard icon={DollarSign} label="Revenue" value="$3,247" trend="+22.4% ↑" trendUp />
        </div>

        <Card className="glass border-white/10 p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Weekly Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockAnalyticsData.views}>
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
              <Line type="monotone" dataKey="value" stroke="hsl(234 56% 56%)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="glass border-white/10 p-6">
            <h2 className="text-xl font-bold mb-4">Top Performing Content</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-semibold">Post Title {i}</h3>
                    <p className="text-sm text-muted-foreground">12.5K views • 847 likes</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="glass border-white/10 p-6">
            <h2 className="text-xl font-bold mb-4">Quick Insights</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/10">
                <p className="text-sm text-muted-foreground mb-1">Best time to post</p>
                <p className="text-xl font-bold">6-8 PM weekdays</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/10">
                <p className="text-sm text-muted-foreground mb-1">Top hashtag</p>
                <p className="text-xl font-bold">#design</p>
              </div>
              <div className="p-4 rounded-lg bg-accent/10">
                <p className="text-sm text-muted-foreground mb-1">Most engaged day</p>
                <p className="text-xl font-bold">Saturday</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
