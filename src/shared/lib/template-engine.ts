/**
 * Template Engine - Core logic for generating scripts from templates
 */

import type { Template, GenerateInput, GeneratorResult } from '../types';

/**
 * Replace placeholders in template string
 */
function replacePlaceholders(
  template: string,
  params: Record<string, any>
): string {
  let result = template;

  Object.entries(params).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`;
    result = result.replace(new RegExp(placeholder, 'g'), String(value));
  });

  return result;
}

/**
 * Generate scripts from template group
 */
export function generateFromTemplates(
  templates: Template[],
  input: GenerateInput
): GeneratorResult {
  const outputs = templates.map((template) => {
    // Build params object
    const params: Record<string, any> = {
      baseKey: input.baseKey,
      ...input.additionalParams,
    };

    // Replace key placeholder
    const generatedKey = replacePlaceholders(template.key, params);

    // Replace template placeholders
    const generatedScript = replacePlaceholders(template.template, {
      ...params,
      key: generatedKey,
    });

    return {
      key: generatedKey,
      script: generatedScript,
      language: template.language || undefined,
    };
  });

  // Combine all scripts
  const combinedScript = outputs.map((o) => o.script).join('\n\n');

  return {
    outputs,
    combinedScript,
  };
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}

/**
 * Download text as file
 */
export function downloadAsFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
