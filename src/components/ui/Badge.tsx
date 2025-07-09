import { cn } from '@/services/utils';
import { TEXT_CLASSES } from '@/static/styles/tailwind-classes';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'primary';
  onClick?: () => void;
}

export function Badge({
  children,
  className,
  variant = 'default',
  onClick,
}: BadgeProps) {
  return (
    <div
      className={cn(
        'bg-foreground/10 backdrop-blur-md rounded-md px-2 py-1 w-fit',
        variant === 'primary' && 'bg-primary/10',
        className
      )}
      onClick={onClick}
    >
      <p
        className={cn(
          TEXT_CLASSES.p12,
          'text-foreground/80',
          variant === 'primary' && 'text-primary'
        )}
      >
        {children}
      </p>
    </div>
  );
}
