import { cn } from '@/services/utils';
import { FLEX_CLASSES, INTERACTION_CLASSES, TEXT_CLASSES } from '@/static/styles/tailwind-classes';
import { Instagram, Mail, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { NavKeys } from './NavBar';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps): React.JSX.Element {
  const t = useTranslations('common');

  // Même tableau que le header pour la cohérence
  const socialNetworks = [
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:test@gmail.com',
      external: false,
    },
    {
      name: 'Téléphone',
      icon: Phone,
      href: 'tel:0000000000',
      external: false,
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com',
      external: true,
    },
  ];

  return (
    <footer className={cn('w-full bg-secondary py-16 md:py-20', className)} id={NavKeys.CONTACT}>
      <div
        className={cn(
          'max-w-6xl mx-auto px-6 md:px-12 lg:px-20',
          FLEX_CLASSES.colCenter,
          'text-center',
        )}
      >
        {/* Titre principal */}
        <div className={cn(FLEX_CLASSES.colCenter, 'mb-12')}>
          <h2 className={cn(TEXT_CLASSES.h2, 'text-foreground mb-4')}>{t('footer.title')}</h2>
          <p className={cn(TEXT_CLASSES.p18, 'text-muted-foreground max-w-2xl')}>
            {t('footer.subtitle')}
          </p>
        </div>

        {/* Réseaux sociaux */}
        <div className={cn(FLEX_CLASSES.rowCenter, 'gap-6 mb-12')}>
          {socialNetworks.map((network) => {
            const IconComponent = network.icon;
            return (
              <a
                key={network.name}
                href={network.href}
                target={network.external ? '_blank' : undefined}
                rel={network.external ? 'noopener noreferrer' : undefined}
                className={cn(
                  INTERACTION_CLASSES.button,
                  'p-4 rounded-full bg-card',
                  'hover:scale-110 transition-all duration-300',
                  'border border-border',
                  'shadow-lg hover:shadow-xl',
                  'hover:bg-primary/20',
                )}
              >
                <IconComponent className="h-6 w-6 text-foreground" />
              </a>
            );
          })}
        </div>

        {/* Bouton de contact principal */}
        <div className={cn(FLEX_CLASSES.colCenter, 'gap-4 mb-12')}>
          <a
            href={`${socialNetworks[0].href}?subject=Demande de devis&body=Bonjour, je souhaiterais obtenir un devis pour vos services de nettoyage.`}
            className={cn(
              'px-8 py-4 bg-primary text-primary-foreground rounded-full',
              'font-semibold text-lg',
              'hover:bg-primary/90 hover:scale-105',
              'transition-all duration-300',
              'shadow-lg hover:shadow-xl',
            )}
          >
            {t('generics.sendEmail')}
          </a>
        </div>

        {/* Informations de contact */}
        <div
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl mb-12',
            'bg-card rounded-2xl p-6 md:p-8',
            'border border-border',
          )}
        >
          <div className={cn(FLEX_CLASSES.colCenter, 'gap-3')}>
            <h3 className={cn(TEXT_CLASSES.h4, 'text-foreground')}>{t('footer.contact.title')}</h3>
            <div className={cn(FLEX_CLASSES.col, 'gap-2 text-center')}>
              <a
                href={socialNetworks[0].href}
                className={cn(
                  TEXT_CLASSES.p16,
                  'text-muted-foreground hover:text-accent',
                  'transition-colors duration-300 cursor-pointer',
                )}
              >
                {'📧'} {t('footer.contact.email')}
              </a>
              <a
                href={socialNetworks[1].href}
                className={cn(
                  TEXT_CLASSES.p16,
                  'text-muted-foreground hover:text-accent',
                  'transition-colors duration-300 cursor-pointer',
                )}
              >
                {'📞'} {t('footer.contact.phone')}
              </a>
            </div>
          </div>

          <div className={cn(FLEX_CLASSES.colCenter, 'gap-3')}>
            <h3 className={cn(TEXT_CLASSES.h4, 'text-foreground')}>{t('footer.zone.title')}</h3>
            <div className={cn(FLEX_CLASSES.col, 'gap-2 text-center')}>
              <p className={cn(TEXT_CLASSES.p16, 'text-muted-foreground')}>
                {'📍'} {t('footer.zone.location')}
              </p>
              <p className={cn(TEXT_CLASSES.p16, 'text-muted-foreground')}>
                {'🕘'} {t('footer.zone.availability')}
              </p>
            </div>
          </div>
        </div>

        {/* Copyright et crédits */}
        <div className={cn(FLEX_CLASSES.colCenter, 'gap-4 pt-8 border-t border-border')}>
          <p className={cn(TEXT_CLASSES.p14, 'text-muted-foreground')}>{t('footer.copyright')}</p>
          <p className={cn(TEXT_CLASSES.p12, 'text-muted-foreground')}>
            {t('footer.designed')}{' '}
            <a
              href="https://noe-philippe.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors duration-300 cursor-pointer underline"
            >
              {'Noé PHILIPPE'}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
