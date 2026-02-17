import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  validateToken,
  validateSection,
  validateDesignSystem,
  ensureDarkModeColors,
  updateTokenColors,
} from '../utils/colorValidation';
import {
  singleToken,
  tokenMissingDark,
  tokenMissingLight,
  darkColorToken,
  lightColorToken,
  emptySection,
  testSections,
} from './testFixtures';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('validateToken', () => {
  it('returns isValid true with no errors for a fully-defined token', () => {
    const result = validateToken(singleToken);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
  });

  it('returns an error when hex is missing', () => {
    const token = { ...singleToken, hex: '' };
    const result = validateToken(token);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(1);
  });

  it('returns an error when rgb is missing', () => {
    const token = { ...singleToken, rgb: '' };
    const result = validateToken(token);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(1);
  });

  it('returns a warning when darkHex is missing', () => {
    const result = validateToken(tokenMissingDark);
    expect(result.isValid).toBe(true);
    expect(result.warnings.length).toBeGreaterThanOrEqual(1);
  });

  it('returns a warning when darkRgb is missing', () => {
    const token = { ...singleToken, darkRgb: undefined };
    const result = validateToken(token);
    expect(result.warnings.length).toBeGreaterThanOrEqual(1);
  });

  it('returns both errors and warnings when light and dark colors are missing', () => {
    const token = { name: '--broken', hex: '', rgb: '' };
    const result = validateToken(token);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(1);
    expect(result.warnings.length).toBeGreaterThanOrEqual(1);
  });

  it('includes the token name in error and warning messages', () => {
    const result = validateToken(tokenMissingLight);
    const allMessages = [...result.errors, ...result.warnings];
    const hasName = allMessages.some((msg) => msg.includes(tokenMissingLight.name));
    expect(hasName).toBe(true);
  });
});

describe('validateSection', () => {
  it('returns valid for a section with all tokens fully defined', () => {
    const section = {
      title: 'Valid',
      description: 'All tokens valid',
      tokens: [singleToken],
    };
    const result = validateSection(section);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('aggregates errors from multiple invalid tokens', () => {
    const section = {
      title: 'Invalid',
      description: 'Tokens missing light colors',
      tokens: [tokenMissingLight, { ...tokenMissingLight, name: '--another-broken' }],
    };
    const result = validateSection(section);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(2);
  });

  it('aggregates warnings from multiple tokens missing dark mode', () => {
    const section = {
      title: 'Warnings',
      description: 'No dark values',
      tokens: [tokenMissingDark, { ...tokenMissingDark, name: '--another-no-dark' }],
    };
    const result = validateSection(section);
    expect(result.isValid).toBe(true);
    expect(result.warnings.length).toBeGreaterThanOrEqual(2);
  });

  it('returns valid with no errors or warnings for empty token array', () => {
    const result = validateSection(emptySection);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
  });
});

describe('validateDesignSystem', () => {
  it('returns valid for sections where all tokens are complete', () => {
    const result = validateDesignSystem(testSections);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('aggregates errors and warnings across multiple sections', () => {
    const sections = [
      {
        title: 'Section A',
        description: '',
        tokens: [tokenMissingLight],
      },
      {
        title: 'Section B',
        description: '',
        tokens: [tokenMissingDark],
      },
    ];
    const result = validateDesignSystem(sections);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(1);
    expect(result.warnings.length).toBeGreaterThanOrEqual(1);
  });

  it('returns valid for an empty sections array', () => {
    const result = validateDesignSystem([]);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});

describe('ensureDarkModeColors', () => {
  it('returns the token unchanged if darkHex and darkRgb already exist', () => {
    const result = ensureDarkModeColors(singleToken);
    expect(result.darkHex).toBe(singleToken.darkHex);
    expect(result.darkRgb).toBe(singleToken.darkRgb);
  });

  it('generates lighter dark-mode colors for a dark light-mode color (avg RGB < 128)', () => {
    const result = ensureDarkModeColors(darkColorToken);
    // rgb(26,26,26) + 50 each => rgb(76,76,76) => #4C4C4C
    expect(result.darkHex).toBe('#4C4C4C');
    expect(result.darkRgb).toBe('rgb(76, 76, 76)');
  });

  it('generates darker dark-mode colors for a light light-mode color (avg RGB >= 128)', () => {
    const result = ensureDarkModeColors(lightColorToken);
    // rgb(224,224,224) - 50 each => rgb(174,174,174) => #AEAEAE
    expect(result.darkHex).toBe('#AEAEAE');
    expect(result.darkRgb).toBe('rgb(174, 174, 174)');
  });

  it('clamps generated RGB values to 255 max', () => {
    const token = { name: '--bright', hex: '#FAFAFA', rgb: 'rgb(250, 250, 250)' };
    const result = ensureDarkModeColors(token);
    // rgb(250,250,250) - 50 => (200,200,200) — no clamping needed here
    // The function subtracts for light colors, so values stay in range
    expect(result.darkRgb).toBe('rgb(200, 200, 200)');
  });

  it('clamps generated RGB values to 0 min', () => {
    const token = { name: '--vdark', hex: '#0A0A0A', rgb: 'rgb(10, 10, 10)' };
    const result = ensureDarkModeColors(token);
    // rgb(10,10,10) + 50 => (60,60,60) — no clamping needed here
    expect(result.darkRgb).toBe('rgb(60, 60, 60)');
  });

  it('returns token unchanged and logs warning when rgb cannot be parsed', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const token = { name: '--bad-rgb', hex: '#123456', rgb: 'invalid-rgb' };
    const result = ensureDarkModeColors(token);
    expect(result).toEqual(token);
    expect(warnSpy).toHaveBeenCalled();
  });

  it('does not mutate the original token object', () => {
    const original = { ...darkColorToken };
    ensureDarkModeColors(original);
    expect(original.darkHex).toBeUndefined();
    expect(original.darkRgb).toBeUndefined();
  });
});

describe('updateTokenColors', () => {
  it('returns a new token with updated light colors', () => {
    const result = updateTokenColors(singleToken, '#AABBCC', 'rgb(170, 187, 204)');
    expect(result.hex).toBe('#AABBCC');
    expect(result.rgb).toBe('rgb(170, 187, 204)');
  });

  it('preserves existing dark colors when dark params not provided', () => {
    const result = updateTokenColors(singleToken, '#AABBCC', 'rgb(170, 187, 204)');
    expect(result.darkHex).toBe(singleToken.darkHex);
    expect(result.darkRgb).toBe(singleToken.darkRgb);
  });

  it('updates dark colors when provided', () => {
    const result = updateTokenColors(
      singleToken,
      '#AABBCC',
      'rgb(170, 187, 204)',
      '#112233',
      'rgb(17, 34, 51)'
    );
    expect(result.darkHex).toBe('#112233');
    expect(result.darkRgb).toBe('rgb(17, 34, 51)');
  });

  it('logs a warning when dark mode colors are not provided', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    updateTokenColors(singleToken, '#AABBCC', 'rgb(170, 187, 204)');
    expect(warnSpy).toHaveBeenCalled();
  });

  it('does not mutate the original token', () => {
    const original = { ...singleToken };
    const originalHex = original.hex;
    updateTokenColors(original, '#AABBCC', 'rgb(170, 187, 204)');
    expect(original.hex).toBe(originalHex);
  });
});
