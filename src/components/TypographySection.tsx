import { TypographyToken } from './TypographyToken';

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

export function TypographySection({ title, items }: TypographySectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">Click on any style for detailed information and export options</p>
      </div>
      
      {/* Header Row */}
      <div className="grid grid-cols-12 gap-4 px-4 pb-3 border-b border-border/50">
        <div className="col-span-5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Sample
        </div>
        <div className="col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-wider text-center">
          Token
        </div>
        <div className="col-span-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Description
        </div>
        <div className="col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Specs
        </div>
      </div>
      
      {/* Token Items */}
      <div className="border border-border rounded-lg overflow-hidden">
        {items.map((item, index) => (
          <TypographyToken
            key={index}
            label={item.label}
            tokenName={item.tokenName}
            description={item.description}
            fontSize={item.fontSize}
            lineHeight={item.lineHeight}
            letterSpacing={item.letterSpacing}
            fontWeight={item.fontWeight}
            fontFamily={item.fontFamily}
            style={item.style}
          />
        ))}
      </div>
    </div>
  );
}
