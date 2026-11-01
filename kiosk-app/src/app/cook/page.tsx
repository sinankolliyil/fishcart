import React from 'react';
import { HowToCookPage, Video, Category, Difficulty } from '@/components/cook/HowToCookPage';
import { sanityFetch } from '@/lib/sanity';
import { RECIPES_QUERY } from '@/lib/sanityQueries';

export const revalidate = 60;

export default async function CookPage() {
  let initialRecipes: Video[] = [];

  try {
    const cmsRecipes = await sanityFetch<any[]>(RECIPES_QUERY);
    if (cmsRecipes && Array.isArray(cmsRecipes)) {
      initialRecipes = cmsRecipes.map((r) => ({
        id: r.id || r.slug || r._id,
        title: r.title,
        description: r.description || '',
        duration: r.videoDuration || '06:00',
        thumbnail: r.thumbnail || '/assets/prod_1_salmon.jpg',
        category: (r.category || 'Fish') as Category,
        difficulty: (r.difficulty || 'Easy') as Difficulty,
        time: r.cookingTime || '30 mins',
        serves: r.serves || 2,
        ingredients: r.ingredients || [],
        pdfUrl: r.pdfUrl || undefined,
        videoUrl: r.videoFileUrl || r.videoUrl || undefined,
      }));
    }
  } catch (err) {
    console.warn('Failed to fetch recipes from Sanity, using mock data:', err);
  }

  return <HowToCookPage initialRecipes={initialRecipes} />;
}
