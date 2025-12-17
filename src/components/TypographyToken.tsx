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
  // Consistent preview box height for all typography sizes
  const previewHeight = '100px';
  const gridTemplateRows = '100px auto 60px 80px auto';

  // Check if this is a link token and apply link color from design system
  const isLink = tokenName.startsWith('link_');
  const isHover = tokenName.includes('hover');
  
  // Get link color from CSS variable
  const linkColor = isHover 
    ? 'var(--link-link-hover, var(--link, #308FED))'
    : 'var(--link-link-default, var(--link, #308FED))';

  // Determine if this is a heading token (use center alignment and line-clamp)
  const isHeading = tokenName.startsWith('heading_');
  const containerClasses = isHeading 
    ? "flex items-center overflow-hidden" 
    : "flex items-start";
  const textClasses = isHeading 
    ? "break-words line-clamp-3" 
    : "break-words";

  return (
    <div className="relative group transition-all duration-200 hover:bg-accent/30 p-6 grid" style={{ gridTemplateRows }}>
      {/* Text Sample - Fixed height for all sizes, aligned to top to prevent clipping */}
      <div 
        className={containerClasses} 
        style={isHeading 
          ? { height: previewHeight, overflow: 'hidden' }
          : { minHeight: previewHeight, overflow: 'hidden' }
        }
      >
        <p style={{
          fontSize,
          lineHeight,
          letterSpacing,
          fontWeight,
          fontFamily,
          color: isLink ? linkColor : undefined,
          ...style
        }}
        className={textClasses}
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
