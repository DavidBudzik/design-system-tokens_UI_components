export interface BaseColors {
  cta: string;
  primary: string;
  secondary: string;
  danger: string;
  success: string;
  warning: string;
  link: string;
  neutral: string;
}

export interface Theme {
  name: string;
  baseColors: BaseColors;
}

export const themes: Theme[] = [
  {
    name: "Default Orange",
    baseColors: {
      cta: "#E03600",
      primary: "#242424",
      secondary: "#EDEDED",
      danger: "#E03636",
      success: "#1CD166",
      warning: "#FFB529",
      link: "#308FED",
      neutral: "#8A8A8A",
    },
  },
  {
    name: "Ocean Blue",
    baseColors: {
      cta: "#007BFF",
      primary: "#2C3E50",
      secondary: "#F8F9FA",
      danger: "#DC3545",
      success: "#28A745",
      warning: "#FFC107",
      link: "#17A2B8",
      neutral: "#6C757D",
    },
  },
  {
    name: "Forest Green",
    baseColors: {
      cta: "#2A9D8F",
      primary: "#264653",
      secondary: "#F4A261",
      danger: "#E76F51",
      success: "#4CAF50",
      warning: "#E9C46A",
      link: "#2A9D8F",
      neutral: "#8E8E8E",
    },
  },
  {
    name: "Royal Purple",
    baseColors: {
      cta: "#6F42C1",
      primary: "#343A40",
      secondary: "#F8F9FA",
      danger: "#E03636",
      success: "#20C997",
      warning: "#FFC107",
      link: "#6F42C1",
      neutral: "#6C757D",
    },
  },
  {
    name: "Crimson Red",
    baseColors: {
      cta: "#D7263D",
      primary: "#02182B",
      secondary: "#F4F4F4",
      danger: "#D7263D",
      success: "#0197F6",
      warning: "#F2C40E",
      link: "#0197F6",
      neutral: "#737373",
    },
  },
  {
    name: "Sunny Yellow",
    baseColors: {
      cta: "#FFC700",
      primary: "#3A3A3A",
      secondary: "#FFFFFF",
      danger: "#FF4D4D",
      success: "#34C759",
      warning: "#FF9500",
      link: "#007AFF",
      neutral: "#8A8A8A",
    },
  },
];