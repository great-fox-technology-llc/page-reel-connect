import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { useContent, Story } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Camera, Video, Palette, Eye, TrendingUp, Clock, CheckCircle2, Radio } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Stories = () => {
  const { stories } = useContent();
  const [category, setCategory] = useState<string>('all');

  const categories = ['all', 'Trending', 'Following', 'Art', 'Photography', 'Music', 'Tutorial', 'Gaming', 'Tech'];
  
  const filteredStories = category === 'all' 
    ? stories 
    : stories.filter(s => s.category?.toLowerCase() === category.toLowerCase());

  const liveStories = filteredStories.filter(s => s.isLive);
  const recentStories = filteredStories.filter(s => !s.isLive);
  const featuredStories = filteredStories.slice(0, 3);

  const formatTime = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return `${Math.floor(diff / 60000)}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-1">Stories</h1>
            <p className="text-muted-foreground">Share your day, one moment at a time</p>
          </div>

          {/* Create Story Composer */}
          <Card className="p-6 mb-6 bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Create Your Story</h3>
                <p className="text-sm text-muted-foreground">Share what's happening right now</p>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Camera className="w-4 h-4" />
                      Photo
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Photo Story</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-muted-foreground mb-4">Upload a photo to share with your followers</p>
                      <input type="file" accept="image/*" className="mb-4" />
                      <Button className="w-full">Share Story</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Video className="w-4 h-4" />
                      Video
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Video Story</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-muted-foreground mb-4">Record or upload a video (max 60 seconds)</p>
                      <input type="file" accept="video/*" className="mb-4" />
                      <Button className="w-full">Share Story</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Palette className="w-4 h-4" />
                      Design
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Design Story</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-muted-foreground mb-4">Create a custom design with text and stickers</p>
                      <Button className="w-full">Start Designing</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </Card>

          {/* Category Filter */}
          <div className="mb-6 overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={category === cat ? 'default' : 'secondary'}
                  className="cursor-pointer px-4 py-2 capitalize"
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          {/* Featured Stories */}
          {category === 'all' && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Featured Stories
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredStories.map((story) => (
                  <FeaturedStoryCard key={story.id} story={story} formatTime={formatTime} formatNumber={formatNumber} />
                ))}
              </div>
            </div>
          )}

          {/* Live Stories */}
          {liveStories.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Radio className="w-5 h-5 text-destructive animate-pulse" />
                  Live Now
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {liveStories.map((story) => (
                  <StoryCard key={story.id} story={story} formatTime={formatTime} formatNumber={formatNumber} isLive />
                ))}
              </div>
            </div>
          )}

          {/* Recent Stories */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Stories
              </h2>
            </div>
            {recentStories.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No stories yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Be the first to share a story in this category!
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Create Story</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Story</DialogTitle>
                      </DialogHeader>
                      <div className="py-4 space-y-4">
                        <Button className="w-full gap-2">
                          <Camera className="w-4 h-4" />
                          Photo Story
                        </Button>
                        <Button className="w-full gap-2">
                          <Video className="w-4 h-4" />
                          Video Story
                        </Button>
                        <Button className="w-full gap-2">
                          <Palette className="w-4 h-4" />
                          Design Story
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {recentStories.map((story) => (
                  <StoryCard key={story.id} story={story} formatTime={formatTime} formatNumber={formatNumber} />
                ))}
              </div>
            )}
          </div>

          {/* Story Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Story Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Views</span>
                  <span className="font-semibold">45.2K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Completion Rate</span>
                  <span className="font-semibold">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Avg. Time Watched</span>
                  <span className="font-semibold">12.3s</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10">
              <h3 className="text-lg font-semibold mb-2">Share Your Story</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Stories disappear after 24 hours. Share your moments while they last!
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full gap-2">
                    <Plus className="w-4 h-4" />
                    Create New Story
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Story</DialogTitle>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <Button className="w-full gap-2" variant="outline">
                      <Camera className="w-4 h-4" />
                      Photo Story
                    </Button>
                    <Button className="w-full gap-2" variant="outline">
                      <Video className="w-4 h-4" />
                      Video Story
                    </Button>
                    <Button className="w-full gap-2">
                      <Palette className="w-4 h-4" />
                      Design Story
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

const StoryCard = ({ story, formatTime, formatNumber, isLive }: { story: Story; formatTime: (d: string) => string; formatNumber: (n: number) => string; isLive?: boolean }) => (
  <div className="group cursor-pointer">
    <div className="relative aspect-[9/16] rounded-lg overflow-hidden mb-2">
      <img 
        src={story.media.url} 
        alt={`${story.author.name}'s story`}
        className="w-full h-full object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
      
      {isLive && (
        <Badge className="absolute top-2 left-2 bg-destructive text-white border-0 gap-1">
          <Radio className="w-3 h-3 animate-pulse" />
          LIVE
        </Badge>
      )}
      
      <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
        <Eye className="w-3 h-3" />
        {formatNumber(story.views)}
      </div>

      <div className="absolute bottom-2 left-2 right-2">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="w-8 h-8 border-2 border-white">
            <AvatarImage src={story.author.avatar} />
            <AvatarFallback>{story.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <p className="text-xs font-semibold text-white truncate">{story.author.name}</p>
              {story.author.verified && <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />}
            </div>
            <p className="text-[10px] text-white/80">{formatTime(story.createdAt)}</p>
          </div>
        </div>
        <Button size="sm" className="w-full text-xs h-7" variant="secondary">
          View Story
        </Button>
      </div>
    </div>
  </div>
);

const FeaturedStoryCard = ({ story, formatTime, formatNumber }: { story: Story; formatTime: (d: string) => string; formatNumber: (n: number) => string }) => (
  <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
    <div className="relative aspect-[16/9]">
      <img 
        src={story.media.url} 
        alt={`${story.author.name}'s story`}
        className="w-full h-full object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
      
      {story.isLive && (
        <Badge className="absolute top-3 left-3 bg-destructive text-white border-0 gap-1">
          <Radio className="w-3 h-3 animate-pulse" />
          LIVE
        </Badge>
      )}
      
      <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-sm text-white">
        <Eye className="w-4 h-4" />
        {formatNumber(story.views)}
      </div>

      <div className="absolute bottom-3 left-3 right-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-white">
            <AvatarImage src={story.author.avatar} />
            <AvatarFallback>{story.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold text-white truncate">{story.author.name}</p>
              {story.author.verified && <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />}
            </div>
            <p className="text-xs text-white/80">{formatTime(story.createdAt)}</p>
          </div>
          <Button size="sm" variant="secondary">View</Button>
        </div>
      </div>
    </div>
  </Card>
);

export default Stories;
