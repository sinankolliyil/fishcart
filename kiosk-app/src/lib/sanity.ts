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
      useCdn: true, // Enable Sanity global Edge CDN for ultra-fast response times
    })
  : null;

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

// In-memory cache for ultra-fast (0ms) repeated query responses
interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

const memoryCache = new Map<string, CacheEntry<any>>();
const inflightQueries = new Map<string, Promise<any>>();
const CACHE_TTL_MS = 60 * 1000; // 60 seconds cache

/**
 * Safe, high-performance fetch wrapper:
 * - Serves from memory cache in 0ms if fresh
 * - Deduplicates concurrent requests
 * - Routes via Sanity Edge CDN
 * - Enforces a strict 2.5-second timeout so the UI NEVER lags or hangs
 * - Falls back to local data gracefully on timeout or network error
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

  // Check in-memory cache
  if (!options.bypassCache) {
    const cached = memoryCache.get(cacheKey);
    if (cached && now - cached.timestamp < CACHE_TTL_MS) {
      return cached.data as T;
    }
  }

  // Deduplicate inflight concurrent queries
  if (inflightQueries.has(cacheKey)) {
    return inflightQueries.get(cacheKey) as Promise<T | null>;
  }

  const timeoutMs = options.timeoutMs ?? 2500;

  const fetchPromise = (async () => {
    try {
      const fetchCall = (client as any).fetch(query, params, {
        next: { revalidate: 60 },
      });

      const timeoutCall = new Promise<null>((resolve) => {
        setTimeout(() => {
          // Timeout reached: return null to trigger graceful fallback to local data
          resolve(null);
        }, timeoutMs);
      });

      const data = (await Promise.race([fetchCall, timeoutCall])) as T | null;

      if (data !== null && data !== undefined) {
        memoryCache.set(cacheKey, { timestamp: Date.now(), data });
        return data;
      }

      // If timed out, return stale cache if available
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
