import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/StatCard";
import { Tag, Percent, TrendingUp, Plus } from "lucide-react";
import { mockDiscounts } from "@/data/mockDiscounts";

export default function Discounts() {
  const activeCount = mockDiscounts.filter(d => d.isActive).length;
  const totalUses = mockDiscounts.reduce((sum, d) => sum + d.usageCount, 0);
  const totalLimit = mockDiscounts.reduce((sum, d) => sum + d.usageLimit, 0);
  const redeemedPercentage = ((totalUses / totalLimit) * 100).toFixed(1);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Discounts & Promotions</h1>
            <p className="text-muted-foreground">Manage discount codes and promotions</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Discount
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard icon={Tag} label="Active Promotions" value={activeCount} />
          <StatCard icon={TrendingUp} label="Total Uses" value={totalUses.toLocaleString()} />
          <StatCard icon={Percent} label="Redeemed %" value={`${redeemedPercentage}%`} />
        </div>

        <Card className="glass border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="text-left p-4 font-semibold">Code</th>
                  <th className="text-left p-4 font-semibold">Type</th>
                  <th className="text-left p-4 font-semibold">Value</th>
                  <th className="text-left p-4 font-semibold">Usage</th>
                  <th className="text-left p-4 font-semibold">Expiration</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockDiscounts.map((discount) => (
                  <tr key={discount.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4 font-mono font-bold">{discount.code}</td>
                    <td className="p-4">
                      <Badge variant="outline">{discount.type.replace('_', ' ')}</Badge>
                    </td>
                    <td className="p-4">
                      {discount.type === 'percentage' ? `${discount.value}%` : 
                       discount.type === 'fixed' ? `$${discount.value}` : 'Free'}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${(discount.usageCount / discount.usageLimit) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm">{discount.usageCount}/{discount.usageLimit}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{new Date(discount.validTo).toLocaleDateString()}</td>
                    <td className="p-4">
                      <Badge className={discount.isActive ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500"}>
                        {discount.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
