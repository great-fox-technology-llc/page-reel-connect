import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Ban, Eye } from "lucide-react";
import { mockModerationQueue } from "@/data/mockAdminData";
import { useToast } from "@/hooks/use-toast";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

export default function Moderation() {
  const [confirmDialog, setConfirmDialog] = useState<any>(null);
  const { toast } = useToast();

  const handleAction = (action: string, item: any) => {
    toast({
      title: `Content ${action}`,
      description: `Successfully ${action.toLowerCase()} content from ${item.author}`,
    });
    setConfirmDialog(null);
  };

  const openConfirm = (action: string, item: any, requireTyping?: string) => {
    setConfirmDialog({ action, item, requireTyping });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Moderation Queue</h1>
          <p className="text-muted-foreground">Review and moderate flagged content</p>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="high-risk">High Risk</TabsTrigger>
            <TabsTrigger value="escalated">Escalated</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {mockModerationQueue.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex gap-6">
                  <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                    <Eye className="w-8 h-8 text-muted-foreground" />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                      <Badge variant="outline" className="mb-2">
                          {item.contentType}
                        </Badge>
                        <h3 className="font-semibold text-lg">{item.author}</h3>
                        <p className="text-sm text-muted-foreground">{item.content}</p>
                      </div>
                      <Badge variant="destructive">{item.reporterCount} reports</Badge>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-1">Reason:</p>
                      <p className="text-sm text-muted-foreground">{item.reason}</p>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAction("Approved", item)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openConfirm("Remove", item)}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => openConfirm("Ban", item, "CONFIRM BAN")}
                      >
                        <Ban className="w-4 h-4 mr-2" />
                        Ban Author
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="new">
            <p className="text-muted-foreground">New items will appear here</p>
          </TabsContent>
          <TabsContent value="high-risk">
            <p className="text-muted-foreground">High-risk items will appear here</p>
          </TabsContent>
          <TabsContent value="escalated">
            <p className="text-muted-foreground">Escalated items will appear here</p>
          </TabsContent>
        </Tabs>

        {confirmDialog && (
          <ConfirmDialog
            open={!!confirmDialog}
            onOpenChange={(open) => !open && setConfirmDialog(null)}
            title={`${confirmDialog.action} Content?`}
            description={`Are you sure you want to ${confirmDialog.action.toLowerCase()} this content?`}
            requireTyping={confirmDialog.requireTyping}
            onConfirm={() => handleAction(confirmDialog.action, confirmDialog.item)}
            variant="destructive"
          />
        )}
      </div>
    </AdminLayout>
  );
}
