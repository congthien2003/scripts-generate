/**
 * Shared types for Script Generator
 */

export interface Template {
  key: string;
  language?: string | null;
  template: string;
}

export interface TemplateGroup {
  id: string;
  name: string;
  category: 'sql' | 'text' | 'migration';
  templates: Template[];
}

export interface GenerateInput {
  baseKey: string;
  additionalParams?: Record<string, any>;
}

export interface GenerateOutput {
  script: string;
  language?: string;
  key: string;
}

export interface GeneratorResult {
  outputs: GenerateOutput[];
  combinedScript: string;
}
