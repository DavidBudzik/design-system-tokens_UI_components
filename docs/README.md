# Design Book Documentation

Welcome to the comprehensive documentation for Design Book - a design system documentation and token management web application.

## 📚 Documentation Index

### Getting Started
- **[Getting Started Guide](./GETTING_STARTED.md)** - Step-by-step setup and installation instructions
- **[Architecture Overview](./ARCHITECTURE.md)** - Technical architecture and system design
- **[Contributing Guide](./CONTRIBUTING.md)** - How to contribute to the project

### Development Guides
- **[Development Guidelines](./GUIDELINES.md)** - Code style, best practices, and standards
- **[Troubleshooting Guide](./TROUBLESHOOTING.md)** - Common issues and solutions
- **[Project Roadmap](./ROADMAP.md)** - Current status and future plans

### Quick Links
- [Main README](../README.md) - Project overview and quick start
- [Live Demo](https://davidbudzik.github.io/design-system-tokens_UI_components/) - GitHub Pages deployment
- [Figma Design System](https://www.figma.com/design/UwgyI4j4KDwMU8U4EiCg0p/Able_Design-System-Tokens) - Original design source

## 🎯 What is Design Book?

Design Book is a comprehensive design system documentation and token management web application built with React, TypeScript, and Vite. It bridges the gap between design (Figma) and development by providing:

- **Design Tokens**: Comprehensive color, typography, spacing, and border tokens
- **UI Components**: 60+ accessible React components built on Radix UI
- **Multi-Format Export**: Export design tokens in 10+ formats (CSS, SCSS, JSON, Swift, Kotlin, etc.)
- **Theme Support**: Full light/dark mode with real-time switching
- **Interactive Showcase**: Live component demonstrations and previews

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

For detailed setup instructions, see the [Getting Started Guide](./GETTING_STARTED.md).

## 📖 Key Features

### Design Token System
- 12 color categories with 40+ complementary colors
- 34 typography styles
- 11 spacing values
- 8 border radius values
- 6 border width values
- Real-time theme switching
- Multi-format export capabilities

### Component Library
- 60+ shadcn/ui components
- Built on Radix UI primitives
- WCAG-compliant accessibility
- Responsive and mobile-first
- Full TypeScript support

### Developer Experience
- TypeScript for type safety
- ESLint + Prettier for code quality
- Vitest + React Testing Library
- Bundle analysis and optimization
- Error boundaries
- Code splitting

## 🏗️ Project Structure

```
design-system-tokens_UI_components/
├── docs/                    # Documentation (you are here!)
│   ├── README.md
│   ├── GETTING_STARTED.md
│   ├── ARCHITECTURE.md
│   ├── GUIDELINES.md
│   ├── TROUBLESHOOTING.md
│   ├── ROADMAP.md
│   ├── CONTRIBUTING.md
│   └── images/
├── src/
│   ├── components/          # React components
│   ├── data/                # Design system data
│   ├── utils/               # Utility functions
│   ├── styles/              # Global styles
│   └── test/                # Tests
├── .github/workflows/       # CI/CD
└── public/                  # Static assets
```

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](./CONTRIBUTING.md) to learn about:

- Code of conduct
- Development workflow
- Branch naming conventions
- Commit message guidelines
- Pull request process
- Testing requirements

## 📝 Documentation Standards

All documentation in this repository follows these standards:

1. **Markdown Format**: All docs use GitHub-flavored markdown
2. **Clear Hierarchy**: Use proper heading levels (H1 → H2 → H3)
3. **Code Blocks**: Include language identifiers for syntax highlighting
4. **Relative Links**: Use relative paths for internal references
5. **Up-to-date**: Keep documentation synchronized with code changes

## 🔍 Need Help?

- **Setup Issues**: Check [Troubleshooting Guide](./TROUBLESHOOTING.md)
- **Development Questions**: See [Guidelines](./GUIDELINES.md)
- **Architecture Questions**: Read [Architecture Overview](./ARCHITECTURE.md)
- **Contributing**: Review [Contributing Guide](./CONTRIBUTING.md)

## 📄 License

This project is private and proprietary.

---

**Last Updated**: December 2025
