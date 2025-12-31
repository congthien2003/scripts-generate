import { z } from 'zod';

export const notificationSchema = z.object({
  baseKey: z
    .string()
    .min(1, 'Base key is required')
    .regex(
      /^[a-z0-9._-]+$/,
      'Key must contain only lowercase letters, numbers, dots, underscores, and hyphens'
    ),
  type: z.enum(['event', 'alert', 'system']).default('event'),
  titleVi: z.string().optional(),
  bodyVi: z.string().optional(),
  titleEn: z.string().optional(),
  bodyEn: z.string().optional(),
});

export type NotificationFormData = z.infer<typeof notificationSchema>;
