import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

// Mock the TypographyDetailsDialog since it uses Radix UI Sheet
vi.mock('../components/TypographyDetailsDialog', () => ({
  TypographyDetailsDialog: () => <div data-testid="typography-details-mock" />,
}));

import { TypographyToken } from '../components/TypographyToken';

describe('TypographyToken', () => {
  const defaultProps = {
    label: 'Sample Text',
    tokenName: 'heading_xl_semi-bold--system',
    description: 'Extra large heading',
    fontSize: '32px',
    lineHeight: '40px',
    letterSpacing: '-0.5px',
  };

  it('renders the label text as the sample', () => {
    render(<TypographyToken {...defaultProps} />);
    expect(screen.getByText('Sample Text')).toBeInTheDocument();
  });

  it('renders the token name in a code badge', () => {
    render(<TypographyToken {...defaultProps} />);
    expect(screen.getByText('heading_xl_semi-bold--system')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<TypographyToken {...defaultProps} />);
    expect(screen.getByText('Extra large heading')).toBeInTheDocument();
  });

  it('displays font size specification', () => {
    render(<TypographyToken {...defaultProps} />);
    expect(screen.getByText('32px')).toBeInTheDocument();
  });

  it('displays line height specification', () => {
    render(<TypographyToken {...defaultProps} />);
    expect(screen.getByText('40px')).toBeInTheDocument();
  });

  it('displays letter spacing specification', () => {
    render(<TypographyToken {...defaultProps} />);
    expect(screen.getByText('-0.5px')).toBeInTheDocument();
  });

  it('applies the specified font size to the sample text', () => {
    render(<TypographyToken {...defaultProps} />);
    const sample = screen.getByText('Sample Text');
    expect(sample.style.fontSize).toBe('32px');
  });

  it('applies the specified line height to the sample text', () => {
    render(<TypographyToken {...defaultProps} />);
    const sample = screen.getByText('Sample Text');
    expect(sample.style.lineHeight).toBe('40px');
  });

  it('applies the specified letter spacing to the sample text', () => {
    render(<TypographyToken {...defaultProps} />);
    const sample = screen.getByText('Sample Text');
    expect(sample.style.letterSpacing).toBe('-0.5px');
  });

  it('uses default fontWeight of 600 when not provided', () => {
    render(<TypographyToken {...defaultProps} />);
    const sample = screen.getByText('Sample Text');
    expect(sample.style.fontWeight).toBe('600');
  });

  it('uses provided fontWeight when specified', () => {
    render(<TypographyToken {...defaultProps} fontWeight="700" />);
    const sample = screen.getByText('Sample Text');
    expect(sample.style.fontWeight).toBe('700');
  });

  it('displays the font family name (first segment only)', () => {
    render(<TypographyToken {...defaultProps} />);
    // Default fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    // Should display 'Inter' (first segment)
    expect(screen.getByText('Inter')).toBeInTheDocument();
  });

  it('applies link color when tokenName starts with link_', () => {
    render(
      <TypographyToken
        {...defaultProps}
        tokenName="link_default"
        label="Link Text"
      />
    );
    const sample = screen.getByText('Link Text');
    expect(sample.style.color).toContain('var(--link-link-default');
  });

  it('applies hover link color when tokenName contains hover', () => {
    render(
      <TypographyToken
        {...defaultProps}
        tokenName="link_hover"
        label="Hover Link"
      />
    );
    const sample = screen.getByText('Hover Link');
    expect(sample.style.color).toContain('hover');
  });

  it('does not apply link color for non-link tokens', () => {
    render(<TypographyToken {...defaultProps} />);
    const sample = screen.getByText('Sample Text');
    expect(sample.style.color).toBe('');
  });

  it('applies heading-specific container classes for heading tokens', () => {
    const { container } = render(
      <TypographyToken {...defaultProps} tokenName="heading_xl" label="Heading" />
    );
    const previewContainer = container.querySelector('.flex.items-center');
    expect(previewContainer).toBeInTheDocument();
  });

  it('applies non-heading container classes for body tokens', () => {
    const { container } = render(
      <TypographyToken {...defaultProps} tokenName="body_md" label="Body Text" />
    );
    const previewContainer = container.querySelector('.flex.items-start');
    expect(previewContainer).toBeInTheDocument();
  });
});
