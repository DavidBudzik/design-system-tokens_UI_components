// Utility to generate tokens.json for Figma plugin consumption
import { designSystemData } from '../data/designSystemData';
import { typographyData } from '../data/typographyData';
import { otherTokensData } from '../data/otherTokensData';
import type { Section } from '../data/designSystemData';

export interface TokensExport {
  sections: Section[];
  meta: {
    version: string;
    generatedAt: string;
    source: string;
  };
}

export function generateTokensJson(): TokensExport {
  return {
    sections: designSystemData.sections,
    meta: {
      version: '1.0.0',
      generatedAt: new Date().toISOString(),
      source: 'https://github.com/DavidBudzik/design-system-tokens_UI_components'
    }
  };
}

// Export to JSON string
export function exportTokensAsJson(): string {
  return JSON.stringify(generateTokensJson(), null, 2);
}
