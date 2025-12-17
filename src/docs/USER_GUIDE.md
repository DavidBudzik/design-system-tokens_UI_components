# Design Book - Complete User Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Navigation](#navigation)
4. [Design Tokens](#design-tokens)
5. [UI Components](#ui-components)
6. [Icons Library](#icons-library)
7. [Theme Management](#theme-management)
8. [Exporting Tokens](#exporting-tokens)
9. [Keyboard Shortcuts](#keyboard-shortcuts)
10. [Tips & Best Practices](#tips--best-practices)
11. [Troubleshooting](#troubleshooting)

---

## Introduction

**Design Book** is a comprehensive design system documentation and token management application. It serves as a bridge between design (Figma) and development, providing an interactive showcase for design tokens and UI components with multi-format export capabilities.

### What is Design Book?

Design Book helps you:
- **Explore** your complete design token system (colors, typography, spacing, etc.)
- **Preview** UI components in real-time with live token updates
- **Export** tokens in multiple formats for different platforms
- **Manage** themes and switch between light/dark modes
- **Document** your design system for your team

### Key Concepts

- **Design Tokens**: Atomic design values (colors, spacing, typography) stored as platform-agnostic data
- **Components**: Reusable UI elements built from tokens
- **Themes**: Collections of tokens that define a complete visual style
- **Exports**: Platform-specific code generated from your tokens

---

## Getting Started

### First Launch

1. **Landing Page**: When you first open Design Book, you'll see the landing page with an overview of the system
2. **Launch App**: Click the "Launch App" or "Open Project" button to enter the main application
3. **Explore**: Use the navigation sidebar to explore different sections

### Main Interface Overview

The main application consists of:

- **Header**: Contains tabs (Tokens, Components, Icons), theme controls, and export options
- **Sidebar Navigation**: Collapsible groups for quick navigation to specific sections
- **Main Content Area**: Scrollable area displaying tokens, components, or icons
- **Toolbar**: Theme palette selector, color picker, dark mode toggle, and export button

---

## Navigation

### Top Navigation Tabs

The header contains three main tabs:

1. **Tokens Tab** (`/app` - default)
   - View all design tokens (colors, typography, spacing, etc.)
   - Edit token values
   - Export tokens

2. **Components Tab**
   - Browse 60+ UI components
   - See interactive examples
   - View component states and variants

3. **Icons Tab**
   - Explore the complete icon library
   - Search and filter icons
   - Copy icon names and codes

### Sidebar Navigation

The left sidebar provides quick access to specific sections:

- **Collapsible Groups**: Click group titles to expand/collapse
- **Section Links**: Click any item to scroll to that section
- **Auto-Expand**: Closed sections automatically open when navigated to
- **Mobile Menu**: On mobile devices, use the hamburger menu button (top-left) to open/close the sidebar

### Navigation Tips

- Use the sidebar for quick navigation within a tab
- Sections are organized by category (Colors, Typography, Buttons, etc.)
- The sidebar highlights your current position as you scroll
- On mobile, the sidebar overlays the content and can be dismissed by clicking outside

---

## Design Tokens

### Color Tokens

Color tokens are organized into semantic categories:

#### Primary Colors
- **CTA (Call-to-Action)**: Primary action buttons and links
- **Primary**: Main brand color
- **Secondary**: Secondary actions and surfaces
- **Danger**: Error states and destructive actions
- **Success**: Positive feedback and confirmations
- **Warning**: Cautionary states
- **Link**: Hyperlink colors

#### Surface Colors
- **Surface**: Container backgrounds with multiple variants (default, light, muted, subtle, elevated)
- **Surface - Input**: Input field backgrounds with interactive states
- **Background**: Page-level backgrounds

#### Semantic Colors
- **Border**: Border colors for outlines and dividers
- **Text**: Text colors for different contexts (primary, muted, subtle, disabled)
- **Icons**: Icon colors for different backgrounds

#### Complementary Colors
- **Strong (1-20)**: Vibrant accent colors for emphasis
- **Subtle (1-20)**: Soft, muted accent colors for backgrounds
- **Dark**: Dark accent colors for contrast

#### Viewing Color Tokens

1. Navigate to the **Tokens** tab
2. Expand any color category in the sidebar
3. Click on a color section to view all tokens in that category
4. Each token displays:
   - Color swatch (updates with theme)
   - Token name (CSS variable format)
   - Hex value
   - RGB value
   - Copy button

#### Editing Color Tokens

1. Click the **color picker icon** (pipette) in the header toolbar
2. Select a color from the palette or enter a hex value
3. Changes apply immediately to all components using that token
4. The theme automatically generates related states (hover, active, disabled)

### Typography Tokens

Typography tokens define text styles:

#### Heading System
- **Display**: Large hero text (32px)
- **Heading 1-6**: Hierarchical headings (24px, 20px, 16px, etc.)
- **Decorative**: Styled headings with special formatting

#### Text System
- **Body**: Default body text (14px)
- **Small**: Smaller body text (12px)
- **Strong**: Emphasized text with bold weight

#### Link Styles
- **Default**: Standard link appearance
- **Hover**: Hover state styling
- **Visited**: Visited link styling

#### Label Styles
- **Labels**: Form labels and helper text (12px)

#### Viewing Typography Tokens

1. Navigate to **Typography System** in the sidebar
2. Expand sections to see all typography styles
3. Each style shows:
   - Live preview with sample text
   - Font family, size, weight, line height
   - Usage guidelines

### Spacing Tokens

Spacing tokens define consistent spacing throughout the system:

- **Scale**: 0-40px in 4px increments
- **Usage**: Margins, padding, gaps between elements
- **Format**: CSS values (rem, px, or custom units)

#### Viewing Spacing Tokens

1. Navigate to **Other Tokens** → **Spacing Scale**
2. See visual representations of each spacing value
3. View the CSS variable name and computed value

#### Editing Spacing Tokens

1. Click on any spacing token value
2. Enter a new value (supports px, rem, em, etc.)
3. Changes apply immediately

### Border Radius Tokens

Border radius tokens define corner rounding:

- **Values**: none, xs, sm, md, lg, xl, 2xl, full
- **Usage**: Buttons, cards, inputs, and other rounded elements

### Border Width Tokens

Border width tokens define stroke thickness:

- **Values**: none, thin, base, md, lg, xl
- **Usage**: Outlines, dividers, and borders

### Shadow Tokens

Shadow tokens define elevation and depth:

- **Values**: sm, md, lg, xl, 2xl
- **Usage**: Cards, modals, dropdowns, and elevated elements

---

## UI Components

### Component Library Overview

Design Book includes 60+ components built on Radix UI primitives and styled with your design tokens. All components are:

- **Accessible**: WCAG-compliant with keyboard navigation
- **Responsive**: Mobile-first design
- **Themeable**: Automatically adapt to your token values
- **Interactive**: Live examples you can interact with

### Component Categories

#### Buttons
- **Primary Button (CTA)**: Main call-to-action buttons
- **All Button States**: Default, hover, active, disabled, loading
- **Individual Variants**: Primary, secondary, outline, ghost, link
- **Buttons with Icons**: Icon placement and sizing

#### Form Inputs
- **Text Input**: Standard text fields with labels and validation
- **Search Input**: Search fields with icons and clear buttons

#### Form Controls
- **Checkbox**: Single and multiple selection
- **Switch (Toggle)**: On/off controls
- **Radio Button**: Single selection from a group

#### Dropdowns & Menus
- **Select Dropdown**: Single and multi-select dropdowns
- **Dropdown Menu**: Context menus with icons and separators
- **Menus with Icons**: Navigation menus with visual indicators

#### Date & Time
- **Calendar**: Date picker with month/year navigation

#### Dialogs & Alerts
- **Confirmation Dialog**: Modal dialogs with actions

#### Notifications
- **Toast Messages**: Non-intrusive notifications

#### Chat Input Interface
- **Explore Mode**: Advanced chat input with actions
- **General Mode**: Standard chat input interface

#### Bulk Actions
- **Bulk Action Panel**: Multi-select action interface

### Viewing Components

1. Navigate to the **Components** tab
2. Use the sidebar to find specific components
3. Each component section includes:
   - Live interactive example
   - Code snippet (click to copy)
   - Variants and states
   - Usage guidelines

### Component States

Most interactive components demonstrate multiple states:

- **Default**: Normal appearance
- **Hover**: Mouse over state
- **Active**: Clicked/pressed state
- **Focus**: Keyboard focus state (with focus ring)
- **Disabled**: Non-interactive state
- **Loading**: Async operation state

### Using Components in Your Code

1. View the component example
2. Click the **code icon** to view the code snippet
3. Copy the code to your clipboard
4. Import the component from `@/components/ui/[component-name]`
5. Use the component with your design tokens

---

## Icons Library

### Icon Categories

Icons are organized into logical categories:

- **Core Actions**: Primary user actions (save, delete, edit, etc.)
- **Navigation**: Navigation and wayfinding icons
- **File & Data Management**: File operations and data handling
- **Research & Analysis**: Research and analytics icons
- **Content Types**: Different content format icons
- **Status & Feedback**: Status indicators and feedback icons
- **Collaboration & Users**: User and team collaboration icons
- **Data Sources**: Data source and integration icons
- **Specialized Tools**: Specialized application icons

### Viewing Icons

1. Navigate to the **Icons** tab
2. Browse by category in the sidebar
3. Each icon displays:
   - Visual preview
   - Icon name
   - Usage context
   - Copy functionality

### Using Icons

Icons are from the **Able Icons** library. To use them:

1. Find the icon you need
2. Copy the icon name or code
3. Import from your icon library
4. Use with appropriate sizing (16px, 20px, 24px recommended)

---

## Theme Management

### Understanding Themes

A theme is a complete collection of design tokens that define your visual style. Design Book supports:

- **Light Mode**: Default light theme
- **Dark Mode**: Dark theme with inverted colors
- **Custom Themes**: Pre-made theme palettes you can switch between

### Switching Themes

#### Light/Dark Mode Toggle

1. Click the **sun/moon icon** in the header toolbar
2. The entire interface switches between light and dark modes
3. All tokens and components update automatically

#### Theme Palette Selector

1. Click the **palette icon** in the header toolbar
2. Select a pre-made theme from the dropdown
3. The theme applies immediately with all related tokens

### Customizing Themes

#### Changing Base Colors

1. Click the **color picker** (pipette icon) next to the palette selector
2. Choose a new CTA (Call-to-Action) color
3. The system automatically generates:
   - Related color states (hover, active, disabled)
   - Contrast-adjusted text colors
   - Compatible surface colors

#### How Theme Generation Works

When you change a base color, Design Book:

1. **Generates States**: Creates hover, active, and disabled variants
2. **Adjusts Contrast**: Ensures text meets WCAG AA accessibility standards
3. **Updates Surfaces**: Generates compatible background colors
4. **Maintains Relationships**: Keeps semantic relationships between colors

### Pre-made Themes

Design Book includes several pre-made themes:

- **Default**: Original design system colors
- **Custom**: Your modified theme
- Additional themes may be available

Each theme includes:
- Complete color palette
- Typography settings
- Spacing and sizing
- Border and shadow definitions

---

## Exporting Tokens

### Export Formats

Design Book supports exporting tokens in multiple formats:

#### Web Formats
- **CSS Variables**: Modern CSS custom properties
- **SCSS Variables**: Sass/SCSS variables
- **LESS Variables**: LESS preprocessor variables
- **JavaScript Object**: Plain JavaScript object
- **TypeScript**: TypeScript with type definitions
- **Tailwind Config**: Tailwind CSS configuration

#### Native Formats
- **iOS Swift**: UIColor constants for Swift
- **Android XML**: Resource XML for Android
- **Android Kotlin**: Kotlin constants

#### Design Tools
- **Figma Tokens JSON**: Format compatible with Figma Tokens plugin

### How to Export

1. Navigate to the **Tokens** tab
2. Click the **Export** button in the header toolbar
3. Select your desired format from the dropdown
4. The code is displayed in a dialog
5. Click **Copy** to copy to clipboard
6. Paste into your project files

### Export Options

- **Include All Tokens**: Export complete token set
- **Selected Category**: Export only specific token categories (if available)
- **Format-Specific Options**: Some formats have additional options

### Using Exported Tokens

#### CSS Variables
```css
:root {
  --cta-cta-default: #E03600;
  --primary-primary-default: #242424;
  /* ... */
}
```

#### JavaScript/TypeScript
```typescript
export const tokens = {
  cta: {
    default: '#E03600',
    hover: '#FA4D1A',
    // ...
  }
};
```

#### Tailwind Config
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        cta: {
          default: '#E03600',
          // ...
        }
      }
    }
  }
};
```

---

## Keyboard Shortcuts

### Navigation
- **Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons and links
- **Escape**: Close dialogs and menus
- **Arrow Keys**: Navigate dropdowns and menus

### Actions
- **Ctrl/Cmd + C**: Copy selected text or code
- **Ctrl/Cmd + K**: Open command palette (if available)
- **Ctrl/Cmd + /**: Toggle sidebar (if available)

### Accessibility
- **Tab**: Move focus forward
- **Shift + Tab**: Move focus backward
- **Enter**: Activate focused element
- **Space**: Toggle checkboxes and switches

---

## Tips & Best Practices

### Working with Tokens

1. **Start with Base Colors**: Define your primary colors first, then let the system generate related tokens
2. **Test Contrast**: Always verify text contrast meets accessibility standards (WCAG AA minimum)
3. **Use Semantic Names**: Token names should describe purpose, not appearance (e.g., `--cta-cta-default` not `--red-button`)
4. **Maintain Relationships**: Keep related tokens together (e.g., all button states in one section)

### Using Components

1. **Follow Patterns**: Use components as shown in examples for consistency
2. **Respect States**: Always implement all interactive states (hover, active, focus, disabled)
3. **Accessibility First**: Ensure keyboard navigation and screen reader support
4. **Mobile Responsive**: Test components on mobile devices

### Theme Management

1. **Test Both Modes**: Always preview your design in both light and dark modes
2. **Check Contrast**: Dark mode requires different contrast ratios
3. **Export Regularly**: Export tokens after making changes to preserve your work
4. **Document Customizations**: Note any manual token adjustments

### Performance

1. **Lazy Loading**: Components are loaded on-demand for better performance
2. **Token Caching**: Token values are cached for faster updates
3. **Export Only When Needed**: Large exports may take a moment to generate

---

## Troubleshooting

### Common Issues

#### Colors Not Updating
- **Solution**: Refresh the page or clear browser cache
- **Check**: Ensure you're on the Tokens tab when making changes
- **Verify**: Check that CSS variables are being applied in browser DevTools

#### Components Not Displaying
- **Solution**: Check browser console for errors
- **Check**: Ensure all dependencies are installed
- **Verify**: Try refreshing the page

#### Export Not Working
- **Solution**: Ensure you're on the Tokens tab
- **Check**: Try a different export format
- **Verify**: Check browser console for errors

#### Dark Mode Not Switching
- **Solution**: Check that the theme toggle is working
- **Check**: Verify CSS variables are updating in DevTools
- **Verify**: Clear browser cache and refresh

#### Sidebar Not Visible
- **Solution**: On mobile, click the hamburger menu button
- **Check**: Ensure screen width is sufficient (sidebar hides on very small screens)
- **Verify**: Try resizing the browser window

### Browser Compatibility

Design Book works best in:
- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)

### Getting Help

If you encounter issues:

1. **Check Console**: Open browser DevTools (F12) and check for errors
2. **Clear Cache**: Clear browser cache and refresh
3. **Update Browser**: Ensure you're using a recent browser version
4. **Report Issues**: Contact the design system team or file an issue in the repository

### Performance Issues

If the app is slow:

1. **Close Other Tabs**: Reduce browser memory usage
2. **Disable Extensions**: Some browser extensions can slow down apps
3. **Check Network**: Ensure stable internet connection
4. **Clear Cache**: Clear browser cache and cookies

---

## Advanced Features

### Token Relationships

Design Book automatically maintains relationships between tokens:

- **Color States**: Hover, active, and disabled states are generated from base colors
- **Contrast Adjustment**: Text colors automatically adjust for accessibility
- **Surface Variants**: Surface colors are generated from background colors
- **Theme Consistency**: All tokens update together when switching themes

### Custom Token Values

You can manually edit token values:

1. Click on any editable token value
2. Enter a new value
3. The system validates and applies the change
4. Related tokens may update automatically

### Component Customization

While viewing components:

1. Inspect the code snippet
2. Modify props and styles as needed
3. Copy the customized code
4. Use in your project

### Export Customization

Some export formats support customization:

- **Variable Naming**: Choose naming conventions
- **Value Format**: Select units (px, rem, etc.)
- **Comments**: Include/exclude documentation comments

---

## Glossary

- **Design Token**: A named design decision stored as data
- **CSS Variable**: A CSS custom property (e.g., `--color-primary`)
- **Component**: A reusable UI element built from tokens
- **Theme**: A collection of tokens that define a visual style
- **Semantic Token**: A token named by purpose, not appearance
- **Primitive Token**: A base token value (e.g., a color hex code)
- **WCAG**: Web Content Accessibility Guidelines
- **CTA**: Call-to-Action (primary action button/link)

---

## Additional Resources

### Related Documentation
- [README.md](../README.md) - Project overview and setup
- [GUIDELINES.md](../GUIDELINES.md) - Design system guidelines
- [IMPROVEMENTS.md](../IMPROVEMENTS.md) - Known improvements and roadmap

### External Resources
- [Figma Design System](https://www.figma.com/design/UwgyI4j4KDwMU8U4EiCg0p/Able_Design-System-Tokens) - Original Figma project
- [Radix UI](https://www.radix-ui.com/) - Component primitives
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards

---

## Version Information

- **App Version**: 0.1.0
- **Last Updated**: December 2024
- **React Version**: 18.3.1
- **TypeScript Version**: 5.3.3

---

*This documentation is continuously updated. For the latest information, check the repository or contact the design system team.*

