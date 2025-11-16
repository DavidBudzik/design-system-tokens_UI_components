function Heading() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="Heading">
      <p className="font-['Helvetica_Neue_LT_Pro:43_Light_Extended',_sans-serif] leading-[72px] not-italic relative shrink-0 text-[64px] text-neutral-900 text-nowrap tracking-[-1px] whitespace-pre">typography_system</p>
    </div>
  );
}

function TypographySystem() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[120px] items-start p-[32px] relative shrink-0 w-[2778px]" data-name="typography_system">
      <Heading />
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">heading_5xl_semi-bold--system</p>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[80px] not-italic relative shrink-0 text-[72px] text-neutral-900 tracking-[-1px] w-[840px]">{`Heading 5XL - Semi bold `}</p>
      <Frame2 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Large headlines mostly for web</p>
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">
        <p className="leading-[28px]">Font size: 72 | Line-height: 80 | Letter spacing: -1px</p>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content />
      <Divider />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">heading_4xl_semi-bold--system</p>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[72px] not-italic relative shrink-0 text-[64px] text-neutral-900 tracking-[-1px] w-[840px]">{`Heading 4XL - Semi bold `}</p>
      <Frame3 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Large headlines mostly for web</p>
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">
        <p className="leading-[28px]">Font size: 64 | Line-height: 72 | Letter spacing: -1px</p>
      </div>
    </div>
  );
}

function Divider1() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content1 />
      <Divider1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">heading_3xl_semi-bold--system</p>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[64px] not-italic relative shrink-0 text-[56px] text-neutral-900 tracking-[-1px] w-[840px]">Heading 3XL - Semi bold</p>
      <Frame4 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Large headlines mostly for web</p>
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">
        <p className="leading-[28px]">Font size: 56 | Line-height: 64 | Letter spacing: -1px</p>
      </div>
    </div>
  );
}

function Divider2() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content2 />
      <Divider2 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">heading_2xl_semi-bold--system</p>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[56px] not-italic relative shrink-0 text-[48px] text-neutral-900 tracking-[-1px] w-[840px]">Heading 2XL - Semi bold</p>
      <Frame6 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Large headlines mostly for web</p>
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">
        <p className="leading-[28px]">Font size: 48 | Line-height: 56 | Letter spacing: -1px</p>
      </div>
    </div>
  );
}

function Divider3() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo3() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content3 />
      <Divider3 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">heading_XL_semi-bold--system</p>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[48px] not-italic relative shrink-0 text-[40px] text-neutral-900 tracking-[-1px] w-[840px]">Heading XL - Semi bold</p>
      <Frame7 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Large headlines mostly for web</p>
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">
        <p className="leading-[28px]">Font size: 40 | Line-height: 48 | Letter spacing: -1px</p>
      </div>
    </div>
  );
}

function Divider4() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo4() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content4 />
      <Divider4 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">heading_L_semi-bold--system</p>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[40px] not-italic relative shrink-0 text-[32px] text-neutral-900 tracking-[-1px] w-[840px]">Heading L - Semi bold</p>
      <Frame8 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Large headlines mostly for web</p>
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">
        <p className="leading-[28px]">Font size: 32 | Line-height: 40 | Letter spacing: -1px</p>
      </div>
    </div>
  );
}

function Divider5() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content5 />
      <Divider5 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">heading_M_semi-bold--system</p>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[24px] text-neutral-900 tracking-[-0.5px] w-[840px]">{`Heading M - Semi bold `}</p>
      <Frame9 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Page headline</p>
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">
        <p className="leading-[28px]">Font size: 24 | Line-height: 32 | Letter spacing: -.5px</p>
      </div>
    </div>
  );
}

function Divider6() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo6() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content6 />
      <Divider6 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">heading_S_semi-bold--system</p>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[20px] text-neutral-900 tracking-[-0.5px] w-[840px]">{`Heading S - Semi bold `}</p>
      <Frame10 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Side bar headline</p>
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">
        <p className="leading-[28px]">Font size: 20 | Line-height: 28 | Letter spacing: -.5px</p>
      </div>
    </div>
  );
}

function Divider7() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo7() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content7 />
      <Divider7 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">heading_XS_semi-bold--system</p>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-neutral-900 tracking-[-0.5px] w-[840px] whitespace-pre-wrap">{`Heading XS  - Semi bold`}</p>
      <Frame11 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Modal/dialog headline</p>
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">
        <p className="leading-[28px]">Font size: 16 | Line-height: 24 | Letter spacing: -.5px</p>
      </div>
    </div>
  );
}

function Divider8() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo8() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content8 />
      <Divider8 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">heading_XXS_semi-bold--system</p>
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-900 w-[840px]">Heading XXS - Semi bold</p>
      <Frame12 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Data table headlines</p>
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">
        <p className="leading-[28px]">Font size: 14 | Line-height: 20 | Letter spacing: 0px</p>
      </div>
    </div>
  );
}

function Divider9() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo9() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content9 />
      <Divider9 />
    </div>
  );
}

function Styles() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Styles">
      <ToolsTypographyInfo />
      <ToolsTypographyInfo1 />
      <ToolsTypographyInfo2 />
      <ToolsTypographyInfo3 />
      <ToolsTypographyInfo4 />
      <ToolsTypographyInfo5 />
      <ToolsTypographyInfo6 />
      <ToolsTypographyInfo7 />
      <ToolsTypographyInfo8 />
      <ToolsTypographyInfo9 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="Heading">
      <p className="font-['Helvetica_Neue_LT_Pro:43_Light_Extended',_sans-serif] leading-[36px] not-italic relative shrink-0 text-[32px] text-neutral-900 text-nowrap whitespace-pre">heading_system</p>
      <Styles />
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">text_2XL_regular--system</p>
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[32px] not-italic relative shrink-0 text-[#5a5a5a] text-[24px] w-[840px]">Text 2XL - Regular</p>
      <Frame13 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 24 | Line-height: 32 | Letter spacing: 0px</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 24 | Line-height: 32 | Letter spacing: 0px</p>
    </div>
  );
}

function Divider10() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo10() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content10 />
      <Divider10 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">text_2XL_strong_semi-bold--system</p>
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#5a5a5a] text-[24px] w-[840px]">Text 2XL Strong - Semi bold</p>
      <Frame14 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 24 | Line-height: 32 | Letter spacing: 0px</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 24 | Line-height: 32 | Letter spacing: 0px</p>
    </div>
  );
}

function Divider11() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo11() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content11 />
      <Divider11 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">text_XL_regular--system</p>
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#5a5a5a] text-[20px] w-[840px]">Text XL - Regular</p>
      <Frame15 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 20 | Line-height: 28 | Letter spacing: 0px</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 20 | Line-height: 28 | Letter spacing: 0px</p>
    </div>
  );
}

function Divider12() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo12() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content12 />
      <Divider12 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">text_XL_strong-semi-bold--system</p>
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#5a5a5a] text-[20px] w-[840px]">Text XL Strong - Semi bold</p>
      <Frame16 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 20 | Line-height: 28 | Letter spacing: 0px</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 20 | Line-height: 28 | Letter spacing: 0px</p>
    </div>
  );
}

function Divider13() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo13() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content13 />
      <Divider13 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">text_L_regular--system</p>
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#5a5a5a] text-[16px] w-[840px]">Text L - Regular</p>
      <Frame17 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 16 | Line-height: 24 | Letter spacing: 0px</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 16 | Line-height: 24 | Letter spacing: 0px</p>
    </div>
  );
}

function Divider14() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo14() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content14 />
      <Divider14 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">text_L_strong-semi-bold--system</p>
    </div>
  );
}

function Content15() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#5a5a5a] text-[16px] w-[840px]">Text L Strong - Semi bold</p>
      <Frame18 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 16 | Line-height: 24 | Letter spacing: 0px</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 16 | Line-height: 24 | Letter spacing: 0px</p>
    </div>
  );
}

function Divider15() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo15() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content15 />
      <Divider15 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">text_M_regular--system</p>
    </div>
  );
}

function Content16() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#5a5a5a] text-[14px] w-[840px]">{`Text M - Regular `}</p>
      <Frame19 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 14 | Line-height: 24 | Letter spacing: 0px</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 14 | Line-height: 20 | Letter spacing: 0px</p>
    </div>
  );
}

function Divider16() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo16() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content16 />
      <Divider16 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">paragraph_M_regular--system</p>
    </div>
  );
}

function Content17() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#5a5a5a] text-[14px] w-[840px]">paragraph_M_regular--system</p>
      <Frame20 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 14 | Line-height: 20 | Letter spacing: 0px</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 14 | Line-height: 20 | Letter spacing: 0px</p>
    </div>
  );
}

function Divider17() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo17() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content17 />
      <Divider17 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">paragraph_M_semi-bold--system</p>
    </div>
  );
}

function Content18() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#5a5a5a] text-[14px] w-[840px]">paragraph_M_semi-bold--system</p>
      <Frame21 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 14 | Line-height: 20 | Letter spacing: 0px</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 14 | Line-height: 20 | Letter spacing: 0px</p>
    </div>
  );
}

function Divider18() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo18() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content18 />
      <Divider18 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">text_M_strong-semi-bold--system</p>
    </div>
  );
}

function Content19() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#5a5a5a] text-[14px] w-[840px]">Text M Strong - Semi bold</p>
      <Frame22 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 14 | Line-height: 20 | Letter spacing: 0px</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 14 | Line-height: 20 | Letter spacing: 0px</p>
    </div>
  );
}

function Divider19() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo19() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content19 />
      <Divider19 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">text_S_regular--system</p>
    </div>
  );
}

function Content20() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#5a5a5a] text-[12px] w-[840px]">Text S - Regular</p>
      <Frame23 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Small text - helpline, small size buttons, input fields</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 12 | Line-height: 16 | Letter spacing: 0px</p>
    </div>
  );
}

function Divider20() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo20() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content20 />
      <Divider20 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">text_S_strong-semi-bold--system</p>
    </div>
  );
}

function Content21() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#5a5a5a] text-[12px] w-[840px]">Text S Strong - Semi bold</p>
      <Frame24 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Small text - helpline, small size buttons, input fields</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 12 | Line-height: 16 | Letter spacing: 0px</p>
    </div>
  );
}

function Divider21() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo21() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content21 />
      <Divider21 />
    </div>
  );
}

function Styles1() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Styles">
      <ToolsTypographyInfo10 />
      <ToolsTypographyInfo11 />
      <ToolsTypographyInfo12 />
      <ToolsTypographyInfo13 />
      <ToolsTypographyInfo14 />
      <ToolsTypographyInfo15 />
      <ToolsTypographyInfo16 />
      <ToolsTypographyInfo17 />
      <ToolsTypographyInfo18 />
      <ToolsTypographyInfo19 />
      <ToolsTypographyInfo20 />
      <ToolsTypographyInfo21 />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Helvetica_Neue_LT_Pro:43_Light_Extended',_sans-serif] leading-[36px] not-italic relative shrink-0 text-[32px] text-neutral-900 text-nowrap whitespace-pre">text_system</p>
      <Styles1 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">link_L_semi-bold--system</p>
    </div>
  );
}

function Content22() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#232323] text-[16px] w-[840px]">Link L - Semi bold</p>
      <Frame25 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">{`Link button - Large - rest `}</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 16 | Line-height: 24 | Letter spacing: 0px</p>
    </div>
  );
}

function Divider22() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo22() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content22 />
      <Divider22 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">link_L_hover-semi-bold--system</p>
    </div>
  );
}

function Content23() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#232323] text-[16px] underline w-[840px]">Link L Hover - Semi bold</p>
      <Frame26 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Link button - Large - hover</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 16 | Line-height: 24 | Letter spacing: 0px</p>
    </div>
  );
}

function Divider23() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo23() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content23 />
      <Divider23 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">link_M_semi-bold--system</p>
    </div>
  );
}

function Content24() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#232323] text-[14px] w-[840px]">Link M - Semi bold</p>
      <Frame27 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">{`Link button - Medium - rest `}</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 14 | Line-height: 20 | Letter spacing: 0px</p>
    </div>
  );
}

function Divider24() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo24() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content24 />
      <Divider24 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">link_M_hover-semi-bold--system</p>
    </div>
  );
}

function Content25() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#232323] text-[14px] underline w-[840px]">Link M Hover - Semi bold</p>
      <Frame28 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Link button - Medium - hover</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 14 | Line-height: 20 | Letter spacing: 0px</p>
    </div>
  );
}

function Divider25() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo25() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content25 />
      <Divider25 />
    </div>
  );
}

function Styles2() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Styles">
      <ToolsTypographyInfo22 />
      <ToolsTypographyInfo23 />
      <ToolsTypographyInfo24 />
      <ToolsTypographyInfo25 />
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="Link">
      <p className="font-['Helvetica_Neue_LT_Pro:43_Light_Extended',_sans-serif] leading-[36px] not-italic relative shrink-0 text-[32px] text-neutral-900 text-nowrap whitespace-pre">Link</p>
      <Styles2 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">label_L_semi-bold--system</p>
    </div>
  );
}

function Content26() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-neutral-900 w-[840px]">Label L - Semi bold</p>
      <Frame29 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Large size labels</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 16 | Line-height: 24 | Letter spacing: 0px</p>
    </div>
  );
}

function Divider26() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo26() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content26 />
      <Divider26 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">label_M_semi-bold--system</p>
    </div>
  );
}

function Content27() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-900 w-[840px]">Label M - Semi bold</p>
      <Frame30 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Medium size labels</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 14 | Line-height: 20 | Letter spacing: 0px</p>
    </div>
  );
}

function Divider27() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo27() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content27 />
      <Divider27 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">label_S_semi-bold--system</p>
    </div>
  );
}

function Content28() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-900 w-[840px]">Label S - Semi bold</p>
      <Frame31 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Small size labels</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Font size: 12 | Line-height: 16 | Letter spacing: 0px</p>
    </div>
  );
}

function Divider28() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo28() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content28 />
      <Divider28 />
    </div>
  );
}

function Styles3() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Styles">
      <ToolsTypographyInfo26 />
      <ToolsTypographyInfo27 />
      <ToolsTypographyInfo28 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="Label">
      <p className="font-['Helvetica_Neue_LT_Pro:43_Light_Extended',_sans-serif] leading-[36px] not-italic relative shrink-0 text-[32px] text-neutral-900 text-nowrap whitespace-pre">Label</p>
      <Styles3 />
    </div>
  );
}

function TypographySystem1() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[120px] items-start p-[32px] relative shrink-0 w-[2778px]" data-name="typography_system">
      <Heading1 />
      <Text />
      <Link />
      <Label />
    </div>
  );
}

function Frame32() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">heading_5xl_light--decorative</p>
    </div>
  );
}

function Content29() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Helvetica_Neue_LT_Pro:43_Light_Extended',_sans-serif] leading-[80px] not-italic relative shrink-0 text-[72px] text-neutral-900 tracking-[-1px] w-[880px]">Heading 5XL - Light</p>
      <Frame32 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]" dir="auto">
        Used for headers at re-accuring features. Not documents
      </p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] text-right w-[400px]">Font size: 72 | Line-height: 80 | Letter spacing: -1px</p>
    </div>
  );
}

function Divider29() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo29() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content29 />
      <Divider29 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">heading_4xl_light--decorative</p>
    </div>
  );
}

function Content30() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Helvetica_Neue_LT_Pro:43_Light_Extended',_sans-serif] leading-[72px] not-italic relative shrink-0 text-[64px] text-neutral-900 tracking-[-1px] w-[880px]">Heading 4XL - Light</p>
      <Frame33 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Used for headers at re-accuring features. Not documents</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] text-right w-[400px]">Font size: 64 | Line-height: 72 | Letter spacing: -1px</p>
    </div>
  );
}

function Divider30() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo30() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content30 />
      <Divider30 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">heading_3xl_light--decorative</p>
    </div>
  );
}

function Content31() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Helvetica_Neue_LT_Pro:43_Light_Extended',_sans-serif] leading-[64px] not-italic relative shrink-0 text-[56px] text-neutral-900 tracking-[-1px] w-[880px]">Heading 3XL - Light</p>
      <Frame34 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Used for headers at re-accuring features. Not documents</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] text-right w-[400px]">Font size: 56 | Line-height: 64 | Letter spacing: -1px</p>
    </div>
  );
}

function Divider31() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo31() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content31 />
      <Divider31 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">heading_2xl_light--decorative</p>
    </div>
  );
}

function Content32() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Helvetica_Neue_LT_Pro:43_Light_Extended',_sans-serif] leading-[56px] not-italic relative shrink-0 text-[48px] text-neutral-900 tracking-[-1px] w-[880px]">Heading 2XL - Light</p>
      <Frame35 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Used for headers at re-accuring features. Not documents</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] text-right w-[400px]">Font size: 48 | Line-height: 56 | Letter spacing: -1px</p>
    </div>
  );
}

function Divider32() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo32() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content32 />
      <Divider32 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">heading_XL_light--decorative</p>
    </div>
  );
}

function Content33() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Helvetica_Neue_LT_Pro:43_Light_Extended',_sans-serif] leading-[48px] not-italic relative shrink-0 text-[40px] text-neutral-900 tracking-[-1px] w-[880px]">Heading XL - Light</p>
      <Frame36 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Used for headers at re-accuring features. Not documents</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] text-right w-[400px]">Font size: 40 | Line-height: 48 | Letter spacing: -1px</p>
    </div>
  );
}

function Divider33() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo33() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content33 />
      <Divider33 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">heading_L_light--decorative</p>
    </div>
  );
}

function Content34() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Helvetica_Neue_LT_Pro:43_Light_Extended',_sans-serif] leading-[40px] not-italic relative shrink-0 text-[32px] text-neutral-900 tracking-[-1px] w-[880px]">Heading L - Light</p>
      <Frame37 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Used for headers at re-accuring features. Not documents</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] text-right w-[400px]">Font size: 32 | Line-height: 40 | Letter spacing: -1px</p>
    </div>
  );
}

function Divider34() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo34() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content34 />
      <Divider34 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">heading_M_light--decorative</p>
    </div>
  );
}

function Content35() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Helvetica_Neue_LT_Pro:43_Light_Extended',_sans-serif] leading-[32px] not-italic relative shrink-0 text-[24px] text-neutral-900 tracking-[-0.5px] w-[880px]">Heading M - Light</p>
      <Frame38 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Used for headers at re-accuring features. Not documents</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] text-right w-[400px]">Font size: 24 | Line-height: 32 | Letter spacing: -.5px</p>
    </div>
  );
}

function Divider35() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo35() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content35 />
      <Divider35 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">heading_S_light--decorative</p>
    </div>
  );
}

function Content36() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Helvetica_Neue_LT_Pro:43_Light_Extended',_sans-serif] leading-[28px] not-italic relative shrink-0 text-[20px] text-neutral-900 tracking-[-0.5px] w-[880px]">Heading S - Light</p>
      <Frame39 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Used for headers at re-accuring features. Not documents</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] text-right w-[400px]">Font size: 20 | Line-height: 28 | Letter spacing: -.5px</p>
    </div>
  );
}

function Divider36() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo36() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content36 />
      <Divider36 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">heading_XS_light--decorative</p>
    </div>
  );
}

function Content37() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Helvetica_Neue_LT_Pro:43_Light_Extended',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-neutral-900 tracking-[-0.5px] w-[880px] whitespace-pre-wrap">{`Heading XS  - Light`}</p>
      <Frame40 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Used for headers at re-accuring features. Not documents</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] text-right w-[400px]">Font size: 16 | Line-height: 24 | Letter spacing: -.5px</p>
    </div>
  );
}

function Divider37() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo37() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content37 />
      <Divider37 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="bg-[#181818] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[4px] relative shrink-0 w-[380px]">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">heading_XSS_light--decorative</p>
    </div>
  );
}

function Content38() {
  return (
    <div className="content-stretch flex items-baseline justify-between relative shrink-0 w-full" data-name="Content">
      <p className="font-['Helvetica_Neue_LT_Pro:43_Light_Extended',_sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-900 w-[880px]">Heading XXS - Light</p>
      <Frame41 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] w-[400px]">Used for headers at re-accuring features. Not documents</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#a0a0a0] text-[16px] text-right w-[400px]">Font size: 14 | Line-height: 20 | Letter spacing: 0px</p>
    </div>
  );
}

function Divider38() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2714 1">
        <g id="Divider">
          <path d="M0 0.5H2714" id="Line" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function ToolsTypographyInfo38() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="Tools/.Typography info">
      <Content38 />
      <Divider38 />
    </div>
  );
}

function Styles4() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Styles">
      <ToolsTypographyInfo29 />
      <ToolsTypographyInfo30 />
      <ToolsTypographyInfo31 />
      <ToolsTypographyInfo32 />
      <ToolsTypographyInfo33 />
      <ToolsTypographyInfo34 />
      <ToolsTypographyInfo35 />
      <ToolsTypographyInfo36 />
      <ToolsTypographyInfo37 />
      <ToolsTypographyInfo38 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Heading">
      <p className="font-['Helvetica_Neue_LT_Pro:43_Light_Extended',_sans-serif] leading-[36px] not-italic relative shrink-0 text-[32px] text-neutral-900 text-nowrap whitespace-pre">heading_decorative</p>
      <Styles4 />
    </div>
  );
}

function TypographyDecorative() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[120px] items-start p-[32px] relative shrink-0 w-[2778px]" data-name="typography_decorative">
      <Heading2 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[100px] items-start relative shrink-0 w-full">
      <TypographySystem1 />
      <TypographyDecorative />
    </div>
  );
}

export default function TypographySystem2() {
  return (
    <div className="bg-[#f0f0f0] relative size-full" data-name="typography_system">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[100px] items-start p-[100px] relative size-full">
          <TypographySystem />
          <Frame5 />
        </div>
      </div>
    </div>
  );
}