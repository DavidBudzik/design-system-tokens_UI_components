# Design Book - Development Guidelines

> **Note**: This file has been moved to `/docs/GUIDELINES.md` for better organization. All content has been preserved and enhanced.

This document outlines the development guidelines, best practices, and standards for contributing to Design Book.

## Table of Contents

- [Code Style](#code-style)
- [Component Guidelines](#component-guidelines)
- [Token Management](#token-management)
- [Accessibility](#accessibility)
- [Testing](#testing)
- [Performance](#performance)
- [Git Workflow](#git-workflow)

## Code Style

### TypeScript

- **Always use TypeScript** for type safety
- Use explicit types for function parameters and return values
- Avoid `any` - use `unknown` if type is truly unknown
- Use interfaces for object shapes, types for unions/primitives
- Enable strict mode in tsconfig.json

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

// Avoid
function handleClick(data: any) { ... }
```

### React Components

- Use functional components with hooks
- Keep components small and focused (< 200 lines)
- Extract complex logic into custom hooks
- Use composition over inheritance

```typescript
// Good - Small, focused component
export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button className={cn('btn', `btn-${variant}`)} onClick={onClick}>
      {label}
    </button>
  );
}

// Extract complex logic to hooks
function useTokenExport() {
  const [format, setFormat] = useState('css');
  const exportTokens = useCallback(() => { ... }, [format]);
  return { format, setFormat, exportTokens };
}
```

### File Organization

```
src/
├── components/
│   ├── ui/              # Base UI components (buttons, inputs)
│   ├── features/        # Feature-specific components
│   └── layout/          # Layout components (header, footer)
├── hooks/               # Custom React hooks
├── utils/               # Pure utility functions
├── data/                # Static data and constants
├── types/               # TypeScript type definitions
└── test/                # Test utilities and specs
```

### Naming Conventions

- **Components**: PascalCase (e.g., `ColorToken`, `ExportDialog`)
- **Files**: Match component name (e.g., `ColorToken.tsx`)
- **Functions**: camelCase (e.g., `exportToCss`, `handleClick`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_TOKEN_LENGTH`)
- **CSS Classes**: kebab-case (e.g., `token-card`, `export-button`)

### Formatting

All code must be formatted with Prettier before committing:

```bash
npm run format
```

ESLint rules must pass:

```bash
npm run lint
```

## Component Guidelines

### shadcn/ui Components

When adding or modifying shadcn/ui components:

1. Follow the shadcn/ui pattern
2. Keep components in `src/components/ui/`
3. Use the `cn()` utility for className merging
4. Support theme variants (light/dark)
5. Include proper TypeScript types

```typescript
import { cn } from './utils';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('rounded-lg border bg-card text-card-foreground', className)}
      {...props}
    />
  );
}
```

### Custom Components

For feature components:

1. Accept `className` prop for styling flexibility
2. Use `React.ComponentProps` for HTML element props
3. Forward refs when necessary
4. Support controlled and uncontrolled modes

```typescript
interface ColorTokenProps {
  name: string;
  value: string;
  theme?: 'light' | 'dark';
  className?: string;
  onCopy?: (value: string) => void;
}

export function ColorToken({
  name,
  value,
  theme = 'light',
  className,
  onCopy
}: ColorTokenProps) {
  return (
    <div className={cn('token-card', className)}>
      {/* Component content */}
    </div>
  );
}
```

### Component Composition

Prefer composition patterns:

```typescript
// Good - Composable
<Card>
  <CardHeader>
    <CardTitle>Design Tokens</CardTitle>
  </CardHeader>
  <CardContent>
    <TokenList tokens={tokens} />
  </CardContent>
</Card>

// Avoid - Monolithic
<TokenCard title="Design Tokens" tokens={tokens} />
```

## Token Management

### Adding New Tokens

1. Add tokens to appropriate data file:
   - Colors: `src/data/designSystemData.ts`
   - Typography: `src/data/typographyData.ts`

2. Follow the token structure:

```typescript
{
  name: '--token-name',
  category: 'colors',
  light: '#FFFFFF',
  dark: '#000000',
  description: 'Token description'
}
```

3. Update CSS variables in `src/index.css`:

```css
:root {
  --token-name: #FFFFFF;
}

.dark {
  --token-name: #000000;
}
```

4. Add export support in `src/utils/export.ts`

### Token Naming Convention

Follow this pattern: `--{category}-{element}-{modifier}`

Examples:
- `--color-background-primary`
- `--text-heading-large`
- `--spacing-margin-small`
- `--border-radius-medium`

## Accessibility

All components must meet WCAG 2.1 Level AA standards.

### Requirements

1. **Semantic HTML**: Use appropriate HTML elements
2. **Keyboard Navigation**: All interactive elements must be keyboard accessible
3. **ARIA Labels**: Provide labels for screen readers
4. **Focus Management**: Visible focus indicators
5. **Color Contrast**: Minimum 4.5:1 for text, 3:1 for UI elements

```typescript
// Good - Accessible button
<button
  type="button"
  aria-label="Export tokens as CSS"
  onClick={handleExport}
>
  Export
</button>

// Good - Accessible form
<div>
  <label htmlFor="token-search">Search tokens</label>
  <input
    id="token-search"
    type="text"
    placeholder="Search..."
    aria-describedby="search-hint"
  />
  <span id="search-hint">Enter token name or value</span>
</div>
```

### Testing Accessibility

Run automated tests:

```bash
npm test -- a11y.test
```

Use the axe DevTools browser extension for manual testing.

## Testing

### Unit Tests

Write tests for:
- Utility functions
- Custom hooks
- Complex component logic

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ColorToken } from './ColorToken';

describe('ColorToken', () => {
  it('displays the token name', () => {
    render(<ColorToken name="--primary-color" value="#FF0000" />);
    expect(screen.getByText('--primary-color')).toBeInTheDocument();
  });

  it('shows color value', () => {
    render(<ColorToken name="--primary-color" value="#FF0000" />);
    expect(screen.getByText('#FF0000')).toBeInTheDocument();
  });
});
```

### Component Tests

Test user interactions:

```typescript
import { userEvent } from '@testing-library/user-event';

it('copies token value on click', async () => {
  const onCopy = vi.fn();
  render(<ColorToken name="--primary" value="#FF0000" onCopy={onCopy} />);

  const copyButton = screen.getByRole('button', { name: /copy/i });
  await userEvent.click(copyButton);

  expect(onCopy).toHaveBeenCalledWith('#FF0000');
});
```

### Test Coverage

Maintain minimum 70% code coverage:

```bash
npm run test:coverage
```

## Performance

### Code Splitting

Use React.lazy() for large components:

```typescript
import { lazy, Suspense } from 'react';
import { LoadingSkeleton } from './LoadingState';

const ComponentsPage = lazy(() => import('./ComponentsPage'));

function App() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ComponentsPage />
    </Suspense>
  );
}
```

### Bundle Optimization

1. Analyze bundle size regularly:

```bash
npm run analyze
```

2. Keep bundle sizes reasonable:
   - Main chunk: < 500KB
   - Vendor chunks: < 300KB each
   - Individual components: < 50KB

3. Use dynamic imports for heavy dependencies

### Rendering Optimization

- Use `React.memo()` for expensive components
- Use `useMemo()` and `useCallback()` appropriately
- Avoid inline function definitions in JSX
- Implement virtual scrolling for long lists

```typescript
// Good - Memoized
const TokenList = React.memo(({ tokens }: TokenListProps) => {
  return tokens.map(token => <TokenCard key={token.name} {...token} />);
});

// Good - Memoized expensive calculation
const sortedTokens = useMemo(() => {
  return tokens.sort((a, b) => a.name.localeCompare(b.name));
}, [tokens]);
```

## Git Workflow

### Branch Naming

- Feature: `feature/add-token-search`
- Bug fix: `fix/export-button-alignment`
- Documentation: `docs/update-guidelines`
- Refactor: `refactor/extract-export-logic`

### Commit Messages

Follow conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

Examples:
```
feat(tokens): add complementary color tokens

fix(export): correct CSS variable formatting

docs(readme): update installation instructions

refactor(components): extract token card logic
```

### Pull Requests

1. Create feature branch from `main`
2. Make changes with clear commits
3. Run tests and linting:
   ```bash
   npm run lint:fix
   npm run format
   npm test
   npm run type-check
   ```
4. Update documentation if needed
5. Create PR with description:
   - What: Brief description of changes
   - Why: Reason for changes
   - How: Implementation approach
   - Testing: How to test the changes

### Code Review Checklist

- [ ] Code follows style guidelines
- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Accessibility requirements met
- [ ] Performance impact considered
- [ ] TypeScript types are correct
- [ ] Bundle size impact acceptable

## Design Token Export Formats

When adding new export formats:

1. Add format type to `ExportFormat` enum
2. Implement converter function in `src/utils/export.ts`
3. Add format option to ExportDialog
4. Include format in documentation

```typescript
function convertToNewFormat(tokens: Token[]): string {
  // Implementation
  return formattedOutput;
}
```

## Best Practices

### Code Organization

1. **Keep Components Small**: Components should be < 200 lines
2. **Single Responsibility**: Each function/component does one thing well
3. **DRY Principle**: Don't repeat yourself - extract reusable logic
4. **Clear Naming**: Use descriptive names that explain purpose

### Error Handling

```typescript
// Good - Graceful error handling
try {
  const result = await exportTokens(format);
  showSuccessMessage('Tokens exported successfully');
} catch (error) {
  console.error('Export failed:', error);
  showErrorMessage('Failed to export tokens. Please try again.');
}

// Avoid - Silent failures
await exportTokens(format).catch(() => {});
```

### Performance Tips

1. **Avoid Unnecessary Re-renders**
   - Use React.memo for pure components
   - Use useMemo for expensive calculations
   - Use useCallback for stable function references

2. **Optimize Bundle Size**
   - Lazy load large components
   - Import only what you need: `import { Button } from './ui/button'`
   - Avoid importing entire libraries

3. **Efficient Data Structures**
   - Use Maps for O(1) lookups
   - Cache computed values
   - Debounce/throttle event handlers

### Security Best Practices

1. **Input Validation**: Always validate and sanitize user inputs
2. **No Eval**: Never use `eval()` or `Function()` constructor
3. **XSS Prevention**: Sanitize HTML content
4. **Dependency Updates**: Keep dependencies up to date

### Accessibility Checklist

Before submitting a PR, verify:

- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] ARIA labels are provided where needed
- [ ] Color contrast meets WCAG AA standards
- [ ] Screen readers can navigate the content
- [ ] Forms have proper labels
- [ ] Error messages are accessible

### Code Review Tips

When reviewing code:

1. **Check for Correctness**: Does it work as intended?
2. **Check for Edge Cases**: What if data is empty/null/invalid?
3. **Check for Performance**: Are there obvious bottlenecks?
4. **Check for Accessibility**: Is it accessible?
5. **Check for Tests**: Are there adequate tests?
6. **Check for Documentation**: Is it well-documented?

### Visual Examples

#### Good Component Structure

```typescript
// ColorToken.tsx - Well-structured component
import { cn } from '@/utils';
import { Button } from '@/components/ui/button';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

interface ColorTokenProps {
  name: string;
  value: string;
  theme?: 'light' | 'dark';
  className?: string;
}

export function ColorToken({
  name,
  value,
  theme = 'light',
  className
}: ColorTokenProps) {
  const { copy, copied } = useCopyToClipboard();

  return (
    <div className={cn('token-card', className)}>
      <div 
        className="token-swatch" 
        style={{ backgroundColor: value }}
        aria-label={`Color swatch for ${name}`}
      />
      <div className="token-info">
        <span className="token-name">{name}</span>
        <span className="token-value">{value}</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => copy(value)}
        aria-label={`Copy ${name} value`}
      >
        {copied ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  );
}
```

#### Common Patterns

**Pattern: Controlled Component**
```typescript
function SearchInput({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search tokens..."
    />
  );
}
```

**Pattern: Custom Hook**
```typescript
function useTokenFilter(tokens: Token[], query: string) {
  return useMemo(() => {
    if (!query) return tokens;
    return tokens.filter(token =>
      token.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [tokens, query]);
}
```

**Pattern: Error Boundary**
```typescript
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

## Questions or Suggestions?

If you have questions about these guidelines or suggestions for improvements, please open an issue or contact the design system team.

---

**Related Documentation:**
- [Getting Started Guide](./GETTING_STARTED.md)
- [Architecture Overview](./ARCHITECTURE.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Troubleshooting](./TROUBLESHOOTING.md)
