"use client";

import React, { useState, useMemo } from "react";
import { CatalogPageData } from "@/types/catalog";
import { CatalogHero } from "./CatalogHero";
import { CategoryTabs } from "./CategoryTabs";
import { FilterSidebar } from "./FilterSidebar";
import { ProductGrid } from "./ProductGrid";
import { BottomInfoSection } from "./BottomInfoSection";
import { Footer } from "@/components/layout/Footer";

export interface CatalogPageProps {
  data: CatalogPageData;
}

export function CatalogPage({ data }: CatalogPageProps) {
  // 1. Tab State (e.g. "all-fish", "by-country", "grill-fishes", etc.)
  const [activeTabId, setActiveTabId] = useState(data.tabs[0]?.id || "all");

  // 2. Sorting State (e.g. "newest", "price-low", "price-high", "popularity")
  const [activeSort, setActiveSort] = useState("newest");

  // 3. Checkbox Filters State (sectionId -> list of optionIds)
  const [tempFilters, setTempFilters] = useState<Record<string, string[]>>({
    country: [],
    type: [],
    size: [],
  });

  const [appliedFilters, setAppliedFilters] = useState<Record<string, string[]>>({
    country: [],
    type: [],
    size: [],
  });

  // Handle checking/unchecking boxes in sidebar (immediate visual feedback inside state)
  const handleFilterToggle = (sectionId: string, optionId: string) => {
    setTempFilters((prev) => {
      const sectionOptions = prev[sectionId] || [];
      const updated = sectionOptions.includes(optionId)
        ? sectionOptions.filter((id) => id !== optionId)
        : [...sectionOptions, optionId];
      return { ...prev, [sectionId]: updated };
    });
  };

  // Apply filters on button click
  const handleApplyFilters = () => {
    setAppliedFilters(tempFilters);
  };

  // Reset filters
  const handleResetFilters = () => {
    const empty = { country: [], type: [], size: [] };
    setTempFilters(empty);
    setAppliedFilters(empty);
  };

  // 4. Filtering and Sorting Logic
  const processedProducts = useMemo(() => {
    let result = [...data.products];

    // A. Sub-category Tabs Filtering
    if (data.category === "fish") {
      if (activeTabId === "grill-fishes") {
        result = result.filter((p) => ["salmon", "sea-bass", "tuna-steak", "prawns"].includes(p.id));
      } else if (activeTabId === "curry-fishes") {
        result = result.filter((p) => ["mackerel", "tilapia", "prawns", "trout"].includes(p.id));
      } else if (activeTabId === "by-country") {
        result = result.filter((p) => ["salmon", "tuna-steak", "tilapia", "prawns", "trout"].includes(p.id));
      } else if (activeTabId === "other-types") {
        result = result.filter((p) => ["cod-fillet", "tilapia", "trout"].includes(p.id));
      }
    } else {
      // Dynamic tabs filtering for other categories
      if (activeTabId.includes("beef") || activeTabId.includes("curry")) {
        result = result.slice(0, Math.ceil(result.length / 2));
      } else if (activeTabId.includes("mutton") || activeTabId.includes("boneless")) {
        result = result.slice(Math.ceil(result.length / 2));
      } else if (activeTabId.includes("country")) {
        result = result.filter((p) => p.origin !== "Local Farms");
      }
    }

    // B. Checkbox Filters Filtering
    // 1. Country Filter
    const selectedCountries = appliedFilters.country || [];
    if (selectedCountries.length > 0) {
      result = result.filter((p) => {
        const countryLower = (p.filterCountry || p.origin).toLowerCase();
        return selectedCountries.some((c) => {
          if (c === "uk") return countryLower === "united kingdom" || countryLower === "uk";
          return countryLower === c;
        });
      });
    }

    // 2. Type Filter
    const selectedTypes = appliedFilters.type || [];
    if (selectedTypes.length > 0) {
      result = result.filter((p) => {
        return selectedTypes.some((t) => {
          if (t === "grill") return ["salmon", "sea-bass", "tuna-steak", "prawns"].includes(p.id);
          if (t === "curry") return ["mackerel", "tilapia", "prawns", "trout"].includes(p.id);
          if (t === "steak") return p.format.toLowerCase().includes("steak");
          if (t === "whole") return p.format.toLowerCase().includes("whole");
          if (t === "fillets") return p.format.toLowerCase().includes("filet") || p.format.toLowerCase().includes("fillet");
          // For meat/chicken
          if (t === "boneless") return p.format.toLowerCase().includes("boneless") || p.format.toLowerCase().includes("fillet");
          if (t === "bone-in") return p.format.toLowerCase().includes("bone") || p.format.toLowerCase().includes("whole");
          return false;
        });
      });
    }

    // 3. Size Filter
    const selectedSizes = appliedFilters.size || [];
    if (selectedSizes.length > 0) {
      result = result.filter((p) => {
        return selectedSizes.some((s) => {
          if (s === "small" || s === "pack-6") return p.price < 8.00;
          if (s === "medium" || s === "pack-12") return p.price >= 8.00 && p.price < 15.00;
          if (s === "large" || s === "pack-30") return p.price >= 15.00;
          return false;
        });
      });
    }

    // C. Sorting
    if (activeSort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (activeSort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (activeSort === "popularity") {
      result.sort((a, b) => b.title.length - a.title.length);
    }

    return result;
  }, [data, activeTabId, appliedFilters, activeSort]);

  // Tab change handler
  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    handleResetFilters();
  };

  return (
    <div className="grid h-full min-h-[950px] w-full grid-rows-[minmax(0,15fr)_minmax(0,10fr)_minmax(0,53fr)_minmax(0,11fr)_minmax(0,11fr)] gap-[var(--main-gap)] select-none">
      {/* 1. Hero Section */}
      <div className="overflow-hidden h-full w-full">
        <CatalogHero
          breadcrumb={data.breadcrumb}
          title={data.hero.title}
          description={data.hero.description}
          imageSrc={data.hero.imageSrc}
          imageAlt={data.hero.imageAlt}
          gradientClass={data.hero.gradientClass}
          category={data.category}
        />
      </div>

      {/* 2. Category Tabs */}
      <div className="overflow-hidden h-full w-full">
        <CategoryTabs
          tabs={data.tabs}
          activeTabId={activeTabId}
          onTabChange={handleTabChange}
          category={data.category}
        />
      </div>

      {/* 3. Main Catalog Section (Filters + Product Grid) */}
      <div className="grid grid-cols-5 gap-[var(--main-gap)] w-full h-full overflow-hidden items-stretch min-h-0">
        {/* Left Column: Filter Sidebar — 1/5 width to match first category tab */}
        <div className="col-span-1 h-full overflow-hidden">
          <FilterSidebar
            filterSections={data.filterSections}
            selectedOptions={tempFilters}
            onFilterToggle={handleFilterToggle}
            activeSort={activeSort}
            onSortChange={setActiveSort}
            onApply={handleApplyFilters}
            category={data.category}
          />
        </div>

        {/* Right Column: Product List — 4/5 width */}
        <div className="col-span-4 h-full overflow-hidden flex flex-col">
          <ProductGrid
            products={processedProducts}
            category={data.category}
            totalItems={data.products.length}
            activeSort={activeSort}
            onSortChange={setActiveSort}
          />
        </div>
      </div>

      {/* 4. Bottom Information Cards */}
      <div className="overflow-hidden h-full w-full">
        <BottomInfoSection
          bottomInfo={data.bottomInfo}
          category={data.category}
        />
      </div>

      {/* 5. Reusable Footer */}
      <div className="overflow-hidden h-full w-full shrink-0">
        <Footer />
      </div>
    </div>
  );
}
