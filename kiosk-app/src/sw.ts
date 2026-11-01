import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const sanitizedManifest = (self.__SW_MANIFEST || []).map((entry) => {
  if (typeof entry === 'string') {
    return entry.replace(/\\/g, '/');
  }
  if (entry && typeof entry === 'object' && entry.url) {
    return { ...entry, url: entry.url.replace(/\\/g, '/') };
  }
  return entry;
});

const serwist = new Serwist({
  precacheEntries: sanitizedManifest,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();