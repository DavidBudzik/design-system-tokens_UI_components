import { TypographyDetailsDialog } from './TypographyDetailsDialog';

interface TypographyTokenProps {
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

export function TypographyToken({
  label,
  tokenName,
  description,
  fontSize,
  lineHeight,
  letterSpacing,
  fontWeight = '600',
  fontFamily = 'Inter, system-ui, -apple-system, sans-serif',
  style = {}
}: TypographyTokenProps) {

  return (
    <div className="flex flex-col gap-3 border-b border-border pb-4">
      <div className="relative group transition-all duration-200 hover:bg-accent/30 rounded-lg px-[0px] py-[24px]">
        {/* Main content */}
        <div className="flex items-baseline justify-between gap-6">
          {/* Text sample */}
          <div className="flex-1 max-w-[840px]">
            <p style={{
              fontSize,
              lineHeight,
              letterSpacing,
              fontWeight,
              fontFamily,
              ...style
            }}>
              {label}
            </p>
          </div>

          {/* Token name badge */}
          <div className="shrink-0 bg-[#181818] px-4 py-1 rounded">
            <p className="text-white text-sm whitespace-nowrap">{tokenName}</p>
          </div>

          {/* Font Family */}
          <div className="w-[180px] shrink-0">
            <p className="text-xs text-muted-foreground font-mono">{fontFamily.split(',')[0]}</p>
          </div>

          {/* Description */}
          <div className="w-[280px] shrink-0">
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          {/* Specifications */}
          <div className="w-[240px] shrink-0 flex items-center gap-2">
            <p className="text-sm text-muted-foreground flex-1">
              {fontSize} / {lineHeight}
            </p>
            <TypographyDetailsDialog
              label={label}
              tokenName={tokenName}
              description={description}
              fontSize={fontSize}
              lineHeight={lineHeight}
              letterSpacing={letterSpacing}
              fontWeight={fontWeight}
              fontFamily={fontFamily}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
