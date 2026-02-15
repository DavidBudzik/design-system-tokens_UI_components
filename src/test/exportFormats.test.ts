import { describe, it, expect } from 'vitest';
import { exportFormats } from '../utils/exportFormats';

// Sample test data matching the application's token structure
const testSections = [
  {
    title: "Call-to-Action (CTA)",
    description: "Primary action colors with interactive states.",
    tokens: [
      { 
        name: "--cta-cta-default", 
        hex: "#E03600", 
        rgb: "rgb(224, 54, 0)",
        darkHex: "#FF5C1A",
        darkRgb: "rgb(255, 92, 26)"
      },
      { 
        name: "--cta-cta-hover", 
        hex: "#FA4D1A", 
        rgb: "rgb(250, 77, 26)",
        darkHex: "#FF7038",
        darkRgb: "rgb(255, 112, 56)"
      },
    ]
  },
  {
    title: "Primary",
    description: "Core primary colors for main interface elements.",
    tokens: [
      { 
        name: "--primary-primary-default", 
        hex: "#242424", 
        rgb: "rgb(36, 36, 36)",
        darkHex: "#E0E0E0",
        darkRgb: "rgb(224, 224, 224)"
      },
    ]
  }
];

describe('Figma Tokens Export Format', () => {
  it('should generate valid JSON that can be parsed', () => {
    const output = exportFormats.figmaTokens.generate(testSections);
    expect(() => JSON.parse(output)).not.toThrow();
  });

  it('should use W3C Design Tokens format with $ prefixes', () => {
    const output = exportFormats.figmaTokens.generate(testSections);
    const parsed = JSON.parse(output);
    
    // The structure should have light and dark token sets
    expect(parsed.light).toBeDefined();
    
    // Navigate through the structure to find a token
    // Structure: light -> category -> subcategory -> token
    const lightTokens = parsed.light;
    const firstCategory = Object.values(lightTokens)[0] as any;
    expect(firstCategory).toBeDefined();
    
    // Navigate deeper to find actual token (may be nested)
    let tokenObj = firstCategory;
    while (tokenObj && typeof tokenObj === 'object' && !tokenObj.$value) {
      const keys = Object.keys(tokenObj);
      if (keys.length === 0) break;
      tokenObj = tokenObj[keys[0]];
    }
    
    // Should have $value and $type keys
    expect(tokenObj).toHaveProperty('$value');
    expect(tokenObj).toHaveProperty('$type');
    expect(tokenObj.$type).toBe('color');
  });

  it('should preserve semantic token names (not just last part)', () => {
    const output = exportFormats.figmaTokens.generate(testSections);
    const parsed = JSON.parse(output);
    
    // Token names should preserve meaningful parts, not just "default" or "hover"
    // The structure should be hierarchical like: core.cta.default or similar
    const outputStr = JSON.stringify(parsed);
    
    // Should NOT have tokens named only "default" at the top level
    expect(parsed.default).toBeUndefined();
    expect(parsed.hover).toBeUndefined();
    
    // Should maintain structure with category names
    expect(outputStr).toContain('cta');
  });

  it('should separate light and dark mode tokens or include theme configuration', () => {
    const output = exportFormats.figmaTokens.generate(testSections);
    const parsed = JSON.parse(output);
    
    // Should either have separate light/dark token sets or a $themes configuration
    const hasThemes = parsed.$themes !== undefined;
    const hasLightSet = parsed.light !== undefined;
    const hasDarkSet = parsed.dark !== undefined;
    
    // At least one of these should be true for proper theme support
    expect(hasThemes || (hasLightSet && hasDarkSet)).toBe(true);
  });

  it('should maintain hierarchical structure for token organization', () => {
    const output = exportFormats.figmaTokens.generate(testSections);
    const parsed = JSON.parse(output);
    
    // Should have nested structure, not flat
    // Check that we have categories at the top level
    const topLevelKeys = Object.keys(parsed).filter(k => !k.startsWith('$'));
    expect(topLevelKeys.length).toBeGreaterThan(0);
    
    // Check that categories contain nested tokens
    const firstCategory = parsed[topLevelKeys[0]];
    expect(typeof firstCategory).toBe('object');
    expect(firstCategory).not.toBeNull();
  });

  it('should include token descriptions where available', () => {
    const output = exportFormats.figmaTokens.generate(testSections);
    const parsed = JSON.parse(output);
    
    // At least some tokens should have descriptions
    const outputStr = JSON.stringify(parsed);
    expect(outputStr).toContain('$description');
  });

  it('should handle tokens with and without dark mode variants', () => {
    const mixedSections = [
      {
        title: "Test",
        description: "Test tokens",
        tokens: [
          { 
            name: "--test-with-dark", 
            hex: "#FF0000", 
            rgb: "rgb(255, 0, 0)",
            darkHex: "#00FF00",
            darkRgb: "rgb(0, 255, 0)"
          },
          { 
            name: "--test-without-dark", 
            hex: "#0000FF", 
            rgb: "rgb(0, 0, 255)"
          },
        ]
      }
    ];
    
    const output = exportFormats.figmaTokens.generate(mixedSections);
    expect(() => JSON.parse(output)).not.toThrow();
    const parsed = JSON.parse(output);
    expect(parsed).toBeDefined();
  });
});
