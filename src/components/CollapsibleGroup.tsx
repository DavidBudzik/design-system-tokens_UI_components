import { ReactNode } from 'react';
import { Circle, Pencil, Menu, CheckSquare, Calendar, AlertTriangle, Bell, Zap, Palette, MessageSquare, Grid } from 'lucide-react';

interface CollapsibleGroupProps {
  title: string;
  description: string;
  icon?: string;
  children: ReactNode;
  className?: string;
  twoColumnLayout?: boolean;
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
  'message-square': MessageSquare,
  'grid': Grid,
};

export function CollapsibleGroup({ 
  title, 
  description, 
  icon,
  children,
  className = '',
  twoColumnLayout = false
}: CollapsibleGroupProps) {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="mb-6">
        <div>
          <h2 className="mb-2 flex items-center gap-2">
            {IconComponent && <IconComponent className="w-5 h-5" />}
            {title}
          </h2>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      
      <div className={twoColumnLayout ? "grid grid-cols-1 xl:grid-cols-2 gap-4" : "space-y-4"}>
        {children}
      </div>
    </div>
  );
}
