import { z } from 'zod';

export const commentSqlSchema = z.object({
  sqlQuery: z
    .string()
    .min(10, 'SQL query must be at least 10 characters')
    .max(50000, 'SQL query too long (max 50000 characters)'),
});

export type CommentSqlFormData = z.infer<typeof commentSqlSchema>;
