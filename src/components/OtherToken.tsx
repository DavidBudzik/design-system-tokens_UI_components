import { useState, useRef, useEffect } from 'react';
import { Check, X, Pencil, Eye, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Slider } from './ui/slider';

interface OtherTokenProps {
  name: string;
  value: string;
  cssVar: string;
  type: 'spacing' | 'radius' | 'borderWidth' | 'shadow';
  onUpdate: (name: string, value: string) => void;
}

function parseValue(value: string): { num: number; unit: string } {
  const match = value.match(/^([\d.]+)(px|rem|em|%)?$/);
  if (match && match[1]) {
    return { num: parseFloat(match[1]), unit: match[2] ?? 'px' };
  }
  return { num: 0, unit: 'px' };
}

function getMaxForType(type: 'spacing' | 'radius' | 'borderWidth' | 'shadow'): number {
  switch (type) {
    case 'spacing': return 100;
    case 'radius': return 64;
    case 'borderWidth': return 10;
    default: return 100;
  }
}

export function OtherToken({ name, value, cssVar, type, onUpdate }: OtherTokenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [originalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleSave = () => {
    onUpdate(name, editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleReset = () => {
    setEditValue(originalValue);
    onUpdate(name, originalValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const { num, unit } = parseValue(editValue);
  const isShadowType = type === 'shadow';

  // Preview component based on token type
  const renderPreview = () => {
    if (type === 'spacing') {
      return (
        <div className="w-full h-8 bg-muted rounded flex items-center justify-start overflow-hidden">
          <div 
            className="h-full bg-primary/30 border-r-2 border-primary transition-all duration-200"
            style={{ width: value === '0' ? '2px' : value }}
          />
        </div>
      );
    }
    if (type === 'radius') {
      return (
        <div 
          className="w-12 h-12 bg-primary/20 border-2 border-primary transition-all duration-200"
          style={{ borderRadius: value }}
        />
      );
    }
    if (type === 'borderWidth') {
      return (
        <div 
          className="w-full h-8 bg-muted rounded flex items-center justify-center"
        >
          <div 
            className="w-16 h-6 bg-background border-primary transition-all duration-200"
            style={{ borderWidth: value, borderStyle: 'solid' }}
          />
        </div>
      );
    }
    if (type === 'shadow') {
      return (
        <div className="w-full h-12 flex items-center justify-center p-2">
          <div 
            className="w-full h-full bg-background rounded-md transition-all duration-200"
            style={{ boxShadow: value }}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors group border border-transparent hover:border-border">
      {/* Token Name */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-mono text-muted-foreground truncate">{cssVar}</p>
      </div>

      {/* Preview */}
      <div className="w-20 flex-shrink-0">
        {renderPreview()}
      </div>

      {/* Value Display/Edit */}
      <div className="w-40 flex-shrink-0">
        {isEditing ? (
          <div className="flex items-center gap-1">
            {isShadowType ? (
              <Input
                ref={inputRef}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-8 text-sm font-mono"
                autoFocus
              />
            ) : (
              <div className="flex items-center gap-2 w-full">
                <Input
                  ref={inputRef}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-8 text-sm font-mono w-20"
                  autoFocus
                />
              </div>
            )}
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={handleSave}>
              <Check className="h-4 w-4 text-success" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={handleCancel}>
              <X className="h-4 w-4 text-danger" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono truncate">{value}</span>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Preview: {cssVar}</p>
                      <div className="p-4 bg-muted rounded-lg">
                        {renderPreview()}
                      </div>
                    </div>
                    {!isShadowType && value !== '0' && value !== 'none' && (
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">Adjust value</p>
                        <Slider
                          value={[num]}
                          min={0}
                          max={getMaxForType(type)}
                          step={1}
                          onValueChange={(vals: number[]) => {
                            const newValue = vals[0] === 0 ? '0' : `${vals[0]}${unit}`;
                            setEditValue(newValue);
                            onUpdate(name, newValue);
                          }}
                        />
                        <p className="text-xs text-center text-muted-foreground">{editValue}</p>
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-7 w-7 p-0"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              {value !== originalValue && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-7 w-7 p-0"
                  onClick={handleReset}
                  title="Reset to default"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface OtherTokenSectionProps {
  title: string;
  tokens: Array<{ name: string; value: string; cssVar: string }>;
  type: 'spacing' | 'radius' | 'borderWidth' | 'shadow';
  onUpdate: (name: string, value: string) => void;
}

export function OtherTokenSection({ title, tokens, type, onUpdate }: OtherTokenSectionProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-foreground mb-3">{title}</h4>
      <div className="space-y-1">
        {tokens.map((token) => (
          <OtherToken
            key={token.name}
            name={token.name}
            value={token.value}
            cssVar={token.cssVar}
            type={type}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
}
