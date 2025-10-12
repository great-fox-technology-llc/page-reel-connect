import { AdminLayout } from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminTable } from "@/components/admin/AdminTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

const mockCommerce = {
  products: [
    { id: "1", title: "Digital Template", seller: "John Doe", price: 29.99, downloads: 234, rating: 4.8, status: "published" },
    { id: "2", title: "UI Kit Pro", seller: "Jane Smith", price: 49.99, downloads: 567, rating: 4.9, status: "published" },
  ],
  orders: [
    { id: "ORD-001", buyer: "customer@example.com", amount: 99.99, items: 3, status: "paid", created: "2024-01-15" },
    { id: "ORD-002", buyer: "buyer@example.com", amount: 49.99, items: 1, status: "paid", created: "2024-01-14" },
  ],
  discounts: [
    { id: "1", code: "WELCOME20", type: "percentage", value: 20, uses: 45, limit: 100, active: true, validUntil: "2024-12-31" },
    { id: "2", code: "SAVE50", type: "fixed", value: 50, uses: 12, limit: 50, active: true, validUntil: "2024-06-30" },
  ],
  payouts: [
    { id: "1", seller: "John Doe", amount: 1234.56, status: "paid", runAt: "2024-01-15" },
    { id: "2", seller: "Jane Smith", amount: 2345.67, status: "queued", runAt: "2024-01-20" },
  ],
};

export default function Commerce() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Commerce</h1>
          <p className="text-muted-foreground">Manage products, orders, discounts, and payouts</p>
        </div>

        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="discounts">Discounts</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <AdminTable
              data={mockCommerce.products}
              columns={[
                { key: "id", label: "ID" },
                { key: "title", label: "Title", sortable: true },
                { key: "seller", label: "Seller" },
                { key: "price", label: "Price", sortable: true, render: (p: any) => `$${p.price}` },
                { key: "downloads", label: "Downloads", sortable: true },
                { key: "rating", label: "Rating", sortable: true },
                { key: "status", label: "Status", render: (p: any) => <Badge>{p.status}</Badge> },
              ]}
              exportFilename="products.csv"
            />
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <AdminTable
              data={mockCommerce.orders}
              columns={[
                { key: "id", label: "Order #", sortable: true },
                { key: "buyer", label: "Buyer" },
                { key: "amount", label: "Amount", render: (o: any) => `$${o.amount}` },
                { key: "items", label: "Items" },
                { key: "status", label: "Status", render: (o: any) => <Badge variant="default">{o.status}</Badge> },
                { key: "created", label: "Date", sortable: true },
              ]}
              exportFilename="orders.csv"
            />
          </TabsContent>

          <TabsContent value="discounts" className="mt-6">
            <AdminTable
              data={mockCommerce.discounts}
              columns={[
                { key: "code", label: "Code", sortable: true },
                { key: "type", label: "Type" },
                { key: "value", label: "Value" },
                { key: "uses", label: "Uses" },
                { key: "limit", label: "Limit" },
                { key: "active", label: "Active", render: (d: any) => <Badge variant={d.active ? "default" : "secondary"}>{d.active ? "Yes" : "No"}</Badge> },
                { key: "validUntil", label: "Valid Until" },
              ]}
              exportFilename="discounts.csv"
            />
          </TabsContent>

          <TabsContent value="payouts" className="mt-6">
            <AdminTable
              data={mockCommerce.payouts}
              columns={[
                { key: "id", label: "ID" },
                { key: "seller", label: "Seller" },
                { key: "amount", label: "Amount", render: (p: any) => `$${p.amount}` },
                { key: "status", label: "Status", render: (p: any) => <Badge>{p.status}</Badge> },
                { key: "runAt", label: "Payout Date" },
                {
                  key: "actions",
                  label: "",
                  render: (p: any) => p.status === "queued" ? (
                    <Button size="sm" variant="outline">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Process
                    </Button>
                  ) : null,
                },
              ]}
              exportFilename="payouts.csv"
            />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
