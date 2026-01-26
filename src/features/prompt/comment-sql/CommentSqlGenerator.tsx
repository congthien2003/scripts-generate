import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CodePreview } from '@/shared/components/CodePreview';
import {
  commentSqlSchema,
  type CommentSqlFormData,
} from './comment-sql.schema';
import { generateCommentSqlPrompt } from './comment-sql.service';
import { MessageSquareText } from 'lucide-react';

export function CommentSqlGenerator() {
  const [generatedCode, setGeneratedCode] = useState('');

  const form = useForm<CommentSqlFormData>({
    resolver: zodResolver(commentSqlSchema),
    defaultValues: {
      sqlQuery: '',
    },
  });

  const onSubmit = (data: CommentSqlFormData) => {
    const result = generateCommentSqlPrompt(data);
    setGeneratedCode(result.combinedScript);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Comment SQL Prompt Generator
        </h1>
        <p className="text-muted-foreground">
          Generate a prompt for creating standardized SQL documentation comments
          following PostgreSQL conventions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* SQL Query */}
                <FormField
                  control={form.control}
                  name="sqlQuery"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        SQL Query <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Paste your SQL query here..."
                          className="flex min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-mono"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the SQL query you want to generate documentation
                        comments for
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  <MessageSquareText className="mr-2 h-4 w-4" />
                  Generate Comment Prompt
                </Button>
              </form>
            </Form>
          </div>

          {/* Instructions */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <h3 className="font-semibold mb-2">Comment Convention:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                • <strong>Query Name:</strong> Descriptive, business-friendly
                name
              </li>
              <li>
                • <strong>Author:</strong> Placeholder for your name
              </li>
              <li>
                • <strong>Date:</strong> YYYY-MM-DD format
              </li>
              <li>
                • <strong>Parameters:</strong> All @Params with types
              </li>
              <li>
                • <strong>Description:</strong> 2-3 sentences, business purpose
              </li>
              <li>
                • <strong>Returns:</strong> All columns with PostgreSQL types
              </li>
            </ul>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <CodePreview
            code={generatedCode}
            language="markdown"
            filename="comment-sql-prompt.md"
          />
        </div>
      </div>
    </div>
  );
}
