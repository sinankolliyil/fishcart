import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppShell } from '@/components/layout/AppShell';
import { ViewportScaler } from '@/components/layout/ScaleWrapper';
import { FaviconSync } from '@/components/layout/FaviconSync';
import { sanityFetch } from '@/lib/sanity';
import { HOME_LOGO_QUERY } from '@/lib/sanityQueries';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  let logoUrl: string | null = null;
  let brandTitle = 'FishCart';
  let brandTagline = 'Daily Fresh Partner';

  try {
    const data = await sanityFetch<{
      logoUrl?: string;
      brandTitle?: string;
      brandTagline?: string;
    }>(HOME_LOGO_QUERY, {}, { bypassCache: true });

    if (data?.logoUrl) {
      logoUrl = data.logoUrl;
    }
    if (data?.brandTitle) {
      brandTitle = data.brandTitle;
    }
    if (data?.brandTagline) {
      brandTagline = data.brandTagline;
    }
  } catch (err) {
    console.error('Error fetching CMS logo for metadata:', err);
  }

  const iconUrl = logoUrl || '/icons/icon_192.png';
  const appleIconUrl = logoUrl || '/icons/icon_180.png';

  return {
    title: `${brandTitle} - ${brandTagline}`,
    description: `${brandTitle} Retail Kiosk Application`,
    manifest: '/manifest.json',
    icons: {
      icon: [
        { url: iconUrl },
        { url: '/favicon.ico' },
      ],
      shortcut: [iconUrl],
      apple: [
        { url: appleIconUrl, sizes: '180x180' },
      ],
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#0D55CF',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let logoUrl: string | undefined;
  try {
    const data = await sanityFetch<{ logoUrl?: string }>(HOME_LOGO_QUERY, {}, { bypassCache: true });
    if (data?.logoUrl) {
      logoUrl = data.logoUrl;
    }
  } catch {
    // fallback
  }

  const initialFavicon = logoUrl || '/icons/icon_192.png';

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full w-full overflow-hidden font-sans antialiased`}
    >
      <head>
        <link rel="icon" href={initialFavicon} />
        <link rel="shortcut icon" href={initialFavicon} />
        <link rel="apple-touch-icon" href={initialFavicon} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var vw = window.innerWidth;
                  var vh = window.innerHeight;
                  var isPortrait = vw < vh;
                  if (!isPortrait) {
                    var scale = Math.min(vw / 1366, vh / 768);
                    var clamped = Math.max(0.4, Math.min(3, scale));
                    document.documentElement.style.zoom = clamped;
                  } else {
                    document.documentElement.style.zoom = 1;
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="m-0 h-full w-full overflow-hidden p-0">
        <FaviconSync initialLogoUrl={logoUrl} />
        <ViewportScaler />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
