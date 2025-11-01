import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Upload, FolderPlus, Image, Video, File, Grid3x3, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContent } from "@/contexts/ContentContext";

type ViewMode = "grid" | "list";

export default function Media() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { posts, stories, reels } = useContent();

  // Extract media from all content
  const mediaItems = [
    // Posts media
    ...posts.flatMap(post => 
      post.media?.map((media, index) => ({
        id: `post-${post.id}-${index}`,
        type: media.type,
        name: `post-${post.author.name.replace(/\s+/g, '-').toLowerCase()}-${index + 1}.${media.type === 'image' ? 'jpg' : 'mp4'}`,
        url: media.url,
        thumbnail: media.thumbnail || media.url,
        size: media.type === 'image' ? '2.4 MB' : '15.8 MB',
        date: formatDate(post.createdAt),
        category: 'Posts',
        author: post.author.name
      })) || []
    ),
    // Stories media
    ...stories.map(story => ({
      id: `story-${story.id}`,
      type: story.media.type,
      name: `story-${story.author.name.replace(/\s+/g, '-').toLowerCase()}.${story.media.type === 'image' ? 'jpg' : 'mp4'}`,
      url: story.media.url,
      thumbnail: story.media.thumbnail || story.media.url,
      size: story.media.type === 'image' ? '1.8 MB' : '12.3 MB',
      date: formatDate(story.createdAt),
      category: 'Stories',
      author: story.author.name
    })),
    // Reels media
    ...reels.map(reel => ({
      id: `reel-${reel.id}`,
      type: 'video',
      name: `reel-${reel.author.name.replace(/\s+/g, '-').toLowerCase()}.mp4`,
      url: reel.media.url,
      thumbnail: reel.media.thumbnail || '',
      size: '18.5 MB',
      date: formatDate(reel.createdAt),
      category: 'Reels',
      author: reel.author.name
    }))
  ];

  const categories = ['all', 'Posts', 'Stories', 'Reels'];
  
  const filteredMedia = selectedCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === selectedCategory);

  function formatDate(dateString: string) {
    const diff = Date.now() - new Date(dateString).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return `${Math.floor(days / 7)}w ago`;
  }

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
          <div className="flex flex-col gap-4">
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
            
            {/* Category filters */}
            <div className="flex items-center gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer capitalize"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Media Grid/List */}
        <div className="flex-1 overflow-auto p-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-square rounded-lg bg-muted border border-border hover:border-primary/50 transition-all cursor-pointer overflow-hidden"
                >
                  {item.thumbnail ? (
                    <img 
                      src={item.thumbnail} 
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {item.type === "image" ? (
                        <Image className="w-12 h-12 text-muted-foreground" />
                      ) : (
                        <Video className="w-12 h-12 text-muted-foreground" />
                      )}
                    </div>
                  )}
                  
                  <Badge 
                    variant="secondary" 
                    className="absolute top-2 right-2 text-xs bg-black/60 text-white border-none"
                  >
                    {item.category}
                  </Badge>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-medium truncate">{item.name}</p>
                    <p className="text-white/70 text-xs">{item.size} • {item.author}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted border border-transparent hover:border-primary/50 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded bg-background flex items-center justify-center overflow-hidden">
                    {item.thumbnail ? (
                      <img 
                        src={item.thumbnail} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : item.type === "image" ? (
                      <Image className="w-6 h-6 text-muted-foreground" />
                    ) : (
                      <Video className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{item.name}</p>
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.size} • {item.date} • {item.author}
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
