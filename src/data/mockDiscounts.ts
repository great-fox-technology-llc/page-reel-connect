export interface Discount {
  id: string;
  code: string;
  type: "percentage" | "fixed" | "free_shipping";
  value: number;
  minOrder: number;
  usageLimit: number;
  usageCount: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
}

export const mockDiscounts: Discount[] = [
  {
    id: "1",
    code: "WELCOME20",
    type: "percentage",
    value: 20,
    minOrder: 0,
    usageLimit: 1000,
    usageCount: 847,
    validFrom: "2024-01-01T00:00:00Z",
    validTo: "2024-12-31T23:59:59Z",
    isActive: true
  },
  {
    id: "2",
    code: "SAVE50",
    type: "fixed",
    value: 50,
    minOrder: 200,
    usageLimit: 500,
    usageCount: 342,
    validFrom: "2024-01-01T00:00:00Z",
    validTo: "2024-06-30T23:59:59Z",
    isActive: true
  },
  {
    id: "3",
    code: "FREESHIP",
    type: "free_shipping",
    value: 0,
    minOrder: 50,
    usageLimit: 2000,
    usageCount: 1567,
    validFrom: "2024-01-01T00:00:00Z",
    validTo: "2024-12-31T23:59:59Z",
    isActive: true
  },
  {
    id: "4",
    code: "SUMMER25",
    type: "percentage",
    value: 25,
    minOrder: 100,
    usageLimit: 300,
    usageCount: 289,
    validFrom: "2024-06-01T00:00:00Z",
    validTo: "2024-08-31T23:59:59Z",
    isActive: true
  },
  {
    id: "5",
    code: "NEWUSER15",
    type: "percentage",
    value: 15,
    minOrder: 0,
    usageLimit: 5000,
    usageCount: 3421,
    validFrom: "2024-01-01T00:00:00Z",
    validTo: "2024-12-31T23:59:59Z",
    isActive: true
  },
  {
    id: "6",
    code: "VIP100",
    type: "fixed",
    value: 100,
    minOrder: 500,
    usageLimit: 100,
    usageCount: 78,
    validFrom: "2024-01-01T00:00:00Z",
    validTo: "2024-12-31T23:59:59Z",
    isActive: true
  },
  {
    id: "7",
    code: "EXPIRED10",
    type: "percentage",
    value: 10,
    minOrder: 0,
    usageLimit: 1000,
    usageCount: 892,
    validFrom: "2023-01-01T00:00:00Z",
    validTo: "2023-12-31T23:59:59Z",
    isActive: false
  },
  {
    id: "8",
    code: "FLASH30",
    type: "percentage",
    value: 30,
    minOrder: 150,
    usageLimit: 200,
    usageCount: 156,
    validFrom: "2024-01-15T00:00:00Z",
    validTo: "2024-01-17T23:59:59Z",
    isActive: false
  },
  {
    id: "9",
    code: "BUNDLE40",
    type: "percentage",
    value: 40,
    minOrder: 300,
    usageLimit: 150,
    usageCount: 89,
    validFrom: "2024-01-01T00:00:00Z",
    validTo: "2024-03-31T23:59:59Z",
    isActive: true
  },
  {
    id: "10",
    code: "LOYALTY25",
    type: "fixed",
    value: 25,
    minOrder: 100,
    usageLimit: 1000,
    usageCount: 567,
    validFrom: "2024-01-01T00:00:00Z",
    validTo: "2024-12-31T23:59:59Z",
    isActive: true
  }
];
