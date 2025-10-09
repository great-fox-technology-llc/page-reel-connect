import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/shared/StatCard";
import { Users, UserPlus, Search } from "lucide-react";
import { mockUsers } from "@/data/mockUsers";
import { useNavigate } from "react-router-dom";

export default function Followers() {
  const navigate = useNavigate();
  const totalFollowers = 2431;
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Social Connections</h1>

        <Tabs defaultValue="followers" className="mb-8">
          <TabsList>
            <TabsTrigger value="following" onClick={() => navigate('/following')}>Following</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard icon={Users} label="Followers" value={totalFollowers} />
          <StatCard icon={UserPlus} label="New This Week" value="67" trend="+22%" trendUp />
          <StatCard icon={Users} label="Following Back" value="856" />
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Search your followers..." className="pl-10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockUsers.map((user) => (
            <Card key={user.id} className="glass border-white/10 p-6">
              <div className="flex items-start gap-4">
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{user.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{user.handle}</p>
                  <p className="text-xs text-muted-foreground mt-1">{user.followers.toLocaleString()} followers</p>
                </div>
              </div>
              <p className="text-sm mt-3 line-clamp-2">{user.bio}</p>
              <Button size="sm" className="w-full mt-4">
                <UserPlus className="w-4 h-4 mr-2" />
                {user.isFollowing ? 'Following' : 'Follow Back'}
              </Button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
