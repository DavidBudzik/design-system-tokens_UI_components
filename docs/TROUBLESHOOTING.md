# Troubleshooting Guide

> **Note**: This document consolidates and expands upon the former `BUILD_FIXES.md` file.

This guide helps you resolve common issues when working with Design Book.

## Table of Contents

- [Build Issues](#build-issues)
- [Runtime Errors](#runtime-errors)
- [Development Issues](#development-issues)
- [Deployment Issues](#deployment-issues)
- [Testing Issues](#testing-issues)
- [FAQ](#faq)
- [Getting Help](#getting-help)

## Build Issues

### Issue: Missing typographyData Import

**Problem**: After moving typography data to `src/data/typographyData.ts`, the import was not added to App.tsx

**Error Messages**:
```
ReferenceError: typographyData is not defined
Cannot find name 'typographyData'
```

**Solution**: Add import statement in src/App.tsx:
```typescript
import { typographyData } from './data/typographyData';
```

**Status**: ✅ Fixed

---

### Issue: Duplicate typographyData Definition

**Problem**: The old inline typographyData definition (352 lines) was still present in App.tsx after we moved it to a separate file

**Solution**: Removed lines 16-367 from App.tsx containing the duplicate definition

**Status**: ✅ Fixed

---

### Issue: Vite Config TypeScript Errors

**Problem**: The rollup-plugin-visualizer types were not properly handled in vite.config.ts

**Error Messages**:
```
Type 'Plugin' is not assignable to type 'PluginOption'
```

**Solution**:
1. Add PluginOption type import from Vite
2. Add proper type assertions to plugins array

```typescript
import type { PluginOption } from 'vite';

// ...
plugins: [
  react(),
  mode === 'analyze' &&
    visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }) as PluginOption,
].filter(Boolean) as PluginOption[],
```

**Status**: ✅ Fixed

---

### Issue: Build Fails with Module Errors

**Problem**: Build fails with "Cannot find module" errors

**Error Messages**:
```
Error: Cannot find module '@/components/ui/button'
Module not found: Can't resolve './components/LoadingState'
```

**Solutions**:

1. **Clear cache and rebuild**:
```bash
rm -rf node_modules/.vite
rm -rf dist
npm run build
```

2. **Reinstall dependencies**:
```bash
rm -rf node_modules package-lock.json
npm install
```

3. **Check path aliases in tsconfig.json**:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

### Issue: TypeScript Compilation Errors

**Problem**: TypeScript fails to compile with type errors

**Solutions**:

1. **Run type check**:
```bash
npm run type-check
```

2. **Clear TypeScript cache**:
```bash
rm -rf node_modules/.cache
```

3. **Update TypeScript**:
```bash
npm install -D typescript@latest
```

---

### Issue: Out of Memory During Build

**Problem**: Build fails with "JavaScript heap out of memory" error

**Solution**: Increase Node.js memory limit:
```bash
# Temporarily (current session)
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Or add to package.json scripts
{
  "build": "NODE_OPTIONS='--max-old-space-size=4096' vite build"
}
```

---

## Runtime Errors

### Issue: "React is not defined"

**Problem**: React is not imported in component files

**Solution**: Add React import at the top of the file:
```typescript
import React from 'react';
// or for specific hooks
import { useState, useEffect } from 'react';
```

---

### Issue: Theme Not Switching

**Problem**: Theme toggle doesn't change the theme

**Solutions**:

1. **Check ThemeProvider setup** in main.tsx:
```typescript
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  <App />
</ThemeProvider>
```

2. **Verify CSS variables** in index.css:
```css
:root {
  --color-background: #ffffff;
}

.dark {
  --color-background: #000000;
}
```

3. **Check tailwind.config.js**:
```javascript
module.exports = {
  darkMode: ['class'],
  // ...
}
```

---

### Issue: Components Not Rendering

**Problem**: Components appear blank or don't render

**Debugging Steps**:

1. **Check browser console** for errors
2. **Verify imports** are correct
3. **Check Error Boundary** - might be catching errors
4. **Inspect React DevTools** - check component tree

**Common Causes**:
- Missing return statement
- Incorrect JSX syntax
- Missing dependencies in useEffect
- Infinite render loop

---

### Issue: Export Functionality Not Working

**Problem**: Token export doesn't download or produces incorrect output

**Solutions**:

1. **Check browser console** for errors
2. **Verify export format** is supported
3. **Test with different browsers**
4. **Check popup blockers** - might block downloads

---

## Development Issues

### Issue: Hot Module Replacement Not Working

**Problem**: Changes don't reflect in browser without manual refresh

**Solutions**:

1. **Restart dev server**:
```bash
# Stop server (Ctrl+C)
npm run dev
```

2. **Clear browser cache**: Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

3. **Check vite.config.ts**: Ensure HMR is not disabled

---

### Issue: Port Already in Use

**Problem**: "Port 3000 is already in use"

**Solutions**:

**On macOS/Linux**:
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9
```

**On Windows**:
```bash
# Find process
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

**Or change port** in vite.config.ts:
```typescript
server: {
  port: 3001,
}
```

---

### Issue: ESLint/Prettier Conflicts

**Problem**: Code passes Prettier but fails ESLint, or vice versa

**Solution**: Run both in order:
```bash
npm run format
npm run lint:fix
```

Add to VS Code settings.json:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

### Issue: Slow Development Server

**Problem**: Dev server is slow or unresponsive

**Solutions**:

1. **Reduce bundle size**: Check for large dependencies
2. **Clear cache**:
```bash
rm -rf node_modules/.vite
```

3. **Close other applications**: Free up system resources
4. **Optimize imports**: Use specific imports instead of barrel imports

---

## Deployment Issues

### Issue: GitHub Pages 404 Error

**Problem**: Deployed app shows 404 or assets fail to load

**Solutions**:

1. **Check base path** in vite.config.ts:
```typescript
base: '/design-system-tokens_UI_components/',
```

2. **Verify GitHub Pages settings**:
   - Go to repository Settings → Pages
   - Source should be "GitHub Actions"

3. **Check workflow file** (.github/workflows/deploy.yml):
   - Ensure it runs on push to main
   - Verify build step succeeds

---

### Issue: Build Works Locally But Fails in CI

**Problem**: npm run build works locally but fails in GitHub Actions

**Common Causes & Solutions**:

1. **Different Node versions**:
```yaml
# In .github/workflows/deploy.yml
- uses: actions/setup-node@v4
  with:
    node-version: '20'  # Match local version
```

2. **Missing environment variables**: Add to workflow
3. **Case-sensitive file systems**: Check import paths
4. **Dependency issues**: Use `npm ci` instead of `npm install`

---

### Issue: Assets Not Loading After Deployment

**Problem**: Images, fonts, or other assets return 404

**Solutions**:

1. **Check asset paths**: Use relative paths
2. **Verify base path**: Ensure Vite base matches deployment URL
3. **Check public folder**: Static assets should be in `/public`

---

## Testing Issues

### Issue: Tests Failing Locally

**Problem**: Tests pass in CI but fail locally, or vice versa

**Solutions**:

1. **Clear test cache**:
```bash
npm test -- --clearCache
```

2. **Update snapshots** if UI changed:
```bash
npm test -- -u
```

3. **Check Node version**: Ensure same version as CI

---

### Issue: Cannot Find Module in Tests

**Problem**: Tests can't resolve imports

**Solution**: Check vitest.config.ts aliases match tsconfig.json:
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

---

## FAQ

### Q: Why is my bundle size so large?

**A**: Check these common causes:
1. Importing entire libraries instead of specific components
2. Including development dependencies in production build
3. Not lazy loading large components
4. Duplicate dependencies

Run bundle analyzer:
```bash
npm run analyze
```

---

### Q: How do I update dependencies safely?

**A**: Follow these steps:
1. Check for outdated packages: `npm outdated`
2. Update one at a time: `npm update <package-name>`
3. Test thoroughly after each update
4. Run full test suite: `npm test`
5. Check for breaking changes in changelogs

---

### Q: Can I use yarn or pnpm instead of npm?

**A**: Yes, but be consistent across the team:
- Delete package-lock.json if switching
- Update CI workflows
- Document the change

---

### Q: How do I debug production builds?

**A**: 
1. Build with source maps (already enabled)
2. Use preview mode: `npm run preview`
3. Check browser DevTools → Sources tab
4. Add console.log statements strategically

---

### Q: What browsers are supported?

**A**: 
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

For IE11 support, additional polyfills would be needed (not currently included).

---

## Getting Help

If you're still experiencing issues:

### 1. Search Existing Issues

Check if your issue is already reported:
- [GitHub Issues](https://github.com/DavidBudzik/design-system-tokens_UI_components/issues)

### 2. Create a New Issue

Provide:
- **Environment**: OS, Node version, browser
- **Error Message**: Full error text and stack trace
- **Steps to Reproduce**: Detailed steps
- **Expected vs Actual**: What should happen vs what does happen
- **Screenshots**: If applicable

### 3. Ask for Help

- Open a GitHub Discussion
- Ask in project chat/Slack
- Contact the design system team

### 4. Debug Checklist

Before asking for help, try:

- [ ] Restart dev server
- [ ] Clear all caches (`rm -rf node_modules/.vite dist`)
- [ ] Reinstall dependencies (`rm -rf node_modules && npm install`)
- [ ] Check browser console for errors
- [ ] Try in incognito mode (no extensions)
- [ ] Test on different browser
- [ ] Pull latest changes from main
- [ ] Run type check (`npm run type-check`)
- [ ] Run linter (`npm run lint`)
- [ ] Run tests (`npm test`)

---

## Additional Resources

- [Getting Started Guide](./GETTING_STARTED.md) - Initial setup
- [Architecture Overview](./ARCHITECTURE.md) - System design
- [Development Guidelines](./GUIDELINES.md) - Best practices
- [Contributing Guide](./CONTRIBUTING.md) - Contribution workflow

---

**Last Updated**: December 2025

**Maintainers**: If you fix an issue, please document the solution here!
