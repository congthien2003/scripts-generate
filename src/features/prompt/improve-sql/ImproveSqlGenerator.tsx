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
import { Input } from '@/components/ui/input';
import { CodePreview } from '@/shared/components/CodePreview';
import {
  improveSqlSchema,
  type ImproveSqlFormData,
} from './improve-sql.schema';
import { generateImproveSqlPrompt } from './improve-sql.service';
import { Sparkles } from 'lucide-react';

export function ImproveSqlGenerator() {
  const [generatedCode, setGeneratedCode] = useState('');

  const form = useForm<ImproveSqlFormData>({
    resolver: zodResolver(improveSqlSchema),
    defaultValues: {
      sqlQueries: '',
      dataVolume: '',
      performanceTargets: '',
      runningSchedule: '',
    },
  });

  const onSubmit = (data: ImproveSqlFormData) => {
    const result = generateImproveSqlPrompt(data);
    setGeneratedCode(result.combinedScript);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Improve SQL Prompt Generator
        </h1>
        <p className="text-muted-foreground">
          Generate a comprehensive prompt for PostgreSQL query optimization and
          review
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
                {/* SQL Queries */}
                <FormField
                  control={form.control}
                  name="sqlQueries"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        SQL Queries <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Paste your SQL queries here..."
                          className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the SQL queries you want to optimize
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Data Volume */}
                <FormField
                  control={form.control}
                  name="dataVolume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Data Volume (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 1M rows, 500GB, 10K records per day"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Specify the expected data volume for context
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Performance Targets */}
                <FormField
                  control={form.control}
                  name="performanceTargets"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Performance Targets (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., <100ms response time, <5s for reports"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Any specific performance requirements
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Running Schedule */}
                <FormField
                  control={form.control}
                  name="runningSchedule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Running Schedule (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., On-demand, Hourly batch, Real-time"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        When will these queries run?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full" size="lg">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Prompt
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <CodePreview
            code={generatedCode}
            language="markdown"
            filename="improve-sql-prompt.md"
          />
        </div>
      </div>
    </div>
  );
}
