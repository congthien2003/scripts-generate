import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu, FileCode, Database, Sparkles, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NavCategory {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  subItems?: NavItem[];
}

interface NavItem {
  name: string;
  href: string;
}

const navCategories: NavCategory[] = [
  {
    name: 'SQL Generators',
    icon: Database,
    href: '/sql',
    subItems: [{ name: 'Notification', href: '/sql/notification' }],
  },
  {
    name: 'Prompt Generators',
    icon: Sparkles,
    href: '/prompt',
    subItems: [
      { name: 'Improve SQL', href: '/prompt/improve-sql' },
      { name: 'Comment SQL', href: '/prompt/comment-sql' },
    ],
  },
];

export function ScriptSidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    '/sql',
  ]);

  const toggleCategory = (href: string) => {
    setExpandedCategories((prev: string[]) =>
      prev.includes(href)
        ? prev.filter((h: string) => h !== href)
        : [...prev, href]
    );
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={toggle}
      />

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72',
          'bg-background/80 backdrop-blur-xl',
          'transition-transform duration-300 ease-in-out',
          'border-r border-border/50',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        {/* Gradient accent line */}
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-purple-500/50 via-blue-500/30 to-transparent" />

        {/* Header */}
        <div className="flex h-16 items-center border-b border-border/50 px-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg blur opacity-50" />
              <div className="relative bg-gradient-to-br from-purple-500 to-blue-500 p-2 rounded-lg animate-float">
                <FileCode className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Script Generator
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto lg:hidden"
            onClick={toggle}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col h-[calc(100vh-4rem)]">
          <div className="flex-1 overflow-auto py-4">
            <nav className="grid gap-1 px-3">
              {navCategories.map((category, categoryIndex) => (
                <div
                  key={category.href}
                  className="space-y-1 animate-slide-up"
                  style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.href)}
                    className={cn(
                      'group w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold',
                      'hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10',
                      'transition-all duration-300',
                      'text-foreground'
                    )}
                  >
                    <div
                      className={cn(
                        'p-1.5 rounded-lg transition-all duration-300',
                        'bg-muted group-hover:bg-gradient-to-br group-hover:from-purple-500/20 group-hover:to-blue-500/20'
                      )}
                    >
                      <category.icon className="h-4 w-4 text-muted-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                    </div>
                    <span className="flex-1 text-left">{category.name}</span>
                    <ChevronRight
                      className={cn(
                        'h-4 w-4 text-muted-foreground transition-transform duration-300',
                        expandedCategories.includes(category.href) &&
                          'rotate-90'
                      )}
                    />
                  </button>

                  {/* Sub Items */}
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-300',
                      expandedCategories.includes(category.href)
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                    )}
                  >
                    {category.subItems && (
                      <div className="ml-4 space-y-1 border-l-2 border-border/50 pl-3 py-1">
                        {category.subItems.map((item, itemIndex) => {
                          const isActive = location.pathname === item.href;
                          return (
                            <Link
                              key={item.href}
                              to={item.href}
                              className={cn(
                                'block rounded-lg px-3 py-2 text-sm transition-all duration-200',
                                isActive
                                  ? 'bg-gradient-to-r from-purple-500/15 to-blue-500/15 text-foreground font-medium shadow-sm'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                                'animate-slide-in-left'
                              )}
                              style={{
                                animationDelay: `${categoryIndex * 0.1 + itemIndex * 0.05 + 0.1}s`,
                              }}
                            >
                              <div className="flex items-center gap-2">
                                {isActive && (
                                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                                )}
                                {item.name}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="border-t border-border/50 p-4">
            <div className="text-xs text-muted-foreground text-center">
              <span className="opacity-60">Powered by</span>{' '}
              <span className="font-medium bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                React + Vite
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          'fixed bottom-4 right-4 z-40 lg:hidden',
          'bg-background/80 backdrop-blur-sm',
          'shadow-lg hover:shadow-xl transition-shadow'
        )}
        onClick={toggle}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  );
}
