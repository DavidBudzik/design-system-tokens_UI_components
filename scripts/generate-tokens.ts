import { writeFileSync } from 'fs';
import { designSystemData } from '../src/data/designSystemData';

interface TokensExport {
  sections: typeof designSystemData.sections;
  meta: {
    version: string;
    generatedAt: string;
    source: string;
    totalTokens: number;
  };
}

const tokensExport: TokensExport = {
  sections: designSystemData.sections,
  meta: {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    source: 'https://github.com/DavidBudzik/design-system-tokens_UI_components',
    totalTokens: designSystemData.sections.reduce((sum, section) => sum + section.tokens.length, 0)
  }
};

// Write to public directory so it's served at /tokens.json
try {
  writeFileSync(
    './public/tokens.json',
    JSON.stringify(tokensExport, null, 2),
    'utf-8'
  );

  console.log(`✅ Generated tokens.json with ${tokensExport.meta.totalTokens} tokens`);
  console.log(`📁 Location: ./public/tokens.json`);
  console.log(`⏰ Generated at: ${tokensExport.meta.generatedAt}`);
} catch (error) {
  console.error('❌ Error generating tokens.json:', error);
  process.exit(1);
}
