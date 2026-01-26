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
  notificationSchema,
  type NotificationFormData,
} from './notification.schema';
import { generateNotificationSQL } from './notification.service';
import { Sparkles, Database, Globe } from 'lucide-react';

export function NotificationGenerator() {
  const [generatedCode, setGeneratedCode] = useState('');

  const form = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      baseKey: '',
      type: 0,
      titleVi: '',
      bodyVi: '',
      titleEn: '',
      bodyEn: '',
    },
  });

  const onSubmit = (data: NotificationFormData) => {
    const result = generateNotificationSQL(data);
    setGeneratedCode(result.combinedScript);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20">
            <Database className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Notification SQL Generator
            </h1>
            <p className="text-muted-foreground mt-1">
              Generate SQL INSERT statements for notification system with
              multi-language support
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
                {/* Base Configuration Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                    Base Configuration
                  </div>

                  {/* Base Key */}
                  <FormField
                    control={form.control}
                    name="baseKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Base Key <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="notification.merchant.assigned"
                            className="transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The base notification key (lowercase, dots,
                          underscores, hyphens only)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Type */}
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            value={field.value}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/20 focus-visible:border-purple-500/50"
                          >
                            <option value="0">System</option>
                            <option value="1">Payment</option>
                            <option value="2">Transfer</option>
                            <option value="3">Transaction</option>
                            <option value="4">Account</option>
                            <option value="5">Security</option>
                            <option value="6">Marketing</option>
                            <option value="7">General</option>
                            <option value="8">Funding</option>
                            <option value="9">Warning</option>
                            <option value="10">ForAdmin</option>
                            <option value="11">KYC</option>
                          </select>
                        </FormControl>
                        <FormDescription>Notification type</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Gradient divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Vietnamese Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    Vietnamese Content (vi-VN)
                  </div>

                  <FormField
                    control={form.control}
                    name="titleVi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title (Vietnamese)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Thông báo gán merchant"
                            className="transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bodyVi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body (Vietnamese)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Merchant {{merchantName}} đã được gán"
                            className="transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Gradient divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* English Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    English Content (en-US)
                  </div>

                  <FormField
                    control={form.control}
                    name="titleEn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title (English)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Merchant Assignment Notification"
                            className="transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bodyEn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body (English)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Merchant {{merchantName}} has been assigned"
                            className="transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                            {...field}
                          />
                        </FormControl>
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
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate SQL
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Preview */}
        <div
          className="lg:sticky lg:top-6 h-fit animate-slide-up stagger-2"
          style={{ opacity: 0 }}
        >
          <CodePreview
            code={generatedCode}
            filename="notification"
            language="sql"
          />
        </div>
      </div>
    </div>
  );
}
