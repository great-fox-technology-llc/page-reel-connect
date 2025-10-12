import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminTable } from "@/components/admin/AdminTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const mockReports = [
  { id: "1", type: "Post", contentId: "post_123", reporter: "user@example.com", reason: "Spam", status: "pending", created: "2024-01-15" },
  { id: "2", type: "Comment", contentId: "comment_456", reporter: "another@example.com", reason: "Harassment", status: "reviewed", created: "2024-01-14" },
  { id: "3", type: "Reel", contentId: "reel_789", reporter: "report@example.com", reason: "NSFW", status: "pending", created: "2024-01-13" },
];

export default function Reports() {
  const { toast } = useToast();

  const handleResolve = (report: any) => {
    toast({
      title: "Report resolved",
      description: `Report ${report.id} has been marked as resolved`,
    });
  };

  const columns = [
    { key: "id", label: "Report ID", sortable: true },
    {
      key: "type",
      label: "Content Type",
      render: (report: any) => <Badge variant="outline">{report.type}</Badge>,
    },
    { key: "reporter", label: "Reporter", sortable: true },
    { key: "reason", label: "Reason", sortable: true },
    {
      key: "status",
      label: "Status",
      render: (report: any) => (
        <Badge variant={report.status === "pending" ? "default" : "secondary"}>
          {report.status}
        </Badge>
      ),
    },
    { key: "created", label: "Created", sortable: true },
    {
      key: "actions",
      label: "",
      render: (report: any) => (
        <Button size="sm" variant="outline" onClick={() => handleResolve(report)}>
          Resolve
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reports & Flags</h1>
          <p className="text-muted-foreground">Review and manage user reports</p>
        </div>

        <AdminTable
          data={mockReports}
          columns={columns}
          searchPlaceholder="Search reports..."
          exportFilename="reports.csv"
        />
      </div>
    </AdminLayout>
  );
}
