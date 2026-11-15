import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01';

// Only instantiate client if projectId is configured
export const isSanityConfigured = Boolean(
  projectId && projectId !== 'your_project_id_here' && projectId.trim().length > 0
);

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // Direct live origin: updates in CMS are immediately visible (no CDN purge delay)
    })
  : null;

export const liveClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // Direct origin client used only when bypassCache is requested
    })
  : null;

/**
 * Server-only authenticated Sanity write client
 */
export function getWriteClient() {
  const token =
    process.env.SANITY_API_WRITE_TOKEN ||
    'skNj9t0U9leBVq47t5a0U9wwlXK5qEBb49Vj8IHJMLMzWXSdjxGMqji4MhtOxSWPAk0afGXYZtETpkACF';
  if (!token) {
    throw new Error('Sanity write client token is not configured');
  }
  return createClient({
    projectId: projectId || '4uuomk8a',
    dataset: dataset || 'production',
    apiVersion: apiVersion || '2024-03-01',
    token,
    useCdn: false,
  });
}

const imageBuilder = isSanityConfigured && client ? createImageUrlBuilder(client) : null;

export function urlForImage(source: any): string {
  if (!source) return '';
  // If it's already a string URL (e.g., local image path like /assets/...), return as-is
  if (typeof source === 'string') return source;
  if (!imageBuilder) return '';
  try {
    return imageBuilder.image(source).auto('format').fit('max').url() || '';
  } catch (err) {
    console.error('Error generating Sanity image URL:', err);
    return '';
  }
}

// In-memory cache for fallback when network fails or times out
interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

const memoryCache = new Map<string, CacheEntry<any>>();
const inflightQueries = new Map<string, Promise<any>>();
// Short 4s cache window for deduplicating simultaneous requests across components on the same page,
// while guaranteeing any new CMS update reflects within seconds on reload.
const FRESH_TTL_MS = 4_000;

export function clearSanityCache(): void {
  memoryCache.clear();
  inflightQueries.clear();
}

async function executeSanityFetch<T>(
  cacheKey: string,
  query: string,
  params: Record<string, any>,
  options: { bypassCache?: boolean; timeoutMs?: number }
): Promise<T | null> {
  if (inflightQueries.has(cacheKey)) {
    return inflightQueries.get(cacheKey) as Promise<T | null>;
  }

  const targetClient = options.bypassCache ? liveClient : client;
  if (!targetClient) return null;

  // Generous 6-second timeout so requests over standard networks are never dropped prematurely
  const timeoutMs = options.timeoutMs ?? 6000;

  const fetchPromise = (async () => {
    try {
      const fetchCall = (targetClient as any).fetch(query, params);

      const timeoutCall = new Promise<null>((resolve) => {
        setTimeout(() => resolve(null), timeoutMs);
      });

      const data = (await Promise.race([fetchCall, timeoutCall])) as T | null;

      if (data !== null && data !== undefined) {
        memoryCache.set(cacheKey, { timestamp: Date.now(), data });
        return data;
      }

      // If timed out, gracefully return previously cached entry if available
      const stale = memoryCache.get(cacheKey);
      if (stale) return stale.data as T;

      return null;
    } catch (err) {
      console.warn('Sanity query failed (falling back to cached/local data):', err);
      const stale = memoryCache.get(cacheKey);
      return stale ? (stale.data as T) : null;
    } finally {
      inflightQueries.delete(cacheKey);
    }
  })();

  inflightQueries.set(cacheKey, fetchPromise);
  return fetchPromise;
}

/**
 * High-performance fetch wrapper with direct Sanity live data & inflight deduplication:
 * - Direct origin (useCdn: false) ensures CMS changes show up immediately upon publish
 * - Concurrent inflight queries are deduplicated so duplicate calls never make extra network requests
 * - 4s short memory deduplication prevents re-fetching identical data when multiple components render together
 * - Graceful fallback to cached data if network drops or times out (>6s)
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, any> = {},
  options: { bypassCache?: boolean; timeoutMs?: number } = {}
): Promise<T | null> {
  if (!client || !isSanityConfigured) {
    return null;
  }

  const cacheKey = `${query}_${JSON.stringify(params)}`;
  const now = Date.now();

  if (!options.bypassCache) {
    const cached = memoryCache.get(cacheKey);
    if (cached) {
      const age = now - cached.timestamp;
      if (age < FRESH_TTL_MS) {
        return cached.data as T;
      }
    }
  }

  return executeSanityFetch<T>(cacheKey, query, params, options);
}
