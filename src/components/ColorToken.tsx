import { ColorDetailsDialog } from './ColorDetailsDialog';
import { useEffect, useState } from 'react';

interface ColorTokenProps {
  name: string;
  hex: string;
  rgb: string;
  darkHex?: string;
  darkRgb?: string;
}

export function ColorToken({ name, hex, rgb, darkHex, darkRgb }: ColorTokenProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const currentHex = isDark && darkHex ? darkHex : hex;
  const currentRgb = isDark && darkRgb ? darkRgb : rgb;

  return (
    <div className="flex flex-col gap-3">
      <div
        className="w-[240px] h-[240px] shadow-sm border border-border/50 relative group transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-primary/30"
        style={{ backgroundColor: currentHex }}
      >
        {/* Details button - appears on hover */}
        <ColorDetailsDialog 
          name={name} 
          hex={hex} 
          rgb={rgb}
          darkHex={darkHex}
          darkRgb={darkRgb}
        />
      </div>
      
      <div className="flex flex-col gap-1 w-[240px]">
        <p className="text-sm text-muted-foreground break-all">{name}</p>
        <p className="text-xs text-muted-foreground/80">{currentHex}</p>
        <p className="text-xs text-muted-foreground/60">{currentRgb}</p>
        {darkHex && (
          <p className="text-xs text-muted-foreground/40 italic">
            {isDark ? 'Dark mode' : 'Light mode'}
          </p>
        )}
      </div>
    </div>
  );
}
