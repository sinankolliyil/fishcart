import { CatalogPage } from "@/components/catalog/CatalogPage";
import { chickenCatalogData } from "@/data/catalogData";
import { getMergedCatalogProducts } from "@/lib/productUtils";

export default async function ChickenPage() {
  const mergedProducts = await getMergedCatalogProducts('chicken', chickenCatalogData.products);
  return <CatalogPage data={{ ...chickenCatalogData, products: mergedProducts }} />;
}
