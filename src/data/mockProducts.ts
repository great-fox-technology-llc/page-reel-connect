export interface Product {
  id: string;
  title: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
  };
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  downloads: number;
  thumbnail: string;
  images: string[];
  tags: string[];
  description: string;
  isBestSeller?: boolean;
  isNew?: boolean;
  isPro?: boolean;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Modern UI Kit Pro",
    author: {
      id: "a1",
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      verified: true
    },
    category: "Templates",
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.9,
    reviews: 847,
    downloads: 3420,
    thumbnail: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=400&h=300&fit=crop",
    images: ["https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&h=600&fit=crop"],
    tags: ["Best Seller", "Pro"],
    description: "Complete UI kit with 200+ components",
    isBestSeller: true,
    isPro: true
  },
  {
    id: "2",
    title: "Digital Art Collection",
    author: {
      id: "a2",
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      verified: true
    },
    category: "Digital Art",
    price: 29.99,
    rating: 4.8,
    reviews: 624,
    downloads: 2890,
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    images: ["https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop"],
    tags: ["New"],
    description: "50 unique digital artworks",
    isNew: true
  },
  {
    id: "3",
    title: "Premium Font Bundle",
    author: {
      id: "a3",
      name: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      verified: false
    },
    category: "Fonts",
    price: 39.99,
    rating: 4.7,
    reviews: 512,
    downloads: 4120,
    thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"],
    tags: ["Best Seller"],
    description: "12 professional font families",
    isBestSeller: true
  },
  {
    id: "4",
    title: "Cinematic Audio Pack",
    author: {
      id: "a4",
      name: "Alex Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      verified: true
    },
    category: "Audio",
    price: 59.99,
    rating: 5.0,
    reviews: 342,
    downloads: 1890,
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop",
    images: ["https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop"],
    tags: ["Pro"],
    description: "100+ cinematic sound effects and music tracks",
    isPro: true
  },
  {
    id: "5",
    title: "Video Templates Pack",
    author: {
      id: "a5",
      name: "Lisa Anderson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      verified: true
    },
    category: "Video",
    price: 79.99,
    rating: 4.9,
    reviews: 728,
    downloads: 2340,
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop",
    images: ["https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop"],
    tags: ["Best Seller", "Pro"],
    description: "50 motion graphics templates",
    isBestSeller: true,
    isPro: true
  },
  {
    id: "6",
    title: "Complete Design Course",
    author: {
      id: "a6",
      name: "David Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      verified: true
    },
    category: "Courses",
    price: 149.99,
    rating: 4.8,
    reviews: 1240,
    downloads: 5670,
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    images: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"],
    tags: ["Best Seller"],
    description: "20-hour comprehensive design course",
    isBestSeller: true
  },
  {
    id: "7",
    title: "Minimalist Icons Set",
    author: {
      id: "a7",
      name: "Sophie Taylor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
      verified: false
    },
    category: "Digital Art",
    price: 19.99,
    rating: 4.6,
    reviews: 432,
    downloads: 6780,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    images: ["https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop"],
    tags: ["New"],
    description: "500+ minimalist vector icons",
    isNew: true
  },
  {
    id: "8",
    title: "Photography Presets",
    author: {
      id: "a8",
      name: "James Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      verified: true
    },
    category: "Templates",
    price: 34.99,
    rating: 4.7,
    reviews: 892,
    downloads: 4520,
    thumbnail: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop",
    images: ["https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop"],
    tags: [],
    description: "30 professional Lightroom presets"
  },
  {
    id: "9",
    title: "3D Asset Library",
    author: {
      id: "a9",
      name: "Rachel Green",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel",
      verified: true
    },
    category: "Digital Art",
    price: 89.99,
    rating: 4.9,
    reviews: 567,
    downloads: 2130,
    thumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=300&fit=crop",
    images: ["https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&h=600&fit=crop"],
    tags: ["Pro"],
    description: "100+ high-quality 3D models",
    isPro: true
  },
  {
    id: "10",
    title: "Branding Template Pack",
    author: {
      id: "a10",
      name: "Chris Evans",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris",
      verified: false
    },
    category: "Templates",
    price: 44.99,
    rating: 4.5,
    reviews: 321,
    downloads: 1890,
    thumbnail: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&h=300&fit=crop",
    images: ["https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop"],
    tags: ["New"],
    description: "Complete branding kit with logos and guidelines",
    isNew: true
  },
  {
    id: "11",
    title: "Social Media Templates",
    author: {
      id: "a11",
      name: "Anna Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
      verified: true
    },
    category: "Templates",
    price: 24.99,
    rating: 4.8,
    reviews: 1450,
    downloads: 8920,
    thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=300&fit=crop",
    images: ["https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop"],
    tags: ["Best Seller"],
    description: "200+ social media post templates",
    isBestSeller: true
  },
  {
    id: "12",
    title: "Website Builder Templates",
    author: {
      id: "a12",
      name: "Tom Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
      verified: true
    },
    category: "Templates",
    price: 69.99,
    rating: 4.9,
    reviews: 982,
    downloads: 3450,
    thumbnail: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
    images: ["https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop"],
    tags: ["Best Seller", "Pro"],
    description: "15 complete website templates",
    isBestSeller: true,
    isPro: true
  }
];
