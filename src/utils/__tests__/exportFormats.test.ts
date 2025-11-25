import { describe, it, expect } from 'vitest';
import { exportFormats, type ExportFormat } from '../exportFormats';

/**
 * Test suite for export format generators
 *
 * PURPOSE: Ensures all 10+ export formats generate valid, properly formatted output
 * CRITICAL: Export functionality is a core feature - must work correctly in production
 */

// Mock test data matching the Token and Section interfaces
const mockTokens = [
  {
    name: '--primary-default',
    hex: '#3B82F6',
    rgb: 'rgb(59, 130, 246)',
    darkHex: '#60A5FA',
    darkRgb: 'rgb(96, 165, 250)',
  },
  {
    name: '--primary-hover',
    hex: '#2563EB',
    rgb: 'rgb(37, 99, 235)',
    darkHex: '#3B82F6',
    darkRgb: 'rgb(59, 130, 246)',
  },
];

const mockSections = [
  {
    title: 'Primary Colors',
    description: 'Core interface elements',
    tokens: mockTokens,
  },
];

describe('exportFormats - Core Functionality', () => {
  describe('CSS Variables Export', () => {
    it('should generate valid CSS with :root selector', () => {
      const result = exportFormats.css.generate(mockSections);

      expect(result).toContain(':root {');
      expect(result).toContain('--primary-default: #3B82F6;');
      expect(result).toContain('--primary-hover: #2563EB;');
    });

    it('should include dark mode with .dark selector', () => {
      const result = exportFormats.css.generate(mockSections);

      expect(result).toContain('.dark {');
      expect(result).toContain('--primary-default: #60A5FA;');
      expect(result).toContain('--primary-hover: #3B82F6;');
    });

    it('should include section titles as comments', () => {
      const result = exportFormats.css.generate(mockSections);

      expect(result).toContain('/* Primary Colors - Light Mode */');
      expect(result).toContain('/* Primary Colors - Dark Mode */');
    });

    it('should have correct metadata', () => {
      expect(exportFormats.css.name).toBe('CSS Variables');
      expect(exportFormats.css.extension).toBe('.css');
      expect(exportFormats.css.description).toBeTruthy();
    });
  });

  describe('SCSS Variables Export', () => {
    it('should generate SCSS variables with $ prefix', () => {
      const result = exportFormats.scss.generate(mockSections);

      expect(result).toContain('$primary-default: #3B82F6;');
      expect(result).toContain('$primary-hover: #2563EB;');
    });

    it('should create dark mode variables with -dark suffix', () => {
      const result = exportFormats.scss.generate(mockSections);

      expect(result).toContain('$primary-default-dark: #60A5FA;');
      expect(result).toContain('$primary-hover-dark: #3B82F6;');
    });

    it('should include category comments', () => {
      const result = exportFormats.scss.generate(mockSections);

      expect(result).toContain('// Primary Colors');
    });
  });

  describe('JSON Export', () => {
    it('should generate valid JSON', () => {
      const result = exportFormats.json.generate(mockSections);

      expect(() => JSON.parse(result)).not.toThrow();
    });

    it('should include light and dark mode values', () => {
      const result = exportFormats.json.generate(mockSections);
      const parsed = JSON.parse(result);

      expect(parsed.colors['primary-default'].light.hex).toBe('#3B82F6');
      expect(parsed.colors['primary-default'].dark.hex).toBe('#60A5FA');
    });

    it('should include RGB values', () => {
      const result = exportFormats.json.generate(mockSections);
      const parsed = JSON.parse(result);

      expect(parsed.colors['primary-default'].light.rgb).toBe('rgb(59, 130, 246)');
    });

    it('should include category metadata', () => {
      const result = exportFormats.json.generate(mockSections);
      const parsed = JSON.parse(result);

      expect(parsed.colors['primary-default'].category).toBe('Primary Colors');
    });
  });

  describe('JavaScript/ES6 Export', () => {
    it('should generate valid ES6 module syntax', () => {
      const result = exportFormats.javascript.generate(mockSections);

      expect(result).toContain('export const colors = {');
      expect(result).toContain('export default colors;');
    });

    it('should replace hyphens with underscores in variable names', () => {
      const result = exportFormats.javascript.generate(mockSections);

      expect(result).toContain('primary_default:');
      expect(result).toContain('primary_hover:');
    });

    it('should use single quotes for color values', () => {
      const result = exportFormats.javascript.generate(mockSections);

      expect(result).toContain("'#3B82F6'");
      expect(result).toContain("'#2563EB'");
    });
  });

  describe('TypeScript Export', () => {
    it('should generate TypeScript interface', () => {
      const result = exportFormats.typescript.generate(mockSections);

      expect(result).toContain('export interface ColorTokens {');
      expect(result).toContain('primary_default: string;');
    });

    it('should generate typed color object', () => {
      const result = exportFormats.typescript.generate(mockSections);

      expect(result).toContain('export const colors: ColorTokens = {');
    });

    it('should include category comments in interface', () => {
      const result = exportFormats.typescript.generate(mockSections);

      expect(result).toContain('// Primary Colors');
    });

    it('should export default', () => {
      const result = exportFormats.typescript.generate(mockSections);

      expect(result).toContain('export default colors;');
    });
  });

  describe('Tailwind Config Export', () => {
    it('should generate valid module.exports syntax', () => {
      const result = exportFormats.tailwind.generate(mockSections);

      expect(result).toContain('module.exports = {');
      expect(result).toContain('theme: {');
      expect(result).toContain('extend: {');
      expect(result).toContain('colors: {');
    });

    it('should group colors by category', () => {
      const result = exportFormats.tailwind.generate(mockSections);

      expect(result).toContain('primary: {');
      expect(result).toContain("'default': '#3B82F6'");
      expect(result).toContain("'hover': '#2563EB'");
    });
  });

  describe('Swift (iOS) Export', () => {
    it('should generate UIColor extensions', () => {
      const result = exportFormats.swift.generate(mockSections);

      expect(result).toContain('import UIKit');
      expect(result).toContain('extension UIColor {');
    });

    it('should convert hex to RGB values (0-1 range)', () => {
      const result = exportFormats.swift.generate(mockSections);

      // #3B82F6 = RGB(59, 130, 246)
      // Should convert to 0.231, 0.510, 0.965
      expect(result).toContain('primary_default = UIColor(red:');
      expect(result).toMatch(/red: 0\.\d{3}/);
      expect(result).toMatch(/green: 0\.\d{3}/);
      expect(result).toMatch(/blue: 0\.\d{3}/);
    });

    it('should replace hyphens with underscores', () => {
      const result = exportFormats.swift.generate(mockSections);

      expect(result).toContain('primary_default');
      expect(result).toContain('primary_hover');
    });
  });

  describe('Kotlin (Android) Export', () => {
    it('should generate Compose Color definitions', () => {
      const result = exportFormats.kotlin.generate(mockSections);

      expect(result).toContain('import androidx.compose.ui.graphics.Color');
      expect(result).toContain('object AbleColors {');
    });

    it('should convert hex to 0xFF format', () => {
      const result = exportFormats.kotlin.generate(mockSections);

      expect(result).toContain('val primary_default = Color(0xFF3B82F6)');
      expect(result).toContain('val primary_hover = Color(0xFF2563EB)');
    });

    it('should include package declaration', () => {
      const result = exportFormats.kotlin.generate(mockSections);

      expect(result).toContain('package com.yourapp.design');
    });
  });

  describe('Android XML Export', () => {
    it('should generate valid XML structure', () => {
      const result = exportFormats.xml.generate(mockSections);

      expect(result).toContain('<?xml version="1.0" encoding="utf-8"?>');
      expect(result).toContain('<resources>');
      expect(result).toContain('</resources>');
    });

    it('should create color resources with correct format', () => {
      const result = exportFormats.xml.generate(mockSections);

      expect(result).toContain('<color name="primary_default">#3B82F6</color>');
      expect(result).toContain('<color name="primary_hover">#2563EB</color>');
    });

    it('should include XML comments for sections', () => {
      const result = exportFormats.xml.generate(mockSections);

      expect(result).toContain('<!-- Primary Colors -->');
    });
  });

  describe('LESS Variables Export', () => {
    it('should generate LESS variables with @ prefix', () => {
      const result = exportFormats.less.generate(mockSections);

      expect(result).toContain('@primary-default: #3B82F6;');
      expect(result).toContain('@primary-hover: #2563EB;');
    });

    it('should include section comments', () => {
      const result = exportFormats.less.generate(mockSections);

      expect(result).toContain('// Primary Colors');
    });
  });

  describe('Figma Tokens Export', () => {
    it('should generate valid JSON for Figma Tokens plugin', () => {
      const result = exportFormats.figmaTokens.generate(mockSections);

      expect(() => JSON.parse(result)).not.toThrow();
    });

    it('should include token type and description', () => {
      const result = exportFormats.figmaTokens.generate(mockSections);
      const parsed = JSON.parse(result);

      const category = Object.keys(parsed)[0];
      const firstToken = Object.values(parsed[category])[0] as any;

      expect(firstToken.type).toBe('color');
      expect(firstToken.description).toBeTruthy();
    });

    it('should normalize category names (lowercase, hyphenated)', () => {
      const result = exportFormats.figmaTokens.generate(mockSections);
      const parsed = JSON.parse(result);

      expect(parsed['primary-colors']).toBeDefined();
    });
  });
});

describe('exportFormats - Edge Cases', () => {
  it('should handle empty sections array', () => {
    expect(() => exportFormats.css.generate([])).not.toThrow();
    expect(() => exportFormats.json.generate([])).not.toThrow();
  });

  it('should handle tokens without dark mode values', () => {
    const sectionsWithoutDark = [
      {
        title: 'Test',
        description: 'Test section',
        tokens: [
          {
            name: '--test-color',
            hex: '#000000',
            rgb: 'rgb(0, 0, 0)',
          },
        ],
      },
    ];

    const result = exportFormats.css.generate(sectionsWithoutDark);
    expect(result).toContain('--test-color: #000000;');
  });

  it('should handle special characters in token names', () => {
    const specialSections = [
      {
        title: 'Special & Characters!',
        description: 'Test',
        tokens: [
          {
            name: '--special-name-123',
            hex: '#FF0000',
            rgb: 'rgb(255, 0, 0)',
          },
        ],
      },
    ];

    expect(() => exportFormats.json.generate(specialSections)).not.toThrow();
  });
});

describe('exportFormats - All Formats Available', () => {
  it('should have all expected format keys', () => {
    const expectedFormats: ExportFormat[] = [
      'css',
      'scss',
      'json',
      'javascript',
      'typescript',
      'tailwind',
      'swift',
      'kotlin',
      'xml',
      'less',
      'figmaTokens',
    ];

    expectedFormats.forEach((format) => {
      expect(exportFormats[format]).toBeDefined();
      expect(exportFormats[format].name).toBeTruthy();
      expect(exportFormats[format].extension).toBeTruthy();
      expect(exportFormats[format].description).toBeTruthy();
      expect(typeof exportFormats[format].generate).toBe('function');
    });
  });
});
