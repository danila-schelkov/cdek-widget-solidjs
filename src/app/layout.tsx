import './globals.css';

import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/src/shared/lib/utils';

export const metadata: Metadata = {
  title: 'Widget CDEK v3.0',
  description:
    'Documentation for integration of cdek widget into next application',
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://cdn.jsdelivr.net/npm/@cdek-it/widget@3"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased flex flex-col items-center justify-center',
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
};
export default RootLayout;
