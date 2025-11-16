import { ReactNode } from 'react';
import { Card } from './ui/card';
import { CodeSnippetDialog } from './CodeSnippetDialog';
import { Badge } from './ui/badge';

interface CodeSnippet {
  html?: string;
  css?: string;
  react?: string;
}

interface ComponentShowcaseProps {
  title: string;
  description: string;
  preview: ReactNode;
  code: CodeSnippet;
  tokens?: string[];
}

export function ComponentShowcase({ 
  title, 
  description, 
  preview, 
  code,
  tokens 
}: ComponentShowcaseProps) {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1 flex-1">
          <h4 className="text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
          {tokens && tokens.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {tokens.map((token) => (
                <Badge key={token} variant="secondary" className="text-xs font-mono">
                  {token}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <CodeSnippetDialog
          componentName={title}
          description={description}
          code={code}
        />
      </div>
      <div className="border border-border rounded-lg p-8 bg-surface-subtle flex items-center justify-center min-h-[120px]">
        {preview}
      </div>
    </Card>
  );
}
