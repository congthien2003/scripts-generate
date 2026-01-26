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
import { Sparkles, Zap, Settings } from 'lucide-react';

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
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20">
            <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Improve SQL Prompt Generator
            </h1>
            <p className="text-muted-foreground mt-1">
              Generate a comprehensive prompt for PostgreSQL query optimization
              and review
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
                {/* SQL Queries Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                    SQL Queries
                  </div>

                  <FormField
                    control={form.control}
                    name="sqlQueries"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          SQL Queries{' '}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <textarea
                            placeholder="Paste your SQL queries here..."
                            className="flex min-h-[200px] w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/20 focus-visible:border-purple-500/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-200 resize-none"
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
                </div>

                {/* Gradient divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Context Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Settings className="h-4 w-4" />
                    Context Information (Optional)
                  </div>

                  {/* Data Volume */}
                  <FormField
                    control={form.control}
                    name="dataVolume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expected Data Volume</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 1M rows, 500GB, 10K records per day"
                            className="transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
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
                        <FormLabel>Performance Targets</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., <100ms response time, <5s for reports"
                            className="transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
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
                        <FormLabel>Running Schedule</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., On-demand, Hourly batch, Real-time"
                            className="transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
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
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="gradient"
                  className="w-full"
                  size="lg"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Prompt
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Preview */}
        <div
          className="space-y-6 animate-slide-up stagger-2"
          style={{ opacity: 0 }}
        >
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
