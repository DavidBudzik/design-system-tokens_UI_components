# Design Book - Tokens & UI Components

A comprehensive design system documentation and token management web application built with React, TypeScript, and Vite. This tool bridges the gap between design (Figma) and development by providing an interactive showcase for design tokens and UI components with multi-format export capabilities.

**Original Figma Project:** [Able Design System Tokens](https://www.figma.com/design/UwgyI4j4KDwMU8U4EiCg0p/Able_Design-System-Tokens)

## Features

### Design Tokens
- **Comprehensive Token System**: Colors, typography, spacing, and borders
- **Theme Support**: Full light/dark mode with real-time switching
- **Interactive Previews**: Live color swatches with theme awareness
- **Multi-Format Export**: 10+ export formats including:
  - CSS Variables, SCSS, JSON
  - JavaScript/TypeScript
  - Tailwind Config
  - iOS Swift, Android Kotlin/XML
  - LESS Variables
  - Figma Tokens JSON

### UI Components
- **60+ shadcn/ui Components**: Built on Radix UI primitives
- **Interactive Showcase**: Live component demonstrations
- **Accessible**: WCAG-compliant with keyboard navigation
- **Responsive**: Mobile-first design

### Developer Experience
- TypeScript for type safety
- ESLint + Prettier for code quality
- Vitest + React Testing Library for testing
- Bundle analysis and optimization
- Error boundaries for graceful error handling
- Code splitting for optimal performance

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:3000`

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format           # Format with Prettier
npm run format:check     # Check formatting
npm run type-check       # Run TypeScript compiler

# Testing
npm test                 # Run tests
npm run test:ui          # Run tests with UI
npm run test:coverage    # Generate coverage report

# Analysis
npm run analyze          # Analyze bundle size
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/              # shadcn/ui components (60+)
│   ├── figma/           # Figma-specific components
│   ├── LoadingState.tsx # Skeleton screens
│   ├── ErrorBoundary.tsx# Error handling
│   └── ...              # Feature components
├── data/                # Design system data
│   ├── designSystemData.ts  # Color tokens
│   └── typographyData.ts    # Typography tokens
├── utils/               # Utility functions
│   ├── export.ts        # Multi-format export
│   ├── clipboard.ts     # Copy functionality
│   ├── a11y.ts          # Accessibility testing
│   └── ...
├── styles/              # Global CSS and tokens
├── test/                # Test utilities and specs
└── App.tsx              # Main application

.github/workflows/       # CI/CD (GitHub Pages)
```

## Architecture

### Technology Stack
- **Frontend**: React 18.3 + TypeScript
- **Build Tool**: Vite 6.3
- **UI Library**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS + CSS Variables
- **Theme**: next-themes
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint 9 + Prettier
- **Accessibility**: axe-core

### Design Tokens

The design system includes:
- **12 Color Categories**: CTA, Primary, Secondary, Danger, Success, Warning, Link, Surface, Background, Border, Text, Icons
- **40 Complementary Colors**: Strong and subtle variants
- **34 Typography Styles**: Headings, text, links, labels
- **11 Spacing Values**: 0-40px scale
- **8 Border Radius Values**: none to full
- **6 Border Width Values**: none to xl

### Code Splitting

The application uses React.lazy() for optimal performance:
- ComponentsPage is lazy-loaded only when accessed
- Vendor chunks split (React, Radix UI)
- Skeleton screens during loading

### Error Handling

- Error boundaries catch React errors
- Graceful fallback UI with reload option
- Console logging for debugging

## Development

### Adding New Tokens

1. Update `src/data/designSystemData.ts` or `src/data/typographyData.ts`
2. Tokens automatically appear in the UI
3. Export functionality works for all formats

### Adding New Export Formats

1. Add format to `src/utils/export.ts`
2. Implement converter function
3. Update ExportDialog component

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Generate coverage
npm run test:coverage
```

### Accessibility Testing

```bash
# Run a11y tests
npm test -- a11y.test

# Development mode includes automatic a11y checking
npm run dev
```

## Deployment

The project deploys automatically to GitHub Pages via GitHub Actions on push to `main` branch.

### Manual Deployment

```bash
# Build for production
npm run build

# Preview build locally
npm run preview

# Deploy dist/ folder to your hosting provider
```

## Configuration

### TypeScript

TypeScript is configured with strict mode in `tsconfig.json`. Path aliases use `@/` for `src/`.

### Tailwind CSS

Custom configuration in `tailwind.config.js` includes:
- Design system color tokens
- Custom animations
- shadcn/ui theming

### Vite

Build optimization in `vite.config.ts`:
- Code splitting configuration
- Bundle visualization
- Asset optimization

## Contributing

1. Create a new branch from `main`
2. Make your changes
3. Run `npm run lint:fix` and `npm run format`
4. Run `npm test` to ensure tests pass
5. Submit a pull request

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the design system team or file an issue in the repository.

## Roadmap

- [ ] Token search and filtering
- [ ] Component code snippets
- [ ] Export history tracking
- [ ] Token comparison tool
- [ ] Component playground with live editing
- [ ] Storybook integration
- [ ] Component documentation generator
