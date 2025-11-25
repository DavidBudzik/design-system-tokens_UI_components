import { useState, useEffect } from "react";
import { TokenSection } from "./components/TokenSection";
import { ExportDialog } from "./components/ExportDialog";
import { TypographySection } from "./components/TypographySection";
import { CollapsibleSection } from "./components/CollapsibleSection";
import { CollapsibleGroup } from "./components/CollapsibleGroup";
import { SideNav } from "./components/SideNav";
import { ComponentsPage } from "./components/ComponentsPage";
import AbleIconsGuide from "./components/AbleIconsGuide";
import { ThemeToggle } from "./components/ThemeToggle";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./components/ui/tabs";
import { Toaster } from "./components/ui/sonner";
import { designSystemData } from "./data/designSystemData";

const typographyData = {
  headings: [
    {
      label: "Heading 5XL - Semi bold",
      tokenName: "heading_5xl_semi-bold--system",
      description: "Large headlines mostly for web",
      fontSize: "72px",
      lineHeight: "80px",
      letterSpacing: "-1px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Heading 4XL - Semi bold",
      tokenName: "heading_4xl_semi-bold--system",
      description: "Large headlines mostly for web",
      fontSize: "64px",
      lineHeight: "72px",
      letterSpacing: "-1px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Heading 3XL - Semi bold",
      tokenName: "heading_3xl_semi-bold--system",
      description: "Large headlines mostly for web",
      fontSize: "56px",
      lineHeight: "64px",
      letterSpacing: "-1px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Heading 2XL - Semi bold",
      tokenName: "heading_2xl_semi-bold--system",
      description: "Large headlines mostly for web",
      fontSize: "48px",
      lineHeight: "56px",
      letterSpacing: "-1px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Heading XL - Semi bold",
      tokenName: "heading_xl_semi-bold--system",
      description: "Large headlines mostly for web",
      fontSize: "40px",
      lineHeight: "48px",
      letterSpacing: "-1px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Heading L - Semi bold",
      tokenName: "heading_l_semi-bold--system",
      description: "Large headlines mostly for web",
      fontSize: "32px",
      lineHeight: "40px",
      letterSpacing: "-1px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Heading M - Semi bold",
      tokenName: "heading_m_semi-bold--system",
      description: "Page headline",
      fontSize: "24px",
      lineHeight: "32px",
      letterSpacing: "-0.5px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Heading S - Semi bold",
      tokenName: "heading_s_semi-bold--system",
      description: "Side bar headline",
      fontSize: "20px",
      lineHeight: "28px",
      letterSpacing: "-0.5px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Heading XS - Semi bold",
      tokenName: "heading_xs_semi-bold--system",
      description: "Modal/dialog headline",
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "-0.5px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Heading XXS - Semi bold",
      tokenName: "heading_xxs_semi-bold--system",
      description: "Data table headlines",
      fontSize: "14px",
      lineHeight: "20px",
      letterSpacing: "0px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
  ],
  text: [
    {
      label: "Heading 5XL - Light",
      tokenName: "heading_5xl_light--system",
      description: "Large headlines mostly for web",
      fontSize: "72px",
      lineHeight: "80px",
      letterSpacing: "-1px",
      fontWeight: "300",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Heading 4XL - Light",
      tokenName: "heading_4xl_light--system",
      description: "Large headlines mostly for web",
      fontSize: "64px",
      lineHeight: "72px",
      letterSpacing: "-1px",
      fontWeight: "300",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Heading 3XL - Light",
      tokenName: "heading_3xl_light--system",
      description: "Large headlines mostly for web",
      fontSize: "56px",
      lineHeight: "64px",
      letterSpacing: "-1px",
      fontWeight: "300",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Heading 2XL - Light",
      tokenName: "heading_2xl_light--system",
      description: "Large headlines mostly for web",
      fontSize: "48px",
      lineHeight: "56px",
      letterSpacing: "-1px",
      fontWeight: "300",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Heading XL - Light",
      tokenName: "heading_xl_light--system",
      description: "Large headlines mostly for web",
      fontSize: "40px",
      lineHeight: "48px",
      letterSpacing: "-1px",
      fontWeight: "300",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Text 2XL - Regular",
      tokenName: "text_2xl_regular--system",
      description: "Large body text",
      fontSize: "24px",
      lineHeight: "32px",
      letterSpacing: "0px",
      fontWeight: "400",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Text 2XL Strong - Semi bold",
      tokenName: "text_2xl_strong_semi-bold--system",
      description: "Large body text emphasized",
      fontSize: "24px",
      lineHeight: "32px",
      letterSpacing: "0px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Text XL - Regular",
      tokenName: "text_xl_regular--system",
      description: "Body text",
      fontSize: "20px",
      lineHeight: "28px",
      letterSpacing: "0px",
      fontWeight: "400",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Text XL Strong - Semi bold",
      tokenName: "text_xl_strong-semi-bold--system",
      description: "Body text emphasized",
      fontSize: "20px",
      lineHeight: "28px",
      letterSpacing: "0px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Text L - Regular",
      tokenName: "text_l_regular--system",
      description: "Body text",
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "0px",
      fontWeight: "400",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Text L Strong - Semi bold",
      tokenName: "text_l_strong-semi-bold--system",
      description: "Body text emphasized",
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "0px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Text M - Regular",
      tokenName: "text_m_regular--system",
      description: "Default body text",
      fontSize: "14px",
      lineHeight: "20px",
      letterSpacing: "0px",
      fontWeight: "400",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Text M Strong - Semi bold",
      tokenName: "text_m_strong-semi-bold--system",
      description: "Default body text emphasized",
      fontSize: "14px",
      lineHeight: "20px",
      letterSpacing: "0px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Text S - Regular",
      tokenName: "text_s_regular--system",
      description: "Small text - helpline, small size buttons",
      fontSize: "12px",
      lineHeight: "16px",
      letterSpacing: "0px",
      fontWeight: "400",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Text S Strong - Semi bold",
      tokenName: "text_s_strong-semi-bold--system",
      description: "Small text emphasized",
      fontSize: "12px",
      lineHeight: "16px",
      letterSpacing: "0px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
  ],
  links: [
    {
      label: "Link L - Semi bold",
      tokenName: "link_l_semi-bold--system",
      description: "Link button - Large - rest",
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "0px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Link L Hover - Semi bold",
      tokenName: "link_l_hover-semi-bold--system",
      description: "Link button - Large - hover",
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "0px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      style: { textDecoration: "underline" },
    },
    {
      label: "Link M - Semi bold",
      tokenName: "link_m_semi-bold--system",
      description: "Link button - Medium - rest",
      fontSize: "14px",
      lineHeight: "20px",
      letterSpacing: "0px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Link M Hover - Semi bold",
      tokenName: "link_m_hover-semi-bold--system",
      description: "Link button - Medium - hover",
      fontSize: "14px",
      lineHeight: "20px",
      letterSpacing: "0px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      style: { textDecoration: "underline" },
    },
    {
      label: "Link S - Semi bold",
      tokenName: "link_s_semi-bold--system",
      description: "Link button - Small - rest",
      fontSize: "12px",
      lineHeight: "16px",
      letterSpacing: "0px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Link S Hover - Semi bold",
      tokenName: "link_s_hover-semi-bold--system",
      description: "Link button - Small - hover",
      fontSize: "12px",
      lineHeight: "16px",
      letterSpacing: "0px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      style: { textDecoration: "underline" },
    },
  ],
  labels: [
    {
      label: "Label L - Semi bold",
      tokenName: "label_l_semi-bold--system",
      description: "Large label",
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "0px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Label M - Semi bold",
      tokenName: "label_m_semi-bold--system",
      description: "Medium label",
      fontSize: "14px",
      lineHeight: "20px",
      letterSpacing: "0px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    {
      label: "Label S - Semi bold",
      tokenName: "label_s_semi-bold--system",
      description: "Small label",
      fontSize: "12px",
      lineHeight: "16px",
      letterSpacing: "0px",
      fontWeight: "600",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
  ],
};

const oldDesignSystemData = {
  sections: [
    {
      title: "🎯 Call-to-Action (CTA)",
      description:
        "Primary action colors with interactive states.",
      tokens: [
        {
          name: "--cta-cta-default",
          hex: "#E03600",
          rgb: "rgb(224, 54, 0)",
        },
        {
          name: "--cta-cta-hover",
          hex: "#FA4D1A",
          rgb: "rgb(250, 77, 26)",
        },
        {
          name: "--cta-cta-active",
          hex: "#C22E00",
          rgb: "rgb(194, 46, 0)",
        },
        {
          name: "--cta-cta-disabled",
          hex: "#FFD4C2",
          rgb: "rgb(255, 212, 194)",
        },
      ],
    },
    {
      title: "⚫ Primary",
      description:
        "Core primary colors for main interface elements.",
      tokens: [
        {
          name: "--primary-primary-default",
          hex: "#242424",
          rgb: "rgb(36, 36, 36)",
        },
        {
          name: "--primary-primary-hover",
          hex: "#616161",
          rgb: "rgb(97, 97, 97)",
        },
        {
          name: "--primary-primary-active",
          hex: "#474747",
          rgb: "rgb(71, 71, 71)",
        },
        {
          name: "--primary-primary-disabled",
          hex: "#BDBDBD",
          rgb: "rgb(189, 189, 189)",
        },
      ],
    },
    {
      title: "⚪ Secondary",
      description: "Secondary action and surface colors.",
      tokens: [
        {
          name: "--secondary-secondary-default",
          hex: "#EDEDED",
          rgb: "rgb(237, 237, 237)",
        },
        {
          name: "--secondary-secondary-hover",
          hex: "#DEDEDE",
          rgb: "rgb(222, 222, 222)",
        },
        {
          name: "--secondary-secondary-active",
          hex: "#E6E6E6",
          rgb: "rgb(230, 230, 230)",
        },
        {
          name: "--secondary-secondary-disabled",
          hex: "#F5F5F5",
          rgb: "rgb(245, 245, 245)",
        },
      ],
    },
    {
      title: "🔴 Danger",
      description: "Error and destructive action colors.",
      tokens: [
        {
          name: "--danger-danger-default",
          hex: "#E03636",
          rgb: "rgb(224, 54, 54)",
        },
        {
          name: "--danger-danger-hover",
          hex: "#FF5C5C",
          rgb: "rgb(255, 92, 92)",
        },
        {
          name: "--danger-danger-active",
          hex: "#AB2424",
          rgb: "rgb(171, 36, 36)",
        },
        {
          name: "--danger-danger-disabled",
          hex: "#F7B0B0",
          rgb: "rgb(247, 176, 176)",
        },
      ],
    },
    {
      title: "🟢 Success",
      description: "Success and positive feedback colors.",
      tokens: [
        {
          name: "--success-success-default",
          hex: "#1CD166",
          rgb: "rgb(28, 209, 102)",
        },
        {
          name: "--success-success-hover",
          hex: "#47E38C",
          rgb: "rgb(71, 227, 140)",
        },
        {
          name: "--success-success-active",
          hex: "#12994A",
          rgb: "rgb(18, 153, 74)",
        },
        {
          name: "--success-success-disabled",
          hex: "#A6F5CC",
          rgb: "rgb(166, 245, 204)",
        },
      ],
    },
    {
      title: "🟡 Warning",
      description: "Warning and cautionary colors.",
      tokens: [
        {
          name: "--warning-warning-default",
          hex: "#FFB529",
          rgb: "rgb(255, 181, 41)",
        },
        {
          name: "--warning-warning-hover",
          hex: "#FFD65C",
          rgb: "rgb(255, 214, 92)",
        },
        {
          name: "--warning-warning-active",
          hex: "#B87D14",
          rgb: "rgb(184, 125, 20)",
        },
        {
          name: "--warning-warning-disabled",
          hex: "#FFF0BF",
          rgb: "rgb(255, 240, 191)",
        },
      ],
    },
    {
      title: "🔗 Link",
      description: "Hyperlink and navigation colors.",
      tokens: [
        {
          name: "--link-link-default",
          hex: "#308FED",
          rgb: "rgb(48, 143, 237)",
        },
        {
          name: "--link-link-hover",
          hex: "#529EFC",
          rgb: "rgb(82, 158, 252)",
        },
        {
          name: "--link-link-active",
          hex: "#267DE0",
          rgb: "rgb(38, 125, 224)",
        },
        {
          name: "--link-link-visited",
          hex: "#1C5C9E",
          rgb: "rgb(28, 92, 158)",
        },
      ],
    },
    {
      title: "🎨 Surface",
      description: "Surface and container background colors.",
      tokens: [
        {
          name: "--surface-surface-default",
          hex: "#FFFFFF",
          rgb: "rgb(255, 255, 255)",
        },
        {
          name: "--surface-surface-light",
          hex: "#FAFAFA",
          rgb: "rgb(250, 250, 250)",
        },
        {
          name: "--surface-surface-muted",
          hex: "#F5F5F5",
          rgb: "rgb(245, 245, 245)",
        },
        {
          name: "--surface-surface-subtle",
          hex: "#F0F0F0",
          rgb: "rgb(240, 240, 240)",
        },
        {
          name: "--surface-surface-elevated",
          hex: "#E0E0E0",
          rgb: "rgb(224, 224, 224)",
        },
      ],
    },
    {
      title: "📄 Surface - Input",
      description: "Input field surface colors with states.",
      tokens: [
        {
          name: "--surface-surface-input-default",
          hex: "#F7F7F7",
          rgb: "rgb(247, 247, 247)",
        },
        {
          name: "--surface-surface-input-hover",
          hex: "#E8E8E8",
          rgb: "rgb(232, 232, 232)",
        },
        {
          name: "--surface-surface-input-active",
          hex: "#F0F0F0",
          rgb: "rgb(240, 240, 240)",
        },
        {
          name: "--surface-surface-input-disabled",
          hex: "#F0F0F0",
          rgb: "rgb(240, 240, 240)",
        },
      ],
    },
    {
      title: "🖼️ Background",
      description: "Page and container backgrounds.",
      tokens: [
        {
          name: "--background-background-default",
          hex: "#FFFFFF",
          rgb: "rgb(255, 255, 255)",
        },
        {
          name: "--background-background-inverted",
          hex: "#171717",
          rgb: "rgb(23, 23, 23)",
        },
      ],
    },
    {
      title: "📐 Border",
      description: "Border colors with interactive states.",
      tokens: [
        {
          name: "--border-border-default",
          hex: "#E0E0E0",
          rgb: "rgb(224, 224, 224)",
        },
        {
          name: "--border-border-hover",
          hex: "#B8B8B8",
          rgb: "rgb(184, 184, 184)",
        },
        {
          name: "--border-border-active",
          hex: "#858585",
          rgb: "rgb(133, 133, 133)",
        },
        {
          name: "--border-border-disabled",
          hex: "#C9C9C9",
          rgb: "rgb(201, 201, 201)",
        },
        {
          name: "--border-border-error",
          hex: "#E03636",
          rgb: "rgb(224, 54, 54)",
        },
      ],
    },
    {
      title: "📝 Text",
      description: "Text colors for various contexts.",
      tokens: [
        {
          name: "--text-text-primary",
          hex: "#171717",
          rgb: "rgb(23, 23, 23)",
        },
        {
          name: "--text-text-inverted",
          hex: "#FFFFFF",
          rgb: "rgb(255, 255, 255)",
        },
        {
          name: "--text-text-on-dark",
          hex: "#FFFFFF",
          rgb: "rgb(255, 255, 255)",
        },
        {
          name: "--text-text-muted",
          hex: "#595959",
          rgb: "rgb(89, 89, 89)",
        },
        {
          name: "--text-text-subtle",
          hex: "#A1A1A1",
          rgb: "rgb(161, 161, 161)",
        },
        {
          name: "--text-text-disabled",
          hex: "#C9C9C9",
          rgb: "rgb(201, 201, 201)",
        },
      ],
    },
    {
      title: "🎭 Icons",
      description: "Icon colors for different backgrounds.",
      tokens: [
        {
          name: "--icons-icon-default",
          hex: "#4F4F4F",
          rgb: "rgb(79, 79, 79)",
        },
        {
          name: "--icons-icon-disabled",
          hex: "#BDBDBD",
          rgb: "rgb(189, 189, 189)",
        },
        {
          name: "--icons-icon-on-dark",
          hex: "#FCFCFC",
          rgb: "rgb(252, 252, 252)",
        },
        {
          name: "--icons-icon-on-bright",
          hex: "#FCFCFC",
          rgb: "rgb(252, 252, 252)",
        },
        {
          name: "--icons-icon-subtle",
          hex: "#BDBDBD",
          rgb: "rgb(189, 189, 189)",
        },
      ],
    },
    {
      title: "🌈 Complementary - Strong (1-10)",
      description:
        "Vibrant accent colors for emphasis and decoration.",
      tokens: [
        {
          name: "--strong-01",
          hex: "#FFA354",
          rgb: "rgb(255, 163, 84)",
        },
        {
          name: "--strong-02",
          hex: "#FFD98A",
          rgb: "rgb(255, 217, 138)",
        },
        {
          name: "--strong-03",
          hex: "#70EBAB",
          rgb: "rgb(112, 235, 171)",
        },
        {
          name: "--strong-04",
          hex: "#69CCFF",
          rgb: "rgb(105, 204, 255)",
        },
        {
          name: "--strong-05",
          hex: "#D4B3F7",
          rgb: "rgb(212, 179, 247)",
        },
        {
          name: "--strong-06",
          hex: "#FF94C4",
          rgb: "rgb(255, 148, 196)",
        },
        {
          name: "--strong-07",
          hex: "#FF8787",
          rgb: "rgb(255, 135, 135)",
        },
        {
          name: "--strong-08",
          hex: "#B8A6F7",
          rgb: "rgb(184, 166, 247)",
        },
        {
          name: "--strong-09",
          hex: "#4FE0C9",
          rgb: "rgb(79, 224, 201)",
        },
        {
          name: "--strong-10",
          hex: "#FF8AB5",
          rgb: "rgb(255, 138, 181)",
        },
      ],
    },
    {
      title: "🌈 Complementary - Strong (11-20)",
      description: "Additional vibrant accent colors.",
      tokens: [
        {
          name: "--strong-11",
          hex: "#BDABA3",
          rgb: "rgb(189, 171, 163)",
        },
        {
          name: "--strong-12",
          hex: "#B3C7A6",
          rgb: "rgb(179, 199, 166)",
        },
        {
          name: "--strong-13",
          hex: "#E6F57D",
          rgb: "rgb(230, 245, 125)",
        },
        {
          name: "--strong-14",
          hex: "#45E0F5",
          rgb: "rgb(69, 224, 245)",
        },
        {
          name: "--strong-15",
          hex: "#FF9C73",
          rgb: "rgb(255, 156, 115)",
        },
        {
          name: "--strong-16",
          hex: "#FFF061",
          rgb: "rgb(255, 240, 97)",
        },
        {
          name: "--strong-17",
          hex: "#73E88A",
          rgb: "rgb(115, 232, 138)",
        },
        {
          name: "--strong-18",
          hex: "#4AB8F7",
          rgb: "rgb(74, 184, 247)",
        },
        {
          name: "--strong-19",
          hex: "#E05291",
          rgb: "rgb(224, 82, 145)",
        },
        {
          name: "--strong-20",
          hex: "#E8B5FF",
          rgb: "rgb(232, 181, 255)",
        },
      ],
    },
    {
      title: "🎨 Complementary - Subtle (1-10)",
      description: "Soft, muted accent colors for backgrounds.",
      tokens: [
        {
          name: "--subtle-01",
          hex: "#FFEDDB",
          rgb: "rgb(255, 237, 219)",
        },
        {
          name: "--subtle-02",
          hex: "#FFF5DE",
          rgb: "rgb(255, 245, 222)",
        },
        {
          name: "--subtle-03",
          hex: "#E0FAED",
          rgb: "rgb(224, 250, 237)",
        },
        {
          name: "--subtle-04",
          hex: "#E0F5FF",
          rgb: "rgb(224, 245, 255)",
        },
        {
          name: "--subtle-05",
          hex: "#F5F0FF",
          rgb: "rgb(245, 240, 255)",
        },
        {
          name: "--subtle-06",
          hex: "#FFEDF5",
          rgb: "rgb(255, 237, 245)",
        },
        {
          name: "--subtle-07",
          hex: "#FFEBEB",
          rgb: "rgb(255, 235, 235)",
        },
        {
          name: "--subtle-08",
          hex: "#F2EDFF",
          rgb: "rgb(242, 237, 255)",
        },
        {
          name: "--subtle-09",
          hex: "#E6FAF7",
          rgb: "rgb(230, 250, 247)",
        },
        {
          name: "--subtle-10",
          hex: "#FFF0F5",
          rgb: "rgb(255, 240, 245)",
        },
      ],
    },
    {
      title: "🎨 Complementary - Subtle (11-20)",
      description: "Additional soft accent colors.",
      tokens: [
        {
          name: "--subtle-11",
          hex: "#F5F2F2",
          rgb: "rgb(245, 242, 242)",
        },
        {
          name: "--subtle-12",
          hex: "#F2F5F2",
          rgb: "rgb(242, 245, 242)",
        },
        {
          name: "--subtle-13",
          hex: "#FAFCEB",
          rgb: "rgb(250, 252, 235)",
        },
        {
          name: "--subtle-14",
          hex: "#E6FAFF",
          rgb: "rgb(230, 250, 255)",
        },
        {
          name: "--subtle-15",
          hex: "#FFF2EB",
          rgb: "rgb(255, 242, 235)",
        },
        {
          name: "--subtle-16",
          hex: "#FFFFED",
          rgb: "rgb(255, 255, 237)",
        },
        {
          name: "--subtle-17",
          hex: "#E8FAF0",
          rgb: "rgb(232, 250, 240)",
        },
        {
          name: "--subtle-18",
          hex: "#E6F5FF",
          rgb: "rgb(230, 245, 255)",
        },
        {
          name: "--subtle-19",
          hex: "#FCEDF2",
          rgb: "rgb(252, 237, 242)",
        },
        {
          name: "--subtle-20",
          hex: "#FAF2FF",
          rgb: "rgb(250, 242, 255)",
        },
      ],
    },
    {
      title: "⚫ Complementary - Dark",
      description: "Dark accent colors for contrast.",
      tokens: [
        {
          name: "--dark-02",
          hex: "#A86B00",
          rgb: "rgb(168, 107, 0)",
        },
        {
          name: "--dark-04",
          hex: "#00669C",
          rgb: "rgb(0, 102, 156)",
        },
        {
          name: "--dark-05",
          hex: "#573D96",
          rgb: "rgb(87, 61, 150)",
        },
        {
          name: "--dark-06",
          hex: "#C44580",
          rgb: "rgb(196, 69, 128)",
        },
      ],
    },
  ],
};

export default function App() {
  const [activeTab, setActiveTab] = useState("tokens");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Apply theme to document
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Navigation structure for tokens page
  const tokensNavGroups = [
    {
      title: "Colors",
      icon: "palette",
      items: designSystemData.sections.map((section) => ({
        id: section.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-"),
        label: section.title.replace(/^[^\s]+ /, ""), // Remove emoji
      })),
    },
    {
      title: "Typography",
      icon: "pencil",
      items: [
        { id: "typography-headings", label: "Heading System" },
        {
          id: "typography-decorative",
          label: "Heading - Decorative",
        },
        { id: "typography-text", label: "Text System" },
        { id: "typography-links", label: "Link Styles" },
        { id: "typography-labels", label: "Label Styles" },
      ],
    },
    {
      title: "Other Tokens",
      icon: "zap",
      items: [
        {
          id: "non-color-tokens",
          label: "Spacing, Border & More",
        },
      ],
    },
  ];

  // Navigation structure for components page
  const componentsNavGroups = [
    {
      title: "Buttons",
      icon: "circle",
      items: [
        { id: "button-primary", label: "Primary Button (CTA)" },
        { id: "button-states", label: "All Button States" },
        { id: "button-variants", label: "Individual Variants" },
        { id: "button-icons", label: "Buttons with Icons" },
      ],
    },
    {
      title: "Form Inputs",
      icon: "pencil",
      items: [
        { id: "input-text", label: "Text Input" },
        { id: "input-search", label: "Search Input" },
      ],
    },
    {
      title: "Dropdowns & Menus",
      icon: "menu",
      items: [
        { id: "dropdown-select", label: "Select Dropdown" },
        { id: "dropdown-menu", label: "Dropdown Menu" },
        { id: "menu-with-icons", label: "Menus with Icons" },
      ],
    },
    {
      title: "Form Controls",
      icon: "check-square",
      items: [
        { id: "control-checkbox", label: "Checkbox" },
        { id: "control-switch", label: "Switch (Toggle)" },
        { id: "control-radio", label: "Radio Button" },
      ],
    },
    {
      title: "Date & Time",
      icon: "calendar",
      items: [{ id: "calendar", label: "Calendar" }],
    },
    {
      title: "Dialogs & Alerts",
      icon: "alert-triangle",
      items: [
        {
          id: "dialog-confirmation",
          label: "Confirmation Dialog",
        },
      ],
    },
    {
      title: "Notifications",
      icon: "bell",
      items: [
        { id: "toast-notifications", label: "Toast Messages" },
      ],
    },
    {
      title: "Bulk Actions",
      icon: "zap",
      items: [
        { id: "bulk-action-panel", label: "Bulk Action Panel" },
      ],
    },
  ];

  const iconsNavGroups = [
    {
      title: "Icon Categories",
      icon: "layout-grid",
      items: [
        { id: "core-actions", label: "Core Actions" },
        { id: "navigation", label: "Navigation" },
        {
          id: "file-data-management",
          label: "File & Data Management",
        },
        {
          id: "research-analysis",
          label: "Research & Analysis",
        },
        { id: "content-types", label: "Content Types" },
        { id: "status-feedback", label: "Status & Feedback" },
        {
          id: "collaboration-users",
          label: "Collaboration & Users",
        },
        { id: "data-sources", label: "Data Sources" },
        { id: "specialized-tools", label: "Specialized Tools" },
      ],
    },
  ];

  const currentNavGroups =
    activeTab === "tokens"
      ? tokensNavGroups
      : activeTab === "icons"
        ? iconsNavGroups
        : componentsNavGroups;

  return (
    <>
      <Toaster position="top-right" />
      <div className="h-screen bg-background flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-50 shadow-sm h-28">
          <div className="w-full px-6 py-4 h-full">
            <div className="flex items-start justify-between gap-4 h-full">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-4">
                  <h1>Able Design System</h1>
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="inline-block"
                  >
                    <TabsList className="h-9">
                      <TabsTrigger
                        value="tokens"
                        className="px-4"
                      >
                        Tokens
                      </TabsTrigger>
                      <TabsTrigger
                        value="components"
                        className="px-4"
                      >
                        Components
                      </TabsTrigger>
                      <TabsTrigger
                        value="icons"
                        className="px-4"
                      >
                        Icons
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <p className="text-muted-foreground">
                  {activeTab === "tokens"
                    ? "Complete color palette with interactive states, surfaces, and complementary colors."
                    : activeTab === "components"
                      ? "UI component examples with design tokens applied and code snippets."
                      : "Comprehensive icon library with search and filtering capabilities."}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle
                  theme={theme}
                  onToggle={toggleTheme}
                />
                {activeTab === "tokens" && (
                  <ExportDialog
                    sections={designSystemData.sections}
                  />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Layout Container - below header */}
        <div className="flex flex-1 pt-28 h-screen">
          {/* Side Navigation */}
          <SideNav groups={currentNavGroups} />

          {/* Main Content - scrollable */}
          <main className="flex-1 overflow-y-auto lg:ml-80 w-full">
            {activeTab === "tokens" ? (
              <div className="w-full px-6 py-6 max-w-none">
                <div className="space-y-6">
                  {/* Color Tokens Group */}
                  <CollapsibleGroup
                    title="Color Tokens"
                    description="Interactive color tokens with states, surfaces, and complementary palettes."
                    emoji="🎨"
                  >
                    {designSystemData.sections.map(
                      (section, index) => {
                        const sectionId = section.title
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-");
                        return (
                          <CollapsibleSection
                            key={index}
                            id={sectionId}
                            title={section.title}
                            description={section.description}
                            hint={`Click to view ${section.tokens.length} color token${section.tokens.length !== 1 ? "s" : ""}`}
                            defaultOpen={index < 3}
                          >
                            <TokenSection
                              title=""
                              description=""
                              tokens={section.tokens}
                            />
                          </CollapsibleSection>
                        );
                      },
                    )}
                  </CollapsibleGroup>

                  {/* Typography Group */}
                  <CollapsibleGroup
                    title="Typography System"
                    description="Comprehensive typography scale with headings, body text, links, and labels."
                    emoji="📝"
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
                    emoji="🎛️"
                    className="mt-12 pt-8 border-t-2 border-border"
                  >
                    <CollapsibleSection
                      id="non-color-tokens"
                      title="Non-Color Tokens"
                      description="Spacing scale, border radius, and border width tokens"
                      hint="Click to view spacing scale (11), border radius (8), and border width (6) tokens"
                      defaultOpen={false}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <h4>Spacing Scale</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --spacing-0
                              </span>
                              <span>0</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --spacing-1
                              </span>
                              <span>2px</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --spacing-2
                              </span>
                              <span>4px</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --spacing-3
                              </span>
                              <span>8px</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --spacing-4
                              </span>
                              <span>12px</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --spacing-5
                              </span>
                              <span>16px</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --spacing-6
                              </span>
                              <span>20px</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --spacing-7
                              </span>
                              <span>24px</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --spacing-8
                              </span>
                              <span>28px</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --spacing-9
                              </span>
                              <span>32px</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --spacing-10
                              </span>
                              <span>40px</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4>Border Radius</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --radius-none
                              </span>
                              <span>0</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --radius-xs
                              </span>
                              <span>2px</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --radius-sm
                              </span>
                              <span>4px</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --radius-md
                              </span>
                              <span>8px</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --radius-lg
                              </span>
                              <span>16px</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --radius-xl
                              </span>
                              <span>24px</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --radius-2xl
                              </span>
                              <span>32px</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --radius-full
                              </span>
                              <span>9999px</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4>Border Width</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --border-none
                              </span>
                              <span>0</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --border-thin
                              </span>
                              <span>1px</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --border-base
                              </span>
                              <span>1.5px</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --border-md
                              </span>
                              <span>2px</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --border-lg
                              </span>
                              <span>3px</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                --border-xl
                              </span>
                              <span>4px</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CollapsibleSection>
                  </CollapsibleGroup>
                </div>
              </div>
            ) : activeTab === "components" ? (
              <ComponentsPage />
            ) : (
              <AbleIconsGuide />
            )}
          </main>
        </div>
      </div>
    </>
  );
}
