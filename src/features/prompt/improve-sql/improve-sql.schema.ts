import { z } from 'zod';

export const improveSqlSchema = z.object({
  sqlQueries: z
    .string()
    .min(10, 'SQL queries must be at least 10 characters')
    .max(50000, 'SQL queries too long (max 50000 characters)'),
  dataVolume: z.string().optional(),
  performanceTargets: z.string().optional(),
  runningSchedule: z.string().optional(),
});

export type ImproveSqlFormData = z.infer<typeof improveSqlSchema>;
