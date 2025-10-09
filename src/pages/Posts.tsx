import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { useContent, Post } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Search, Plus, TrendingUp, Users, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Posts = () => {
  const { posts } = useContent();
  const [filter, setFilter] = useState<'all' | 'following' | 'trending'>('all');
  const [sort, setSort] = useState<'newest' | 'top' | 'commented'>('newest');
  const [displayedPosts, setDisplayedPosts] = useState(6);

  const sortedPosts = [...posts].sort((a, b) => {
    if (sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sort === 'top') return b.likes - a.likes;
    return b.comments - a.comments;
  });

  const visiblePosts = sortedPosts.slice(0, displayedPosts);

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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">Posts</h1>
              <p className="text-muted-foreground">Share your moments with the world</p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Post
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Textarea placeholder="What's on your mind?" rows={4} />
                  <Input type="file" accept="image/*,video/*" />
                  <Button className="w-full">Publish Post</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search posts..." className="pl-9" />
            </div>
            
            <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
              </TabsList>
            </Tabs>

            <Tabs value={sort} onValueChange={(v) => setSort(v as any)} className="w-auto">
              <TabsList>
                <TabsTrigger value="newest">Newest</TabsTrigger>
                <TabsTrigger value="top">Top</TabsTrigger>
                <TabsTrigger value="commented">Most Commented</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex gap-6">
            {/* Main Feed */}
            <div className="flex-1 space-y-6">
              {visiblePosts.length === 0 ? (
                <Card className="p-12 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Be the first to share something amazing with the community!
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Create Your First Post</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New Post</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <Textarea placeholder="What's on your mind?" rows={4} />
                          <Input type="file" accept="image/*,video/*" />
                          <Button className="w-full">Publish Post</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Card>
              ) : (
                <>
                  {visiblePosts.map((post) => (
                    <PostCard key={post.id} post={post} formatTime={formatTime} formatNumber={formatNumber} />
                  ))}
                  
                  {displayedPosts < sortedPosts.length && (
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => setDisplayedPosts(prev => prev + 6)}
                    >
                      Load More Posts
                    </Button>
                  )}
                </>
              )}
            </div>

            {/* Right Rail */}
            <aside className="hidden xl:block w-80 space-y-6">
              <Card className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Suggested Creators
                </h3>
                <div className="space-y-3">
                  {['Alex Johnson', 'Maria Santos', 'Chris Lee'].map((name, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} />
                        <AvatarFallback>{name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{name}</p>
                        <p className="text-xs text-muted-foreground">@{name.toLowerCase().replace(' ', '')}</p>
                      </div>
                      <Button size="sm" variant="outline">Follow</Button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Trending Hashtags
                </h3>
                <div className="space-y-2">
                  {['#design', '#photography', '#tech', '#travel', '#art'].map((tag) => (
                    <Badge key={tag} variant="secondary" className="mr-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Upcoming Events
                </h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium">Design Conference 2025</p>
                    <p className="text-xs text-muted-foreground">March 15, 2025</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Creator Meetup</p>
                    <p className="text-xs text-muted-foreground">March 22, 2025</p>
                  </div>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

const PostCard = ({ post, formatTime, formatNumber }: { post: Post; formatTime: (d: string) => string; formatNumber: (n: number) => string }) => (
  <Card className="overflow-hidden">
    {/* Header */}
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={post.author.avatar} />
          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-1">
            <p className="font-semibold">{post.author.name}</p>
            {post.author.verified && <CheckCircle2 className="w-4 h-4 text-primary" />}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{post.author.handle}</span>
            <span>•</span>
            <span>{formatTime(post.createdAt)}</span>
            {post.location && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {post.location}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="w-4 h-4" />
      </Button>
    </div>

    {/* Caption */}
    <div className="px-4 pb-3">
      <p className="text-sm">{post.caption}</p>
      {post.tags && (
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      )}
    </div>

    {/* Media */}
    {post.media && post.media.length > 0 && (
      <div className="bg-muted">
        <img 
          src={post.media[0].url} 
          alt="Post content" 
          className="w-full object-cover"
          style={{ aspectRatio: post.media[0].aspect || '1:1' }}
        />
      </div>
    )}

    {/* Actions */}
    <div className="p-4">
      <div className="flex items-center gap-6 mb-3">
        <button className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
          <Heart className="w-5 h-5" />
          <span>{formatNumber(post.likes)}</span>
        </button>
        <button className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span>{formatNumber(post.comments)}</span>
        </button>
        <button className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
          <Share2 className="w-5 h-5" />
          <span>{formatNumber(post.shares)}</span>
        </button>
        <button className="ml-auto hover:text-primary transition-colors">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      {/* Comment Preview */}
      <div className="text-xs text-muted-foreground">
        View all {formatNumber(post.comments)} comments
      </div>
    </div>
  </Card>
);

export default Posts;
