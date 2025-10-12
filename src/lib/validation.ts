import { z } from 'zod';

// Password validation with strong security requirements
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character');

export const profileSchema = z.object({
  display_name: z.string().min(1, 'Display name is required').max(50),
  bio: z.string().max(500).optional(),
  handle: z.string().min(3).max(30).regex(/^[a-z0-9_]+$/, 'Handle can only contain lowercase letters, numbers, and underscores'),
  website: z.string().url().optional().or(z.literal('')),
  location: z.string().max(100).optional(),
});

export const postSchema = z.object({
  caption: z.string().max(2200).optional(),
  tags: z.array(z.string()).optional(),
  location: z.string().max(100).optional(),
});

export const productSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(5000).optional(),
  price: z.number().positive('Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).optional(),
});

export const messageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty').max(2000),
});

// Shipping address validation to prevent over-collection of sensitive data
export const shippingAddressSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100),
  addressLine1: z.string().min(1, 'Address is required').max(200),
  addressLine2: z.string().max(200).optional(),
  city: z.string().min(1, 'City is required').max(100),
  state: z.string().min(1, 'State/Province is required').max(100),
  postalCode: z.string().min(1, 'Postal code is required').max(20),
  country: z.string().min(1, 'Country is required').max(100),
  phone: z.string().max(20).optional(),
});
