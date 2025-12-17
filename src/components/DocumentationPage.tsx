import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useState, useMemo, useEffect, useRef } from 'react';
import { Input } from './ui/input';
import { userGuideContent } from '../data/documentationData';
import { Logo } from './Logo';
import { premadeThemes } from '../data/themePalettes';
import { ScrollArea } from './ui/scroll-area';

interface TocItem {
  id: string;
  text: string;
  level: number;
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

// Extract table of contents from markdown
function extractToc(markdown: string): TocItem[] {
  const toc: TocItem[] = [];
  const lines = markdown.split('\n');
  
  for (const line of lines) {
    const h1Match = line.match(/^# (.*)$/);
    const h2Match = line.match(/^## (.*)$/);
    const h3Match = line.match(/^### (.*)$/);
    
    if (h1Match) {
      toc.push({ id: slugify(h1Match[1]), text: h1Match[1], level: 1 });
    } else if (h2Match) {
      toc.push({ id: slugify(h2Match[1]), text: h2Match[1], level: 2 });
    } else if (h3Match) {
      toc.push({ id: slugify(h3Match[1]), text: h3Match[1], level: 3 });
    }
  }
  
  return toc;
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
      return `<code class="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono text-neutral-900 dark:text-neutral-100">${escapeHtml(code)}</code>`;
    });
    
    // Bold
    result = result.replace(/\*\*(.*?)\*\*/g, (match, content) => {
      if (match.includes('<pre') || match.includes('<code')) return match;
      return `<strong class="font-semibold text-neutral-900 dark:text-neutral-100">${processInline(content)}</strong>`;
    });
    
    // Links - handle internal anchor links vs external links
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
      if (match.includes('<pre') || match.includes('<code')) return match;
      const isInternalAnchor = url.startsWith('#');
      if (isInternalAnchor) {
        return `<a href="${escapeHtml(url)}" class="text-neutral-900 dark:text-neutral-100 underline hover:text-neutral-600 dark:hover:text-neutral-400" data-internal-link>${highlightText(linkText)}</a>`;
      }
      return `<a href="${escapeHtml(url)}" class="text-neutral-900 dark:text-neutral-100 underline hover:text-neutral-600 dark:hover:text-neutral-400" target="_blank" rel="noopener noreferrer">${highlightText(linkText)}</a>`;
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
        return `<pre class="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg overflow-x-auto my-4 border border-neutral-200 dark:border-neutral-700"><code class="text-sm font-mono block whitespace-pre">${escapedCode}</code></pre>`;
      }
    }
    
    // Horizontal rules
    if (trimmed === '---') {
      return '<hr class="my-8 border-neutral-200 dark:border-neutral-700" />';
    }
    
    // Headers
    const h1Match = trimmed.match(/^# (.*)$/);
    if (h1Match) {
      const id = slugify(h1Match[1]);
      const text = processInline(h1Match[1]);
      return `<h1 id="${id}" class="text-3xl font-bold mt-8 mb-4 text-neutral-900 dark:text-neutral-100 scroll-mt-24">${text}</h1>`;
    }
    
    const h2Match = trimmed.match(/^## (.*)$/);
    if (h2Match) {
      const id = slugify(h2Match[1]);
      const text = processInline(h2Match[1]);
      return `<h2 id="${id}" class="text-2xl font-semibold mt-8 mb-4 border-b border-neutral-200 dark:border-neutral-700 pb-2 text-neutral-900 dark:text-neutral-100 scroll-mt-24">${text}</h2>`;
    }
    
    const h3Match = trimmed.match(/^### (.*)$/);
    if (h3Match) {
      const id = slugify(h3Match[1]);
      const text = processInline(h3Match[1]);
      return `<h3 id="${id}" class="text-xl font-semibold mt-6 mb-3 text-neutral-900 dark:text-neutral-100 scroll-mt-24">${text}</h3>`;
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
          return `<li class="ml-4 ${isOrderedList ? 'list-decimal' : 'list-disc'} text-neutral-700 dark:text-neutral-300">${content}</li>`;
        }
        return '';
      }).filter(Boolean).join('\n');
      
      const listTag = isOrderedList ? 'ol' : 'ul';
      const listClass = isOrderedList ? 'list-decimal' : 'list-disc';
      return `<${listTag} class="${listClass} my-4 space-y-2 ml-6">${listItems}</${listTag}>`;
    }
    
    // Regular paragraph
    const processed = processInline(trimmed);
    return `<p class="mb-4 leading-relaxed text-neutral-700 dark:text-neutral-300">${processed}</p>`;
  };
  
  // Split markdown into blocks and process each
  const blocks = markdown.split(/\n\n+/);
  const processedBlocks = blocks.map(processBlock).filter(Boolean);
  
  return processedBlocks.join('\n\n');
}

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  const toc = useMemo(() => extractToc(userGuideContent), []);
  
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
            const yOffset = -100; // Account for fixed header
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveSection(id);
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150; // Offset for header + padding
      
      // Find the current section based on scroll position
      let currentSection = '';
      for (let i = toc.length - 1; i >= 0; i--) {
        const element = document.getElementById(toc[i].id);
        if (element) {
          const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
          if (scrollPos >= elementTop) {
            currentSection = toc[i].id;
            break;
          }
        }
      }
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc, activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 antialiased overflow-x-hidden scroll-smooth min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <Logo 
                baseColors={premadeThemes[0]?.baseColors || {
                  cta: '#E03600',
                  primary: '#242424',
                  secondary: '#EDEDED',
                  danger: '#E03636',
                  success: '#1CD166',
                  warning: '#FFB529',
                  link: '#308FED',
                  background: '#FFFFFF',
                  foreground: '#171717',
                }}
                className="w-10 h-10"
              />
              <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-neutral-100" style={{ fontFamily: '"Open Sans", sans-serif' }}>Design Book</span>
            </Link>
            <div>
              <Link 
                to="/" 
                className="text-sm bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 px-6 py-3 rounded-none transition-all flex items-center gap-2 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex gap-12">
            {/* Table of Contents Sidebar */}
            {toc.length > 0 && (
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="fixed top-20 left-4 lg:left-[calc((100%-80rem)/2+2rem)] z-40 w-64 bg-white dark:bg-neutral-900 pr-4 pt-8">
                  <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    <BookOpen className="w-4 h-4" />
                    <span>Contents</span>
                  </div>
                  <ScrollArea className="h-[calc(100vh-160px)]">
                    <nav className="space-y-1">
                      {toc.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(item.id);
                          }}
                          className={`block py-1.5 px-3 text-sm transition-colors rounded-md ${
                            item.level === 1
                              ? 'font-semibold text-neutral-900 dark:text-neutral-100'
                              : item.level === 2
                              ? 'font-medium text-neutral-700 dark:text-neutral-300 pl-6'
                              : 'text-neutral-600 dark:text-neutral-400 pl-9 text-xs'
                          } ${
                            activeSection === item.id
                              ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
                              : 'hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
                          }`}
                        >
                          {item.text}
                        </a>
                      ))}
                    </nav>
                  </ScrollArea>
                </div>
              </aside>
            )}

            {/* Documentation Content */}
            <div className="flex-1 min-w-0">
              <div className="mb-12">
                <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 mb-6 leading-tight font-serif">
                  Documentation
                </h1>
                <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed font-serif max-w-3xl">
                  Complete guide to using Design Book. Learn how to explore tokens, use components, manage themes, and export your design system.
                </p>
              </div>

              {/* Search Bar */}
              <div className="mb-8">
                <Input
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
                />
                {searchQuery && (
                  <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                    {filteredContent.split('\n\n').length} section{filteredContent.split('\n\n').length !== 1 ? 's' : ''} found
                  </p>
                )}
              </div>

              {/* Documentation Content */}
              <div 
                ref={contentRef}
                className="prose prose-neutral dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: htmlContent || '<p>Loading documentation...</p>' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

