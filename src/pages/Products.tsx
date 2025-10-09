import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Grid3x3, List, Star, ShoppingCart } from "lucide-react";
import { mockProducts } from "@/data/mockProducts";

export default function Products() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {/* Hero Banner */}
        <div className="bg-gradient-primary p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">Creative Marketplace</h1>
          <div className="flex gap-8 text-sm">
            <div><span className="font-bold">2,847</span> Products</div>
            <div><span className="font-bold">1,234</span> Creators</div>
            <div><span className="font-bold">45,578</span> Sales</div>
          </div>
        </div>

        <div className="p-8">
          {/* Search & Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-10" />
            </div>
            <Button variant="outline" size="icon" onClick={() => setViewMode("grid")}>
              <Grid3x3 className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setViewMode("list")}>
              <List className="w-5 h-5" />
            </Button>
          </div>

          {/* Product Grid */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
            {mockProducts.map((product) => (
              <Card key={product.id} className="glass border-white/10 overflow-hidden group hover:border-primary/50 transition-all">
                <div className="aspect-video overflow-hidden">
                  <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 line-clamp-1">{product.title}</h3>
                      <p className="text-sm text-muted-foreground">{product.author.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">${product.price}</span>
                    <Button size="sm">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                  {product.tags.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {product.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
