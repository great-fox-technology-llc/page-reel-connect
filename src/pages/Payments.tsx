import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { ShoppingCart } from "lucide-react";

export default function Payments() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shopping Cart & Checkout</h1>
          <p className="text-muted-foreground">Review your cart and complete your purchase</p>
        </div>

        <Card className="glass border-white/10 p-8">
          <EmptyState
            icon={ShoppingCart}
            title="Your cart is empty"
            description="Add some amazing products from our marketplace to get started"
            actionLabel="Browse Products"
            onAction={() => window.location.href = '/products'}
          />
        </Card>
      </main>
    </div>
  );
}
