// Classes Tailwind organisées par composant/fonctionnalité
export const LAYOUT_CLASSES = {
  page: 'flex flex-col items-center min-h-screen mb-5 md:mb-20',
  container: 'bg-background px-20',
  nav: 'hidden md:flex absolute z-40 gap-1 top-5 right-10',
} as const;

export const FLEX_CLASSES = {
  flex: 'flex',
  col: 'flex flex-col',
  row: 'flex flex-row',
  center: 'items-center',
  justifyCenter: 'justify-center',
  between: 'justify-between',
  colCenter: 'flex flex-col items-center w-full',
  colJustifyCenter: 'flex flex-col justify-center h-full',
  rowCenter: 'flex flex-row items-center',
  rowBetween: 'flex flex-row justify-between',
} as const;

export const GRID_CLASSES = {
  grid1: 'grid grid-cols-1 gap-y-5 md:gap-5 w-full',
  grid2: 'grid md:grid-cols-2 grid-cols-1 gap-y-5 md:gap-5 w-full',
  grid3: 'grid md:grid-cols-3 grid-cols-1 gap-y-5 md:gap-5 w-full',
  col1: 'col-span-1',
  col2: 'col-span-2',
  col3: 'col-span-3',
} as const;

export const TEXT_CLASSES = {
  title:
    'text-4xl md:text-6xl font-title font-black uppercase text-foreground leading-none shadow-primary',
  h1: 'text-2xl md:text-4xl font-title font-black uppercase leading-none text-foreground',
  h2: 'text-2xl font-title font-black uppercase text-foreground leading-none',
  h3: 'text-xl font-title font-black uppercase text-foreground leading-none',
  h4: 'text-lg font-title font-black uppercase text-foreground',
  p24: 'text-[18px] md:text-[24px] font-mono font-normal text-foreground',
  p18: 'text-[15px] md:text-[18px] font-mono font-normal text-foreground leading-5',
  p16: 'text-[16px] font-mono font-normal text-foreground leading-5',
  p14: 'text-[14px] font-mono font-normal text-foreground leading-5',
  p12: 'text-[12px] font-mono font-normal text-foreground leading-5',
  p10: 'text-[10px] font-mono font-normal text-foreground leading-5',
  link: 'flex items-center gap-1 group cursor-pointer w-fit leading-5',
} as const;

export const INTERACTION_CLASSES = {
  link: 'flex items-center gap-1 group cursor-pointer w-fit leading-5',
  button: 'cursor-pointer transition duration-300',
  hover: 'hover:text-foreground/80',
  languageSwitcher: 'hidden md:flex absolute z-40 gap-1 top-5 right-10',
  languageButton: 'cursor-pointer transition duration-300',
  languageActive: 'text-primary',
  languageInactive: 'text-foreground/50 hover:text-foreground/80',
  separator: 'text-foreground/50',
} as const;
