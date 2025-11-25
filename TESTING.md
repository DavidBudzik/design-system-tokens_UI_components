# Testing Guide

## Overview

This document explains the testing strategy, how to run tests, and how to write new tests for the Able Design System project.

## Table of Contents

- [Quick Start](#quick-start)
- [Testing Stack](#testing-stack)
- [Test Structure](#test-structure)
- [Running Tests](#running-tests)
- [Code Coverage](#code-coverage)
- [Writing Tests](#writing-tests)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

### Install Dependencies

```bash
npm install
```

### Run All Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Run Pre-Production Checks

```bash
npm run pre-production
```

This runs: type checking, linting, format checking, tests with coverage, and build.

---

## Testing Stack

### Core Testing Tools

- **Vitest** (v1.1.0) - Fast unit test framework (Vite-native)
- **React Testing Library** (v14.1.2) - Component testing utilities
- **@testing-library/user-event** (v14.5.1) - User interaction simulation
- **@testing-library/jest-dom** (v6.1.5) - Custom DOM matchers
- **axe-core** (v4.8.3) - Accessibility testing
- **jsdom** (v23.0.1) - DOM implementation for Node.js

### Coverage Provider

- **@vitest/coverage-v8** (v1.1.0) - Code coverage using V8

---

## Test Structure

```
src/
├── components/
│   ├── __tests__/
│   │   ├── ThemeToggle.test.tsx         # Theme toggle component tests
│   │   ├── ColorToken.test.tsx          # Color token display tests
│   │   └── ErrorBoundary.test.tsx       # Error boundary tests
│   └── ...
├── utils/
│   ├── __tests__/
│   │   ├── exportFormats.test.ts        # Export functionality tests (10+ formats)
│   │   └── clipboard.test.ts            # Clipboard utility tests
│   └── ...
├── test/
│   ├── setup.ts                          # Test environment setup
│   ├── example.test.tsx                  # Example tests
│   ├── a11y.test.tsx                     # Basic accessibility tests
│   └── accessibility.test.tsx            # Comprehensive accessibility tests
└── ...
```

---

## Running Tests

### Basic Commands

#### Watch Mode (Interactive)

```bash
npm test
```

Runs tests in watch mode. Tests re-run automatically when files change.

#### Run Once (CI Mode)

```bash
npm run test:run
```

Runs all tests once and exits. Used in CI/CD pipelines.

#### Interactive UI

```bash
npm run test:ui
```

Opens Vitest's web-based UI for exploring tests and coverage.

### Coverage Commands

#### Generate Coverage Report

```bash
npm run test:coverage
```

Runs tests and generates coverage reports in multiple formats:

- **Console output**: Text summary in terminal
- **HTML report**: Open `coverage/index.html` in browser
- **JSON report**: `coverage/coverage-final.json`
- **LCOV report**: `coverage/lcov.info`

#### View Coverage in UI

```bash
npm run test:coverage:ui
```

Opens Vitest UI with coverage visualization.

### Quality Check Commands

#### Type Check

```bash
npm run type-check
```

Runs TypeScript compiler without emitting files. Catches type errors.

#### Lint

```bash
npm run lint
```

Runs ESLint to check code quality and style.

#### Format Check

```bash
npm run format:check
```

Verifies code is formatted according to Prettier rules.

#### Complete Pre-Production Check

```bash
npm run pre-production
```

Runs all quality checks in sequence:

1. Type checking
2. Linting
3. Format checking
4. Tests with coverage
5. Production build

**This command should pass before deploying to production.**

---

## Code Coverage

### Coverage Configuration

Located in `vitest.config.ts`:

```typescript
coverage: {
  provider: 'v8',
  reporter: ['text', 'json', 'html', 'lcov'],
  include: ['src/**/*.{ts,tsx}'],
  exclude: [
    'src/**/*.test.{ts,tsx}',
    'src/**/*.spec.{ts,tsx}',
    'src/test/**',
    'src/main.tsx',
    'src/vite-env.d.ts',
    'src/components/ui/**', // UI library components (shadcn/ui)
  ],
  thresholds: {
    lines: 60,
    functions: 60,
    branches: 60,
    statements: 60,
  },
  all: true,
}
```

### Coverage Thresholds

- **Lines**: 60% minimum
- **Functions**: 60% minimum
- **Branches**: 60% minimum
- **Statements**: 60% minimum

**Note**: UI library components (`src/components/ui/**`) are excluded from coverage as they come from shadcn/ui.

### Viewing Coverage Reports

#### Terminal Output

After running `npm run test:coverage`, see summary in terminal.

#### HTML Report

```bash
npm run test:coverage
open coverage/index.html  # macOS
xdg-open coverage/index.html  # Linux
start coverage/index.html  # Windows
```

#### CI/CD Integration

Coverage reports are automatically uploaded to Codecov in GitHub Actions.

---

## Writing Tests

### Test File Naming

- Component tests: `ComponentName.test.tsx`
- Utility tests: `utilityName.test.ts`
- Place in `__tests__` folder next to source files

### Basic Test Template

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<MyComponent />);
      expect(screen.getByText('Expected Text')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should handle click events', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(<MyComponent onClick={onClick} />);

      await user.click(screen.getByRole('button'));

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
```

### Component Testing Best Practices

#### 1. Test User Behavior, Not Implementation

```typescript
// ✅ Good - tests what user sees/does
it('should toggle theme when button is clicked', async () => {
  const user = userEvent.setup();
  render(<ThemeToggle theme="light" onToggle={onToggle} />);

  await user.click(screen.getByRole('button'));

  expect(onToggle).toHaveBeenCalled();
});

// ❌ Bad - tests implementation details
it('should update state when handleClick is called', () => {
  const wrapper = shallow(<ThemeToggle />);
  wrapper.instance().handleClick();
  expect(wrapper.state('clicked')).toBe(true);
});
```

#### 2. Use Accessible Queries

Prefer queries that reflect how users interact with your app:

```typescript
// ✅ Best - accessible to everyone
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText(/email/i);
screen.getByText(/welcome/i);

// ⚠️ Okay - useful for non-semantic elements
screen.getByTestId('custom-element');

// ❌ Avoid - fragile and inaccessible
screen.getByClassName('btn-primary');
container.querySelector('.submit-button');
```

#### 3. Test Accessibility

```typescript
import { runA11yTests } from '../utils/a11y';

it('should have no accessibility violations', async () => {
  const { container } = render(<MyComponent />);

  const violations = await runA11yTests(container);
  expect(violations).toHaveLength(0);
});
```

#### 4. Mock External Dependencies

```typescript
// Mock API calls
vi.mock('../api/users', () => ({
  fetchUsers: vi.fn(() => Promise.resolve([{ id: 1, name: 'Test' }])),
}));

// Mock child components
vi.mock('../ComplexChild', () => ({
  ComplexChild: () => <div>Mocked Child</div>,
}));
```

#### 5. Clean Up After Tests

```typescript
import { describe, it, beforeEach, afterEach } from 'vitest';

describe('MyComponent', () => {
  beforeEach(() => {
    // Setup before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Cleanup after each test
    vi.clearAllMocks();
  });
});
```

### Utility Function Testing

```typescript
import { describe, it, expect } from 'vitest';
import { myUtilityFunction } from '../myUtility';

describe('myUtilityFunction', () => {
  it('should handle normal input', () => {
    expect(myUtilityFunction('input')).toBe('expected output');
  });

  it('should handle edge cases', () => {
    expect(myUtilityFunction('')).toBe('');
    expect(myUtilityFunction(null)).toBe(null);
  });

  it('should throw error for invalid input', () => {
    expect(() => myUtilityFunction(undefined)).toThrow('Invalid input');
  });
});
```

### Async Testing

```typescript
it('should handle async operations', async () => {
  const promise = fetchData();

  await expect(promise).resolves.toBe('data');
});

it('should handle async errors', async () => {
  const promise = fetchDataThatFails();

  await expect(promise).rejects.toThrow('Error message');
});
```

---

## CI/CD Integration

### GitHub Actions Workflow

Tests run automatically on every push to `main` branch:

```yaml
- name: Install dependencies
  run: npm ci

- name: Type check
  run: npm run type-check

- name: Lint code
  run: npm run lint

- name: Check code formatting
  run: npm run format:check

- name: Run tests with coverage
  run: npm run test:coverage

- name: Upload coverage reports to Codecov
  uses: codecov/codecov-action@v4
  with:
    files: ./coverage/coverage-final.json

- name: Build
  run: npm run build
```

### Deployment Gates

Deployment to production **will not proceed** if:

- ✗ Type checking fails
- ✗ Linting fails
- ✗ Code formatting is incorrect
- ✗ Any tests fail
- ✗ Coverage thresholds are not met
- ✗ Build fails

---

## Troubleshooting

### Common Issues

#### Tests Fail in CI but Pass Locally

**Problem**: Different Node.js versions or missing dependencies.

**Solution**:

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Run tests in CI mode
npm run test:run
```

#### Coverage Threshold Failures

**Problem**: Coverage falls below 60%.

**Solution**: Add tests for uncovered code or adjust thresholds in `vitest.config.ts`.

```bash
# See what's not covered
npm run test:coverage
open coverage/index.html
```

#### Mock Not Working

**Problem**: Mock doesn't apply or returns undefined.

**Solution**:

```typescript
// Use vi.mock at the top level (before imports)
vi.mock('../module');

import { module } from '../module';

// Or use doMock for runtime mocking
vi.doMock('../module', () => ({
  default: vi.fn(),
}));
```

#### Accessibility Test Failures

**Problem**: axe-core detects violations.

**Solution**: Fix the violations or suppress false positives:

```typescript
const violations = await runA11yTests(container);
const realViolations = violations.filter((v) => v.id !== 'known-false-positive');
expect(realViolations).toHaveLength(0);
```

#### Test Timeout Errors

**Problem**: Tests take too long and timeout.

**Solution**:

```typescript
it('should handle slow operation', async () => {
  // Increase timeout for this test
  expect(await slowOperation()).toBe('result');
}, 10000); // 10 second timeout
```

Or configure globally in `vitest.config.ts`:

```typescript
test: {
  testTimeout: 10000,
}
```

---

## Test Coverage Goals

### Current Coverage

Run `npm run test:coverage` to see current coverage.

### Priority Areas for Testing

1. **Export Functionality** (CRITICAL)
   - All 10+ export formats must work correctly
   - Test file: `src/utils/__tests__/exportFormats.test.ts`

2. **Token Display** (HIGH)
   - Color accuracy in light/dark modes
   - Test file: `src/components/__tests__/ColorToken.test.tsx`

3. **Theme Switching** (HIGH)
   - Light/dark mode toggle
   - Test file: `src/components/__tests__/ThemeToggle.test.tsx`

4. **Error Handling** (HIGH)
   - Graceful error boundaries
   - Test file: `src/components/__tests__/ErrorBoundary.test.tsx`

5. **Accessibility** (HIGH)
   - WCAG 2.1 AA compliance
   - Test file: `src/test/accessibility.test.tsx`

6. **Clipboard Operations** (MEDIUM)
   - Copy-to-clipboard functionality
   - Test file: `src/utils/__tests__/clipboard.test.ts`

### Future Testing Additions

- **Integration Tests**: Full user flows (export → copy → paste)
- **E2E Tests**: Playwright or Cypress for browser testing
- **Visual Regression**: Screenshot comparison for design tokens
- **Performance Tests**: Bundle size and load time monitoring

---

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)

---

## Questions?

If you encounter issues not covered here, check:

1. Existing tests for examples
2. Vitest documentation
3. React Testing Library docs
4. Create an issue in the project repository

---

**Remember**: Tests are documentation. Write tests that explain what your code does and why it matters.
