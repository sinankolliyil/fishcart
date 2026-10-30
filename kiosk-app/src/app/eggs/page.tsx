import { CatalogPage } from "@/components/catalog/CatalogPage";
import { eggsCatalogData } from "@/data/catalogData";
import { getMergedCatalogProducts } from "@/lib/productUtils";

export default async function EggsPage() {
  const mergedProducts = await getMergedCatalogProducts('eggs', eggsCatalogData.products);
  return <CatalogPage data={{ ...eggsCatalogData, products: mergedProducts }} />;
}
