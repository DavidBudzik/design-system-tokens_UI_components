/**
 * Copy text to clipboard with fallback for environments where Clipboard API is blocked
 * @param text - The text to copy to clipboard
 * @returns Promise that resolves when copy is complete
 */
export async function copyToClipboard(text: string): Promise<void> {
  // Try modern Clipboard API first, but fall back immediately if it fails
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (err) {
      // Clipboard API failed (likely permissions policy), fall through to legacy method
      console.log('Clipboard API blocked, using fallback method');
    }
  }
  
  // Fallback: Use legacy execCommand method with textarea
  return new Promise<void>((resolve, reject) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make the textarea invisible and position it off-screen
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.style.opacity = '0';
    textArea.style.pointerEvents = 'none';
    
    document.body.appendChild(textArea);
    
    try {
      textArea.focus();
      textArea.select();
      
      // Try to select the text for iOS devices
      textArea.setSelectionRange(0, text.length);
      
      // Execute the copy command
      const successful = document.execCommand('copy');
      
      if (successful) {
        resolve();
      } else {
        reject(new Error('Copy command failed'));
      }
    } catch (err) {
      reject(err);
    } finally {
      document.body.removeChild(textArea);
    }
  });
}
