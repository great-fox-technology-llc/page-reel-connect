import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Edit3, FileText, MessageSquare, Image as ImageIcon, 
  Video, Archive, ShoppingBag, ShoppingCart, Tag, CreditCard, 
  Users, UserPlus, Mail, Bell, BarChart3, TrendingUp, Activity,
  ChevronLeft, Search, LogOut, Settings as SettingsIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const navigationSections = [
  {
    title: "CORE BUILDER",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
      { icon: Edit3, label: "Profile Builder", path: "/profile-builder/new" },
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
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const getInitials = (name?: string | null) => {
    if (!name) return user?.email?.[0]?.toUpperCase() || 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                  {getInitials(profile?.display_name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium truncate">
                  {profile?.display_name || profile?.handle || user?.email}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  @{profile?.handle || 'user'}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <SettingsIcon className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};
