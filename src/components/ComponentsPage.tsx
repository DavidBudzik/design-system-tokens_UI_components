import { ComponentShowcase } from './ComponentShowcase';
import { CollapsibleSection } from './CollapsibleSection';
import { CollapsibleGroup } from './CollapsibleGroup';
import { ButtonStatesShowcase } from './ButtonStatesShowcase';
import { BulkActionPanel } from './BulkActionPanel';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ChevronDown, MoreVertical, Download, Trash2, Check, Plus, ArrowRight, Search, Settings, User, LogOut, CreditCard, Users, FileText, Copy, Edit, Mail, Bell, Filter, X, Calendar as CalendarIcon, AlertTriangle, Info } from 'lucide-react';
import { useState } from 'react';
import { Calendar } from './ui/calendar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Checkbox } from './ui/checkbox';
import { Switch } from './ui/switch';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { toast } from 'sonner@2.0.3';

// Search Input Demo Component
function SearchInputDemo() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const items = [
    'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
    'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon',
    'Mango', 'Nectarine', 'Orange', 'Papaya', 'Quince'
  ];
  
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-md space-y-2">
      <Label htmlFor="search">Search</Label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          id="search"
          type="search"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            backgroundColor: 'var(--surface-surface-input-default, #F7F7F7)',
            borderColor: 'var(--border-border-default, #E0E0E0)'
          }}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => setSearchQuery('')}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      {searchQuery && (
        <div className="border border-border rounded-lg overflow-hidden max-h-60 overflow-y-auto bg-background">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, i) => (
              <div
                key={i}
                className="px-4 py-3 hover:bg-secondary cursor-pointer transition-colors"
              >
                {item}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-muted-foreground">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ComponentsPage() {
  return (
    <div className="w-full px-6 py-6 max-w-none">
      <div className="space-y-6">
        {/* Buttons Section */}
        <CollapsibleGroup
          title="Buttons"
          description="Button components using design system color tokens."
          icon="circle"
        >
          <CollapsibleSection
            id="button-primary"
            title="Primary Button (CTA)"
            description="Primary action button using CTA color tokens"
            hint="Click to view button examples"
            defaultOpen={true}
          >
            <div className="space-y-6">
              <ComponentShowcase
                title="Primary Button - Default State"
                description="Main call-to-action button with hover and active states"
                tokens={['--cta-cta-default', '--cta-cta-hover', '--cta-cta-active']}
                preview={
                  <div className="flex gap-4 items-center">
                    <Button 
                      style={{
                        backgroundColor: 'var(--cta-cta-default, #E03600)',
                        color: 'white'
                      }}
                      className="hover:opacity-90"
                    >
                      Primary Button
                    </Button>
                    <Button 
                      style={{
                        backgroundColor: 'var(--cta-cta-disabled, #FFD4C2)',
                        color: 'white',
                        cursor: 'not-allowed'
                      }}
                      disabled
                    >
                      Disabled
                    </Button>
                  </div>
                }
                code={{
                  html: `<button class="btn-primary">Primary Button</button>
<button class="btn-primary" disabled>Disabled</button>`,
                  css: `.btn-primary {
  background-color: var(--cta-cta-default);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: var(--cta-cta-hover);
}

.btn-primary:active {
  background-color: var(--cta-cta-active);
}

.btn-primary:disabled {
  background-color: var(--cta-cta-disabled);
  cursor: not-allowed;
}`,
                  react: `import { Button } from './ui/button';

function PrimaryButton() {
  return (
    <Button 
      style={{
        backgroundColor: 'var(--cta-cta-default)',
        color: 'white'
      }}
      className="hover:opacity-90 px-6 py-3 rounded-lg"
    >
      Primary Button
    </Button>
  );
}`
                }}
              />

              <ComponentShowcase
                title="Secondary Button"
                description="Secondary button using primary color tokens"
                tokens={['--primary-primary-default', '--primary-primary-hover', '--primary-primary-active']}
                preview={
                  <div className="flex gap-4 items-center">
                    <Button 
                      variant="outline"
                      style={{
                        borderColor: 'var(--primary-primary-default, #242424)',
                        color: 'var(--primary-primary-default, #242424)'
                      }}
                    >
                      Secondary Button
                    </Button>
                    <Button 
                      variant="outline"
                      style={{
                        borderColor: 'var(--primary-primary-disabled, #BDBDBD)',
                        color: 'var(--primary-primary-disabled, #BDBDBD)',
                        cursor: 'not-allowed'
                      }}
                      disabled
                    >
                      Disabled
                    </Button>
                  </div>
                }
                code={{
                  html: `<button class="btn-secondary">Secondary Button</button>
<button class="btn-secondary" disabled>Disabled</button>`,
                  css: `.btn-secondary {
  background-color: transparent;
  color: var(--primary-primary-default);
  border: 1.5px solid var(--primary-primary-default);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  border-color: var(--primary-primary-hover);
  color: var(--primary-primary-hover);
}

.btn-secondary:active {
  border-color: var(--primary-primary-active);
  color: var(--primary-primary-active);
}

.btn-secondary:disabled {
  border-color: var(--primary-primary-disabled);
  color: var(--primary-primary-disabled);
  cursor: not-allowed;
}`,
                  react: `import { Button } from './ui/button';

function SecondaryButton() {
  return (
    <Button 
      variant="outline"
      style={{
        borderColor: 'var(--primary-primary-default)',
        color: 'var(--primary-primary-default)'
      }}
      className="px-6 py-3 rounded-lg"
    >
      Secondary Button
    </Button>
  );
}`
                }}
              />
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="button-states"
            title="All Button States & Interactions"
            description="Complete interactive button state matrix showing all variants and their states"
            hint="Click to view interactive button states showcase"
            defaultOpen={true}
          >
            <ButtonStatesShowcase />
          </CollapsibleSection>

          <CollapsibleSection
            id="button-variants"
            title="Individual Button Variants"
            description="Danger, success, and warning button examples"
            hint="Click to view individual button examples with code"
          >
            <div className="space-y-6">
              <ComponentShowcase
                title="Danger Button"
                description="Destructive action button using danger color tokens"
                tokens={['--danger-danger-default', '--danger-danger-hover', '--danger-danger-active', '--danger-danger-disabled']}
                preview={
                  <div className="flex gap-4 items-center">
                    <Button 
                      variant="destructive"
                      style={{
                        backgroundColor: 'var(--danger-danger-default, #E03636)',
                        color: 'white'
                      }}
                    >
                      Delete
                    </Button>
                    <Button 
                      variant="destructive"
                      style={{
                        backgroundColor: 'var(--danger-danger-disabled, #F7B0B0)',
                        color: 'white',
                        cursor: 'not-allowed'
                      }}
                      disabled
                    >
                      Disabled
                    </Button>
                  </div>
                }
                code={{
                  html: `<button class="btn-danger">Delete</button>
<button class="btn-danger" disabled>Disabled</button>`,
                  css: `.btn-danger {
  background-color: var(--danger-danger-default);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-danger:hover {
  background-color: var(--danger-danger-hover);
}

.btn-danger:active {
  background-color: var(--danger-danger-active);
}

.btn-danger:focus {
  outline: 2px solid var(--danger-danger-hover);
  outline-offset: 2px;
}

.btn-danger:disabled {
  background-color: var(--danger-danger-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}`,
                  react: `function DangerButton() {
  return (
    <Button 
      variant="destructive"
      style={{
        backgroundColor: 'var(--danger-danger-default)',
        color: 'white'
      }}
    >
      Delete
    </Button>
  );
}`
                }}
              />

              <ComponentShowcase
                title="Success Button"
                description="Success action button using success color tokens"
                tokens={['--success-success-default', '--success-success-hover', '--success-success-active', '--success-success-disabled']}
                preview={
                  <div className="flex gap-4 items-center">
                    <Button 
                      style={{
                        backgroundColor: 'var(--success-success-default, #1CD166)',
                        color: 'white'
                      }}
                    >
                      Confirm
                    </Button>
                    <Button 
                      style={{
                        backgroundColor: 'var(--success-success-disabled, #A6F5CC)',
                        color: 'white',
                        cursor: 'not-allowed'
                      }}
                      disabled
                    >
                      Disabled
                    </Button>
                  </div>
                }
                code={{
                  html: `<button class="btn-success">Confirm</button>
<button class="btn-success" disabled>Disabled</button>`,
                  css: `.btn-success {
  background-color: var(--success-success-default);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-success:hover {
  background-color: var(--success-success-hover);
}

.btn-success:active {
  background-color: var(--success-success-active);
}

.btn-success:focus {
  outline: 2px solid var(--success-success-hover);
  outline-offset: 2px;
}

.btn-success:disabled {
  background-color: var(--success-success-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}`,
                  react: `function SuccessButton() {
  return (
    <Button 
      style={{
        backgroundColor: 'var(--success-success-default)',
        color: 'white'
      }}
    >
      Confirm
    </Button>
  );
}`
                }}
              />

              <ComponentShowcase
                title="Warning Button"
                description="Warning or cautionary action button"
                tokens={['--warning-warning-default', '--warning-warning-hover', '--warning-warning-active', '--warning-warning-disabled']}
                preview={
                  <div className="flex gap-4 items-center">
                    <Button 
                      style={{
                        backgroundColor: 'var(--warning-warning-default, #FFB529)',
                        color: '#171717'
                      }}
                    >
                      Proceed with Caution
                    </Button>
                    <Button 
                      style={{
                        backgroundColor: 'var(--warning-warning-disabled, #FFF0BF)',
                        color: '#171717',
                        cursor: 'not-allowed'
                      }}
                      disabled
                    >
                      Disabled
                    </Button>
                  </div>
                }
                code={{
                  html: `<button class="btn-warning">Proceed with Caution</button>
<button class="btn-warning" disabled>Disabled</button>`,
                  css: `.btn-warning {
  background-color: var(--warning-warning-default);
  color: #171717;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-warning:hover {
  background-color: var(--warning-warning-hover);
}

.btn-warning:active {
  background-color: var(--warning-warning-active);
  color: white;
}

.btn-warning:focus {
  outline: 2px solid var(--warning-warning-hover);
  outline-offset: 2px;
}

.btn-warning:disabled {
  background-color: var(--warning-warning-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}`,
                  react: `function WarningButton() {
  return (
    <Button 
      style={{
        backgroundColor: 'var(--warning-warning-default)',
        color: '#171717'
      }}
    >
      Proceed with Caution
    </Button>
  );
}`
                }}
              />
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="button-icons"
            title="Buttons with Icons"
            description="Icon buttons, buttons with leading/trailing icons, and icon-only buttons"
            hint="Click to view icon button examples with code"
          >
            <div className="space-y-6">
              <ComponentShowcase
                title="Button with Leading Icon"
                description="Icon positioned before the button text"
                tokens={['--cta-cta-default']}
                preview={
                  <div className="flex gap-4 flex-wrap">
                    <Button 
                      style={{
                        backgroundColor: 'var(--cta-cta-default, #E03600)',
                        color: 'white'
                      }}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button 
                      style={{
                        backgroundColor: 'var(--success-success-default, #1CD166)',
                        color: 'white'
                      }}
                      className="gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Confirm
                    </Button>
                    <Button 
                      variant="outline"
                      style={{
                        borderColor: 'var(--primary-primary-default, #242424)',
                        color: 'var(--primary-primary-default, #242424)'
                      }}
                      className="gap-2"
                    >
                      <Search className="w-4 h-4" />
                      Search
                    </Button>
                  </div>
                }
                code={{
                  html: `<button class="btn-primary">
  <svg class="icon">...</svg>
  Download
</button>`,
                  css: `.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--cta-cta-default);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary .icon {
  width: 16px;
  height: 16px;
}`,
                  react: `import { Download } from 'lucide-react';
import { Button } from './ui/button';

function ButtonWithIcon() {
  return (
    <Button 
      style={{
        backgroundColor: 'var(--cta-cta-default)',
        color: 'white'
      }}
      className="gap-2"
    >
      <Download className="w-4 h-4" />
      Download
    </Button>
  );
}`
                }}
              />

              <ComponentShowcase
                title="Button with Trailing Icon"
                description="Icon positioned after the button text"
                tokens={['--cta-cta-default']}
                preview={
                  <div className="flex gap-4 flex-wrap">
                    <Button 
                      style={{
                        backgroundColor: 'var(--cta-cta-default, #E03600)',
                        color: 'white'
                      }}
                      className="gap-2"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline"
                      style={{
                        borderColor: 'var(--primary-primary-default, #242424)',
                        color: 'var(--primary-primary-default, #242424)'
                      }}
                      className="gap-2"
                    >
                      Settings
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                }
                code={{
                  html: `<button class="btn-primary">
  Continue
  <svg class="icon">...</svg>
</button>`,
                  css: `.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--cta-cta-default);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary .icon {
  width: 16px;
  height: 16px;
}`,
                  react: `import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

function ButtonWithTrailingIcon() {
  return (
    <Button 
      style={{
        backgroundColor: 'var(--cta-cta-default)',
        color: 'white'
      }}
      className="gap-2"
    >
      Continue
      <ArrowRight className="w-4 h-4" />
    </Button>
  );
}`
                }}
              />

              <ComponentShowcase
                title="Button with Icons on Both Sides"
                description="Icons positioned before and after the button text"
                tokens={['--cta-cta-default']}
                preview={
                  <div className="flex gap-4 flex-wrap">
                    <Button 
                      style={{
                        backgroundColor: 'var(--cta-cta-default, #E03600)',
                        color: 'white'
                      }}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Export File
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button 
                      style={{
                        backgroundColor: 'var(--success-success-default, #1CD166)',
                        color: 'white'
                      }}
                      className="gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Save Changes
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                }
                code={{
                  html: `<button class="btn-primary">
  <svg class="icon-left">...</svg>
  Export File
  <svg class="icon-right">...</svg>
</button>`,
                  css: `.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--cta-cta-default);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary .icon-left,
.btn-primary .icon-right {
  width: 16px;
  height: 16px;
}`,
                  react: `import { Download, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

function ButtonWithBothIcons() {
  return (
    <Button 
      style={{
        backgroundColor: 'var(--cta-cta-default)',
        color: 'white'
      }}
      className="gap-2"
    >
      <Download className="w-4 h-4" />
      Export File
      <ArrowRight className="w-4 h-4" />
    </Button>
  );
}`
                }}
              />

              <ComponentShowcase
                title="Icon-Only Buttons"
                description="Buttons with only an icon, no text - various sizes"
                tokens={['--cta-cta-default', '--danger-danger-default', '--success-success-default']}
                preview={
                  <div className="space-y-4">
                    <div className="flex gap-3 items-end">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-muted-foreground">Small</span>
                        <Button 
                          size="sm"
                          style={{
                            backgroundColor: 'var(--cta-cta-default, #E03600)',
                            color: 'white'
                          }}
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-muted-foreground">Default</span>
                        <Button 
                          size="icon"
                          style={{
                            backgroundColor: 'var(--cta-cta-default, #E03600)',
                            color: 'white'
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-muted-foreground">Large</span>
                        <Button 
                          size="lg"
                          style={{
                            backgroundColor: 'var(--cta-cta-default, #E03600)',
                            color: 'white'
                          }}
                          className="w-12 h-12 p-0"
                        >
                          <Plus className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      <Button 
                        size="icon"
                        style={{
                          backgroundColor: 'var(--cta-cta-default, #E03600)',
                          color: 'white'
                        }}
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="icon"
                        variant="outline"
                        style={{
                          borderColor: 'var(--primary-primary-default, #242424)',
                          color: 'var(--primary-primary-default, #242424)'
                        }}
                        title="Search"
                      >
                        <Search className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="icon"
                        style={{
                          backgroundColor: 'var(--danger-danger-default, #E03636)',
                          color: 'white'
                        }}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="icon"
                        style={{
                          backgroundColor: 'var(--success-success-default, #1CD166)',
                          color: 'white'
                        }}
                        title="Confirm"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                }
                code={{
                  html: `<!-- Default Size -->
<button class="btn-icon" aria-label="Download">
  <svg class="icon">...</svg>
</button>

<!-- Small Size -->
<button class="btn-icon btn-icon-sm" aria-label="Add">
  <svg class="icon">...</svg>
</button>

<!-- Large Size -->
<button class="btn-icon btn-icon-lg" aria-label="Settings">
  <svg class="icon">...</svg>
</button>`,
                  css: `.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background-color: var(--cta-cta-default);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-icon:hover {
  background-color: var(--cta-cta-hover);
}

.btn-icon-sm {
  width: 32px;
  height: 32px;
}

.btn-icon-lg {
  width: 48px;
  height: 48px;
}

.btn-icon .icon {
  width: 16px;
  height: 16px;
}

.btn-icon-sm .icon {
  width: 14px;
  height: 14px;
}

.btn-icon-lg .icon {
  width: 20px;
  height: 20px;
}`,
                  react: `import { Plus, Download, Search } from 'lucide-react';
import { Button } from './ui/button';

function IconButtons() {
  return (
    <div className="flex gap-3">
      {/* Default size icon button */}
      <Button 
        size="icon"
        style={{
          backgroundColor: 'var(--cta-cta-default)',
          color: 'white'
        }}
        title="Add"
      >
        <Plus className="w-4 h-4" />
      </Button>

      {/* Small icon button */}
      <Button 
        size="sm"
        style={{
          backgroundColor: 'var(--cta-cta-default)',
          color: 'white'
        }}
        className="w-8 h-8 p-0"
        title="Download"
      >
        <Download className="w-3.5 h-3.5" />
      </Button>

      {/* Large icon button */}
      <Button 
        size="lg"
        style={{
          backgroundColor: 'var(--cta-cta-default)',
          color: 'white'
        }}
        className="w-12 h-12 p-0"
        title="Search"
      >
        <Search className="w-5 h-5" />
      </Button>
    </div>
  );
}`
                }}
              />
            </div>
          </CollapsibleSection>
        </CollapsibleGroup>

        {/* Form Inputs Section */}
        <CollapsibleGroup
          title="Form Inputs"
          description="Input components using surface and border color tokens."
          icon="pencil"
          className="mt-12 pt-8 border-t-2 border-border"
        >
          <CollapsibleSection
            id="input-text"
            title="Text Input"
            description="Standard text input field with states"
            hint="Click to view input examples"
            defaultOpen={true}
          >
            <div className="space-y-6">
              <ComponentShowcase
                title="Text Input Field"
                description="Standard text input with focus and error states"
                tokens={['--surface-surface-input-default', '--border-border-default', '--border-border-error']}
                preview={
                  <div className="w-full max-w-md space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Enter your name"
                        style={{
                          backgroundColor: 'var(--surface-surface-input-default, #F7F7F7)',
                          borderColor: 'var(--border-border-default, #E0E0E0)'
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-error">Email (Error State)</Label>
                      <Input 
                        id="email-error" 
                        placeholder="email@example.com"
                        style={{
                          backgroundColor: 'var(--surface-surface-input-default, #F7F7F7)',
                          borderColor: 'var(--border-border-error, #E03636)'
                        }}
                      />
                      <p className="text-sm" style={{ color: 'var(--danger-danger-default, #E03636)' }}>
                        Please enter a valid email
                      </p>
                    </div>
                  </div>
                }
                code={{
                  html: `<div class="input-group">
  <label for="name">Name</label>
  <input type="text" id="name" class="input" placeholder="Enter your name" />
</div>

<div class="input-group">
  <label for="email">Email (Error State)</label>
  <input type="email" id="email" class="input input-error" placeholder="email@example.com" />
  <span class="error-message">Please enter a valid email</span>
</div>`,
                  css: `.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input {
  background-color: var(--surface-surface-input-default);
  border: 1.5px solid var(--border-border-default);
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
}

.input:hover {
  border-color: var(--border-border-hover);
  background-color: var(--surface-surface-input-hover);
}

.input:focus {
  outline: none;
  border-color: var(--border-border-active);
  background-color: var(--surface-surface-input-active);
}

.input:disabled {
  background-color: var(--surface-surface-input-disabled);
  border-color: var(--border-border-disabled);
  cursor: not-allowed;
}

.input-error {
  border-color: var(--border-border-error);
}

.error-message {
  color: var(--danger-danger-default);
  font-size: 12px;
}`,
                  react: `import { Input } from './ui/input';
import { Label } from './ui/label';

function TextInput() {
  return (
    <div className="space-y-2">
      <Label htmlFor="name">Name</Label>
      <Input 
        id="name" 
        placeholder="Enter your name"
        style={{
          backgroundColor: 'var(--surface-surface-input-default)',
          borderColor: 'var(--border-border-default)'
        }}
      />
    </div>
  );
}`
                }}
              />
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="input-search"
            title="Search Input"
            description="Search input with live filtering functionality"
            hint="Click to view search input example"
          >
            <div className="space-y-6">
              <ComponentShowcase
                title="Search Input with Results"
                description="Search input field with live filtering of results"
                tokens={['--surface-surface-input-default', '--border-border-default', '--text-text-primary']}
                preview={
                  <SearchInputDemo />
                }
                code={{
                  html: `<div class="search-wrapper">
  <label for="search">Search</label>
  <div class="search-input-wrapper">
    <svg class="search-icon">...</svg>
    <input 
      type="search" 
      id="search" 
      class="search-input" 
      placeholder="Search items..."
    />
  </div>
  <div class="search-results">
    <div class="search-result-item">Result 1</div>
    <div class="search-result-item">Result 2</div>
  </div>
</div>`,
                  css: `.search-wrapper {
  width: 100%;
  max-width: 448px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  width: 16px;
  height: 16px;
  color: var(--text-text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  background-color: var(--surface-surface-input-default);
  border: 1.5px solid var(--border-border-default);
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--border-border-active);
  background-color: var(--surface-surface-input-active);
}

.search-results {
  margin-top: 8px;
  max-height: 240px;
  overflow-y: auto;
  background: var(--surface-surface-default);
  border: 1px solid var(--border-border-default);
  border-radius: 8px;
}

.search-result-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-result-item:hover {
  background-color: var(--secondary-secondary-default);
}`,
                  react: `import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

const items = [
  'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
  'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'
];

function SearchInputDemo() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-md space-y-2">
      <Label htmlFor="search">Search</Label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          id="search"
          type="search"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => setSearchQuery('')}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      {searchQuery && (
        <div className="border rounded-lg overflow-hidden max-h-60 overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, i) => (
              <div
                key={i}
                className="px-4 py-3 hover:bg-secondary cursor-pointer transition-colors"
              >
                {item}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-muted-foreground">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}`
                }}
              />
            </div>
          </CollapsibleSection>
        </CollapsibleGroup>

        {/* Dropdowns & Menus Section */}
        <CollapsibleGroup
          title="Dropdowns & Menus"
          description="Select and menu components using surface and text color tokens."
          icon="menu"
          className="mt-12 pt-8 border-t-2 border-border"
        >
          <CollapsibleSection
            id="dropdown-select"
            title="Select Dropdown"
            description="Dropdown select component"
            hint="Click to view select examples"
            defaultOpen={true}
          >
            <div className="space-y-6">
              <ComponentShowcase
                title="Select Input"
                description="Standard select dropdown"
                tokens={['--surface-surface-default', '--border-border-default', '--text-text-primary']}
                preview={
                  <div className="w-full max-w-md space-y-2">
                    <Label>Country</Label>
                    <Select>
                      <SelectTrigger style={{
                        backgroundColor: 'var(--surface-surface-input-default)',
                        borderColor: 'var(--border-border-default)'
                      }}>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                }
                code={{
                  html: `<div class="select-wrapper">
  <label>Country</label>
  <select class="select">
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="ca">Canada</option>
    <option value="au">Australia</option>
  </select>
</div>`,
                  css: `.select {
  background-color: var(--surface-surface-input-default);
  border: 1.5px solid var(--border-border-default);
  color: var(--text-text-primary);
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s;
}

.select:hover {
  border-color: var(--border-border-hover);
  background-color: var(--surface-surface-input-hover);
}

.select:focus {
  outline: none;
  border-color: var(--border-border-active);
}`,
                  react: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';

function SelectDropdown() {
  return (
    <div className="space-y-2">
      <Label>Country</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}`
                }}
              />
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="dropdown-menu"
            title="Dropdown Menu"
            description="Action menu component"
            hint="Click to view menu examples"
          >
            <div className="space-y-6">
              <ComponentShowcase
                title="Dropdown Menu"
                description="Menu with actions and separators"
                tokens={['--surface-surface-default', '--text-text-primary', '--text-text-muted']}
                preview={
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        Options
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem style={{ color: 'var(--danger-danger-default)' }}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                }
                code={{
                  html: `<div class="dropdown">
  <button class="dropdown-trigger">
    Options
    <svg class="icon">...</svg>
  </button>
  <div class="dropdown-menu">
    <div class="dropdown-label">Actions</div>
    <button class="dropdown-item">Edit</button>
    <button class="dropdown-item">Duplicate</button>
    <div class="dropdown-separator"></div>
    <button class="dropdown-item danger">Delete</button>
  </div>
</div>`,
                  css: `.dropdown-menu {
  background-color: var(--surface-surface-default);
  border: 1px solid var(--border-border-default);
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dropdown-label {
  color: var(--text-text-muted);
  font-size: 12px;
  padding: 8px 12px;
  font-weight: 600;
}

.dropdown-item {
  color: var(--text-text-primary);
  background: transparent;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: var(--secondary-secondary-default);
}

.dropdown-item.danger {
  color: var(--danger-danger-default);
}

.dropdown-separator {
  height: 1px;
  background-color: var(--border-border-default);
  margin: 4px 0;
}`,
                  react: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';

function ActionMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-danger">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`
                }}
              />
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="menu-with-icons"
            title="Menus with Icons"
            description="Action menus featuring icons for better visual hierarchy"
            hint="Click to view menu examples with icons"
          >
            <div className="space-y-6">
              <ComponentShowcase
                title="User Menu with Icons"
                description="Common user account menu with icon indicators"
                tokens={['--surface-surface-default', '--text-text-primary', '--text-text-muted']}
                preview={
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <User className="w-4 h-4" />
                        Account
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2">
                        <User className="w-4 h-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <CreditCard className="w-4 h-4" />
                        Billing
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Settings className="w-4 h-4" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Bell className="w-4 h-4" />
                        Notifications
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2" style={{ color: 'var(--danger-danger-default)' }}>
                        <LogOut className="w-4 h-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                }
                code={{
                  html: `<div class="dropdown">
  <button class="dropdown-trigger">
    <svg class="icon">...</svg>
    Account
    <svg class="icon-chevron">...</svg>
  </button>
  <div class="dropdown-menu">
    <div class="dropdown-label">My Account</div>
    <div class="dropdown-separator"></div>
    <button class="dropdown-item">
      <svg class="icon">...</svg>
      Profile
    </button>
    <button class="dropdown-item">
      <svg class="icon">...</svg>
      Billing
    </button>
    <button class="dropdown-item">
      <svg class="icon">...</svg>
      Settings
    </button>
    <div class="dropdown-separator"></div>
    <button class="dropdown-item danger">
      <svg class="icon">...</svg>
      Log out
    </button>
  </div>
</div>`,
                  css: `.dropdown-menu {
  background-color: var(--surface-surface-default);
  border: 1px solid var(--border-border-default);
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 224px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-text-primary);
  background: transparent;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: var(--secondary-secondary-default);
}

.dropdown-item .icon {
  width: 16px;
  height: 16px;
}

.dropdown-item.danger {
  color: var(--danger-danger-default);
}`,
                  react: `import { User, CreditCard, Settings, Bell, LogOut, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <User className="w-4 h-4" />
          Account
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <User className="w-4 h-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <CreditCard className="w-4 h-4" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Settings className="w-4 h-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-danger">
          <LogOut className="w-4 h-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`
                }}
              />

              <ComponentShowcase
                title="Document Actions Menu"
                description="Context menu for document or file operations"
                tokens={['--surface-surface-default', '--text-text-primary']}
                preview={
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2">
                        <FileText className="w-4 h-4" />
                        Open
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Edit className="w-4 h-4" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Copy className="w-4 h-4" />
                        Make a copy
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Mail className="w-4 h-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2" style={{ color: 'var(--danger-danger-default)' }}>
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                }
                code={{
                  html: `<div class="dropdown">
  <button class="dropdown-trigger-icon">
    <svg class="icon">...</svg>
  </button>
  <div class="dropdown-menu">
    <div class="dropdown-label">Actions</div>
    <div class="dropdown-separator"></div>
    <button class="dropdown-item">
      <svg class="icon">...</svg>
      Open
    </button>
    <button class="dropdown-item">
      <svg class="icon">...</svg>
      Rename
    </button>
    <button class="dropdown-item">
      <svg class="icon">...</svg>
      Make a copy
    </button>
    <button class="dropdown-item">
      <svg class="icon">...</svg>
      Share
    </button>
    <div class="dropdown-separator"></div>
    <button class="dropdown-item danger">
      <svg class="icon">...</svg>
      Delete
    </button>
  </div>
</div>`,
                  css: `.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-text-primary);
  background: transparent;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: var(--secondary-secondary-default);
}

.dropdown-item .icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.dropdown-item.danger {
  color: var(--danger-danger-default);
}

.dropdown-separator {
  height: 1px;
  background-color: var(--border-border-default);
  margin: 4px 0;
}`,
                  react: `import { FileText, Edit, Copy, Mail, Trash2, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';

function DocumentMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <FileText className="w-4 h-4" />
          Open
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Edit className="w-4 h-4" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Copy className="w-4 h-4" />
          Make a copy
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Mail className="w-4 h-4" />
          Share
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-danger">
          <Trash2 className="w-4 h-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`
                }}
              />

              <ComponentShowcase
                title="Team/Collaboration Menu"
                description="Menu for team management and collaboration features"
                tokens={['--surface-surface-default', '--text-text-primary']}
                preview={
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Users className="w-4 h-4" />
                        Team
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Team Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2">
                        <Users className="w-4 h-4" />
                        View members
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Plus className="w-4 h-4" />
                        Invite members
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Settings className="w-4 h-4" />
                        Team settings
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Filter className="w-4 h-4" />
                        Filter by member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                }
                code={{
                  html: `<div class="dropdown">
  <button class="dropdown-trigger">
    <svg class="icon">...</svg>
    Team
    <svg class="icon-chevron">...</svg>
  </button>
  <div class="dropdown-menu">
    <div class="dropdown-label">Team Options</div>
    <div class="dropdown-separator"></div>
    <button class="dropdown-item">
      <svg class="icon">...</svg>
      View members
    </button>
    <button class="dropdown-item">
      <svg class="icon">...</svg>
      Invite members
    </button>
    <button class="dropdown-item">
      <svg class="icon">...</svg>
      Team settings
    </button>
    <button class="dropdown-item">
      <svg class="icon">...</svg>
      Filter by member
    </button>
  </div>
</div>`,
                  css: `.dropdown-menu {
  background-color: var(--surface-surface-default);
  border: 1px solid var(--border-border-default);
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 224px;
}

.dropdown-label {
  color: var(--text-text-muted);
  font-size: 12px;
  padding: 8px 12px;
  font-weight: 600;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-text-primary);
  background: transparent;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: var(--secondary-secondary-default);
}

.dropdown-item .icon {
  width: 16px;
  height: 16px;
}`,
                  react: `import { Users, Plus, Settings, Filter, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';

function TeamMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Users className="w-4 h-4" />
          Team
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Team Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <Users className="w-4 h-4" />
          View members
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Plus className="w-4 h-4" />
          Invite members
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Settings className="w-4 h-4" />
          Team settings
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Filter className="w-4 h-4" />
          Filter by member
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`
                }}
              />
            </div>
          </CollapsibleSection>
        </CollapsibleGroup>

        {/* Form Controls Section */}
        <CollapsibleGroup
          title="Form Controls"
          description="Checkbox, switch, and radio button components."
          icon="check-square"
          className="mt-12 pt-8 border-t-2 border-border"
        >
          <CollapsibleSection
            id="control-checkbox"
            title="Checkbox"
            description="Checkbox controls for multi-select options"
            hint="Click to view checkbox examples"
            defaultOpen={true}
          >
            <div className="space-y-6">
              <ComponentShowcase
                title="Checkbox States"
                description="Checkboxes with checked and unchecked states"
                tokens={['--cta-cta-default', '--border-border-default']}
                preview={
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Checkbox id="terms1" />
                      <Label htmlFor="terms1" className="cursor-pointer">
                        Accept terms and conditions
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="marketing" defaultChecked />
                      <Label htmlFor="marketing" className="cursor-pointer">
                        Send me marketing emails
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="disabled" disabled />
                      <Label htmlFor="disabled" className="cursor-not-allowed opacity-50">
                        Disabled checkbox
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="disabled-checked" disabled defaultChecked />
                      <Label htmlFor="disabled-checked" className="cursor-not-allowed opacity-50">
                        Disabled checked
                      </Label>
                    </div>
                  </div>
                }
                code={{
                  html: `<div class="checkbox-group">
  <input type="checkbox" id="terms" class="checkbox" />
  <label for="terms">Accept terms and conditions</label>
</div>

<div class="checkbox-group">
  <input type="checkbox" id="marketing" class="checkbox" checked />
  <label for="marketing">Send me marketing emails</label>
</div>

<div class="checkbox-group">
  <input type="checkbox" id="disabled" class="checkbox" disabled />
  <label for="disabled">Disabled checkbox</label>
</div>`,
                  css: `.checkbox-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.checkbox {
  width: 20px;
  height: 20px;
  border: 1.5px solid var(--border-border-default);
  border-radius: 4px;
  cursor: pointer;
  appearance: none;
  background-color: var(--surface-surface-default);
  position: relative;
  transition: all 0.2s;
}

.checkbox:hover {
  border-color: var(--border-border-hover);
}

.checkbox:checked {
  background-color: var(--cta-cta-default);
  border-color: var(--cta-cta-default);
}

.checkbox:checked::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`,
                  react: `import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

function CheckboxDemo() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Checkbox id="terms" />
        <Label htmlFor="terms" className="cursor-pointer">
          Accept terms and conditions
        </Label>
      </div>
      <div className="flex items-center space-x-3">
        <Checkbox id="marketing" defaultChecked />
        <Label htmlFor="marketing" className="cursor-pointer">
          Send me marketing emails
        </Label>
      </div>
      <div className="flex items-center space-x-3">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled" className="cursor-not-allowed opacity-50">
          Disabled checkbox
        </Label>
      </div>
    </div>
  );
}`
                }}
              />
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="control-switch"
            title="Switch (Toggle)"
            description="Toggle switches for on/off states"
            hint="Click to view switch examples"
          >
            <div className="space-y-6">
              <ComponentShowcase
                title="Switch Toggle"
                description="Toggle switches for binary options"
                tokens={['--cta-cta-default', '--surface-surface-muted']}
                preview={
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Switch id="airplane" />
                      <Label htmlFor="airplane" className="cursor-pointer">
                        Airplane mode
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch id="notifications" defaultChecked />
                      <Label htmlFor="notifications" className="cursor-pointer">
                        Enable notifications
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch id="disabled-switch" disabled />
                      <Label htmlFor="disabled-switch" className="cursor-not-allowed opacity-50">
                        Disabled switch
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch id="disabled-checked-switch" disabled defaultChecked />
                      <Label htmlFor="disabled-checked-switch" className="cursor-not-allowed opacity-50">
                        Disabled checked
                      </Label>
                    </div>
                  </div>
                }
                code={{
                  html: `<div class="switch-group">
  <label class="switch">
    <input type="checkbox" />
    <span class="switch-slider"></span>
  </label>
  <label>Airplane mode</label>
</div>

<div class="switch-group">
  <label class="switch">
    <input type="checkbox" checked />
    <span class="switch-slider"></span>
  </label>
  <label>Enable notifications</label>
</div>`,
                  css: `.switch-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--surface-surface-muted);
  transition: 0.3s;
  border-radius: 34px;
}

.switch-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .switch-slider {
  background-color: var(--cta-cta-default);
}

input:checked + .switch-slider:before {
  transform: translateX(20px);
}

input:disabled + .switch-slider {
  opacity: 0.5;
  cursor: not-allowed;
}`,
                  react: `import { Switch } from './ui/switch';
import { Label } from './ui/label';

function SwitchDemo() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Switch id="airplane" />
        <Label htmlFor="airplane" className="cursor-pointer">
          Airplane mode
        </Label>
      </div>
      <div className="flex items-center space-x-3">
        <Switch id="notifications" defaultChecked />
        <Label htmlFor="notifications" className="cursor-pointer">
          Enable notifications
        </Label>
      </div>
      <div className="flex items-center space-x-3">
        <Switch id="disabled" disabled />
        <Label htmlFor="disabled" className="cursor-not-allowed opacity-50">
          Disabled switch
        </Label>
      </div>
    </div>
  );
}`
                }}
              />
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="control-radio"
            title="Radio Button"
            description="Radio buttons for single-select options"
            hint="Click to view radio button examples"
          >
            <div className="space-y-6">
              <ComponentShowcase
                title="Radio Group"
                description="Radio buttons for mutually exclusive options"
                tokens={['--cta-cta-default', '--border-border-default']}
                preview={
                  <RadioGroup defaultValue="comfortable" className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="default" id="r1" />
                      <Label htmlFor="r1" className="cursor-pointer">Default</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="comfortable" id="r2" />
                      <Label htmlFor="r2" className="cursor-pointer">Comfortable</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="compact" id="r3" />
                      <Label htmlFor="r3" className="cursor-pointer">Compact</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="disabled" id="r4" disabled />
                      <Label htmlFor="r4" className="cursor-not-allowed opacity-50">Disabled</Label>
                    </div>
                  </RadioGroup>
                }
                code={{
                  html: `<div class="radio-group">
  <div class="radio-item">
    <input type="radio" id="default" name="spacing" value="default" class="radio" />
    <label for="default">Default</label>
  </div>
  <div class="radio-item">
    <input type="radio" id="comfortable" name="spacing" value="comfortable" class="radio" checked />
    <label for="comfortable">Comfortable</label>
  </div>
  <div class="radio-item">
    <input type="radio" id="compact" name="spacing" value="compact" class="radio" />
    <label for="compact">Compact</label>
  </div>
  <div class="radio-item">
    <input type="radio" id="disabled" name="spacing" value="disabled" class="radio" disabled />
    <label for="disabled">Disabled</label>
  </div>
</div>`,
                  css: `.radio-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.radio {
  width: 20px;
  height: 20px;
  border: 1.5px solid var(--border-border-default);
  border-radius: 50%;
  cursor: pointer;
  appearance: none;
  background-color: var(--surface-surface-default);
  position: relative;
  transition: all 0.2s;
}

.radio:hover {
  border-color: var(--border-border-hover);
}

.radio:checked {
  border-color: var(--cta-cta-default);
}

.radio:checked::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--cta-cta-default);
}

.radio:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`,
                  react: `import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

function RadioDemo() {
  return (
    <RadioGroup defaultValue="comfortable" className="space-y-3">
      <div className="flex items-center space-x-3">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1" className="cursor-pointer">Default</Label>
      </div>
      <div className="flex items-center space-x-3">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2" className="cursor-pointer">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-3">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3" className="cursor-pointer">Compact</Label>
      </div>
    </RadioGroup>
  );
}`
                }}
              />
            </div>
          </CollapsibleSection>
        </CollapsibleGroup>

        {/* Date & Time Section */}
        <CollapsibleGroup
          title="Date & Time"
          description="Calendar and date picker components."
          icon="calendar"
          className="mt-12 pt-8 border-t-2 border-border"
        >
          <CollapsibleSection
            id="calendar"
            title="Calendar"
            description="Date picker calendar component"
            hint="Click to view calendar example"
            defaultOpen={true}
          >
            <div className="space-y-6">
              <ComponentShowcase
                title="Calendar Picker"
                description="Interactive calendar for date selection"
                tokens={['--surface-surface-default', '--cta-cta-default', '--text-text-primary']}
                preview={
                  <div className="inline-block">
                    <Calendar
                      mode="single"
                      className="rounded-md border border-border"
                    />
                  </div>
                }
                code={{
                  html: `<div class="calendar">
  <div class="calendar-header">
    <button class="calendar-nav">&lt;</button>
    <div class="calendar-month">January 2025</div>
    <button class="calendar-nav">&gt;</button>
  </div>
  <div class="calendar-grid">
    <div class="calendar-weekdays">
      <div class="calendar-weekday">Su</div>
      <div class="calendar-weekday">Mo</div>
      <div class="calendar-weekday">Tu</div>
      <div class="calendar-weekday">We</div>
      <div class="calendar-weekday">Th</div>
      <div class="calendar-weekday">Fr</div>
      <div class="calendar-weekday">Sa</div>
    </div>
    <div class="calendar-days">
      <button class="calendar-day">1</button>
      <button class="calendar-day">2</button>
      <button class="calendar-day calendar-day-selected">3</button>
      <!-- More days... -->
    </div>
  </div>
</div>`,
                  css: `.calendar {
  background: var(--surface-surface-default);
  border: 1px solid var(--border-border-default);
  border-radius: 8px;
  padding: 16px;
  width: 320px;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.calendar-nav {
  padding: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-text-primary);
  border-radius: 4px;
  transition: background-color 0.2s;
}

.calendar-nav:hover {
  background-color: var(--secondary-secondary-default);
}

.calendar-month {
  font-weight: 600;
  color: var(--text-text-primary);
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
}

.calendar-weekday {
  text-align: center;
  font-size: 12px;
  color: var(--text-text-muted);
  font-weight: 600;
  padding: 4px;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day {
  aspect-ratio: 1;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  color: var(--text-text-primary);
  transition: background-color 0.2s;
}

.calendar-day:hover {
  background-color: var(--secondary-secondary-default);
}

.calendar-day-selected {
  background-color: var(--cta-cta-default);
  color: white;
}

.calendar-day-selected:hover {
  background-color: var(--cta-cta-hover);
}`,
                  react: `import { Calendar } from './ui/calendar';
import { useState } from 'react';

function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
}`
                }}
              />
            </div>
          </CollapsibleSection>
        </CollapsibleGroup>

        {/* Dialogs & Alerts Section */}
        <CollapsibleGroup
          title="Dialogs & Alerts"
          description="Modal dialogs and confirmation alerts."
          icon="alert-triangle"
          className="mt-12 pt-8 border-t-2 border-border"
        >
          <CollapsibleSection
            id="dialog-confirmation"
            title="Confirmation Dialog"
            description="Alert dialogs for user confirmations"
            hint="Click to view confirmation dialog examples"
            defaultOpen={true}
          >
            <div className="space-y-6">
              <ComponentShowcase
                title="Delete Confirmation"
                description="Destructive action confirmation dialog"
                tokens={['--danger-danger-default', '--surface-surface-default']}
                preview={
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" style={{ borderColor: 'var(--danger-danger-default)', color: 'var(--danger-danger-default)' }}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction style={{ backgroundColor: 'var(--danger-danger-default)', color: 'white' }}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                }
                code={{
                  html: `<button class="btn-danger-outline" onclick="openDialog()">
  Delete Account
</button>

<div class="dialog-overlay" id="deleteDialog">
  <div class="dialog">
    <div class="dialog-header">
      <h3>Are you absolutely sure?</h3>
      <p class="dialog-description">
        This action cannot be undone. This will permanently delete your account 
        and remove your data from our servers.
      </p>
    </div>
    <div class="dialog-footer">
      <button class="btn-cancel" onclick="closeDialog()">Cancel</button>
      <button class="btn-danger" onclick="confirmDelete()">Delete</button>
    </div>
  </div>
</div>`,
                  css: `.dialog-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.dialog {
  background-color: var(--surface-surface-default);
  border-radius: 12px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.dialog-header {
  margin-bottom: 24px;
}

.dialog-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-text-primary);
  margin-bottom: 8px;
}

.dialog-description {
  color: var(--text-text-muted);
  font-size: 14px;
  line-height: 1.5;
}

.dialog-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-cancel {
  padding: 10px 20px;
  background-color: var(--secondary-secondary-default);
  color: var(--text-text-primary);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-cancel:hover {
  background-color: var(--secondary-secondary-hover);
}

.btn-danger {
  padding: 10px 20px;
  background-color: var(--danger-danger-default);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-danger:hover {
  background-color: var(--danger-danger-hover);
}`,
                  react: `import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';

function DeleteConfirmation() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="border-danger text-danger">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your 
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-danger text-white">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}`
                }}
              />

              <ComponentShowcase
                title="Save Confirmation"
                description="Confirmation dialog for save actions"
                tokens={['--secondary-secondary-default', '--cta-cta-default', '--surface-surface-default']}
                preview={
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button style={{ backgroundColor: 'var(--secondary-secondary-default)', color: 'var(--text-text-primary)' }}>
                        Save Changes
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Save your changes?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You have unsaved changes. Do you want to save them before leaving?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Don't Save</AlertDialogCancel>
                        <AlertDialogAction style={{ backgroundColor: 'var(--cta-cta-default)', color: 'white' }}>
                          Save Changes
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                }
                code={{
                  html: `<button class="btn-secondary" onclick="openSaveDialog()">
  Save Changes
</button>

<div class="dialog-overlay" id="saveDialog">
  <div class="dialog">
    <div class="dialog-header">
      <h3>Save your changes?</h3>
      <p class="dialog-description">
        You have unsaved changes. Do you want to save them before leaving?
      </p>
    </div>
    <div class="dialog-footer">
      <button class="btn-cancel" onclick="dontSave()">Don't Save</button>
      <button class="btn-cta" onclick="saveChanges()">Save Changes</button>
    </div>
  </div>
</div>`,
                  css: `.btn-secondary {
  padding: 10px 20px;
  background-color: var(--secondary-secondary-default);
  color: var(--text-text-primary);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background-color: var(--secondary-secondary-hover);
}

.btn-cta {
  padding: 10px 20px;
  background-color: var(--cta-cta-default);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-cta:hover {
  background-color: var(--cta-cta-hover);
}`,
                  react: `import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Button } from './ui/button';

function SaveConfirmation() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          style={{
            backgroundColor: 'var(--secondary-secondary-default)',
            color: 'var(--text-text-primary)'
          }}
        >
          Save Changes
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Save your changes?</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes. Do you want to save them before leaving?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Don't Save</AlertDialogCancel>
          <AlertDialogAction 
            style={{
              backgroundColor: 'var(--cta-cta-default)',
              color: 'white'
            }}
          >
            Save Changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}`
                }}
              />
            </div>
          </CollapsibleSection>
        </CollapsibleGroup>

        {/* Notifications Section */}
        <CollapsibleGroup
          title="Notifications"
          description="Toast notifications for user feedback."
          icon="bell"
          className="mt-12 pt-8 border-t-2 border-border"
        >
          <CollapsibleSection
            id="toast-notifications"
            title="Toast Messages"
            description="Temporary notification messages"
            hint="Click to view toast notification examples"
            defaultOpen={true}
          >
            <div className="space-y-6">
              <ComponentShowcase
                title="Toast Notifications"
                description="Different types of toast notifications for user feedback"
                tokens={['--success-success-default', '--danger-danger-default', '--warning-warning-default']}
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      onClick={() => toast.success('Success! Your changes have been saved.', {
                        description: 'All data has been updated successfully.',
                      })}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Success Toast
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => toast.error('Error! Something went wrong.', {
                        description: 'Please try again or contact support.',
                      })}
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Error Toast
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => toast.warning('Warning! Please review your input.', {
                        description: 'Some fields may need attention.',
                      })}
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Warning Toast
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => toast.info('Info: New updates available.', {
                        description: 'Click to learn more about the latest features.',
                      })}
                    >
                      <Info className="w-4 h-4 mr-2" />
                      Info Toast
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => toast('Simple notification', {
                        description: 'This is a basic toast message.',
                      })}
                    >
                      Default Toast
                    </Button>
                  </div>
                }
                code={{
                  html: `<!-- Toast Container (fixed position) -->
<div class="toast-container">
  <div class="toast toast-success">
    <div class="toast-icon">
      <svg><!-- checkmark icon --></svg>
    </div>
    <div class="toast-content">
      <div class="toast-title">Success!</div>
      <div class="toast-description">Your changes have been saved.</div>
    </div>
  </div>
</div>

<script>
function showToast(type, title, description) {
  const toast = document.createElement('div');
  toast.className = \`toast toast-\${type}\`;
  toast.innerHTML = \`
    <div class="toast-content">
      <div class="toast-title">\${title}</div>
      <div class="toast-description">\${description}</div>
    </div>
  \`;
  document.querySelector('.toast-container').appendChild(toast);
  
  setTimeout(() => toast.remove(), 5000);
}
</script>`,
                  css: `.toast-container {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 420px;
}

.toast {
  background-color: var(--surface-surface-default);
  border: 1px solid var(--border-border-default);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 12px;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast-success {
  border-left: 3px solid var(--success-success-default);
}

.toast-error {
  border-left: 3px solid var(--danger-danger-default);
}

.toast-warning {
  border-left: 3px solid var(--warning-warning-default);
}

.toast-info {
  border-left: 3px solid var(--link-link-default);
}

.toast-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-weight: 600;
  color: var(--text-text-primary);
  margin-bottom: 4px;
}

.toast-description {
  font-size: 14px;
  color: var(--text-text-muted);
}`,
                  react: `import { toast } from 'sonner';
import { Button } from './ui/button';
import { Check, AlertTriangle, Info } from 'lucide-react';

function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        onClick={() => toast.success('Success!', {
          description: 'Your changes have been saved.',
        })}
      >
        <Check className="w-4 h-4 mr-2" />
        Success Toast
      </Button>
      
      <Button
        variant="outline"
        onClick={() => toast.error('Error!', {
          description: 'Something went wrong.',
        })}
      >
        <AlertTriangle className="w-4 h-4 mr-2" />
        Error Toast
      </Button>
      
      <Button
        variant="outline"
        onClick={() => toast.warning('Warning!', {
          description: 'Please review your input.',
        })}
      >
        <AlertTriangle className="w-4 h-4 mr-2" />
        Warning Toast
      </Button>
      
      <Button
        variant="outline"
        onClick={() => toast.info('Info:', {
          description: 'New updates available.',
        })}
      >
        <Info className="w-4 h-4 mr-2" />
        Info Toast
      </Button>
    </div>
  );
}

// Make sure to add <Toaster /> to your app root
// import { Toaster } from 'sonner';
// <Toaster position="top-right" />`
                }}
              />
            </div>
          </CollapsibleSection>
        </CollapsibleGroup>

        {/* Bulk Action Panel Section */}
        <CollapsibleGroup
          id="bulk-actions"
          title="Bulk Action Panel"
          description="Interactive panel for managing bulk selections and actions"
          icon="zap"
          className="mt-12 pt-8 border-t-2 border-border"
        >
          <CollapsibleSection
            id="bulk-action-panel"
            title="Bulk Action Panel"
            description="Panel that appears when multiple items are selected, providing bulk actions"
            hint="Click to view bulk action panel examples"
            defaultOpen={true}
          >
            <div className="space-y-6">
              <ComponentShowcase
                title="Empty State"
                description="Bulk action panel when no companies are selected"
                tokens={['--background-background-primary', '--border-border-default', '--text-text-muted']}
                preview={
                  <div className="w-full border border-border">
                    <BulkActionPanel
                      selectedCount={0}
                      onRun={() => toast.info('No items to run')}
                      onAddToList={() => toast.info('No items to add')}
                      onDelete={() => toast.info('No items to delete')}
                      onClose={() => toast.info('Closed bulk action panel')}
                    />
                  </div>
                }
                code={{
                  html: `<div class="bulk-action-panel">
  <div class="bulk-info">
    <span class="count">0</span>
    <span class="label">Companies selected</span>
  </div>
  <div class="companies-preview">
    <span class="empty-message">No companies selected</span>
  </div>
  <div class="action-buttons">
    <button class="btn-secondary" disabled>Run</button>
    <button class="btn-secondary" disabled>Add to list</button>
    <button class="btn-delete" disabled>Delete</button>
    <button class="btn-close">Close</button>
  </div>
</div>`,
                  css: `.bulk-action-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 16px 24px;
  background: var(--background-background-primary);
  border-top: 1px solid var(--border-border-default);
  box-shadow: 0px -10px 24px 0px rgba(35, 35, 35, 0.15);
}

.bulk-info {
  display: flex;
  gap: 10px;
  align-items: baseline;
}

.bulk-info .count {
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--text-text-primary);
}

.bulk-info .label {
  font-size: 14px;
  line-height: 24px;
  color: var(--text-text-muted);
}

.companies-preview {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  border-left: 1px solid var(--border-border-default);
}

.empty-message {
  color: var(--text-text-muted);
  font-size: 14px;
}`,
                  react: `import { BulkActionPanel } from './BulkActionPanel';
import { toast } from 'sonner';

function EmptyStateExample() {
  return (
    <BulkActionPanel
      selectedCount={0}
      onRun={() => toast.info('No items')}
      onAddToList={() => toast.info('No items')}
      onDelete={() => toast.info('No items')}
      onClose={() => toast.info('Closed')}
    />
  );
}`
                }}
              />

              <ComponentShowcase
                title="23 Companies Selected"
                description="Bulk action panel with 23 companies selected, showing 5 circular placeholders and counter"
                tokens={['--background-background-primary', '--surface-surface-secondary', '--text-text-primary']}
                preview={
                  <div className="space-y-4">
                    <div className="w-full border border-border">
                      <BulkActionPanel
                        selectedCount={23}
                        onRun={() => toast.success('Running bulk action on 23 companies...', {
                          description: 'Processing your request...'
                        })}
                        onAddToList={() => toast.success('Added 23 companies to list', {
                          description: 'Companies have been added to your active list'
                        })}
                        onDelete={() => {
                          toast.error('Delete 23 companies?', {
                            description: 'This action cannot be undone.',
                            action: {
                              label: 'Confirm',
                              onClick: () => toast.success('Deleted 23 companies')
                            },
                          });
                        }}
                        onClose={() => toast.info('Deselected all 23 items')}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p><strong>Features:</strong></p>
                      <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>Shows 5 circular grey placeholders for company logos</li>
                        <li>Displays "+18" counter for remaining companies</li>
                        <li>Hover over the logos area to see tooltip with all 23 companies</li>
                        <li>All action buttons are fully functional</li>
                      </ul>
                    </div>
                  </div>
                }
                code={{
                  html: `<div class="bulk-action-panel">
  <div class="bulk-info">
    <span class="count">23</span>
    <span class="label">Companies selected</span>
  </div>
  <div class="companies-preview">
    <div class="company-logo"></div>
    <div class="company-logo"></div>
    <div class="company-logo"></div>
    <div class="company-logo"></div>
    <div class="company-logo"></div>
    <div class="counter">+18</div>
  </div>
  <div class="action-buttons">
    <button class="btn-secondary">Run</button>
    <button class="btn-secondary">Add to list</button>
    <button class="btn-delete">Delete</button>
    <button class="btn-close">Close</button>
  </div>
</div>`,
                  css: `.company-logo {
  width: 20px;
  height: 20px;
  background: #E0E0E0;
  border-radius: 50%;
}

.counter {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 4px;
  min-width: 37px;
  height: 26px;
  background: var(--surface-surface-secondary);
  font-size: 14px;
  line-height: 20px;
}

/* Tooltip appears on hover */
.companies-preview-wrapper {
  position: relative;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 8px;
  padding: 16px;
  background: #181818;
  box-shadow: 0px 10px 24px 0px rgba(35, 35, 35, 0.15);
  width: 280px;
}

.tooltip-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tooltip .company-logo {
  width: 16px;
  height: 16px;
}`,
                  react: `import { BulkActionPanel } from './BulkActionPanel';
import { toast } from 'sonner';

function MultiSelectExample() {
  return (
    <BulkActionPanel
      selectedCount={23}
      onRun={() => toast.success('Running...')}
      onAddToList={() => toast.success('Added to list')}
      onDelete={() => {
        toast.error('Delete 23 items?', {
          description: 'Cannot be undone.',
          action: {
            label: 'Confirm',
            onClick: () => toast.success('Deleted')
          }
        });
      }}
      onClose={() => toast.info('Cleared')}
    />
  );
}`
                }}
              />
            </div>
          </CollapsibleSection>
        </CollapsibleGroup>
      </div>
    </div>
  );
}
