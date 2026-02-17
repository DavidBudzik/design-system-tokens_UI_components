import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '../components/ThemeToggle';
import ErrorBoundary from '../components/ErrorBoundary';
import {
  LoadingState,
  TokenLoadingSkeleton,
  ComponentLoadingSkeleton,
} from '../components/LoadingState';
import { CollapsibleSection } from '../components/CollapsibleSection';
import { Logo } from '../components/Logo';
import { BaseColors } from '../data/themePalettes';

afterEach(() => {
  vi.restoreAllMocks();
});

// Helper for ErrorBoundary tests
const ThrowingComponent = ({ message = 'Test error' }: { message?: string }) => {
  throw new Error(message);
};

const testBaseColors: BaseColors = {
  cta: '#E03600',
  primary: '#242424',
  secondary: '#EDEDED',
  danger: '#E03636',
  success: '#1CD166',
  warning: '#FFB529',
  link: '#308FED',
  background: '#FFFFFF',
  foreground: '#171717',
};

describe('ThemeToggle', () => {
  it('renders a button element', () => {
    render(<ThemeToggle theme="light" onToggle={vi.fn()} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows title "Switch to dark mode" when theme is light', () => {
    render(<ThemeToggle theme="light" onToggle={vi.fn()} />);
    const button = screen.getByRole('button');
    expect(button.getAttribute('title')).toContain('dark');
  });

  it('shows title "Switch to light mode" when theme is dark', () => {
    render(<ThemeToggle theme="dark" onToggle={vi.fn()} />);
    const button = screen.getByRole('button');
    expect(button.getAttribute('title')).toContain('light');
  });

  it('calls onToggle when clicked', () => {
    const onToggle = vi.fn();
    render(<ThemeToggle theme="light" onToggle={onToggle} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('renders an SVG icon inside the button', () => {
    const { container } = render(<ThemeToggle theme="light" onToggle={vi.fn()} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Safe content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Safe content')).toBeInTheDocument();
  });

  it('renders default error UI when child throws', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('displays the error message in default error UI', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ThrowingComponent message="Custom error message" />
      </ErrorBoundary>
    );
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary fallback={<div>Custom error UI</div>}>
        <ThrowingComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Custom error UI')).toBeInTheDocument();
  });

  it('shows a Reload Page button in default error UI', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Reload Page')).toBeInTheDocument();
  });

  it('calls window.location.reload when Reload Page is clicked', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { ...window.location, reload: reloadMock },
      writable: true,
      configurable: true,
    });

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );
    fireEvent.click(screen.getByText('Reload Page'));
    expect(reloadMock).toHaveBeenCalled();
  });
});

describe('LoadingState', () => {
  it('renders skeleton elements', () => {
    const { container } = render(<LoadingState />);
    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders without errors', () => {
    expect(() => render(<LoadingState />)).not.toThrow();
  });
});

describe('TokenLoadingSkeleton', () => {
  it('renders skeleton elements', () => {
    const { container } = render(<TokenLoadingSkeleton />);
    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders without errors', () => {
    expect(() => render(<TokenLoadingSkeleton />)).not.toThrow();
  });
});

describe('ComponentLoadingSkeleton', () => {
  it('renders skeleton elements', () => {
    const { container } = render(<ComponentLoadingSkeleton />);
    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders without errors', () => {
    expect(() => render(<ComponentLoadingSkeleton />)).not.toThrow();
  });
});

describe('CollapsibleSection', () => {
  it('renders the title', () => {
    render(
      <CollapsibleSection id="test" title="My Title" hint="a hint">
        content
      </CollapsibleSection>
    );
    expect(screen.getByText('My Title')).toBeInTheDocument();
  });

  it('renders the description when provided', () => {
    render(
      <CollapsibleSection id="test" title="Title" description="Description text" hint="hint">
        content
      </CollapsibleSection>
    );
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { container } = render(
      <CollapsibleSection id="test" title="Title" hint="hint">
        content
      </CollapsibleSection>
    );
    // Only the hint should be in the p.text-sm, not an extra description paragraph
    const descParagraphs = container.querySelectorAll('p.text-sm.text-muted-foreground');
    expect(descParagraphs).toHaveLength(0);
  });

  it('renders the hint text', () => {
    render(
      <CollapsibleSection id="test" title="Title" hint="Helpful hint">
        content
      </CollapsibleSection>
    );
    expect(screen.getByText('Helpful hint')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <CollapsibleSection id="test" title="Title" hint="hint">
        <span>Child content</span>
      </CollapsibleSection>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('applies the id to the root element', () => {
    const { container } = render(
      <CollapsibleSection id="my-section" title="Title" hint="hint">
        content
      </CollapsibleSection>
    );
    expect(container.querySelector('#my-section')).toBeInTheDocument();
  });
});

describe('Logo', () => {
  it('renders with aria-label "Design Book Logo"', () => {
    render(<Logo baseColors={testBaseColors} />);
    expect(screen.getByLabelText('Design Book Logo')).toBeInTheDocument();
  });

  it('applies the CTA color as background', () => {
    render(<Logo baseColors={testBaseColors} />);
    const logo = screen.getByLabelText('Design Book Logo');
    // jsdom converts hex to rgb format
    expect(logo.style.backgroundColor).toBe('rgb(224, 54, 0)');
  });

  it('renders with white text color', () => {
    render(<Logo baseColors={testBaseColors} />);
    const logo = screen.getByLabelText('Design Book Logo');
    // jsdom converts hex to rgb format
    expect(logo.style.color).toBe('rgb(255, 255, 255)');
  });

  it('applies additional className when provided', () => {
    render(<Logo baseColors={testBaseColors} className="extra-class" />);
    const logo = screen.getByLabelText('Design Book Logo');
    expect(logo.className).toContain('extra-class');
  });

  it('renders an SVG icon', () => {
    const { container } = render(<Logo baseColors={testBaseColors} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
