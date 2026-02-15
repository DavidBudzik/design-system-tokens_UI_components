// Design Book Token Importer - Figma Plugin
// Fetches design tokens from GitHub Pages and creates Figma Variables

const TOKENS_URL = 'https://davidbudzik.github.io/design-system-tokens_UI_components/tokens.json';

interface Token {
  name: string;
  hex: string;
  rgb: string;
  darkHex?: string;
  darkRgb?: string;
}

interface Section {
  title: string;
  description: string;
  tokens: Token[];
}

interface TokenData {
  sections: Section[];
}

// Show UI
figma.showUI(__html__, { width: 400, height: 600 });

// Listen for messages from UI
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'import-tokens') {
    try {
      figma.ui.postMessage({ type: 'status', message: 'Fetching tokens from Design Book...' });

      // Fetch tokens from GitHub Pages
      const response = await fetch(TOKENS_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch tokens: ${response.statusText}`);
      }

      const data: TokenData = await response.json();
      figma.ui.postMessage({ type: 'status', message: `Found ${data.sections.length} token sections` });

      // Create or get existing variable collection
      let collection = figma.variables.getLocalVariableCollections().find(
        c => c.name === 'Design Book Tokens'
      );

      if (!collection) {
        collection = figma.variables.createVariableCollection('Design Book Tokens');
        figma.ui.postMessage({ type: 'status', message: 'Created variable collection' });
      }

      // Set up modes for light and dark themes
      const modes = collection.modes;
      let lightModeId = modes[0].modeId;
      let darkModeId: string;

      if (modes.length === 1) {
        // Rename default mode to "Light"
        collection.renameMode(lightModeId, 'Light');
        // Add dark mode
        darkModeId = collection.addMode('Dark');
      } else {
        // Use existing modes
        lightModeId = modes.find(m => m.name === 'Light')?.modeId || modes[0].modeId;
        darkModeId = modes.find(m => m.name === 'Dark')?.modeId || modes[1].modeId;
      }

      figma.ui.postMessage({ type: 'status', message: 'Set up Light/Dark modes' });

      // Import tokens as variables
      let totalTokens = 0;
      const existingVariables = figma.variables.getLocalVariables();

      for (const section of data.sections) {
        for (const token of section.tokens) {
          // Clean token name: remove -- prefix
          const varName = token.name.replace(/^--/, '');

          // Check if variable already exists
          let variable = existingVariables.find(v => v.name === varName);

          if (!variable) {
            // Create new variable
            variable = figma.variables.createVariable(varName, collection.id, 'COLOR');
          }

          // Set light mode value
          const lightColor = hexToRgb(token.hex);
          if (lightColor) {
            variable.setValueForMode(lightModeId, lightColor);
          }

          // Set dark mode value
          const darkColor = token.darkHex ? hexToRgb(token.darkHex) : lightColor;
          if (darkColor) {
            variable.setValueForMode(darkModeId, darkColor);
          }

          // Set description
          variable.description = section.description;

          totalTokens++;
        }
      }

      figma.ui.postMessage({
        type: 'success',
        message: `✅ Successfully imported ${totalTokens} tokens as Figma Variables!`
      });

    } catch (error) {
      figma.ui.postMessage({
        type: 'error',
        message: `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  } else if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};

// Helper function to convert hex to Figma RGB
function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;

  return {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  };
}
