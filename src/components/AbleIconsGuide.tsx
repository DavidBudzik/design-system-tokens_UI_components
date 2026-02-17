import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Copy } from 'lucide-react';
import { CollapsibleGroup } from './CollapsibleGroup';
import { CollapsibleSection } from './CollapsibleSection';
import { toast } from 'sonner';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';

const AbleIconsGuide = () => {

  // Map Able icon names to Lucide icons
  const iconMapping: Record<string, LucideIcon> = {
    // Core Actions
    'Add': LucideIcons.Plus,
    'Add-small': LucideIcons.Plus,
    'Edit': LucideIcons.Edit,
    'Delete': LucideIcons.Trash2,
    'Delete multiple': LucideIcons.Trash,
    'Copy': LucideIcons.Copy,
    'Close': LucideIcons.X,
    'Close-small': LucideIcons.X,
    'Search': LucideIcons.Search,
    'Filter': LucideIcons.Filter,
    'Sort': LucideIcons.ArrowUpDown,
    'Drag': LucideIcons.GripVertical,
    'Refresh': LucideIcons.RefreshCw,
    'Reset': LucideIcons.RotateCcw,
    'Settings': LucideIcons.Settings,

    // Navigation
    'Arrow up': LucideIcons.ArrowUp,
    'Arrow down': LucideIcons.ArrowDown,
    'Arrow left': LucideIcons.ArrowLeft,
    'Arrow right': LucideIcons.ArrowRight,
    'Chevron up': LucideIcons.ChevronUp,
    'Chevron down': LucideIcons.ChevronDown,
    'Chevron left': LucideIcons.ChevronLeft,
    'Chevron right': LucideIcons.ChevronRight,
    'Expand-left': LucideIcons.PanelLeftOpen,
    'Expand-right': LucideIcons.PanelRightOpen,
    'Expand': LucideIcons.Expand,
    'Minimize': LucideIcons.Minimize,
    'Menu': LucideIcons.Menu,
    'Menu-horizontal': LucideIcons.MoreHorizontal,
    'Home': LucideIcons.Home,
    'New tab': LucideIcons.ExternalLink,
    'Link': LucideIcons.Link,

    // File & Data Management
    'File': LucideIcons.File,
    'Add file': LucideIcons.FilePlus,
    'Folder': LucideIcons.Folder,
    'Folder-open': LucideIcons.FolderOpen,
    'Move to folder': LucideIcons.FolderInput,
    'Add new folder': LucideIcons.FolderPlus,
    'Download': LucideIcons.Download,
    'Export/upload': LucideIcons.Upload,
    'Attachment': LucideIcons.Paperclip,
    'Copy to chat': LucideIcons.MessageSquarePlus,
    'Save to library': LucideIcons.Save,
    'Add from library': LucideIcons.LibraryBig,
    'Share': LucideIcons.Share2,

    // Research & Analysis
    'Query': LucideIcons.Search,
    'Query Added': LucideIcons.SearchCheck,
    'Added by Able': LucideIcons.Bot,
    'Running research': LucideIcons.Activity,
    'Deep dive': LucideIcons.TrendingDown,
    'Explore': LucideIcons.Compass,
    'Monitor': LucideIcons.Monitor,
    'Clusters': LucideIcons.Network,
    'Variables': LucideIcons.Variable,
    'Search everywhere': LucideIcons.ScanSearch,
    'Search Data and web': LucideIcons.Globe2,
    'Predictive reports': LucideIcons.TrendingUp,

    // Content Types
    'Table': LucideIcons.Table,
    'List': LucideIcons.List,
    'Add to list': LucideIcons.ListPlus,
    'Columns': LucideIcons.Columns3,
    'Add columns': LucideIcons.ColumnsIcon,
    'Graph-widget': LucideIcons.LineChart,
    'List-widget': LucideIcons.LayoutList,
    'PDF': LucideIcons.FileText,
    'PPTX': LucideIcons.Presentation,
    'JSON': LucideIcons.FileJson,
    'Text': LucideIcons.Text,
    'Numbers': LucideIcons.Hash,
    'Report': LucideIcons.FileBarChart,
    'Decision': LucideIcons.GitBranch,
    'Executive summary': LucideIcons.FileCheck,

    // Status & Feedback
    'Info': LucideIcons.Info,
    'Alert': LucideIcons.AlertCircle,
    'Confirmation': LucideIcons.CheckCircle,
    'Notifications': LucideIcons.Bell,
    'Loader-dark': LucideIcons.Loader2,
    'Loader-light': LucideIcons.Loader,
    'Show': LucideIcons.Eye,
    'Hide': LucideIcons.EyeOff,
    'Locked': LucideIcons.Lock,
    'Unlocked': LucideIcons.Unlock,
    'Blocked': LucideIcons.Ban,
    'Locked for Collaboration': LucideIcons.Users,
    'Play': LucideIcons.Play,
    'Stop': LucideIcons.Square,
    'Pause to review': LucideIcons.Pause,
    'Yes/No': LucideIcons.ToggleLeft,

    // Collaboration & Users
    'Profile': LucideIcons.User,
    'Teams': LucideIcons.Users,
    'Collaborate': LucideIcons.UserPlus,
    'Leadership': LucideIcons.Crown,
    'Send': LucideIcons.Send,
    'Email': LucideIcons.Mail,
    'Website': LucideIcons.Globe,
    'Logout': LucideIcons.LogOut,
    'Actions': LucideIcons.Zap,
    'Context Menu': LucideIcons.MoreVertical,
    'Slash': LucideIcons.Slash,
    'Sidebar': LucideIcons.PanelLeft,

    // Data Sources
    'LinkedIn': LucideIcons.Linkedin,
    'Crunchbase': LucideIcons.Database,
    'Pitchbook data': LucideIcons.PieChart,
    'Able Database': LucideIcons.Database,
    'Business': LucideIcons.Briefcase,
    'Growth': LucideIcons.TrendingUp,
    'Partners': LucideIcons.Handshake,
    'Locations': LucideIcons.MapPin,
    'Dollar': LucideIcons.DollarSign,
    'Calendar': LucideIcons.Calendar,
    'Hidden gems': LucideIcons.Gem,
    'Left leadership': LucideIcons.UserMinus,

    // Specialized Tools
    'Workflow/plan': LucideIcons.GitPullRequest,
    'Dependency': LucideIcons.GitMerge,
    'History': LucideIcons.History,
    'Creation Time': LucideIcons.Clock,
    'Product': LucideIcons.Package,
    'Subdomain': LucideIcons.Globe,
    'Locate follow-up': LucideIcons.Target,
    'Knowledge': LucideIcons.Lightbulb,
    'Pointer/Manual': LucideIcons.MousePointer,
    'Color': LucideIcons.Palette,
    'Tag': LucideIcons.Tag,
    'Code Assistant': LucideIcons.Code2,
    'Add company': LucideIcons.Building,
    'Rerun': LucideIcons.RotateCw,
    'Erase': LucideIcons.Eraser,
    'Birthday cake': LucideIcons.Cake,
    'Favorite': LucideIcons.Star,
  };

  const iconGroups = {
    'Core Actions': {
      description: 'Universal actions used throughout the platform',
      icons: ['Add', 'Add-small', 'Edit', 'Delete', 'Delete multiple', 'Copy', 'Close', 'Close-small', 'Search', 'Filter', 'Sort', 'Drag', 'Refresh', 'Reset', 'Settings']
    },
    'Navigation': {
      description: 'Directional and movement controls',
      icons: ['Arrow up', 'Arrow down', 'Arrow left', 'Arrow right', 'Chevron up', 'Chevron down', 'Chevron left', 'Chevron right', 'Expand-left', 'Expand-right', 'Expand', 'Minimize', 'Menu', 'Menu-horizontal', 'Home', 'New tab', 'Link']
    },
    'File & Data Management': {
      description: 'File operations and data handling',
      icons: ['File', 'Add file', 'Folder', 'Folder-open', 'Move to folder', 'Add new folder', 'Download', 'Export/upload', 'Attachment', 'Copy to chat', 'Save to library', 'Add from library', 'Share']
    },
    'Research & Analysis': {
      description: 'Platform-specific research features',
      icons: ['Query', 'Query Added', 'Added by Able', 'Running research', 'Deep dive', 'Explore', 'Monitor', 'Clusters', 'Variables', 'Search everywhere', 'Search Data and web', 'Predictive reports']
    },
    'Content Types': {
      description: 'Document and data formats',
      icons: ['Table', 'List', 'Add to list', 'Columns', 'Add columns', 'Graph-widget', 'List-widget', 'PDF', 'PPTX', 'JSON', 'Text', 'Numbers', 'Report', 'Decision', 'Executive summary']
    },
    'Status & Feedback': {
      description: 'System states and user feedback',
      icons: ['Info', 'Alert', 'Confirmation', 'Notifications', 'Loader-dark', 'Loader-light', 'Show', 'Hide', 'Locked', 'Unlocked', 'Blocked', 'Locked for Collaboration', 'Play', 'Stop', 'Pause to review', 'Yes/No']
    },
    'Collaboration & Users': {
      description: 'Team and user-related actions',
      icons: ['Profile', 'Teams', 'Collaborate', 'Leadership', 'Send', 'Email', 'Website', 'Logout', 'Actions', 'Context Menu', 'Slash', 'Sidebar']
    },
    'Data Sources': {
      description: 'External integrations and data types',
      icons: ['LinkedIn', 'Crunchbase', 'Pitchbook data', 'Able Database', 'Business', 'Growth', 'Partners', 'Locations', 'Dollar', 'Calendar', 'Hidden gems', 'Left leadership']
    },
    'Specialized Tools': {
      description: 'Platform-specific features',
      icons: ['Workflow/plan', 'Dependency', 'History', 'Creation Time', 'Product', 'Subdomain', 'Locate follow-up', 'Knowledge', 'Pointer/Manual', 'Color', 'Tag', 'Code Assistant', 'Add company', 'Rerun', 'Erase', 'Birthday cake', 'Favorite']
    }
  };

  const handleIconClick = (iconName: string) => {
    const IconComponent = iconMapping[iconName] || LucideIcons.HelpCircle;
    
    // Create SVG string for Figma using client-side rendering
    const container = document.createElement('div');
    // Use React 18 createRoot for rendering
    const root = createRoot(container);
    
    // Force synchronous flush to get the HTML immediately
    flushSync(() => {
      root.render(
        // @ts-expect-error dynamic icon component from lucide-react
        <IconComponent
          size={24}
          color="#000000"
          strokeWidth={1}
        />
      );
    });

    const svgString = container.innerHTML;
    
    // Clean up (async to avoid interfering with current execution)
    setTimeout(() => {
      root.unmount();
    }, 0);

    const copyToClipboard = async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        toast.success(`Icon SVG copied for Figma`);
      } catch (err) {
        // Fallback for environments where clipboard API is blocked
        try {
          const textArea = document.createElement("textarea");
          textArea.value = text;
          textArea.style.position = "fixed";
          textArea.style.left = "-9999px";
          textArea.style.top = "0";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          toast.success(`Icon SVG copied for Figma`);
        } catch (fallbackErr) {
          console.error('Failed to copy:', fallbackErr);
          toast.error("Failed to copy icon");
        }
      }
    };
    
    copyToClipboard(svgString);
  };

  return (
    <div className="w-full px-6 py-6 max-w-none">
      <div className="space-y-6">

        {/* Icons by Category */}
        {Object.entries(iconGroups).map(([groupName, groupData], index) => (
          <CollapsibleGroup
            key={groupName}
            title={groupName}
            description={groupData.description}
            className={index > 0 ? "mt-6" : ""}
          >
            <CollapsibleSection
              id={groupName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              title={groupName}
              description={groupData.description}
              hint={`${groupData.icons.length} icons`}
              defaultOpen={index < 2}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {groupData.icons.map(iconName => {
                  const IconComponent = iconMapping[iconName] || LucideIcons.HelpCircle;
                  
                  return (
                    <div
                      key={iconName}
                      onClick={() => handleIconClick(iconName)}
                      className="group relative flex flex-col items-center justify-start p-4 rounded-lg bg-background hover:bg-accent transition-all cursor-pointer h-32 border border-transparent hover:border-border"
                    >
                      <div className="mb-3">
                        {/* @ts-expect-error dynamic icon component from lucide-react */}
                        <IconComponent size={24} strokeWidth={1} className="text-foreground" />
                      </div>
                      <span className="text-xs text-muted-foreground text-center break-words w-full group-hover:text-foreground transition-colors line-clamp-2">
                        {iconName}
                      </span>
                      
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Copy className="w-3 h-3 text-muted-foreground" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CollapsibleSection>
          </CollapsibleGroup>
        ))}
      </div>
    </div>
  );
};

export default AbleIconsGuide;
