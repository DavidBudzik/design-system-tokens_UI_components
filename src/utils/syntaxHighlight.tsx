// Syntax highlighter for code snippets
// Returns JSX with syntax-highlighted code

interface HighlightedToken {
  type: 'keyword' | 'string' | 'number' | 'comment' | 'property' | 'function' | 'operator' | 'tag' | 'attribute' | 'plain';
  value: string;
}

// Language-specific patterns
const patterns = {
  react: {
    keywords: /\b(import|from|export|default|const|let|var|function|return|if|else|for|while|class|extends|interface|type|as|async|await|new|this|super|typeof|instanceof)\b/g,
    strings: /(["'`])(?:(?=(\\?))\2.)*?\1/g,
    comments: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
    properties: /\b([a-zA-Z_$][\w$]*)\s*:/g,
    functions: /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g,
    jsx: /<\/?[\w.]+(?:\s+[\w-]+(?:=(?:{[^}]*}|"[^"]*"|'[^']*'))?)*\s*\/?>/g,
    numbers: /\b\d+\.?\d*\b/g,
  },
  html: {
    tags: /<\/?[\w-]+|\/?>|<!--|-->/g,
    attributes: /\b[\w-]+(?==)/g,
    strings: /(["'])(?:(?=(\\?))\2.)*?\1/g,
    comments: /<!--[\s\S]*?-->/g,
  },
  css: {
    selectors: /^[^{]+(?={)/gm,
    properties: /\b[\w-]+(?=\s*:)/g,
    values: /:\s*([^;{]+)/g,
    strings: /(["'])(?:(?=(\\?))\2.)*?\1/g,
    comments: /\/\*[\s\S]*?\*\//gm,
    numbers: /\b\d+\.?\d*(px|em|rem|%|vh|vw|s|ms)?\b/g,
  },
  json: {
    properties: /"([^"]+)"\s*:/g,
    strings: /:\s*"([^"]*)"/g,
    numbers: /:\s*(-?\d+\.?\d*)/g,
    booleans: /:\s*(true|false|null)/g,
  },
  javascript: {
    keywords: /\b(const|let|var|function|return|if|else|for|while|class|extends|import|from|export|default|async|await|new|this|typeof|instanceof)\b/g,
    strings: /(["'`])(?:(?=(\\?))\2.)*?\1/g,
    comments: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
    properties: /\b([a-zA-Z_$][\w$]*)\s*:/g,
    functions: /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g,
    numbers: /\b\d+\.?\d*\b/g,
  },
  typescript: {
    keywords: /\b(import|from|export|default|const|let|var|function|return|if|else|for|while|class|extends|interface|type|as|async|await|new|this|super|typeof|instanceof|enum|namespace|declare|readonly|private|public|protected)\b/g,
    strings: /(["'`])(?:(?=(\\?))\2.)*?\1/g,
    comments: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
    properties: /\b([a-zA-Z_$][\w$]*)\s*:/g,
    functions: /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g,
    numbers: /\b\d+\.?\d*\b/g,
    types: /:\s*([A-Z][\w<>[\],\s|&]*)/g,
  },
};

export function highlightCode(code: string, language: 'react' | 'html' | 'css' | 'json' | 'javascript' | 'typescript' = 'react') {
  // Split code into lines for proper rendering
  const lines = code.split('\n');
  
  return lines.map((line, lineIndex) => {
    const highlightedLine = highlightLine(line, language);
    return (
      <div key={lineIndex} className="table-row">
        <span className="table-cell pr-4 text-right select-none opacity-40 min-w-[3ch]">
          {lineIndex + 1}
        </span>
        <span className="table-cell">
          {highlightedLine}
        </span>
      </div>
    );
  });
}

function highlightLine(line: string, language: 'react' | 'html' | 'css' | 'json' | 'javascript' | 'typescript'): React.ReactNode {
  if (!line.trim()) return '\n';

  const tokens: { start: number; end: number; type: string; priority: number }[] = [];

  // Helper to add tokens
  const addTokens = (regex: RegExp, type: string, priority: number) => {
    let match;
    const regexCopy = new RegExp(regex.source, regex.flags);
    while ((match = regexCopy.exec(line)) !== null) {
      tokens.push({
        start: match.index,
        end: match.index + match[0].length,
        type,
        priority,
      });
    }
  };

  // Add tokens based on language with priority
  if (language === 'react' || language === 'javascript' || language === 'typescript') {
    addTokens(/\/\/.*$|\/\*[\s\S]*?\*\//gm, 'comment', 10);
    addTokens(/(["'`])(?:\\.|(?!\1)[^\\])*\1/g, 'string', 9);
    addTokens(/\b(import|from|export|default|const|let|var|function|return|if|else|for|while|class|extends|interface|type|as|async|await|new|this|super|typeof|instanceof|enum|namespace|declare|readonly|private|public|protected)\b/g, 'keyword', 8);
    addTokens(/\b([a-zA-Z_$][\w$]*)\s*(?=\()/g, 'function', 7);
    addTokens(/\b([a-zA-Z_$][\w$]*)\s*:/g, 'property', 6);
    addTokens(/<\/?[\w.]+(?:\s+[\w-]+(?:=(?:{[^}]*}|"[^"]*"|'[^']*'))?)*\s*\/?>/g, 'tag', 5);
    addTokens(/\b\d+\.?\d*\b/g, 'number', 4);
  } else if (language === 'html') {
    addTokens(/<!--[\s\S]*?-->/g, 'comment', 10);
    addTokens(/(["'])(?:\\.|(?!\1)[^\\])*\1/g, 'string', 9);
    addTokens(/<\/?[\w-]+|\/?>|<!--|-->/g, 'tag', 8);
    addTokens(/\b[\w-]+(?==)/g, 'attribute', 7);
  } else if (language === 'css') {
    addTokens(/\/\*[\s\S]*?\*\//gm, 'comment', 10);
    addTokens(/(["'])(?:\\.|(?!\1)[^\\])*\1/g, 'string', 9);
    addTokens(/\b[\w-]+\s*:/g, 'property', 8);
    addTokens(/#[0-9a-fA-F]{3,8}\b/g, 'number', 7);
    addTokens(/\b\d+\.?\d*(px|em|rem|%|vh|vw|s|ms)?\b/g, 'number', 6);
  } else if (language === 'json') {
    addTokens(/"([^"]+)"\s*:/g, 'property', 9);
    addTokens(/:\s*"([^"]*)"/g, 'string', 8);
    addTokens(/:\s*(true|false|null)/g, 'keyword', 7);
    addTokens(/:\s*(-?\d+\.?\d*)/g, 'number', 6);
  }

  // Sort tokens by start position
  tokens.sort((a, b) => a.start - b.start);

  // Remove overlapping tokens (keep higher priority)
  const filteredTokens: typeof tokens = [];
  for (const token of tokens) {
    const overlaps = filteredTokens.some(
      (t) => (token.start >= t.start && token.start < t.end) || (token.end > t.start && token.end <= t.end)
    );
    if (!overlaps) {
      filteredTokens.push(token);
    }
  }

  // Build the highlighted line
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  filteredTokens.sort((a, b) => a.start - b.start);

  for (const token of filteredTokens) {
    // Add plain text before token
    if (token.start > lastIndex) {
      parts.push(
        <span key={`plain-${lastIndex}`} className="text-foreground/90">
          {line.substring(lastIndex, token.start)}
        </span>
      );
    }

    // Add highlighted token
    const text = line.substring(token.start, token.end);
    parts.push(
      <span key={`token-${token.start}`} className={getTokenClass(token.type)}>
        {text}
      </span>
    );

    lastIndex = token.end;
  }

  // Add remaining plain text
  if (lastIndex < line.length) {
    parts.push(
      <span key={`plain-${lastIndex}`} className="text-foreground/90">
        {line.substring(lastIndex)}
      </span>
    );
  }

  return <>{parts}</>;
}

function getTokenClass(type: string): string {
  const classes: Record<string, string> = {
    keyword: 'text-purple-600 dark:text-purple-400',
    string: 'text-green-700 dark:text-green-400',
    number: 'text-blue-600 dark:text-blue-400',
    comment: 'text-gray-500 dark:text-gray-500 italic',
    property: 'text-cyan-700 dark:text-cyan-400',
    function: 'text-yellow-700 dark:text-yellow-400',
    tag: 'text-red-600 dark:text-red-400',
    attribute: 'text-orange-600 dark:text-orange-400',
    operator: 'text-gray-700 dark:text-gray-300',
  };
  return classes[type] || 'text-foreground/90';
}
