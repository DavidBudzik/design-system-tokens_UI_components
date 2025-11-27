import { useState } from 'react';
import { TypographyToken } from './TypographyToken';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface TypographyItem {
  label: string;
  tokenName: string;
  description: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  fontWeight?: string;
  fontFamily?: string;
  style?: React.CSSProperties;
}

interface TypographySectionProps {
  title: string;
  items: TypographyItem[];
}

const googleFonts = [
  { name: 'Inter', value: 'Inter, sans-serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Open Sans', value: '"Open Sans", sans-serif' },
  { name: 'Lato', value: 'Lato, sans-serif' },
  { name: 'Montserrat', value: 'Montserrat, sans-serif' },
  { name: 'Poppins', value: 'Poppins, sans-serif' },
  { name: 'Raleway', value: 'Raleway, sans-serif' },
  { name: 'Source Sans Pro', value: '"Source Sans Pro", sans-serif' },
  { name: 'Nunito', value: 'Nunito, sans-serif' },
  { name: 'Playfair Display', value: '"Playfair Display", serif' },
  { name: 'Merriweather', value: 'Merriweather, serif' },
  { name: 'PT Sans', value: '"PT Sans", sans-serif' },
];

export function TypographySection({ title, items }: TypographySectionProps) {
  const [placeholderText, setPlaceholderText] = useState('The quick brown fox jumps over the lazy dog');
  const [selectedFont, setSelectedFont] = useState('Inter, sans-serif');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">Customize preview text and font, then click any style for details</p>
      </div>

      {/* Controls Row */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg border border-border">
        <div className="space-y-2">
          <Label htmlFor="placeholder-text" className="text-sm font-medium">
            Preview Text
          </Label>
          <Input
            id="placeholder-text"
            type="text"
            placeholder="Enter custom text..."
            value={placeholderText}
            onChange={(e) => setPlaceholderText(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="font-select" className="text-sm font-medium">
            Font Family
          </Label>
          <Select value={selectedFont} onValueChange={setSelectedFont}>
            <SelectTrigger id="font-select" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {googleFonts.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  <span style={{ fontFamily: font.value }}>{font.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* 2-Row Grid Layout with Subgrid */}
      <div className="grid grid-cols-2 gap-6 auto-rows-max">
        {items.map((item, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden bg-card">
            <TypographyToken
              label={placeholderText}
              tokenName={item.tokenName}
              description={item.description}
              fontSize={item.fontSize}
              lineHeight={item.lineHeight}
              letterSpacing={item.letterSpacing}
              fontWeight={item.fontWeight}
              fontFamily={selectedFont}
              style={item.style}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
