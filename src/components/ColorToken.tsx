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
    <div className="flex flex-col gap-2">
      <div
        className="w-full aspect-square shadow-sm border border-border/50 relative group transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-primary/30 rounded-lg"
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
      
      <div className="flex flex-col gap-0.5 px-1">
        <p className="text-xs font-medium text-foreground truncate" title={name}>{name}</p>
        <p className="text-xs text-muted-foreground">{currentHex}</p>
        <p className="text-[10px] text-muted-foreground/60 truncate">{currentRgb}</p>
        {darkHex && (
          <p className="text-[10px] text-muted-foreground/40 italic">
            {isDark ? 'Dark' : 'Light'}
          </p>
        )}
      </div>
    </div>
  );
}
