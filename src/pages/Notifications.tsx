import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/StatCard";
import { Bell, Heart, MessageCircle, UserPlus, Share2 } from "lucide-react";
import { mockNotifications } from "@/data/mockNotifications";

export default function Notifications() {
  const unreadCount = mockNotifications.filter(n => !n.read).length;
  const likesCount = mockNotifications.filter(n => n.type === 'like').length;
  const commentsCount = mockNotifications.filter(n => n.type === 'comment').length;
  const followsCount = mockNotifications.filter(n => n.type === 'follow').length;

  const iconMap = {
    like: Heart,
    comment: MessageCircle,
    follow: UserPlus,
    share: Share2,
    order: Bell,
    system: Bell
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your latest activity</p>
          </div>
          <Button variant="outline">Mark All Read</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Bell} label="Unread" value={unreadCount} />
          <StatCard icon={Heart} label="Likes" value={likesCount} />
          <StatCard icon={MessageCircle} label="Comments" value={commentsCount} />
          <StatCard icon={UserPlus} label="Follows" value={followsCount} />
        </div>

        <Card className="glass border-white/10 divide-y divide-white/5">
          {mockNotifications.map((notif) => {
            const Icon = iconMap[notif.type];
            return (
              <div key={notif.id} className={`p-4 hover:bg-white/5 ${!notif.read ? 'bg-primary/5' : ''}`}>
                <div className="flex items-start gap-4">
                  {notif.user ? (
                    <img src={notif.user.avatar} alt={notif.user.name} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm">
                      {notif.user && <span className="font-semibold">{notif.user.name} </span>}
                      {notif.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.timestamp}</p>
                  </div>
                  {!notif.read && (
                    <Badge variant="secondary" className="bg-primary text-primary-foreground">New</Badge>
                  )}
                </div>
              </div>
            );
          })}
        </Card>
      </main>
    </div>
  );
}
