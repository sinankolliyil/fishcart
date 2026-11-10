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
      useCdn: true, // Use Sanity global Edge CDN (~20-50ms); purges within ~1-2s on publish
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
// Fresh window + Stale-While-Revalidate window for instant 0ms repeat navigation
const FRESH_TTL_MS = 15_000;
const SWR_TTL_MS = 120_000;

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

  const timeoutMs = options.timeoutMs ?? 2000;

  const fetchPromise = (async () => {
    try {
      const fetchOptions = options.bypassCache
        ? { cache: 'no-store' as const, next: { revalidate: 0 } }
        : { next: { revalidate: 15 } };

      const fetchCall = (targetClient as any).fetch(query, params, fetchOptions);

      const timeoutCall = new Promise<null>((resolve) => {
        setTimeout(() => resolve(null), timeoutMs);
      });

      const data = (await Promise.race([fetchCall, timeoutCall])) as T | null;

      if (data !== null && data !== undefined) {
        memoryCache.set(cacheKey, { timestamp: Date.now(), data });
        return data;
      }

      const stale = memoryCache.get(cacheKey);
      if (stale) return stale.data as T;

      return null;
    } catch (err) {
      console.warn('Sanity query failed (falling back to local data):', err);
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
 * High-performance fetch wrapper with Sanity Edge CDN + Stale-While-Revalidate:
 * - Serves fresh/SWR in-memory cache immediately (0ms) for repeat queries
 * - Uses Sanity Edge CDN (useCdn: true) for fast ~20-50ms network reads
 * - Deduplicates concurrent inflight requests
 * - Enforces a strict 2s timeout with graceful fallback to stale/local data
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
      if (age < SWR_TTL_MS) {
        // Return stale data immediately and revalidate in background
        void executeSanityFetch<T>(cacheKey, query, params, options);
        return cached.data as T;
      }
    }
  }

  return executeSanityFetch<T>(cacheKey, query, params, options);
}
