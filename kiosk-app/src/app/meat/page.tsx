import { CatalogPage } from "@/components/catalog/CatalogPage";
import { meatCatalogData } from "@/data/catalogData";

export default function MeatPage() {
  return <CatalogPage data={meatCatalogData} />;
}
