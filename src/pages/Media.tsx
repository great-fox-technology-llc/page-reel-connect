import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload, FolderPlus, Image, Video, File, Grid3x3, List } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list";

export default function Media() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Placeholder data
  const mediaItems = [
    { id: 1, type: "image", name: "hero-image.jpg", size: "2.4 MB", date: "2 days ago" },
    { id: 2, type: "video", name: "intro-video.mp4", size: "15.8 MB", date: "1 week ago" },
    { id: 3, type: "image", name: "product-1.png", size: "1.2 MB", date: "3 days ago" },
    { id: 4, type: "image", name: "logo.svg", size: "45 KB", date: "1 month ago" },
    { id: 5, type: "video", name: "tutorial.mp4", size: "24.5 MB", date: "5 days ago" },
    { id: 6, type: "image", name: "banner.jpg", size: "3.1 MB", date: "1 week ago" },
  ];

  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-16 border-b border-border flex items-center justify-between px-6">
          <div>
            <h1 className="text-2xl font-bold">Media Library</h1>
            <p className="text-sm text-muted-foreground">
              {mediaItems.length} items
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <FolderPlus className="w-4 h-4" />
              New Folder
            </Button>
            <Button className="bg-gradient-to-r from-primary to-primary-dark gap-2">
              <Upload className="w-4 h-4" />
              Upload
            </Button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="border-b border-border p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Media Grid/List */}
        <div className="flex-1 overflow-auto p-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {mediaItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-square rounded-lg bg-muted border border-border hover:border-primary/50 transition-all cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {item.type === "image" ? (
                      <Image className="w-12 h-12 text-muted-foreground" />
                    ) : (
                      <Video className="w-12 h-12 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-medium truncate">{item.name}</p>
                    <p className="text-white/70 text-xs">{item.size}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {mediaItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted border border-transparent hover:border-primary/50 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded bg-background flex items-center justify-center">
                    {item.type === "image" ? (
                      <Image className="w-6 h-6 text-muted-foreground" />
                    ) : (
                      <Video className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.size} • {item.date}
                    </p>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    Select
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
