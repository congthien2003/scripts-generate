import { generateFromTemplates } from '@/shared/lib/template-engine';
import type { GeneratorResult } from '@/shared/types';
import type { ImproveSqlFormData } from './improve-sql.schema';
import { improveSqlTemplate } from './improve-sql.templates';

export function generateImproveSqlPrompt(
  data: ImproveSqlFormData
): GeneratorResult {
  return generateFromTemplates(improveSqlTemplate, {
    baseKey: 'improve-sql-prompt',
    additionalParams: {
      sqlQueries: data.sqlQueries,
      dataVolume: data.dataVolume || 'Not specified',
      performanceTargets: data.performanceTargets || 'Not specified',
      runningSchedule: data.runningSchedule || 'Not specified',
    },
  });
}
