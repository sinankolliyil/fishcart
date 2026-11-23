'use client';

import { useEffect } from 'react';
import { sanityFetch } from '@/lib/sanity';
import { HOME_LOGO_QUERY } from '@/lib/sanityQueries';

interface FaviconSyncProps {
  initialLogoUrl?: string;
}

function updateFaviconLinks(url: string) {
  if (!url || typeof document === 'undefined') return;

  const head = document.head || document.getElementsByTagName('head')[0];
  const existingIcons = document.querySelectorAll<HTMLLinkElement>(
    "link[rel='icon'], link[rel='shortcut icon'], link[rel='apple-touch-icon']"
  );

  if (existingIcons.length > 0) {
    existingIcons.forEach((link) => {
      link.href = url;
    });
  } else {
    const iconLink = document.createElement('link');
    iconLink.rel = 'icon';
    iconLink.href = url;
    head.appendChild(iconLink);

    const appleLink = document.createElement('link');
    appleLink.rel = 'apple-touch-icon';
    appleLink.href = url;
    head.appendChild(appleLink);
  }
}

export function FaviconSync({ initialLogoUrl }: FaviconSyncProps) {
  useEffect(() => {
    if (initialLogoUrl) {
      updateFaviconLinks(initialLogoUrl);
    }

    const checkCmsLogo = () => {
      sanityFetch<{ logoUrl?: string }>(HOME_LOGO_QUERY, {}, { bypassCache: true })
        .then((data) => {
          if (data?.logoUrl) {
            updateFaviconLinks(data.logoUrl);
          }
        })
        .catch(() => {});
    };

    checkCmsLogo();

    // Re-check when user focuses window/tab in case CMS changed in another tab
    window.addEventListener('focus', checkCmsLogo);
    return () => {
      window.removeEventListener('focus', checkCmsLogo);
    };
  }, [initialLogoUrl]);

  return null;
}

