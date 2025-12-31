import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Download, Check } from 'lucide-react';
import { copyToClipboard, downloadAsFile } from '../lib/template-engine';
import { cn } from '@/lib/utils';

interface CodePreviewProps {
  code: string;
  filename?: string;
  language?: string;
  className?: string;
}

export function CodePreview({
  code,
  filename = 'script',
  language = 'sql',
  className,
}: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extension = language === 'sql' ? '.sql' : '.txt';
    downloadAsFile(code, `${filename}${extension}`);
  };

  return (
    <div className={cn('rounded-lg border bg-card', className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Preview</span>
          {language && (
            <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {language.toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="h-8"
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </div>

      {/* Code Content */}
      <div className="relative">
        {code ? (
          <pre className="overflow-x-auto p-4 text-sm">
            <code className="text-foreground">{code}</code>
          </pre>
        ) : (
          <div className="flex items-center justify-center p-12 text-muted-foreground">
            <div className="text-center">
              <p className="text-sm">No code generated yet</p>
              <p className="mt-1 text-xs">
                Fill in the form and click generate
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
