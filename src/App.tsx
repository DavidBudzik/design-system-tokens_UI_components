import { useState, useEffect, lazy, Suspense, useMemo } from 'react';
import tinycolor from 'tinycolor2';
import { Palette, Sun, Moon, ChevronDown, Pipette } from 'lucide-react';
import { TokenSection } from './components/TokenSection';
import { ExportDialog } from './components/ExportDialog';
import { TypographySection } from './components/TypographySection';
import { CollapsibleSection } from './components/CollapsibleSection';
import { CollapsibleGroup } from './components/CollapsibleGroup';
import { SideNav } from './components/SideNav';
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs';
import { Toaster } from './components/ui/sonner';
import { designSystemData as staticDesignSystemData } from './data/designSystemData';
import { typographyData } from './data/typographyData';
import { defaultOtherTokens, OtherTokens } from './data/otherTokensData';
import { OtherTokenSection } from './components/OtherToken';
import { ComponentLoadingSkeleton } from './components/LoadingState';
import { themes as premadeThemes, BaseColors, ThemePalette } from './data/themePalettes';
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover';
import { Button } from './components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip';

const ComponentsPage = lazy(() => import('./components/ComponentsPage'));
const AbleIconsGuide = lazy(() => import('./components/AbleIconsGuide').then(m => ({ default: m.default })));

const oldDesignSystemData = {
  sections: [
    {
      title: "🎯 Call-to-Action (CTA)",
      description: "Primary action colors with interactive states.",
      tokens: [
        { name: "--cta-cta-default", hex: "#E03600", rgb: "rgb(224, 54, 0)" },
        { name: "--cta-cta-hover", hex: "#FA4D1A", rgb: "rgb(250, 77, 26)" },
        { name: "--cta-cta-active", hex: "#C22E00", rgb: "rgb(194, 46, 0)" },
        { name: "--cta-cta-disabled", hex: "#FFD4C2", rgb: "rgb(255, 212, 194)" },
      ]
    },
    {
      title: "⚫ Primary",
      description: "Core primary colors for main interface elements.",
      tokens: [
        { name: "--primary-primary-default", hex: "#242424", rgb: "rgb(36, 36, 36)" },
        { name: "--primary-primary-hover", hex: "#616161", rgb: "rgb(97, 97, 97)" },
        { name: "--primary-primary-active", hex: "#474747", rgb: "rgb(71, 71, 71)" },
        { name: "--primary-primary-disabled", hex: "#BDBDBD", rgb: "rgb(189, 189, 189)" },
      ]
    },
    {
      title: "⚪ Secondary",
      description: "Secondary action and surface colors.",
      tokens: [
        { name: "--secondary-secondary-default", hex: "#EDEDED", rgb: "rgb(237, 237, 237)" },
        { name: "--secondary-secondary-hover", hex: "#DEDEDE", rgb: "rgb(222, 222, 222)" },
        { name: "--secondary-secondary-active", hex: "#E6E6E6", rgb: "rgb(230, 230, 230)" },
        { name: "--secondary-secondary-disabled", hex: "#F5F5F5", rgb: "rgb(245, 245, 245)" },
      ]
    },
    {
      title: "🔴 Danger",
      description: "Error and destructive action colors.",
      tokens: [
        { name: "--danger-danger-default", hex: "#E03636", rgb: "rgb(224, 54, 54)" },
        { name: "--danger-danger-hover", hex: "#FF5C5C", rgb: "rgb(255, 92, 92)" },
        { name: "--danger-danger-active", hex: "#AB2424", rgb: "rgb(171, 36, 36)" },
        { name: "--danger-danger-disabled", hex: "#F7B0B0", rgb: "rgb(247, 176, 176)" },
      ]
    },
    {
      title: "🟢 Success",
      description: "Success and positive feedback colors.",
      tokens: [
        { name: "--success-success-default", hex: "#1CD166", rgb: "rgb(28, 209, 102)" },
        { name: "--success-success-hover", hex: "#47E38C", rgb: "rgb(71, 227, 140)" },
        { name: "--success-success-active", hex: "#12994A", rgb: "rgb(18, 153, 74)" },
        { name: "--success-success-disabled", hex: "#A6F5CC", rgb: "rgb(166, 245, 204)" },
      ]
    },
    {
      title: "🟡 Warning",
      description: "Warning and cautionary colors.",
      tokens: [
        { name: "--warning-warning-default", hex: "#FFB529", rgb: "rgb(255, 181, 41)" },
        { name: "--warning-warning-hover", hex: "#FFD65C", rgb: "rgb(255, 214, 92)" },
        { name: "--warning-warning-active", hex: "#B87D14", rgb: "rgb(184, 125, 20)" },
        { name: "--warning-warning-disabled", hex: "#FFF0BF", rgb: "rgb(255, 240, 191)" },
      ]
    },
    {
      title: "🔗 Link",
      description: "Hyperlink and navigation colors.",
      tokens: [
        { name: "--link-link-default", hex: "#308FED", rgb: "rgb(48, 143, 237)" },
        { name: "--link-link-hover", hex: "#529EFC", rgb: "rgb(82, 158, 252)" },
        { name: "--link-link-active", hex: "#267DE0", rgb: "rgb(38, 125, 224)" },
        { name: "--link-link-visited", hex: "#1C5C9E", rgb: "rgb(28, 92, 158)" },
      ]
    },
    {
      title: "🎨 Surface",
      description: "Surface and container background colors.",
      tokens: [
        { name: "--surface-surface-default", hex: "#FFFFFF", rgb: "rgb(255, 255, 255)" },
        { name: "--surface-surface-light", hex: "#FAFAFA", rgb: "rgb(250, 250, 250)" },
        { name: "--surface-surface-muted", hex: "#F5F5F5", rgb: "rgb(245, 245, 245)" },
        { name: "--surface-surface-subtle", hex: "#F0F0F0", rgb: "rgb(240, 240, 240)" },
        { name: "--surface-surface-elevated", hex: "#E0E0E0", rgb: "rgb(224, 224, 224)" },
      ]
    },
    {
      title: "📄 Surface - Input",
      description: "Input field surface colors with states.",
      tokens: [
        { name: "--surface-surface-input-default", hex: "#F7F7F7", rgb: "rgb(247, 247, 247)" },
        { name: "--surface-surface-input-hover", hex: "#E8E8E8", rgb: "rgb(232, 232, 232)" },
        { name: "--surface-surface-input-active", hex: "#F0F0F0", rgb: "rgb(240, 240, 240)" },
        { name: "--surface-surface-input-disabled", hex: "#F0F0F0", rgb: "rgb(240, 240, 240)" },
      ]
    },
    {
      title: "🖼️ Background",
      description: "Page and container backgrounds.",
      tokens: [
        { name: "--background-background-default", hex: "#FFFFFF", rgb: "rgb(255, 255, 255)" },
        { name: "--background-background-inverted", hex: "#171717", rgb: "rgb(23, 23, 23)" },
      ]
    },
    {
      title: "📐 Border",
      description: "Border colors with interactive states.",
      tokens: [
        { name: "--border-border-default", hex: "#E0E0E0", rgb: "rgb(224, 224, 224)" },
        { name: "--border-border-hover", hex: "#B8B8B8", rgb: "rgb(184, 184, 184)" },
        { name: "--border-border-active", hex: "#858585", rgb: "rgb(133, 133, 133)" },
        { name: "--border-border-disabled", hex: "#C9C9C9", rgb: "rgb(201, 201, 201)" },
        { name: "--border-border-error", hex: "#E03636", rgb: "rgb(224, 54, 54)" },
      ]
    },
    {
      title: "📝 Text",
      description: "Text colors for various contexts.",
      tokens: [
        { name: "--text-text-primary", hex: "#171717", rgb: "rgb(23, 23, 23)" },
        { name: "--text-text-inverted", hex: "#FFFFFF", rgb: "rgb(255, 255, 255)" },
        { name: "--text-text-on-dark", hex: "#FFFFFF", rgb: "rgb(255, 255, 255)" },
        { name: "--text-text-muted", hex: "#595959", rgb: "rgb(89, 89, 89)" },
        { name: "--text-text-subtle", hex: "#A1A1A1", rgb: "rgb(161, 161, 161)" },
        { name: "--text-text-disabled", hex: "#C9C9C9", rgb: "rgb(201, 201, 201)" },
      ]
    },
    {
      title: "🎭 Icons",
      description: "Icon colors for different backgrounds.",
      tokens: [
        { name: "--icons-icon-default", hex: "#4F4F4F", rgb: "rgb(79, 79, 79)" },
        { name: "--icons-icon-disabled", hex: "#BDBDBD", rgb: "rgb(189, 189, 189)" },
        { name: "--icons-icon-on-dark", hex: "#FCFCFC", rgb: "rgb(252, 252, 252)" },
        { name: "--icons-icon-on-bright", hex: "#FCFCFC", rgb: "rgb(252, 252, 252)" },
        { name: "--icons-icon-subtle", hex: "#BDBDBD", rgb: "rgb(189, 189, 189)" },
      ]
    },
    {
      title: "🌈 Complementary - Strong (1-10)",
      description: "Vibrant accent colors for emphasis and decoration.",
      tokens: [
        { name: "--strong-01", hex: "#FFA354", rgb: "rgb(255, 163, 84)" },
        { name: "--strong-02", hex: "#FFD98A", rgb: "rgb(255, 217, 138)" },
        { name: "--strong-03", hex: "#70EBAB", rgb: "rgb(112, 235, 171)" },
        { name: "--strong-04", hex: "#69CCFF", rgb: "rgb(105, 204, 255)" },
        { name: "--strong-05", hex: "#D4B3F7", rgb: "rgb(212, 179, 247)" },
        { name: "--strong-06", hex: "#FF94C4", rgb: "rgb(255, 148, 196)" },
        { name: "--strong-07", hex: "#FF8787", rgb: "rgb(255, 135, 135)" },
        { name: "--strong-08", hex: "#B8A6F7", rgb: "rgb(184, 166, 247)" },
        { name: "--strong-09", hex: "#4FE0C9", rgb: "rgb(79, 224, 201)" },
        { name: "--strong-10", hex: "#FF8AB5", rgb: "rgb(255, 138, 181)" },
      ]
    },
    {
      title: "🌈 Complementary - Strong (11-20)",
      description: "Additional vibrant accent colors.",
      tokens: [
        { name: "--strong-11", hex: "#BDABA3", rgb: "rgb(189, 171, 163)" },
        { name: "--strong-12", hex: "#B3C7A6", rgb: "rgb(179, 199, 166)" },
        { name: "--strong-13", hex: "#E6F57D", rgb: "rgb(230, 245, 125)" },
        { name: "--strong-14", hex: "#45E0F5", rgb: "rgb(69, 224, 245)" },
        { name: "--strong-15", hex: "#FF9C73", rgb: "rgb(255, 156, 115)" },
        { name: "--strong-16", hex: "#FFF061", rgb: "rgb(255, 240, 97)" },
        { name: "--strong-17", hex: "#73E88A", rgb: "rgb(115, 232, 138)" },
        { name: "--strong-18", hex: "#4AB8F7", rgb: "rgb(74, 184, 247)" },
        { name: "--strong-19", hex: "#E05291", rgb: "rgb(224, 82, 145)" },
        { name: "--strong-20", hex: "#E8B5FF", rgb: "rgb(232, 181, 255)" },
      ]
    },
    {
      title: "🎨 Complementary - Subtle (1-10)",
      description: "Soft, muted accent colors for backgrounds.",
      tokens: [
        { name: "--subtle-01", hex: "#FFEDDB", rgb: "rgb(255, 237, 219)" },
        { name: "--subtle-02", hex: "#FFF5DE", rgb: "rgb(255, 245, 222)" },
        { name: "--subtle-03", hex: "#E0FAED", rgb: "rgb(224, 250, 237)" },
        { name: "--subtle-04", hex: "#E0F5FF", rgb: "rgb(224, 245, 255)" },
        { name: "--subtle-05", hex: "#F5F0FF", rgb: "rgb(245, 240, 255)" },
        { name: "--subtle-06", hex: "#FFEDF5", rgb: "rgb(255, 237, 245)" },
        { name: "--subtle-07", hex: "#FFEBEB", rgb: "rgb(255, 235, 235)" },
        { name: "--subtle-08", hex: "#F2EDFF", rgb: "rgb(242, 237, 255)" },
        { name: "--subtle-09", hex: "#E6FAF7", rgb: "rgb(230, 250, 247)" },
        { name: "--subtle-10", hex: "#FFF0F5", rgb: "rgb(255, 240, 245)" },
      ]
    },
    {
      title: "🎨 Complementary - Subtle (11-20)",
      description: "Additional soft accent colors.",
      tokens: [
        { name: "--subtle-11", hex: "#F5F2F2", rgb: "rgb(245, 242, 242)" },
        { name: "--subtle-12", hex: "#F2F5F2", rgb: "rgb(242, 245, 242)" },
        { name: "--subtle-13", hex: "#FAFCEB", rgb: "rgb(250, 252, 235)" },
        { name: "--subtle-14", hex: "#E6FAFF", rgb: "rgb(230, 250, 255)" },
        { name: "--subtle-15", hex: "#FFF2EB", rgb: "rgb(255, 242, 235)" },
        { name: "--subtle-16", hex: "#FFFFED", rgb: "rgb(255, 255, 237)" },
        { name: "--subtle-17", hex: "#E8FAF0", rgb: "rgb(232, 250, 240)" },
        { name: "--subtle-18", hex: "#E6F5FF", rgb: "rgb(230, 245, 255)" },
        { name: "--subtle-19", hex: "#FCEDF2", rgb: "rgb(252, 237, 242)" },
        { name: "--subtle-20", hex: "#FAF2FF", rgb: "rgb(250, 242, 255)" },
      ]
    },
    {
      title: "⚫ Complementary - Dark",
      description: "Dark accent colors for contrast.",
      tokens: [
        { name: "--dark-02", hex: "#A86B00", rgb: "rgb(168, 107, 0)" },
        { name: "--dark-04", hex: "#00669C", rgb: "rgb(0, 102, 156)" },
        { name: "--dark-05", hex: "#573D96", rgb: "rgb(87, 61, 150)" },
        { name: "--dark-06", hex: "#C44580", rgb: "rgb(196, 69, 128)" },
      ]
    },
  ]
};

/**
 * Ensures that the contrast between a text color and its background meets WCAG AA standards.
 * @param textColor The initial text color.
 * @param backgroundColor The background color.
 * @returns A new text color that meets the contrast requirement.
 */
const ensureContrast = (textColor: tinycolor.Instance, backgroundColor: tinycolor.Instance): tinycolor.Instance => {
  const a11yTextColor = textColor.clone();
  // Check if the contrast is sufficient. We check for small text size for the most stringent requirement.
  if (tinycolor.isReadable(a11yTextColor, backgroundColor, { level: "AA", size: "small" })) {
    return a11yTextColor;
  }

  // If not, determine if we need to lighten or darken the text.
  const shouldLighten = backgroundColor.isDark();
  let i = 0;
  while (!tinycolor.isReadable(a11yTextColor, backgroundColor, { level: "AA", size: "small" }) && i < 100) {
    if (shouldLighten) {
      a11yTextColor.lighten(2);
    } else {
      a11yTextColor.darken(2);
    }
    i++;
  }
  return a11yTextColor;
};

const generateThemeFromBaseColors = (baseColors: BaseColors, theme: 'light' | 'dark') => {
  const cta = tinycolor(baseColors.cta);
  const primary = tinycolor(baseColors.primary);
  const danger = tinycolor(baseColors.danger);
  const success = tinycolor(baseColors.success);
  const warning = tinycolor(baseColors.warning);
  const link = tinycolor(baseColors.link);
  const isDark = theme === 'dark';

  // Grayscale palette generation
  const background = isDark ? tinycolor(baseColors.foreground) : tinycolor(baseColors.background);
  const foreground = isDark ? tinycolor(baseColors.background) : tinycolor(baseColors.foreground);

  const newSections = JSON.parse(JSON.stringify(staticDesignSystemData.sections));

  const updateTokens = (sectionTitle: string, newColors: { [key: string]: string }, darkColors?: { [key: string]: string }) => {
    const section = newSections.find((s: any) => s.title.includes(sectionTitle));
    if (section) {
      section.tokens.forEach((token: any) => {
        const state = token.name.split('-').pop();
        if (state && newColors[state]) {
          const color = tinycolor(newColors[state]);
          token.hex = color.toHexString();
          token.rgb = color.toRgbString();
          
          // Always set dark mode colors too
          if (darkColors && darkColors[state]) {
            const darkColor = tinycolor(darkColors[state]);
            token.darkHex = darkColor.toHexString();
            token.darkRgb = darkColor.toRgbString();
          } else {
            // If dark colors not explicitly provided, generate them
            // For light colors, make them lighter; for dark colors, make them darker
            const isDarkColor = color.isDark();
            const darkColor = isDarkColor ? color.clone().lighten(15) : color.clone().darken(5);
            token.darkHex = darkColor.toHexString();
            token.darkRgb = darkColor.toRgbString();
          }
        }
      });
    }
  };

  updateTokens("Call-to-Action", {
    default: cta.toHexString(),
    hover: cta.clone().lighten(10).toHexString(),
    active: cta.clone().darken(10).toHexString(),
    disabled: cta.clone().lighten(35).desaturate(30).toHexString(),
  });

  updateTokens("Primary", {
    default: primary.toHexString(),
    hover: primary.clone().lighten(20).toHexString(),
    active: primary.clone().lighten(10).toHexString(),
    disabled: primary.clone().lighten(40).desaturate(10).toHexString(),
  });
  
  updateTokens("Danger", {
    default: danger.toHexString(),
    hover: danger.clone().lighten(10).toHexString(),
    active: danger.clone().darken(10).toHexString(),
    disabled: danger.clone().lighten(30).desaturate(40).toHexString(),
  });

  updateTokens("Success", {
    default: success.toHexString(),
    hover: success.clone().lighten(10).toHexString(),
    active: success.clone().darken(10).toHexString(),
    disabled: success.clone().lighten(30).desaturate(40).toHexString(),
  });

  updateTokens("Warning", {
    default: warning.toHexString(),
    hover: warning.clone().lighten(10).toHexString(),
    active: warning.clone().darken(10).toHexString(),
    disabled: warning.clone().lighten(25).desaturate(30).toHexString(),
  });

  updateTokens("Link", {
    default: link.toHexString(),
    hover: link.clone().lighten(10).toHexString(),
    active: link.clone().darken(5).toHexString(),
    visited: link.clone().darken(20).toHexString(),
  });

  // Generate and apply grayscale palette
  const textOnDefaultSurface = ensureContrast(foreground, background);

  updateTokens("Text", {
    primary: textOnDefaultSurface.toHexString(),
    inverted: background.toHexString(),
    "on-dark": background.toHexString(),
    muted: ensureContrast(tinycolor.mix(foreground, background, 60), background).toHexString(),
    subtle: ensureContrast(tinycolor.mix(foreground, background, 75), background).toHexString(),
    disabled: ensureContrast(tinycolor.mix(foreground, background, 85), background).toHexString(),
  });

  updateTokens("Surface", {
    default: background.toHexString(),
    light: isDark ? background.clone().lighten(2).toHexString() : tinycolor.mix(background, foreground, 2).toHexString(),
    muted: isDark ? background.clone().lighten(4).toHexString() : tinycolor.mix(background, foreground, 4).toHexString(),
    subtle: isDark ? background.clone().lighten(6).toHexString() : tinycolor.mix(background, foreground, 6).toHexString(),
    elevated: isDark ? background.clone().lighten(10).toHexString() : tinycolor.mix(background, foreground, 10).toHexString(),
  });

  updateTokens("Surface - Input", {
    default: tinycolor.mix(background, foreground, 3).toHexString(),
    hover: tinycolor.mix(background, foreground, 8).toHexString(),
    active: tinycolor.mix(background, foreground, 5).toHexString(),
    disabled: tinycolor.mix(background, foreground, 3).toHexString(),
  });

  updateTokens("Background", {
    default: background.toHexString(),
    inverted: foreground.toHexString(),
  });

  updateTokens("Border", {
    default: tinycolor.mix(background, foreground, 12).toHexString(),
    hover: tinycolor.mix(background, foreground, 25).toHexString(),
    active: tinycolor.mix(background, foreground, 40).toHexString(),
    disabled: tinycolor.mix(background, foreground, 15).toHexString(),
    error: danger.toHexString(),
  });

  updateTokens("Icons", {
    default: tinycolor.mix(foreground, background, 45).toHexString(),
    disabled: tinycolor.mix(foreground, background, 80).toHexString(),
    "on-dark": tinycolor.mix(background, foreground, 5).toHexString(),
    "on-bright": tinycolor.mix(background, foreground, 5).toHexString(),
    subtle: tinycolor.mix(foreground, background, 80).toHexString(),
  });

  // Note: Complementary colors are not derived from base colors in this logic.
  // They are meant to be distinct accent palettes.

  return { sections: newSections };
};


export default function App() {
  const [activeTab, setActiveTab] = useState('tokens');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [baseColors, setBaseColors] = useState<BaseColors>(premadeThemes[0].baseColors);
  const [otherTokens, setOtherTokens] = useState<OtherTokens>(defaultOtherTokens);

  const designSystemData = useMemo(() => generateThemeFromBaseColors(baseColors, theme), [baseColors, theme]);

  const handleThemeSelect = (themeName: string) => {
    const selectedTheme = premadeThemes.find((t: ThemePalette) => t.name === themeName);
    if (selectedTheme) {
      setBaseColors(selectedTheme.baseColors);
    }
  };

  const handleColorChange = (colorName: keyof BaseColors, value: string) => {
    setBaseColors((prev: BaseColors) => ({ ...prev, [colorName]: value }));
  };

  // Handler for updating other tokens (spacing, radius, border, shadow)
  const handleOtherTokenUpdate = (category: keyof OtherTokens, name: string, value: string) => {
    setOtherTokens((prev: OtherTokens) => ({
      ...prev,
      [category]: prev[category].map((token) =>
        token.name === name ? { ...token, value } : token
      ),
    }));
  };
  
  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Apply dynamic colors as CSS variables
    const root = document.documentElement;
    designSystemData.sections.forEach((section: { tokens: { name: string; hex: string }[] }) => {
      section.tokens.forEach((token: { name: string; hex: string }) => {
        root.style.setProperty(token.name, token.hex);
        
        // Also update shorthand variables for Tailwind utilities
        if (token.name === '--cta-cta-default') {
          root.style.setProperty('--cta', token.hex);
        }
        if (token.name === '--danger-danger-default') {
          root.style.setProperty('--danger', token.hex);
        }
        if (token.name === '--success-success-default') {
          root.style.setProperty('--success', token.hex);
        }
        if (token.name === '--warning-warning-default') {
          root.style.setProperty('--warning', token.hex);
        }
        if (token.name === '--primary-primary-default') {
          root.style.setProperty('--primary', token.hex);
        }
      });
    });

    // Apply other tokens (spacing, radius, border, shadow) as CSS variables
    Object.values(otherTokens).flat().forEach((token) => {
      root.style.setProperty(token.cssVar, token.value);
    });

    // This is a cleanup function to remove the styles when the component unmounts
    return () => {
      designSystemData.sections.forEach((section: { tokens: { name: string }[] }) => {
        section.tokens.forEach((token: { name: string }) => root.style.removeProperty(token.name));
      });
      // Clean up other tokens
      Object.values(otherTokens).flat().forEach((token) => {
        root.style.removeProperty(token.cssVar);
      });
      // Clean up shorthand variables
      root.style.removeProperty('--cta');
      root.style.removeProperty('--danger');
      root.style.removeProperty('--success');
      root.style.removeProperty('--warning');
      root.style.removeProperty('--primary');
    };
  }, [theme, designSystemData, otherTokens]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Navigation structure for tokens page
  const tokensNavGroups = [
    {
      title: 'Colors',
      icon: 'palette',
      items: designSystemData.sections.map((section: { title: string }) => ({
        id: section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        label: section.title.replace(/^[^\s]+ /, '') // Remove emoji
      }))
    },
    {
      title: 'Typography',
      icon: 'pencil',
      items: [
        { id: 'typography-headings', label: 'Heading System' },
        { id: 'typography-decorative', label: 'Heading - Decorative' },
        { id: 'typography-text', label: 'Text System' },
        { id: 'typography-links', label: 'Link Styles' },
        { id: 'typography-labels', label: 'Label Styles' }
      ]
    },
    {
      title: 'Other Tokens',
      icon: 'zap',
      items: [
        { id: 'spacing-tokens', label: 'Spacing Scale' },
        { id: 'radius-tokens', label: 'Border Radius' },
        { id: 'border-width-tokens', label: 'Border Width' },
        { id: 'shadow-tokens', label: 'Shadows' }
      ]
    }
  ];

  // Navigation structure for components page
  const componentsNavGroups = [
    {
      title: 'Buttons',
      icon: 'circle',
      items: [
        { id: 'button-primary', label: 'Primary Button (CTA)' },
        { id: 'button-states', label: 'All Button States' },
        { id: 'button-variants', label: 'Individual Variants' },
        { id: 'button-icons', label: 'Buttons with Icons' }
      ]
    },
    {
      title: 'Chat Input Interface',
      icon: 'message-square',
      items: [
        { id: 'chat-input-explore', label: 'Explore Mode' },
        { id: 'chat-input-general', label: 'General Mode' }
      ]
    },
    {
      title: 'Form Inputs',
      icon: 'pencil',
      items: [
        { id: 'input-text', label: 'Text Input' },
        { id: 'input-search', label: 'Search Input' }
      ]
    },
    {
      title: 'Dropdowns & Menus',
      icon: 'menu',
      items: [
        { id: 'dropdown-select', label: 'Select Dropdown' },
        { id: 'dropdown-menu', label: 'Dropdown Menu' },
        { id: 'menu-with-icons', label: 'Menus with Icons' }
      ]
    },
    {
      title: 'Form Controls',
      icon: 'check-square',
      items: [
        { id: 'control-checkbox', label: 'Checkbox' },
        { id: 'control-switch', label: 'Switch (Toggle)' },
        { id: 'control-radio', label: 'Radio Button' }
      ]
    },
    {
      title: 'Date & Time',
      icon: 'calendar',
      items: [
        { id: 'calendar', label: 'Calendar' }
      ]
    },
    {
      title: 'Dialogs & Alerts',
      icon: 'alert-triangle',
      items: [
        { id: 'dialog-confirmation', label: 'Confirmation Dialog' }
      ]
    },
    {
      title: 'Notifications',
      icon: 'bell',
      items: [
        { id: 'toast-notifications', label: 'Toast Messages' }
      ]
    },
    {
      title: 'Bulk Actions',
      icon: 'zap',
      items: [
        { id: 'bulk-action-panel', label: 'Bulk Action Panel' }
      ]
    }
  ];

  // Navigation structure for icons page
  const iconsNavGroups = [
    {
      title: 'Icon Categories',
      icon: 'grid',
      items: [
        { id: 'core-actions', label: 'Core Actions' },
        { id: 'navigation', label: 'Navigation' },
        { id: 'file---data-management', label: 'File & Data Management' },
        { id: 'research---analysis', label: 'Research & Analysis' },
        { id: 'content-types', label: 'Content Types' },
        { id: 'status---feedback', label: 'Status & Feedback' },
        { id: 'collaboration---users', label: 'Collaboration & Users' },
        { id: 'data-sources', label: 'Data Sources' },
        { id: 'specialized-tools', label: 'Specialized Tools' }
      ]
    }
  ];

  const currentNavGroups = activeTab === 'tokens' 
    ? tokensNavGroups 
    : activeTab === 'components' 
    ? componentsNavGroups 
    : iconsNavGroups;

  return (
    <>
      <Toaster position="top-right" />
      <div className="h-screen bg-background flex flex-col overflow-hidden">
        {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-50 shadow-sm h-28">
        <div className="w-full px-6 py-4 h-full">
          <div className="flex items-start justify-between gap-4 h-full">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-4">
                {/* Logo Placeholder */}
                <div 
                  className="w-10 h-10 rounded bg-muted border border-border flex items-center justify-center flex-shrink-0"
                  aria-label="Logo placeholder"
                >
                  <span className="text-xs text-muted-foreground">Logo</span>
                </div>
                <h1>Design Book</h1>
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="inline-block">
                <TabsList className="h-9">
                  <TabsTrigger value="tokens" className="px-4">Tokens</TabsTrigger>
                  <TabsTrigger value="components" className="px-4">Components</TabsTrigger>
                  <TabsTrigger value="icons" className="px-4">Icons</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Actions Toolbar - Unified compact design */}
            <TooltipProvider delayDuration={300}>
              <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/50 border border-border">
                {/* Theme Palette Selector */}
                <Popover>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-9 gap-2 px-3">
                          <Palette className="h-4 w-4" />
                          <span className="hidden sm:inline text-sm">{premadeThemes.find((t: ThemePalette) => 
                            t.baseColors.cta === baseColors.cta && 
                            t.baseColors.primary === baseColors.primary
                          )?.name || 'Custom'}</span>
                          <ChevronDown className="h-3 w-3 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Theme palette</p>
                    </TooltipContent>
                  </Tooltip>
                  <PopoverContent className="w-56 p-2" align="end">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground px-2 py-1">Pre-made Palettes</p>
                      {premadeThemes.map((t: ThemePalette) => (
                        <button
                          key={t.name}
                          onClick={() => handleThemeSelect(t.name)}
                          className="flex items-center gap-3 w-full px-2 py-2 rounded-md hover:bg-accent text-sm transition-colors"
                        >
                          <div className="flex gap-0.5">
                            <div 
                              className="w-4 h-4 rounded-l-sm" 
                              style={{ backgroundColor: t.baseColors.cta }} 
                            />
                            <div 
                              className="w-4 h-4" 
                              style={{ backgroundColor: t.baseColors.primary }} 
                            />
                            <div 
                              className="w-4 h-4 rounded-r-sm" 
                              style={{ backgroundColor: t.baseColors.success }} 
                            />
                          </div>
                          <span>{t.name}</span>
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Divider */}
                <div className="w-px h-6 bg-border" />

                {/* CTA Color Picker */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Button variant="ghost" size="sm" className="h-9 gap-2 px-3">
                        <Pipette className="h-4 w-4" />
                        <div 
                          className="w-5 h-5 rounded border border-border shadow-sm" 
                          style={{ backgroundColor: baseColors.cta }}
                        />
                      </Button>
                      <input
                        type="color"
                        value={baseColors.cta}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleColorChange('cta', e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        aria-label="Pick CTA color"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>CTA color</p>
                  </TooltipContent>
                </Tooltip>

                {/* Divider */}
                <div className="w-px h-6 bg-border" />

                {/* Light/Dark Mode Toggle */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-9 w-9 p-0"
                      onClick={toggleTheme}
                      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                    >
                      {theme === 'light' ? (
                        <Moon className="h-4 w-4" />
                      ) : (
                        <Sun className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{theme === 'light' ? 'Dark mode' : 'Light mode'}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Export Button - only on tokens tab */}
                {activeTab === 'tokens' && (
                  <>
                    <div className="w-px h-6 bg-border" />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <ExportDialog sections={designSystemData.sections} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Export tokens</p>
                      </TooltipContent>
                    </Tooltip>
                  </>
                )}
              </div>
            </TooltipProvider>
          </div>
        </div>
      </header>

      {/* Main Layout Container - below header */}
      <div className="flex flex-1 pt-28 h-screen">
        {/* Side Navigation */}
        <SideNav groups={currentNavGroups} />

        {/* Main Content - scrollable */}
        <main className="flex-1 overflow-y-auto lg:ml-80 w-full">
          {activeTab === 'tokens' ? (
            <div className="w-full px-6 py-6 max-w-none">
        <div className="space-y-6">
          {/* Color Tokens Group */}
          <CollapsibleGroup
            title="Color Tokens"
            description="Interactive color tokens with states, surfaces, and complementary palettes."
            icon="palette"
          >
            {designSystemData.sections.map((section: { title: string; description: string; tokens: { name: string; hex: string; rgb: string; darkHex?: string; darkRgb?: string }[] }, index: number) => {
              const sectionId = section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return (
                <CollapsibleSection
                  key={index}
                  id={sectionId}
                  title={section.title}
                  description={section.description}
                  hint={`Click to view ${section.tokens.length} color token${section.tokens.length !== 1 ? 's' : ''}`}
                  defaultOpen={index < 3}
                >
                  <TokenSection
                    title=""
                    description=""
                    tokens={section.tokens}
                  />
                </CollapsibleSection>
              );
            })}
          </CollapsibleGroup>

          {/* Typography Group */}
          <CollapsibleGroup
            title="Typography System"
            description="Comprehensive typography scale with headings, body text, links, and labels."
            icon="pencil"
            className="mt-12 pt-8 border-t-2 border-border"
          >
            <CollapsibleSection
              id="typography-headings"
              title="Heading System"
              hint={`Click to view ${typographyData.headings.length} heading styles`}
              defaultOpen={true}
            >
              <TypographySection 
                title="" 
                items={typographyData.headings} 
              />
            </CollapsibleSection>

            <CollapsibleSection
              id="typography-decorative"
              title="Heading - Decorative"
              hint="Click to view 5 decorative heading styles"
            >
              <TypographySection 
                title="" 
                items={typographyData.text.slice(0, 5)} 
              />
            </CollapsibleSection>

            <CollapsibleSection
              id="typography-text"
              title="Text System"
              hint={`Click to view ${typographyData.text.length - 5} text styles`}
            >
              <TypographySection 
                title="" 
                items={typographyData.text.slice(5)} 
              />
            </CollapsibleSection>

            <CollapsibleSection
              id="typography-links"
              title="Link Styles"
              hint={`Click to view ${typographyData.links.length} link styles with hover states`}
            >
              <TypographySection 
                title="" 
                items={typographyData.links} 
              />
            </CollapsibleSection>

            <CollapsibleSection
              id="typography-labels"
              title="Label Styles"
              hint={`Click to view ${typographyData.labels.length} label styles`}
            >
              <TypographySection 
                title="" 
                items={typographyData.labels} 
              />
            </CollapsibleSection>
          </CollapsibleGroup>

          {/* Non-Color Tokens Group */}
          <CollapsibleGroup
            title="Other Tokens"
            description="Spacing, border radius, and border width design tokens."
            icon="zap"
            className="mt-12 pt-8 border-t-2 border-border"
          >
            <CollapsibleSection
              id="spacing-tokens"
              title="Spacing Scale"
              description="Consistent spacing tokens for margins, padding, and gaps"
              hint={`Click to view ${otherTokens.spacing.length} spacing tokens`}
              defaultOpen={true}
            >
              <OtherTokenSection
                title="Spacing"
                tokens={otherTokens.spacing}
                type="spacing"
                onUpdate={(name, value) => handleOtherTokenUpdate('spacing', name, value)}
              />
            </CollapsibleSection>

            <CollapsibleSection
              id="radius-tokens"
              title="Border Radius"
              description="Corner radius tokens for rounded elements"
              hint={`Click to view ${otherTokens.radius.length} radius tokens`}
              defaultOpen={false}
            >
              <OtherTokenSection
                title="Border Radius"
                tokens={otherTokens.radius}
                type="radius"
                onUpdate={(name, value) => handleOtherTokenUpdate('radius', name, value)}
              />
            </CollapsibleSection>

            <CollapsibleSection
              id="border-width-tokens"
              title="Border Width"
              description="Border thickness tokens for outlines and dividers"
              hint={`Click to view ${otherTokens.borderWidth.length} border width tokens`}
              defaultOpen={false}
            >
              <OtherTokenSection
                title="Border Width"
                tokens={otherTokens.borderWidth}
                type="borderWidth"
                onUpdate={(name, value) => handleOtherTokenUpdate('borderWidth', name, value)}
              />
            </CollapsibleSection>

            <CollapsibleSection
              id="shadow-tokens"
              title="Shadows"
              description="Box shadow tokens for elevation and depth"
              hint={`Click to view ${otherTokens.shadow.length} shadow tokens`}
              defaultOpen={false}
            >
              <OtherTokenSection
                title="Shadows"
                tokens={otherTokens.shadow}
                type="shadow"
                onUpdate={(name, value) => handleOtherTokenUpdate('shadow', name, value)}
              />
            </CollapsibleSection>
          </CollapsibleGroup>
        </div>
            </div>
          ) : activeTab === 'components' ? (
            <Suspense fallback={<ComponentLoadingSkeleton />}>
              <ComponentsPage />
            </Suspense>
          ) : (
            <Suspense fallback={<ComponentLoadingSkeleton />}>
              <AbleIconsGuide />
            </Suspense>
          )}
        </main>
      </div>
      </div>
    </>
  );
}
