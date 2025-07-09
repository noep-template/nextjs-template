'use client';
import { cn } from '@/services/utils';
import { FLEX_CLASSES, TEXT_CLASSES } from '@/static/styles/tailwind-classes';
import { useEffect, useState } from 'react';
import { Logo } from '../Medias/Logo';

interface PageLoaderProps {
  className?: string;
}

export function PageLoader(props: PageLoaderProps): JSX.Element {
  const { className } = props;
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const delayThreshold = 500;
    const timeout = setTimeout(() => {
      setShowLoader(true);
    }, delayThreshold);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center h-screen w-full relative',
        className
      )}
    >
      {showLoader ? (
        <div
          className={cn(FLEX_CLASSES.colCenter, 'py-10 h-full justify-between')}
        >
          <Logo
            src='/icons/logo_128x128.webp'
            alt='Logo Sakana San'
            size={60}
            className='w-15 h-15'
            priority
          />
          <p className={cn(TEXT_CLASSES.p24, 'uppercase')}>{'Sakana San'}</p>
        </div>
      ) : null}
    </div>
  );
}
