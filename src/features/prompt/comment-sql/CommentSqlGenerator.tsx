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
import { MessageSquareText, FileText, Info } from 'lucide-react';

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
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20">
            <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Comment SQL Prompt Generator
            </h1>
            <p className="text-muted-foreground mt-1">
              Generate a prompt for creating standardized SQL documentation
              comments following PostgreSQL conventions
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div
          className="space-y-6 animate-slide-up stagger-1"
          style={{ opacity: 0 }}
        >
          <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* SQL Query Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                    SQL Query Input
                  </div>

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
                            className="flex min-h-[300px] w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/20 focus-visible:border-purple-500/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-mono transition-all duration-200 resize-none"
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
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="gradient"
                  className="w-full"
                  size="lg"
                >
                  <MessageSquareText className="mr-2 h-4 w-4" />
                  Generate Comment Prompt
                </Button>
              </form>
            </Form>
          </div>

          {/* Instructions */}
          <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-purple-500/5 to-blue-500/5 p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold text-sm">Comment Convention</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-purple-500/50 mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">Query Name:</strong>{' '}
                  Descriptive, business-friendly name
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-purple-500/50 mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">Author:</strong>{' '}
                  Placeholder for your name
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-purple-500/50 mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">Date:</strong> YYYY-MM-DD
                  format
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-purple-500/50 mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">Parameters:</strong> All
                  @Params with types
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-purple-500/50 mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">Description:</strong> 2-3
                  sentences, business purpose
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-purple-500/50 mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">Returns:</strong> All
                  columns with PostgreSQL types
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Preview */}
        <div
          className="space-y-4 animate-slide-up stagger-2"
          style={{ opacity: 0 }}
        >
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
