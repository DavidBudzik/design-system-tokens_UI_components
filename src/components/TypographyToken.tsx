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
    <div className="relative group transition-all duration-200 hover:bg-accent/30 p-6 grid" style={{ gridTemplateRows: '160px auto 60px 80px auto' }}>
      {/* Text Sample - Large and prominent - FIXED HEIGHT */}
      <div className="flex items-center overflow-hidden">
        <p style={{
          fontSize,
          lineHeight,
          letterSpacing,
          fontWeight,
          fontFamily,
          ...style
        }}
        className="break-words line-clamp-3"
        >
          {label}
        </p>
      </div>

      {/* Divider */}
      <div className="pt-6 pb-4">
        <div className="border-t border-border"></div>
      </div>

      {/* Token name badge */}
      <div>
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Token</p>
        <div className="bg-[#181818] dark:bg-[#282828] px-3 py-1.5 rounded inline-block">
          <p className="text-white text-xs font-mono">{tokenName}</p>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Description</p>
        <p className="text-sm text-foreground leading-relaxed">{description}</p>
      </div>

      {/* Specifications and Button */}
      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Specifications</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Size: </span>
              <span className="font-medium">{fontSize}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Line: </span>
              <span className="font-medium">{lineHeight}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Spacing: </span>
              <span className="font-medium">{letterSpacing}</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-muted-foreground text-sm">Font: </span>
            <span className="font-mono text-xs">{fontFamily.split(',')[0]}</span>
          </div>
        </div>

        {/* Details Button */}
        <div>
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
  );
}
