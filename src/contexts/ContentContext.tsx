import { createContext, useContext, ReactNode } from 'react';

export type User = {
  id: string;
  name: string;
  avatar: string;
  handle: string;
  verified?: boolean;
};

export type Media = {
  id: string;
  type: 'image' | 'video';
  url: string;
  aspect?: '1:1' | '4:5' | '16:9' | '9:16';
  thumbnail?: string;
  durationSec?: number;
};

export type Post = {
  id: string;
  author: User;
  caption: string;
  media?: Media[];
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  tags?: string[];
  location?: string;
};

export type Story = {
  id: string;
  author: User;
  media: Media;
  isLive?: boolean;
  views: number;
  createdAt: string;
  expiresAt: string;
  category?: string;
};

export type Reel = {
  id: string;
  author: User;
  media: Media & { type: 'video'; aspect: '9:16' };
  likes: number;
  comments: number;
  shares: number;
  views: number;
  createdAt: string;
  hashtags?: string[];
};

// Demo users
const demoUsers: User[] = [
  { id: '1', name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', handle: '@sarahchen', verified: true },
  { id: '2', name: 'Marcus Rivera', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', handle: '@marcusrivera', verified: true },
  { id: '3', name: 'Aisha Patel', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha', handle: '@aishapatel', verified: false },
  { id: '4', name: 'Jake Thompson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jake', handle: '@jakethompson', verified: true },
  { id: '5', name: 'Elena Volkov', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', handle: '@elenavolkov', verified: false },
  { id: '6', name: 'David Kim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', handle: '@davidkim', verified: true },
  { id: '7', name: 'Olivia Martinez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia', handle: '@oliviamartinez', verified: false },
  { id: '8', name: 'Ryan Foster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan', handle: '@ryanfoster', verified: true },
];

// Demo posts
const demoPosts: Post[] = [
  {
    id: 'p1',
    author: demoUsers[0],
    caption: 'Beautiful sunset from my studio window 🌅 #photography #sunset #goldenhour',
    media: [{ id: 'm1', type: 'image', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', aspect: '16:9' }],
    likes: 2341,
    comments: 89,
    shares: 23,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    tags: ['photography', 'sunset', 'goldenhour'],
    location: 'San Francisco, CA'
  },
  {
    id: 'p2',
    author: demoUsers[1],
    caption: 'New artwork dropping tomorrow! Stay tuned 🎨✨',
    media: [{ id: 'm2', type: 'image', url: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800', aspect: '4:5' }],
    likes: 5672,
    comments: 234,
    shares: 89,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    tags: ['art', 'design', 'creative'],
  },
  {
    id: 'p3',
    author: demoUsers[2],
    caption: 'Morning coffee and code ☕💻 Perfect way to start the day!',
    media: [{ id: 'm3', type: 'image', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800', aspect: '1:1' }],
    likes: 1234,
    comments: 45,
    shares: 12,
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    tags: ['coding', 'developer', 'coffee'],
  },
  {
    id: 'p4',
    author: demoUsers[3],
    caption: 'Travel goals 2025 ✈️🌍 Where should I go next?',
    media: [{ id: 'm4', type: 'image', url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800', aspect: '16:9' }],
    likes: 8901,
    comments: 456,
    shares: 123,
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    tags: ['travel', 'adventure', 'wanderlust'],
    location: 'Bali, Indonesia'
  },
  {
    id: 'p5',
    author: demoUsers[4],
    caption: 'Healthy living starts with small changes 🥗💪',
    media: [{ id: 'm5', type: 'image', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', aspect: '4:5' }],
    likes: 3456,
    comments: 167,
    shares: 45,
    createdAt: new Date(Date.now() - 18000000).toISOString(),
    tags: ['health', 'fitness', 'wellness'],
  },
  {
    id: 'p6',
    author: demoUsers[5],
    caption: 'Tech setup tour 🖥️ Link in bio for full breakdown!',
    media: [{ id: 'm6', type: 'image', url: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800', aspect: '16:9' }],
    likes: 12345,
    comments: 678,
    shares: 234,
    createdAt: new Date(Date.now() - 21600000).toISOString(),
    tags: ['tech', 'setup', 'productivity'],
  },
  {
    id: 'p7',
    author: demoUsers[6],
    caption: 'Fashion is art you live your life in 👗✨',
    media: [{ id: 'm7', type: 'image', url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800', aspect: '4:5' }],
    likes: 6789,
    comments: 234,
    shares: 89,
    createdAt: new Date(Date.now() - 25200000).toISOString(),
    tags: ['fashion', 'style', 'ootd'],
  },
  {
    id: 'p8',
    author: demoUsers[7],
    caption: 'Weekend vibes 🎵🎧 New playlist out now!',
    media: [{ id: 'm8', type: 'image', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800', aspect: '1:1' }],
    likes: 4567,
    comments: 123,
    shares: 56,
    createdAt: new Date(Date.now() - 28800000).toISOString(),
    tags: ['music', 'weekend', 'vibes'],
  },
];

// Demo stories
const demoStories: Story[] = [
  {
    id: 's1',
    author: demoUsers[0],
    media: { id: 'sm1', type: 'image', url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400', aspect: '9:16' },
    isLive: true,
    views: 1234,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    expiresAt: new Date(Date.now() + 84600000).toISOString(),
    category: 'Trending'
  },
  {
    id: 's2',
    author: demoUsers[1],
    media: { id: 'sm2', type: 'image', url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400', aspect: '9:16' },
    isLive: true,
    views: 2345,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    expiresAt: new Date(Date.now() + 82800000).toISOString(),
    category: 'Art'
  },
  {
    id: 's3',
    author: demoUsers[2],
    media: { id: 'sm3', type: 'image', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400', aspect: '9:16' },
    views: 5678,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    expiresAt: new Date(Date.now() + 79200000).toISOString(),
    category: 'Tech'
  },
  {
    id: 's4',
    author: demoUsers[3],
    media: { id: 'sm4', type: 'image', url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400', aspect: '9:16' },
    views: 8901,
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    expiresAt: new Date(Date.now() + 75600000).toISOString(),
    category: 'Photography'
  },
  {
    id: 's5',
    author: demoUsers[4],
    media: { id: 'sm5', type: 'image', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', aspect: '9:16' },
    views: 3456,
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    expiresAt: new Date(Date.now() + 72000000).toISOString(),
    category: 'Music'
  },
  {
    id: 's6',
    author: demoUsers[5],
    media: { id: 'sm6', type: 'image', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400', aspect: '9:16' },
    views: 6789,
    createdAt: new Date(Date.now() - 18000000).toISOString(),
    expiresAt: new Date(Date.now() + 68400000).toISOString(),
    category: 'Tutorial'
  },
  {
    id: 's7',
    author: demoUsers[6],
    media: { id: 'sm7', type: 'image', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400', aspect: '9:16' },
    views: 4321,
    createdAt: new Date(Date.now() - 21600000).toISOString(),
    expiresAt: new Date(Date.now() + 64800000).toISOString(),
    category: 'Gaming'
  },
  {
    id: 's8',
    author: demoUsers[7],
    media: { id: 'sm8', type: 'image', url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400', aspect: '9:16' },
    views: 7890,
    createdAt: new Date(Date.now() - 25200000).toISOString(),
    expiresAt: new Date(Date.now() + 61200000).toISOString(),
    category: 'Tech'
  },
];

// Demo reels
const demoReels: Reel[] = [
  {
    id: 'r1',
    author: demoUsers[0],
    media: { id: 'rm1', type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', aspect: '9:16', thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400', durationSec: 15 },
    likes: 45678,
    comments: 1234,
    shares: 567,
    views: 234567,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    hashtags: ['design', 'creative', 'trending']
  },
  {
    id: 'r2',
    author: demoUsers[1],
    media: { id: 'rm2', type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', aspect: '9:16', thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400', durationSec: 22 },
    likes: 67890,
    comments: 2345,
    shares: 890,
    views: 456789,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    hashtags: ['tutorial', 'tech', 'coding']
  },
  {
    id: 'r3',
    author: demoUsers[2],
    media: { id: 'rm3', type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', aspect: '9:16', thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400', durationSec: 18 },
    likes: 34567,
    comments: 890,
    shares: 345,
    views: 178901,
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    hashtags: ['creative', 'art', 'design']
  },
  {
    id: 'r4',
    author: demoUsers[3],
    media: { id: 'rm4', type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', aspect: '9:16', thumbnail: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400', durationSec: 25 },
    likes: 89012,
    comments: 3456,
    shares: 1234,
    views: 567890,
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    hashtags: ['travel', 'adventure', 'explore']
  },
  {
    id: 'r5',
    author: demoUsers[4],
    media: { id: 'rm5', type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', aspect: '9:16', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400', durationSec: 20 },
    likes: 23456,
    comments: 678,
    shares: 234,
    views: 123456,
    createdAt: new Date(Date.now() - 18000000).toISOString(),
    hashtags: ['fitness', 'health', 'motivation']
  },
  {
    id: 'r6',
    author: demoUsers[5],
    media: { id: 'rm6', type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', aspect: '9:16', thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400', durationSec: 30 },
    likes: 56789,
    comments: 1890,
    shares: 678,
    views: 345678,
    createdAt: new Date(Date.now() - 21600000).toISOString(),
    hashtags: ['tech', 'gadgets', 'review']
  },
  {
    id: 'r7',
    author: demoUsers[6],
    media: { id: 'rm7', type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', aspect: '9:16', thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400', durationSec: 16 },
    likes: 78901,
    comments: 2890,
    shares: 901,
    views: 456789,
    createdAt: new Date(Date.now() - 25200000).toISOString(),
    hashtags: ['fashion', 'style', 'trending']
  },
  {
    id: 'r8',
    author: demoUsers[7],
    media: { id: 'rm8', type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', aspect: '9:16', thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400', durationSec: 28 },
    likes: 45678,
    comments: 1567,
    shares: 567,
    views: 289012,
    createdAt: new Date(Date.now() - 28800000).toISOString(),
    hashtags: ['music', 'production', 'creative']
  },
  {
    id: 'r9',
    author: demoUsers[0],
    media: { id: 'rm9', type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4', aspect: '9:16', thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400', durationSec: 19 },
    likes: 34567,
    comments: 901,
    shares: 345,
    views: 178901,
    createdAt: new Date(Date.now() - 32400000).toISOString(),
    hashtags: ['cars', 'review', 'auto']
  },
];

type ContentContextType = {
  posts: Post[];
  stories: Story[];
  reels: Reel[];
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ContentContext.Provider value={{ posts: demoPosts, stories: demoStories, reels: demoReels }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
};
