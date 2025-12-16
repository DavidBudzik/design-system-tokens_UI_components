# Design Book - Tokens & UI Components

<div align="center">

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-private-red.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg)

**A comprehensive design system documentation and token management web application**

[Live Demo](https://davidbudzik.github.io/design-system-tokens_UI_components/) • [Documentation](./docs/) • [Getting Started](./docs/GETTING_STARTED.md) • [Contributing](./docs/CONTRIBUTING.md)

</div>

---

## 🎯 Overview

Design Book bridges the gap between design (Figma) and development by providing an interactive showcase for design tokens and UI components with multi-format export capabilities. Built with React, TypeScript, and Vite, it offers a modern, accessible, and performant solution for managing and documenting design systems.

**Original Figma Project:** [Able Design System Tokens](https://www.figma.com/design/UwgyI4j4KDwMU8U4EiCg0p/Able_Design-System-Tokens)

## 📸 Screenshots

> **Note:** Screenshots coming soon! See [docs/images/README.md](./docs/images/README.md) for instructions on adding screenshots.

<!-- Uncomment when screenshots are available
### Token Palette
![Design Book Token Palette - Light Mode](./docs/images/token-palette-light.png)
*Design tokens in light mode*

![Design Book Token Palette - Dark Mode](./docs/images/token-palette-dark.png)
*Design tokens in dark mode*

### Component Showcase
![Component Library](./docs/images/components-showcase.png)
*60+ accessible UI components*
-->

## 🔗 Quick Links

- **📚 [Documentation](./docs/)** - Complete documentation hub
- **🚀 [Getting Started](./docs/GETTING_STARTED.md)** - Setup and installation guide
- **🏗️ [Architecture](./docs/ARCHITECTURE.md)** - Technical architecture overview
- **📖 [Guidelines](./docs/GUIDELINES.md)** - Development best practices
- **🤝 [Contributing](./docs/CONTRIBUTING.md)** - How to contribute
- **🛠️ [Troubleshooting](./docs/TROUBLESHOOTING.md)** - Common issues and solutions
- **🗺️ [Roadmap](./docs/ROADMAP.md)** - Project roadmap and future plans

## 🌟 Project Status

**Current Phase:** Active Development  
**Latest Release:** v0.1.0  
**Next Milestone:** Enhanced documentation and user experience features

See the [Roadmap](./docs/ROADMAP.md) for detailed project status and planned features.

## ✨ Key Features

## ✨ Key Features

### 🎨 Design Tokens
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

### 🧩 UI Components
- **60+ shadcn/ui Components**: Built on Radix UI primitives
- **Interactive Showcase**: Live component demonstrations
- **Accessible**: WCAG-compliant with keyboard navigation
- **Responsive**: Mobile-first design

### 💻 Developer Experience
- TypeScript for type safety
- ESLint + Prettier for code quality
- Vitest + React Testing Library for testing
- Bundle analysis and optimization
- Error boundaries for graceful error handling
- Code splitting for optimal performance

## 🛠️ Tech Stack

<div align="center">

### Core Technologies

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### UI & Components

![Radix UI](https://img.shields.io/badge/Radix_UI-Latest-161618?style=for-the-badge&logo=radix-ui&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Latest-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

### Development Tools

![ESLint](https://img.shields.io/badge/ESLint-9.0.0-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-3.1.1-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-1.1.0-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

</div>

See [Architecture Documentation](./docs/ARCHITECTURE.md) for detailed technical information.

## 🚀 Quick Start

> **New to the project?** Check out the comprehensive [Getting Started Guide](./docs/GETTING_STARTED.md) for detailed setup instructions.

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

## 🎮 Demo

**Live Application:** [https://davidbudzik.github.io/design-system-tokens_UI_components/](https://davidbudzik.github.io/design-system-tokens_UI_components/)

Try it now to:
- 🎨 Explore design tokens in light/dark themes
- 🧩 Browse 60+ accessible UI components
- 📥 Export tokens in multiple formats
- 🔄 Experience real-time theme switching

## 📋 Available Scripts

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

> **💡 Tip:** Run `npm run lint:fix && npm run format` before committing to ensure code quality.

## 📂 Project Structure

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

docs/                    # 📚 Documentation
├── README.md            # Documentation hub
├── GETTING_STARTED.md   # Setup guide
├── ARCHITECTURE.md      # Technical architecture
├── GUIDELINES.md        # Development guidelines
├── CONTRIBUTING.md      # Contributing guide
├── TROUBLESHOOTING.md   # Common issues
├── ROADMAP.md           # Project roadmap
└── images/              # Documentation screenshots

.github/workflows/       # CI/CD (GitHub Pages)
```

> **📖 For detailed architecture information, see [Architecture Documentation](./docs/ARCHITECTURE.md)**

## 🏗️ Architecture

> **📖 For comprehensive architecture documentation, see [Architecture Overview](./docs/ARCHITECTURE.md)**

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

> **📖 See [Design Token Architecture](./docs/ARCHITECTURE.md#design-token-system) for detailed information**

The design system includes:
- **12 Color Categories**: CTA, Primary, Secondary, Danger, Success, Warning, Link, Surface, Background, Border, Text, Icons
- **40 Complementary Colors**: Strong and subtle variants
- **34 Typography Styles**: Headings, text, links, labels
- **11 Spacing Values**: 0-40px scale
- **8 Border Radius Values**: none to full
- **6 Border Width Values**: none to xl

### Code Splitting

> **📖 See [Code Splitting Strategy](./docs/ARCHITECTURE.md#code-splitting-strategy) for implementation details**

The application uses React.lazy() for optimal performance:
- ComponentsPage is lazy-loaded only when accessed
- Vendor chunks split (React, Radix UI)
- Skeleton screens during loading

### Error Handling

- Error boundaries catch React errors
- Graceful fallback UI with reload option
- Console logging for debugging

## 💡 Development

> **📖 For comprehensive development guidelines, see [Development Guidelines](./docs/GUIDELINES.md)**

### Adding New Tokens

1. Update `src/data/designSystemData.ts` or `src/data/typographyData.ts`
2. Tokens automatically appear in the UI
3. Export functionality works for all formats

### Adding New Export Formats

1. Add format to `src/utils/export.ts`
2. Implement converter function
3. Update ExportDialog component

### Running Tests

> **📖 See [Testing Requirements](./docs/CONTRIBUTING.md#testing-requirements) for testing guidelines**

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

> **📖 See [Accessibility Architecture](./docs/ARCHITECTURE.md#accessibility-architecture) for more details**

```bash
# Run a11y tests
npm test -- a11y.test

# Development mode includes automatic a11y checking
npm run dev
```

## 🚀 Deployment

> **📖 See [Build and Deployment](./docs/ARCHITECTURE.md#build-and-deployment) for deployment architecture**

### GitHub Pages

The application is automatically deployed to GitHub Pages on every push to the `main` branch.

**Live URL:** [https://davidbudzik.github.io/design-system-tokens_UI_components/](https://davidbudzik.github.io/design-system-tokens_UI_components/)

#### How It Works

1. **Automatic Deployment**: The `.github/workflows/deploy.yml` workflow triggers on push to `main`
2. **Build Process**: 
   - Installs dependencies with `npm ci`
   - Builds the project with `npm run build`
   - Uploads the `dist` folder as a GitHub Pages artifact
3. **Deployment**: Uses GitHub's official `actions/deploy-pages@v4` action to deploy to GitHub Pages
4. **Base Path**: Vite is configured with `base: '/design-system-tokens_UI_components/'` to ensure all assets load correctly

#### Initial Setup

After merging changes, ensure GitHub Pages is configured:
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. The app will automatically deploy on the next push to main

### Manual Deployment

```bash
# Build for production
npm run build

# Preview build locally
npm run preview

# Deploy dist/ folder to your hosting provider
```

## ⚙️ Configuration

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

## 🤝 Contributing

> **📖 See [Contributing Guide](./docs/CONTRIBUTING.md) for detailed contribution guidelines**

We welcome contributions! Here's how to get started:

1. Read the [Contributing Guide](./docs/CONTRIBUTING.md)
2. Check the [Development Guidelines](./docs/GUIDELINES.md)
3. Review the [Roadmap](./docs/ROADMAP.md) for planned features
4. Create a new branch from `main`
5. Make your changes following our [Style Guide](./docs/CONTRIBUTING.md#style-guide)
6. Run tests and linters:
   ```bash
   npm run lint:fix
   npm run format
   npm test
   npm run type-check
   ```
7. Submit a pull request

### Good First Issues

Look for issues labeled `good first issue` to get started! Check the [Roadmap](./docs/ROADMAP.md#contributing) for contribution opportunities.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is private and proprietary.

## 💬 Support & Community

### Getting Help

- **📖 Documentation**: Start with the [docs](./docs/) directory
- **🐛 Bug Reports**: [Create an issue](https://github.com/DavidBudzik/design-system-tokens_UI_components/issues/new)
- **💡 Feature Requests**: [Create an issue](https://github.com/DavidBudzik/design-system-tokens_UI_components/issues/new)
- **❓ Questions**: Check [Troubleshooting](./docs/TROUBLESHOOTING.md) or open a discussion

### Quick Help Resources

- **Setup Issues?** → [Getting Started Guide](./docs/GETTING_STARTED.md)
- **Build Failures?** → [Troubleshooting Guide](./docs/TROUBLESHOOTING.md)
- **Development Questions?** → [Guidelines](./docs/GUIDELINES.md)
- **Want to Contribute?** → [Contributing Guide](./docs/CONTRIBUTING.md)

## 🗺️ Roadmap

See the [Project Roadmap](./docs/ROADMAP.md) for detailed information about current status and future plans.

### Upcoming Features

- Token search and filtering
- Component code snippets
- Export history tracking
- Token comparison tool
- Component playground with live editing
- Storybook integration
- Component documentation generator

### Recently Completed ✅

- Full TypeScript configuration
- Comprehensive testing infrastructure
- Accessibility testing with axe-core
- Bundle optimization and analysis
- Error boundaries
- Code splitting
- GitHub Actions CI/CD
- Comprehensive documentation

---

<div align="center">

## 📚 Documentation

**Complete documentation is available in the [`/docs`](./docs/) directory**

| Document | Description |
|----------|-------------|
| [📖 Getting Started](./docs/GETTING_STARTED.md) | Step-by-step setup and installation |
| [🏗️ Architecture](./docs/ARCHITECTURE.md) | Technical architecture and system design |
| [📋 Guidelines](./docs/GUIDELINES.md) | Development best practices and standards |
| [🤝 Contributing](./docs/CONTRIBUTING.md) | How to contribute to the project |
| [🛠️ Troubleshooting](./docs/TROUBLESHOOTING.md) | Common issues and solutions |
| [🗺️ Roadmap](./docs/ROADMAP.md) | Project status and future plans |

</div>

---

<div align="center">

**Built with ❤️ using React, TypeScript, and modern web technologies**

[⬆ Back to Top](#design-book---tokens--ui-components)

</div>
