import { CatalogPage } from "@/components/catalog/CatalogPage";
import { eggsCatalogData } from "@/data/catalogData";

export default function EggsPage() {
  return <CatalogPage data={eggsCatalogData} />;
}
