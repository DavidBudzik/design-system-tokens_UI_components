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
    <div className="space-y-4">
      <div className="mb-8">
        <h3 className="text-2xl">{title}</h3>
      </div>
      <div className="space-y-0">
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
