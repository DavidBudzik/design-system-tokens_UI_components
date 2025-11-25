import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { copyToClipboard } from '../clipboard';

/**
 * Test suite for clipboard utility
 *
 * PURPOSE: Ensures clipboard functionality works across different browser environments
 * CRITICAL: Users rely on copy functionality for exporting tokens
 */

describe('copyToClipboard', () => {
  // Store original values
  const originalClipboard = navigator.clipboard;
  const originalExecCommand = document.execCommand;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restore original implementations
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      writable: true,
    });
    document.execCommand = originalExecCommand;
  });

  describe('Modern Clipboard API', () => {
    it('should use navigator.clipboard.writeText when available in secure context', async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: mockWriteText },
        writable: true,
      });
      Object.defineProperty(window, 'isSecureContext', {
        value: true,
        writable: true,
      });

      await copyToClipboard('test text');

      expect(mockWriteText).toHaveBeenCalledWith('test text');
      expect(mockWriteText).toHaveBeenCalledTimes(1);
    });

    it('should handle multi-line text', async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: mockWriteText },
        writable: true,
      });
      Object.defineProperty(window, 'isSecureContext', {
        value: true,
        writable: true,
      });

      const multiLineText = 'line 1\nline 2\nline 3';
      await copyToClipboard(multiLineText);

      expect(mockWriteText).toHaveBeenCalledWith(multiLineText);
    });

    it('should handle special characters', async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: mockWriteText },
        writable: true,
      });
      Object.defineProperty(window, 'isSecureContext', {
        value: true,
        writable: true,
      });

      const specialText = 'Special: !@#$%^&*()[]{}|\\;:\'",.<>/?`~';
      await copyToClipboard(specialText);

      expect(mockWriteText).toHaveBeenCalledWith(specialText);
    });
  });

  describe('Fallback to execCommand', () => {
    it('should fall back to execCommand when clipboard API is not available', async () => {
      // Remove clipboard API
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
      });

      const mockExecCommand = vi.fn().mockReturnValue(true);
      document.execCommand = mockExecCommand;

      await copyToClipboard('fallback test');

      expect(mockExecCommand).toHaveBeenCalledWith('copy');
    });

    it('should fall back when not in secure context', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn() },
        writable: true,
      });
      Object.defineProperty(window, 'isSecureContext', {
        value: false,
        writable: true,
      });

      const mockExecCommand = vi.fn().mockReturnValue(true);
      document.execCommand = mockExecCommand;

      await copyToClipboard('insecure context test');

      expect(mockExecCommand).toHaveBeenCalledWith('copy');
    });

    it('should fall back when clipboard API throws error', async () => {
      const mockWriteText = vi.fn().mockRejectedValue(new Error('Permission denied'));
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: mockWriteText },
        writable: true,
      });
      Object.defineProperty(window, 'isSecureContext', {
        value: true,
        writable: true,
      });

      const mockExecCommand = vi.fn().mockReturnValue(true);
      document.execCommand = mockExecCommand;

      await copyToClipboard('error fallback test');

      expect(mockWriteText).toHaveBeenCalled();
      expect(mockExecCommand).toHaveBeenCalledWith('copy');
    });

    it('should create and remove textarea element during fallback', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
      });

      document.execCommand = vi.fn().mockReturnValue(true);

      const appendChildSpy = vi.spyOn(document.body, 'appendChild');
      const removeChildSpy = vi.spyOn(document.body, 'removeChild');

      await copyToClipboard('textarea test');

      expect(appendChildSpy).toHaveBeenCalled();
      expect(removeChildSpy).toHaveBeenCalled();

      const textAreaCall = appendChildSpy.mock.calls[0][0] as HTMLTextAreaElement;
      expect(textAreaCall.tagName).toBe('TEXTAREA');
      expect(textAreaCall.value).toBe('textarea test');
    });

    it('should position textarea off-screen', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
      });

      document.execCommand = vi.fn().mockReturnValue(true);

      const appendChildSpy = vi.spyOn(document.body, 'appendChild');

      await copyToClipboard('position test');

      const textArea = appendChildSpy.mock.calls[0][0] as HTMLTextAreaElement;
      expect(textArea.style.position).toBe('fixed');
      expect(textArea.style.left).toBe('-999999px');
      expect(textArea.style.top).toBe('-999999px');
      expect(textArea.style.opacity).toBe('0');
    });

    it('should reject when execCommand fails', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
      });

      document.execCommand = vi.fn().mockReturnValue(false);

      await expect(copyToClipboard('fail test')).rejects.toThrow('Copy command failed');
    });

    it('should reject when execCommand throws error', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
      });

      const error = new Error('execCommand error');
      document.execCommand = vi.fn().mockImplementation(() => {
        throw error;
      });

      await expect(copyToClipboard('error test')).rejects.toThrow('execCommand error');
    });

    it('should clean up textarea even when copy fails', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
      });

      document.execCommand = vi.fn().mockReturnValue(false);

      const removeChildSpy = vi.spyOn(document.body, 'removeChild');

      try {
        await copyToClipboard('cleanup test');
      } catch {
        // Expected to fail
      }

      expect(removeChildSpy).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string', async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: mockWriteText },
        writable: true,
      });
      Object.defineProperty(window, 'isSecureContext', {
        value: true,
        writable: true,
      });

      await copyToClipboard('');

      expect(mockWriteText).toHaveBeenCalledWith('');
    });

    it('should handle very long text', async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: mockWriteText },
        writable: true,
      });
      Object.defineProperty(window, 'isSecureContext', {
        value: true,
        writable: true,
      });

      const longText = 'a'.repeat(10000);
      await copyToClipboard(longText);

      expect(mockWriteText).toHaveBeenCalledWith(longText);
    });

    it('should handle text with Unicode characters', async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: mockWriteText },
        writable: true,
      });
      Object.defineProperty(window, 'isSecureContext', {
        value: true,
        writable: true,
      });

      const unicodeText = '你好 🌍 émojis ✓ ♠ ♣';
      await copyToClipboard(unicodeText);

      expect(mockWriteText).toHaveBeenCalledWith(unicodeText);
    });
  });
});
