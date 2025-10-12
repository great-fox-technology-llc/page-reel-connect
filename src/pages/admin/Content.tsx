import { AdminLayout } from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminTable } from "@/components/admin/AdminTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockContent = {
  posts: [
    { id: "1", author: "John Doe", caption: "Amazing photo!", likes: 1234, comments: 56, status: "published", created: "2024-01-15" },
    { id: "2", author: "Jane Smith", caption: "Check this out", likes: 890, comments: 34, status: "published", created: "2024-01-14" },
  ],
  stories: [
    { id: "1", author: "John Doe", views: 5678, status: "active", expires: "2024-01-16" },
    { id: "2", author: "Jane Smith", views: 3421, status: "active", expires: "2024-01-16" },
  ],
  reels: [
    { id: "1", author: "John Doe", caption: "Trending reel!", views: 12345, likes: 890, status: "published", created: "2024-01-15" },
    { id: "2", author: "Jane Smith", caption: "Funny moment", views: 8765, likes: 543, status: "published", created: "2024-01-14" },
  ],
};

export default function Content() {
  const { toast } = useToast();

  const handleAction = (action: string, item: any) => {
    toast({ title: action, description: `Action performed on ${item.id}` });
  };

  const postColumns = [
    { key: "id", label: "ID", sortable: true },
    { key: "author", label: "Author", sortable: true },
    { key: "caption", label: "Caption" },
    { key: "likes", label: "Likes", sortable: true },
    { key: "comments", label: "Comments", sortable: true },
    {
      key: "status",
      label: "Status",
      render: (item: any) => <Badge>{item.status}</Badge>,
    },
    { key: "created", label: "Created", sortable: true },
    {
      key: "actions",
      label: "",
      render: (item: any) => (
        <div className="flex gap-1">
          <Button size="sm" variant="ghost" onClick={() => handleAction("View", item)}>
            <Eye className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleAction("Feature", item)}>
            <Star className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleAction("Delete", item)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">Manage posts, stories, and reels</p>
        </div>

        <Tabs defaultValue="posts">
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="reels">Reels</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <AdminTable data={mockContent.posts} columns={postColumns} exportFilename="posts.csv" />
          </TabsContent>

          <TabsContent value="stories" className="mt-6">
            <AdminTable
              data={mockContent.stories}
              columns={[
                { key: "id", label: "ID" },
                { key: "author", label: "Author" },
                { key: "views", label: "Views", sortable: true },
                { key: "status", label: "Status" },
                { key: "expires", label: "Expires" },
              ]}
              exportFilename="stories.csv"
            />
          </TabsContent>

          <TabsContent value="reels" className="mt-6">
            <AdminTable data={mockContent.reels} columns={postColumns} exportFilename="reels.csv" />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
