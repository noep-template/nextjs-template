'use client';

import { useRedirectTo } from '@/hooks/redirectTo';
import { useAnalytics } from '@/hooks/useAnalytics';
import { getGsap } from '@/services/registerGsap';
import { cn, scrollTo } from '@/services/utils';
import { MEDIA_QUERIES } from '@/static/constants';
import { FLEX_CLASSES, TEXT_CLASSES } from '@/static/styles/tailwind-classes';
import { ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery, useScrollLock } from 'usehooks-ts';

interface NavBarProps {
  className?: string;
}

export enum NavKeys {
  HOME = 'HOME',
  MENU = 'MENU',
  CONTACT = 'CONTACT',
}

export enum MenuKeys {
  PROJECTS = 'PROJECTS',
}

export function NavBar({ className }: NavBarProps): React.JSX.Element {
  const tEnums = useTranslations('enums');
  const tCommons = useTranslations('common');
  const locale = useLocale(); // 'en' ou 'fr'
  const router = useRouter(); // navigation avec locale
  const pathname = usePathname(); // chemin sans préfixe
  const isMobile = useMediaQuery(MEDIA_QUERIES.SM);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuContentVisible, setIsMenuContentVisible] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState<string | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);
  const { lock, unlock } = useScrollLock({ autoLock: false });
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRefs = useRef<HTMLDivElement[]>([]);
  const redirectTo = useRedirectTo();
  const { trackButtonClick } = useAnalytics();

  // verrouillage du scroll mobile
  useEffect(() => {
    isMobile ? (isMenuOpen ? lock() : unlock()) : undefined;
  }, [isMenuOpen, isMobile, lock, unlock]);

  // fermer le menu si clic à l'extérieur
  useEffect(() => {
    const handler = (e: Event) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document[isMenuOpen ? 'addEventListener' : 'removeEventListener'](
      'mousedown',
      handler
    );
    return () => document.removeEventListener('mousedown', handler);
  }, [isMenuOpen]);

  // apparition progressive du contenu du menu
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isMenuOpen) {
      timeout = setTimeout(() => setIsMenuContentVisible(true), 500);
    } else {
      setIsMenuContentVisible(false);
    }
    return () => clearTimeout(timeout);
  }, [isMenuOpen]);

  // suivi de la route active
  useEffect(() => {
    const seg = pathname.split('/')[1].toUpperCase();
    if (Object.values(MenuKeys).includes(seg as MenuKeys)) {
      setSelectedMenuItem(seg);
      setSelectedNavItem(null);
    } else {
      setSelectedNavItem(seg);
      setSelectedMenuItem(null);
    }
  }, [pathname]);

  // clic sur un item de navigation principale
  const handleNavClick = (nav: string) => {
    setSelectedNavItem(nav);
    scrollTo(nav);
    if (nav === NavKeys.HOME && pathname !== '/') {
      trackButtonClick('nav_home');
      router.push(`/${locale}`);
    }
    setIsMenuOpen(nav === NavKeys.MENU ? !isMenuOpen : false);
  };

  const MenuItem = ({ menu, index }: { menu: MenuKeys; index: number }) => (
    <div
      ref={(el) => {
        if (el) menuItemsRefs.current[index] = el;
      }}
      className='flex flex-col items-start w-2/3 md:w-1/2 opacity-0'
    >
      <div className={cn(FLEX_CLASSES.row, 'w-full items-center gap-3')}>
        <ChevronRight
          className={cn(
            'text-primary',
            selectedMenuItem === menu ? 'opacity-100' : 'opacity-0'
          )}
          size={25}
        />
        <div
          className={cn(FLEX_CLASSES.col, 'group items-start w-fit')}
          onClick={() => {
            trackButtonClick(`nav_${menu.toLowerCase()}`);
            setSelectedMenuItem(menu);
            setIsMenuOpen(false);
            scrollTo(menu);
            redirectTo(menu);
          }}
        >
          <h3
            className={cn(
              TEXT_CLASSES.h3,
              'text-2xl md:text-xl text-center text-foreground/70 cursor-pointer group-hover:text-foreground transition duration-300',
              selectedMenuItem === menu && 'text-foreground'
            )}
          >
            {tEnums(menu)}
          </h3>
          <p
            className={cn(
              TEXT_CLASSES.p14,
              'text-primary/70 text-center cursor-pointer group-hover:text-primary transition duration-300',
              selectedMenuItem === menu && 'text-primary'
            )}
          >
            {tCommons(`nav.${menu}`)}
          </p>
        </div>
      </div>
    </div>
  );

  // animations GSAP du menu
  useEffect(() => {
    if (!isMenuContentVisible) return;
    (async () => {
      const { gsap } = await getGsap();
      gsap.fromTo(
        menuItemsRefs.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
      );
    })();
  }, [isMenuContentVisible]);

  return (
    <div
      ref={menuRef}
      className={cn(
        'fixed top-3 left-1/2 -translate-x-1/2 z-40 w-11/12 md:w-1/3 flex flex-col justify-between border shadow-md rounded transition-all duration-500 overflow-hidden p-2',
        isMenuOpen
          ? 'h-80 border-primary/60 bg-secondary/90 backdrop-blur-lg'
          : 'h-10 border-border bg-secondary/50 backdrop-blur-md',
        className
      )}
    >
      <div className={cn(FLEX_CLASSES.row, 'justify-around items-center')}>
        {Object.values(NavKeys).map((nav) => (
          <p
            key={nav}
            onClick={() => handleNavClick(nav)}
            className={cn(
              TEXT_CLASSES.p14,
              selectedNavItem === nav ? 'opacity-100' : 'opacity-50',
              'hover:opacity-80 transition-all duration-300 cursor-pointer font-light h-fit uppercase border-b-2',
              selectedNavItem === nav
                ? 'border-primary hover:opacity-100'
                : 'border-transparent hover:border-primary'
            )}
          >
            {tEnums(nav)}
          </p>
        ))}
      </div>

      {/* Menu Content */}
      {isMenuOpen && (
        <div
          className={cn(FLEX_CLASSES.col, 'h-full justify-center items-center')}
        >
          <div
            className={cn(
              FLEX_CLASSES.col,
              'w-full h-full justify-center items-center gap-5'
            )}
          >
            {Object.values(MenuKeys).map((menu, index) => (
              <MenuItem key={menu} menu={menu} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
