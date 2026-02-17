import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
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
} from '../utils/tokenLoader';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('getLocalTokens', () => {
  it('returns an object with sections array and meta object', () => {
    const result = getLocalTokens();
    expect(Array.isArray(result.sections)).toBe(true);
    expect(result.meta).toBeDefined();
  });

  it('meta.version is "1.0.0"', () => {
    const result = getLocalTokens();
    expect(result.meta.version).toBe('1.0.0');
  });

  it('meta.totalTokens equals the sum of all section token counts', () => {
    const result = getLocalTokens();
    const expectedTotal = result.sections.reduce(
      (sum, section) => sum + section.tokens.length,
      0
    );
    expect(result.meta.totalTokens).toBe(expectedTotal);
  });

  it('meta.generatedAt is a valid ISO date string', () => {
    const result = getLocalTokens();
    const date = new Date(result.meta.generatedAt);
    expect(date.toISOString()).toBe(result.meta.generatedAt);
  });

  it('meta.source is the GitHub URL', () => {
    const result = getLocalTokens();
    expect(result.meta.source).toContain('github.com');
  });
});

describe('fetchTokens', () => {
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('fetches from baseUrl/tokens.json', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ sections: [], meta: {} }),
    });
    global.fetch = mockFetch;

    await fetchTokens('https://example.com');
    expect(mockFetch).toHaveBeenCalledWith('https://example.com/tokens.json');
  });

  it('returns parsed JSON response on success', async () => {
    const mockData = { sections: [], meta: { version: '1.0.0' } };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await fetchTokens('https://example.com');
    expect(result).toEqual(mockData);
  });

  it('throws when response is not ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    });
    vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(fetchTokens('https://example.com')).rejects.toThrow(
      'Failed to fetch tokens'
    );
  });

  it('throws when fetch itself fails (network error)', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(fetchTokens('https://example.com')).rejects.toThrow('Network error');
  });
});

describe('getToken', () => {
  it('returns the token when found by exact name', () => {
    const token = getToken('--cta-cta-default');
    expect(token).toBeDefined();
    expect(token!.hex).toBe('#E03600');
  });

  it('returns undefined for a non-existent token name', () => {
    const token = getToken('--nonexistent-token');
    expect(token).toBeUndefined();
  });

  it('matches exact name, not partial', () => {
    const token = getToken('--cta-cta');
    expect(token).toBeUndefined();
  });
});

describe('getTokensBySection', () => {
  it('returns all tokens for a valid section title', () => {
    const tokens = getTokensBySection('Call-to-Action (CTA)');
    expect(tokens.length).toBeGreaterThan(0);
    expect(tokens[0].name).toContain('cta');
  });

  it('returns empty array for non-existent section', () => {
    const tokens = getTokensBySection('Nonexistent Section');
    expect(tokens).toEqual([]);
  });
});

describe('getAllTokenNames', () => {
  it('returns an array of strings', () => {
    const names = getAllTokenNames();
    expect(Array.isArray(names)).toBe(true);
    expect(typeof names[0]).toBe('string');
  });

  it('includes known token names', () => {
    const names = getAllTokenNames();
    expect(names).toContain('--cta-cta-default');
  });

  it('length matches total token count from getLocalTokens', () => {
    const names = getAllTokenNames();
    const { meta } = getLocalTokens();
    expect(names.length).toBe(meta.totalTokens);
  });
});

describe('getAllTokens', () => {
  it('returns a flat array of all tokens', () => {
    const tokens = getAllTokens();
    expect(Array.isArray(tokens)).toBe(true);
    expect(tokens.length).toBeGreaterThan(0);
  });

  it('each element has name, hex, rgb properties', () => {
    const tokens = getAllTokens();
    for (const token of tokens) {
      expect(token).toHaveProperty('name');
      expect(token).toHaveProperty('hex');
      expect(token).toHaveProperty('rgb');
    }
  });
});

describe('getTokenColor', () => {
  it('returns hex for light mode by default', () => {
    const color = getTokenColor('--cta-cta-default');
    expect(color).toBe('#E03600');
  });

  it('returns hex for light mode when explicitly requested', () => {
    const color = getTokenColor('--cta-cta-default', 'light');
    expect(color).toBe('#E03600');
  });

  it('returns darkHex for dark mode when available', () => {
    const color = getTokenColor('--cta-cta-default', 'dark');
    expect(color).toBe('#FF5C1A');
  });

  it('falls back to hex when darkHex is not available in dark mode', () => {
    // Find a token without darkHex, or test with a known one
    const tokens = getAllTokens();
    const noDarkToken = tokens.find((t) => !t.darkHex);
    if (noDarkToken) {
      const color = getTokenColor(noDarkToken.name, 'dark');
      expect(color).toBe(noDarkToken.hex);
    }
  });

  it('returns undefined for non-existent token', () => {
    const color = getTokenColor('--does-not-exist');
    expect(color).toBeUndefined();
  });
});

describe('getTokenRGB', () => {
  it('returns rgb for light mode by default', () => {
    const rgb = getTokenRGB('--cta-cta-default');
    expect(rgb).toBe('rgb(224, 54, 0)');
  });

  it('returns darkRgb for dark mode when available', () => {
    const rgb = getTokenRGB('--cta-cta-default', 'dark');
    expect(rgb).toBe('rgb(255, 92, 26)');
  });

  it('falls back to rgb when darkRgb is not available in dark mode', () => {
    const tokens = getAllTokens();
    const noDarkToken = tokens.find((t) => !t.darkRgb);
    if (noDarkToken) {
      const rgb = getTokenRGB(noDarkToken.name, 'dark');
      expect(rgb).toBe(noDarkToken.rgb);
    }
  });

  it('returns undefined for non-existent token', () => {
    const rgb = getTokenRGB('--does-not-exist');
    expect(rgb).toBeUndefined();
  });
});

describe('generateCSSVariables', () => {
  it('starts with :root { block', () => {
    const css = generateCSSVariables();
    expect(css).toMatch(/^:root\s*\{/);
  });

  it('contains known token as CSS custom property', () => {
    const css = generateCSSVariables();
    expect(css).toContain('--cta-cta-default: #E03600;');
  });

  it('includes @media (prefers-color-scheme: dark) block', () => {
    const css = generateCSSVariables();
    expect(css).toContain('@media (prefers-color-scheme: dark)');
  });

  it('includes dark mode values inside the dark media query', () => {
    const css = generateCSSVariables();
    const darkSection = css.split('@media (prefers-color-scheme: dark)')[1];
    expect(darkSection).toContain('--cta-cta-default: #FF5C1A;');
  });
});

describe('generateSCSSVariables', () => {
  it('converts -- prefix to $ prefix', () => {
    const scss = generateSCSSVariables();
    expect(scss).toContain('$cta_cta_default');
  });

  it('replaces hyphens with underscores in variable names', () => {
    const scss = generateSCSSVariables();
    expect(scss).not.toMatch(/\$[a-z]+-[a-z]/);
  });

  it('includes hex values', () => {
    const scss = generateSCSSVariables();
    expect(scss).toContain('#E03600');
  });
});

describe('generateJSExport', () => {
  it('generates valid JavaScript export syntax', () => {
    const js = generateJSExport();
    expect(js).toContain('export const tokens =');
  });

  it('converts CSS custom property names to camelCase', () => {
    const js = generateJSExport();
    expect(js).toContain('ctaCtaDefault');
  });

  it('output contains valid JSON object inside the export', () => {
    const js = generateJSExport();
    // Extract the JSON part between = and ;
    const jsonPart = js.replace('export const tokens = ', '').replace(/;\s*$/, '');
    expect(() => JSON.parse(jsonPart)).not.toThrow();
  });
});

describe('searchTokens', () => {
  it('returns tokens matching a simple pattern', () => {
    const results = searchTokens('cta');
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((t) => /cta/i.test(t.name))).toBe(true);
  });

  it('search is case-insensitive', () => {
    const lower = searchTokens('cta');
    const upper = searchTokens('CTA');
    expect(lower.length).toBe(upper.length);
  });

  it('returns empty array when no tokens match', () => {
    const results = searchTokens('zzzznonexistent');
    expect(results).toEqual([]);
  });

  it('supports regex patterns', () => {
    const results = searchTokens('default$');
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((t) => t.name.endsWith('default'))).toBe(true);
  });
});

describe('getTokensByCategory', () => {
  it('returns tokens matching the category prefix', () => {
    const tokens = getTokensByCategory('cta');
    expect(tokens.length).toBeGreaterThan(0);
    expect(tokens.every((t) => t.name.startsWith('--cta-'))).toBe(true);
  });

  it('returns empty array for non-existent category', () => {
    const tokens = getTokensByCategory('nonexistent');
    expect(tokens).toEqual([]);
  });
});
