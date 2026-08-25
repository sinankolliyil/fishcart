'use client';

import React, { useState, useMemo } from 'react';
import { CatalogPageData } from '@/types/catalog';
import { CatalogHero } from './CatalogHero';
import { CategoryTabs } from './CategoryTabs';
import { FilterSidebar } from './FilterSidebar';
import { ProductGrid } from './ProductGrid';
import { BottomInfoSection } from './BottomInfoSection';
import { HomeFooter } from '@/components/layout/HomeFooter';

export interface CatalogPageProps {
  data: CatalogPageData;
}

export function CatalogPage({ data }: CatalogPageProps) {
  // 1. Tab State (e.g. "all-fish", "by-country", "grill-fishes", etc.)
  const [activeTabId, setActiveTabId] = useState(data.tabs[0]?.id || 'all');

  // 2. Sorting State (e.g. "newest", "price-low", "price-high", "popularity")
  const [activeSort, setActiveSort] = useState('newest');

  // 3. Checkbox Filters State (sectionId -> list of optionIds)
  const [tempFilters, setTempFilters] = useState<Record<string, string[]>>({
    country: [],
    type: [],
    size: [],
  });

  const [appliedFilters, setAppliedFilters] = useState<
    Record<string, string[]>
  >({
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
    if (data.category === 'fish') {
      if (activeTabId === 'grill-fishes') {
        result = result.filter((p) =>
          ['salmon', 'sea-bass', 'tuna-steak', 'prawns'].includes(p.id)
        );
      } else if (activeTabId === 'curry-fishes') {
        result = result.filter((p) =>
          ['mackerel', 'tilapia', 'prawns', 'trout'].includes(p.id)
        );
      } else if (activeTabId === 'by-country') {
        result = result.filter((p) =>
          ['salmon', 'tuna-steak', 'tilapia', 'prawns', 'trout'].includes(p.id)
        );
      } else if (activeTabId === 'other-types') {
        result = result.filter((p) =>
          ['cod-fillet', 'tilapia', 'trout'].includes(p.id)
        );
      }
    } else {
      // Dynamic tabs filtering for other categories
      if (activeTabId.includes('beef') || activeTabId.includes('curry')) {
        result = result.slice(0, Math.ceil(result.length / 2));
      } else if (
        activeTabId.includes('mutton') ||
        activeTabId.includes('boneless')
      ) {
        result = result.slice(Math.ceil(result.length / 2));
      } else if (activeTabId.includes('country')) {
        result = result.filter((p) => p.origin !== 'Local Farms');
      }
    }

    // B. Checkbox Filters Filtering
    // 1. Country Filter
    const selectedCountries = appliedFilters.country || [];
    if (selectedCountries.length > 0) {
      result = result.filter((p) => {
        const countryLower = (p.filterCountry || p.origin).toLowerCase();
        return selectedCountries.some((c) => {
          if (c === 'uk')
            return countryLower === 'united kingdom' || countryLower === 'uk';
          return countryLower === c;
        });
      });
    }

    // 2. Type Filter
    const selectedTypes = appliedFilters.type || [];
    if (selectedTypes.length > 0) {
      result = result.filter((p) => {
        return selectedTypes.some((t) => {
          if (t === 'grill')
            return ['salmon', 'sea-bass', 'tuna-steak', 'prawns'].includes(
              p.id
            );
          if (t === 'curry')
            return ['mackerel', 'tilapia', 'prawns', 'trout'].includes(p.id);
          if (t === 'steak') return p.format.toLowerCase().includes('steak');
          if (t === 'whole') return p.format.toLowerCase().includes('whole');
          if (t === 'fillets')
            return (
              p.format.toLowerCase().includes('filet') ||
              p.format.toLowerCase().includes('fillet')
            );
          // For meat/chicken
          if (t === 'boneless')
            return (
              p.format.toLowerCase().includes('boneless') ||
              p.format.toLowerCase().includes('fillet')
            );
          if (t === 'bone-in')
            return (
              p.format.toLowerCase().includes('bone') ||
              p.format.toLowerCase().includes('whole')
            );
          return false;
        });
      });
    }

    // 3. Size Filter
    const selectedSizes = appliedFilters.size || [];
    if (selectedSizes.length > 0) {
      result = result.filter((p) => {
        return selectedSizes.some((s) => {
          if (s === 'small' || s === 'pack-6') return p.price < 8.0;
          if (s === 'medium' || s === 'pack-12')
            return p.price >= 8.0 && p.price < 15.0;
          if (s === 'large' || s === 'pack-30') return p.price >= 15.0;
          return false;
        });
      });
    }

    // C. Sorting
    if (activeSort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (activeSort === 'popularity') {
      result.sort((a, b) => b.title.length - a.title.length);
    }

    return result;
  }, [data, activeTabId, appliedFilters, activeSort]);

  // Dynamic Tabs with Real Counts
  const dynamicTabs = useMemo(() => {
    return data.tabs.map((tab) => {
      let count = data.products.length;
      if (data.category === 'fish') {
        if (tab.id === 'grill-fishes') {
          count = data.products.filter((p) =>
            ['salmon', 'sea-bass', 'tuna-steak', 'prawns'].includes(p.id)
          ).length;
        } else if (tab.id === 'curry-fishes') {
          count = data.products.filter((p) =>
            ['mackerel', 'tilapia', 'prawns', 'trout'].includes(p.id)
          ).length;
        } else if (tab.id === 'by-country') {
          count = data.products.filter((p) =>
            ['salmon', 'tuna-steak', 'tilapia', 'prawns', 'trout'].includes(
              p.id
            )
          ).length;
        } else if (tab.id === 'other-types') {
          count = data.products.filter((p) =>
            ['cod-fillet', 'tilapia', 'trout'].includes(p.id)
          ).length;
        }
      } else {
        if (tab.id.includes('beef') || tab.id.includes('curry')) {
          count = Math.ceil(data.products.length / 2);
        } else if (tab.id.includes('mutton') || tab.id.includes('boneless')) {
          count = data.products.length - Math.ceil(data.products.length / 2);
        } else if (tab.id.includes('country')) {
          count = data.products.filter(
            (p) => p.origin !== 'Local Farms'
          ).length;
        }
      }
      return { ...tab, countLabel: `${count} Items` };
    });
  }, [data]);

  // Dynamic Filter Sections with Real Counts
  const dynamicFilterSections = useMemo(() => {
    return data.filterSections.map((section) => ({
      ...section,
      options: section.options.map((opt) => {
        let count = 0;
        if (section.id === 'country') {
          count = data.products.filter((p) => {
            const countryLower = (p.filterCountry || p.origin).toLowerCase();
            if (opt.id === 'uk')
              return countryLower === 'united kingdom' || countryLower === 'uk';
            return countryLower === opt.id;
          }).length;
        } else if (section.id === 'type') {
          count = data.products.filter((p) => {
            if (opt.id === 'grill')
              return ['salmon', 'sea-bass', 'tuna-steak', 'prawns'].includes(
                p.id
              );
            if (opt.id === 'curry')
              return ['mackerel', 'tilapia', 'prawns', 'trout'].includes(p.id);
            if (opt.id === 'steak')
              return p.format.toLowerCase().includes('steak');
            if (opt.id === 'whole')
              return p.format.toLowerCase().includes('whole');
            if (opt.id === 'fillets')
              return (
                p.format.toLowerCase().includes('filet') ||
                p.format.toLowerCase().includes('fillet')
              );
            if (opt.id === 'boneless')
              return (
                p.format.toLowerCase().includes('boneless') ||
                p.format.toLowerCase().includes('fillet')
              );
            if (opt.id === 'bone-in')
              return (
                p.format.toLowerCase().includes('bone') ||
                p.format.toLowerCase().includes('whole')
              );
            return false;
          }).length;
        } else if (section.id === 'size') {
          count = data.products.filter((p) => {
            if (opt.id === 'small' || opt.id === 'pack-6') return p.price < 8.0;
            if (opt.id === 'medium' || opt.id === 'pack-12')
              return p.price >= 8.0 && p.price < 15.0;
            if (opt.id === 'large' || opt.id === 'pack-30')
              return p.price >= 15.0;
            return false;
          }).length;
        }
        return { ...opt, count };
      }),
    }));
  }, [data]);

  // Tab change handler
  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    handleResetFilters();
  };

  return (
    <div className="grid h-full min-h-[950px] w-full grid-rows-[minmax(0,14fr)_minmax(0,7fr)_minmax(0,58fr)_minmax(0,11fr)_minmax(0,10fr)] gap-[var(--main-gap)] select-none">
      {/* 1. Hero Section */}
      <div className="h-full w-full overflow-hidden">
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
      <div className="h-full w-full overflow-hidden">
        <CategoryTabs
          tabs={dynamicTabs}
          activeTabId={activeTabId}
          onTabChange={handleTabChange}
          category={data.category}
        />
      </div>

      {/* 3. Main Catalog Section (Filters + Product Grid) */}
      <div className="grid h-full min-h-0 w-full grid-cols-5 items-stretch gap-[var(--main-gap)] overflow-hidden">
        {/* Left Column: Filter Sidebar — 1/5 width to match first category tab */}
        <div className="col-span-1 h-full overflow-hidden">
          <FilterSidebar
            filterSections={dynamicFilterSections}
            selectedOptions={tempFilters}
            onFilterToggle={handleFilterToggle}
            activeSort={activeSort}
            onSortChange={setActiveSort}
            onApply={handleApplyFilters}
            category={data.category}
          />
        </div>

        {/* Right Column: Product List — 4/5 width */}
        <div className="col-span-4 flex h-full flex-col overflow-hidden rounded-[8px] bg-white p-2 shadow-sm border border-slate-100">
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
      <div className="h-full w-full overflow-hidden">
        <BottomInfoSection
          bottomInfo={data.bottomInfo}
          category={data.category}
        />
      </div>

      {/* 5. Reusable Footer */}
      <div className="h-full w-full shrink-0 overflow-hidden">
        <HomeFooter />
      </div>
    </div>
  );
}
