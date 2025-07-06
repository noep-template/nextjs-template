'use client';
import { Footer, NavBar } from '@/container/components';
import { cn } from '@/services/utils';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';
import tw from 'tailwind-styled-components';
import { Col, Row } from '../Helpers';
import { P16 } from '../Texts';

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
    <Row className='hidden md:flex absolute z-40 gap-1 top-5 right-10'>
      {['Fr', 'En'].map((lang) => (
        <React.Fragment key={lang}>
          <P16
            className={cn(
              'cursor-pointer transition duration-300',
              locale === lang.toLocaleLowerCase()
                ? 'text-primary'
                : 'text-foreground/50 hover:text-foreground/80'
            )}
            onClick={() => handleLanguageChange(lang.toLocaleLowerCase())}
          >
            {lang}
          </P16>
          {lang === 'Fr' && <P16 className='text-foreground/50'>{'/'}</P16>}
        </React.Fragment>
      ))}
    </Row>
  );
};

interface LayoutProps {
  children?: ReactNode;
  className?: string;
  isNavClose?: boolean;
}

export function Layout(props: LayoutProps): React.JSX.Element {
  const { children, className } = props;

  return (
    <Col className='bg-background px-20'>
      <NavBar />
      <LanguageSwitcher />
      <Page className={className}>{children}</Page>
      <Footer />
    </Col>
  );
}

const Page = tw.div`
  flex
  flex-col
  items-center
  min-h-screen
  mb-5 md:mb-20
`;
