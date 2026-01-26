import * as React from 'react';

import { cn } from '@/lib/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="relative group">
      <input
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground/50 selection:bg-primary selection:text-primary-foreground',
          'flex h-10 w-full min-w-0 rounded-xl border border-input bg-background/50 px-3 py-2 text-base shadow-sm backdrop-blur-[2px]',
          'transition-all duration-200 ease-in-out',
          'outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'hover:border-purple-500/50',
          'focus-visible:border-purple-500/50 focus-visible:ring-4 focus-visible:ring-purple-500/10',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          'dark:bg-input/20 dark:border-white/5 dark:hover:border-white/20',
          className
        )}
        {...props}
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md"
        >
          {showPassword ? (
            <EyeOffIcon className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
        </button>
      )}
    </div>
  );
}

function InputPassword({ className, ...props }: React.ComponentProps<'input'>) {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="relative group">
      <input
        type={showPassword ? 'text' : 'password'}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground/50 selection:bg-primary selection:text-primary-foreground',
          'flex h-10 w-full min-w-0 rounded-xl border border-input bg-background/50 px-3 py-2 text-base shadow-sm backdrop-blur-[2px]',
          'transition-all duration-200 ease-in-out',
          'outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'hover:border-purple-500/50',
          'focus-visible:border-purple-500/50 focus-visible:ring-4 focus-visible:ring-purple-500/10',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          'dark:bg-input/20 dark:border-white/5 dark:hover:border-white/20',
          className
        )}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md"
      >
        {showPassword ? (
          <EyeOffIcon className="h-4 w-4" />
        ) : (
          <EyeIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

export { Input, InputPassword };
