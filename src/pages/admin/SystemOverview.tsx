import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, AlertCircle, DollarSign, Activity, CheckCircle, 
  XCircle, Clock, MoreVertical, TrendingUp, Download,
  Shield, Database, Trash2, AlertTriangle, Bell
} from 'lucide-react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAdminRole } from '@/hooks/useAdminRole';
import {
  mockAdminStats,
  mockRecentUsers,
  mockModerationQueue,
  mockAdminActions,
  mockUserGrowth,
  mockRevenueAnalytics,
  mockSystemPerformance
} from '@/data/mockAdminData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SystemOverview() {
  const { toast } = useToast();
  const { isSuperAdmin } = useAdminRole();
  const [moderationItems, setModerationItems] = useState(mockModerationQueue);
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [emergencyAction, setEmergencyAction] = useState<string>('');
  const [confirmText, setConfirmText] = useState('');

  const handleModerateAction = (itemId: string, action: 'approve' | 'remove' | 'shadowban' | 'ban') => {
    const item = moderationItems.find(i => i.id === itemId);
    if (!item) return;

    const actionLabels = {
      approve: 'approved',
      remove: 'removed',
      shadowban: 'shadowbanned author of',
      ban: 'banned author of'
    };

    toast({
      title: `Content ${actionLabels[action]}`,
      description: `Successfully ${actionLabels[action]} ${item.contentType} by ${item.author}`,
    });

    setModerationItems(prev => prev.filter(i => i.id !== itemId));
  };

  const handleUserAction = (userId: string, action: string) => {
    toast({
      title: 'Action completed',
      description: `${action} executed for user ${userId}`,
    });
  };

  const handleBulkAction = (action: string) => {
    toast({
      title: 'Bulk action started',
      description: `${action} is being processed in the background`,
    });
  };

  const handleEmergencyAction = () => {
    if (confirmText === `CONFIRM ${emergencyAction}`) {
      toast({
        title: 'Emergency action executed',
        description: `${emergencyAction} has been triggered`,
        variant: 'destructive'
      });
      setShowEmergencyDialog(false);
      setConfirmText('');
    } else {
      toast({
        title: 'Confirmation failed',
        description: 'Please type the exact confirmation phrase',
        variant: 'destructive'
      });
    }
  };

  const openEmergencyDialog = (action: string) => {
    setEmergencyAction(action);
    setShowEmergencyDialog(true);
  };

  const StatCard = ({ 
    icon: Icon, 
    label, 
    value, 
    subtext, 
    trend 
  }: { 
    icon: any; 
    label: string; 
    value: string | number; 
    subtext?: string; 
    trend?: string;
  }) => (
    <Card className="bg-[#121726] border-white/10">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
            {subtext && (
              <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
            )}
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-sm text-green-400">{trend}</span>
              </div>
            )}
          </div>
          <div className="w-12 h-12 rounded-lg bg-[#4368D9]/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-[#4368D9]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">System Overview</h1>
            <p className="text-muted-foreground mt-1">
              Monitor platform health and manage operations
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            icon={Users}
            label="Total Users"
            value={mockAdminStats.totalUsers.toLocaleString()}
            trend="+12.5% this month"
          />
          <StatCard
            icon={Activity}
            label="Active Today"
            value={mockAdminStats.activeToday.toLocaleString()}
            subtext="13% of total"
          />
          <StatCard
            icon={AlertCircle}
            label="Pending Reports"
            value={mockAdminStats.pendingReports}
            subtext="Requires attention"
          />
          <StatCard
            icon={DollarSign}
            label="MRR"
            value={`$${mockAdminStats.mrr.toLocaleString()}`}
            trend={mockRevenueAnalytics.growth}
          />
          <StatCard
            icon={CheckCircle}
            label="System Health"
            value={mockAdminStats.uptime + '%'}
            subtext="Uptime"
          />
        </div>

        {/* User Management Table */}
        <Card className="bg-[#121726] border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">User Management</CardTitle>
                <CardDescription>Recent user activity and management</CardDescription>
              </div>
              <div className="flex gap-2">
                <Input 
                  placeholder="Search users..." 
                  className="w-64"
                />
                <Button variant="outline" size="sm">
                  Filters
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRecentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4368D9] to-[#39D2C0]" />
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-xs text-muted-foreground">@{user.handle}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {user.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === 'active' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleUserAction(user.id, 'View Profile')}>
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction(user.id, 'Reset Password')}>
                            Reset Password
                          </DropdownMenuItem>
                          {isSuperAdmin && (
                            <DropdownMenuItem onClick={() => handleUserAction(user.id, 'Impersonate')}>
                              Impersonate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleUserAction(user.id, 'Suspend')}>
                            {user.status === 'active' ? 'Suspend' : 'Unsuspend'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Moderation Queue */}
        <Card className="bg-[#121726] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Content Moderation Queue</CardTitle>
            <CardDescription>
              {moderationItems.length} items pending review
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {moderationItems.map((item) => (
              <div key={item.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="capitalize">
                        {item.contentType}
                      </Badge>
                      <Badge variant="destructive">{item.reason}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {item.reporterCount} reports
                      </span>
                    </div>
                    <p className="text-sm text-white mb-2">
                      By <span className="font-medium">{item.author}</span> • 
                      Account: <Badge variant="outline" className="ml-1">{item.accountStatus}</Badge>
                    </p>
                    <p className="text-sm text-muted-foreground">{item.content}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{item.engagement.likes} likes</span>
                      <span>{item.engagement.comments} comments</span>
                      <span>{item.engagement.shares} shares</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleModerateAction(item.id, 'approve')}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleModerateAction(item.id, 'remove')}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleModerateAction(item.id, 'shadowban')}
                  >
                    <Clock className="w-4 h-4 mr-1" />
                    Shadowban
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleModerateAction(item.id, 'ban')}
                  >
                    <Shield className="w-4 h-4 mr-1" />
                    Ban User
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth */}
          <Card className="bg-[#121726] border-white/10">
            <CardHeader>
              <CardTitle className="text-white">User Growth</CardTitle>
              <CardDescription>Last 12 weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={mockUserGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="week" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#121726', 
                      border: '1px solid rgba(255,255,255,0.1)' 
                    }}
                  />
                  <Bar dataKey="users" fill="#4368D9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Analytics */}
          <Card className="bg-[#121726] border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Revenue Analytics</CardTitle>
              <CardDescription>This month's performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">GMV This Month</span>
                <span className="text-2xl font-bold text-white">
                  ${mockRevenueAnalytics.gmvThisMonth.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subscriptions</span>
                <span className="text-2xl font-bold text-white">
                  ${mockRevenueAnalytics.subscriptions.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Transaction Fees</span>
                <span className="text-2xl font-bold text-white">
                  ${mockRevenueAnalytics.transactionFees.toLocaleString()}
                </span>
              </div>
              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-white">Total Monthly Revenue</span>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-[#39D2C0]">
                      ${mockRevenueAnalytics.totalMonthlyRevenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-400">{mockRevenueAnalytics.growth}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Performance & Bulk Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Performance */}
          <Card className="bg-[#121726] border-white/10">
            <CardHeader>
              <CardTitle className="text-white">System Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">API Error Rate</span>
                <span className="text-sm font-medium text-green-400">
                  {mockSystemPerformance.apiErrorRate}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Response Time</span>
                <span className="text-sm font-medium text-white">
                  {mockSystemPerformance.responseTime}ms
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Background Jobs</span>
                <span className="text-sm font-medium text-white">
                  {mockSystemPerformance.backgroundJobs.success}/
                  {mockSystemPerformance.backgroundJobs.failed} failed
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Storage</span>
                <span className="text-sm font-medium text-white">
                  {mockSystemPerformance.storage.used}TB / {mockSystemPerformance.storage.total}TB
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          <Card className="bg-[#121726] border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Bulk Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleBulkAction('Send Announcement')}
              >
                <Bell className="w-4 h-4 mr-2" />
                Send Announcement
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleBulkAction('Export Data')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleBulkAction('Database Backup')}
              >
                <Database className="w-4 h-4 mr-2" />
                Database Backup
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleBulkAction('Cache Clear')}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cache
              </Button>
            </CardContent>
          </Card>

          {/* Admin Activity Log */}
          <Card className="bg-[#121726] border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Recent Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAdminActions.slice(0, 4).map((action) => (
                  <div key={action.id} className="text-sm">
                    <p className="text-white font-medium">{action.action}</p>
                    <p className="text-muted-foreground text-xs">
                      {action.admin} • {action.time}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Controls */}
        {isSuperAdmin && (
          <Card className="bg-red-950/20 border-red-500/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <CardTitle className="text-red-500">Emergency Controls</CardTitle>
              </div>
              <CardDescription>
                Superadmin only - Use with extreme caution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <Button 
                  variant="destructive"
                  onClick={() => openEmergencyDialog('Emergency Shutdown')}
                >
                  Emergency Shutdown
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => openEmergencyDialog('Lock All Accounts')}
                >
                  Lock All Accounts
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => openEmergencyDialog('Disable New Posts')}
                >
                  Disable New Posts
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => openEmergencyDialog('Rollback System')}
                >
                  Rollback System
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Emergency Confirmation Dialog */}
        <AlertDialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Emergency Action</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to execute: <strong>{emergencyAction}</strong>
                <br /><br />
                This action will have immediate system-wide effects. To confirm, 
                type: <code className="bg-muted px-2 py-1 rounded">CONFIRM {emergencyAction}</code>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={`Type: CONFIRM ${emergencyAction}`}
              className="mt-4"
            />
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => {
                setConfirmText('');
                setShowEmergencyDialog(false);
              }}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleEmergencyAction}
                className="bg-red-600 hover:bg-red-700"
              >
                Execute
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}
