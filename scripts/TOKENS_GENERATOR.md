# Design System Tokens Generator

This directory contains scripts that generate a `tokens.json` file from the design system data in `src/data/designSystemData.ts`. This file is served publicly and can be fetched by the Figma plugin and other external tools.

## Overview

The token generator reads all design system token data and exports it as a structured JSON file with metadata. This allows external tools like Figma plugins to access the latest design tokens without accessing the source code directly.

## Output Format

The generated `public/tokens.json` file follows this structure:

```json
{
  "sections": [
    {
      "title": "Section Title",
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
    "generatedAt": "2026-02-15T09:21:32.714Z",
    "source": "https://github.com/DavidBudzik/design-system-tokens_UI_components",
    "totalTokens": 99
  }
}
```

## Available Scripts

### `npm run generate-tokens`

Generates the `public/tokens.json` file immediately. Use this after modifying the design system data.

```bash
npm run generate-tokens
```

Output:
```
✅ Successfully generated tokens.json
📁 Location: /path/to/public/tokens.json
📊 Total tokens: 99
📦 Total sections: 18
⏰ Generated at: 2026-02-15T09:21:32.714Z
🔗 Source: https://github.com/DavidBudzik/design-system-tokens_UI_components
```

### `npm run build`

The build script automatically generates tokens before building the application:

```bash
npm run build
# Runs: node scripts/generate-tokens.mjs && vite build
```

This ensures that `public/tokens.json` is always up-to-date whenever you build the project.

## Script Files

### `generate-tokens.mjs` (Main Generator)

The primary generator script written in modern JavaScript (ESM). This script:

- Reads design system data directly from the source
- Calculates total token count across all sections
- Generates metadata (version, timestamp, source URL)
- Creates `public/tokens.json` with proper formatting
- Handles errors gracefully with detailed output

**Why `.mjs`?** This extension allows us to use ES modules without additional build tooling, making it easy to run directly with Node.js.

### `generate-tokens.ts`

A TypeScript version of the generator for reference and type safety. This can be compiled and run if you prefer working with TypeScript.

### `generate-tokens.js` (Legacy)

The original generator script. Use `generate-tokens.mjs` instead as it has better error handling and is more reliable.

## Design System Data

The generator reads from `/src/data/designSystemData.ts` which exports a `designSystemData` object containing all design tokens organized by sections:

- **Call-to-Action (CTA)**: Primary action colors (4 tokens)
- **Primary**: Core UI colors (4 tokens)
- **Secondary**: Secondary colors (4 tokens)
- **Danger**: Error and destructive colors (4 tokens)
- **Success**: Positive feedback colors (4 tokens)
- **Warning**: Cautionary colors (4 tokens)
- **Link**: Navigation colors (4 tokens)
- **Surface**: Background colors (5 tokens)
- **Surface - Input**: Input field colors (4 tokens)
- **Background**: Page backgrounds (2 tokens)
- **Border**: Border colors (5 tokens)
- **Text**: Text colors (6 tokens)
- **Icons**: Icon colors (5 tokens)
- **Complementary - Strong (1-10)**: Vibrant accents (10 tokens)
- **Complementary - Strong (11-20)**: Additional vibrant accents (10 tokens)
- **Complementary - Subtle (1-10)**: Soft accents (10 tokens)
- **Complementary - Subtle (11-20)**: Additional soft accents (10 tokens)
- **Complementary - Dark**: Dark accents (4 tokens)

**Total: 99 tokens across 18 sections**

## Workflow

### When to Regenerate Tokens

1. **After updating design tokens** - Whenever you modify colors in `designSystemData.ts`:
   ```bash
   npm run generate-tokens
   ```

2. **Before committing** - Ensure tokens are up-to-date:
   ```bash
   npm run generate-tokens
   git add public/tokens.json
   git commit -m "Update design tokens"
   ```

3. **During deployment** - Tokens are automatically regenerated:
   ```bash
   npm run build  # Generates tokens + builds app
   ```

## Integration with External Tools

The generated `public/tokens.json` can be fetched by:

### Figma Plugin

The Figma plugin can fetch tokens from the deployed website:

```javascript
const response = await fetch('https://your-domain.com/tokens.json');
const tokens = await response.json();

// Access sections and metadata
const sections = tokens.sections;
const version = tokens.meta.version;
const generatedAt = tokens.meta.generatedAt;
```

### Other Tools

Any tool can consume the tokens by fetching the JSON:

```bash
curl https://your-domain.com/tokens.json | jq '.meta'
```

## Metadata Fields

The `meta` object contains:

- **version** (string): Semantic version of the tokens format
- **generatedAt** (string): ISO 8601 timestamp of generation
- **source** (string): GitHub repository URL
- **totalTokens** (number): Count of all tokens across sections

## Error Handling

If the script encounters an error:

1. It will log a detailed error message
2. Exit with status code 1
3. The `public/tokens.json` file will not be modified

Common issues:

- **File not found**: Ensure `src/data/designSystemData.ts` exists
- **Directory not found**: The script creates `public/` if it doesn't exist
- **Permission denied**: Check file system permissions

## Development Notes

### Why Not a Build Plugin?

While we could integrate token generation into Vite directly, a standalone script provides:

- Independence from the build tool
- Ability to regenerate tokens without rebuilding the app
- Simpler debugging and error handling
- Easy execution in CI/CD pipelines

### Performance

Generation is fast (typically < 100ms) as it only reads and transforms data without compilation.

### Validation

To ensure tokens are valid, the designSystemData.ts includes validation that runs in development:

```bash
npm run dev  # Shows color validation warnings/errors in console
```

## Troubleshooting

### Tokens not updating?

1. Verify `src/data/designSystemData.ts` was modified correctly
2. Run `npm run generate-tokens` explicitly
3. Check that `public/` directory exists
4. Verify file permissions on `public/tokens.json`

### Plugin can't fetch tokens?

1. Ensure the web server is running (`npm run dev` or built deployment)
2. Check that `/tokens.json` is accessible (not blocked by CORS)
3. Verify the correct URL is used in the plugin

### Build fails?

1. Check Node.js version (requires Node.js 14+)
2. Verify all dependencies are installed: `npm install`
3. Look for error messages in console output

## Future Enhancements

Potential improvements:

- [ ] Generate tokens in additional formats (CSS, SCSS, JSON Schema)
- [ ] Add token validation against schema
- [ ] Generate design token documentation
- [ ] Create tokens in Figma API format
- [ ] Add configuration file for generator options
- [ ] Create CLI tool with watch mode

## Related Files

- `/src/data/designSystemData.ts` - Source of truth for all tokens
- `/src/utils/colorValidation.ts` - Token validation utilities
- `/public/tokens.json` - Generated output file
- `/package.json` - Scripts and build configuration
