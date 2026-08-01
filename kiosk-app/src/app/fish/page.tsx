import { CatalogPage } from "@/components/catalog/CatalogPage";
import { fishCatalogData } from "@/data/catalogData";

export default function FishPage() {
  return <CatalogPage data={fishCatalogData} />;
}
