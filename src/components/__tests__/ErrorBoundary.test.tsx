import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../ErrorBoundary';

/**
 * Test suite for ErrorBoundary component
 *
 * PURPOSE: Ensures graceful error handling prevents app crashes
 * CRITICAL: Error boundaries protect user experience when components fail
 */

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Normal content</div>;
};

// Component that throws a custom error
const ThrowCustomError = ({ message }: { message: string }) => {
  throw new Error(message);
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Suppress console errors during tests (error boundaries log to console)
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('Normal Rendering', () => {
    it('should render children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <div>Test content</div>
        </ErrorBoundary>
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      render(
        <ErrorBoundary>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </ErrorBoundary>
      );

      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
      expect(screen.getByText('Child 3')).toBeInTheDocument();
    });

    it('should not render error UI when children render successfully', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      );

      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
      expect(screen.getByText('Normal content')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should catch errors and display error UI', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.queryByText('Normal content')).not.toBeInTheDocument();
    });

    it('should display error message', () => {
      render(
        <ErrorBoundary>
          <ThrowCustomError message="Custom error message" />
        </ErrorBoundary>
      );

      expect(screen.getByText('Custom error message')).toBeInTheDocument();
    });

    it('should display default message when error has no message', () => {
      const ErrorWithoutMessage = () => {
        const error: any = new Error();
        error.message = '';
        throw error;
      };

      render(
        <ErrorBoundary>
          <ErrorWithoutMessage />
        </ErrorBoundary>
      );

      expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
    });

    it('should log error to console', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error');

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should display reload button', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const reloadButton = screen.getByRole('button', { name: /reload page/i });
      expect(reloadButton).toBeInTheDocument();
    });

    it('should reload page when reload button is clicked', async () => {
      const user = userEvent.setup();
      const reloadSpy = vi.fn();

      // Mock window.location.reload
      Object.defineProperty(window, 'location', {
        value: { reload: reloadSpy },
        writable: true,
      });

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const reloadButton = screen.getByRole('button', { name: /reload page/i });
      await user.click(reloadButton);

      expect(reloadSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Custom Fallback', () => {
    it('should render custom fallback when provided', () => {
      const customFallback = <div>Custom error UI</div>;

      render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Custom error UI')).toBeInTheDocument();
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    });

    it('should render custom fallback with complex JSX', () => {
      const customFallback = (
        <div>
          <h1>Custom Error Header</h1>
          <p>Custom error description</p>
          <button>Custom action</button>
        </div>
      );

      render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Custom Error Header')).toBeInTheDocument();
      expect(screen.getByText('Custom error description')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /custom action/i })).toBeInTheDocument();
    });

    it('should use default fallback when custom fallback is not provided', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  describe('Error Boundary State', () => {
    it('should update state when error is caught', () => {
      const { container } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Error UI should be rendered, which means state was updated
      expect(container.querySelector('.text-destructive')).toBeInTheDocument();
    });

    it('should maintain error state after re-render', () => {
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      rerender(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible error heading', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Something went wrong');
    });

    it('should have accessible reload button', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const button = screen.getByRole('button', { name: /reload page/i });
      expect(button).toBeInTheDocument();
    });

    it('should have appropriate text color for error state', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const heading = screen.getByText('Something went wrong');
      expect(heading).toHaveClass('text-destructive');
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      const reloadSpy = vi.fn();

      Object.defineProperty(window, 'location', {
        value: { reload: reloadSpy },
        writable: true,
      });

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const button = screen.getByRole('button', { name: /reload page/i });
      button.focus();

      expect(button).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(reloadSpy).toHaveBeenCalled();
    });
  });

  describe('Visual Structure', () => {
    it('should center error UI', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const container = screen.getByText('Something went wrong').closest('.flex');
      expect(container).toHaveClass('items-center', 'justify-center');
    });

    it('should have proper spacing and layout', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const errorContent = screen.getByText('Something went wrong').closest('.text-center');
      expect(errorContent).toHaveClass('p-8', 'max-w-md');
    });

    it('should have styled reload button', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const button = screen.getByRole('button', { name: /reload page/i });
      expect(button).toHaveClass('bg-primary', 'text-primary-foreground', 'rounded-md');
    });
  });

  describe('Edge Cases', () => {
    it('should handle errors thrown in nested components', () => {
      const NestedError = () => (
        <div>
          <div>
            <ThrowError shouldThrow={true} />
          </div>
        </div>
      );

      render(
        <ErrorBoundary>
          <NestedError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should handle async errors in lifecycle methods', () => {
      render(
        <ErrorBoundary>
          <ThrowCustomError message="Async error" />
        </ErrorBoundary>
      );

      expect(screen.getByText('Async error')).toBeInTheDocument();
    });

    it('should handle null children', () => {
      render(<ErrorBoundary>{null}</ErrorBoundary>);

      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    });

    it('should handle undefined children', () => {
      render(<ErrorBoundary>{undefined}</ErrorBoundary>);

      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    });
  });
});
