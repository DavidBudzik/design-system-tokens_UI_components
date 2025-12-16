import { useState } from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import svgPaths from '../imports/svg-bulk-actions';

interface Company {
  id: string;
  name: string;
  logo: React.ReactNode;
}

interface BulkActionPanelProps {
  selectedCount: number;
  companies?: Company[];
  onRun?: () => void;
  onAddToList?: () => void;
  onDelete?: () => void;
  onClose?: () => void;
}

// Sample company logos as SVG components
function BinanceLogo() {
  return (
    <div className="absolute inset-[9.375%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_binance)">
          <path d="M5.96505 8.19367L9.75231 4.40795L13.5411 8.19675L15.7435 5.99277L9.75231 0L3.76108 5.99123L5.96505 8.19367Z" fill="#F3BA2F" />
          <path d="M0 9.75076L2.20243 7.54678L4.40641 9.75076L2.20243 11.9532L0 9.75076Z" fill="#F3BA2F" />
          <path d="M5.96505 11.3063L9.75231 15.0936L13.5411 11.3048L15.7451 13.5057L9.75385 19.4985L3.76108 13.5103L5.96505 11.3063Z" fill="#F3BA2F" />
          <path d="M15.0936 9.75076L17.296 7.54678L19.5 9.74922L17.296 11.9547L15.0936 9.75076Z" fill="#F3BA2F" />
          <path d="M11.9871 9.74923L9.75231 7.51291L8.09971 9.1655L7.90873 9.35494L7.51753 9.74614L9.75231 11.9794L11.9871 9.75077V9.74923Z" fill="#F3BA2F" />
        </g>
        <defs>
          <clipPath id="clip0_binance">
            <rect fill="white" height="19.5" width="19.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function GoogleLogo() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[16.25px] h-[16.25px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 17">
        <g clipPath="url(#clip0_google)">
          <path d="M15.8703 8.27702C15.8703 7.61126 15.8163 7.12544 15.6994 6.62163H8.09709V9.62651H12.5595C12.4695 10.3733 11.9837 11.4979 10.9041 12.2536L10.8889 12.3542L13.2926 14.2163L13.4592 14.2329C14.9886 12.8204 15.8703 10.7421 15.8703 8.27702Z" fill="#4285F4" />
          <path d="M8.09709 16.1942C10.2833 16.1942 12.1186 15.4744 13.4592 14.2329L10.9041 12.2536C10.2203 12.7304 9.30263 13.0633 8.09709 13.0633C5.95587 13.0633 4.13854 11.6508 3.49071 9.69852L3.39575 9.70658L0.896355 11.6409L0.863669 11.7318C2.19518 14.3768 4.9302 16.1942 8.09709 16.1942Z" fill="#34A853" />
          <path d="M3.49071 9.69852C3.31978 9.19471 3.22085 8.65486 3.22085 8.09709C3.22085 7.53926 3.31978 6.99947 3.48172 6.49566L3.47719 6.38836L0.946469 4.42298L0.863669 4.46236C0.31489 5.55998 0 6.79256 0 8.09709C0 9.40162 0.31489 10.6341 0.863669 11.7318L3.49071 9.69852Z" fill="#FBBC05" />
          <path d="M8.09709 3.13085C9.61752 3.13085 10.6431 3.78761 11.2279 4.33646L13.5131 2.10524C12.1097 0.800716 10.2833 0 8.09709 0C4.9302 0 2.19518 1.81733 0.863669 4.46236L3.48172 6.49566C4.13854 4.54336 5.95587 3.13085 8.09709 3.13085Z" fill="#EB4335" />
        </g>
        <defs>
          <clipPath id="clip0_google">
            <rect fill="white" height="16.25" width="15.8779" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function EquinixLogo() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[16.25px] h-[10px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 10">
        <path d="M14.2879 2.31641V6.78026L13.2675 7.13702V1.96136L10.2058 0.89348V8.20472L9.18497 8.55994V0.536726L7.65454 0.00312805L6.1236 0.536726V8.55994L5.10342 8.20472V0.89348L2.04154 1.96136V7.13702L1.0212 6.78026V2.31641L0 2.67333V7.50501L3.06239 8.57289V2.68509L4.08308 2.32936V8.92862L7.14445 9.99684V1.26148L7.65454 1.0831L8.16462 1.26148V9.99684L11.2272 8.92862V2.32936L12.2474 2.68509V8.57289L15.3092 7.50501V2.67333L14.2879 2.31641Z" fill="#FF0000" />
      </svg>
    </div>
  );
}

// Default sample companies
const DEFAULT_COMPANIES: Company[] = [
  { id: '1', name: 'Google', logo: <GoogleLogo /> },
  { id: '2', name: 'Binance', logo: <BinanceLogo /> },
  { id: '3', name: 'Equinix', logo: <EquinixLogo /> },
  { id: '4', name: 'Netflix', logo: <div className="bg-[#E50914] size-full" /> },
  { id: '5', name: 'Microsoft', logo: <div className="bg-[#00A4EF] size-full" /> },
  { id: '6', name: 'Apple', logo: <div className="bg-[#A2AAAD] size-full" /> },
  { id: '7', name: 'Amazon', logo: <div className="bg-[#FF9900] size-full" /> },
  { id: '8', name: 'Meta', logo: <div className="bg-[#0866FF] size-full" /> },
  { id: '9', name: 'Tesla', logo: <div className="bg-[#CC0000] size-full" /> },
  { id: '10', name: 'Nvidia', logo: <div className="bg-[#76B900] size-full" /> },
  { id: '11', name: 'Adobe', logo: <div className="bg-[#FF0000] size-full" /> },
  { id: '12', name: 'Salesforce', logo: <div className="bg-[#00A1E0] size-full" /> },
  { id: '13', name: 'Oracle', logo: <div className="bg-[#F80000] size-full" /> },
  { id: '14', name: 'IBM', logo: <div className="bg-[#0530AD] size-full" /> },
  { id: '15', name: 'Cisco', logo: <div className="bg-[#1BA0D7] size-full" /> },
];

export function BulkActionPanel({
  selectedCount,
  companies = DEFAULT_COMPANIES,
  onRun,
  onAddToList,
  onDelete,
  onClose,
}: BulkActionPanelProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  
  const displayedCompanies = companies.slice(0, 5);
  const remainingCount = Math.max(0, selectedCount - 5);
  const selectedCompanies = companies.slice(0, selectedCount);

  return (
    <div className="bg-background border-t border-border shadow-[0px_-10px_24px_0px_rgba(35,35,35,0.15)] w-full">
      <div className="flex flex-row items-center justify-between w-full px-6 py-4 gap-6">
        {/* Selection count */}
        <div className="flex gap-2.5 items-baseline shrink-0">
          <span className="text-foreground" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }}>{selectedCount}</span>
          <span className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '24px' }}>
            {selectedCount === 1 ? 'Company selected' : 'Companies selected'}
          </span>
        </div>

        {/* Companies preview */}
        <Popover open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
          <PopoverTrigger asChild>
            <div className="flex-1 min-w-0 border-l border-border">
              <div 
                className="flex items-center gap-3 px-4 cursor-pointer hover:bg-muted/50 transition-colors py-2"
                onMouseEnter={() => setIsTooltipOpen(true)}
                onMouseLeave={() => setIsTooltipOpen(false)}
              >
                {displayedCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="bg-white overflow-hidden relative shrink-0 size-5"
                    title={company.name}
                  >
                    {company.logo}
                  </div>
                ))}
                {remainingCount > 0 && (
                  <div className="bg-surface-secondary flex items-center justify-center h-[26px] px-1 shrink-0 min-w-[37px]">
                    <span className="text-foreground text-sm">+{remainingCount}</span>
                  </div>
                )}
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent 
            className="w-[280px] p-4 bg-[#181818] border-none shadow-[0px_10px_24px_0px_rgba(35,35,35,0.15)]" 
            side="top"
            align="start"
          >
            <div className="flex flex-wrap gap-3">
              {selectedCompanies.map((company) => (
                <div
                  key={company.id}
                  className="bg-white overflow-hidden relative shrink-0 size-4"
                  title={company.name}
                >
                  {company.logo}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Action buttons */}
        <div className="flex gap-3 items-center shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 h-7 text-xs"
            onClick={onRun}
          >
            <div className="overflow-clip relative shrink-0 size-5">
              <div className="absolute inset-[16.667%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <path d={svgPaths.p20a9a200} fill="currentColor" />
                </svg>
              </div>
            </div>
            Run
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="gap-2 h-7 text-xs"
            onClick={onAddToList}
          >
            <div className="overflow-clip relative shrink-0 size-5">
              <div className="absolute inset-[16.67%_13.52%_13.52%_16.67%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <g>
                    <path clipRule="evenodd" d={svgPaths.p18346400} fill="currentColor" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p28c60600} fill="currentColor" fillRule="evenodd" />
                    <path d={svgPaths.p2ff78f00} fill="currentColor" />
                    <path d={svgPaths.p190bf600} fill="currentColor" />
                  </g>
                </svg>
              </div>
            </div>
            Add to list
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="p-1 h-7 w-7 border-danger text-danger hover:bg-danger hover:text-danger-foreground"
            onClick={onDelete}
          >
            <div className="overflow-clip relative shrink-0 size-5">
              <div className="absolute inset-[16.667%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <path d={svgPaths.p30255ac0} fill="currentColor" />
                </svg>
              </div>
            </div>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-7 w-7"
            onClick={onClose}
          >
            <div className="overflow-clip relative shrink-0 size-5">
              <div className="absolute inset-[22.917%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
                  <path d={svgPaths.p25549f0} fill="currentColor" />
                </svg>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
