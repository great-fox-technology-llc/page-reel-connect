export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    name: string;
    email: string;
  };
  items: {
    id: string;
    name: string;
    thumbnail: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "completed" | "refunded" | "cancelled";
  paymentMethod: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  trackingNumber?: string;
}

export const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    date: "2024-01-10T10:30:00Z",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com"
    },
    items: [
      {
        id: "1",
        name: "Modern UI Kit Pro",
        thumbnail: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=100&h=100&fit=crop",
        quantity: 1,
        price: 49.99
      },
      {
        id: "3",
        name: "Premium Font Bundle",
        thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop",
        quantity: 1,
        price: 39.99
      }
    ],
    subtotal: 89.98,
    tax: 7.20,
    shipping: 0,
    total: 97.18,
    status: "completed",
    paymentMethod: "Credit Card (****4242)",
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA"
    },
    trackingNumber: "1Z999AA10123456784"
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    date: "2024-01-09T14:15:00Z",
    customer: {
      name: "Jane Smith",
      email: "jane.smith@example.com"
    },
    items: [
      {
        id: "5",
        name: "Video Templates Pack",
        thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=100&h=100&fit=crop",
        quantity: 1,
        price: 79.99
      }
    ],
    subtotal: 79.99,
    tax: 6.40,
    shipping: 0,
    total: 86.39,
    status: "processing",
    paymentMethod: "PayPal",
    shippingAddress: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA"
    }
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    date: "2024-01-08T09:45:00Z",
    customer: {
      name: "Mike Johnson",
      email: "mike.j@example.com"
    },
    items: [
      {
        id: "6",
        name: "Complete Design Course",
        thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop",
        quantity: 1,
        price: 149.99
      }
    ],
    subtotal: 149.99,
    tax: 12.00,
    shipping: 0,
    total: 161.99,
    status: "completed",
    paymentMethod: "Credit Card (****8888)",
    shippingAddress: {
      street: "789 Pine Rd",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      country: "USA"
    }
  },
  {
    id: "4",
    orderNumber: "ORD-2024-004",
    date: "2024-01-07T16:20:00Z",
    customer: {
      name: "Sarah Williams",
      email: "sarah.w@example.com"
    },
    items: [
      {
        id: "11",
        name: "Social Media Templates",
        thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=100&h=100&fit=crop",
        quantity: 2,
        price: 24.99
      }
    ],
    subtotal: 49.98,
    tax: 4.00,
    shipping: 0,
    total: 53.98,
    status: "shipped",
    paymentMethod: "Credit Card (****1234)",
    shippingAddress: {
      street: "321 Elm St",
      city: "Boston",
      state: "MA",
      zip: "02101",
      country: "USA"
    },
    trackingNumber: "1Z999AA10123456789"
  },
  {
    id: "5",
    orderNumber: "ORD-2024-005",
    date: "2024-01-06T11:30:00Z",
    customer: {
      name: "David Brown",
      email: "david.b@example.com"
    },
    items: [
      {
        id: "9",
        name: "3D Asset Library",
        thumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=100&h=100&fit=crop",
        quantity: 1,
        price: 89.99
      }
    ],
    subtotal: 89.99,
    tax: 7.20,
    shipping: 0,
    total: 97.19,
    status: "pending",
    paymentMethod: "Apple Pay",
    shippingAddress: {
      street: "654 Maple Dr",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "USA"
    }
  },
  {
    id: "6",
    orderNumber: "ORD-2024-006",
    date: "2024-01-05T13:10:00Z",
    customer: {
      name: "Emily Davis",
      email: "emily.d@example.com"
    },
    items: [
      {
        id: "2",
        name: "Digital Art Collection",
        thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop",
        quantity: 1,
        price: 29.99
      },
      {
        id: "7",
        name: "Minimalist Icons Set",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop",
        quantity: 1,
        price: 19.99
      }
    ],
    subtotal: 49.98,
    tax: 4.00,
    shipping: 0,
    total: 53.98,
    status: "completed",
    paymentMethod: "Google Pay",
    shippingAddress: {
      street: "987 Cedar Ln",
      city: "Austin",
      state: "TX",
      zip: "73301",
      country: "USA"
    }
  },
  {
    id: "7",
    orderNumber: "ORD-2024-007",
    date: "2024-01-04T15:45:00Z",
    customer: {
      name: "Chris Wilson",
      email: "chris.w@example.com"
    },
    items: [
      {
        id: "4",
        name: "Cinematic Audio Pack",
        thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=100&h=100&fit=crop",
        quantity: 1,
        price: 59.99
      }
    ],
    subtotal: 59.99,
    tax: 4.80,
    shipping: 0,
    total: 64.79,
    status: "refunded",
    paymentMethod: "Credit Card (****5678)",
    shippingAddress: {
      street: "147 Birch Ave",
      city: "Miami",
      state: "FL",
      zip: "33101",
      country: "USA"
    }
  },
  {
    id: "8",
    orderNumber: "ORD-2024-008",
    date: "2024-01-03T08:20:00Z",
    customer: {
      name: "Lisa Martinez",
      email: "lisa.m@example.com"
    },
    items: [
      {
        id: "12",
        name: "Website Builder Templates",
        thumbnail: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=100&h=100&fit=crop",
        quantity: 1,
        price: 69.99
      },
      {
        id: "8",
        name: "Photography Presets",
        thumbnail: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=100&h=100&fit=crop",
        quantity: 1,
        price: 34.99
      }
    ],
    subtotal: 104.98,
    tax: 8.40,
    shipping: 0,
    total: 113.38,
    status: "completed",
    paymentMethod: "Credit Card (****9012)",
    shippingAddress: {
      street: "258 Spruce St",
      city: "Denver",
      state: "CO",
      zip: "80201",
      country: "USA"
    }
  }
];
