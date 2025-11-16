import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Download, Trash2, Check, Plus, ArrowRight, Search, Settings, ChevronRight, X, AlertCircle } from 'lucide-react';

interface ButtonState {
  label: string;
  style: React.CSSProperties;
  disabled?: boolean;
  className?: string;
}

interface ButtonVariant {
  name: string;
  description: string;
  states: {
    default: ButtonState;
    hover: ButtonState;
    active: ButtonState;
    focus: ButtonState;
    disabled: ButtonState;
  };
}

const buttonVariants: ButtonVariant[] = [
  {
    name: 'CTA (Primary)',
    description: 'Main call-to-action button',
    states: {
      default: {
        label: 'Default',
        style: {
          backgroundColor: 'var(--cta-cta-default, #E03600)',
          color: 'white',
          border: 'none'
        }
      },
      hover: {
        label: 'Hover',
        style: {
          backgroundColor: 'var(--cta-cta-hover, #FA4D1A)',
          color: 'white',
          border: 'none'
        }
      },
      active: {
        label: 'Active',
        style: {
          backgroundColor: 'var(--cta-cta-active, #C22E00)',
          color: 'white',
          border: 'none'
        }
      },
      focus: {
        label: 'Focus',
        style: {
          backgroundColor: 'var(--cta-cta-default, #E03600)',
          color: 'white',
          border: 'none',
          outline: '2px solid var(--cta-cta-hover, #FA4D1A)',
          outlineOffset: '2px'
        }
      },
      disabled: {
        label: 'Disabled',
        style: {
          backgroundColor: 'var(--cta-cta-disabled, #FFD4C2)',
          color: 'white',
          border: 'none',
          cursor: 'not-allowed',
          opacity: 0.6
        },
        disabled: true
      }
    }
  },
  {
    name: 'Primary (Outline)',
    description: 'Secondary action button',
    states: {
      default: {
        label: 'Default',
        style: {
          backgroundColor: 'transparent',
          color: 'var(--primary-primary-default, #242424)',
          border: '1.5px solid var(--primary-primary-default, #242424)'
        }
      },
      hover: {
        label: 'Hover',
        style: {
          backgroundColor: 'transparent',
          color: 'var(--primary-primary-hover, #616161)',
          border: '1.5px solid var(--primary-primary-hover, #616161)'
        }
      },
      active: {
        label: 'Active',
        style: {
          backgroundColor: 'transparent',
          color: 'var(--primary-primary-active, #474747)',
          border: '1.5px solid var(--primary-primary-active, #474747)'
        }
      },
      focus: {
        label: 'Focus',
        style: {
          backgroundColor: 'transparent',
          color: 'var(--primary-primary-default, #242424)',
          border: '1.5px solid var(--primary-primary-default, #242424)',
          outline: '2px solid var(--primary-primary-hover, #616161)',
          outlineOffset: '2px'
        }
      },
      disabled: {
        label: 'Disabled',
        style: {
          backgroundColor: 'transparent',
          color: 'var(--primary-primary-disabled, #BDBDBD)',
          border: '1.5px solid var(--primary-primary-disabled, #BDBDBD)',
          cursor: 'not-allowed',
          opacity: 0.6
        },
        disabled: true
      }
    }
  },
  {
    name: 'Danger',
    description: 'Destructive action button',
    states: {
      default: {
        label: 'Default',
        style: {
          backgroundColor: 'var(--danger-danger-default, #E03636)',
          color: 'white',
          border: 'none'
        }
      },
      hover: {
        label: 'Hover',
        style: {
          backgroundColor: 'var(--danger-danger-hover, #FF5C5C)',
          color: 'white',
          border: 'none'
        }
      },
      active: {
        label: 'Active',
        style: {
          backgroundColor: 'var(--danger-danger-active, #AB2424)',
          color: 'white',
          border: 'none'
        }
      },
      focus: {
        label: 'Focus',
        style: {
          backgroundColor: 'var(--danger-danger-default, #E03636)',
          color: 'white',
          border: 'none',
          outline: '2px solid var(--danger-danger-hover, #FF5C5C)',
          outlineOffset: '2px'
        }
      },
      disabled: {
        label: 'Disabled',
        style: {
          backgroundColor: 'var(--danger-danger-disabled, #F7B0B0)',
          color: 'white',
          border: 'none',
          cursor: 'not-allowed',
          opacity: 0.6
        },
        disabled: true
      }
    }
  },
  {
    name: 'Success',
    description: 'Success confirmation button',
    states: {
      default: {
        label: 'Default',
        style: {
          backgroundColor: 'var(--success-success-default, #1CD166)',
          color: 'white',
          border: 'none'
        }
      },
      hover: {
        label: 'Hover',
        style: {
          backgroundColor: 'var(--success-success-hover, #47E38C)',
          color: 'white',
          border: 'none'
        }
      },
      active: {
        label: 'Active',
        style: {
          backgroundColor: 'var(--success-success-active, #12994A)',
          color: 'white',
          border: 'none'
        }
      },
      focus: {
        label: 'Focus',
        style: {
          backgroundColor: 'var(--success-success-default, #1CD166)',
          color: 'white',
          border: 'none',
          outline: '2px solid var(--success-success-hover, #47E38C)',
          outlineOffset: '2px'
        }
      },
      disabled: {
        label: 'Disabled',
        style: {
          backgroundColor: 'var(--success-success-disabled, #A6F5CC)',
          color: 'white',
          border: 'none',
          cursor: 'not-allowed',
          opacity: 0.6
        },
        disabled: true
      }
    }
  },
  {
    name: 'Warning',
    description: 'Warning or cautionary button',
    states: {
      default: {
        label: 'Default',
        style: {
          backgroundColor: 'var(--warning-warning-default, #FFB529)',
          color: '#171717',
          border: 'none'
        }
      },
      hover: {
        label: 'Hover',
        style: {
          backgroundColor: 'var(--warning-warning-hover, #FFD65C)',
          color: '#171717',
          border: 'none'
        }
      },
      active: {
        label: 'Active',
        style: {
          backgroundColor: 'var(--warning-warning-active, #B87D14)',
          color: 'white',
          border: 'none'
        }
      },
      focus: {
        label: 'Focus',
        style: {
          backgroundColor: 'var(--warning-warning-default, #FFB529)',
          color: '#171717',
          border: 'none',
          outline: '2px solid var(--warning-warning-hover, #FFD65C)',
          outlineOffset: '2px'
        }
      },
      disabled: {
        label: 'Disabled',
        style: {
          backgroundColor: 'var(--warning-warning-disabled, #FFF0BF)',
          color: '#171717',
          border: 'none',
          cursor: 'not-allowed',
          opacity: 0.6
        },
        disabled: true
      }
    }
  },
  {
    name: 'Secondary (Ghost)',
    description: 'Subtle secondary action',
    states: {
      default: {
        label: 'Default',
        style: {
          backgroundColor: 'var(--secondary-secondary-default, #EDEDED)',
          color: 'var(--text-text-primary, #171717)',
          border: 'none'
        }
      },
      hover: {
        label: 'Hover',
        style: {
          backgroundColor: 'var(--secondary-secondary-hover, #DEDEDE)',
          color: 'var(--text-text-primary, #171717)',
          border: 'none'
        }
      },
      active: {
        label: 'Active',
        style: {
          backgroundColor: 'var(--secondary-secondary-active, #E6E6E6)',
          color: 'var(--text-text-primary, #171717)',
          border: 'none'
        }
      },
      focus: {
        label: 'Focus',
        style: {
          backgroundColor: 'var(--secondary-secondary-default, #EDEDED)',
          color: 'var(--text-text-primary, #171717)',
          border: 'none',
          outline: '2px solid var(--secondary-secondary-hover, #DEDEDE)',
          outlineOffset: '2px'
        }
      },
      disabled: {
        label: 'Disabled',
        style: {
          backgroundColor: 'var(--secondary-secondary-disabled, #F5F5F5)',
          color: 'var(--text-text-primary, #171717)',
          border: 'none',
          cursor: 'not-allowed',
          opacity: 0.6
        },
        disabled: true
      }
    }
  }
];

export function ButtonStatesShowcase() {
  const [interactiveButtonState, setInteractiveButtonState] = useState<'default' | 'hover' | 'active'>('default');

  return (
    <div className="space-y-8">
      {/* Interactive Demo */}
      <div className="p-6 bg-muted/30 rounded-lg border border-border">
        <div className="space-y-4">
          <div>
            <h4 className="mb-2">Interactive Button Demo</h4>
            <p className="text-sm text-muted-foreground">
              Interact with this button to see different states in action
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 py-8">
            <Button
              size="lg"
              style={
                interactiveButtonState === 'default'
                  ? buttonVariants[0].states.default.style
                  : interactiveButtonState === 'hover'
                  ? buttonVariants[0].states.hover.style
                  : buttonVariants[0].states.active.style
              }
              onMouseEnter={() => setInteractiveButtonState('hover')}
              onMouseLeave={() => setInteractiveButtonState('default')}
              onMouseDown={() => setInteractiveButtonState('active')}
              onMouseUp={() => setInteractiveButtonState('hover')}
              className="transition-all duration-150 px-8 py-6"
            >
              Click Me!
            </Button>
            <Badge variant="secondary" className="text-sm">
              Current State: <span className="capitalize ml-1">{interactiveButtonState}</span>
            </Badge>
          </div>
        </div>
      </div>

      {/* State Matrix for All Button Types */}
      <div className="space-y-6">
        <div>
          <h4 className="mb-2">Button State Matrix</h4>
          <p className="text-sm text-muted-foreground">
            All available button variants with their interaction states
          </p>
        </div>

        {buttonVariants.map((variant, idx) => (
          <div key={idx} className="border border-border rounded-lg overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h5>{variant.name}</h5>
                  <p className="text-sm text-muted-foreground mt-0.5">{variant.description}</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {Object.entries(variant.states).map(([stateName, state]) => (
                  <div key={stateName} className="flex flex-col items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {state.label}
                    </Badge>
                    <Button
                      size="default"
                      style={state.style}
                      disabled={state.disabled}
                      className="w-full pointer-events-none"
                    >
                      Button
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Size Variants */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-muted/50 px-4 py-3 border-b border-border">
          <h5>Button Sizes</h5>
          <p className="text-sm text-muted-foreground mt-0.5">Available size variants for buttons</p>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col items-center gap-2">
              <Badge variant="outline" className="text-xs">Small</Badge>
              <Button
                size="sm"
                style={buttonVariants[0].states.default.style}
              >
                Small
              </Button>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Badge variant="outline" className="text-xs">Default</Badge>
              <Button
                size="default"
                style={buttonVariants[0].states.default.style}
              >
                Default
              </Button>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Badge variant="outline" className="text-xs">Large</Badge>
              <Button
                size="lg"
                style={buttonVariants[0].states.default.style}
              >
                Large
              </Button>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Badge variant="outline" className="text-xs">Icon</Badge>
              <Button
                size="icon"
                style={buttonVariants[0].states.default.style}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Icon Buttons - Leading Icon */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-muted/50 px-4 py-3 border-b border-border">
          <h5>Buttons with Leading Icon</h5>
          <p className="text-sm text-muted-foreground mt-0.5">Icon positioned before the text</p>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-4">
            <Button
              style={buttonVariants[0].states.default.style}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button
              style={buttonVariants[2].states.default.style}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
            <Button
              style={buttonVariants[3].states.default.style}
              className="gap-2"
            >
              <Check className="w-4 h-4" />
              Confirm
            </Button>
            <Button
              style={buttonVariants[1].states.default.style}
              className="gap-2"
            >
              <Search className="w-4 h-4" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Icon Buttons - Trailing Icon */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-muted/50 px-4 py-3 border-b border-border">
          <h5>Buttons with Trailing Icon</h5>
          <p className="text-sm text-muted-foreground mt-0.5">Icon positioned after the text</p>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-4">
            <Button
              style={buttonVariants[0].states.default.style}
              className="gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              style={buttonVariants[1].states.default.style}
              className="gap-2"
            >
              View More
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              style={buttonVariants[5].states.default.style}
              className="gap-2"
            >
              Settings
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Icon Buttons - Both Sides */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-muted/50 px-4 py-3 border-b border-border">
          <h5>Buttons with Icons on Both Sides</h5>
          <p className="text-sm text-muted-foreground mt-0.5">Icons positioned before and after the text</p>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-4">
            <Button
              style={buttonVariants[0].states.default.style}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Export File
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              style={buttonVariants[3].states.default.style}
              className="gap-2"
            >
              <Check className="w-4 h-4" />
              Save Changes
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              style={buttonVariants[1].states.default.style}
              className="gap-2"
            >
              <Search className="w-4 h-4" />
              Advanced Search
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Icon-Only Buttons */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-muted/50 px-4 py-3 border-b border-border">
          <h5>Icon-Only Buttons</h5>
          <p className="text-sm text-muted-foreground mt-0.5">Buttons with no text, various sizes and variants</p>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {/* Different Sizes */}
            <div className="space-y-3">
              <p className="text-sm">Icon Button Sizes</p>
              <div className="flex flex-wrap items-end gap-4">
                <div className="flex flex-col items-center gap-2">
                  <Badge variant="outline" className="text-xs">Small</Badge>
                  <Button
                    size="sm"
                    style={buttonVariants[0].states.default.style}
                    className="w-8 h-8 p-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Badge variant="outline" className="text-xs">Default</Badge>
                  <Button
                    size="icon"
                    style={buttonVariants[0].states.default.style}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Badge variant="outline" className="text-xs">Large</Badge>
                  <Button
                    size="lg"
                    style={buttonVariants[0].states.default.style}
                    className="w-12 h-12 p-0"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Different Variants */}
            <div className="space-y-3">
              <p className="text-sm">Icon Button Variants</p>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="icon"
                  style={buttonVariants[0].states.default.style}
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  style={buttonVariants[1].states.default.style}
                  title="Search"
                >
                  <Search className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  style={buttonVariants[2].states.default.style}
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  style={buttonVariants[3].states.default.style}
                  title="Confirm"
                >
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  style={buttonVariants[4].states.default.style}
                  title="Warning"
                >
                  <AlertCircle className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  style={buttonVariants[5].states.default.style}
                  title="Settings"
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  style={buttonVariants[5].states.default.style}
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Icon Button States */}
            <div className="space-y-3">
              <p className="text-sm">Icon Button States (CTA Variant)</p>
              <div className="flex flex-wrap gap-3">
                <div className="flex flex-col items-center gap-2">
                  <Badge variant="outline" className="text-xs">Default</Badge>
                  <Button
                    size="icon"
                    style={buttonVariants[0].states.default.style}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Badge variant="outline" className="text-xs">Hover</Badge>
                  <Button
                    size="icon"
                    style={buttonVariants[0].states.hover.style}
                    className="pointer-events-none"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Badge variant="outline" className="text-xs">Active</Badge>
                  <Button
                    size="icon"
                    style={buttonVariants[0].states.active.style}
                    className="pointer-events-none"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Badge variant="outline" className="text-xs">Disabled</Badge>
                  <Button
                    size="icon"
                    style={buttonVariants[0].states.disabled.style}
                    disabled
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
