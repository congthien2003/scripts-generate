import type { Template } from '@/shared/types';

/**
 * Notification SQL Templates
 * Generates SQL INSERT statements for notification system
 */
export const notificationTemplates: Template[] = [
  // Main notification entry
  {
    key: '{{baseKey}}',
    language: null,
    template: `-- Insert main notification
INSERT INTO notification_messages (notification_key, type, created_at, updated_at)
VALUES ('{{key}}', {{type}}, NOW(), NOW());`,
  },

  // Vietnamese title
  {
    key: '{{baseKey}}.title',
    language: 'vi-VN',
    template: `-- Insert Vietnamese title
INSERT INTO notification_translations (notification_key, language, field, value, created_at, updated_at)
VALUES ('{{key}}', 'vi-VN', 'title', '{{titleVi}}', NOW(), NOW());`,
  },

  // Vietnamese body
  {
    key: '{{baseKey}}.body',
    language: 'vi-VN',
    template: `-- Insert Vietnamese body
INSERT INTO notification_translations (notification_key, language, field, value, created_at, updated_at)
VALUES ('{{key}}', 'vi-VN', 'body', '{{bodyVi}}', NOW(), NOW());`,
  },

  // English title
  {
    key: '{{baseKey}}.title',
    language: 'en-US',
    template: `-- Insert English title
INSERT INTO notification_translations (notification_key, language, field, value, created_at, updated_at)
VALUES ('{{key}}', 'en-US', 'title', '{{titleEn}}', NOW(), NOW());`,
  },

  // English body
  {
    key: '{{baseKey}}.body',
    language: 'en-US',
    template: `-- Insert English body
INSERT INTO notification_translations (notification_key, language, field, value, created_at, updated_at)
VALUES ('{{key}}', 'en-US', 'body', '{{bodyEn}}', NOW(), NOW());`,
  },
];
