# Architecture Overview

This document provides a comprehensive overview of the Design Book architecture, technical decisions, and system design.

## Table of Contents

- [High-Level Architecture](#high-level-architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Design Token System](#design-token-system)
- [Component Architecture](#component-architecture)
- [State Management](#state-management)
- [Theme System](#theme-system)
- [Build and Deployment](#build-and-deployment)
- [Code Splitting Strategy](#code-splitting-strategy)
- [Performance Optimizations](#performance-optimizations)

## High-Level Architecture

Design Book follows a component-based architecture built on React with TypeScript for type safety.

```
┌─────────────────────────────────────────────────────────────┐
│                         User Interface                       │
│  (React Components + Tailwind CSS + Radix UI Primitives)    │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────┴─────────────────────────────────────┐
│                    Application Layer                         │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Tokens     │  │  Components  │  │   Export     │     │
│  │   Display    │  │   Showcase   │  │   System     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────┴─────────────────────────────────────┐
│                      Data Layer                              │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Design Token │  │  Typography  │  │   Utility    │     │
│  │    Data      │  │    Data      │  │  Functions   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Application Flow

1. **User Interaction** → UI Components
2. **Component Logic** → Data Processing
3. **Data Layer** → Token/Component Data
4. **Rendering** → React Virtual DOM → Browser DOM
5. **Export** → Multi-format conversion → Download

## Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.3.1 | UI framework |
| **TypeScript** | 5.3.3 | Type safety |
| **Vite** | 6.3.5 | Build tool & dev server |
| **Tailwind CSS** | 3.4.0 | Utility-first CSS |

### UI Components

| Library | Purpose |
|---------|---------|
| **Radix UI** | Accessible component primitives |
| **shadcn/ui** | Pre-built component patterns |
| **Lucide React** | Icon library |

### Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **Vitest** | Unit testing |
| **React Testing Library** | Component testing |
| **axe-core** | Accessibility testing |

### Additional Libraries

- **next-themes** - Theme management
- **class-variance-authority** - Component variants
- **clsx** / **tailwind-merge** - Class name utilities
- **tinycolor2** - Color manipulation

## Project Structure

```
src/
├── components/              # React components
│   ├── ui/                  # shadcn/ui components (60+)
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...              # All UI primitives
│   ├── figma/               # Figma-specific components
│   │   └── FigmaEmbed.tsx   # Figma design embeds
│   ├── ErrorBoundary.tsx    # Error handling
│   ├── LoadingState.tsx     # Loading skeletons
│   └── ...                  # Feature components
│
├── data/                    # Static data
│   ├── designSystemData.ts  # Color tokens
│   └── typographyData.ts    # Typography tokens
│
├── utils/                   # Utility functions
│   ├── export.ts            # Multi-format export
│   ├── clipboard.ts         # Copy functionality
│   ├── a11y.ts              # Accessibility testing
│   └── cn.ts                # Class name utilities
│
├── styles/                  # Global styles
│   └── index.css            # Tailwind & CSS variables
│
├── test/                    # Test files
│   ├── setup.ts             # Test configuration
│   ├── example.test.tsx     # Component tests
│   └── a11y.test.tsx        # Accessibility tests
│
├── App.tsx                  # Main app component
├── main.tsx                 # React entry point
└── vite-env.d.ts            # Vite type definitions
```

### Directory Responsibilities

- **components/ui/**: Reusable, accessible UI primitives
- **components/**: Feature-specific components
- **data/**: Design system tokens and configuration
- **utils/**: Pure functions with no side effects
- **styles/**: Global CSS and Tailwind configuration
- **test/**: Test utilities and test files

## Design Token System

### Token Architecture

Design tokens are defined in TypeScript files as structured data:

```typescript
interface ColorToken {
  name: string;           // CSS variable name
  light: string;          // Light theme value
  dark: string;           // Dark theme value
  category: string;       // Token category
  description?: string;   // Optional description
}
```

### Token Categories

1. **Colors** (12 categories)
   - CTA (Call to Action)
   - Primary
   - Secondary
   - Danger
   - Success
   - Warning
   - Link
   - Surface
   - Background
   - Border
   - Text
   - Icons

2. **Typography** (34 styles)
   - Headings (H1-H6)
   - Body text
   - Labels
   - Links
   - Special text styles

3. **Spacing** (11 values)
   - 0px to 40px scale
   - Consistent spacing system

4. **Borders**
   - Border radius (8 values)
   - Border width (6 values)

### Token Storage

```
src/data/
├── designSystemData.ts    # 800+ lines
│   ├── Color categories
│   └── Complementary colors
│
└── typographyData.ts      # 350+ lines
    ├── Typography styles
    └── Font configurations
```

### Token Usage

Tokens are consumed in three ways:

1. **CSS Variables**: Applied globally via Tailwind
2. **JavaScript/TypeScript**: Direct data access
3. **Export Formats**: Multi-format conversion

## Component Architecture

### Component Hierarchy

```
App (Root)
├── ErrorBoundary
│   └── ThemeProvider
│       ├── Header
│       │   ├── Navigation
│       │   └── ThemeToggle
│       ├── Main Content
│       │   ├── Tokens Page
│       │   │   ├── ColorTokens
│       │   │   ├── TypographyTokens
│       │   │   ├── SpacingTokens
│       │   │   └── BorderTokens
│       │   │
│       │   └── Components Page (Lazy Loaded)
│       │       └── ComponentShowcase
│       │           ├── 60+ UI Components
│       │           └── Interactive Demos
│       │
│       └── Footer
```

### Component Patterns

#### 1. Composition Pattern

Components use composition over inheritance:

```typescript
<Card>
  <CardHeader>
    <CardTitle>Design Tokens</CardTitle>
  </CardHeader>
  <CardContent>
    <TokenList tokens={tokens} />
  </CardContent>
</Card>
```

#### 2. Compound Components

Related components work together:

```typescript
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
</Accordion>
```

#### 3. Render Props & Hooks

Custom hooks for reusable logic:

```typescript
function useTokenExport() {
  const [format, setFormat] = useState('css');
  const exportTokens = useCallback(() => {
    // Export logic
  }, [format]);
  return { format, setFormat, exportTokens };
}
```

## State Management

### Approach

Design Book uses **local state management** with React hooks:

- **useState**: Component-level state
- **useReducer**: Complex state logic
- **useContext**: Theme and global state
- **useCallback/useMemo**: Performance optimization

### No External State Library

We deliberately avoid Redux/MobX/Zustand because:
- Application state is simple
- Most state is UI-specific
- Theme is handled by `next-themes`
- Reduces bundle size
- Simpler mental model

### State Distribution

```
┌─────────────────────────────────────┐
│       Global State (Context)        │
│  - Theme (light/dark)               │
│  - Error boundary state             │
└─────────────────────────────────────┘
              │
    ┌─────────┴─────────┐
    │                   │
┌───▼──────┐    ┌──────▼────┐
│  Tokens  │    │ Components│
│  State   │    │   State   │
│  (Local) │    │  (Local)  │
└──────────┘    └───────────┘
```

## Theme System

### Implementation

Theme system uses `next-themes` library:

```typescript
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  <App />
</ThemeProvider>
```

### Theme Toggle

User can select:
- **Light**: Explicit light mode
- **Dark**: Explicit dark mode
- **System**: Follow OS preference

### CSS Variable Strategy

Tokens are defined as CSS variables that change with theme:

```css
:root {
  --color-primary: #3B82F6;
  --color-text: #1F2937;
}

.dark {
  --color-primary: #60A5FA;
  --color-text: #F9FAFB;
}
```

### Tailwind Integration

Tailwind uses these CSS variables:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: 'var(--color-primary)',
      text: 'var(--color-text)',
    }
  }
}
```

## Build and Deployment

### Build Process

```
Source Code (TypeScript/React)
        ↓
   Vite Bundler
        ↓
   Code Transformation
   - TypeScript → JavaScript
   - JSX → React.createElement
   - Tailwind → CSS
   - Asset optimization
        ↓
   Output (dist/)
   - index.html
   - assets/
     - index-[hash].js
     - index-[hash].css
     - Other assets
```

### Deployment Pipeline

```
1. Push to main branch
        ↓
2. GitHub Actions triggered
        ↓
3. Install dependencies (npm ci)
        ↓
4. Build project (npm run build)
        ↓
5. Upload dist/ to GitHub Pages
        ↓
6. Deploy to GitHub Pages
        ↓
7. Available at:
   https://davidbudzik.github.io/design-system-tokens_UI_components/
```

### Configuration

```typescript
// vite.config.ts
export default defineConfig({
  base: '/design-system-tokens_UI_components/',
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'radix-vendor': ['@radix-ui/...'],
        }
      }
    }
  }
});
```

## Code Splitting Strategy

### Lazy Loading

Large components are lazy-loaded to reduce initial bundle size:

```typescript
import { lazy, Suspense } from 'react';

// Lazy load ComponentsPage (large)
const ComponentsPage = lazy(() => import('./ComponentsPage'));

function App() {
  return (
    <Suspense fallback={<ComponentLoadingSkeleton />}>
      <ComponentsPage />
    </Suspense>
  );
}
```

### Bundle Structure

```
dist/assets/
├── index-[hash].js           # Main bundle (~200KB)
├── react-vendor-[hash].js    # React (~150KB)
├── radix-vendor-[hash].js    # Radix UI (~180KB)
├── ComponentsPage-[hash].js  # Lazy chunk (~120KB)
└── index-[hash].css          # Styles (~50KB)
```

### Benefits

- **Faster Initial Load**: Users don't download unused code
- **Better Caching**: Vendor chunks rarely change
- **Improved Performance**: Smaller initial bundle

## Performance Optimizations

### 1. Code Splitting

- Lazy loading for heavy components
- Vendor chunk separation
- Dynamic imports

### 2. Asset Optimization

- Image lazy loading
- CSS purging (unused styles removed)
- Minification and compression

### 3. React Optimizations

```typescript
// Memoization
const TokenList = React.memo(({ tokens }) => {
  return tokens.map(token => <Token key={token.name} {...token} />);
});

// useMemo for expensive calculations
const sortedTokens = useMemo(() => {
  return tokens.sort((a, b) => a.name.localeCompare(b.name));
}, [tokens]);

// useCallback for stable function references
const handleExport = useCallback(() => {
  exportTokens(format);
}, [format]);
```

### 4. Build Optimizations

- Tree shaking (dead code elimination)
- Minification
- Compression (gzip/brotli)
- Source maps for debugging

### 5. Runtime Optimizations

- Virtual scrolling for long lists (if needed)
- Debouncing search inputs
- Throttling scroll events
- Error boundaries prevent full app crashes

## Performance Metrics

Target metrics:

- **Initial Load**: < 3 seconds
- **Time to Interactive**: < 4 seconds
- **First Contentful Paint**: < 1.5 seconds
- **Bundle Size**: 
  - Main: < 500KB
  - Total: < 1MB (gzipped)

## Security Considerations

1. **No Sensitive Data**: All tokens are public design system data
2. **CSP Headers**: Content Security Policy via hosting
3. **Dependency Scanning**: Regular updates for vulnerabilities
4. **TypeScript**: Catches type-related bugs at compile time
5. **Input Validation**: Sanitization of user inputs in export

## Accessibility Architecture

- **Semantic HTML**: Proper element usage
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliance
- **Testing**: Automated axe-core testing

## Future Architecture Considerations

Potential improvements:

1. **API Layer**: Backend for token versioning
2. **Real-time Collaboration**: Multi-user editing
3. **Plugin System**: Extensible export formats
4. **Offline Support**: Service worker for offline access
5. **Analytics**: Usage tracking and insights

---

For implementation details, see:
- [Development Guidelines](./GUIDELINES.md)
- [Getting Started](./GETTING_STARTED.md)
- [Contributing Guide](./CONTRIBUTING.md)
