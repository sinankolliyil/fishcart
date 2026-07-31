import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppShell } from '@/components/layout/AppShell';
import { ViewportScaler } from '@/components/layout/ScaleWrapper';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FishCart - Daily Fresh Partner',
  description: 'FishCart Retail Kiosk Application',

  manifest: '/manifest.json',

  icons: {
    icon: '/icons/icon_192.png',
    apple: '/icons/icon_180.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0D55CF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans antialiased`}>
      <body className="m-0 p-0">
        <ViewportScaler />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
