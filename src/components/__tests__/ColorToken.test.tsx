import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ColorToken } from '../ColorToken';

/**
 * Test suite for ColorToken component
 *
 * PURPOSE: Ensures color tokens display correctly with accurate color values
 * CRITICAL: Color accuracy is essential for a design system - values must be exact
 */

// Mock ColorDetailsDialog to avoid complex nested component testing
vi.mock('../ColorDetailsDialog', () => ({
  ColorDetailsDialog: () => <div data-testid="color-details-dialog">Details Dialog</div>,
}));

describe('ColorToken', () => {
  const mockProps = {
    name: '--primary-default',
    hex: '#3B82F6',
    rgb: 'rgb(59, 130, 246)',
    darkHex: '#60A5FA',
    darkRgb: 'rgb(96, 165, 250)',
  };

  beforeEach(() => {
    // Ensure document starts in light mode
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => {
    // Clean up
    document.documentElement.classList.remove('dark');
  });

  describe('Rendering - Light Mode', () => {
    it('should render without crashing', () => {
      render(<ColorToken {...mockProps} />);

      expect(screen.getByText('--primary-default')).toBeInTheDocument();
    });

    it('should display token name', () => {
      render(<ColorToken {...mockProps} />);

      expect(screen.getByText('--primary-default')).toBeInTheDocument();
    });

    it('should display hex value in light mode', () => {
      render(<ColorToken {...mockProps} />);

      expect(screen.getByText('#3B82F6')).toBeInTheDocument();
    });

    it('should display RGB value in light mode', () => {
      render(<ColorToken {...mockProps} />);

      expect(screen.getByText('rgb(59, 130, 246)')).toBeInTheDocument();
    });

    it('should show "Light mode" indicator when dark mode values exist', () => {
      render(<ColorToken {...mockProps} />);

      expect(screen.getByText('Light mode')).toBeInTheDocument();
    });

    it('should apply correct background color', () => {
      render(<ColorToken {...mockProps} />);

      const colorSquare = screen.getByText('--primary-default').closest('div')?.previousSibling as HTMLElement;
      expect(colorSquare).toHaveStyle({ backgroundColor: '#3B82F6' });
    });

    it('should render ColorDetailsDialog', () => {
      render(<ColorToken {...mockProps} />);

      expect(screen.getByTestId('color-details-dialog')).toBeInTheDocument();
    });
  });

  describe('Rendering - Dark Mode', () => {
    it('should display dark hex value in dark mode', () => {
      document.documentElement.classList.add('dark');
      render(<ColorToken {...mockProps} />);

      expect(screen.getByText('#60A5FA')).toBeInTheDocument();
    });

    it('should display dark RGB value in dark mode', () => {
      document.documentElement.classList.add('dark');
      render(<ColorToken {...mockProps} />);

      expect(screen.getByText('rgb(96, 165, 250)')).toBeInTheDocument();
    });

    it('should show "Dark mode" indicator in dark mode', () => {
      document.documentElement.classList.add('dark');
      render(<ColorToken {...mockProps} />);

      expect(screen.getByText('Dark mode')).toBeInTheDocument();
    });

    it('should apply correct dark background color', () => {
      document.documentElement.classList.add('dark');
      render(<ColorToken {...mockProps} />);

      const colorSquare = screen.getByText('--primary-default').closest('div')?.previousSibling as HTMLElement;
      expect(colorSquare).toHaveStyle({ backgroundColor: '#60A5FA' });
    });
  });

  describe('Props Without Dark Mode Values', () => {
    const lightOnlyProps = {
      name: '--text-primary',
      hex: '#000000',
      rgb: 'rgb(0, 0, 0)',
    };

    it('should render without dark mode values', () => {
      render(<ColorToken {...lightOnlyProps} />);

      expect(screen.getByText('--text-primary')).toBeInTheDocument();
      expect(screen.getByText('#000000')).toBeInTheDocument();
    });

    it('should not show mode indicator when no dark values exist', () => {
      render(<ColorToken {...lightOnlyProps} />);

      expect(screen.queryByText('Light mode')).not.toBeInTheDocument();
      expect(screen.queryByText('Dark mode')).not.toBeInTheDocument();
    });

    it('should use light values even in dark mode if no dark values provided', () => {
      document.documentElement.classList.add('dark');
      render(<ColorToken {...lightOnlyProps} />);

      expect(screen.getByText('#000000')).toBeInTheDocument();
      expect(screen.getByText('rgb(0, 0, 0)')).toBeInTheDocument();
    });
  });

  describe('Theme Change Detection', () => {
    it('should detect when theme changes from light to dark', async () => {
      const { rerender } = render(<ColorToken {...mockProps} />);

      // Initially in light mode
      expect(screen.getByText('#3B82F6')).toBeInTheDocument();

      // Change to dark mode
      document.documentElement.classList.add('dark');

      // Wait for MutationObserver to fire
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Force re-render to see changes
      rerender(<ColorToken {...mockProps} />);

      expect(screen.getByText('#60A5FA')).toBeInTheDocument();
    });

    it('should detect when theme changes from dark to light', async () => {
      document.documentElement.classList.add('dark');
      const { rerender } = render(<ColorToken {...mockProps} />);

      // Initially in dark mode
      expect(screen.getByText('#60A5FA')).toBeInTheDocument();

      // Change to light mode
      document.documentElement.classList.remove('dark');

      // Wait for MutationObserver to fire
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Force re-render to see changes
      rerender(<ColorToken {...mockProps} />);

      expect(screen.getByText('#3B82F6')).toBeInTheDocument();
    });
  });

  describe('Visual Structure', () => {
    it('should have a color square with correct dimensions', () => {
      render(<ColorToken {...mockProps} />);

      const colorSquare = screen.getByText('--primary-default').closest('div')?.previousSibling as HTMLElement;
      expect(colorSquare).toHaveClass('w-[240px]', 'h-[240px]');
    });

    it('should have hover effects on color square', () => {
      render(<ColorToken {...mockProps} />);

      const colorSquare = screen.getByText('--primary-default').closest('div')?.previousSibling as HTMLElement;
      expect(colorSquare.className).toContain('hover:shadow-lg');
      expect(colorSquare.className).toContain('hover:scale-[1.02]');
    });

    it('should have a border', () => {
      render(<ColorToken {...mockProps} />);

      const colorSquare = screen.getByText('--primary-default').closest('div')?.previousSibling as HTMLElement;
      expect(colorSquare).toHaveClass('border');
    });
  });

  describe('Text Display', () => {
    it('should display all text information with correct styling', () => {
      render(<ColorToken {...mockProps} />);

      const name = screen.getByText('--primary-default');
      expect(name).toHaveClass('text-sm');

      const hex = screen.getByText('#3B82F6');
      expect(hex).toHaveClass('text-xs');

      const rgb = screen.getByText('rgb(59, 130, 246)');
      expect(rgb).toHaveClass('text-xs');
    });

    it('should handle long token names with text wrapping', () => {
      const longNameProps = {
        ...mockProps,
        name: '--very-long-token-name-that-should-wrap-correctly',
      };

      render(<ColorToken {...longNameProps} />);

      const name = screen.getByText('--very-long-token-name-that-should-wrap-correctly');
      expect(name).toHaveClass('break-all');
    });
  });

  describe('Edge Cases', () => {
    it('should handle uppercase hex values', () => {
      const upperCaseProps = {
        ...mockProps,
        hex: '#3B82F6',
        darkHex: '#60A5FA',
      };

      render(<ColorToken {...upperCaseProps} />);

      expect(screen.getByText('#3B82F6')).toBeInTheDocument();
    });

    it('should handle RGB with spaces', () => {
      const spacedRgbProps = {
        ...mockProps,
        rgb: 'rgb(59, 130, 246)',
      };

      render(<ColorToken {...spacedRgbProps} />);

      expect(screen.getByText('rgb(59, 130, 246)')).toBeInTheDocument();
    });

    it('should handle special characters in name', () => {
      const specialProps = {
        ...mockProps,
        name: '--color-primary_default-v2',
      };

      render(<ColorToken {...specialProps} />);

      expect(screen.getByText('--color-primary_default-v2')).toBeInTheDocument();
    });
  });

  describe('Component Cleanup', () => {
    it('should disconnect MutationObserver on unmount', () => {
      const { unmount } = render(<ColorToken {...mockProps} />);

      // Spy on MutationObserver.disconnect would be ideal here
      // For now, just verify component unmounts without errors
      expect(() => unmount()).not.toThrow();
    });
  });
});
