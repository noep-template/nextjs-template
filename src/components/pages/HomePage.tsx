'use client';

import { cn } from '@/services/utils';
import { FLEX_CLASSES, TEXT_CLASSES } from '@/static/styles/tailwind-classes';
import { useTranslations } from 'next-intl';
import { Layout } from '../utils/Layout';

export function HomePage(): JSX.Element {
  const tCommons = useTranslations('common');
  return (
    <Layout>
      <div
        className={cn(
          FLEX_CLASSES.col,
          'h-screen w-full items-center justify-center'
        )}
      >
        <h1 className={TEXT_CLASSES.h1}>{tCommons('home.name')}</h1>
      </div>
    </Layout>
  );
}
