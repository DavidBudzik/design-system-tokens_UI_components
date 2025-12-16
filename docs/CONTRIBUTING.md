# Contributing to Design Book

Thank you for your interest in contributing to Design Book! This guide will help you get started with contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Review Guidelines](#code-review-guidelines)
- [Testing Requirements](#testing-requirements)
- [Documentation Requirements](#documentation-requirements)
- [Style Guide](#style-guide)
- [Community](#community)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone. We expect all contributors to:

- **Be Respectful**: Treat everyone with respect and consideration
- **Be Collaborative**: Work together constructively
- **Be Professional**: Focus on what is best for the project
- **Be Inclusive**: Welcome diverse perspectives and experiences

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Personal attacks or trolling
- Publishing others' private information
- Any conduct that would be inappropriate in a professional setting

### Reporting

If you experience or witness unacceptable behavior, please report it to the project maintainers.

## How to Contribute

There are many ways to contribute to Design Book:

### 1. Report Bugs 🐛

Found a bug? Please report it!

**Before Creating an Issue:**
- Search existing issues to avoid duplicates
- Check if it's already fixed in the latest version
- Try to reproduce the bug in a clean environment

**Creating a Bug Report:**
1. Use the bug report template
2. Provide a clear, descriptive title
3. Include:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Environment (OS, browser, Node version)
   - Error messages and stack traces

**Example Bug Report:**
```markdown
**Description**: Theme toggle doesn't work on Safari

**Steps to Reproduce**:
1. Open app in Safari
2. Click theme toggle button
3. Theme doesn't change

**Expected**: Theme should switch to dark mode
**Actual**: Theme remains in light mode

**Environment**:
- OS: macOS 14.0
- Browser: Safari 17.0
- Node: v20.10.0

**Screenshots**: [attached]
```

### 2. Suggest Features 💡

Have an idea? We'd love to hear it!

**Before Creating a Feature Request:**
- Check the [Roadmap](./ROADMAP.md) - it might already be planned
- Search existing issues for similar requests
- Consider if it fits the project's scope

**Creating a Feature Request:**
1. Use the feature request template
2. Provide a clear, descriptive title
3. Include:
   - Problem you're trying to solve
   - Proposed solution
   - Alternative solutions considered
   - Mockups or examples (if applicable)
   - Use cases

### 3. Improve Documentation 📚

Documentation improvements are always welcome!

**Documentation Needs:**
- Fix typos or unclear explanations
- Add missing information
- Create tutorials or guides
- Add code examples
- Improve README or other docs

**Where to Contribute:**
- [README.md](../README.md) - Project overview
- [docs/GETTING_STARTED.md](./GETTING_STARTED.md) - Setup guide
- [docs/ARCHITECTURE.md](./ARCHITECTURE.md) - Technical architecture
- [docs/GUIDELINES.md](./GUIDELINES.md) - Development guidelines
- [docs/TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues
- Code comments - Inline documentation

### 4. Write Code 💻

Ready to contribute code? Great!

**Good First Issues:**
- Look for issues labeled `good first issue`
- Start with small, focused changes
- Ask questions if anything is unclear

**Areas to Contribute:**
- Bug fixes
- New features from the roadmap
- Performance improvements
- Accessibility enhancements
- Test coverage
- Refactoring

## Development Workflow

### 1. Set Up Your Development Environment

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/design-system-tokens_UI_components.git
cd design-system-tokens_UI_components

# Add upstream remote
git remote add upstream https://github.com/DavidBudzik/design-system-tokens_UI_components.git

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Create a Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes

- Write clear, focused code
- Follow the [Style Guide](#style-guide)
- Add tests for new functionality
- Update documentation as needed
- Commit regularly with clear messages

### 4. Test Your Changes

```bash
# Run all tests
npm test

# Run linter
npm run lint

# Run type checker
npm run type-check

# Run formatter
npm run format

# Build to ensure no build errors
npm run build
```

### 5. Push and Create Pull Request

```bash
# Push your branch
git push origin feature/your-feature-name

# Go to GitHub and create a Pull Request
```

## Branch Naming Conventions

Use descriptive branch names that indicate the type of work:

### Branch Prefixes

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks
- `perf/` - Performance improvements
- `style/` - Code style changes (formatting, etc.)

### Examples

```bash
feature/token-search
fix/export-button-crash
docs/update-readme
refactor/extract-export-logic
test/add-token-tests
chore/update-dependencies
perf/optimize-rendering
style/fix-formatting
```

### Branch Naming Best Practices

- Use lowercase and hyphens
- Be descriptive but concise
- Include issue number if applicable: `feature/123-token-search`
- Use present tense: `add` not `added`

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style (formatting, missing semicolons, etc.)
- `refactor` - Code refactoring (no feature changes)
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `ci` - CI/CD changes
- `build` - Build system changes

### Scope (Optional)

The scope specifies what is being changed:
- `tokens` - Design tokens
- `components` - UI components
- `export` - Export functionality
- `theme` - Theme system
- `a11y` - Accessibility
- `deps` - Dependencies

### Subject

- Use imperative mood: "add" not "added" or "adds"
- Don't capitalize first letter
- No period at the end
- Keep under 50 characters

### Body (Optional)

- Explain what and why, not how
- Wrap at 72 characters
- Separate from subject with blank line

### Footer (Optional)

- Reference issues: `Closes #123`
- Breaking changes: `BREAKING CHANGE: description`

### Examples

**Simple commit:**
```
feat(tokens): add complementary color tokens
```

**With body:**
```
fix(export): correct CSS variable formatting

The CSS export was missing the '--' prefix for variable names.
This fix ensures all exported CSS variables are valid.

Closes #45
```

**Breaking change:**
```
refactor(tokens)!: change token naming convention

BREAKING CHANGE: Token names now use kebab-case instead of camelCase.
Update all token references in your code.

Migration guide: docs/MIGRATION.md
```

## Pull Request Process

### Before Submitting

- [ ] Code follows the [Style Guide](#style-guide)
- [ ] Tests are passing (`npm test`)
- [ ] Linter is passing (`npm run lint`)
- [ ] Type checker is passing (`npm run type-check`)
- [ ] Code is formatted (`npm run format`)
- [ ] Build succeeds (`npm run build`)
- [ ] Documentation is updated (if needed)
- [ ] Self-review completed

### PR Template

Use this template for your pull request:

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Related Issues
Closes #123

## Changes Made
- Added token search functionality
- Updated TypeScript types
- Added tests for search feature

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Tested in multiple browsers (Chrome, Firefox, Safari)
- [ ] Tested in light and dark themes
- [ ] Tested on mobile devices

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally
- [ ] Any dependent changes have been merged

## Additional Notes
Any additional information or context.
```

### PR Review Process

1. **Automated Checks**: CI/CD runs tests and linters
2. **Code Review**: Maintainers review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, PR can be merged
5. **Merge**: Maintainer merges your PR

### PR Best Practices

- Keep PRs focused and small (< 400 lines if possible)
- One feature/fix per PR
- Respond to feedback promptly
- Keep PR up to date with main branch
- Be patient and respectful

## Code Review Guidelines

### For Authors

**Preparing for Review:**
- Add clear PR description
- Include context and reasoning
- Highlight areas needing special attention
- Add screenshots for UI changes
- Respond to feedback constructively

**Addressing Feedback:**
- Ask questions if feedback is unclear
- Make requested changes in new commits
- Explain your reasoning if you disagree
- Thank reviewers for their time

### For Reviewers

**What to Look For:**
- Correctness: Does it work as intended?
- Testing: Are there adequate tests?
- Performance: Any performance concerns?
- Security: Any security issues?
- Accessibility: Is it accessible?
- Maintainability: Is it readable and maintainable?
- Documentation: Is it documented?

**Review Feedback:**
- Be constructive and specific
- Explain the "why" behind suggestions
- Distinguish between "must fix" and "nice to have"
- Praise good work
- Use clear language

## Testing Requirements

All code contributions should include appropriate tests.

### When to Add Tests

- **Always**: New features
- **Always**: Bug fixes
- **Sometimes**: Refactoring (if changing behavior)
- **Rarely**: Documentation-only changes

### Types of Tests

#### Unit Tests

Test individual functions and components:

```typescript
import { describe, it, expect } from 'vitest';
import { formatTokenName } from './utils';

describe('formatTokenName', () => {
  it('converts camelCase to kebab-case', () => {
    expect(formatTokenName('primaryColor')).toBe('primary-color');
  });

  it('handles already formatted names', () => {
    expect(formatTokenName('primary-color')).toBe('primary-color');
  });
});
```

#### Component Tests

Test React components:

```typescript
import { render, screen } from '@testing-library/react';
import { ColorToken } from './ColorToken';

describe('ColorToken', () => {
  it('renders token name', () => {
    render(<ColorToken name="primary" value="#FF0000" />);
    expect(screen.getByText('primary')).toBeInTheDocument();
  });
});
```

#### Accessibility Tests

Test accessibility:

```typescript
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';

it('has no accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Test Coverage

- Aim for **70%+ coverage** for new code
- 100% coverage for critical paths
- Don't sacrifice quality for coverage numbers

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# With coverage
npm run test:coverage

# Specific file
npm test -- ColorToken.test.tsx
```

## Documentation Requirements

### When to Update Documentation

- **Always**: New features
- **Always**: Breaking changes
- **Always**: New public APIs
- **Sometimes**: Bug fixes (if behavior changes)
- **Sometimes**: Refactoring (if API changes)

### What to Document

#### Code Comments

Add comments for:
- Complex logic
- Non-obvious decisions
- TODOs and FIXMEs
- Public APIs

```typescript
/**
 * Exports design tokens in the specified format.
 * 
 * @param tokens - Array of design tokens to export
 * @param format - Target export format (css, scss, json, etc.)
 * @returns Formatted string ready for download
 * 
 * @example
 * ```typescript
 * const cssOutput = exportTokens(tokens, 'css');
 * downloadFile(cssOutput, 'tokens.css');
 * ```
 */
export function exportTokens(tokens: Token[], format: ExportFormat): string {
  // Implementation
}
```

#### README Updates

Update README if:
- Adding new features
- Changing setup process
- Adding new scripts
- Changing architecture

#### Doc Files

Update relevant docs:
- `docs/GETTING_STARTED.md` - Setup changes
- `docs/ARCHITECTURE.md` - Architecture changes
- `docs/GUIDELINES.md` - Development practice changes
- `docs/TROUBLESHOOTING.md` - New issues/solutions
- `docs/ROADMAP.md` - Feature completion

## Style Guide

### General Principles

- **Clarity over Cleverness**: Write code that's easy to understand
- **Consistency**: Follow existing patterns
- **Simplicity**: Keep it simple (KISS principle)
- **DRY**: Don't repeat yourself

### TypeScript

```typescript
// ✅ Good - Explicit types
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ Bad - Implicit any
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

### React Components

```typescript
// ✅ Good - Functional component with types
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button className={`btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  );
}

// ❌ Bad - No types, unclear props
export function Button(props) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

### Naming

```typescript
// ✅ Good naming
const userEmailAddress = 'user@example.com';
const isAuthenticated = true;
const handleSubmitForm = () => {};

// ❌ Bad naming
const e = 'user@example.com';  // Too short
const flag = true;              // Unclear
const func = () => {};          // Generic
```

### File Organization

```
ComponentName/
├── ComponentName.tsx       # Main component
├── ComponentName.test.tsx  # Tests
├── ComponentName.styles.ts # Styles (if needed)
├── index.ts                # Barrel export
└── types.ts                # Type definitions (if complex)
```

### Import Order

```typescript
// 1. External dependencies
import React from 'react';
import { useState } from 'react';

// 2. Internal dependencies (absolute imports)
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/date';

// 3. Relative imports
import { TokenCard } from './TokenCard';
import { useTokens } from './useTokens';

// 4. Types
import type { Token } from '@/types';

// 5. Styles
import './styles.css';
```

### Code Formatting

We use Prettier for automatic formatting:

```bash
npm run format
```

**Settings:**
- 2 spaces for indentation
- Single quotes
- Semicolons
- Trailing commas

## Community

### Getting Help

- **Questions**: Open a GitHub Discussion
- **Issues**: Search existing issues first
- **Chat**: [Link to community chat if available]

### Staying Updated

- **Watch**: Star and watch the repository
- **Releases**: Subscribe to release notifications
- **Roadmap**: Check the [Roadmap](./ROADMAP.md) regularly

### Recognition

Contributors are recognized:
- In release notes
- In the project README
- Through GitHub's contributor graph

## Additional Resources

- [Getting Started Guide](./GETTING_STARTED.md)
- [Architecture Overview](./ARCHITECTURE.md)
- [Development Guidelines](./GUIDELINES.md)
- [Troubleshooting Guide](./TROUBLESHOOTING.md)
- [Project Roadmap](./ROADMAP.md)

---

## Thank You! 🎉

Thank you for contributing to Design Book! Every contribution, no matter how small, helps make this project better for everyone.

**Questions?** Feel free to ask in GitHub Discussions or create an issue.

---

**Last Updated**: December 2025
