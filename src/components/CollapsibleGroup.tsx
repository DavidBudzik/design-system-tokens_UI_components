import { ReactNode, useState, useEffect } from 'react';
import { ChevronUp, Circle, Pencil, Menu, CheckSquare, Calendar, AlertTriangle, Bell, Zap, Palette } from 'lucide-react';
import { Button } from './ui/button';

interface CollapsibleGroupProps {
  title: string;
  description: string;
  icon?: string;
  children: ReactNode;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'circle': Circle,
  'pencil': Pencil,
  'menu': Menu,
  'check-square': CheckSquare,
  'calendar': Calendar,
  'alert-triangle': AlertTriangle,
  'bell': Bell,
  'zap': Zap,
  'palette': Palette,
};

export function CollapsibleGroup({ 
  title, 
  description, 
  icon,
  children,
  className = ''
}: CollapsibleGroupProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [hasAnySectionOpen, setHasAnySectionOpen] = useState(false);
  const IconComponent = icon ? iconMap[icon] : null;

  useEffect(() => {
    // Check if any sections are open
    setHasAnySectionOpen(openSections.size > 0);
  }, [openSections]);

  // Listen for accordion state changes
  useEffect(() => {
    const handleAccordionChange = (e: CustomEvent) => {
      const { sectionId, isOpen } = e.detail;
      setOpenSections(prev => {
        const newSet = new Set(prev);
        if (isOpen) {
          newSet.add(sectionId);
        } else {
          newSet.delete(sectionId);
        }
        return newSet;
      });
    };

    window.addEventListener('accordionStateChange' as any, handleAccordionChange);
    return () => {
      window.removeEventListener('accordionStateChange' as any, handleAccordionChange);
    };
  }, []);

  const handleCollapseAll = () => {
    // Dispatch event to collapse all sections
    window.dispatchEvent(new CustomEvent('collapseAllSections'));
    setOpenSections(new Set());
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="mb-2 flex items-center gap-2">
            {IconComponent && <IconComponent className="w-5 h-5" />}
            {title}
          </h2>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
        {hasAnySectionOpen && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCollapseAll}
            className="gap-2 shrink-0"
          >
            <ChevronUp className="w-4 h-4" />
            Collapse All
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
