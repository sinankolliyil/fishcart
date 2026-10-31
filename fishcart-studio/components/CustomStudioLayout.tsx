import React, { useEffect, useState, useCallback } from 'react';
import { LayoutProps, useClient } from 'sanity';
import { Card, Text, Flex, Spinner } from '@sanity/ui';
import { WEBSITE_RECIPES } from '../data/websiteRecipes';
import { WEBSITE_PRODUCTS } from '../data/websiteProducts';

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
}

export function CustomStudioLayout(props: LayoutProps) {
  const client = useClient({ apiVersion: '2024-01-01' });
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');
  const [syncMessage, setSyncMessage] = useState<string>('');

  const syncRecipes = useCallback(async () => {
    try {
      setSyncStatus('syncing');
      setSyncMessage('Seeding 44 website recipes into CMS...');

      const transaction = client.transaction();
      WEBSITE_RECIPES.forEach((rec) => {
        const docId = `recipe-${rec.id}`;
        transaction.createIfNotExists({
          _id: docId,
          _type: 'recipe',
          title: rec.title,
          slug: { _type: 'slug', current: slugify(rec.title) },
          category: rec.category,
          difficulty: rec.difficulty,
          videoDuration: rec.duration,
          cookingTime: rec.time,
          serves: rec.serves,
          imageSrc: rec.thumbnail,
          description: rec.description,
          ingredients: (rec.ingredients || []).map((ing, iIdx) => ({
            _key: `ing-${rec.id}-${iIdx}`,
            name: ing.name,
            qty: ing.qty,
            icon: ing.icon,
          })),
          displayOrder: rec.id,
          visibility: true,
        });
      });

      await transaction.commit();
      setSyncStatus('synced');
      setSyncMessage('Successfully populated 44 website recipes with website data!');
      setTimeout(() => setSyncStatus('idle'), 4000);
    } catch (err: unknown) {
      console.error('Failed to seed recipes:', err);
      setSyncStatus('error');
      setSyncMessage(err instanceof Error ? err.message : 'Failed to seed recipes');
      setTimeout(() => setSyncStatus('idle'), 5000);
    }
  }, [client]);

  const syncProducts = useCallback(async () => {
    try {
      setSyncStatus('syncing');
      setSyncMessage('Seeding 38 website catalog products into CMS (Fish, Meat, Chicken, Eggs)...');

      const transaction = client.transaction();
      WEBSITE_PRODUCTS.forEach((prod) => {
        const docId = `product-${prod.category}-${prod.id}`;
        transaction.createIfNotExists({
          _id: docId,
          _type: 'product',
          title: prod.title,
          slug: { _type: 'slug', current: prod.slug },
          category: prod.category,
          format: prod.format,
          origin: prod.origin,
          filterCountry: prod.filterCountry,
          badgeLabel: prod.badgeLabel,
          price: prod.price,
          unit: prod.unit,
          imageSrc: prod.imageSrc,
          isFavorite: prod.isFavorite,
          displayOrder: prod.displayOrder,
          description: prod.description,
          rating: prod.rating,
          reviewCount: prod.reviewCount,
          serves: prod.serves,
          sizes: prod.sizes.map((s, idx) => ({ _key: `size-${prod.id}-${idx}`, ...s })),
          cutOptions: prod.cutOptions.map((c, idx) => ({ _key: `cut-${prod.id}-${idx}`, ...c })),
          catchFrom: prod.catchFrom,
          specialty: prod.specialty,
          famousOn: prod.famousOn,
          nutritionInfo: prod.nutritionInfo,
          goodFor: prod.goodFor,
          allergyInfo: prod.allergyInfo,
          bestFor: prod.bestFor.map((b, idx) => ({ _key: `best-${prod.id}-${idx}`, ...b })),
          howToCook: prod.howToCook.map((h, idx) => ({ _key: `cook-${prod.id}-${idx}`, ...h })),
          availabilityStatus: 'available',
          visibilityStatus: 'visible',
        });
      });

      await transaction.commit();
      setSyncStatus('synced');
      setSyncMessage('Successfully populated 38 website products into Fish, Meat, Chicken & Eggs!');
      setTimeout(() => setSyncStatus('idle'), 4000);
    } catch (err: unknown) {
      console.error('Failed to seed products:', err);
      setSyncStatus('error');
      setSyncMessage(err instanceof Error ? err.message : 'Failed to seed products');
      setTimeout(() => setSyncStatus('idle'), 5000);
    }
  }, [client]);

  useEffect(() => {
    let isMounted = true;
    client
      .fetch<number>('count(*[_type == "recipe"])')
      .then((count) => {
        if (!isMounted) return;
        if (count === 0) {
          syncRecipes();
        }
      })
      .catch(() => {});

    client
      .fetch<number>('count(*[_type == "product"])')
      .then((count) => {
        if (!isMounted) return;
        if (count === 0) {
          syncProducts();
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [client, syncRecipes, syncProducts]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <style>{`
        /* ─── TIGHT & COMPACT COLUMN WIDTHS FOR SANITY STUDIO ─── */
        [data-ui="Pane"] {
          min-width: 140px !important;
        }

        /* Column 1: Main navigation (Fishcart Content) - divider sits right next to longest text (How to Cook / Testimonials) */
        [data-ui="Pane"][data-pane-index="0"] {
          min-width: 150px !important;
          max-width: 168px !important;
          flex: 0 0 162px !important;
          width: 162px !important;
        }

        /* Column 2: Secondary section lists (Fish Products, How to Cook, etc. - divider sits right next to Hidden Products (Hide)) */
        [data-ui="Pane"][data-pane-index="1"] {
          min-width: 195px !important;
          max-width: 215px !important;
          flex: 0 0 206px !important;
          width: 206px !important;
        }

        /* Column 3: Items / Documents list (Products, Recipes list) */
        [data-ui="Pane"][data-pane-index="2"] {
          min-width: 250px !important;
          max-width: 310px !important;
          flex: 0 0 275px !important;
          width: 275px !important;
        }

        /* Allow Document Editor / Detail pane to fill the remaining screen space */
        [data-ui="Pane"][data-ui="DocumentPane"],
        [data-ui="Pane"][data-pane-index="3"] {
          min-width: 420px !important;
          max-width: none !important;
          flex: 1 1 auto !important;
          width: auto !important;
        }

        /* Tighter list item & header padding so divider sits snug next to text */
        [data-ui="Pane"][data-pane-index="0"] [data-ui="CommandList"],
        [data-ui="Pane"][data-pane-index="1"] [data-ui="CommandList"] {
          padding-left: 4px !important;
          padding-right: 4px !important;
        }

        [data-ui="Pane"][data-pane-index="0"] [data-ui="PaneItem"],
        [data-ui="Pane"][data-pane-index="1"] [data-ui="PaneItem"] {
          padding-left: 6px !important;
          padding-right: 6px !important;
        }

        [data-ui="Pane"][data-pane-index="0"] [data-ui="PaneHeader"],
        [data-ui="Pane"][data-pane-index="1"] [data-ui="PaneHeader"] {
          padding-left: 8px !important;
          padding-right: 8px !important;
        }
      `}</style>

      {syncStatus !== 'idle' && (
        <Card
          padding={2}
          tone={syncStatus === 'error' ? 'critical' : syncStatus === 'synced' ? 'positive' : 'primary'}
          shadow={1}
        >
          <Flex align="center" justify="center" gap={3}>
            {syncStatus === 'syncing' && <Spinner size={1} />}
            <Text size={1} weight="semibold">
              {syncMessage}
            </Text>
          </Flex>
        </Card>
      )}
      {props.renderDefault(props)}
    </div>
  );
}
