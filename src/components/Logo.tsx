import tinycolor from 'tinycolor2';
import { BaseColors } from '../data/themePalettes';

interface LogoProps {
  baseColors: BaseColors;
  theme?: 'light' | 'dark';
  className?: string;
}

export function Logo({ baseColors, theme = 'light', className = '' }: LogoProps) {
  const isDark = theme === 'dark';
  const primaryColor = tinycolor(baseColors.primary);
  const ctaColor = tinycolor(baseColors.cta);
  
  // Adjust colors based on theme for optimal visibility
  let color1: string;
  let color2: string;
  let color3: string;
  
  if (isDark) {
    // Dark mode: Lighten and saturate colors for better visibility on dark backgrounds
    // Ensure colors are bright enough to stand out
    const primaryLight = primaryColor.isDark() 
      ? primaryColor.clone().lighten(40).saturate(30)
      : primaryColor.clone().lighten(20).saturate(20);
    
    const ctaLight = ctaColor.isDark()
      ? ctaColor.clone().lighten(30).saturate(20)
      : ctaColor.clone().lighten(15).saturate(10);
    
    color1 = primaryLight.clone().lighten(10).toHexString(); // Bottom layer - lightest
    color2 = primaryLight.toHexString(); // Middle layer
    color3 = ctaLight.toHexString(); // Top layer - CTA color
  } else {
    // Light mode: Use original color scheme
    color1 = primaryColor.clone().saturate(20).lighten(15).toHexString(); // Bottom layer - lightest
    color2 = primaryColor.toHexString(); // Middle layer - base primary
    color3 = ctaColor.toHexString(); // Top layer - CTA color
  }

  return (
    <svg 
      width="50" 
      height="50" 
      viewBox="0 0 50 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Design System Logo"
    >
      <path 
        d="M27.2673 9.66048C27.2673 6.68816 30.8811 5.22217 32.9518 7.35447L46.038 20.8296C47.2962 22.1252 48 23.8602 48 25.6662V40.8405C48 43.8128 44.3862 45.2788 42.3155 43.1465L29.2293 29.6713C27.9711 28.3757 27.2673 26.6408 27.2673 24.8348V9.66048Z" 
        fill={color1}
      />
      <path 
        d="M14.4185 9.15951C14.4185 6.18719 18.0323 4.72121 20.1031 6.85351L32.9073 20.0383C34.3463 21.5201 35.1513 23.5044 35.1513 25.5699V40.3395C35.1513 43.3119 31.5375 44.7778 29.4667 42.6455L16.3805 29.1704C15.1223 27.8748 14.4185 26.1398 14.4185 24.3338V9.15951Z" 
        fill={color2}
      />
      <path 
        d="M2.00021 9.66048C2.00021 6.68816 5.61401 5.22217 7.68476 7.35447L20.7709 20.8296C22.0292 22.1252 22.7329 23.8602 22.7329 25.6662V40.8405C22.7329 43.8128 19.1192 45.2788 17.0484 43.1465L3.96222 29.6713C2.70401 28.3757 2.00021 26.6408 2.00021 24.8348V9.66048Z" 
        fill={color3}
      />
    </svg>
  );
}

