import { BookType } from 'lucide-react';
import { BaseColors } from '../data/themePalettes';

interface LogoProps {
  baseColors: BaseColors;
  className?: string;
}

export function Logo({ baseColors, className = '' }: LogoProps) {
  return (
    <div 
      className={`w-10 h-10 rounded-none flex items-center justify-center ${className}`}
      style={{ backgroundColor: baseColors.cta, color: '#FFFFFF' }}
      aria-label="Design Book Logo"
    >
      <BookType className="w-5 h-5" />
    </div>
  );
}

