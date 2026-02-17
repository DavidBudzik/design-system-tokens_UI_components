/**
 * Shared test fixtures for design system tests
 */
import { Token, Section } from '../data/designSystemData';

/** Fully-populated token with both light and dark values */
export const singleToken: Token = {
  name: '--cta-cta-default',
  hex: '#E03600',
  rgb: 'rgb(224, 54, 0)',
  darkHex: '#FF5C1A',
  darkRgb: 'rgb(255, 92, 26)',
};

/** Token missing dark mode values */
export const tokenMissingDark: Token = {
  name: '--test-no-dark',
  hex: '#0000FF',
  rgb: 'rgb(0, 0, 255)',
};

/** Token with empty light mode values (error case) */
export const tokenMissingLight: Token = {
  name: '--test-no-light',
  hex: '',
  rgb: '',
  darkHex: '#FF0000',
  darkRgb: 'rgb(255, 0, 0)',
};

/** Dark light-mode color (average RGB < 128) — ensureDarkModeColors should lighten */
export const darkColorToken: Token = {
  name: '--test-dark-color',
  hex: '#1A1A1A',
  rgb: 'rgb(26, 26, 26)',
};

/** Light light-mode color (average RGB >= 128) — ensureDarkModeColors should darken */
export const lightColorToken: Token = {
  name: '--test-light-color',
  hex: '#E0E0E0',
  rgb: 'rgb(224, 224, 224)',
};

/** Section with empty tokens array */
export const emptySection: Section = {
  title: 'Empty Section',
  description: 'A section with no tokens.',
  tokens: [],
};

/** Reusable test sections for export format tests */
export const testSections: Section[] = [
  {
    title: 'Call-to-Action (CTA)',
    description: 'Primary action colors with interactive states.',
    tokens: [
      {
        name: '--cta-cta-default',
        hex: '#E03600',
        rgb: 'rgb(224, 54, 0)',
        darkHex: '#FF5C1A',
        darkRgb: 'rgb(255, 92, 26)',
      },
      {
        name: '--cta-cta-hover',
        hex: '#FA4D1A',
        rgb: 'rgb(250, 77, 26)',
        darkHex: '#FF7038',
        darkRgb: 'rgb(255, 112, 56)',
      },
    ],
  },
  {
    title: 'Primary',
    description: 'Core primary colors for main interface elements.',
    tokens: [
      {
        name: '--primary-primary-default',
        hex: '#242424',
        rgb: 'rgb(36, 36, 36)',
        darkHex: '#E0E0E0',
        darkRgb: 'rgb(224, 224, 224)',
      },
    ],
  },
];

/** Section with a token that has no dark values */
export const sectionWithMixedTokens: Section = {
  title: 'Mixed',
  description: 'Tokens with and without dark mode.',
  tokens: [
    {
      name: '--mixed-with-dark',
      hex: '#FF0000',
      rgb: 'rgb(255, 0, 0)',
      darkHex: '#00FF00',
      darkRgb: 'rgb(0, 255, 0)',
    },
    {
      name: '--mixed-without-dark',
      hex: '#0000FF',
      rgb: 'rgb(0, 0, 255)',
    },
  ],
};
