import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/StatCard";
import { Package, DollarSign, Clock, CheckCircle } from "lucide-react";
import { mockOrders } from "@/data/mockOrders";

export default function Orders() {
  const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-500",
    processing: "bg-blue-500/10 text-blue-500",
    shipped: "bg-purple-500/10 text-purple-500",
    completed: "bg-green-500/10 text-green-500",
    refunded: "bg-red-500/10 text-red-500",
    cancelled: "bg-gray-500/10 text-gray-500"
  };

  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = mockOrders.filter(o => o.status === "completed").length;
  const pendingOrders = mockOrders.filter(o => o.status === "pending").length;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Orders</h1>
          <p className="text-muted-foreground">Manage your orders and track shipments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Package} label="Total Orders" value={mockOrders.length} trend="+12%" trendUp />
          <StatCard icon={Clock} label="Pending" value={pendingOrders} />
          <StatCard icon={CheckCircle} label="Completed" value={completedOrders} />
          <StatCard icon={DollarSign} label="Revenue" value={`$${totalRevenue.toFixed(2)}`} trend="+18.3%" trendUp />
        </div>

        <Card className="glass border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="text-left p-4 font-semibold">Order ID</th>
                  <th className="text-left p-4 font-semibold">Date</th>
                  <th className="text-left p-4 font-semibold">Customer</th>
                  <th className="text-left p-4 font-semibold">Items</th>
                  <th className="text-left p-4 font-semibold">Total</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4 font-medium">{order.orderNumber}</td>
                    <td className="p-4 text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="p-4">{order.customer.name}</td>
                    <td className="p-4">{order.items.length}</td>
                    <td className="p-4 font-semibold">${order.total.toFixed(2)}</td>
                    <td className="p-4">
                      <Badge className={statusColors[order.status]}>{order.status}</Badge>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">View</Button>
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
