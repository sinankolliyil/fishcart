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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} font-sans antialiased h-full w-full overflow-hidden`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var vw = window.innerWidth;
                  var vh = window.innerHeight;
                  var scale = Math.min(vw / 1366, vh / 768);
                  var clamped = Math.max(0.4, Math.min(3, scale));
                  document.documentElement.style.zoom = clamped;
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="m-0 p-0 h-full w-full overflow-hidden">
        <ViewportScaler />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
