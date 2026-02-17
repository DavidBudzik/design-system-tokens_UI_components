import { describe, it, expect } from 'vitest';
import { exportFormats } from '../utils/exportFormats';
import { testSections, sectionWithMixedTokens } from './testFixtures';

describe('exportFormats metadata', () => {
  it('has exactly 11 format entries', () => {
    expect(Object.keys(exportFormats)).toHaveLength(11);
  });

  it('all formats have name, extension, description, and generate function', () => {
    for (const [key, format] of Object.entries(exportFormats)) {
      expect(format.name, `${key} missing name`).toBeTruthy();
      expect(format.extension, `${key} missing extension`).toBeTruthy();
      expect(format.description, `${key} missing description`).toBeTruthy();
      expect(typeof format.generate, `${key} missing generate`).toBe('function');
    }
  });
});

describe('CSS export format', () => {
  it('has correct metadata', () => {
    expect(exportFormats.css.name).toBe('CSS Variables');
    expect(exportFormats.css.extension).toBe('.css');
  });

  it('generates :root block with light mode values', () => {
    const output = exportFormats.css.generate(testSections);
    expect(output).toContain(':root {');
    expect(output).toContain('--cta-cta-default: #E03600;');
  });

  it('generates .dark block with dark mode values', () => {
    const output = exportFormats.css.generate(testSections);
    expect(output).toContain('.dark {');
    expect(output).toContain('--cta-cta-default: #FF5C1A;');
  });

  it('includes section title as comment', () => {
    const output = exportFormats.css.generate(testSections);
    expect(output).toContain('/* Call-to-Action (CTA) - Light Mode */');
  });

  it('skips dark entries for tokens without darkHex', () => {
    const output = exportFormats.css.generate([sectionWithMixedTokens]);
    const darkBlock = output.split('.dark {')[1];
    expect(darkBlock).not.toContain('--mixed-without-dark');
  });
});

describe('SCSS export format', () => {
  it('has correct metadata', () => {
    expect(exportFormats.scss.name).toBe('SCSS Variables');
    expect(exportFormats.scss.extension).toBe('.scss');
  });

  it('converts -- prefix to $ for variable names', () => {
    const output = exportFormats.scss.generate(testSections);
    expect(output).toContain('$cta-cta-default: #E03600;');
  });

  it('generates dark mode variables with -dark suffix', () => {
    const output = exportFormats.scss.generate(testSections);
    expect(output).toContain('$cta-cta-default-dark: #FF5C1A;');
  });

  it('includes section comments', () => {
    const output = exportFormats.scss.generate(testSections);
    expect(output).toContain('// Call-to-Action (CTA)');
  });
});

describe('JSON export format', () => {
  it('generates valid parseable JSON', () => {
    const output = exportFormats.json.generate(testSections);
    expect(() => JSON.parse(output)).not.toThrow();
  });

  it('structures tokens under a "colors" key', () => {
    const output = exportFormats.json.generate(testSections);
    const parsed = JSON.parse(output);
    expect(parsed.colors).toBeDefined();
  });

  it('includes light mode hex and rgb', () => {
    const output = exportFormats.json.generate(testSections);
    const parsed = JSON.parse(output);
    expect(parsed.colors['cta-cta-default'].light.hex).toBe('#E03600');
    expect(parsed.colors['cta-cta-default'].light.rgb).toBe('rgb(224, 54, 0)');
  });

  it('includes dark mode hex and rgb when available', () => {
    const output = exportFormats.json.generate(testSections);
    const parsed = JSON.parse(output);
    expect(parsed.colors['cta-cta-default'].dark.hex).toBe('#FF5C1A');
    expect(parsed.colors['cta-cta-default'].dark.rgb).toBe('rgb(255, 92, 26)');
  });

  it('sets dark to undefined when no dark values exist', () => {
    const output = exportFormats.json.generate([sectionWithMixedTokens]);
    const parsed = JSON.parse(output);
    expect(parsed.colors['mixed-without-dark'].dark).toBeUndefined();
  });

  it('includes category from section title', () => {
    const output = exportFormats.json.generate(testSections);
    const parsed = JSON.parse(output);
    expect(parsed.colors['cta-cta-default'].category).toBe('Call-to-Action (CTA)');
  });
});

describe('JavaScript export format', () => {
  it('has correct metadata', () => {
    expect(exportFormats.javascript.name).toBe('JavaScript/ES6');
    expect(exportFormats.javascript.extension).toBe('.js');
  });

  it('generates ES6 module export syntax', () => {
    const output = exportFormats.javascript.generate(testSections);
    expect(output).toContain('export const colors = {');
  });

  it('converts token names to underscore_case', () => {
    const output = exportFormats.javascript.generate(testSections);
    expect(output).toContain('cta_cta_default');
  });

  it('includes hex values as string literals', () => {
    const output = exportFormats.javascript.generate(testSections);
    expect(output).toContain("'#E03600'");
  });

  it('ends with default export', () => {
    const output = exportFormats.javascript.generate(testSections);
    expect(output).toContain('export default colors;');
  });
});

describe('TypeScript export format', () => {
  it('has correct metadata', () => {
    expect(exportFormats.typescript.name).toBe('TypeScript');
    expect(exportFormats.typescript.extension).toBe('.ts');
  });

  it('generates interface definition', () => {
    const output = exportFormats.typescript.generate(testSections);
    expect(output).toContain('export interface ColorTokens {');
  });

  it('defines all token properties as string type', () => {
    const output = exportFormats.typescript.generate(testSections);
    expect(output).toContain('cta_cta_default: string;');
  });

  it('generates typed const with values', () => {
    const output = exportFormats.typescript.generate(testSections);
    expect(output).toContain('export const colors: ColorTokens = {');
  });

  it('includes default export', () => {
    const output = exportFormats.typescript.generate(testSections);
    expect(output).toContain('export default colors;');
  });
});

describe('Tailwind export format', () => {
  it('has correct metadata', () => {
    expect(exportFormats.tailwind.name).toBe('Tailwind Config');
    expect(exportFormats.tailwind.extension).toBe('.js');
  });

  it('generates module.exports structure', () => {
    const output = exportFormats.tailwind.generate(testSections);
    expect(output).toContain('module.exports = {');
    expect(output).toContain('theme: {');
    expect(output).toContain('extend: {');
    expect(output).toContain('colors: {');
  });

  it('groups tokens by first name segment as category', () => {
    const output = exportFormats.tailwind.generate(testSections);
    expect(output).toContain('cta: {');
    expect(output).toContain('primary: {');
  });

  it('includes hex values in single quotes', () => {
    const output = exportFormats.tailwind.generate(testSections);
    expect(output).toContain("'#E03600'");
  });
});

describe('Swift export format', () => {
  it('has correct metadata', () => {
    expect(exportFormats.swift.name).toBe('Swift (iOS)');
    expect(exportFormats.swift.extension).toBe('.swift');
  });

  it('generates UIColor extension', () => {
    const output = exportFormats.swift.generate(testSections);
    expect(output).toContain('import UIKit');
    expect(output).toContain('extension UIColor {');
  });

  it('converts hex to RGB float values', () => {
    const output = exportFormats.swift.generate(testSections);
    // #E03600: R=224/255≈0.878, G=54/255≈0.212, B=0/255=0.000
    expect(output).toContain('0.878');
    expect(output).toContain('0.212');
    expect(output).toContain('0.000');
  });

  it('uses underscore_case for property names', () => {
    const output = exportFormats.swift.generate(testSections);
    expect(output).toContain('static let cta_cta_default');
  });
});

describe('Kotlin export format', () => {
  it('has correct metadata', () => {
    expect(exportFormats.kotlin.name).toBe('Kotlin (Android)');
    expect(exportFormats.kotlin.extension).toBe('.kt');
  });

  it('generates Compose Color object', () => {
    const output = exportFormats.kotlin.generate(testSections);
    expect(output).toContain('object DesignBookColors {');
  });

  it('includes package and import statements', () => {
    const output = exportFormats.kotlin.generate(testSections);
    expect(output).toContain('package com.yourapp.design');
    expect(output).toContain('import androidx.compose.ui.graphics.Color');
  });

  it('converts hex to 0xFF prefix format', () => {
    const output = exportFormats.kotlin.generate(testSections);
    expect(output).toContain('0xFFE03600');
  });
});

describe('XML (Android) export format', () => {
  it('has correct metadata', () => {
    expect(exportFormats.xml.name).toBe('Android XML');
    expect(exportFormats.xml.extension).toBe('.xml');
  });

  it('generates valid XML structure', () => {
    const output = exportFormats.xml.generate(testSections);
    expect(output).toContain('<?xml version="1.0" encoding="utf-8"?>');
    expect(output).toContain('<resources>');
    expect(output).toContain('</resources>');
  });

  it('uses underscore_case for color name attribute', () => {
    const output = exportFormats.xml.generate(testSections);
    expect(output).toContain('<color name="cta_cta_default">');
  });

  it('includes hex values as text content', () => {
    const output = exportFormats.xml.generate(testSections);
    expect(output).toContain('#E03600</color>');
  });

  it('includes section title as XML comment', () => {
    const output = exportFormats.xml.generate(testSections);
    expect(output).toContain('<!-- Call-to-Action (CTA) -->');
  });
});

describe('LESS export format', () => {
  it('has correct metadata', () => {
    expect(exportFormats.less.name).toBe('LESS Variables');
    expect(exportFormats.less.extension).toBe('.less');
  });

  it('converts -- prefix to @ for variable names', () => {
    const output = exportFormats.less.generate(testSections);
    expect(output).toContain('@cta-cta-default: #E03600;');
  });

  it('includes section comments', () => {
    const output = exportFormats.less.generate(testSections);
    expect(output).toContain('// Call-to-Action (CTA)');
  });
});
