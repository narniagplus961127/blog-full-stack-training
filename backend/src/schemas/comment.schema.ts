import { z } from 'zod';

export const commentSchema = z.object({
  authorName: z
    .string()
    .trim()
    .min(2, 'Name must contain at least 2 characters.')
    .max(80, 'Name must contain at most 80 characters.'),
  email: z
    .string()
    .trim()
    .max(255, 'Email is too long.')
    .refine(
      (value) => value === '' || z.string().email().safeParse(value).success,
      'Enter a valid email address.',
    )
    .transform((value) => value || null),
  content: z
    .string()
    .trim()
    .min(3, 'Comment must contain at least 3 characters.')
    .max(1000, 'Comment must contain at most 1,000 characters.'),
});

export const commentIdSchema = z.coerce.number().int().positive();
