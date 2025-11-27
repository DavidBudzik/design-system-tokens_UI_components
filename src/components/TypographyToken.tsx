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
    <div className="border-b border-border last:border-b-0">
      <div className="relative group transition-all duration-200 hover:bg-accent/30 rounded-lg px-4 py-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-12 gap-4 items-start">
          
          {/* Text Sample - Takes up most space */}
          <div className="col-span-5">
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
          <div className="col-span-2 flex justify-center items-start pt-1">
            <div className="bg-[#181818] dark:bg-[#282828] px-3 py-1.5 rounded">
              <p className="text-white text-xs font-mono whitespace-nowrap">{tokenName}</p>
            </div>
          </div>

          {/* Description */}
          <div className="col-span-3">
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>

          {/* Specifications */}
          <div className="col-span-2 flex flex-col gap-2">
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">{fontSize} / {lineHeight}</p>
              <p className="font-mono">{fontFamily.split(',')[0]}</p>
            </div>
            <div className="mt-2">
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
    </div>
  );
}
