# Design Book - Development Guidelines

> **⚠️ NOTICE: This file has been moved to [`docs/GUIDELINES.md`](./docs/GUIDELINES.md)**
> 
> This file remains here for backward compatibility. Please update your bookmarks and references to point to the new location.
> 
> **New Location:** [`docs/GUIDELINES.md`](./docs/GUIDELINES.md)

---

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

## Questions or Suggestions?

If you have questions about these guidelines or suggestions for improvements, please open an issue or contact the design system team.
