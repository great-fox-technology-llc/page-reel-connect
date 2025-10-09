export interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "share" | "order" | "system";
  user?: {
    id: string;
    name: string;
    avatar: string;
  };
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  metadata?: {
    postId?: string;
    orderId?: string;
    amount?: number;
  };
}

export const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    user: {
      id: "u1",
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    message: "liked your post",
    timestamp: "just now",
    read: false,
    actionUrl: "/posts/123",
    metadata: { postId: "123" }
  },
  {
    id: "2",
    type: "comment",
    user: {
      id: "u2",
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
    },
    message: "commented on your post: \"This looks amazing!\"",
    timestamp: "2m ago",
    read: false,
    actionUrl: "/posts/124",
    metadata: { postId: "124" }
  },
  {
    id: "3",
    type: "follow",
    user: {
      id: "u3",
      name: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
    },
    message: "started following you",
    timestamp: "5m ago",
    read: true,
    actionUrl: "/profile/emma"
  },
  {
    id: "4",
    type: "share",
    user: {
      id: "u4",
      name: "Alex Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    message: "shared your reel",
    timestamp: "12m ago",
    read: true,
    actionUrl: "/reels/456",
    metadata: { postId: "456" }
  },
  {
    id: "5",
    type: "order",
    message: "New order received for \"Design Course Bundle\" - $149.00",
    timestamp: "15m ago",
    read: false,
    actionUrl: "/orders/ORD-2024-009",
    metadata: { orderId: "ORD-2024-009", amount: 149 }
  },
  {
    id: "6",
    type: "like",
    user: {
      id: "u5",
      name: "Lisa Anderson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa"
    },
    message: "liked your story",
    timestamp: "26m ago",
    read: true,
    actionUrl: "/stories/789"
  },
  {
    id: "7",
    type: "comment",
    user: {
      id: "u6",
      name: "David Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
    },
    message: "replied to your comment",
    timestamp: "1h ago",
    read: true,
    actionUrl: "/posts/125"
  },
  {
    id: "8",
    type: "follow",
    user: {
      id: "u7",
      name: "Sophie Taylor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie"
    },
    message: "started following you",
    timestamp: "2h ago",
    read: true,
    actionUrl: "/profile/sophie"
  },
  {
    id: "9",
    type: "system",
    message: "Your profile backup completed successfully",
    timestamp: "3h ago",
    read: true,
    actionUrl: "/settings"
  },
  {
    id: "10",
    type: "like",
    user: {
      id: "u8",
      name: "James Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
    },
    message: "and 12 others liked your post",
    timestamp: "4h ago",
    read: true,
    actionUrl: "/posts/126",
    metadata: { postId: "126" }
  },
  {
    id: "11",
    type: "comment",
    user: {
      id: "u9",
      name: "Rachel Green",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel"
    },
    message: "commented on your reel",
    timestamp: "5h ago",
    read: true,
    actionUrl: "/reels/457"
  },
  {
    id: "12",
    type: "system",
    message: "Domain renewal due in 7 days",
    timestamp: "5h ago",
    read: false,
    actionUrl: "/settings/billing"
  },
  {
    id: "13",
    type: "share",
    user: {
      id: "u10",
      name: "Chris Evans",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris"
    },
    message: "shared your post with their followers",
    timestamp: "6h ago",
    read: true,
    actionUrl: "/posts/127"
  },
  {
    id: "14",
    type: "order",
    message: "Payment of $79.99 received for order #ORD-2024-008",
    timestamp: "8h ago",
    read: true,
    actionUrl: "/orders/ORD-2024-008",
    metadata: { orderId: "ORD-2024-008", amount: 79.99 }
  },
  {
    id: "15",
    type: "follow",
    user: {
      id: "u11",
      name: "Anna Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna"
    },
    message: "started following you",
    timestamp: "9h ago",
    read: true,
    actionUrl: "/profile/anna"
  },
  {
    id: "16",
    type: "system",
    message: "Monthly analytics report ready for download",
    timestamp: "10h ago",
    read: true,
    actionUrl: "/analytics"
  },
  {
    id: "17",
    type: "like",
    user: {
      id: "u12",
      name: "Tom Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom"
    },
    message: "liked your story",
    timestamp: "12h ago",
    read: true,
    actionUrl: "/stories/790"
  },
  {
    id: "18",
    type: "comment",
    user: {
      id: "u13",
      name: "Jessica Taylor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica"
    },
    message: "mentioned you in a comment",
    timestamp: "1d ago",
    read: true,
    actionUrl: "/posts/128"
  },
  {
    id: "19",
    type: "share",
    user: {
      id: "u14",
      name: "Daniel Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel"
    },
    message: "shared your reel",
    timestamp: "1d ago",
    read: true,
    actionUrl: "/reels/458"
  },
  {
    id: "20",
    type: "follow",
    user: {
      id: "u15",
      name: "Olivia Harris",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia"
    },
    message: "started following you",
    timestamp: "2d ago",
    read: true,
    actionUrl: "/profile/olivia"
  },
  {
    id: "21",
    type: "order",
    message: "New order received for \"3D Asset Library\" - $89.99",
    timestamp: "2d ago",
    read: true,
    actionUrl: "/orders/ORD-2024-007",
    metadata: { orderId: "ORD-2024-007", amount: 89.99 }
  },
  {
    id: "22",
    type: "like",
    user: {
      id: "u16",
      name: "Ryan Cooper",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan"
    },
    message: "and 45 others liked your post",
    timestamp: "3d ago",
    read: true,
    actionUrl: "/posts/129"
  },
  {
    id: "23",
    type: "system",
    message: "Your account security settings were updated",
    timestamp: "3d ago",
    read: true,
    actionUrl: "/settings/security"
  },
  {
    id: "24",
    type: "comment",
    user: {
      id: "u17",
      name: "Maya Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya"
    },
    message: "commented on your post: \"Great work!\"",
    timestamp: "4d ago",
    read: true,
    actionUrl: "/posts/130"
  },
  {
    id: "25",
    type: "follow",
    user: {
      id: "u18",
      name: "Kevin Zhang",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin"
    },
    message: "started following you",
    timestamp: "5d ago",
    read: true,
    actionUrl: "/profile/kevin"
  },
  {
    id: "26",
    type: "share",
    user: {
      id: "u19",
      name: "Isabella Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella"
    },
    message: "shared your story",
    timestamp: "6d ago",
    read: true,
    actionUrl: "/stories/791"
  },
  {
    id: "27",
    type: "order",
    message: "Product review received - 5 stars for \"Modern UI Kit Pro\"",
    timestamp: "7d ago",
    read: true,
    actionUrl: "/products/1"
  },
  {
    id: "28",
    type: "system",
    message: "Weekly performance summary is available",
    timestamp: "7d ago",
    read: true,
    actionUrl: "/analytics"
  }
];
