import { ReactNode } from 'react';

interface CollapsibleSectionProps {
  id: string;
  title: string;
  description?: string;
  hint: string;
  defaultOpen?: boolean; // kept for compatibility
  children: ReactNode;
}

export function CollapsibleSection({
  id,
  title,
  description,
  hint,
  children
}: CollapsibleSectionProps) {
  return (
    <div 
      id={id}
      className="border-2 border-border/60 rounded-xl overflow-hidden bg-card shadow-sm"
    >
      <div className="px-6 py-5 bg-accent/20 border-b-2 border-border/60">
        <div className="flex-1 text-left space-y-2">
          <div className="flex items-center justify-between gap-4">
            <h3>{title}</h3>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
          <p className="text-xs text-muted-foreground/60 italic">
            {hint}
          </p>
        </div>
      </div>
      <div className="px-6 py-6 bg-background/30">
        {children}
      </div>
    </div>
  );
}
