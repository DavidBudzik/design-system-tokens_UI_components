# Design System Tokens - Setup and Usage Guide

This guide explains the token generation system and how to use it for the Figma plugin and other external tools.

## Quick Start

### Generate Tokens

```bash
# Generate tokens.json immediately
npm run generate-tokens

# Tokens are also auto-generated during build
npm run build
```

### Access Generated Tokens

The generated file is located at:
- **File path**: `/public/tokens.json`
- **Web endpoint**: `http://localhost:5173/tokens.json` (dev) or `https://your-domain.com/tokens.json` (production)

## What Was Created

### 1. Token Generator Scripts

**`/scripts/generate-tokens.mjs`** (Primary)
- Modern ES Module script that reads design system data
- Generates `/public/tokens.json` with all tokens and metadata
- Can be run directly with Node.js: `node scripts/generate-tokens.mjs`
- Provides detailed output with token count and generation timestamp

**`/scripts/generate-tokens.ts`**
- TypeScript version for reference and type safety
- Can be compiled and used if you prefer TypeScript tooling

### 2. Token Output

**`/public/tokens.json`** (Generated File)
- Contains all 99 design tokens organized in 18 sections
- Includes both light and dark mode variants for each token
- Includes metadata: version, timestamp, source URL, and token count

Example structure:
```json
{
  "sections": [
    {
      "title": "Call-to-Action (CTA)",
      "description": "Primary action colors with interactive states.",
      "tokens": [
        {
          "name": "--cta-cta-default",
          "hex": "#E03600",
          "rgb": "rgb(224, 54, 0)",
          "darkHex": "#FF5C1A",
          "darkRgb": "rgb(255, 92, 26)"
        },
        // ... more tokens
      ]
    }
    // ... more sections
  ],
  "meta": {
    "version": "1.0.0",
    "generatedAt": "2026-02-15T09:21:32.714Z",
    "source": "https://github.com/DavidBudzik/design-system-tokens_UI_components",
    "totalTokens": 99
  }
}
```

### 3. Token Utility Library

**`/src/utils/tokenLoader.ts`**

A TypeScript utility library for working with tokens in your application:

```typescript
import {
  getLocalTokens,
  fetchTokens,
  getToken,
  getAllTokens,
  getTokensBySection,
  getTokenColor,
  getTokenRGB,
  generateCSSVariables,
  generateSCSSVariables,
  generateJSExport,
  searchTokens,
  getTokensByCategory,
} from '@/utils/tokenLoader';

// Get local tokens
const tokens = getLocalTokens();

// Get a specific token
const ctaColor = getToken('--cta-cta-default');

// Get all tokens
const allTokens = getAllTokens();

// Get color in dark mode
const darkColor = getTokenColor('--cta-cta-default', 'dark');

// Search tokens
const ctaTokens = searchTokens('cta');

// Generate CSS variables
const cssVars = generateCSSVariables();
```

### 4. Updated Build System

**`/package.json`** - Added scripts:
- `npm run generate-tokens` - Generate tokens.json on demand
- `npm run build` - Now runs: `generate-tokens && vite build`

## Token Coverage

The system includes 99 design tokens across 18 sections:

### Core Colors (42 tokens)
- **Call-to-Action (CTA)**: 4 tokens (default, hover, active, disabled)
- **Primary**: 4 tokens (default, hover, active, disabled)
- **Secondary**: 4 tokens (default, hover, active, disabled)
- **Danger**: 4 tokens (error colors)
- **Success**: 4 tokens (positive feedback)
- **Warning**: 4 tokens (cautionary)
- **Link**: 4 tokens (navigation states)
- **Surface**: 5 tokens (backgrounds and containers)
- **Surface - Input**: 4 tokens (input field states)
- **Background**: 2 tokens (page backgrounds)

### Extended Colors (57 tokens)
- **Border**: 5 tokens (interactive states)
- **Text**: 6 tokens (primary, inverted, muted, subtle, disabled, on-dark)
- **Icons**: 5 tokens (default, disabled, on-dark, on-bright, subtle)
- **Complementary - Strong (1-10)**: 10 vibrant accent colors
- **Complementary - Strong (11-20)**: 10 additional vibrant colors
- **Complementary - Subtle (1-10)**: 10 soft accent colors
- **Complementary - Subtle (11-20)**: 10 additional soft colors
- **Complementary - Dark**: 4 dark accent colors

All tokens include light and dark mode variants.

## Integration Guide

### For Figma Plugin

The Figma plugin can fetch tokens from the deployed website:

```javascript
async function loadTokens() {
  try {
    const response = await fetch('https://your-domain.com/tokens.json');
    const { sections, meta } = await response.json();

    console.log(`Loaded ${meta.totalTokens} tokens (v${meta.version})`);
    console.log(`Generated: ${meta.generatedAt}`);

    // Use sections to create design system in Figma
    for (const section of sections) {
      console.log(`${section.title}: ${section.tokens.length} tokens`);
      // Create Figma colors/components based on tokens
    }
  } catch (error) {
    console.error('Failed to load tokens:', error);
  }
}
```

### For External Tools

Any tool can consume the tokens:

```bash
# Fetch tokens
curl https://your-domain.com/tokens.json

# Pretty print
curl https://your-domain.com/tokens.json | jq .

# Count tokens
curl https://your-domain.com/tokens.json | jq '.meta.totalTokens'
```

### For CSS

The utility can generate CSS variables:

```typescript
import { generateCSSVariables } from '@/utils/tokenLoader';

// Generate CSS with light/dark mode support
const css = generateCSSVariables();
// Output:
// :root {
//   --cta-cta-default: #E03600;
//   ...
// }
// @media (prefers-color-scheme: dark) {
//   :root {
//     --cta-cta-default: #FF5C1A;
//     ...
//   }
// }
```

## Workflow

### When You Update Design Tokens

1. **Modify** `/src/data/designSystemData.ts`
2. **Generate** new tokens file:
   ```bash
   npm run generate-tokens
   ```
3. **Verify** the changes in `/public/tokens.json`
4. **Test** in your application
5. **Deploy** (tokens are auto-generated in build)

### Before Deployment

```bash
# Ensure tokens are up-to-date
npm run build

# This will:
# 1. Generate fresh tokens.json
# 2. Build the application
# 3. Deploy both together
```

## Documentation

For detailed information about the generator, see:
- `/scripts/TOKENS_GENERATOR.md` - Full documentation of the token generation system

## Source of Truth

The single source of truth for all design tokens is:
- `/src/data/designSystemData.ts`

Make all token changes here, and the generator will handle creating all output formats.

## Technical Details

### Why Two Versions?

- **generate-tokens.mjs**: ES Module, runs directly with `node`, no compilation needed
- **generate-tokens.ts**: TypeScript, can be compiled for integration into TypeScript build pipelines

Both produce identical output; use whichever fits your workflow better.

### Performance

Token generation is very fast (< 100ms) because it only:
1. Reads the source data
2. Transforms and validates it
3. Outputs JSON

No compilation or heavy processing needed.

### Validation

The design system includes built-in validation (runs in dev mode):

```bash
npm run dev  # Shows color validation warnings in console
```

This ensures all tokens have proper light/dark mode variants.

## Troubleshooting

### Tokens not updating?

```bash
# Manually regenerate
npm run generate-tokens

# Check the file was created
ls -la public/tokens.json
```

### Build fails?

```bash
# Check Node version (needs v14+)
node --version

# Ensure dependencies installed
npm install

# Try generating tokens directly
node scripts/generate-tokens.mjs
```

### CORS issues with Figma plugin?

Ensure `/tokens.json` is served correctly in production:
- Check your web server configuration
- Verify CORS headers allow cross-origin requests
- Test with: `curl https://your-domain.com/tokens.json`

## Next Steps

1. Review `/scripts/TOKENS_GENERATOR.md` for detailed documentation
2. Check `/src/utils/tokenLoader.ts` for available utility functions
3. Set up your Figma plugin to fetch from `/tokens.json`
4. Add tokens to your CI/CD pipeline if needed

## Support

For issues or questions:
1. Check the generated `/public/tokens.json` file
2. Review error messages from `npm run generate-tokens`
3. Verify changes in `/src/data/designSystemData.ts`
4. Check browser console for fetch errors in the Figma plugin

## Future Enhancements

Potential additions:
- [ ] SCSS/CSS variable generation
- [ ] Additional format exports (YAML, XML)
- [ ] Design token validation schema
- [ ] Token comparison/diff tools
- [ ] Integration with design tools
- [ ] CLI tool with watch mode
