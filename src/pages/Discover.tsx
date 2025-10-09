import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus } from "lucide-react";
import { mockUsers } from "@/data/mockUsers";
import { mockProducts } from "@/data/mockProducts";

export default function Discover() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Discover Amazing Content</h1>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search for users, posts, products..." className="pl-12 h-12 text-lg" />
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Trending Hashtags</h2>
          <div className="flex flex-wrap gap-2">
            {['#design', '#creative', '#art', '#photography', '#ui', '#ux', '#webdesign', '#branding'].map((tag) => (
              <Badge key={tag} variant="secondary" className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Suggested Creators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockUsers.slice(0, 4).map((user) => (
              <Card key={user.id} className="glass border-white/10 p-6">
                <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full mx-auto mb-3" />
                <h3 className="font-semibold text-center">{user.name}</h3>
                <p className="text-sm text-muted-foreground text-center mb-1">{user.handle}</p>
                <p className="text-xs text-muted-foreground text-center mb-3">{user.followers.toLocaleString()} followers</p>
                <Button size="sm" className="w-full">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Follow
                </Button>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts.slice(0, 4).map((product) => (
              <Card key={product.id} className="glass border-white/10 overflow-hidden">
                <img src={product.thumbnail} alt={product.title} className="w-full aspect-video object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.author.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">${product.price}</span>
                    <Button size="sm">View</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
