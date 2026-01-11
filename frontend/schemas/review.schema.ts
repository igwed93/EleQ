import { title } from 'process';
import { z } from 'zod';

export const CreateReviewSchema = z.object({
    userId: z.string().min(1, 'User ID is required'),
    rating: z.number().int().min(1).max(5),
    title: z.string().optional(),
    comment: z.string().min(1, 'Comment is required'),
});


export type CreateReviewInput = z.infer<typeof CreateReviewSchema>;