import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu, FileCode, Database, Sparkles } from 'lucide-react';
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
          'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden',
          isOpen ? 'block' : 'hidden'
        )}
        onClick={toggle}
      />

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 bg-background',
          'transition-transform duration-300 ease-in-out',
          'border-r',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="flex h-14 items-center border-b px-4">
          <FileCode className="h-6 w-6 mr-2" />
          <span className="text-lg font-semibold">Script Generator</span>
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
        <div className="flex flex-col h-[calc(100vh-3.5rem)]">
          <div className="flex-1 overflow-auto py-4">
            <nav className="grid gap-2 px-2">
              {navCategories.map((category) => (
                <div key={category.href} className="space-y-1">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.href)}
                    className={cn(
                      'w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold',
                      'hover:bg-accent hover:text-accent-foreground transition-colors',
                      'text-foreground'
                    )}
                  >
                    <category.icon className="h-5 w-5" />
                    <span className="flex-1 text-left">{category.name}</span>
                    <svg
                      className={cn(
                        'h-4 w-4 transition-transform',
                        expandedCategories.includes(category.href)
                          ? 'rotate-90'
                          : ''
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Sub Items */}
                  {expandedCategories.includes(category.href) &&
                    category.subItems && (
                      <div className="ml-4 space-y-1 border-l pl-3">
                        {category.subItems.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                              'block rounded-md px-3 py-2 text-sm',
                              'hover:bg-accent hover:text-accent-foreground transition-colors',
                              location.pathname === item.href
                                ? 'bg-accent text-accent-foreground font-medium'
                                : 'text-muted-foreground'
                            )}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-40 lg:hidden"
        onClick={toggle}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  );
}
