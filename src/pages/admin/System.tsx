import { AdminLayout } from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AdminTable } from "@/components/admin/AdminTable";
import { CheckCircle, Download, Play } from "lucide-react";
import { mockAdminActions } from "@/data/mockAdminData";
import { useToast } from "@/hooks/use-toast";

const mockFeatureFlags = [
  { id: "1", key: "enable_reels_upload", enabled: true, description: "Allow users to upload reels" },
  { id: "2", key: "enable_ai_captions", enabled: false, description: "Enable AI-powered captions" },
  { id: "3", key: "enable_stories_music", enabled: true, description: "Allow music in stories" },
];

const mockBackups = [
  { id: "1", date: "2024-01-15 10:30", size: "2.4 GB", status: "complete" },
  { id: "2", date: "2024-01-14 10:30", size: "2.3 GB", status: "complete" },
];

export default function System() {
  const { toast } = useToast();

  const handleToggleFlag = (flag: any) => {
    toast({ title: "Feature flag updated", description: `${flag.key} is now ${!flag.enabled ? "enabled" : "disabled"}` });
  };

  const auditColumns = [
    { key: "admin", label: "Admin", sortable: true },
    { key: "action", label: "Action", sortable: true },
    { key: "target", label: "Target" },
    { key: "result", label: "Result", render: (a: any) => <Badge variant={a.result === "success" ? "default" : "destructive"}>{a.result}</Badge> },
    { key: "time", label: "Time", sortable: true },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">System</h1>
          <p className="text-muted-foreground">System configuration and monitoring</p>
        </div>

        <Tabs defaultValue="status">
          <TabsList>
            <TabsTrigger value="status">Status & Metrics</TabsTrigger>
            <TabsTrigger value="flags">Feature Flags</TabsTrigger>
            <TabsTrigger value="backups">Backups</TabsTrigger>
            <TabsTrigger value="audit">Audit Log</TabsTrigger>
          </TabsList>

          <TabsContent value="status" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {["Web Server", "Database", "Storage", "Queue"].map((service) => (
                <Card key={service} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{service}</p>
                      <p className="text-2xl font-bold">Operational</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="flags" className="space-y-4 mt-6">
            {mockFeatureFlags.map((flag) => (
              <Card key={flag.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{flag.key}</p>
                    <p className="text-sm text-muted-foreground">{flag.description}</p>
                  </div>
                  <Switch checked={flag.enabled} onCheckedChange={() => handleToggleFlag(flag)} />
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="backups" className="space-y-4 mt-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">Automated daily backups at 10:30 UTC</p>
              <Button>
                <Play className="w-4 h-4 mr-2" />
                Create Backup Now
              </Button>
            </div>
            <div className="space-y-2">
              {mockBackups.map((backup) => (
                <Card key={backup.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{backup.date}</p>
                      <p className="text-sm text-muted-foreground">{backup.size}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="default">{backup.status}</Badge>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="audit" className="mt-6">
            <AdminTable
              data={mockAdminActions}
              columns={auditColumns}
              searchPlaceholder="Search audit log..."
              exportFilename="audit-log.csv"
            />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
