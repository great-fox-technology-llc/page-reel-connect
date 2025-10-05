import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Edit3, FileText, MessageSquare, Image as ImageIcon, 
  Video, Archive, ShoppingBag, ShoppingCart, Tag, CreditCard, 
  Users, UserPlus, Mail, Bell, BarChart3, TrendingUp, Activity,
  ChevronLeft, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const navigationSections = [
  {
    title: "CORE BUILDER",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
      { icon: Edit3, label: "Profile Builder", path: "/profile-builder" },
      { icon: FileText, label: "Pages", path: "/pages" },
    ]
  },
  {
    title: "CONTENT",
    items: [
      { icon: MessageSquare, label: "Posts", path: "/posts" },
      { icon: ImageIcon, label: "Stories", path: "/stories" },
      { icon: Video, label: "Reels", path: "/reels" },
      { icon: Archive, label: "Media Library", path: "/media" },
    ]
  },
  {
    title: "COMMERCE",
    items: [
      { icon: ShoppingBag, label: "Products", path: "/products" },
      { icon: ShoppingCart, label: "Orders", path: "/orders" },
      { icon: Tag, label: "Discounts", path: "/discounts" },
      { icon: CreditCard, label: "Payments", path: "/payments" },
    ]
  },
  {
    title: "ENGAGEMENT",
    items: [
      { icon: UserPlus, label: "Following", path: "/following" },
      { icon: Users, label: "Followers", path: "/followers" },
      { icon: Mail, label: "Messages", path: "/messages" },
      { icon: Bell, label: "Notifications", path: "/notifications" },
    ]
  },
  {
    title: "ANALYTICS",
    items: [
      { icon: BarChart3, label: "Overview", path: "/analytics" },
      { icon: TrendingUp, label: "Sales", path: "/sales" },
      { icon: Activity, label: "Growth", path: "/growth" },
    ]
  },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-background/95 backdrop-blur-xl border-r border-white/10 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Edit3 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg">SocialBuilder</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="pl-9 bg-background/50 border-white/10 focus:border-primary/50"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        {navigationSections.map((section) => (
          <div key={section.title}>
            <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground tracking-wider">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                      isActive 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
            C
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">ceo</p>
            <p className="text-xs text-muted-foreground">Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
