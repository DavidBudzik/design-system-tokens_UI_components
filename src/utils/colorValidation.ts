/**
 * Utility functions to ensure color tokens are properly defined for both light and dark modes
 */

import { Token, Section } from '../data/designSystemData';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validates that a token has both light and dark mode colors defined
 */
export function validateToken(token: Token): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if light mode colors exist
  if (!token.hex || !token.rgb) {
    errors.push(`Token "${token.name}" is missing light mode colors (hex or rgb)`);
  }

  // Check if dark mode colors exist
  if (!token.darkHex || !token.darkRgb) {
    warnings.push(`Token "${token.name}" is missing dark mode colors (darkHex or darkRgb)`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validates all tokens in a section
 */
export function validateSection(section: Section): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  section.tokens.forEach(token => {
    const result = validateToken(token);
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validates all sections in the design system
 */
export function validateDesignSystem(sections: Section[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  sections.forEach(section => {
    const result = validateSection(section);
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Ensures a token has both light and dark mode colors
 * If dark mode colors are missing, generates them as inversions of light colors
 */
export function ensureDarkModeColors(token: Token): Token {
  // If dark mode colors already exist, return as is
  if (token.darkHex && token.darkRgb) {
    return token;
  }

  // Generate dark mode colors if missing
  // This is a simple inversion - you may want to adjust this logic
  const lightRgb = parseRgb(token.rgb);
  if (!lightRgb) {
    console.warn(`Cannot parse RGB for token ${token.name}: ${token.rgb}`);
    return token;
  }

  // For dark mode, we typically want lighter versions of dark colors and darker versions of light colors
  // This is a simplified approach - adjust based on your design needs
  const isDarkColor = (lightRgb.r + lightRgb.g + lightRgb.b) / 3 < 128;
  
  let darkRgb: { r: number; g: number; b: number };
  if (isDarkColor) {
    // Make it lighter for dark mode
    darkRgb = {
      r: Math.min(255, lightRgb.r + 50),
      g: Math.min(255, lightRgb.g + 50),
      b: Math.min(255, lightRgb.b + 50)
    };
  } else {
    // Make it darker for dark mode
    darkRgb = {
      r: Math.max(0, lightRgb.r - 50),
      g: Math.max(0, lightRgb.g - 50),
      b: Math.max(0, lightRgb.b - 50)
    };
  }

  return {
    ...token,
    darkHex: rgbToHex(darkRgb.r, darkRgb.g, darkRgb.b),
    darkRgb: `rgb(${darkRgb.r}, ${darkRgb.g}, ${darkRgb.b})`
  };
}

/**
 * Parses an RGB string like "rgb(255, 255, 255)" into components
 */
function parseRgb(rgbString: string): { r: number; g: number; b: number } | null {
  const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match || !match[1] || !match[2] || !match[3]) return null;
  
  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10)
  };
}

/**
 * Converts RGB values to hex color
 */
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b]
    .map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('')
    .toUpperCase();
}

/**
 * Creates a new token with updated colors for both light and dark modes
 */
export function updateTokenColors(
  token: Token,
  lightHex: string,
  lightRgb: string,
  darkHex?: string,
  darkRgb?: string
): Token {
  // If dark mode colors are not provided, log a warning
  if (!darkHex || !darkRgb) {
    console.warn(`⚠️ Dark mode colors not provided for "${token.name}". Consider adding darkHex and darkRgb.`);
  }

  return {
    ...token,
    hex: lightHex,
    rgb: lightRgb,
    darkHex: darkHex || token.darkHex,
    darkRgb: darkRgb || token.darkRgb
  };
}
