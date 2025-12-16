# Getting Started with Design Book

This guide will help you set up Design Book on your local machine for development and testing purposes.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Development Workflow](#development-workflow)
- [IDE Setup](#ide-setup)
- [Common Setup Issues](#common-setup-issues)
- [Next Steps](#next-steps)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

- **Node.js**: Version 20.x or higher
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
  
- **npm**: Version 10.x or higher (comes with Node.js)
  - Verify installation: `npm --version`
  - Alternative: You can use `yarn` or `pnpm` if preferred

### System Requirements

- **Operating System**: macOS, Linux, or Windows 10/11
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: At least 500MB free space for dependencies
- **Browser**: Modern browser (Chrome, Firefox, Safari, or Edge - latest version)

### Optional Tools

- **Git**: For version control
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

## Installation

### Step 1: Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/DavidBudzik/design-system-tokens_UI_components.git

# Or using SSH
git clone git@github.com:DavidBudzik/design-system-tokens_UI_components.git

# Navigate to project directory
cd design-system-tokens_UI_components
```

### Step 2: Install Dependencies

```bash
# Install all project dependencies
npm install

# This will install:
# - React and React DOM
# - TypeScript and type definitions
# - Vite build tool
# - Radix UI components
# - Tailwind CSS
# - Testing libraries
# - Linting and formatting tools
# - And more...
```

**Note**: The installation may take 2-5 minutes depending on your internet connection.

### Step 3: Verify Installation

```bash
# Check if TypeScript compiles correctly
npm run type-check

# Expected output: No errors
```

## Environment Setup

### No Environment Variables Required

This project doesn't require any environment variables for local development. All configuration is handled through:

- `vite.config.ts` - Build configuration
- `tailwind.config.js` - Styling configuration
- `tsconfig.json` - TypeScript configuration

## Running the Application

### Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will automatically open in your default browser at:
- **URL**: `http://localhost:3000`

You should see the Design Book homepage with:
- Navigation menu (Tokens, Components, Export, Guidelines)
- Theme toggle (light/dark mode)
- Design tokens display

### Production Build

Build the application for production:

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

The preview server will start at `http://localhost:4173`

## Development Workflow

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix ESLint errors
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run type-check       # Run TypeScript compiler

# Testing
npm test                 # Run tests
npm run test:ui          # Run tests with UI
npm run test:coverage    # Generate coverage report

# Analysis
npm run analyze          # Analyze bundle size
```

### Basic Workflow

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Make Changes**
   - Edit files in the `src/` directory
   - Changes automatically reload in the browser

3. **Check Code Quality**
   ```bash
   npm run lint
   npm run type-check
   ```

4. **Run Tests**
   ```bash
   npm test
   ```

5. **Format Code**
   ```bash
   npm run format
   ```

## IDE Setup

### Visual Studio Code (Recommended)

#### Required Extensions

Install these extensions for the best development experience:

1. **ESLint** (`dbaeumer.vscode-eslint`)
   - Provides inline linting feedback

2. **Prettier** (`esbenp.prettier-vscode`)
   - Code formatting on save

3. **TypeScript** (built-in)
   - IntelliSense and type checking

#### Recommended Extensions

4. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
   - Autocomplete for Tailwind classes

5. **Auto Rename Tag** (`formulahendry.auto-rename-tag`)
   - Automatically rename paired HTML/JSX tags

6. **ES7+ React Snippets** (`dsznajder.es7-react-js-snippets`)
   - React code snippets

#### VS Code Settings

Create or update `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

### WebStorm / IntelliJ IDEA

1. Enable Prettier integration:
   - Settings → Languages & Frameworks → JavaScript → Prettier
   - Check "On save"

2. Enable ESLint:
   - Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint
   - Select "Automatic ESLint configuration"

3. Configure TypeScript:
   - Settings → Languages & Frameworks → TypeScript
   - TypeScript version: Project's TypeScript

## Common Setup Issues

### Issue: Port 3000 Already in Use

**Error**: `Port 3000 is already in use`

**Solution**:
```bash
# Option 1: Kill the process using port 3000
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Option 2: Use a different port
# Edit vite.config.ts and change server.port
```

### Issue: Module Not Found

**Error**: `Cannot find module '@/components/...'`

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript Errors

**Error**: Various TypeScript compilation errors

**Solution**:
```bash
# Clear TypeScript cache
rm -rf node_modules/.vite
npm run type-check
```

### Issue: Prettier Conflicts with ESLint

**Error**: Formatting conflicts between Prettier and ESLint

**Solution**:
```bash
# Run both in order
npm run format
npm run lint:fix
```

### Issue: Build Fails

**Error**: Build fails with memory errors

**Solution**:
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Issue: Dependencies Version Conflicts

**Error**: Peer dependency warnings or version conflicts

**Solution**:
```bash
# Use --legacy-peer-deps flag
npm install --legacy-peer-deps

# Or update to latest compatible versions
npm update
```

## Next Steps

Now that you have Design Book running locally, here's what to do next:

### 1. Explore the Application

- **Tokens Page**: View design tokens (colors, typography, spacing, borders)
- **Components Page**: Browse 60+ UI components
- **Export Functionality**: Try exporting tokens in different formats
- **Theme Toggle**: Switch between light and dark modes

### 2. Review Documentation

- **[Architecture](./ARCHITECTURE.md)**: Understand the technical architecture
- **[Guidelines](./GUIDELINES.md)**: Learn development best practices
- **[Contributing](./CONTRIBUTING.md)**: How to contribute code

### 3. Start Contributing

- Pick an issue from the [GitHub Issues](https://github.com/DavidBudzik/design-system-tokens_UI_components/issues)
- Read the [Contributing Guide](./CONTRIBUTING.md)
- Make your first pull request!

### 4. Join the Community

- Ask questions in discussions
- Report bugs via GitHub Issues
- Share feedback and suggestions

## Additional Resources

- **[Vite Documentation](https://vitejs.dev/)** - Build tool
- **[React Documentation](https://react.dev/)** - React framework
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[Radix UI](https://www.radix-ui.com/)** - UI component library
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - TypeScript guide

## Getting Help

If you encounter issues not covered in this guide:

1. Check the [Troubleshooting Guide](./TROUBLESHOOTING.md)
2. Search [GitHub Issues](https://github.com/DavidBudzik/design-system-tokens_UI_components/issues)
3. Create a new issue with details about your problem
4. Include:
   - Operating system and version
   - Node.js and npm versions
   - Error messages and stack traces
   - Steps to reproduce

---

**Happy Coding!** 🚀

Ready to dive deeper? Check out the [Architecture Overview](./ARCHITECTURE.md) next.
