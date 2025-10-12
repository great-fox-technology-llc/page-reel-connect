import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminTable } from "@/components/admin/AdminTable";
import { RoleAssignmentModal } from "@/components/admin/RoleAssignmentModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Shield, Ban, Key, UserCog } from "lucide-react";
import { mockRecentUsers } from "@/data/mockAdminData";
import { useToast } from "@/hooks/use-toast";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const { toast } = useToast();

  const handleRoleClick = (user: any) => {
    setSelectedUser(user);
    setRoleModalOpen(true);
  };

  const handleAction = (action: string, user: any) => {
    toast({
      title: "Action triggered",
      description: `${action} for ${user.name}`,
    });
  };

  const columns = [
    {
      key: "avatar",
      label: "User",
      render: (user: any) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "plan",
      label: "Plan",
      sortable: true,
      render: (user: any) => (
        <Badge variant="outline" className="capitalize">
          {user.plan}
        </Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (user: any) => (
        <Badge variant={user.status === "active" ? "default" : "secondary"} className="capitalize">
          {user.status}
        </Badge>
      ),
    },
    {
      key: "joined",
      label: "Joined",
      sortable: true,
    },
    {
      key: "lastActive",
      label: "Last Active",
      sortable: true,
    },
    {
      key: "actions",
      label: "",
      render: (user: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleRoleClick(user)}>
              <Shield className="w-4 h-4 mr-2" />
              Manage Roles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("Reset Password", user)}>
              <Key className="w-4 h-4 mr-2" />
              Reset Password
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("Impersonate", user)}>
              <UserCog className="w-4 h-4 mr-2" />
              Impersonate
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleAction("Suspend", user)}
              className="text-destructive"
            >
              <Ban className="w-4 h-4 mr-2" />
              Suspend User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts, roles, and permissions</p>
        </div>

        <AdminTable
          data={mockRecentUsers}
          columns={columns}
          searchPlaceholder="Search users by name, email, or handle..."
          exportFilename="users.csv"
        />

        {selectedUser && (
          <RoleAssignmentModal
            open={roleModalOpen}
            onOpenChange={setRoleModalOpen}
            userId={selectedUser.id}
            currentRoles={[]}
            userName={selectedUser.name}
            onSuccess={() => {
              toast({
                title: "Success",
                description: "User roles updated successfully",
              });
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}
