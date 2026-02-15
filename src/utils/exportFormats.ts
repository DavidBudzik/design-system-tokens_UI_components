interface Token {
  name: string;
  hex: string;
  rgb: string;
  darkHex?: string;
  darkRgb?: string;
}

interface Section {
  title: string;
  description: string;
  tokens: Token[];
}

// Helper to convert hex to RGB values
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result && result[1] && result[2] && result[3]
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

export const exportFormats = {
  css: {
    name: "CSS Variables",
    extension: ".css",
    description: "CSS custom properties for modern web projects. Works with vanilla CSS, React, Vue, and any web framework.",
    generate: (sections: Section[]) => {
      let output = "/* Design Book - Color Tokens */\n";
      output += "/* Generated CSS Variables with Light & Dark Modes */\n\n";
      
      // Light mode
      output += ":root {\n";
      sections.forEach((section) => {
        output += `  /* ${section.title} - Light Mode */\n`;
        section.tokens.forEach((token) => {
          output += `  ${token.name}: ${token.hex};\n`;
        });
        output += "\n";
      });
      output += "}\n\n";
      
      // Dark mode
      output += ".dark {\n";
      sections.forEach((section) => {
        output += `  /* ${section.title} - Dark Mode */\n`;
        section.tokens.forEach((token) => {
          if (token.darkHex) {
            output += `  ${token.name}: ${token.darkHex};\n`;
          }
        });
        output += "\n";
      });
      output += "}\n";
      
      return output;
    },
  },

  scss: {
    name: "SCSS Variables",
    extension: ".scss",
    description: "SCSS/SASS variables for projects using Sass preprocessor. Compatible with Bootstrap, Foundation, and custom SCSS builds.",
    generate: (sections: Section[]) => {
      let output = "// Design Book - Color Tokens\n";
      output += "// Generated SCSS Variables with Light & Dark Modes\n\n";
      
      // Light mode
      output += "// Light Mode\n";
      sections.forEach((section) => {
        output += `// ${section.title}\n`;
        section.tokens.forEach((token) => {
          const varName = token.name.replace(/^--/, "$");
          output += `${varName}: ${token.hex};\n`;
        });
        output += "\n";
      });
      
      // Dark mode
      output += "// Dark Mode\n";
      sections.forEach((section) => {
        output += `// ${section.title}\n`;
        section.tokens.forEach((token) => {
          if (token.darkHex) {
            const varName = token.name.replace(/^--/, "$") + "-dark";
            output += `${varName}: ${token.darkHex};\n`;
          }
        });
        output += "\n";
      });
      
      return output;
    },
  },

  json: {
    name: "JSON",
    extension: ".json",
    description: "Standard JSON format for universal compatibility. Use with design token tools, documentation, or custom build systems.",
    generate: (sections: Section[]) => {
      const tokenObj: Record<string, any> = {};
      
      sections.forEach((section) => {
        section.tokens.forEach((token) => {
          const cleanName = token.name.replace(/^--/, "");
          tokenObj[cleanName] = {
            light: {
              hex: token.hex,
              rgb: token.rgb,
            },
            dark: token.darkHex ? {
              hex: token.darkHex,
              rgb: token.darkRgb,
            } : undefined,
            category: section.title,
          };
        });
      });
      
      return JSON.stringify({ colors: tokenObj }, null, 2);
    },
  },

  javascript: {
    name: "JavaScript/ES6",
    extension: ".js",
    description: "ES6 module exports for JavaScript projects. Works with React, Vue, Node.js, and modern JavaScript applications.",
    generate: (sections: Section[]) => {
      let output = "// Design Book - Color Tokens\n";
      output += "// Generated JavaScript/ES6 Module\n\n";
      output += "export const colors = {\n";
      
      sections.forEach((section, sectionIndex) => {
        section.tokens.forEach((token, tokenIndex) => {
          const cleanName = token.name.replace(/^--/, "").replace(/-/g, "_");
          output += `  ${cleanName}: '${token.hex}'`;
          
          // Add comma if not last item
          const isLastSection = sectionIndex === sections.length - 1;
          const isLastToken = tokenIndex === section.tokens.length - 1;
          if (!isLastSection || !isLastToken) {
            output += ",";
          }
          output += "\n";
        });
      });
      
      output += "};\n\n";
      output += "export default colors;\n";
      return output;
    },
  },

  typescript: {
    name: "TypeScript",
    extension: ".ts",
    description: "TypeScript module with type definitions. Perfect for TypeScript projects with full IntelliSense support.",
    generate: (sections: Section[]) => {
      let output = "// Design Book - Color Tokens\n";
      output += "// Generated TypeScript Module\n\n";
      output += "export interface ColorTokens {\n";
      
      sections.forEach((section) => {
        output += `  // ${section.title}\n`;
        section.tokens.forEach((token) => {
          const cleanName = token.name.replace(/^--/, "").replace(/-/g, "_");
          output += `  ${cleanName}: string;\n`;
        });
      });
      
      output += "}\n\n";
      output += "export const colors: ColorTokens = {\n";
      
      sections.forEach((section, sectionIndex) => {
        section.tokens.forEach((token, tokenIndex) => {
          const cleanName = token.name.replace(/^--/, "").replace(/-/g, "_");
          output += `  ${cleanName}: '${token.hex}'`;
          
          const isLastSection = sectionIndex === sections.length - 1;
          const isLastToken = tokenIndex === section.tokens.length - 1;
          if (!isLastSection || !isLastToken) {
            output += ",";
          }
          output += "\n";
        });
      });
      
      output += "};\n\n";
      output += "export default colors;\n";
      return output;
    },
  },

  tailwind: {
    name: "Tailwind Config",
    extension: ".js",
    description: "Tailwind CSS configuration for extending your color palette. Merge with tailwind.config.js to use custom colors.",
    generate: (sections: Section[]) => {
      let output = "// Design Book - Color Tokens\n";
      output += "// Tailwind CSS Configuration\n\n";
      output += "module.exports = {\n";
      output += "  theme: {\n";
      output += "    extend: {\n";
      output += "      colors: {\n";
      
      const categories: Record<string, Record<string, string>> = {};
      
      sections.forEach((section) => {
        section.tokens.forEach((token) => {
          const parts = token.name.replace(/^--/, "").split("-");
          const category = parts[0];
          const name = parts.slice(1).join("-");
          
          if (category && name) {
            if (!categories[category]) {
              categories[category] = {};
            }
            categories[category][name] = token.hex;
          }
        });
      });
      
      Object.entries(categories).forEach(([category, tokens], index, array) => {
        output += `        ${category}: {\n`;
        Object.entries(tokens).forEach(([name, hex]) => {
          output += `          '${name}': '${hex}',\n`;
        });
        output += `        }${index < array.length - 1 ? "," : ""}\n`;
      });
      
      output += "      }\n";
      output += "    }\n";
      output += "  }\n";
      output += "};\n";
      return output;
    },
  },

  swift: {
    name: "Swift (iOS)",
    extension: ".swift",
    description: "Swift color extensions for iOS/macOS development. Use with UIKit or SwiftUI for native Apple applications.",
    generate: (sections: Section[]) => {
      let output = "// Design Book - Color Tokens\n";
      output += "// Generated Swift Color Extensions\n\n";
      output += "import UIKit\n\n";
      output += "extension UIColor {\n";
      
      sections.forEach((section) => {
        output += `    // ${section.title}\n`;
        section.tokens.forEach((token) => {
          const cleanName = token.name.replace(/^--/, "").replace(/-/g, "_");
          const rgb = hexToRgb(token.hex);
          output += `    static let ${cleanName} = UIColor(red: ${(rgb.r / 255).toFixed(3)}, green: ${(rgb.g / 255).toFixed(3)}, blue: ${(rgb.b / 255).toFixed(3)}, alpha: 1.0)\n`;
        });
        output += "\n";
      });
      
      output += "}\n";
      return output;
    },
  },

  kotlin: {
    name: "Kotlin (Android)",
    extension: ".kt",
    description: "Kotlin color definitions for Android development. Use with Jetpack Compose or traditional Android Views.",
    generate: (sections: Section[]) => {
      let output = "// Design Book - Color Tokens\n";
      output += "// Generated Kotlin Color Definitions\n\n";
      output += "package com.yourapp.design\n\n";
      output += "import androidx.compose.ui.graphics.Color\n\n";
      output += "object DesignBookColors {\n";
      
      sections.forEach((section) => {
        output += `    // ${section.title}\n`;
        section.tokens.forEach((token) => {
          const cleanName = token.name.replace(/^--/, "").replace(/-/g, "_");
          const hex = token.hex.replace("#", "0xFF");
          output += `    val ${cleanName} = Color(${hex})\n`;
        });
        output += "\n";
      });
      
      output += "}\n";
      return output;
    },
  },

  xml: {
    name: "Android XML",
    extension: ".xml",
    description: "Android colors.xml resource file. Place in res/values/ folder for traditional Android projects.",
    generate: (sections: Section[]) => {
      let output = '<?xml version="1.0" encoding="utf-8"?>\n';
      output += "<!-- Design Book - Color Tokens -->\n";
      output += "<!-- Generated Android Color Resources -->\n";
      output += "<resources>\n";
      
      sections.forEach((section) => {
        output += `    <!-- ${section.title} -->\n`;
        section.tokens.forEach((token) => {
          const cleanName = token.name.replace(/^--/, "").replace(/-/g, "_");
          output += `    <color name="${cleanName}">${token.hex}</color>\n`;
        });
        output += "\n";
      });
      
      output += "</resources>\n";
      return output;
    },
  },

  less: {
    name: "LESS Variables",
    extension: ".less",
    description: "LESS preprocessor variables. Compatible with projects using LESS for styling.",
    generate: (sections: Section[]) => {
      let output = "// Design Book - Color Tokens\n";
      output += "// Generated LESS Variables\n\n";
      
      sections.forEach((section) => {
        output += `// ${section.title}\n`;
        section.tokens.forEach((token) => {
          const varName = token.name.replace(/^--/, "@");
          output += `${varName}: ${token.hex};\n`;
        });
        output += "\n";
      });
      
      return output;
    },
  },

  figmaTokens: {
    name: "Figma Tokens",
    extension: ".json",
    description: "Design Tokens format compatible with Figma Tokens plugin. Import directly into Figma for design-dev sync.",
    generate: (sections: Section[]) => {
      // Create separate light and dark token sets following W3C Design Tokens format
      const lightTokens: Record<string, any> = {};
      const darkTokens: Record<string, any> = {};
      
      sections.forEach((section) => {
        // Create a clean category name from section title
        const categoryName = section.title
          .replace(/[^\w\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-")
          .toLowerCase();
        
        // Initialize category objects
        if (!lightTokens[categoryName]) {
          lightTokens[categoryName] = {};
        }
        if (!darkTokens[categoryName]) {
          darkTokens[categoryName] = {};
        }
        
        section.tokens.forEach((token) => {
          // Preserve semantic token name - remove prefix and keep meaningful parts
          // --cta-cta-default -> cta-default (remove redundant category prefix)
          const cleanName = token.name.replace(/^--/, "");
          const parts = cleanName.split("-");
          
          // Remove redundant category prefix if it appears twice consecutively
          // This handles the naming pattern where category is repeated: "cta-cta-default" -> "cta-default"
          // Keeps structure like: "primary-primary-hover" -> "primary-hover"
          let tokenName = cleanName;
          if (parts.length >= 3 && parts[0] === parts[1]) {
            tokenName = parts.slice(1).join("-");
          }
          
          // Create nested structure for better organization
          // Split by first dash to create subcategories
          const nameParts = tokenName.split("-");
          let currentLevel = lightTokens[categoryName];
          let currentDarkLevel = darkTokens[categoryName];
          
          // Navigate/create nested structure (all but last part)
          for (let i = 0; i < nameParts.length - 1; i++) {
            if (!currentLevel[nameParts[i]]) {
              currentLevel[nameParts[i]] = {};
            }
            if (!currentDarkLevel[nameParts[i]]) {
              currentDarkLevel[nameParts[i]] = {};
            }
            currentLevel = currentLevel[nameParts[i]];
            currentDarkLevel = currentDarkLevel[nameParts[i]];
          }
          
          // Use the last part as the token name
          const finalName = nameParts[nameParts.length - 1];
          
          // Add light mode token with W3C format ($value, $type, $description)
          currentLevel[finalName] = {
            $value: token.hex,
            $type: "color",
            $description: section.description,
          };
          
          // Add dark mode token if it exists
          if (token.darkHex) {
            currentDarkLevel[finalName] = {
              $value: token.darkHex,
              $type: "color",
              $description: section.description,
            };
          } else {
            // Fallback: Use light mode value for dark mode when no dark variant is defined
            // This ensures the token exists in both themes but may need adjustment in Figma
            currentDarkLevel[finalName] = {
              $value: token.hex,
              $type: "color",
              $description: section.description,
            };
          }
        });
      });
      
      // Build final structure with theme configuration
      const output = {
        light: lightTokens,
        dark: darkTokens,
        $themes: [
          {
            id: "light",
            name: "Light",
            selectedTokenSets: {
              light: "enabled",
            },
          },
          {
            id: "dark",
            name: "Dark",
            selectedTokenSets: {
              dark: "enabled",
            },
          },
        ],
      };
      
      return JSON.stringify(output, null, 2);
    },
  },
};

export type ExportFormat = keyof typeof exportFormats;
