'use client';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/hooks/useAnalytics';
import { cn } from '@/services/utils';
import { FLEX_CLASSES, TEXT_CLASSES } from '@/static/styles/tailwind-classes';
import { useTranslations } from 'next-intl';
import React from 'react';
import { NavKeys } from './NavBar';

interface FooterProps {
  className?: string;
}

const socialLinks = [
  {
    href: 'mailto:noephilippe29@gmail.com',
    labelKey: 'generics.email',
    analyticsLabel: 'email_contact',
  },
  {
    href: 'https://github.com/Noe-p',
    labelKey: 'generics.github',
    analyticsLabel: 'github_profile',
  },
  {
    href: 'https://www.linkedin.com/in/noe-philippe/',
    labelKey: 'generics.linkedin',
    analyticsLabel: 'linkedin_profile',
  },
  {
    href: 'https://www.instagram.com/noefdrgv/',
    labelKey: 'generics.instagram',
    analyticsLabel: 'instagram_profile',
  },
];

export function Footer({ className }: FooterProps): React.JSX.Element {
  const t = useTranslations('common');
  const { trackButtonClick } = useAnalytics();

  const handleSocialLinkClick = (analyticsLabel: string) => {
    trackButtonClick(analyticsLabel);
  };

  const handleEmailButtonClick = () => {
    trackButtonClick('email_button_footer');
  };

  return (
    <div
      className={cn(
        'flex items-center w-full flex-col mb-5 md:mb-10 mt-10',
        className
      )}
      id={NavKeys.CONTACT}
    >
      <div
        className={cn(
          FLEX_CLASSES.rowBetween,
          'flex-col md:flex-row w-full mt-15'
        )}
      >
        {/* Social Links */}
        <div
          className={cn(
            FLEX_CLASSES.col,
            'flex-row md:flex-col mt-10 md:mt-0 justify-between md:justify-start md:gap-3 order-2 md:order-1'
          )}
        >
          {socialLinks.map(({ href, labelKey, analyticsLabel }) => (
            <a
              key={href}
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              className='w-full block group'
              onClick={() => handleSocialLinkClick(analyticsLabel)}
            >
              <p
                className={cn(
                  TEXT_CLASSES.p16,
                  'group-hover:text-primary cursor-pointer text-foreground transition-all duration-300'
                )}
              >
                {t(labelKey)}
              </p>
            </a>
          ))}
        </div>

        {/* Title + Buttons */}
        <div className={cn(FLEX_CLASSES.col, 'md:w-2/3 order-1 md:order-2')}>
          <h2
            className={cn(
              TEXT_CLASSES.h2,
              'md:text-3xl text-2xl leading-none -translate-y-2'
            )}
          >
            {t('footer.title')}
          </h2>
          <div
            className={cn(
              FLEX_CLASSES.row,
              'md:w-fit flex-wrap md:flex-nowrap w-full gap-2 mt-2 flex-row'
            )}
          >
            <a
              href='mailto:noephilippe29@gmail.com'
              target='_blank'
              rel='noopener noreferrer'
              className='w-full block group'
              onClick={handleEmailButtonClick}
            >
              <Button className='w-full md:w-fit' variant='outline'>
                {t('generics.sendEmail')}
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div
        className={cn(
          FLEX_CLASSES.row,
          'w-full justify-between items-end mt-10 md:mt-15'
        )}
      >
        {/* Left */}
        <div className={cn(FLEX_CLASSES.col, 'w-full')}>
          <p className={cn(TEXT_CLASSES.p14, 'text-foreground/50')}>
            {t('generics.designed')}
          </p>
          <p className={TEXT_CLASSES.p14}>{'Noé PHILIPPE'}</p>
        </div>

        {/* Center (Desktop Only) */}
        <div
          className={cn(
            FLEX_CLASSES.col,
            'w-full items-center  hidden md:flex'
          )}
        >
          <p
            className={cn(
              TEXT_CLASSES.p14,
              'text-foreground/50 w-fit text-center'
            )}
          >
            {t('generics.copyright')}
          </p>
          <a
            href='/privacy-policy.html'
            target='_blank'
            rel='noopener noreferrer'
            onClick={() => trackButtonClick('privacy_policy_link')}
          >
            <p
              className={cn(
                TEXT_CLASSES.p14,
                'text-foreground/50 hover:text-primary transition-colors cursor-pointer'
              )}
            >
              {t('generics.privacyPolicy')}
            </p>
          </a>
        </div>

        {/* Right */}
        <div className={cn(FLEX_CLASSES.col, 'w-full items-end')}>
          <div className={cn(FLEX_CLASSES.row, 'gap-1')}>
            <span className='text-green-400 leading-none'>{'•'}</span>
            <p className={cn(TEXT_CLASSES.p14, 'text-primary leading-none')}>
              {t('status')}
            </p>
          </div>
          <p className={cn(TEXT_CLASSES.p14, 'text-end')}>{t('position')}</p>
        </div>
      </div>

      {/* CopyRight for Mobile */}
      <div className={cn(FLEX_CLASSES.colCenter, ' md:hidden')}>
        <p
          className={cn(
            TEXT_CLASSES.p14,
            'text-foreground/50 mt-10 text-center'
          )}
        >
          {t('generics.copyright')}
        </p>
        <a
          href='/privacy-policy.html'
          target='_blank'
          rel='noopener noreferrer'
          onClick={() => trackButtonClick('privacy_policy_link')}
        >
          <p
            className={cn(
              TEXT_CLASSES.p14,
              'text-foreground/50 hover:text-primary transition-colors cursor-pointer'
            )}
          >
            {t('generics.privacyPolicy')}
          </p>
        </a>
      </div>
    </div>
  );
}
