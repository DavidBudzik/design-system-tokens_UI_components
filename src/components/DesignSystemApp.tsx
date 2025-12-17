import { useState, useEffect, lazy, Suspense, useMemo } from 'react';
import { Link } from 'react-router-dom';
import tinycolor from 'tinycolor2';
import { Palette, Sun, Moon, ChevronDown, Pipette, Check, ArrowLeft, BookOpen } from 'lucide-react';
import { TokenSection } from './TokenSection';
import { ExportDialog } from './ExportDialog';
import { TypographySection } from './TypographySection';
import { CollapsibleSection } from './CollapsibleSection';
import { CollapsibleGroup } from './CollapsibleGroup';
import { SideNav } from './SideNav';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Toaster } from './ui/sonner';
import { designSystemData as staticDesignSystemData } from '../data/designSystemData';
import { typographyData } from '../data/typographyData';
import { defaultOtherTokens, OtherTokens } from '../data/otherTokensData';
import { OtherTokenSection } from './OtherToken';
import { ComponentLoadingSkeleton } from './LoadingState';
import { themes as premadeThemes, BaseColors, ThemePalette } from '../data/themePalettes';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Logo } from './Logo';
import { DocumentationViewer } from './DocumentationViewer';

const ComponentsPage = lazy(() => import('./ComponentsPage'));
const AbleIconsGuide = lazy(() => import('./AbleIconsGuide').then(m => ({ default: m.default })));

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


export default function DesignSystemApp() {
  const [activeTab, setActiveTab] = useState('tokens');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [baseColors, setBaseColors] = useState<BaseColors>(() => {
    if (premadeThemes[0]?.baseColors) {
      return premadeThemes[0].baseColors;
    }
    return {
      cta: '#E03600',
      primary: '#242424',
      secondary: '#EDEDED',
      danger: '#E03636',
      success: '#1CD166',
      warning: '#FFB529',
      link: '#308FED',
      background: '#FFFFFF',
      foreground: '#171717',
    };
  });
  const [otherTokens, setOtherTokens] = useState<OtherTokens>(defaultOtherTokens);

  const designSystemData = useMemo(() => generateThemeFromBaseColors(baseColors, theme), [baseColors, theme]);

  // Helper function to check if a theme is currently selected
  const isThemeSelected = (themePalette: ThemePalette): boolean => {
    return (
      themePalette.baseColors.cta === baseColors.cta &&
      themePalette.baseColors.primary === baseColors.primary &&
      themePalette.baseColors.secondary === baseColors.secondary &&
      themePalette.baseColors.danger === baseColors.danger &&
      themePalette.baseColors.success === baseColors.success &&
      themePalette.baseColors.warning === baseColors.warning &&
      themePalette.baseColors.link === baseColors.link
    );
  };

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
        if (token.name === '--link-link-default') {
          root.style.setProperty('--link', token.hex);
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
      root.style.removeProperty('--link');
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
      <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-50 shadow-sm h-fit">
        <div className="w-full px-6 pt-4 h-[120px]">
          <div className="flex items-start justify-between gap-4 h-full">
            <div className="space-y-2 flex-1 h-full flex flex-col">
              <div className="flex items-center gap-4 h-[50px]">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <Logo baseColors={baseColors} className="w-10 h-10" />
                </div>
                <h1>Design Book</h1>
                {/* Back to Landing Page Link */}
                <Link 
                  to="/" 
                  className="ml-auto flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back to Home</span>
                </Link>
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
                      {premadeThemes.map((t: ThemePalette) => {
                        const isSelected = isThemeSelected(t);
                        return (
                          <button
                            key={t.name}
                            onClick={() => handleThemeSelect(t.name)}
                            className={`flex items-center justify-between gap-3 w-full px-2 py-2 rounded-md hover:bg-accent text-sm transition-colors ${
                              isSelected ? 'bg-accent' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3">
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
                            </div>
                            {isSelected && (
                              <Check className="h-4 w-4 text-primary flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
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

                {/* Divider */}
                <div className="w-px h-6 bg-border" />

                {/* Documentation Button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-9 w-9 p-0"
                      onClick={() => setIsDocsOpen(true)}
                      aria-label="Open documentation"
                    >
                      <BookOpen className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Documentation</p>
                  </TooltipContent>
                </Tooltip>

                {/* Export Button - only on tokens tab */}
                {activeTab === 'tokens' && (
                  <>
                    <div className="w-px h-6 bg-border" />
                    <ExportDialog sections={designSystemData.sections} />
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
            twoColumnLayout={true}
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
            twoColumnLayout={true}
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
          ) : activeTab === 'icons' ? (
            <Suspense fallback={<ComponentLoadingSkeleton />}>
              <AbleIconsGuide />
            </Suspense>
          ) : null}
        </main>
      </div>
      </div>

      {/* Documentation Dialog */}
      <DocumentationViewer isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
    </>
  );
}

