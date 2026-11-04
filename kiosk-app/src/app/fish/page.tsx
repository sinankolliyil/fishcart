import { CatalogPage } from "@/components/catalog/CatalogPage";
import { fishCatalogData } from "@/data/catalogData";
import { getMergedCatalogProducts } from "@/lib/productUtils";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function FishPage() {
  const mergedProducts = await getMergedCatalogProducts('fish', fishCatalogData.products);
  return <CatalogPage data={{ ...fishCatalogData, products: mergedProducts }} />;
}
