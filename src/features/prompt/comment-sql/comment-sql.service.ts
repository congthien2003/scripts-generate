import { generateFromTemplates } from '@/shared/lib/template-engine';
import type { GeneratorResult } from '@/shared/types';
import type { CommentSqlFormData } from './comment-sql.schema';
import { commentSqlTemplate } from './comment-sql.templates';

export function generateCommentSqlPrompt(
  data: CommentSqlFormData
): GeneratorResult {
  return generateFromTemplates(commentSqlTemplate, {
    baseKey: 'comment-sql-prompt',
    additionalParams: {
      sqlQuery: data.sqlQuery,
    },
  });
}
