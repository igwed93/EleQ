import { z } from 'zod';

export const CreateProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string(),
  price: z.number().positive(),
  comparePrice: z.number().positive().optional(),
  imageUrl: z.string().url(),
  categoryId: z.string(),
  brand: z.string(),
  stock: z.number().int().nonnegative(),
  sku: z.string().optional(),
  specs: z.record(z.string(), z.any()).optional(),
  tags: z.array(z.string()),
  featured: z.boolean().optional(),
  status: z.enum(['ACTIVE', 'OUT_OF_STOCK', 'DISCONTINUED']).optional(),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = CreateProductSchema.partial();

export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
