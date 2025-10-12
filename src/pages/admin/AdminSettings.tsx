import { AdminLayout } from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: "Settings saved", description: "Your changes have been saved successfully" });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Configure platform settings</p>
        </div>

        <Tabs defaultValue="roles">
          <TabsList>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            <TabsTrigger value="email">Email & Alerts</TabsTrigger>
            <TabsTrigger value="legal">Legal & Policies</TabsTrigger>
          </TabsList>

          <TabsContent value="roles" className="space-y-4 mt-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Role Matrix</h3>
              <div className="space-y-4">
                {["superadmin", "moderator", "support", "finance", "engineer"].map((role) => (
                  <div key={role} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium capitalize">{role}</p>
                      <p className="text-sm text-muted-foreground">
                        {role === "superadmin" && "Full system access"}
                        {role === "moderator" && "Content moderation"}
                        {role === "support" && "User support"}
                        {role === "finance" && "Financial operations"}
                        {role === "engineer" && "Technical administration"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-4 mt-6">
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>SMTP Server</Label>
                <Input placeholder="smtp.example.com" />
              </div>
              <div className="space-y-2">
                <Label>SMTP Port</Label>
                <Input placeholder="587" />
              </div>
              <div className="space-y-2">
                <Label>From Email</Label>
                <Input placeholder="noreply@example.com" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="weekly-digest">Send Weekly Admin Digest</Label>
                <Switch id="weekly-digest" />
              </div>
              <Button onClick={handleSave}>Save Email Settings</Button>
            </Card>
          </TabsContent>

          <TabsContent value="legal" className="space-y-4 mt-6">
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Privacy Policy</Label>
                <Textarea rows={8} placeholder="Enter privacy policy..." />
              </div>
              <div className="space-y-2">
                <Label>Terms of Service</Label>
                <Textarea rows={8} placeholder="Enter terms of service..." />
              </div>
              <Button onClick={handleSave}>Save Legal Documents</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
