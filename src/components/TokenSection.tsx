import { ColorToken } from './ColorToken';

interface Token {
  name: string;
  hex: string;
  rgb: string;
  darkHex?: string;
  darkRgb?: string;
}

interface TokenSectionProps {
  title: string;
  description: string;
  tokens: Token[];
}

export function TokenSection({ title, description, tokens }: TokenSectionProps) {
  return (
    <div className="col-span-full space-y-4">
      <div className="space-y-1">
        <h3>{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-wrap gap-4">
        {tokens.map((token, index) => (
          <ColorToken
            key={index}
            name={token.name}
            hex={token.hex}
            rgb={token.rgb}
            darkHex={token.darkHex}
            darkRgb={token.darkRgb}
          />
        ))}
      </div>
    </div>
  );
}
