import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/shared/StatCard";
import { DollarSign, ShoppingBag, TrendingUp, RefreshCw } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mockSalesData } from "@/data/mockAnalytics";

export default function Sales() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Sales Analytics</h1>
          <p className="text-muted-foreground">Track your revenue and orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard icon={DollarSign} label="Total Sales" value="$12,847" trend="+18.3% ↑" trendUp />
          <StatCard icon={ShoppingBag} label="Orders" value="156" trend="+12% ↑" trendUp />
          <StatCard icon={TrendingUp} label="Avg Order Value" value="$82.35" trend="+5.2% ↑" trendUp />
          <StatCard icon={RefreshCw} label="Refund Rate" value="2.1%" trend="-0.4% ↓" trendUp />
        </div>

        <Card className="glass border-white/10 p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Monthly Sales Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockSalesData.monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(18, 23, 38, 0.9)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="sales" fill="hsl(234 56% 56%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="glass border-white/10 p-6">
          <h2 className="text-xl font-bold mb-6">Sales by Category</h2>
          <div className="space-y-4">
            {mockSalesData.byCategory.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{cat.category}</span>
                  <span className="text-muted-foreground">${cat.sales.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-primary" 
                    style={{ width: `${(cat.sales / 5000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
