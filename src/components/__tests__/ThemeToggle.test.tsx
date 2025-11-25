import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from '../ThemeToggle';

/**
 * Test suite for ThemeToggle component
 *
 * PURPOSE: Ensures theme switching functionality works correctly
 * CRITICAL: Theme toggle is a key UX feature for viewing tokens in both modes
 */

describe('ThemeToggle', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const onToggle = vi.fn();
      render(<ThemeToggle theme="light" onToggle={onToggle} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should display Moon icon in light mode', () => {
      const onToggle = vi.fn();
      render(<ThemeToggle theme="light" onToggle={onToggle} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Switch to dark mode');

      // Moon icon should be present
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should display Sun icon in dark mode', () => {
      const onToggle = vi.fn();
      render(<ThemeToggle theme="dark" onToggle={onToggle} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Switch to light mode');

      // Sun icon should be present
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should have correct accessibility title in light mode', () => {
      const onToggle = vi.fn();
      render(<ThemeToggle theme="light" onToggle={onToggle} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Switch to dark mode');
    });

    it('should have correct accessibility title in dark mode', () => {
      const onToggle = vi.fn();
      render(<ThemeToggle theme="dark" onToggle={onToggle} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Switch to light mode');
    });
  });

  describe('Interactions', () => {
    it('should call onToggle when clicked', async () => {
      const user = userEvent.setup();
      const onToggle = vi.fn();

      render(<ThemeToggle theme="light" onToggle={onToggle} />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it('should call onToggle multiple times when clicked repeatedly', async () => {
      const user = userEvent.setup();
      const onToggle = vi.fn();

      render(<ThemeToggle theme="light" onToggle={onToggle} />);

      const button = screen.getByRole('button');
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(onToggle).toHaveBeenCalledTimes(3);
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      const onToggle = vi.fn();

      render(<ThemeToggle theme="light" onToggle={onToggle} />);

      const button = screen.getByRole('button');
      button.focus();

      expect(button).toHaveFocus();

      // Press Enter
      await user.keyboard('{Enter}');
      expect(onToggle).toHaveBeenCalledTimes(1);

      // Press Space
      await user.keyboard(' ');
      expect(onToggle).toHaveBeenCalledTimes(2);
    });
  });

  describe('Props Handling', () => {
    it('should handle theme prop changes', () => {
      const onToggle = vi.fn();
      const { rerender } = render(<ThemeToggle theme="light" onToggle={onToggle} />);

      expect(screen.getByRole('button')).toHaveAttribute('title', 'Switch to dark mode');

      rerender(<ThemeToggle theme="dark" onToggle={onToggle} />);

      expect(screen.getByRole('button')).toHaveAttribute('title', 'Switch to light mode');
    });

    it('should handle onToggle prop changes', async () => {
      const user = userEvent.setup();
      const onToggle1 = vi.fn();
      const onToggle2 = vi.fn();

      const { rerender } = render(<ThemeToggle theme="light" onToggle={onToggle1} />);

      await user.click(screen.getByRole('button'));
      expect(onToggle1).toHaveBeenCalledTimes(1);
      expect(onToggle2).not.toHaveBeenCalled();

      rerender(<ThemeToggle theme="light" onToggle={onToggle2} />);

      await user.click(screen.getByRole('button'));
      expect(onToggle1).toHaveBeenCalledTimes(1);
      expect(onToggle2).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('should have role="button"', () => {
      const onToggle = vi.fn();
      render(<ThemeToggle theme="light" onToggle={onToggle} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should have descriptive title attribute', () => {
      const onToggle = vi.fn();
      render(<ThemeToggle theme="light" onToggle={onToggle} />);

      const button = screen.getByRole('button');
      const title = button.getAttribute('title');

      expect(title).toBeTruthy();
      expect(title).toMatch(/switch to (light|dark) mode/i);
    });

    it('should be focusable', () => {
      const onToggle = vi.fn();
      render(<ThemeToggle theme="light" onToggle={onToggle} />);

      const button = screen.getByRole('button');
      button.focus();

      expect(button).toHaveFocus();
    });
  });

  describe('Visual Properties', () => {
    it('should have correct button styling classes', () => {
      const onToggle = vi.fn();
      render(<ThemeToggle theme="light" onToggle={onToggle} />);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-10', 'h-10');
    });

    it('should have icon with correct size', () => {
      const onToggle = vi.fn();
      render(<ThemeToggle theme="light" onToggle={onToggle} />);

      const button = screen.getByRole('button');
      const svg = button.querySelector('svg');

      expect(svg).toHaveClass('w-5', 'h-5');
    });
  });
});
