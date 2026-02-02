'use client';

import Umami from '@/components/utils/Umami';
import { AppProvider } from '@/contexts/AppContext';
import { Locale, messages } from '@/i18n/config';
import { IntlProvider } from 'next-intl';
import { Darker_Grotesque, Montserrat } from 'next/font/google';
import { ReactNode, useEffect, useState } from 'react';
import '../../static/styles/app.css';

const title = Darker_Grotesque({
  display: 'swap',
  variable: '--font-title',
  weight: ['400', '500', '600', '700'],
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  subsets: ['latin'],
});

const text = Montserrat({
  display: 'swap',
  variable: '--font-text',
  weight: ['400', '700'],
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('fr');

  useEffect(() => {
    // Charge les messages en fonction de la langue détectée
    const currentLocale = window.location.pathname.includes('/en') ? 'en' : 'fr';
    setLocale(currentLocale);
  }, []);

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <html lang={locale} className={`${title.variable} ${text.variable}`}>
      <head>
        <meta name="theme-color" content="hsl(195 30% 10%)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Shopping" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo-192x192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/logo-512x512.png" sizes="512x512" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </head>
      <body>
        <IntlProvider timeZone={timeZone} messages={messages[locale]} locale={locale}>
          <AppProvider>{children}</AppProvider>
        </IntlProvider>
        <Umami />
      </body>
    </html>
  );
}
