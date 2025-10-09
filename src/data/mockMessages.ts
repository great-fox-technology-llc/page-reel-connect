export interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: string;
  read: boolean;
  type: "text" | "image" | "video" | "voice" | "file";
  mediaUrl?: string;
  fileName?: string;
  fileSize?: string;
  duration?: number;
}

export interface Conversation {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    online: boolean;
    lastSeen: string;
  };
  lastMessage: string;
  timestamp: string;
  unread: number;
  isGroup: boolean;
  messages: Message[];
}

export const mockConversations: Conversation[] = [
  {
    id: "1",
    user: {
      id: "u1",
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      online: true,
      lastSeen: "Online"
    },
    lastMessage: "That sounds great! Let me know when you're ready.",
    timestamp: "2m ago",
    unread: 2,
    isGroup: false,
    messages: [
      {
        id: "m1",
        text: "Hey! How's the project going?",
        sender: "other",
        timestamp: "2024-01-10T10:30:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m2",
        text: "It's going really well! Just finished the designs.",
        sender: "user",
        timestamp: "2024-01-10T10:32:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m3",
        text: "That's awesome! Can you share them with me?",
        sender: "other",
        timestamp: "2024-01-10T10:35:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m4",
        text: "Sure! Here they are:",
        sender: "user",
        timestamp: "2024-01-10T10:36:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m5",
        text: "",
        sender: "user",
        timestamp: "2024-01-10T10:36:30Z",
        read: true,
        type: "image",
        mediaUrl: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=400&h=300&fit=crop"
      },
      {
        id: "m6",
        text: "These look amazing! Love the color scheme.",
        sender: "other",
        timestamp: "2024-01-10T10:38:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m7",
        text: "Thanks! I'm thinking we should meet up to discuss the next steps.",
        sender: "user",
        timestamp: "2024-01-10T10:40:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m8",
        text: "That sounds great! Let me know when you're ready.",
        sender: "other",
        timestamp: "2024-01-10T10:42:00Z",
        read: false,
        type: "text"
      }
    ]
  },
  {
    id: "2",
    user: {
      id: "u2",
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      online: false,
      lastSeen: "Last seen 15m ago"
    },
    lastMessage: "Perfect! Talk to you soon.",
    timestamp: "15m ago",
    unread: 0,
    isGroup: false,
    messages: [
      {
        id: "m9",
        text: "Hey Mike! Quick question about the illustrations.",
        sender: "user",
        timestamp: "2024-01-10T09:30:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m10",
        text: "Sure, what's up?",
        sender: "other",
        timestamp: "2024-01-10T09:32:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m11",
        text: "Can you send me the final versions? Need them for the presentation.",
        sender: "user",
        timestamp: "2024-01-10T09:35:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m12",
        text: "No problem! Sending them now.",
        sender: "other",
        timestamp: "2024-01-10T09:37:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m13",
        text: "Perfect! Talk to you soon.",
        sender: "other",
        timestamp: "2024-01-10T09:40:00Z",
        read: true,
        type: "text"
      }
    ]
  },
  {
    id: "3",
    user: {
      id: "u3",
      name: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      online: true,
      lastSeen: "Online"
    },
    lastMessage: "I'll check it out!",
    timestamp: "1h ago",
    unread: 0,
    isGroup: false,
    messages: [
      {
        id: "m14",
        text: "Emma! Have you seen the new font collection?",
        sender: "user",
        timestamp: "2024-01-10T08:30:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m15",
        text: "Not yet! Where can I find it?",
        sender: "other",
        timestamp: "2024-01-10T08:32:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m16",
        text: "I'll send you the link.",
        sender: "user",
        timestamp: "2024-01-10T08:35:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m17",
        text: "I'll check it out!",
        sender: "other",
        timestamp: "2024-01-10T08:37:00Z",
        read: true,
        type: "text"
      }
    ]
  },
  {
    id: "4",
    user: {
      id: "u4",
      name: "Design Team",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Team",
      online: false,
      lastSeen: "Last seen 2h ago"
    },
    lastMessage: "Alex: Sounds good to me!",
    timestamp: "2h ago",
    unread: 5,
    isGroup: true,
    messages: [
      {
        id: "m18",
        text: "Hey team! Meeting at 3 PM today?",
        sender: "user",
        timestamp: "2024-01-10T07:00:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m19",
        text: "Works for me!",
        sender: "other",
        timestamp: "2024-01-10T07:05:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m20",
        text: "I'm in!",
        sender: "other",
        timestamp: "2024-01-10T07:07:00Z",
        read: true,
        type: "text"
      }
    ]
  },
  {
    id: "5",
    user: {
      id: "u5",
      name: "Lisa Anderson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      online: false,
      lastSeen: "Last seen 3h ago"
    },
    lastMessage: "Thanks for the update!",
    timestamp: "3h ago",
    unread: 0,
    isGroup: false,
    messages: [
      {
        id: "m21",
        text: "Lisa, the video edits look great!",
        sender: "user",
        timestamp: "2024-01-10T06:00:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m22",
        text: "Thank you! Just added the final touches.",
        sender: "other",
        timestamp: "2024-01-10T06:05:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m23",
        text: "Thanks for the update!",
        sender: "other",
        timestamp: "2024-01-10T06:10:00Z",
        read: true,
        type: "text"
      }
    ]
  },
  {
    id: "6",
    user: {
      id: "u6",
      name: "David Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      online: true,
      lastSeen: "Online"
    },
    lastMessage: "Looking forward to it!",
    timestamp: "5h ago",
    unread: 1,
    isGroup: false,
    messages: [
      {
        id: "m24",
        text: "David! Excited about the new course launch?",
        sender: "user",
        timestamp: "2024-01-10T04:00:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m25",
        text: "Absolutely! Can't wait to share it with everyone.",
        sender: "other",
        timestamp: "2024-01-10T04:05:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m26",
        text: "Looking forward to it!",
        sender: "other",
        timestamp: "2024-01-10T04:10:00Z",
        read: false,
        type: "text"
      }
    ]
  },
  {
    id: "7",
    user: {
      id: "u7",
      name: "Sophie Taylor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
      online: false,
      lastSeen: "Last seen yesterday"
    },
    lastMessage: "That would be awesome!",
    timestamp: "1d ago",
    unread: 0,
    isGroup: false,
    messages: [
      {
        id: "m27",
        text: "Sophie, your icons are incredible!",
        sender: "user",
        timestamp: "2024-01-09T10:00:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m28",
        text: "Thank you so much! 😊",
        sender: "other",
        timestamp: "2024-01-09T10:05:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m29",
        text: "We should collaborate on a project sometime!",
        sender: "user",
        timestamp: "2024-01-09T10:10:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m30",
        text: "That would be awesome!",
        sender: "other",
        timestamp: "2024-01-09T10:15:00Z",
        read: true,
        type: "text"
      }
    ]
  },
  {
    id: "8",
    user: {
      id: "u8",
      name: "James Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      online: false,
      lastSeen: "Last seen 2 days ago"
    },
    lastMessage: "Will do!",
    timestamp: "2d ago",
    unread: 0,
    isGroup: false,
    messages: [
      {
        id: "m31",
        text: "James, loved your latest photo series!",
        sender: "user",
        timestamp: "2024-01-08T10:00:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m32",
        text: "Thanks! It was a fun shoot.",
        sender: "other",
        timestamp: "2024-01-08T10:05:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m33",
        text: "Keep up the great work!",
        sender: "user",
        timestamp: "2024-01-08T10:10:00Z",
        read: true,
        type: "text"
      },
      {
        id: "m34",
        text: "Will do!",
        sender: "other",
        timestamp: "2024-01-08T10:12:00Z",
        read: true,
        type: "text"
      }
    ]
  }
];
