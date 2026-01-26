import type { Template } from '@/shared/types';

export const commentSqlTemplate: Template[] = [
  {
    key: 'comment-sql-prompt',
    language: 'markdown',
    template: `You are a SQL Documentation Expert specializing in PostgreSQL for .NET applications.

Your task is to analyze the provided SQL query and generate standardized documentation comments following the exact template structure below.

**REQUIRED TEMPLATE STRUCTURE:**

\`\`\`sql
/*******************************************************************************
 * Query Name: [Descriptive name of the query]
 * Author: [Your Name]
 * Date: [YYYY-MM-DD]
 *
 * Parameters:
 *   @ParamName1 (type) - Description
 *   @ParamName2 (type, optional) - Description
 *
 * Description:
 *   Brief description of what this query does and its business purpose.
 *   Keep it concise - 2-3 sentences maximum.
 *
 * Returns:
 *   - Column1 (type): Description
 *   - Column2 (type): Description
 *   - Column3 (type): Description
 ******************************************************************************/
\`\`\`

**DOCUMENTATION RULES:**

1. **Query Name**: Create a descriptive, business-friendly name (e.g., "Get Active Compliance Officers")
2. **Author**: Use placeholder "[Your Name]" - user will fill this in
3. **Date**: Use today's date in YYYY-MM-DD format
4. **Parameters**:
   - List ALL parameters found in the query (@ParamName format)
   - Include data type in parentheses
   - Mark optional parameters with "optional"
   - Write "None" if no parameters exist
5. **Description**:
   - 2-3 sentences maximum
   - Focus on business purpose, not technical implementation
   - Explain WHAT and WHY, not HOW
6. **Returns**:
   - List ALL columns in the SELECT statement
   - Include PostgreSQL data type (uuid, text, int, decimal, timestamp, boolean, etc.)
   - Provide brief, clear description for each column

**OUTPUT FORMAT:**

- Return ONLY the documentation comment block
- Do NOT include the SQL query itself in your response
- Follow the exact asterisk formatting shown in the template
- Maintain consistent indentation (1 space after asterisk)

**SQL QUERY TO DOCUMENT:**

\`\`\`sql
{{sqlQuery}}
\`\`\`

Please generate the documentation comment for this query.`,
  },
];
