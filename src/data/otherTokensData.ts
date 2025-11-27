export interface SpacingToken {
  name: string;
  value: string;
  cssVar: string;
}

export interface RadiusToken {
  name: string;
  value: string;
  cssVar: string;
}

export interface BorderWidthToken {
  name: string;
  value: string;
  cssVar: string;
}

export interface ShadowToken {
  name: string;
  value: string;
  cssVar: string;
}

export interface OtherTokens {
  spacing: SpacingToken[];
  radius: RadiusToken[];
  borderWidth: BorderWidthToken[];
  shadow: ShadowToken[];
}

export const defaultOtherTokens: OtherTokens = {
  spacing: [
    { name: 'spacing-0', value: '0', cssVar: '--spacing-0' },
    { name: 'spacing-1', value: '2px', cssVar: '--spacing-1' },
    { name: 'spacing-2', value: '4px', cssVar: '--spacing-2' },
    { name: 'spacing-3', value: '8px', cssVar: '--spacing-3' },
    { name: 'spacing-4', value: '12px', cssVar: '--spacing-4' },
    { name: 'spacing-5', value: '16px', cssVar: '--spacing-5' },
    { name: 'spacing-6', value: '20px', cssVar: '--spacing-6' },
    { name: 'spacing-7', value: '24px', cssVar: '--spacing-7' },
    { name: 'spacing-8', value: '28px', cssVar: '--spacing-8' },
    { name: 'spacing-9', value: '32px', cssVar: '--spacing-9' },
    { name: 'spacing-10', value: '40px', cssVar: '--spacing-10' },
  ],
  radius: [
    { name: 'radius-none', value: '0', cssVar: '--radius-none' },
    { name: 'radius-xs', value: '2px', cssVar: '--radius-xs' },
    { name: 'radius-sm', value: '4px', cssVar: '--radius-sm' },
    { name: 'radius-md', value: '8px', cssVar: '--radius-md' },
    { name: 'radius-lg', value: '16px', cssVar: '--radius-lg' },
    { name: 'radius-xl', value: '24px', cssVar: '--radius-xl' },
    { name: 'radius-2xl', value: '32px', cssVar: '--radius-2xl' },
    { name: 'radius-full', value: '9999px', cssVar: '--radius-full' },
  ],
  borderWidth: [
    { name: 'border-none', value: '0', cssVar: '--border-none' },
    { name: 'border-thin', value: '1px', cssVar: '--border-thin' },
    { name: 'border-base', value: '1.5px', cssVar: '--border-base' },
    { name: 'border-md', value: '2px', cssVar: '--border-md' },
    { name: 'border-lg', value: '3px', cssVar: '--border-lg' },
    { name: 'border-xl', value: '4px', cssVar: '--border-xl' },
  ],
  shadow: [
    { name: 'shadow-none', value: 'none', cssVar: '--shadow-none' },
    { name: 'shadow-xs', value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', cssVar: '--shadow-xs' },
    { name: 'shadow-sm', value: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)', cssVar: '--shadow-sm' },
    { name: 'shadow-md', value: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)', cssVar: '--shadow-md' },
    { name: 'shadow-lg', value: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)', cssVar: '--shadow-lg' },
    { name: 'shadow-xl', value: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', cssVar: '--shadow-xl' },
    { name: 'shadow-2xl', value: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', cssVar: '--shadow-2xl' },
    { name: 'shadow-inner', value: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)', cssVar: '--shadow-inner' },
  ],
};
