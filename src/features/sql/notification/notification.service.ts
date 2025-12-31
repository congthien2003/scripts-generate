import { generateFromTemplates } from '@/shared/lib/template-engine';
import type { GeneratorResult } from '@/shared/types';
import { notificationTemplates } from './notification.templates';
import type { NotificationFormData } from './notification.schema';

/**
 * Generate notification SQL scripts from form data
 */
export function generateNotificationSQL(
  data: NotificationFormData
): GeneratorResult {
  return generateFromTemplates(notificationTemplates, {
    baseKey: data.baseKey,
    additionalParams: {
      type: data.type,
      titleVi: data.titleVi || '[Vietnamese Title]',
      bodyVi: data.bodyVi || '[Vietnamese Body]',
      titleEn: data.titleEn || '[English Title]',
      bodyEn: data.bodyEn || '[English Body]',
    },
  });
}
