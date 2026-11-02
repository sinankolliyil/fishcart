import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2024-01-01' });

async function main() {
  const isDryRun = process.argv.includes('--dry-run');
  console.log(`=== Resequencing Recipes (Dry Run: ${isDryRun}) ===`);

  // Fetch all recipes (both published and drafts)
  const recipes = await client.fetch<Array<{
    _id: string;
    title: string;
    category?: string;
    displayOrder?: number;
    _updatedAt: string;
  }>>(`*[_type == "recipe"]{_id, title, category, displayOrder, _updatedAt}`);

  console.log(`Found ${recipes.length} total recipe documents (including drafts).`);

  // Deduplicate by canonical ID (baseId without 'drafts.')
  const documentMap = new Map<string, {
    published?: typeof recipes[0];
    draft?: typeof recipes[0];
  }>();

  for (const r of recipes) {
    const isDraft = r._id.startsWith('drafts.');
    const baseId = isDraft ? r._id.replace('drafts.', '') : r._id;
    const entry = documentMap.get(baseId) || {};
    if (isDraft) {
      entry.draft = r;
    } else {
      entry.published = r;
    }
    documentMap.set(baseId, entry);
  }

  // Canonical list: prefer draft if present, else published
  const canonicalList = Array.from(documentMap.entries()).map(([baseId, entry]) => {
    const active = entry.draft || entry.published!;
    return {
      baseId,
      draftId: entry.draft?._id,
      publishedId: entry.published?._id,
      title: active.title || 'Untitled',
      category: active.category || 'Fish',
      displayOrder: typeof active.displayOrder === 'number' ? active.displayOrder : 999,
      _updatedAt: active._updatedAt,
    };
  });

  const categories = ['Fish', 'Meat', 'Chicken', 'Egg'];

  for (const cat of categories) {
    const items = canonicalList.filter((r) => r.category === cat);
    // Sort items:
    // Sort by displayOrder ascending.
    // If tie in displayOrder, sort by _updatedAt descending (most recently updated stays first).
    items.sort((a, b) => {
      if (a.displayOrder !== b.displayOrder) {
        return a.displayOrder - b.displayOrder;
      }
      return new Date(b._updatedAt).getTime() - new Date(a._updatedAt).getTime();
    });

    console.log(`\n--- Category: ${cat} (${items.length} recipes) ---`);
    const transaction = client.transaction();
    let hasChanges = false;

    items.forEach((item, index) => {
      const targetOrder = index + 1; // 1, 2, 3, 4 ...
      const orderChanged = item.displayOrder !== targetOrder;
      console.log(
        `  #${targetOrder} [old: ${item.displayOrder}] "${item.title}" (${item.baseId})${orderChanged ? ' -> UPDATE' : ' (keep)'}`
      );

      if (orderChanged) {
        hasChanges = true;
        // Patch published if it exists
        if (item.publishedId) {
          transaction.patch(item.publishedId, (p) => p.set({ displayOrder: targetOrder }));
        }
        // Patch draft if it exists
        if (item.draftId) {
          transaction.patch(item.draftId, (p) => p.set({ displayOrder: targetOrder }));
        }
      }
    });

    if (hasChanges) {
      if (isDryRun) {
        console.log(`  [DRY RUN] Would update orders for category: ${cat}`);
      } else {
        console.log(`  Committing transaction for ${cat}...`);
        await transaction.commit();
        console.log(`  Successfully updated orders for ${cat}!`);
      }
    } else {
      console.log(`  No changes needed for ${cat}.`);
    }
  }

  console.log('\n=== Resequencing Complete ===');
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
