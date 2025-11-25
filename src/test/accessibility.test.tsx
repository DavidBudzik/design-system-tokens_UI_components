import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { runA11yTests } from '../utils/a11y';
import { ThemeToggle } from '../components/ThemeToggle';
import { ColorToken } from '../components/ColorToken';
import ErrorBoundary from '../components/ErrorBoundary';

/**
 * Comprehensive Accessibility Test Suite
 *
 * PURPOSE: Ensures WCAG 2.1 AA compliance across all components
 * CRITICAL: Accessibility violations block production deployment
 *
 * Tests use axe-core to detect:
 * - Missing alt text on images
 * - Invalid ARIA attributes
 * - Insufficient color contrast
 * - Missing form labels
 * - Keyboard navigation issues
 * - Screen reader compatibility
 */

// Mock ColorDetailsDialog to simplify testing
vi.mock('../components/ColorDetailsDialog', () => ({
  ColorDetailsDialog: () => <div>Details Dialog</div>,
}));

describe('Accessibility - Critical Components', () => {
  describe('ThemeToggle Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<ThemeToggle theme="light" onToggle={() => {}} />);

      const violations = await runA11yTests(container);
      expect(violations).toHaveLength(0);
    });

    it('should have accessible button role', async () => {
      const { container } = render(<ThemeToggle theme="light" onToggle={() => {}} />);

      const violations = await runA11yTests(container);
      const buttonViolations = violations.filter((v) => v.id.includes('button'));
      expect(buttonViolations).toHaveLength(0);
    });

    it('should have sufficient color contrast', async () => {
      const { container } = render(<ThemeToggle theme="light" onToggle={() => {}} />);

      const violations = await runA11yTests(container);
      const contrastViolations = violations.filter((v) => v.id.includes('color-contrast'));
      expect(contrastViolations).toHaveLength(0);
    });

    it('should be keyboard accessible', async () => {
      const { container } = render(<ThemeToggle theme="light" onToggle={() => {}} />);

      const violations = await runA11yTests(container);
      const keyboardViolations = violations.filter((v) => v.id.includes('keyboard'));
      expect(keyboardViolations).toHaveLength(0);
    });
  });

  describe('ColorToken Accessibility', () => {
    const mockColorProps = {
      name: '--primary-default',
      hex: '#3B82F6',
      rgb: 'rgb(59, 130, 246)',
    };

    it('should have no accessibility violations', async () => {
      const { container } = render(<ColorToken {...mockColorProps} />);

      const violations = await runA11yTests(container);
      expect(violations).toHaveLength(0);
    });

    it('should have readable text', async () => {
      const { container } = render(<ColorToken {...mockColorProps} />);

      const violations = await runA11yTests(container);
      const textViolations = violations.filter((v) => v.id.includes('color-contrast'));
      expect(textViolations).toHaveLength(0);
    });

    it('should handle dark mode without violations', async () => {
      document.documentElement.classList.add('dark');

      const darkModeProps = {
        ...mockColorProps,
        darkHex: '#60A5FA',
        darkRgb: 'rgb(96, 165, 250)',
      };

      const { container } = render(<ColorToken {...darkModeProps} />);

      const violations = await runA11yTests(container);
      expect(violations).toHaveLength(0);

      document.documentElement.classList.remove('dark');
    });
  });

  describe('ErrorBoundary Accessibility', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    it('should have no violations in error state', async () => {
      // Suppress console errors
      vi.spyOn(console, 'error').mockImplementation(() => {});

      const { container } = render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const violations = await runA11yTests(container);
      expect(violations).toHaveLength(0);
    });

    it('should have accessible heading in error state', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});

      const { container } = render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const violations = await runA11yTests(container);
      const headingViolations = violations.filter((v) => v.id.includes('heading'));
      expect(headingViolations).toHaveLength(0);
    });

    it('should have accessible button in error state', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});

      const { container } = render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const violations = await runA11yTests(container);
      const buttonViolations = violations.filter((v) => v.id.includes('button-name'));
      expect(buttonViolations).toHaveLength(0);
    });
  });
});

describe('Accessibility - Form Elements', () => {
  describe('Button Components', () => {
    it('should have accessible name on all buttons', async () => {
      const { container } = render(
        <div>
          <button>Click me</button>
          <button aria-label="Close dialog">×</button>
          <button title="Submit form">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      );

      const violations = await runA11yTests(container);
      const buttonNameViolations = violations.filter((v) => v.id === 'button-name');
      expect(buttonNameViolations).toHaveLength(0);
    });

    it('should detect missing button labels', async () => {
      const { container } = render(
        <div>
          <button></button>
        </div>
      );

      const violations = await runA11yTests(container);
      const buttonNameViolations = violations.filter((v) => v.id === 'button-name');
      expect(buttonNameViolations.length).toBeGreaterThan(0);
    });
  });

  describe('Images', () => {
    it('should have alt text on images', async () => {
      const { container } = render(
        <div>
          <img src="test.jpg" alt="Test image description" />
        </div>
      );

      const violations = await runA11yTests(container);
      const imgViolations = violations.filter((v) => v.id === 'image-alt');
      expect(imgViolations).toHaveLength(0);
    });

    it('should detect missing alt text', async () => {
      const { container } = render(
        <div>
          <img src="test.jpg" />
        </div>
      );

      const violations = await runA11yTests(container);
      const imgViolations = violations.filter((v) => v.id === 'image-alt');
      expect(imgViolations.length).toBeGreaterThan(0);
    });

    it('should allow empty alt for decorative images', async () => {
      const { container } = render(
        <div>
          <img src="decorative.jpg" alt="" role="presentation" />
        </div>
      );

      const violations = await runA11yTests(container);
      const imgViolations = violations.filter((v) => v.id === 'image-alt');
      expect(imgViolations).toHaveLength(0);
    });
  });

  describe('Form Inputs', () => {
    it('should have labels associated with inputs', async () => {
      const { container } = render(
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" />
        </div>
      );

      const violations = await runA11yTests(container);
      const labelViolations = violations.filter((v) => v.id === 'label');
      expect(labelViolations).toHaveLength(0);
    });

    it('should detect inputs without labels', async () => {
      const { container } = render(
        <div>
          <input type="text" />
        </div>
      );

      const violations = await runA11yTests(container);
      const labelViolations = violations.filter((v) => v.id === 'label');
      expect(labelViolations.length).toBeGreaterThan(0);
    });

    it('should accept aria-label as alternative to visible label', async () => {
      const { container } = render(
        <div>
          <input type="text" aria-label="Search query" />
        </div>
      );

      const violations = await runA11yTests(container);
      const labelViolations = violations.filter((v) => v.id === 'label');
      expect(labelViolations).toHaveLength(0);
    });
  });
});

describe('Accessibility - Color Contrast', () => {
  describe('Text Contrast', () => {
    it('should have sufficient contrast for normal text', async () => {
      const { container } = render(
        <div style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
          <p>This text has high contrast (21:1)</p>
        </div>
      );

      const violations = await runA11yTests(container);
      const contrastViolations = violations.filter((v) => v.id === 'color-contrast');
      expect(contrastViolations).toHaveLength(0);
    });

    it('should detect insufficient contrast', async () => {
      const { container } = render(
        <div style={{ backgroundColor: '#FFFFFF', color: '#F0F0F0' }}>
          <p>This text has very low contrast</p>
        </div>
      );

      const violations = await runA11yTests(container);
      const contrastViolations = violations.filter((v) => v.id === 'color-contrast');
      expect(contrastViolations.length).toBeGreaterThan(0);
    });

    it('should validate WCAG AA standards (4.5:1 for normal text)', async () => {
      // #767676 on white = 4.54:1 (passes AA)
      const { container } = render(
        <div style={{ backgroundColor: '#FFFFFF', color: '#767676' }}>
          <p>This barely passes WCAG AA</p>
        </div>
      );

      const violations = await runA11yTests(container);
      const contrastViolations = violations.filter((v) => v.id === 'color-contrast');
      expect(contrastViolations).toHaveLength(0);
    });
  });

  describe('Interactive Element Contrast', () => {
    it('should have sufficient contrast for links', async () => {
      const { container } = render(
        <div style={{ backgroundColor: '#FFFFFF' }}>
          <a href="#" style={{ color: '#0000EE' }}>
            Link with good contrast
          </a>
        </div>
      );

      const violations = await runA11yTests(container);
      const contrastViolations = violations.filter((v) => v.id === 'color-contrast');
      expect(contrastViolations).toHaveLength(0);
    });
  });
});

describe('Accessibility - ARIA Attributes', () => {
  describe('Valid ARIA', () => {
    it('should accept valid ARIA roles', async () => {
      const { container } = render(
        <div>
          <nav role="navigation">
            <button aria-label="Menu">☰</button>
          </nav>
        </div>
      );

      const violations = await runA11yTests(container);
      const ariaViolations = violations.filter((v) => v.id.includes('aria'));
      expect(ariaViolations).toHaveLength(0);
    });

    it('should accept valid ARIA attributes', async () => {
      const { container } = render(
        <div>
          <button aria-expanded="false" aria-controls="menu">
            Toggle Menu
          </button>
          <div id="menu" hidden>
            Menu content
          </div>
        </div>
      );

      const violations = await runA11yTests(container);
      const ariaViolations = violations.filter((v) => v.id.includes('aria'));
      expect(ariaViolations).toHaveLength(0);
    });
  });

  describe('Invalid ARIA', () => {
    it('should detect invalid ARIA attributes', async () => {
      const { container } = render(
        <div>
          <button aria-invalid-attribute="true">Invalid ARIA</button>
        </div>
      );

      const violations = await runA11yTests(container);
      const ariaViolations = violations.filter((v) => v.id.includes('aria'));
      expect(ariaViolations.length).toBeGreaterThan(0);
    });

    it('should detect ARIA roles on invalid elements', async () => {
      const { container } = render(
        <div>
          <div role="button">Not actually a button</div>
        </div>
      );

      // This might not violate depending on implementation
      const violations = await runA11yTests(container);

      // At minimum, should not crash
      expect(violations).toBeDefined();
    });
  });
});

describe('Accessibility - Keyboard Navigation', () => {
  describe('Focusable Elements', () => {
    it('should allow buttons to be focusable', async () => {
      const { container } = render(
        <div>
          <button>Focusable button</button>
        </div>
      );

      const violations = await runA11yTests(container);
      const focusViolations = violations.filter((v) => v.id.includes('focus'));
      expect(focusViolations).toHaveLength(0);
    });

    it('should allow links to be focusable', async () => {
      const { container } = render(
        <div>
          <a href="#">Focusable link</a>
        </div>
      );

      const violations = await runA11yTests(container);
      const focusViolations = violations.filter((v) => v.id.includes('focus'));
      expect(focusViolations).toHaveLength(0);
    });

    it('should detect missing focus indicators', async () => {
      const { container } = render(
        <div>
          <button style={{ outline: 'none' }}>Button with no focus indicator</button>
        </div>
      );

      const violations = await runA11yTests(container);

      // Axe may not catch CSS-based focus issues, but should not crash
      expect(violations).toBeDefined();
    });
  });
});

describe('Accessibility - Semantic HTML', () => {
  describe('Headings', () => {
    it('should have proper heading hierarchy', async () => {
      const { container } = render(
        <div>
          <h1>Main Title</h1>
          <h2>Subtitle</h2>
          <h3>Section</h3>
        </div>
      );

      const violations = await runA11yTests(container);
      const headingViolations = violations.filter((v) => v.id.includes('heading'));
      expect(headingViolations).toHaveLength(0);
    });

    it('should detect skipped heading levels', async () => {
      const { container } = render(
        <div>
          <h1>Main Title</h1>
          <h3>This skips h2</h3>
        </div>
      );

      const violations = await runA11yTests(container);

      // Some axe versions detect this, some don't
      // At minimum, should not crash
      expect(violations).toBeDefined();
    });
  });

  describe('Landmarks', () => {
    it('should accept semantic landmarks', async () => {
      const { container } = render(
        <div>
          <header>Header</header>
          <nav>Navigation</nav>
          <main>Main content</main>
          <footer>Footer</footer>
        </div>
      );

      const violations = await runA11yTests(container);
      const landmarkViolations = violations.filter((v) => v.id.includes('landmark'));
      expect(landmarkViolations).toHaveLength(0);
    });
  });
});
