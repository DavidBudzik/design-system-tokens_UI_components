/**
 * Utility for loading and accessing design tokens
 * Can load from local source (designSystemData) or from public JSON endpoint
 */

import { designSystemData, Section, Token } from '../data/designSystemData';

export interface TokensExport {
  sections: Section[];
  meta: {
    version: string;
    generatedAt: string;
    source: string;
    totalTokens: number;
  };
}

/**
 * Get all design tokens from local source
 */
export function getLocalTokens(): TokensExport {
  return {
    sections: designSystemData.sections,
    meta: {
      version: '1.0.0',
      generatedAt: new Date().toISOString(),
      source: 'https://github.com/DavidBudzik/design-system-tokens_UI_components',
      totalTokens: designSystemData.sections.reduce(
        (sum, section) => sum + section.tokens.length,
        0
      ),
    },
  };
}

/**
 * Fetch tokens from the public endpoint
 * Useful for external tools and Figma plugins
 */
export async function fetchTokens(
  baseUrl: string = window.location.origin
): Promise<TokensExport> {
  try {
    const response = await fetch(`${baseUrl}/tokens.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch tokens: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tokens:', error);
    throw error;
  }
}

/**
 * Get a specific token by name
 */
export function getToken(name: string): Token | undefined {
  for (const section of designSystemData.sections) {
    const token = section.tokens.find((t) => t.name === name);
    if (token) {
      return token;
    }
  }
  return undefined;
}

/**
 * Get all tokens from a specific section
 */
export function getTokensBySection(title: string): Token[] {
  const section = designSystemData.sections.find((s) => s.title === title);
  return section ? section.tokens : [];
}

/**
 * Get all token names as an array
 */
export function getAllTokenNames(): string[] {
  return designSystemData.sections.flatMap((section) =>
    section.tokens.map((token) => token.name)
  );
}

/**
 * Get all tokens as a flat array
 */
export function getAllTokens(): Token[] {
  return designSystemData.sections.flatMap((section) => section.tokens);
}

/**
 * Get a token's light mode color
 */
export function getTokenColor(name: string, mode: 'light' | 'dark' = 'light'): string | undefined {
  const token = getToken(name);
  if (!token) return undefined;

  if (mode === 'dark') {
    return token.darkHex || token.hex;
  }
  return token.hex;
}

/**
 * Get a token's RGB value
 */
export function getTokenRGB(
  name: string,
  mode: 'light' | 'dark' = 'light'
): string | undefined {
  const token = getToken(name);
  if (!token) return undefined;

  if (mode === 'dark') {
    return token.darkRgb || token.rgb;
  }
  return token.rgb;
}

/**
 * Create a CSS custom property mapping from tokens
 */
export function generateCSSVariables(): string {
  let css = ':root {\n';

  for (const token of getAllTokens()) {
    css += `  ${token.name}: ${token.hex};\n`;
  }

  css += '}\n\n';
  css += '@media (prefers-color-scheme: dark) {\n';
  css += '  :root {\n';

  for (const token of getAllTokens()) {
    if (token.darkHex) {
      css += `    ${token.name}: ${token.darkHex};\n`;
    }
  }

  css += '  }\n';
  css += '}\n';

  return css;
}

/**
 * Create a SCSS variable mapping from tokens
 */
export function generateSCSSVariables(): string {
  let scss = '';

  for (const token of getAllTokens()) {
    const varName = token.name.replace(/^--/, '').replace(/-/g, '_');
    scss += `$${varName}: ${token.hex};\n`;
  }

  return scss;
}

/**
 * Create a JavaScript export mapping from tokens
 */
export function generateJSExport(): string {
  const tokens: Record<string, string> = {};

  for (const token of getAllTokens()) {
    const varName = token.name
      .replace(/^--/, '')
      .replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    tokens[varName] = token.hex;
  }

  return `export const tokens = ${JSON.stringify(tokens, null, 2)};`;
}

/**
 * Search tokens by pattern
 */
export function searchTokens(pattern: string): Token[] {
  const regex = new RegExp(pattern, 'i');
  return getAllTokens().filter((token) => regex.test(token.name));
}

/**
 * Get tokens by category (based on token name prefix)
 */
export function getTokensByCategory(category: string): Token[] {
  const prefix = `--${category}-`;
  return getAllTokens().filter((token) => token.name.startsWith(prefix));
}

export default {
  getLocalTokens,
  fetchTokens,
  getToken,
  getTokensBySection,
  getAllTokenNames,
  getAllTokens,
  getTokenColor,
  getTokenRGB,
  generateCSSVariables,
  generateSCSSVariables,
  generateJSExport,
  searchTokens,
  getTokensByCategory,
};
