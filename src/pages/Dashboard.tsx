import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, Plus, CheckCircle2, Circle, Eye, Users, Heart, DollarSign, TrendingUp, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useProfileProgress } from "@/hooks/useProfileProgress";
import { useAdminRole } from "@/hooks/useAdminRole";
import { formatNumber, formatCurrency } from "@/lib/format";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics(user?.id);
  const { data: progress, isLoading: progressLoading } = useProfileProgress(user?.id);
  const { hasAdminAccess } = useAdminRole();

  const tasks = [
    { id: 1, title: "Set up your profile", description: "Add profile photo and bio", completed: progress?.hasAvatar && progress?.hasBio, action: "/settings" },
    { id: 2, title: "Create your first page", description: "Use the Profile Builder to create your website", completed: progress?.hasProfilePage, action: "/profile-builder" },
    { id: 3, title: "Publish your first post", description: "Share content with your audience", completed: progress?.hasPosts, action: "/posts" },
    { id: 4, title: "Customize your theme", description: "Make your profile unique", completed: false, action: "/profile-builder" },
  ];

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercentage = progress?.completionPercentage || 0;

  const handleTaskAction = (action?: string) => {
    if (action) navigate(action);
  };

  const stats = [
    { 
      label: "Profile Views", 
      value: analytics ? formatNumber(analytics.profileViews) : "0", 
      change: analytics ? `${analytics.profileViewsChange > 0 ? '+' : ''}${analytics.profileViewsChange}% from last week` : "No data", 
      icon: Eye, 
      trend: analytics && analytics.profileViewsChange > 0 ? "up" : "neutral" 
    },
    { 
      label: "Followers", 
      value: analytics ? formatNumber(analytics.followers) : "0", 
      change: analytics ? `${analytics.followersChange > 0 ? '+' : ''}${analytics.followersChange}% from last week` : "No data", 
      icon: Users, 
      trend: analytics && analytics.followersChange > 0 ? "up" : "neutral" 
    },
    { 
      label: "Total Likes", 
      value: analytics ? formatNumber(analytics.totalLikes) : "0", 
      change: analytics ? `${analytics.likesChange > 0 ? '+' : ''}${analytics.likesChange}% from last week` : "No data", 
      icon: Heart, 
      trend: analytics && analytics.likesChange > 0 ? "up" : "neutral" 
    },
    { 
      label: "Revenue", 
      value: analytics ? formatCurrency(analytics.revenue) : "$0", 
      change: analytics && analytics.revenue > 0 ? `${analytics.revenueChange > 0 ? '+' : ''}${analytics.revenueChange}% from last week` : "Keep creating great content", 
      icon: DollarSign, 
      trend: analytics && analytics.revenueChange > 0 ? "up" : "neutral" 
    },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 backdrop-blur-xl bg-background/80 border-b border-white/10">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                Welcome back, {profile?.display_name || 'there'}! 👋
              </h1>
              <p className="text-muted-foreground mt-1">Here's what's happening with your creative work today.</p>
            </div>
            <div className="flex items-center gap-3">
              {hasAdminAccess && (
                <Button 
                  variant="outline" 
                  className="gap-2 border-primary/50 text-primary hover:bg-primary/10"
                  onClick={() => navigate('/admin')}
                >
                  <Shield className="w-4 h-4" />
                  Admin Panel
                </Button>
              )}
              <ThemeToggle />
              <Button variant="outline" className="gap-2">
                <Bell className="w-4 h-4" />
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Plus className="w-4 h-4" />
                Create Page
              </Button>
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                New Post
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Quick Start Guide */}
          <Card className="glass border-white/10 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <h2 className="text-xl font-bold">Quick Start Guide</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  {completedCount} of {tasks.length} completed
                </p>
              </div>
              <span className="text-2xl font-bold text-primary">{Math.round(progressPercentage)}%</span>
            </div>
            
            <Progress value={progressPercentage} className="mb-6 h-2" />
            
            <div className="space-y-3">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                    <div>
                      <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>
                  </div>
                  {!task.completed && task.action && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleTaskAction(task.action)}
                      className="text-primary hover:text-primary"
                    >
                      Do it
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analyticsLoading ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="glass border-white/10 p-6">
                    <Skeleton className="h-4 w-24 mb-4" />
                    <Skeleton className="h-8 w-32 mb-2" />
                    <Skeleton className="h-4 w-40" />
                  </Card>
                ))}
              </>
            ) : (
              stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.label} className="glass border-white/10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <p className="text-3xl font-bold mb-2">{stat.value}</p>
                    <div className="flex items-center gap-1 text-sm">
                      {stat.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                      <span className={stat.trend === "up" ? "text-green-500" : "text-muted-foreground"}>
                        {stat.change}
                      </span>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
