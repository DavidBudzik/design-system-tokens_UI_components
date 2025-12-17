import { useState, useMemo, useEffect } from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { X, BookOpen, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { userGuideContent } from '../data/documentationData';

interface DocumentationViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Generate anchor ID from text
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Simple markdown to HTML converter for basic formatting
function parseMarkdown(markdown: string, highlightQuery?: string): string {
  // Escape HTML to prevent XSS (basic)
  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };
  
  // Highlight search query in text
  const highlightText = (text: string): string => {
    if (!highlightQuery) return escapeHtml(text);
    const query = highlightQuery.toLowerCase();
    const regex = new RegExp(`(${escapeHtml(highlightQuery).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return escapeHtml(text).replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-900/50 px-0.5 rounded">$1</mark>');
  };
  
  // Process inline elements (bold, links, inline code)
  const processInline = (text: string): string => {
    let result = text;
    
    // Inline code (must be processed before other inline elements)
    result = result.replace(/`([^`\n]+)`/g, (match, code) => {
      if (match.includes('<pre') || match.includes('<code')) return match;
      return `<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">${escapeHtml(code)}</code>`;
    });
    
    // Bold
    result = result.replace(/\*\*(.*?)\*\*/g, (match, content) => {
      if (match.includes('<pre') || match.includes('<code')) return match;
      return `<strong class="font-semibold">${processInline(content)}</strong>`;
    });
    
    // Links - handle internal anchor links vs external links
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
      if (match.includes('<pre') || match.includes('<code')) return match;
      const isInternalAnchor = url.startsWith('#');
      if (isInternalAnchor) {
        return `<a href="${escapeHtml(url)}" class="text-primary hover:underline" data-internal-link>${highlightText(linkText)}</a>`;
      }
      return `<a href="${escapeHtml(url)}" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">${highlightText(linkText)}</a>`;
    });
    
    return result;
  };
  
  // Process a single block (paragraph separated by \n\n)
  const processBlock = (block: string): string => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    
    // Code blocks
    if (trimmed.startsWith('```')) {
      const match = trimmed.match(/```(\w+)?\n([\s\S]*?)```/);
      if (match) {
        const escapedCode = escapeHtml(match[2].trim());
        return `<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4 border border-border"><code class="text-sm font-mono block whitespace-pre">${escapedCode}</code></pre>`;
      }
    }
    
    // Horizontal rules
    if (trimmed === '---') {
      return '<hr class="my-8 border-border" />';
    }
    
    // Headers
    const h1Match = trimmed.match(/^# (.*)$/);
    if (h1Match) {
      const id = slugify(h1Match[1]);
      const text = processInline(h1Match[1]);
      return `<h1 id="${id}" class="text-3xl font-bold mt-8 mb-4 scroll-mt-4">${text}</h1>`;
    }
    
    const h2Match = trimmed.match(/^## (.*)$/);
    if (h2Match) {
      const id = slugify(h2Match[1]);
      const text = processInline(h2Match[1]);
      return `<h2 id="${id}" class="text-2xl font-semibold mt-8 mb-4 border-b border-border pb-2 scroll-mt-4">${text}</h2>`;
    }
    
    const h3Match = trimmed.match(/^### (.*)$/);
    if (h3Match) {
      const id = slugify(h3Match[1]);
      const text = processInline(h3Match[1]);
      return `<h3 id="${id}" class="text-xl font-semibold mt-6 mb-3 scroll-mt-4">${text}</h3>`;
    }
    
    // Lists - check if block is a list
    const lines = trimmed.split('\n').filter(line => line.trim());
    const isOrderedList = lines.every(line => /^\d+\.\s/.test(line));
    const isUnorderedList = lines.every(line => /^[-*]\s/.test(line));
    
    if (isOrderedList || isUnorderedList) {
      const listItems = lines.map(line => {
        const match = line.match(/^(\d+\.|[-*])\s(.*)$/);
        if (match) {
          const content = processInline(match[2]);
          return `<li class="ml-4 ${isOrderedList ? 'list-decimal' : 'list-disc'}">${content}</li>`;
        }
        return '';
      }).filter(Boolean).join('\n');
      
      const listTag = isOrderedList ? 'ol' : 'ul';
      const listClass = isOrderedList ? 'list-decimal' : 'list-disc';
      return `<${listTag} class="${listClass} my-4 space-y-2 ml-6">${listItems}</${listTag}>`;
    }
    
    // Regular paragraph
    const processed = processInline(trimmed);
    return `<p class="mb-4 leading-relaxed">${processed}</p>`;
  };
  
  // Split markdown into blocks and process each
  const blocks = markdown.split(/\n\n+/);
  const processedBlocks = blocks.map(processBlock).filter(Boolean);
  
  return processedBlocks.join('\n\n');
}

export function DocumentationViewer({ isOpen, onClose }: DocumentationViewerProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContent = useMemo(() => {
    if (!searchQuery) return userGuideContent;
    // Better search: keep context by searching paragraphs
    const paragraphs = userGuideContent.split('\n\n');
    const query = searchQuery.toLowerCase();
    return paragraphs
      .filter((para) => para.toLowerCase().includes(query))
      .join('\n\n');
  }, [searchQuery]);

  const htmlContent = useMemo(() => parseMarkdown(filteredContent, searchQuery), [filteredContent, searchQuery]);

  // Handle smooth scrolling for internal anchor links
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[data-internal-link]') as HTMLAnchorElement;
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const id = href.slice(1);
          const element = document.getElementById(id);
          if (element) {
            const scrollContainer = document.querySelector('[role="dialog"] [data-radix-scroll-area-viewport]') as HTMLElement;
            if (scrollContainer) {
              const containerRect = scrollContainer.getBoundingClientRect();
              const elementRect = element.getBoundingClientRect();
              const yOffset = -20;
              const targetScrollPosition = scrollContainer.scrollTop + (elementRect.top - containerRect.top) + yOffset;
              scrollContainer.scrollTo({ top: targetScrollPosition, behavior: 'smooth' });
            } else {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-primary" />
              <DialogTitle className="text-2xl font-serif">Documentation</DialogTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Search Bar */}
          <div className="px-6 py-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            {searchQuery && (
              <p className="mt-2 text-sm text-muted-foreground">
                {filteredContent.split('\n\n').length} section{filteredContent.split('\n\n').length !== 1 ? 's' : ''} found
              </p>
            )}
          </div>

          {/* Content */}
          <ScrollArea className="flex-1 px-6 py-6">
            <div 
              className="prose prose-neutral dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent || '<p>Loading documentation...</p>' }}
            />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

