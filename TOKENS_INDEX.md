# Design System Tokens - Complete Index

This document provides a complete overview of the token generation system, files created, and how to use them.

## Table of Contents

1. [Quick Reference](#quick-reference)
2. [Files Created](#files-created)
3. [How It Works](#how-it-works)
4. [Usage Guide](#usage-guide)
5. [Integration Examples](#integration-examples)
6. [Commands Reference](#commands-reference)
7. [Troubleshooting](#troubleshooting)

## Quick Reference

### Essential Commands

```bash
# Generate tokens.json
npm run generate-tokens

# Generate tokens + build app
npm run build

# View generated tokens
cat public/tokens.json
```

### Key Files

| File | Purpose |
|------|---------|
| `/scripts/generate-tokens.mjs` | Main token generator script |
| `/public/tokens.json` | Generated design tokens (JSON output) |
| `/src/utils/tokenLoader.ts` | TypeScript utility library for accessing tokens |
| `/TOKENS_SETUP.md` | Setup and integration guide |
| `/scripts/TOKENS_GENERATOR.md` | Technical documentation |
| `/figma-plugin-example.js` | Example Figma plugin integration |

### Token Statistics

- **Total Tokens**: 99
- **Total Sections**: 18
- **Light + Dark Variants**: All tokens have light and dark variants
- **File Size**: ~22KB
- **Generation Time**: < 100ms

---

## Files Created

### Generator Scripts

#### `/scripts/generate-tokens.mjs` (Primary Generator)

The main production token generator using ES modules.

**Features:**
- Reads from `src/data/designSystemData.ts`
- Generates metadata (version, timestamp, source, token count)
- Creates properly formatted JSON output
- Error handling with detailed messages
- Can run directly with `node scripts/generate-tokens.mjs`

**Usage:**
```bash
node scripts/generate-tokens.mjs
npm run generate-tokens
```

#### `/scripts/generate-tokens.ts` (TypeScript Version)

TypeScript version for type-safe operations.

**Features:**
- Full TypeScript support
- Type definitions for token interface
- Can be compiled or used with ts-node
- Reference implementation

**Usage:**
```bash
ts-node scripts/generate-tokens.ts
# or compile first
tsc scripts/generate-tokens.ts && node scripts/generate-tokens.js
```

#### `/scripts/generate-tokens.js` (Legacy)

Original generator script. Use `generate-tokens.mjs` instead.

### Generated Output

#### `/public/tokens.json`

The generated design tokens file served publicly.

**Structure:**
```json
{
  "sections": [
    {
      "title": "Section Name",
      "description": "Section description",
      "tokens": [
        {
          "name": "--token-name",
          "hex": "#FFFFFF",
          "rgb": "rgb(255, 255, 255)",
          "darkHex": "#000000",
          "darkRgb": "rgb(0, 0, 0)"
        }
      ]
    }
  ],
  "meta": {
    "version": "1.0.0",
    "generatedAt": "2026-02-15T09:22:52.137Z",
    "source": "https://github.com/DavidBudzik/design-system-tokens_UI_components",
    "totalTokens": 99
  }
}
```

**Access Points:**
- Local file: `/public/tokens.json`
- Dev server: `http://localhost:5173/tokens.json`
- Production: `https://your-domain.com/tokens.json`

### Utility Library

#### `/src/utils/tokenLoader.ts`

TypeScript utility functions for working with tokens.

**Main Functions:**

```typescript
// Get local tokens
getLocalTokens(): TokensExport

// Fetch from server
fetchTokens(baseUrl?: string): Promise<TokensExport>

// Get specific token
getToken(name: string): Token | undefined

// Get all tokens
getAllTokens(): Token[]

// Get tokens by section
getTokensBySection(title: string): Token[]

// Get all token names
getAllTokenNames(): string[]

// Get token color (light/dark)
getTokenColor(name: string, mode?: 'light' | 'dark'): string | undefined

// Get token RGB
getTokenRGB(name: string, mode?: 'light' | 'dark'): string | undefined

// Generate CSS variables
generateCSSVariables(): string

// Generate SCSS variables
generateSCSSVariables(): string

// Generate JavaScript export
generateJSExport(): string

// Search tokens
searchTokens(pattern: string): Token[]

// Get tokens by category
getTokensByCategory(category: string): Token[]
```

**Import:**
```typescript
import { getToken, getAllTokens } from '@/utils/tokenLoader';
```

### Documentation Files

#### `/TOKENS_SETUP.md`

Complete setup and integration guide.

**Contents:**
- Quick start guide
- What was created overview
- Token coverage details
- Integration guide for Figma plugin
- Workflow instructions
- Troubleshooting

#### `/scripts/TOKENS_GENERATOR.md`

Technical documentation for the generator.

**Contents:**
- Overview of token generation
- Output format details
- Available scripts
- Script file descriptions
- Design system data structure
- Workflow instructions
- Integration with external tools
- Error handling
- Development notes

#### `/figma-plugin-example.js`

Example implementation for Figma plugin integration.

**Features:**
- Fetch design tokens from server
- Create Figma color styles
- Create typography styles
- List all available tokens
- Export in Figma-compatible format
- Search and filter tokens
- Convert hex to RGB

**Key Functions:**
```javascript
loadDesignTokens()
createColorStyles()
listTokens()
getToken(tokenName)
searchTokens(pattern)
exportFigmaJSON()
```

### Configuration Files

#### `/package.json` (Modified)

Updated with new scripts:

```json
{
  "scripts": {
    "generate-tokens": "node scripts/generate-tokens.mjs",
    "build": "node scripts/generate-tokens.mjs && vite build"
  }
}
```

---

## How It Works

### Token Generation Flow

```
src/data/designSystemData.ts
         ↓
scripts/generate-tokens.mjs (reads and processes)
         ↓
public/tokens.json (output)
         ↓
Available at:
  - Local file system
  - Dev server (/tokens.json)
  - Production deployment
         ↓
Consumed by:
  - Figma plugin
  - Other design tools
  - External integrations
```

### Data Source

**Location**: `/src/data/designSystemData.ts`

**Exported Object**:
```typescript
export const designSystemData: { sections: Section[] }
```

**Structure**:
- 18 Sections total
- Each section contains tokens
- Each token has light and dark variants
- All tokens follow naming convention: `--category-type-state`

### Token Naming Convention

Tokens follow a consistent naming pattern:

```
--[category]-[type]-[state]
```

Examples:
- `--cta-cta-default` (Call-to-Action, default state)
- `--primary-primary-hover` (Primary, hover state)
- `--border-border-error` (Border, error state)
- `--text-text-muted` (Text, muted variant)

### Section Categories

| Section | Token Count | Purpose |
|---------|------------|---------|
| Call-to-Action (CTA) | 4 | Primary action colors |
| Primary | 4 | Core UI colors |
| Secondary | 4 | Secondary colors |
| Danger | 4 | Error/destructive colors |
| Success | 4 | Positive feedback |
| Warning | 4 | Cautionary colors |
| Link | 4 | Navigation colors |
| Surface | 5 | Background colors |
| Surface - Input | 4 | Input field colors |
| Background | 2 | Page backgrounds |
| Border | 5 | Border colors |
| Text | 6 | Text colors |
| Icons | 5 | Icon colors |
| Complementary - Strong (1-10) | 10 | Vibrant accents |
| Complementary - Strong (11-20) | 10 | Additional vibrant |
| Complementary - Subtle (1-10) | 10 | Soft accents |
| Complementary - Subtle (11-20) | 10 | Additional soft |
| Complementary - Dark | 4 | Dark accents |

---

## Usage Guide

### In React/TypeScript Application

```typescript
import { getToken, getAllTokens } from '@/utils/tokenLoader';

// Get specific token
const ctaColor = getToken('--cta-cta-default');
console.log(ctaColor.hex); // #E03600

// Get all tokens
const tokens = getAllTokens();
tokens.forEach(token => {
  console.log(`${token.name}: ${token.hex}`);
});

// Get token in dark mode
const darkColor = getToken('--primary-primary-default').darkHex; // #E0E0E0

// Search for tokens
const textTokens = searchTokens('text');
```

### In Figma Plugin

```javascript
// Fetch tokens
const response = await fetch('https://your-domain.com/tokens.json');
const { sections, meta } = await response.json();

// Create color styles
sections.forEach(section => {
  section.tokens.forEach(token => {
    const style = figma.createPaintStyle();
    style.name = `${section.title}/${token.name}`;
    // Set color from token.hex
  });
});
```

### In CSS

```typescript
import { generateCSSVariables } from '@/utils/tokenLoader';

const cssContent = generateCSSVariables();
// Outputs:
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

### In SCSS

```typescript
import { generateSCSSVariables } from '@/utils/tokenLoader';

const scssContent = generateSCSSVariables();
// Outputs:
// $cta_cta_default: #E03600;
// $primary_primary_default: #242424;
// ...
```

---

## Integration Examples

### Figma Plugin Integration

See `/figma-plugin-example.js` for complete example.

**Basic setup:**
```javascript
// Load tokens
const tokens = await fetch('/tokens.json').then(r => r.json());

// Use in your plugin
tokens.sections.forEach(section => {
  console.log(`Section: ${section.title}`);
  section.tokens.forEach(token => {
    console.log(`  ${token.name}: ${token.hex}`);
  });
});
```

### External API Integration

```javascript
// Fetch from your deployed site
const response = await fetch('https://your-domain.com/tokens.json');
const tokens = await response.json();

// Access metadata
console.log(`Tokens v${tokens.meta.version}`);
console.log(`Generated: ${tokens.meta.generatedAt}`);
```

### Build Tool Integration

**Vite** (already integrated):
```typescript
// In vite.config.ts
build: {
  rollupOptions: {
    // Tokens are copied to dist/tokens.json automatically
  }
}
```

---

## Commands Reference

### Generate Tokens

```bash
# Using npm script
npm run generate-tokens

# Direct Node.js
node scripts/generate-tokens.mjs

# Using TypeScript
ts-node scripts/generate-tokens.ts
```

### Build Application

```bash
# Build with auto-generated tokens
npm run build

# This runs:
# 1. node scripts/generate-tokens.mjs
# 2. vite build
```

### Development

```bash
# Start dev server (tokens available at /tokens.json)
npm run dev

# Format tokens file
npm run format

# Type check
npm run type-check
```

### Verification

```bash
# Check if tokens.json is valid JSON
node -e "console.log(require('./public/tokens.json').meta)"

# Count tokens
node -e "const d = require('./public/tokens.json'); console.log(d.meta.totalTokens)"

# List sections
node -e "const d = require('./public/tokens.json'); d.sections.forEach(s => console.log(s.title))"
```

---

## Troubleshooting

### Tokens not generating?

**Problem**: `npm run generate-tokens` doesn't create the file

**Solution**:
```bash
# Check Node version (needs 14+)
node --version

# Try running directly
node scripts/generate-tokens.mjs

# Check for error messages
node scripts/generate-tokens.mjs 2>&1

# Verify source file exists
ls -l src/data/designSystemData.ts
```

### Build fails?

**Problem**: `npm run build` exits with error

**Solution**:
```bash
# Generate tokens separately
npm run generate-tokens

# Then try build
npm run build

# If still fails, check vite config
cat vite.config.ts
```

### Plugin can't fetch tokens?

**Problem**: Figma plugin gets 404 or network error

**Solution**:
```bash
# Verify file exists and is accessible
curl http://localhost:5173/tokens.json

# Check in dev server
npm run dev

# For production, verify:
curl https://your-domain.com/tokens.json

# Check CORS headers
curl -I https://your-domain.com/tokens.json
```

### Tokens are outdated?

**Problem**: Changes to designSystemData.ts don't appear in tokens.json

**Solution**:
```bash
# Regenerate tokens
npm run generate-tokens

# Verify changes
tail public/tokens.json

# Commit both files
git add src/data/designSystemData.ts public/tokens.json
git commit -m "Update design tokens"
```

---

## Related Documentation

- [TOKENS_SETUP.md](/TOKENS_SETUP.md) - Setup and integration guide
- [scripts/TOKENS_GENERATOR.md](/scripts/TOKENS_GENERATOR.md) - Technical documentation
- [figma-plugin-example.js](/figma-plugin-example.js) - Figma plugin example
- [src/data/designSystemData.ts](/src/data/designSystemData.ts) - Token source
- [src/utils/tokenLoader.ts](/src/utils/tokenLoader.ts) - Utility functions

---

## Support

### Getting Help

1. Check the relevant documentation file
2. Review the generated `/public/tokens.json` for structure
3. Look at example files for implementation patterns
4. Check error messages in console output

### Common Issues

- **Missing public directory**: Script creates it automatically
- **Permission errors**: Check file system permissions
- **Parse errors**: Validate JSON in `/public/tokens.json`
- **Import errors**: Verify path aliases in `vite.config.ts`

---

**Last Updated**: 2026-02-15
**Total Tokens**: 99
**Version**: 1.0.0
