import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminTable } from "@/components/admin/AdminTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Send } from "lucide-react";

const mockNotifications = [
  { id: "1", type: "like", user: "John Doe", content: "liked your post", time: "5 min ago", read: false },
  { id: "2", type: "comment", user: "Jane Smith", content: "commented on your reel", time: "1 hour ago", read: true },
  { id: "3", type: "follow", user: "Bob Wilson", content: "started following you", time: "2 hours ago", read: false },
  { id: "4", type: "system", user: "System", content: "New feature available", time: "1 day ago", read: true },
];

export default function AdminNotifications() {
  const columns = [
    {
      key: "type",
      label: "Type",
      render: (n: any) => <Badge variant="outline">{n.type}</Badge>,
    },
    { key: "user", label: "User", sortable: true },
    { key: "content", label: "Content" },
    { key: "time", label: "Time", sortable: true },
    {
      key: "read",
      label: "Status",
      render: (n: any) => (
        <Badge variant={n.read ? "secondary" : "default"}>
          {n.read ? "Read" : "Unread"}
        </Badge>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">Manage platform notifications</p>
          </div>
          <Button>
            <Send className="w-4 h-4 mr-2" />
            Send Broadcast
          </Button>
        </div>

        <AdminTable
          data={mockNotifications}
          columns={columns}
          searchPlaceholder="Search notifications..."
          exportFilename="notifications.csv"
        />
      </div>
    </AdminLayout>
  );
}
