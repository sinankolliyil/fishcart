export interface CategoryTabItem {
  id: string;
  label: string;
  countLabel: string;
  iconName: "fish" | "globe" | "grill" | "curry" | "dots" | "beef" | "drumstick" | "egg";
}

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
  flag?: "UK" | "Norway" | "Scotland" | "Iceland" | "Netherlands"; // Flag types for country SVGs
}

export interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
  hasViewMore?: boolean;
}

export interface ProductItem {
  id: string;
  title: string;
  origin: string;
  filterCountry?: string; // Sourcing country used for active filters
  format: string; // e.g. "Filet" | "Whole" | "Steak Cut" | "Shell-on"
  badgeLabel?: string;
  price: number;
  unit: string; // e.g. "kg" | "pack"
  imageSrc: string;
  isFavorite?: boolean;
}

export interface BottomInfoItem {
  iconName: "fish" | "shield" | "phone" | "contact";
  title: string;
  description: string;
}

export interface CatalogPageData {
  category: "fish" | "meat" | "chicken" | "eggs";
  categoryLabel: string;
  breadcrumb: { label: string; href?: string }[];
  hero: {
    title: string;
    description: string;
    imageSrc: string; // Transparent background image
    imageAlt: string;
    gradientClass: string; // Tailwind gradient classes
  };
  tabs: CategoryTabItem[];
  filterSections: FilterSection[];
  products: ProductItem[];
  bottomInfo: BottomInfoItem[];
}

export interface ProductDetails extends ProductItem {
  category: "fish" | "meat" | "chicken" | "eggs";
  description?: string;
  rating?: number;
  reviewCount?: number;
  gallery?: string[];
  sizes?: { id: string; label: string; subLabel: string; price?: number; stock?: number; availability?: boolean }[];
  cutOptions?: { id: string; label: string }[];
  serves?: string;
  catchFrom?: { location: string; points: string[] };
  bestFor?: { title: string; description: string; imageSrc: string }[];
  specialty?: string[];
  famousOn?: string[];
  nutritionInfo?: { amount: string; unit: string; protein: string; calories: string; omega3: string; fat: string };
  goodFor?: string[];
  allergyInfo?: { title: string; desc: string; warning: string };
  howToCook?: { title: string; subtitle: string; time: string; imageSrc: string }[];
}
