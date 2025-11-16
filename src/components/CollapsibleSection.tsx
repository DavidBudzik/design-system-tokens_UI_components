import { ReactNode, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

interface CollapsibleSectionProps {
  id: string;
  title: string;
  description?: string;
  hint: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function CollapsibleSection({
  id,
  title,
  description,
  hint,
  defaultOpen = false,
  children
}: CollapsibleSectionProps) {
  const [value, setValue] = useState<string | undefined>(defaultOpen ? id : undefined);

  useEffect(() => {
    // Emit event when accordion state changes
    const isOpen = value === id;
    window.dispatchEvent(new CustomEvent('accordionStateChange', {
      detail: { sectionId: id, isOpen }
    }));
  }, [value, id]);

  useEffect(() => {
    // Listen for collapse all event
    const handleCollapseAll = () => {
      setValue(undefined);
    };

    window.addEventListener('collapseAllSections', handleCollapseAll);
    return () => {
      window.removeEventListener('collapseAllSections', handleCollapseAll);
    };
  }, []);

  return (
    <Accordion type="single" collapsible value={value} onValueChange={setValue}>
      <AccordionItem 
        id={id}
        value={id} 
        className="border-2 border-border/60 rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md hover:border-border transition-all duration-200"
      >
        <AccordionTrigger className="px-6 py-5 hover:bg-accent/40 transition-all duration-200 group [&[data-state=open]]:bg-accent/20 [&[data-state=open]]:border-b-2 [&[data-state=open]]:border-border/60">
          <div className="flex-1 text-left space-y-2">
            <div className="flex items-center justify-between gap-4">
              <h3 className="group-hover:text-foreground transition-colors">{title}</h3>
              
            </div>
            {description && (
              <p className="text-sm text-muted-foreground pr-8">
                {description}
              </p>
            )}
            <p className="text-xs text-muted-foreground/60 italic pr-8">
              {hint}
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 py-6 bg-background/30">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
