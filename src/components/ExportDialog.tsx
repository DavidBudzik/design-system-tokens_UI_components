import { Download, FileCode, FileJson, FileText, Smartphone, Monitor } from 'lucide-react';
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

  return (
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
                      onClick={() => handleExport(formatKey as ExportFormat)}
                      className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-accent hover:border-primary/50 transition-all text-left group"
                    >
                      <div className="mt-1 p-2 rounded bg-muted group-hover:bg-primary/10">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{format.name}</span>
                          <Download className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                      onClick={() => handleExport(formatKey as ExportFormat)}
                      className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-accent hover:border-primary/50 transition-all text-left group"
                    >
                      <div className="mt-1 p-2 rounded bg-muted group-hover:bg-primary/10">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{format.name}</span>
                          <Download className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                      onClick={() => handleExport(formatKey as ExportFormat)}
                      className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-accent hover:border-primary/50 transition-all text-left group"
                    >
                      <div className="mt-1 p-2 rounded bg-muted group-hover:bg-primary/10">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{format.name}</span>
                          <Download className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
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
  );
}
