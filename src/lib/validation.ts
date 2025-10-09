import { z } from 'zod';

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
