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
import { Sparkles } from 'lucide-react';

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
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Notification SQL Generator
        </h1>
        <p className="text-muted-foreground">
          Generate SQL INSERT statements for notification system with
          multi-language support
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
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The base notification key (lowercase, dots, underscores,
                        hyphens only)
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
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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

                {/* Vietnamese Section */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-semibold">
                    Vietnamese Content (vi-VN)
                  </h3>

                  <FormField
                    control={form.control}
                    name="titleVi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title (Vietnamese)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Thông báo gán merchant"
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
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* English Section */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-semibold">
                    English Content (en-US)
                  </h3>

                  <FormField
                    control={form.control}
                    name="titleEn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title (English)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Merchant Assignment Notification"
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
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate SQL
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-6 h-fit">
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
