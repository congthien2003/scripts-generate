import { useState } from 'react';
import { Copy, Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copyToClipboard, downloadAsFile } from '../lib/template-engine';

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
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        disabled={disabled || !code}
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
        variant="outline"
        size="sm"
        onClick={handleDownload}
        disabled={disabled || !code}
      >
        <Download className="h-4 w-4 mr-1" />
        Download
      </Button>
    </div>
  );
}
