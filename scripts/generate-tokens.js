// Script to generate tokens.json for Figma plugin
// This runs during build to ensure tokens are always up-to-date

import { writeFileSync } from 'fs';
import { designSystemData } from '../src/data/designSystemData.ts';

const tokensExport = {
  sections: designSystemData.sections,
  meta: {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    source: 'https://github.com/DavidBudzik/design-system-tokens_UI_components',
    totalTokens: designSystemData.sections.reduce((sum, section) => sum + section.tokens.length, 0)
  }
};

// Write to public directory so it's served at /tokens.json
writeFileSync(
  './public/tokens.json',
  JSON.stringify(tokensExport, null, 2),
  'utf-8'
);

console.log(`✅ Generated tokens.json with ${tokensExport.meta.totalTokens} tokens`);
