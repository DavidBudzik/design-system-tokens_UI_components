import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';

// Mock the ColorDetailsDialog since it uses Radix UI Sheet which can be problematic in jsdom
vi.mock('../components/ColorDetailsDialog', () => ({
  ColorDetailsDialog: () => <div data-testid="color-details-mock" />,
}));

import { ColorToken } from '../components/ColorToken';
import { TokenSection } from '../components/TokenSection';

beforeEach(() => {
  document.documentElement.classList.remove('dark');
});

afterEach(() => {
  document.documentElement.classList.remove('dark');
  vi.restoreAllMocks();
});

describe('ColorToken', () => {
  const defaultProps = {
    name: '--cta-default',
    hex: '#E03600',
    rgb: 'rgb(224, 54, 0)',
  };

  const propsWithDark = {
    ...defaultProps,
    darkHex: '#FF5C1A',
    darkRgb: 'rgb(255, 92, 26)',
  };

  it('renders the token name', () => {
    render(<ColorToken {...defaultProps} />);
    expect(screen.getByText('--cta-default')).toBeInTheDocument();
  });

  it('renders the hex value', () => {
    render(<ColorToken {...defaultProps} />);
    expect(screen.getByText('#E03600')).toBeInTheDocument();
  });

  it('renders the rgb value', () => {
    render(<ColorToken {...defaultProps} />);
    expect(screen.getByText('rgb(224, 54, 0)')).toBeInTheDocument();
  });

  it('displays the color swatch with the correct background color', () => {
    const { container } = render(<ColorToken {...defaultProps} />);
    const swatch = container.querySelector('[style*="background-color"]');
    expect(swatch).toBeInTheDocument();
  });

  it('shows light mode values by default (no dark class on html)', () => {
    render(<ColorToken {...propsWithDark} />);
    expect(screen.getByText('#E03600')).toBeInTheDocument();
  });

  it('does not show Light/Dark indicator when no darkHex is provided', () => {
    render(<ColorToken {...defaultProps} />);
    expect(screen.queryByText('Light')).not.toBeInTheDocument();
    expect(screen.queryByText('Dark')).not.toBeInTheDocument();
  });

  it('shows "Light" indicator when darkHex exists and light mode is active', () => {
    render(<ColorToken {...propsWithDark} />);
    expect(screen.getByText('Light')).toBeInTheDocument();
  });

  it('switches to dark mode values when html gets dark class', async () => {
    render(<ColorToken {...propsWithDark} />);

    // Initially should show light values
    expect(screen.getByText('#E03600')).toBeInTheDocument();

    // Add dark class - MutationObserver should fire
    await act(async () => {
      document.documentElement.classList.add('dark');
      // Give the MutationObserver time to fire
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    expect(screen.getByText('#FF5C1A')).toBeInTheDocument();
  });

  it('shows "Dark" indicator when in dark mode', async () => {
    // Set dark mode before rendering
    document.documentElement.classList.add('dark');
    render(<ColorToken {...propsWithDark} />);

    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  it('disconnects MutationObserver on unmount', () => {
    const disconnectSpy = vi.spyOn(MutationObserver.prototype, 'disconnect');
    const { unmount } = render(<ColorToken {...propsWithDark} />);
    unmount();
    expect(disconnectSpy).toHaveBeenCalled();
  });
});

describe('TokenSection', () => {
  const testTokens = [
    { name: '--test-red', hex: '#FF0000', rgb: 'rgb(255, 0, 0)' },
    { name: '--test-green', hex: '#00FF00', rgb: 'rgb(0, 255, 0)' },
    { name: '--test-blue', hex: '#0000FF', rgb: 'rgb(0, 0, 255)' },
  ];

  it('renders the section title', () => {
    render(
      <TokenSection title="CTA Colors" description="Action colors" tokens={testTokens} />
    );
    expect(screen.getByText('CTA Colors')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(
      <TokenSection title="CTA" description="Primary action colors" tokens={testTokens} />
    );
    expect(screen.getByText('Primary action colors')).toBeInTheDocument();
  });

  it('renders all provided tokens', () => {
    render(
      <TokenSection title="Colors" description="desc" tokens={testTokens} />
    );
    expect(screen.getByText('--test-red')).toBeInTheDocument();
    expect(screen.getByText('--test-green')).toBeInTheDocument();
    expect(screen.getByText('--test-blue')).toBeInTheDocument();
  });

  it('does not render title/description block when title is empty', () => {
    const { container } = render(
      <TokenSection title="" description="desc" tokens={testTokens} />
    );
    const headings = container.querySelectorAll('h3');
    expect(headings).toHaveLength(0);
  });

  it('renders tokens in a grid layout', () => {
    const { container } = render(
      <TokenSection title="Colors" description="desc" tokens={testTokens} />
    );
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });
});
