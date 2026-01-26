import { useState } from 'react';
import { Copy, Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copyToClipboard, downloadAsFile } from '../lib/template-engine';
import { cn } from '@/lib/utils';

interface ActionButtonsProps {
  code: string;
  filename?: string;
  disabled?: boolean;
}

export function ActionButtons({
  code,
  filename = 'script',
  disabled = false,
}: ActionButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadAsFile(code, filename);
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant={copied ? 'default' : 'gradient'}
        size="sm"
        onClick={handleCopy}
        disabled={disabled || !code}
        className={cn(
          'transition-all duration-300',
          copied && 'bg-green-600 hover:bg-green-600 text-white'
        )}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-2 animate-in zoom-in" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-2" />
            Copy Code
          </>
        )}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownload}
        disabled={disabled || !code}
        className="hover:border-purple-500/50 hover:bg-purple-500/5 transition-all"
      >
        <Download className="h-4 w-4 mr-2 group-hover:animate-bounce" />
        Download
      </Button>
    </div>
  );
}
