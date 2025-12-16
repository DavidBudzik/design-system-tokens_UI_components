// Theme Palettes for Design System

export interface BaseColors {
  cta: string;
  primary: string;
  secondary: string;
  danger: string;
  success: string;
  warning: string;
  link: string;
  background: string;
  foreground: string;
}

export interface ThemePalette {
  name: string;
  baseColors: BaseColors;
}

export const themes: ThemePalette[] = [
  {
    name: "Default",
    baseColors: {
      cta: "#E03600",
      primary: "#242424",
      secondary: "#EDEDED",
      danger: "#E03636",
      success: "#1CD166",
      warning: "#FFB529",
      link: "#308FED",
      background: "#FFFFFF",
      foreground: "#171717"
    }
  },
  {
    name: "Ocean Blue",
    baseColors: {
      cta: "#0066CC",
      primary: "#1A1A2E",
      secondary: "#E8F4FD",
      danger: "#DC3545",
      success: "#28A745",
      warning: "#FFC107",
      link: "#0088CC",
      background: "#FFFFFF",
      foreground: "#1A1A2E"
    }
  },
  {
    name: "Forest Green",
    baseColors: {
      cta: "#2E7D32",
      primary: "#1B2E1B",
      secondary: "#E8F5E9",
      danger: "#C62828",
      success: "#43A047",
      warning: "#FF8F00",
      link: "#1565C0",
      background: "#FFFFFF",
      foreground: "#1B2E1B"
    }
  },
  {
    name: "Royal Purple",
    baseColors: {
      cta: "#7B1FA2",
      primary: "#2D1B4E",
      secondary: "#F3E5F5",
      danger: "#D32F2F",
      success: "#388E3C",
      warning: "#F9A825",
      link: "#5E35B1",
      background: "#FFFFFF",
      foreground: "#2D1B4E"
    }
  },
  {
    name: "Sunset Orange",
    baseColors: {
      cta: "#FF5722",
      primary: "#3E2723",
      secondary: "#FBE9E7",
      danger: "#B71C1C",
      success: "#1B5E20",
      warning: "#FF6F00",
      link: "#E65100",
      background: "#FFFFFF",
      foreground: "#3E2723"
    }
  },
  {
    name: "Midnight",
    baseColors: {
      cta: "#00BCD4",
      primary: "#0D1B2A",
      secondary: "#1B263B",
      danger: "#EF5350",
      success: "#66BB6A",
      warning: "#FFCA28",
      link: "#00ACC1",
      background: "#FFFFFF",
      foreground: "#0D1B2A"
    }
  }
];
