import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { copyToClipboard } from '../utils/clipboard';

describe('copyToClipboard', () => {
  let originalClipboard: Clipboard;

  beforeEach(() => {
    originalClipboard = navigator.clipboard;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // Restore original clipboard
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      writable: true,
      configurable: true,
    });
  });

  describe('when Clipboard API is available', () => {
    it('calls navigator.clipboard.writeText with the provided text', async () => {
      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: writeTextMock },
        writable: true,
        configurable: true,
      });
      Object.defineProperty(window, 'isSecureContext', {
        value: true,
        configurable: true,
      });

      await copyToClipboard('test text');
      expect(writeTextMock).toHaveBeenCalledWith('test text');
    });

    it('resolves without error on success', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn().mockResolvedValue(undefined) },
        writable: true,
        configurable: true,
      });
      Object.defineProperty(window, 'isSecureContext', {
        value: true,
        configurable: true,
      });

      await expect(copyToClipboard('hello')).resolves.toBeUndefined();
    });
  });

  describe('when Clipboard API is unavailable', () => {
    it('falls back to execCommand when navigator.clipboard is undefined', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
        configurable: true,
      });
      // execCommand may not exist in jsdom, so define it
      document.execCommand = vi.fn().mockReturnValue(true);

      await copyToClipboard('fallback text');
      expect(document.execCommand).toHaveBeenCalledWith('copy');
    });

    it('creates and removes a temporary textarea', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
        configurable: true,
      });
      document.execCommand = vi.fn().mockReturnValue(true);

      const initialTextareas = document.querySelectorAll('textarea').length;
      await copyToClipboard('temp text');
      const afterTextareas = document.querySelectorAll('textarea').length;
      expect(afterTextareas).toBe(initialTextareas);
    });
  });

  describe('when Clipboard API throws', () => {
    it('falls back to execCommand method', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn().mockRejectedValue(new Error('Permission denied')) },
        writable: true,
        configurable: true,
      });
      Object.defineProperty(window, 'isSecureContext', {
        value: true,
        configurable: true,
      });
      document.execCommand = vi.fn().mockReturnValue(true);

      await copyToClipboard('fallback');
      expect(document.execCommand).toHaveBeenCalledWith('copy');
    });
  });

  describe('when execCommand fails', () => {
    it('rejects when execCommand returns false', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
        configurable: true,
      });
      document.execCommand = vi.fn().mockReturnValue(false);

      await expect(copyToClipboard('fail')).rejects.toThrow('Copy command failed');
    });

    it('rejects when execCommand throws', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
        configurable: true,
      });
      document.execCommand = vi.fn().mockImplementation(() => {
        throw new Error('execCommand error');
      });

      await expect(copyToClipboard('error')).rejects.toThrow('execCommand error');
    });
  });
});
