import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';

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
      useCdn: process.env.NODE_ENV === 'production',
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

/**
 * Safe fetch wrapper that handles network errors or missing CMS config gracefully
 */
export async function sanityFetch<T>(query: string, params: Record<string, any> = {}): Promise<T | null> {
  if (!client || !isSanityConfigured) {
    return null;
  }
  try {
    const data = await client.fetch<T>(query, params);
    return data;
  } catch (err) {
    console.warn('Sanity query failed (falling back to local data):', err);
    return null;
  }
}
