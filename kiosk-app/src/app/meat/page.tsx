import { CatalogPage } from "@/components/catalog/CatalogPage";
import { meatCatalogData } from "@/data/catalogData";
import { getMergedCatalogProducts } from "@/lib/productUtils";

export default async function MeatPage() {
  const mergedProducts = await getMergedCatalogProducts('meat', meatCatalogData.products);
  return <CatalogPage data={{ ...meatCatalogData, products: mergedProducts }} />;
}
