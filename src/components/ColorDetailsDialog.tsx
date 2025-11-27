import { useState } from 'react';
import { Copy, Check, Info } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { copyToClipboard } from '../utils/clipboard';
import { toast } from 'sonner@2.0.3';

interface ColorDetailsDialogProps {
  name: string;
  hex: string;
  rgb: string;
  darkHex?: string;
  darkRgb?: string;
}

export function ColorDetailsDialog({ name, hex, rgb, darkHex, darkRgb }: ColorDetailsDialogProps) {
  const [copied, setCopied] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<string>('');

  const handleCopy = async (value: string, format: string) => {
    try {
      await copyToClipboard(value);
      setCopiedFormat(format);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => {
        setCopied(false);
        setCopiedFormat('');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy to clipboard');
    }
  };

  // Calculate if the color is light or dark for text contrast
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const isLightColor = (hex: string) => {
    const rgb = hexToRgb(hex);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 155;
  };

  const rgbObj = hexToRgb(hex);
  const hsl = rgbToHsl(rgbObj.r, rgbObj.g, rgbObj.b);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 z-10">
          <Info className="w-4 h-4" />
          Details
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[800px] sm:max-w-[800px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Color Token Details</SheetTitle>
          <SheetDescription>
            Complete color information and copy options for this token.
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 px-4 pb-4">
          {/* Color preview */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Color Preview</p>
            <div className={darkHex ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : ""}>
              {/* Light mode */}
              <div className="relative">
                <div
                  className="w-full h-32 border border-border shadow-sm"
                  style={{ backgroundColor: hex }}
                />
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-1">
                  <span
                    className="text-2xl tracking-wider drop-shadow-md"
                    style={{ color: isLightColor(hex) ? '#000000' : '#FFFFFF' }}
                  >
                    {hex}
                  </span>
                  {darkHex && (
                    <span
                      className="text-xs tracking-wider drop-shadow-md"
                      style={{ color: isLightColor(hex) ? '#000000' : '#FFFFFF' }}
                    >
                      Light Mode
                    </span>
                  )}
                </div>
              </div>
              {/* Dark mode */}
              {darkHex && (
                <div className="relative">
                  <div
                    className="w-full h-32 border border-border shadow-sm"
                    style={{ backgroundColor: darkHex }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center flex-col gap-1">
                    <span
                      className="text-2xl tracking-wider drop-shadow-md"
                      style={{ color: isLightColor(darkHex) ? '#000000' : '#FFFFFF' }}
                    >
                      {darkHex}
                    </span>
                    <span
                      className="text-xs tracking-wider drop-shadow-md"
                      style={{ color: isLightColor(darkHex) ? '#000000' : '#FFFFFF' }}
                    >
                      Dark Mode
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left column - Token info */}
            <div className="space-y-4">
              {/* Token name */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Token Name</p>
                <div className="bg-muted/50 border border-border px-4 py-3">
                  <p className="break-all text-sm font-mono">{name}</p>
                </div>
              </div>
              
              {/* Light Mode RGB Values */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Light Mode RGB</p>
                <div className="bg-muted/50 border border-border p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Red</span>
                    <span className="text-sm font-mono">{rgbObj.r}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Green</span>
                    <span className="text-sm font-mono">{rgbObj.g}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Blue</span>
                    <span className="text-sm font-mono">{rgbObj.b}</span>
                  </div>
                </div>
              </div>
              
              {/* Dark Mode RGB Values */}
              {darkHex && (
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Dark Mode RGB</p>
                  <div className="bg-muted/50 border border-border p-4 space-y-2">
                    {(() => {
                      const darkRgbObj = hexToRgb(darkHex);
                      return (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Red</span>
                            <span className="text-sm font-mono">{darkRgbObj.r}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Green</span>
                            <span className="text-sm font-mono">{darkRgbObj.g}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Blue</span>
                            <span className="text-sm font-mono">{darkRgbObj.b}</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>

            {/* Right column - Color formats */}
            <div className="space-y-4">
              {/* Light Mode HSL */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Light Mode HSL</p>
                <div className="bg-muted/50 border border-border px-4 py-3">
                  <p className="text-sm font-mono">{hsl}</p>
                </div>
              </div>
              
              {/* Dark Mode HSL */}
              {darkHex && (
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Dark Mode HSL</p>
                  <div className="bg-muted/50 border border-border px-4 py-3">
                    <p className="text-sm font-mono">{(() => {
                      const darkRgbObj = hexToRgb(darkHex);
                      return rgbToHsl(darkRgbObj.r, darkRgbObj.g, darkRgbObj.b);
                    })()}</p>
                  </div>
                </div>
              )}

              {/* Copy options */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Copy Light Mode</p>
                <div className="space-y-2">
                  <Button
                    onClick={() => handleCopy(hex, 'hex')}
                    variant={copied && copiedFormat === 'hex' ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-between gap-2"
                  >
                    <span className="flex items-center gap-2">
                      {copied && copiedFormat === 'hex' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      HEX
                    </span>
                    <span className="font-mono text-xs">{hex}</span>
                  </Button>
                  <Button
                    onClick={() => handleCopy(rgb, 'rgb')}
                    variant={copied && copiedFormat === 'rgb' ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-between gap-2"
                  >
                    <span className="flex items-center gap-2">
                      {copied && copiedFormat === 'rgb' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      RGB
                    </span>
                    <span className="font-mono text-xs">{rgb}</span>
                  </Button>
                  <Button
                    onClick={() => handleCopy(hsl, 'hsl')}
                    variant={copied && copiedFormat === 'hsl' ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-between gap-2"
                  >
                    <span className="flex items-center gap-2">
                      {copied && copiedFormat === 'hsl' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      HSL
                    </span>
                    <span className="font-mono text-xs">{hsl}</span>
                  </Button>
                </div>
              </div>
              
              {/* Dark mode copy options */}
              {darkHex && darkRgb && (
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Copy Dark Mode</p>
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleCopy(darkHex, 'dark-hex')}
                      variant={copied && copiedFormat === 'dark-hex' ? 'default' : 'outline'}
                      size="sm"
                      className="w-full justify-between gap-2"
                    >
                      <span className="flex items-center gap-2">
                        {copied && copiedFormat === 'dark-hex' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        HEX
                      </span>
                      <span className="font-mono text-xs">{darkHex}</span>
                    </Button>
                    <Button
                      onClick={() => handleCopy(darkRgb, 'dark-rgb')}
                      variant={copied && copiedFormat === 'dark-rgb' ? 'default' : 'outline'}
                      size="sm"
                      className="w-full justify-between gap-2"
                    >
                      <span className="flex items-center gap-2">
                        {copied && copiedFormat === 'dark-rgb' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        RGB
                      </span>
                      <span className="font-mono text-xs">{darkRgb}</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Export as Code Snippet */}
          <div className="space-y-3 border-t border-border pt-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Export as Code Snippet</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                onClick={() => {
                  let cssCode = `/* ${name} */
:root {
  ${name}: ${hex};
}`;
                  if (darkHex) {
                    cssCode += `
.dark {
  ${name}: ${darkHex};
}`;
                  }
                  handleCopy(cssCode, 'css');
                }}
                variant={copied && copiedFormat === 'css' ? 'default' : 'outline'}
                size="sm"
                className="justify-start gap-2"
              >
                {copied && copiedFormat === 'css' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Copy CSS
              </Button>
              <Button
                onClick={() => {
                  let scssCode = `// ${name}
${name.replace(/^--/, '$')}: ${hex};`;
                  if (darkHex) {
                    scssCode += `
${name.replace(/^--/, '$')}-dark: ${darkHex};`;
                  }
                  handleCopy(scssCode, 'scss');
                }}
                variant={copied && copiedFormat === 'scss' ? 'default' : 'outline'}
                size="sm"
                className="justify-start gap-2"
              >
                {copied && copiedFormat === 'scss' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Copy SCSS
              </Button>
              <Button
                onClick={() => {
                  let jsCode = `// ${name}
const ${name.replace(/^--/, '').replace(/-/g, '_').toUpperCase()} = '${hex}';`;
                  if (darkHex) {
                    jsCode += `
const ${name.replace(/^--/, '').replace(/-/g, '_').toUpperCase()}_DARK = '${darkHex}';`;
                  }
                  handleCopy(jsCode, 'js');
                }}
                variant={copied && copiedFormat === 'js' ? 'default' : 'outline'}
                size="sm"
                className="justify-start gap-2"
              >
                {copied && copiedFormat === 'js' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Copy JS
              </Button>
              <Button
                onClick={() => {
                  const jsonObj: any = {
                    name,
                    light: { hex, rgb, hsl }
                  };
                  if (darkHex && darkRgb) {
                    const darkRgbObj = hexToRgb(darkHex);
                    const darkHsl = rgbToHsl(darkRgbObj.r, darkRgbObj.g, darkRgbObj.b);
                    jsonObj.dark = { hex: darkHex, rgb: darkRgb, hsl: darkHsl };
                  }
                  const jsonCode = JSON.stringify(jsonObj, null, 2);
                  handleCopy(jsonCode, 'json');
                }}
                variant={copied && copiedFormat === 'json' ? 'default' : 'outline'}
                size="sm"
                className="justify-start gap-2"
              >
                {copied && copiedFormat === 'json' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Copy JSON
              </Button>
            </div>
          </div>

          {/* Copy All Details */}
          <div className="space-y-3 border-t border-border pt-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Copy All Details</p>
            <Button
              onClick={() => {
                let allDetails = `Token: ${name}
Light Mode:
  HEX: ${hex}
  RGB: ${rgb}
  HSL: ${hsl}
  R: ${rgbObj.r}, G: ${rgbObj.g}, B: ${rgbObj.b}`;
                if (darkHex && darkRgb) {
                  const darkRgbObj = hexToRgb(darkHex);
                  const darkHsl = rgbToHsl(darkRgbObj.r, darkRgbObj.g, darkRgbObj.b);
                  allDetails += `

Dark Mode:
  HEX: ${darkHex}
  RGB: ${darkRgb}
  HSL: ${darkHsl}
  R: ${darkRgbObj.r}, G: ${darkRgbObj.g}, B: ${darkRgbObj.b}`;
                }
                handleCopy(allDetails, 'all');
              }}
              variant={copied && copiedFormat === 'all' ? 'default' : 'outline'}
              className="w-full justify-start gap-2"
            >
              {copied && copiedFormat === 'all' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied && copiedFormat === 'all' ? 'Copied All Details!' : 'Copy All Details'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Helper function to convert RGB to HSL
function rgbToHsl(r: number, g: number, b: number): string {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}