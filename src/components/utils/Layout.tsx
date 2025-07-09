'use client';
import { cn } from '@/services/utils';
import {
  FLEX_CLASSES,
  INTERACTION_CLASSES,
  LAYOUT_CLASSES,
  TEXT_CLASSES,
} from '@/static/styles/tailwind-classes';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';
import { Footer } from '../Footer';
import { NavBar } from '../NavBar';

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (lang: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const pathWithoutLocale =
      segments[0] === 'en' || segments[0] === 'fr'
        ? segments.slice(1).join('/')
        : segments.join('/');

    router.push(`/${lang}/${pathWithoutLocale}`);
  };

  return (
    <div className={cn(FLEX_CLASSES.row, INTERACTION_CLASSES.languageSwitcher)}>
      {['Fr', 'En'].map((lang) => (
        <React.Fragment key={lang}>
          <p
            className={cn(
              TEXT_CLASSES.p16,
              INTERACTION_CLASSES.languageButton,
              locale === lang.toLocaleLowerCase()
                ? INTERACTION_CLASSES.languageActive
                : INTERACTION_CLASSES.languageInactive
            )}
            onClick={() => handleLanguageChange(lang.toLocaleLowerCase())}
          >
            {lang}
          </p>
          {lang === 'Fr' && (
            <p className={cn(TEXT_CLASSES.p16, INTERACTION_CLASSES.separator)}>
              {'/'}
            </p>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

interface LayoutProps {
  children?: ReactNode;
  className?: string;
}

export function Layout(props: LayoutProps): React.JSX.Element {
  const { children, className } = props;

  return (
    <div className={cn(FLEX_CLASSES.col, LAYOUT_CLASSES.container)}>
      <NavBar />
      <LanguageSwitcher />
      <Page className={className}>{children}</Page>
      <Footer />
    </div>
  );
}

interface PageProps {
  children?: ReactNode;
  className?: string;
}

const Page = ({ children, className }: PageProps) => (
  <div className={cn(LAYOUT_CLASSES.page, className)}>{children}</div>
);
