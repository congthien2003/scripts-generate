import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Download, Check, Code2 } from 'lucide-react';
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
    <div
      className={cn(
        'rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-3 bg-gradient-to-r from-purple-500/5 to-blue-500/5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            Preview
          </span>
          {language && (
            <span className="rounded-md bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400 border border-purple-500/20">
              {language.toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            disabled={!code}
            className={cn(
              'h-8 px-3 transition-all duration-200',
              copied && 'text-green-600 dark:text-green-400'
            )}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1.5" />
                Copy
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            disabled={!code}
            className="h-8 px-3"
          >
            <Download className="h-4 w-4 mr-1.5" />
            Download
          </Button>
        </div>
      </div>

      {/* Code Content */}
      <div className="relative">
        {code ? (
          <pre className="overflow-x-auto p-4 text-sm max-h-[500px] overflow-y-auto">
            <code className="text-foreground font-mono">{code}</code>
          </pre>
        ) : (
          <div className="flex flex-col items-center justify-center p-16 text-muted-foreground">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/10 mb-4">
              <Code2 className="h-8 w-8 text-purple-500/50" />
            </div>
            <p className="text-sm font-medium">No code generated yet</p>
            <p className="mt-1.5 text-xs text-muted-foreground/70">
              Fill in the form and click generate
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
