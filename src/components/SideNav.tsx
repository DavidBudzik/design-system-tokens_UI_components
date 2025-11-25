import { useState } from 'react';
import { ChevronRight, Menu, X, Circle, Pencil, Menu as MenuIcon, CheckSquare, Calendar, AlertTriangle, Bell, Zap, Palette, MessageSquare, Grid } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface NavItem {
  id: string;
  label: string;
  icon?: string;
}

interface NavGroup {
  title: string;
  icon: string;
  items: NavItem[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'circle': Circle,
  'pencil': Pencil,
  'menu': MenuIcon,
  'check-square': CheckSquare,
  'calendar': Calendar,
  'alert-triangle': AlertTriangle,
  'bell': Bell,
  'zap': Zap,
  'palette': Palette,
  'message-square': MessageSquare,
  'grid': Grid,
};

interface SideNavProps {
  groups: NavGroup[];
}

export function SideNav({ groups }: SideNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['Colors', 'Typography']));

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Find the accordion trigger - it's a direct child button with data-state attribute
      const accordionTrigger = element.querySelector('button[data-state]');
      const isCollapsed = accordionTrigger?.getAttribute('data-state') === 'closed';
      
      if (isCollapsed && accordionTrigger) {
        // First scroll to the element
        scrollToElement(element);
        // Then open the accordion after a brief delay
        setTimeout(() => {
          (accordionTrigger as HTMLElement).click();
        }, 300);
      } else {
        // Just scroll if already open
        scrollToElement(element);
      }
      
      // Close mobile menu after navigation
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      }
    }
  };

  const scrollToElement = (element: HTMLElement) => {
    // Find the main scrolling container
    const mainContainer = document.querySelector('main.overflow-y-auto') as HTMLElement;
    if (!mainContainer) return;

    // Calculate the element's position relative to the scrolling container
    const containerRect = mainContainer.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    
    // Current scroll position + element position relative to viewport - container position - offset
    const headerOffset = 32; // Add some padding from the top
    const targetScrollPosition = mainContainer.scrollTop + (elementRect.top - containerRect.top) - headerOffset;

    mainContainer.scrollTo({
      top: targetScrollPosition,
      behavior: 'smooth'
    });
  };

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-32 left-4 z-50 lg:hidden shadow-lg"
        size="icon"
        variant="default"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden mt-28"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Navigation */}
      <aside
        className={`fixed left-0 top-28 bottom-0 w-80 bg-card border-r border-border z-40 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ScrollArea className="h-full">
          <nav className="space-y-2 py-[32px] px-[12px]">
            <div className="mb-4">
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground px-3 mb-2">
                Navigation
              </h3>
            </div>

            {groups.map((group) => {
              const isExpanded = expandedGroups.has(group.title);
              const IconComponent = iconMap[group.icon];
              
              return (
                <div key={group.title} className="space-y-1">
                  <button
                    onClick={() => toggleGroup(group.title)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      {IconComponent && <IconComponent className="w-4 h-4" />}
                      <span className="text-sm">{group.title}</span>
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform text-muted-foreground ${
                        isExpanded ? 'rotate-90' : ''
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="ml-2 pl-4 border-l-2 border-border/50 space-y-1">
                      {group.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className="w-full text-left px-3 py-1.5 rounded-md hover:bg-accent/50 transition-colors text-sm text-muted-foreground hover:text-foreground"
                        >
                          {item.icon && <span className="mr-2">{item.icon}</span>}
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
}
