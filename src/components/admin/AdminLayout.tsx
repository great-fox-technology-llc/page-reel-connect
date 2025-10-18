import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminRole } from '@/hooks/useAdminRole';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, Users, Shield, Flag, FileText, 
  ShoppingBag, MessageSquare, Bell, BarChart3, 
  Settings, AlertTriangle, ChevronRight, Package,
  ShoppingCart, Ticket, DollarSign, Activity, ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
}

const navSections = [
  {
    title: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'System Overview', path: '/admin' },
    ]
  },
  {
    title: 'User Management',
    items: [
      { icon: Users, label: 'Users', path: '/admin/users' },
      { icon: Shield, label: 'Moderation Queue', path: '/admin/moderation' },
      { icon: Flag, label: 'Reports & Flags', path: '/admin/reports' },
    ]
  },
  {
    title: 'Content',
    items: [
      { icon: FileText, label: 'Posts', path: '/admin/posts' },
      { icon: FileText, label: 'Stories', path: '/admin/stories' },
      { icon: FileText, label: 'Reels', path: '/admin/reels' },
    ]
  },
  {
    title: 'Commerce',
    items: [
      { icon: Package, label: 'Products', path: '/admin/products' },
      { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
      { icon: Ticket, label: 'Discounts', path: '/admin/discounts' },
      { icon: DollarSign, label: 'Payouts', path: '/admin/payouts' },
    ]
  },
  {
    title: 'Communication',
    items: [
      { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
      { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    ]
  },
  {
    title: 'Analytics',
    items: [
      { icon: BarChart3, label: 'Overview', path: '/admin/analytics' },
      { icon: DollarSign, label: 'Sales', path: '/admin/sales' },
      { icon: Activity, label: 'Growth', path: '/admin/growth' },
    ]
  },
  {
    title: 'System',
    items: [
      { icon: Activity, label: 'Status & Metrics', path: '/admin/system' },
      { icon: Settings, label: 'Feature Flags', path: '/admin/feature-flags' },
      { icon: Shield, label: 'Audit Log', path: '/admin/audit' },
    ]
  },
  {
    title: 'Settings',
    items: [
      { icon: Settings, label: 'Admin Settings', path: '/admin/settings' },
    ]
  }
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const { roles } = useAdminRole();

  const primaryRole = roles[0] || 'user';

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'superadmin': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'moderator': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'support': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'finance': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'engineer': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="flex h-screen bg-[#0A0F1C]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#121726] flex flex-col">
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4368D9] to-[#39D2C0] flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-semibold text-sm">Admin Control Panel</h1>
              <Badge className={cn('text-xs mt-0.5', getRoleBadgeColor(primaryRole))}>
                {primaryRole}
              </Badge>
            </div>
          </div>
        </div>

        <div className="px-2 py-3 border-b border-white/5">
          <Link to="/dashboard">
            <Button
              variant="outline"
              className="w-full justify-start text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
          {navSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase px-3 mb-2">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link key={item.path} to={item.path}>
                      <Button
                        variant="ghost"
                        className={cn(
                          'w-full justify-start text-sm',
                          isActive 
                            ? 'bg-[#4368D9]/10 text-[#4368D9]' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                        )}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profile?.avatar_url || ''} />
              <AvatarFallback>{profile?.display_name?.[0] || 'A'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {profile?.display_name || 'Admin'}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                @{profile?.handle}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={signOut}
            className="w-full"
          >
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
