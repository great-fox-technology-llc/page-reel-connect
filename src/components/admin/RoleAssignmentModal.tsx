import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AdminRole } from "@/hooks/useAdminRole";

interface RoleAssignmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  currentRoles: AdminRole[];
  userName: string;
  onSuccess: () => void;
}

const allRoles: AdminRole[] = ["superadmin", "moderator", "support", "finance", "engineer"];

export function RoleAssignmentModal({
  open,
  onOpenChange,
  userId,
  currentRoles,
  userName,
  onSuccess,
}: RoleAssignmentModalProps) {
  const [selectedRoles, setSelectedRoles] = useState<AdminRole[]>(currentRoles);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleToggleRole = (role: AdminRole) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Remove old roles
      const rolesToRemove = currentRoles.filter((r) => !selectedRoles.includes(r));
      if (rolesToRemove.length > 0) {
        const { error: deleteError } = await supabase
          .from("user_roles")
          .delete()
          .eq("user_id", userId)
          .in("role", rolesToRemove as any);

        if (deleteError) throw deleteError;
      }

      // Add new roles
      const rolesToAdd = selectedRoles.filter((r) => !currentRoles.includes(r));
      if (rolesToAdd.length > 0) {
        const { error: insertError } = await supabase
          .from("user_roles")
          .insert(rolesToAdd.map((role) => ({ user_id: userId, role: role as any })));

        if (insertError) throw insertError;
      }

      toast({
        title: "Roles updated",
        description: `Successfully updated roles for ${userName}`,
      });

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update roles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Roles for {userName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {allRoles.map((role) => (
            <div key={role} className="flex items-center space-x-2">
              <Checkbox
                id={role}
                checked={selectedRoles.includes(role)}
                onCheckedChange={() => handleToggleRole(role)}
              />
              <Label htmlFor={role} className="cursor-pointer capitalize">
                {role}
              </Label>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
