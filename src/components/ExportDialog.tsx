import { useState } from 'react';
import { Download, FileCode, FileJson, FileText, Smartphone, Monitor, Copy, Check, Eye, ArrowLeft } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { exportFormats, ExportFormat } from '../utils/exportFormats';
import { highlightCode } from '../utils/syntaxHighlight';
import { copyToClipboard } from '../utils/clipboard';
import { toast } from 'sonner';

interface Token {
  name: string;
  hex: string;
  rgb: string;
}

interface Section {
  title: string;
  description: string;
  tokens: Token[];
}

interface ExportDialogProps {
  sections: Section[];
}

const formatIcons: Record<string, any> = {
  css: FileCode,
  scss: FileCode,
  json: FileJson,
  javascript: FileText,
  typescript: FileText,
  tailwind: FileCode,
  swift: Smartphone,
  kotlin: Smartphone,
  xml: FileCode,
  less: FileCode,
  figmaTokens: Monitor,
};

const formatCategories = {
  web: ["css", "scss", "less", "tailwind", "javascript", "typescript"],
  data: ["json", "figmaTokens"],
  mobile: ["swift", "kotlin", "xml"],
};

export function ExportDialog({ sections }: ExportDialogProps) {
  const [previewFormat, setPreviewFormat] = useState<ExportFormat | null>(null);
  const [previewCode, setPreviewCode] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handlePreview = (format: ExportFormat) => {
    const formatConfig = exportFormats[format];
    const content = formatConfig.generate(sections);
    setPreviewCode(content);
    setPreviewFormat(format);
  };

  const handleExport = (format: ExportFormat) => {
    const formatConfig = exportFormats[format];
    const content = formatConfig.generate(sections);
    
    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `design-book${formatConfig.extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    try {
      await copyToClipboard(previewCode);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy to clipboard');
    }
  };

  const getLanguageForFormat = (format: ExportFormat): 'css' | 'json' | 'javascript' | 'typescript' | 'html' => {
    if (format === 'css' || format === 'scss' || format === 'less') return 'css';
    if (format === 'json' || format === 'figmaTokens') return 'json';
    if (format === 'typescript') return 'typescript';
    if (format === 'javascript' || format === 'tailwind' || format === 'swift' || format === 'kotlin') return 'javascript';
    if (format === 'xml') return 'html';
    return 'javascript';
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="lg" className="gap-2 bg-cta hover:bg-cta/90 text-cta-foreground">
            <Download className="w-5 h-5" />
            Export Tokens
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[800px] sm:max-w-[800px] flex flex-col h-full p-0 overflow-hidden">
          <SheetHeader className="px-6 pt-6 pb-4 shrink-0">
            <SheetTitle>Export Design Tokens</SheetTitle>
            <SheetDescription>
              Choose a format to export your design system tokens. Select the format that matches your tech stack or design tools.
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full px-6 pb-6">
              <div className="space-y-6 pr-4">
              {/* Web Formats */}
              <div>
                <h4 className="mb-3 flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  Web Development
                </h4>
                <div className="grid gap-3">
                  {formatCategories.web.map((formatKey) => {
                    const format = exportFormats[formatKey as ExportFormat];
                    const Icon = formatIcons[formatKey];
                    
                    return (
                      <button
                        key={formatKey}
                        onClick={() => handlePreview(formatKey as ExportFormat)}
                        className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-accent hover:border-primary/50 transition-all text-left group"
                      >
                        <div className="mt-1 p-2 rounded bg-muted group-hover:bg-primary/10">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{format.name}</span>
                            <Eye className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {format.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Data Formats */}
              <div>
                <h4 className="mb-3 flex items-center gap-2">
                  <FileJson className="w-4 h-4" />
                  Data & Design Tools
                </h4>
                <div className="grid gap-3">
                  {formatCategories.data.map((formatKey) => {
                    const format = exportFormats[formatKey as ExportFormat];
                    const Icon = formatIcons[formatKey];
                    
                    return (
                      <button
                        key={formatKey}
                        onClick={() => handlePreview(formatKey as ExportFormat)}
                        className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-accent hover:border-primary/50 transition-all text-left group"
                      >
                        <div className="mt-1 p-2 rounded bg-muted group-hover:bg-primary/10">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{format.name}</span>
                            <Eye className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {format.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Formats */}
              <div>
                <h4 className="mb-3 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Mobile Development
                </h4>
                <div className="grid gap-3">
                  {formatCategories.mobile.map((formatKey) => {
                    const format = exportFormats[formatKey as ExportFormat];
                    const Icon = formatIcons[formatKey];
                    
                    return (
                      <button
                        key={formatKey}
                        onClick={() => handlePreview(formatKey as ExportFormat)}
                        className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-accent hover:border-primary/50 transition-all text-left group"
                      >
                        <div className="mt-1 p-2 rounded bg-muted group-hover:bg-primary/10">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{format.name}</span>
                            <Eye className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {format.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>

      {/* Preview Dialog */}
      <Sheet open={previewFormat !== null} onOpenChange={(open) => !open && setPreviewFormat(null)}>
        <SheetContent side="right" className="w-[800px] sm:max-w-[800px] flex flex-col h-full p-0 overflow-hidden [&>button]:hidden">
          <SheetHeader className="px-6 pt-6 pb-4 shrink-0 border-b border-border">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setPreviewFormat(null)}
                  className="h-8 w-8 flex-shrink-0"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="min-w-0 flex-1">
                  <SheetTitle className="truncate">{previewFormat ? exportFormats[previewFormat].name : ''} Preview</SheetTitle>
                  <SheetDescription className="truncate">
                    Preview and copy the exported code before downloading.
                  </SheetDescription>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  onClick={handleCopy}
                  variant={copied ? "default" : "outline"}
                  size="sm"
                  className="gap-2"
                >
                  {copied ? (
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
                <Button
                  onClick={() => previewFormat && handleExport(previewFormat)}
                  size="sm"
                  variant="default"
                  className="gap-2 bg-cta hover:bg-cta/90 text-cta-foreground transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>
          </SheetHeader>
          
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6">
                <div className="bg-[rgb(239,239,239)] dark:bg-[#0d0d0d] p-4 rounded-md border border-border">
                  <pre className="text-sm font-mono table min-w-full">
                    <code>{previewFormat && highlightCode(previewCode, getLanguageForFormat(previewFormat))}</code>
                  </pre>
                </div>
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
