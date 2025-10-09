import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { useContent, Reel } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Play, Heart, MessageCircle, Share2, Bookmark, Eye, TrendingUp, X, ChevronUp, ChevronDown, Volume2, CheckCircle2, BarChart3 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Reels = () => {
  const { reels } = useContent();
  const [selectedTab, setSelectedTab] = useState<string>('foryou');
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const tabs = ['foryou', 'following', 'design', 'tutorial', 'creative', 'tech', 'trending'];
  
  const filteredReels = selectedTab === 'foryou' || selectedTab === 'following'
    ? reels
    : reels.filter(r => r.hashtags?.some(h => h.toLowerCase() === selectedTab.toLowerCase()));

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
  };

  const openViewer = (reel: Reel, index: number) => {
    setSelectedReel(reel);
    setCurrentIndex(index);
  };

  const navigateReel = (direction: 'up' | 'down') => {
    const newIndex = direction === 'up' 
      ? Math.max(0, currentIndex - 1)
      : Math.min(filteredReels.length - 1, currentIndex + 1);
    
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      setSelectedReel(filteredReels[newIndex]);
    }
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">Reels</h1>
              <p className="text-muted-foreground">Watch and create short-form videos</p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Reel
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Reel</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-sm text-muted-foreground">Upload a vertical video (9:16 aspect ratio, max 90 seconds)</p>
                  <input type="file" accept="video/*" />
                  <Button className="w-full">Upload Reel</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Tabs */}
          <div className="mb-6 overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              {tabs.map((tab) => (
                <Badge
                  key={tab}
                  variant={selectedTab === tab ? 'default' : 'secondary'}
                  className="cursor-pointer px-4 py-2 capitalize"
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab === 'foryou' ? 'For You' : tab}
                </Badge>
              ))}
            </div>
          </div>

          {/* Analytics Banner */}
          <Card className="p-6 mb-6 bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Your Reels Performance</h3>
                <p className="text-sm text-muted-foreground">Total reach across all your reels</p>
              </div>
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">1.2M</div>
                  <div className="text-xs text-muted-foreground">Total Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">89K</div>
                  <div className="text-xs text-muted-foreground">Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">12K</div>
                  <div className="text-xs text-muted-foreground">Comments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">5.6K</div>
                  <div className="text-xs text-muted-foreground">Shares</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Reels Grid */}
          {filteredReels.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Play className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No reels yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start creating engaging short videos to grow your audience!
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <Card className="p-4 text-left">
                    <h4 className="font-semibold mb-2">Keep it Short</h4>
                    <p className="text-xs text-muted-foreground">15-30 seconds is the sweet spot for engagement</p>
                  </Card>
                  <Card className="p-4 text-left">
                    <h4 className="font-semibold mb-2">Use Trending Hashtags</h4>
                    <p className="text-xs text-muted-foreground">Help people discover your content</p>
                  </Card>
                  <Card className="p-4 text-left">
                    <h4 className="font-semibold mb-2">Hook Early</h4>
                    <p className="text-xs text-muted-foreground">Grab attention in the first 3 seconds</p>
                  </Card>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Create Your First Reel</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Reel</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <p className="text-sm text-muted-foreground">Upload a vertical video (9:16 aspect ratio, max 90 seconds)</p>
                      <input type="file" accept="video/*" />
                      <Button className="w-full">Upload Reel</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredReels.map((reel, index) => (
                <ReelCard 
                  key={reel.id} 
                  reel={reel} 
                  formatNumber={formatNumber} 
                  formatDuration={formatDuration}
                  onClick={() => openViewer(reel, index)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Full-Screen Viewer */}
      {selectedReel && (
        <ReelViewer 
          reel={selectedReel}
          onClose={() => setSelectedReel(null)}
          onNavigate={navigateReel}
          canGoUp={currentIndex > 0}
          canGoDown={currentIndex < filteredReels.length - 1}
          formatNumber={formatNumber}
          formatDuration={formatDuration}
        />
      )}
    </div>
  );
};

const ReelCard = ({ 
  reel, 
  formatNumber, 
  formatDuration,
  onClick 
}: { 
  reel: Reel; 
  formatNumber: (n: number) => string; 
  formatDuration: (s: number) => string;
  onClick: () => void;
}) => (
  <div 
    className="group cursor-pointer relative aspect-[9/16] rounded-lg overflow-hidden bg-muted"
    onClick={onClick}
  >
    <img 
      src={reel.media.thumbnail || reel.media.url} 
      alt="Reel thumbnail"
      className="w-full h-full object-cover transition-transform group-hover:scale-105"
    />
    
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
    
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
        <Play className="w-6 h-6 text-primary ml-1" />
      </div>
    </div>

    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
      {formatDuration(reel.media.durationSec || 0)}
    </div>

    <div className="absolute bottom-0 left-0 right-0 p-3">
      <div className="flex items-center gap-2 mb-2">
        <Avatar className="w-6 h-6 border border-white">
          <AvatarImage src={reel.author.avatar} />
          <AvatarFallback>{reel.author.name[0]}</AvatarFallback>
        </Avatar>
        <span className="text-xs font-semibold text-white truncate">{reel.author.name}</span>
        {reel.author.verified && <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />}
      </div>
      
      <div className="flex items-center gap-3 text-xs text-white/90">
        <span className="flex items-center gap-1">
          <Eye className="w-3 h-3" />
          {formatNumber(reel.views)}
        </span>
        <span className="flex items-center gap-1">
          <Heart className="w-3 h-3" />
          {formatNumber(reel.likes)}
        </span>
      </div>
    </div>
  </div>
);

const ReelViewer = ({ 
  reel, 
  onClose, 
  onNavigate,
  canGoUp,
  canGoDown,
  formatNumber,
  formatDuration
}: { 
  reel: Reel; 
  onClose: () => void; 
  onNavigate: (dir: 'up' | 'down') => void;
  canGoUp: boolean;
  canGoDown: boolean;
  formatNumber: (n: number) => string;
  formatDuration: (s: number) => string;
}) => (
  <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
    <button 
      onClick={onClose}
      className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center transition-colors"
    >
      <X className="w-5 h-5 text-white" />
    </button>

    <div className="relative w-full max-w-md h-full">
      {/* Video */}
      <video 
        src={reel.media.url}
        poster={reel.media.thumbnail}
        className="w-full h-full object-contain"
        controls
        autoPlay
        loop
      />

      {/* Author Info */}
      <div className="absolute bottom-20 left-4 right-20">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-10 h-10 border-2 border-white">
            <AvatarImage src={reel.author.avatar} />
            <AvatarFallback>{reel.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-white">{reel.author.name}</span>
              {reel.author.verified && <CheckCircle2 className="w-4 h-4 text-primary" />}
            </div>
            <span className="text-xs text-white/80">{reel.author.handle}</span>
          </div>
          <Button size="sm" className="ml-auto">Follow</Button>
        </div>
        
        {reel.hashtags && (
          <div className="flex flex-wrap gap-2 mb-2">
            {reel.hashtags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-4 text-sm text-white/90">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {formatNumber(reel.views)}
          </span>
          <span>•</span>
          <span>{formatDuration(reel.media.durationSec || 0)}</span>
        </div>
      </div>

      {/* Action Stack */}
      <div className="absolute bottom-20 right-4 flex flex-col gap-4">
        <button className="flex flex-col items-center gap-1 text-white hover:text-primary transition-colors">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium">{formatNumber(reel.likes)}</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-white hover:text-primary transition-colors">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium">{formatNumber(reel.comments)}</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-white hover:text-primary transition-colors">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center">
            <Share2 className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium">{formatNumber(reel.shares)}</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-white hover:text-primary transition-colors">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center">
            <Bookmark className="w-6 h-6" />
          </div>
        </button>
      </div>

      {/* Navigation */}
      <div className="absolute top-1/2 -translate-y-1/2 right-4 flex flex-col gap-2">
        <button
          onClick={() => onNavigate('up')}
          disabled={!canGoUp}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
        <button
          onClick={() => onNavigate('down')}
          disabled={!canGoDown}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
);

export default Reels;
