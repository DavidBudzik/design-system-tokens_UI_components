import { useState } from 'react';
import { Copy, Check, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { copyToClipboard } from '../utils/clipboard';
import { toast } from 'sonner@2.0.3';

interface TypographyDetailsDialogProps {
  label: string;
  tokenName: string;
  description: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  fontWeight: string;
  fontFamily: string;
}

export function TypographyDetailsDialog({
  label,
  tokenName,
  description,
  fontSize,
  lineHeight,
  letterSpacing,
  fontWeight,
  fontFamily,
}: TypographyDetailsDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const cssValue = `font-family: ${fontFamily}; font-size: ${fontSize}; line-height: ${lineHeight}; letter-spacing: ${letterSpacing}; font-weight: ${fontWeight};`;
    try {
      await copyToClipboard(cssValue);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Info className="w-4 h-4" />
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl min-w-[600px]">
        <DialogHeader>
          <DialogTitle>Typography Token Details</DialogTitle>
          <DialogDescription>
            Complete specifications and usage information for this typography token.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Preview */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Preview</p>
            <div className="bg-muted/30 border border-border p-6 flex items-center justify-center">
              <p style={{
                fontFamily,
                fontSize,
                lineHeight,
                letterSpacing,
                fontWeight,
              }}>
                {label}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Left column - Token info */}
            <div className="space-y-4">
              {/* Token name */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Token Name</p>
                <div className="bg-muted/50 border border-border px-4 py-3">
                  <p className="break-all text-sm font-mono">{tokenName}</p>
                </div>
              </div>
              
              {/* Description */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Use Case</p>
                <div className="bg-muted/50 border border-border px-4 py-3">
                  <p className="text-sm">{description}</p>
                </div>
              </div>
            </div>

            {/* Right column - CSS Properties */}
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">CSS Properties</p>
              <div className="bg-muted/50 border border-border p-4 space-y-2.5">
                <div className="flex justify-between items-center pb-2.5 border-b border-border">
                  <span className="text-xs text-muted-foreground">font-family</span>
                  <span className="text-sm font-mono">{fontFamily.split(',')[0]}</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-border">
                  <span className="text-xs text-muted-foreground">font-size</span>
                  <span className="text-sm font-mono">{fontSize}</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-border">
                  <span className="text-xs text-muted-foreground">line-height</span>
                  <span className="text-sm font-mono">{lineHeight}</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-border">
                  <span className="text-xs text-muted-foreground">letter-spacing</span>
                  <span className="text-sm font-mono">{letterSpacing}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">font-weight</span>
                  <span className="text-sm font-mono">{fontWeight}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copy button */}
          <div className="pt-4 border-t border-border">
            <Button onClick={handleCopy} className="w-full gap-2" variant={copied ? "default" : "outline"}>
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied to clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy CSS Properties
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
