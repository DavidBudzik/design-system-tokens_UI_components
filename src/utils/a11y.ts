import axe from 'axe-core';

export interface A11yViolation {
  id: string;
  impact?: string;
  description: string;
  help: string;
  helpUrl: string;
  nodes: Array<{
    html: string;
    target: string[];
    failureSummary?: string;
  }>;
}

export interface A11yResults {
  violations: A11yViolation[];
  passes: number;
  incomplete: number;
  timestamp: string;
}

/**
 * Run accessibility tests on the current page or a specific element
 * @param element - Optional element to test, defaults to document
 * @param options - axe-core run options
 * @returns Promise with accessibility test results
 */
export async function runA11yTests(
  element: Element | Document = document,
  options = {}
): Promise<A11yResults> {
  const results = await axe.run(element, options);

  return {
    violations: results.violations as A11yViolation[],
    passes: results.passes.length,
    incomplete: results.incomplete.length,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Log accessibility violations to console
 * Useful for development mode
 */
export function logA11yViolations(violations: A11yViolation[]): void {
  if (violations.length === 0) {
    console.log('%c✓ No accessibility violations found', 'color: green; font-weight: bold');
    return;
  }

  console.group(`%c⚠ ${violations.length} Accessibility Violations`, 'color: red; font-weight: bold');

  violations.forEach((violation) => {
    console.group(
      `%c${violation.impact?.toUpperCase() || 'UNKNOWN'} - ${violation.help}`,
      `color: ${getImpactColor(violation.impact)}`
    );
    console.log('Description:', violation.description);
    console.log('Help:', violation.helpUrl);
    console.log('Affected nodes:', violation.nodes.length);
    violation.nodes.forEach((node) => {
      console.log('  -', node.target.join(' > '));
      console.log('   ', node.html);
    });
    console.groupEnd();
  });

  console.groupEnd();
}

function getImpactColor(impact?: string): string {
  switch (impact) {
    case 'critical':
      return '#ff0000';
    case 'serious':
      return '#ff6600';
    case 'moderate':
      return '#ffaa00';
    case 'minor':
      return '#ffcc00';
    default:
      return '#666666';
  }
}

/**
 * Run accessibility tests in development mode
 * Only runs if NODE_ENV is development
 */
export async function runDevA11yTests(): Promise<void> {
  if (import.meta.env.DEV) {
    try {
      const results = await runA11yTests();
      logA11yViolations(results.violations);
    } catch (error) {
      console.error('Error running accessibility tests:', error);
    }
  }
}
