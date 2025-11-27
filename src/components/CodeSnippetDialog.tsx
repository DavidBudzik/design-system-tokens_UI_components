import { useState } from 'react';
import { Copy, Check, Code } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { copyToClipboard as copyToClipboardUtil } from '../utils/clipboard';
import { toast } from 'sonner@2.0.3';
import { highlightCode } from '../utils/syntaxHighlight';

interface CodeSnippet {
  html?: string;
  css?: string;
  react?: string;
}

interface CodeSnippetDialogProps {
  componentName: string;
  description: string;
  code: CodeSnippet;
}

export function CodeSnippetDialog({ componentName, description, code }: CodeSnippetDialogProps) {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const copyToClipboard = async (text: string, tab: string) => {
    try {
      await copyToClipboardUtil(text);
      setCopiedTab(tab);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedTab(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy to clipboard');
    }
  };

  const availableTabs = Object.entries(code).filter(([_, value]) => value);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Code className="w-4 h-4" />
          View Code
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[500px] sm:max-w-[500px] flex flex-col">
        <SheetHeader>
          <SheetTitle>{componentName}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        
        <Tabs defaultValue={availableTabs[0]?.[0] || 'react'} className="flex-1 overflow-hidden flex flex-col min-h-0 px-4 pb-4">
          <TabsList className="grid w-full flex-shrink-0" style={{ gridTemplateColumns: `repeat(${availableTabs.length}, 1fr)` }}>
            {code.react && <TabsTrigger value="react">React</TabsTrigger>}
            {code.html && <TabsTrigger value="html">HTML</TabsTrigger>}
            {code.css && <TabsTrigger value="css">CSS</TabsTrigger>}
          </TabsList>
          
          {code.react && (
            <TabsContent value="react" className="flex-1 overflow-hidden flex flex-col mt-4 data-[state=active]:flex data-[state=inactive]:hidden">
              <div className="flex justify-between items-center mb-2 flex-shrink-0">
                <span className="text-sm text-muted-foreground">React Component</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(code.react!, 'react')}
                  className="gap-2"
                >
                  {copiedTab === 'react' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="flex-1 overflow-auto bg-[rgb(239,239,239)] dark:bg-[#0d0d0d] p-4 rounded-md">
                <pre className="text-sm font-mono table min-w-full">
                  <code>{highlightCode(code.react, 'react')}</code>
                </pre>
              </div>
            </TabsContent>
          )}
          
          {code.html && (
            <TabsContent value="html" className="flex-1 overflow-hidden flex flex-col mt-4 data-[state=active]:flex data-[state=inactive]:hidden">
              <div className="flex justify-between items-center mb-2 flex-shrink-0">
                <span className="text-sm text-muted-foreground">HTML Markup</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(code.html!, 'html')}
                  className="gap-2"
                >
                  {copiedTab === 'html' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="flex-1 overflow-auto bg-[rgb(239,239,239)] dark:bg-[#0d0d0d] p-4 rounded-md">
                <pre className="text-sm font-mono table min-w-full">
                  <code>{highlightCode(code.html, 'html')}</code>
                </pre>
              </div>
            </TabsContent>
          )}
          
          {code.css && (
            <TabsContent value="css" className="flex-1 overflow-hidden flex flex-col mt-4 data-[state=active]:flex data-[state=inactive]:hidden">
              <div className="flex justify-between items-center mb-2 flex-shrink-0">
                <span className="text-sm text-muted-foreground">CSS Styles</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(code.css!, 'css')}
                  className="gap-2"
                >
                  {copiedTab === 'css' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="flex-1 overflow-auto bg-[rgb(239,239,239)] dark:bg-[#0d0d0d] p-4 rounded-md">
                <pre className="text-sm font-mono table min-w-full">
                  <code>{highlightCode(code.css, 'css')}</code>
                </pre>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
