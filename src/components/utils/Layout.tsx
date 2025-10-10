'use client';
import { cn } from '@/services/utils';
import { FLEX_CLASSES, LAYOUT_CLASSES } from '@/static/styles/tailwind-classes';
import React, { ReactNode } from 'react';
import { Footer } from '../Footer';
import { NavBar } from '../NavBar';

interface LayoutProps {
  children?: ReactNode;
  className?: string;
}

export function Layout(props: LayoutProps): React.JSX.Element {
  const { children, className } = props;

  return (
    <div className={cn(FLEX_CLASSES.col, 'bg-background text-foreground')}>
      <NavBar />
      {className ? <Page className={className}>{children}</Page> : <Page>{children}</Page>}
      <Footer />
    </div>
  );
}

interface PageProps {
  children?: ReactNode;
  className?: string;
}

const Page = ({ children, className }: PageProps) => (
  <div className={cn(LAYOUT_CLASSES.page, className || '')}>{children}</div>
);
