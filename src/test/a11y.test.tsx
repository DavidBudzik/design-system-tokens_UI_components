import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { runA11yTests } from '../utils/a11y';

describe('Accessibility Tests', () => {
  it('should not have accessibility violations in a simple button', async () => {
    const TestComponent = () => (
      <button type="button" aria-label="Test button">
        Click me
      </button>
    );

    const { container } = render(<TestComponent />);
    const results = await runA11yTests(container);

    expect(results.violations).toHaveLength(0);
  });

  it('should detect missing alt text on images', async () => {
    const TestComponent = () => <img src="test.jpg" />;

    const { container } = render(<TestComponent />);
    const results = await runA11yTests(container);

    const altTextViolation = results.violations.find((v) => v.id === 'image-alt');
    expect(altTextViolation).toBeDefined();
  });

  it('should detect missing form labels', async () => {
    const TestComponent = () => (
      <form>
        <input type="text" />
      </form>
    );

    const { container } = render(<TestComponent />);
    const results = await runA11yTests(container);

    const labelViolation = results.violations.find((v) => v.id === 'label');
    expect(labelViolation).toBeDefined();
  });
});
