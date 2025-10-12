import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ban, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockConversations = [
  { id: "1", user: "John Doe", lastMessage: "Hello there!", time: "2 hours ago" },
  { id: "2", user: "Jane Smith", lastMessage: "Thanks for your help", time: "5 hours ago" },
];

export default function AdminMessages() {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({ title: action, description: `Action performed successfully` });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Monitor and moderate direct messages</p>
        </div>

        <div className="grid grid-cols-3 gap-6 h-[calc(100vh-16rem)]">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Conversations</h3>
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {mockConversations.map((conv) => (
                  <Card key={conv.id} className="p-3 cursor-pointer hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${conv.user}`} />
                        <AvatarFallback>{conv.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{conv.user}</p>
                        <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </Card>

          <Card className="col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Conversation Details</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleAction("Mute conversation")}>
                  <Ban className="w-4 h-4 mr-2" />
                  Mute
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleAction("Delete conversation")}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground text-center py-12">
              Select a conversation to view details
            </p>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
