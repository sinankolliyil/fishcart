import fs from 'fs';
import path from 'path';
import os from 'os';
import { createClient } from '@sanity/client';

const configPath = path.join(os.homedir(), '.config', 'sanity', 'config.json');
const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const token = cfg.authToken;

const client = createClient({
  projectId: '4uuomk8a',
  dataset: 'production',
  token,
  useCdn: false,
  apiVersion: '2024-03-01',
});

async function main() {
  console.log('Fetching products from Sanity...');
  const products = await client.fetch(`*[_type == "product"]{
    _id,
    title,
    imageSrc,
    status,
    visibility,
    availabilityStatus,
    visibilityStatus,
    filterCountry,
    origin,
    "hasImage": defined(image.asset)
  }`);

  console.log(`Found ${products.length} products total.`);

  // Upload cache to reuse asset IDs if multiple products share the same image file
  const assetCache = new Map();

  for (const p of products) {
    console.log(`\nProcessing: "${p.title}" (${p._id})`);
    const patches = client.patch(p._id);

    // 1. Upload image if it has imageSrc but no image asset
    if (!p.hasImage && p.imageSrc) {
      // Find local file path
      const cleanedPath = p.imageSrc.replace(/^\//, '');
      let localPath = path.resolve(process.cwd(), 'kiosk-app', 'public', cleanedPath);

      if (!fs.existsSync(localPath)) {
        // Try fallback to public/assets
        localPath = path.resolve(process.cwd(), 'kiosk-app', 'public', 'assets', path.basename(cleanedPath));
      }

      if (fs.existsSync(localPath)) {
        let assetId = assetCache.get(localPath);
        if (!assetId) {
          console.log(`  Uploading asset: ${path.basename(localPath)}...`);
          const stream = fs.createReadStream(localPath);
          const assetDoc = await client.assets.upload('image', stream, {
            filename: path.basename(localPath),
          });
          assetId = assetDoc._id;
          assetCache.set(localPath, assetId);
          console.log(`  ✓ Uploaded as ${assetId}`);
        } else {
          console.log(`  Reusing cached asset ${assetId}`);
        }

        patches.set({
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: assetId,
            },
          },
        });
      } else {
        console.warn(`  ⚠️ File not found locally: ${localPath}`);
      }
    }

    // 2. Map legacy status & visibility
    if (!p.status) {
      const isDis = p.availabilityStatus === 'disabled' || p.availabilityStatus === 'unavailable';
      patches.set({ status: isDis ? 'disabled' : 'enabled' });
    }

    if (!p.visibility) {
      const isHid = p.visibilityStatus === 'hidden';
      patches.set({ visibility: isHid ? 'hide' : 'show' });
    }

    if (!p.origin && p.filterCountry) {
      patches.set({ origin: p.filterCountry });
    }

    // 3. Remove the 7 unknown legacy fields that cause the warning in Sanity Studio
    patches.unset([
      'imageSrc',
      'availabilityStatus',
      'visibilityStatus',
      'displayOrder',
      'cutOptions',
      'filterCountry',
      'isFavorite',
    ]);

    await patches.commit();
    console.log(`  ✓ Updated document ${p._id}`);
  }

  console.log('\nAll products migrated successfully!');
}

main().catch(console.error);
