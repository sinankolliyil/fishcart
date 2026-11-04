'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { X, MapPin, PhoneCall, Mail } from 'lucide-react';
import { CatalogPageData } from '@/types/catalog';
import { CatalogHero } from './CatalogHero';
import { CategoryTabs } from './CategoryTabs';
import { FilterSidebar } from './FilterSidebar';
import { ProductGrid } from './ProductGrid';
import { MobileProductGrid } from './MobileProductGrid';
import { BottomInfoSection } from './BottomInfoSection';
import { HomeFooter } from '@/components/layout/HomeFooter';

export interface CatalogPageProps {
  data: CatalogPageData;
}

// Helper to normalize origin / country dynamically
function normalizeCountry(raw?: string): { id: string; label: string; flag?: string } {
  const trimmed = (raw || '').trim();
  const lower = trimmed.toLowerCase();
  if (!lower) return { id: '', label: '' };
  if (
    lower === 'uk' ||
    lower === 'united kingdom' ||
    lower === 'great britain' ||
    lower === 'england' ||
    lower === 'britain'
  ) {
    return { id: 'uk', label: 'United Kingdom', flag: 'UK' };
  }
  if (lower === 'norway') {
    return { id: 'norway', label: 'Norway', flag: 'Norway' };
  }
  if (lower === 'scotland') {
    return { id: 'scotland', label: 'Scotland', flag: 'Scotland' };
  }
  if (lower === 'iceland') {
    return { id: 'iceland', label: 'Iceland', flag: 'Iceland' };
  }
  if (lower === 'netherlands' || lower === 'holland') {
    return { id: 'netherlands', label: 'Netherlands', flag: 'Netherlands' };
  }
  if (lower === 'spain') {
    return { id: 'spain', label: 'Spain', flag: 'Spain' };
  }
  if (lower === 'poland') {
    return { id: 'poland', label: 'Poland', flag: 'Poland' };
  }
  if (lower === 'new zealand' || lower === 'nz') {
    return { id: 'new-zealand', label: 'New Zealand', flag: 'New Zealand' };
  }
  if (lower === 'thailand') {
    return { id: 'thailand', label: 'Thailand', flag: 'Thailand' };
  }
  if (lower === 'local farms' || lower === 'local') {
    return { id: 'local-farms', label: 'Local Farms' };
  }
  if (lower === 'organic farms') {
    return { id: 'organic-farms', label: 'Organic Farms' };
  }

  // Any other country or farm dynamically added in CMS!
  const id = lower.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const label = trimmed.replace(/\b\w/g, (l) => l.toUpperCase());
  return { id, label };
}

// Helper to normalize format / cut style dynamically
function normalizeFormat(raw?: string): { id: string; label: string } {
  const trimmed = (raw || '').trim();
  const lower = trimmed.toLowerCase();
  if (!lower) return { id: '', label: '' };

  if (lower === 'filet' || lower === 'fillet' || lower === 'fillets') {
    return { id: 'fillets', label: 'Fillet' };
  }
  if (lower === 'steak' || lower === 'steak cut' || lower === 'steaks') {
    return { id: 'steak', label: 'Steak Cut' };
  }
  if (lower === 'whole' || lower === 'whole fish' || lower === 'whole chicken') {
    return { id: 'whole', label: 'Whole' };
  }
  if (lower === 'boneless' || lower === 'boneless cut') {
    return { id: 'boneless', label: 'Boneless' };
  }
  if (lower === 'with bone' || lower === 'bone-in' || lower === 'bone in') {
    return { id: 'bone-in', label: 'Bone-in' };
  }
  if (lower === 'chops' || lower === 'chop') {
    return { id: 'chops', label: 'Chops' };
  }
  if (lower === 'whole leg' || lower === 'leg') {
    return { id: 'whole-leg', label: 'Whole Leg' };
  }
  if (lower === 'fresh cuts' || lower === 'curry cut' || lower === 'curry cut with bone') {
    return { id: 'curry-cut', label: 'Curry Cut' };
  }
  if (lower === 'shell-on' || lower === 'shell on') {
    return { id: 'shell-on', label: 'Shell-on' };
  }
  if (lower === 'wings') {
    return { id: 'wings', label: 'Wings' };
  }
  if (lower === 'drumstick' || lower === 'drumsticks') {
    return { id: 'drumstick', label: 'Drumstick' };
  }
  if (lower === '12 pack' || lower === '12-pack' || lower === '12 eggs pack') {
    return { id: 'pack-12', label: '12 Pack' };
  }
  if (lower === '6 pack' || lower === '6-pack' || lower === '6 eggs pack') {
    return { id: 'pack-6', label: '6 Pack' };
  }
  if (lower === '30 pack' || lower === '30-pack' || lower === '30 eggs tray' || lower === 'tray') {
    return { id: 'pack-30', label: '30 Pack Tray' };
  }

  // Any other format dynamically added in CMS!
  const id = lower.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const label = trimmed.replace(/\b\w/g, (l) => l.toUpperCase());
  return { id, label };
}

export function CatalogPage({ data }: CatalogPageProps) {
  // 1. Tab State (e.g. "all-fish", "by-country", "grill-fishes", etc.)
  const [activeTabId, setActiveTabId] = useState(data.tabs[0]?.id || 'all');

  // 2. Sorting State (e.g. "newest", "price-low", "price-high", "popularity")
  const [activeSort, setActiveSort] = useState('newest');

  // 3. Mobile Filter State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // 4. Checkbox Filters State (sectionId -> list of optionIds)
  const [tempFilters, setTempFilters] = useState<Record<string, string[]>>({
    country: [],
    type: [],
    size: [],
    pack: [],
  });

  const [appliedFilters, setAppliedFilters] = useState<
    Record<string, string[]>
  >({
    country: [],
    type: [],
    size: [],
    pack: [],
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
    const empty = { country: [], type: [], size: [], pack: [] };
    setTempFilters(empty);
    setAppliedFilters(empty);
  };

  // 4. Filtering and Sorting Logic
  const processedProducts = useMemo(() => {
    let result = [...data.products];

    // A. Sub-category Tabs Filtering
    if (data.category === 'fish') {
      if (activeTabId === 'grill-fishes') {
        result = result.filter(
          (p) =>
            p.bestForTitles?.some((b) => b.toLowerCase().includes('grill')) ||
            ['salmon', 'sea-bass', 'tuna-steak', 'prawns'].includes(p.id)
        );
      } else if (activeTabId === 'curry-fishes') {
        result = result.filter(
          (p) =>
            p.bestForTitles?.some((b) => b.toLowerCase().includes('curry')) ||
            ['mackerel', 'tilapia', 'prawns', 'trout'].includes(p.id)
        );
      } else if (activeTabId === 'by-country') {
        result = result.filter((p) => {
          const norm = normalizeCountry(p.filterCountry || p.origin);
          return norm.id !== 'uk' && norm.id !== 'local-farms';
        });
      } else if (activeTabId === 'other-types') {
        result = result.filter(
          (p) =>
            !p.bestForTitles?.some((b) => b.toLowerCase().includes('grill')) &&
            !p.bestForTitles?.some((b) => b.toLowerCase().includes('curry')) &&
            !['salmon', 'sea-bass', 'tuna-steak', 'prawns', 'mackerel'].includes(p.id)
        );
      }
    } else if (data.category === 'meat') {
      if (activeTabId === 'beef') {
        result = result.filter((p) => (p.title || '').toLowerCase().includes('beef'));
      } else if (activeTabId === 'mutton') {
        result = result.filter(
          (p) =>
            (p.title || '').toLowerCase().includes('mutton') ||
            (p.title || '').toLowerCase().includes('lamb')
        );
      } else if (activeTabId === 'by-country') {
        result = result.filter((p) => {
          const norm = normalizeCountry(p.filterCountry || p.origin);
          return norm.id !== 'uk' && norm.id !== 'local-farms';
        });
      } else if (activeTabId === 'others') {
        result = result.filter(
          (p) =>
            !(p.title || '').toLowerCase().includes('beef') &&
            !(p.title || '').toLowerCase().includes('mutton') &&
            !(p.title || '').toLowerCase().includes('lamb')
        );
      }
    } else if (data.category === 'chicken') {
      if (activeTabId === 'curry-cut') {
        result = result.filter(
          (p) =>
            (p.format || '').toLowerCase().includes('curry') ||
            (p.title || '').toLowerCase().includes('curry')
        );
      } else if (activeTabId === 'boneless') {
        result = result.filter(
          (p) =>
            (p.format || '').toLowerCase().includes('boneless') ||
            (p.format || '').toLowerCase().includes('fillet')
        );
      } else if (activeTabId === 'whole-roast') {
        result = result.filter((p) => (p.format || '').toLowerCase().includes('whole'));
      } else if (activeTabId === 'others') {
        result = result.filter(
          (p) =>
            !(p.format || '').toLowerCase().includes('curry') &&
            !(p.format || '').toLowerCase().includes('boneless') &&
            !(p.format || '').toLowerCase().includes('fillet') &&
            !(p.format || '').toLowerCase().includes('whole')
        );
      }
    } else if (data.category === 'eggs') {
      if (activeTabId === 'free-range') {
        result = result.filter(
          (p) =>
            (p.badgeLabel || '').toLowerCase().includes('free') ||
            (p.title || '').toLowerCase().includes('free')
        );
      } else if (activeTabId === 'organic') {
        result = result.filter(
          (p) =>
            (p.origin || '').toLowerCase().includes('organic') ||
            (p.badgeLabel || '').toLowerCase().includes('organic')
        );
      } else if (activeTabId === 'specialty') {
        result = result.filter(
          (p) =>
            (p.title || '').toLowerCase().includes('quail') ||
            (p.title || '').toLowerCase().includes('duck')
        );
      }
    }

    // B. Checkbox Filters Filtering
    // 1. Country Filter (Dynamic)
    const selectedCountries = appliedFilters.country || [];
    if (selectedCountries.length > 0) {
      result = result.filter((p) => {
        const norm = normalizeCountry(p.filterCountry || p.origin);
        return selectedCountries.includes(norm.id);
      });
    }

    // 2. Type / Format Filter (Dynamic)
    const selectedTypes = appliedFilters.type || [];
    if (selectedTypes.length > 0) {
      result = result.filter((p) => {
        return selectedTypes.some((t) => {
          if (t === 'grill') {
            return (
              p.bestForTitles?.some((b) => b.toLowerCase().includes('grill')) ||
              ['salmon', 'sea-bass', 'tuna-steak', 'prawns'].includes(p.id)
            );
          }
          if (t === 'curry') {
            return (
              p.bestForTitles?.some((b) => b.toLowerCase().includes('curry')) ||
              ['mackerel', 'tilapia', 'prawns', 'trout'].includes(p.id)
            );
          }
          if (t === 'chicken-egg') {
            return (p.title || '').toLowerCase().includes('chicken');
          }
          if (t === 'duck-egg') {
            return (p.title || '').toLowerCase().includes('duck');
          }
          if (t === 'quail-egg') {
            return (p.title || '').toLowerCase().includes('quail');
          }

          const norm = normalizeFormat(p.format);
          if (norm.id === t) return true;
          return (p.format || '').toLowerCase().includes(t.replace(/-/g, ' '));
        });
      });
    }

    // 3. Size Filter
    const selectedSizes = appliedFilters.size || [];
    if (selectedSizes.length > 0) {
      result = result.filter((p) => {
        return selectedSizes.some((s) => {
          if (s === 'small') return p.price < 8.0;
          if (s === 'medium') return p.price >= 8.0 && p.price < 15.0;
          if (s === 'large') return p.price >= 15.0;
          return false;
        });
      });
    }

    // 4. Pack Filter (for Eggs)
    const selectedPacks = appliedFilters.pack || [];
    if (selectedPacks.length > 0) {
      result = result.filter((p) => {
        return selectedPacks.some((packId) => {
          const norm = normalizeFormat(p.format);
          if (norm.id === packId) return true;
          const numMatch = packId.replace('pack-', '');
          return (p.format || '').toLowerCase().includes(numMatch);
        });
      });
    }

    // C. Sorting
    if (activeSort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (activeSort === 'popularity') {
      result.sort((a, b) => (b.title || '').length - (a.title || '').length);
    }

    return result;
  }, [data, activeTabId, appliedFilters, activeSort]);

  // Dynamic Tabs with Real Counts
  const dynamicTabs = useMemo(() => {
    return data.tabs.map((tab) => {
      let count = data.products.length;
      if (data.category === 'fish') {
        if (tab.id === 'grill-fishes') {
          count = data.products.filter(
            (p) =>
              p.bestForTitles?.some((b) => b.toLowerCase().includes('grill')) ||
              ['salmon', 'sea-bass', 'tuna-steak', 'prawns'].includes(p.id)
          ).length;
        } else if (tab.id === 'curry-fishes') {
          count = data.products.filter(
            (p) =>
              p.bestForTitles?.some((b) => b.toLowerCase().includes('curry')) ||
              ['mackerel', 'tilapia', 'prawns', 'trout'].includes(p.id)
          ).length;
        } else if (tab.id === 'by-country') {
          count = data.products.filter((p) => {
            const norm = normalizeCountry(p.filterCountry || p.origin);
            return norm.id !== 'uk' && norm.id !== 'local-farms';
          }).length;
        } else if (tab.id === 'other-types') {
          count = data.products.filter(
            (p) =>
              !p.bestForTitles?.some((b) => b.toLowerCase().includes('grill')) &&
              !p.bestForTitles?.some((b) => b.toLowerCase().includes('curry')) &&
              !['salmon', 'sea-bass', 'tuna-steak', 'prawns', 'mackerel'].includes(p.id)
          ).length;
        }
      } else if (data.category === 'meat') {
        if (tab.id === 'beef') {
          count = data.products.filter((p) => (p.title || '').toLowerCase().includes('beef')).length;
        } else if (tab.id === 'mutton') {
          count = data.products.filter(
            (p) =>
              (p.title || '').toLowerCase().includes('mutton') ||
              (p.title || '').toLowerCase().includes('lamb')
          ).length;
        } else if (tab.id === 'by-country') {
          count = data.products.filter((p) => {
            const norm = normalizeCountry(p.filterCountry || p.origin);
            return norm.id !== 'uk' && norm.id !== 'local-farms';
          }).length;
        } else if (tab.id === 'others') {
          count = data.products.filter(
            (p) =>
              !(p.title || '').toLowerCase().includes('beef') &&
              !(p.title || '').toLowerCase().includes('mutton') &&
              !(p.title || '').toLowerCase().includes('lamb')
          ).length;
        }
      } else if (data.category === 'chicken') {
        if (tab.id === 'curry-cut') {
          count = data.products.filter(
            (p) =>
              (p.format || '').toLowerCase().includes('curry') ||
              (p.title || '').toLowerCase().includes('curry')
          ).length;
        } else if (tab.id === 'boneless') {
          count = data.products.filter(
            (p) =>
              (p.format || '').toLowerCase().includes('boneless') ||
              (p.format || '').toLowerCase().includes('fillet')
          ).length;
        } else if (tab.id === 'whole-roast') {
          count = data.products.filter((p) => (p.format || '').toLowerCase().includes('whole')).length;
        } else if (tab.id === 'others') {
          count = data.products.filter(
            (p) =>
              !(p.format || '').toLowerCase().includes('curry') &&
              !(p.format || '').toLowerCase().includes('boneless') &&
              !(p.format || '').toLowerCase().includes('fillet') &&
              !(p.format || '').toLowerCase().includes('whole')
          ).length;
        }
      } else if (data.category === 'eggs') {
        if (tab.id === 'free-range') {
          count = data.products.filter(
            (p) =>
              (p.badgeLabel || '').toLowerCase().includes('free') ||
              (p.title || '').toLowerCase().includes('free')
          ).length;
        } else if (tab.id === 'organic') {
          count = data.products.filter(
            (p) =>
              (p.origin || '').toLowerCase().includes('organic') ||
              (p.badgeLabel || '').toLowerCase().includes('organic')
          ).length;
        } else if (tab.id === 'specialty') {
          count = data.products.filter(
            (p) =>
              (p.title || '').toLowerCase().includes('quail') ||
              (p.title || '').toLowerCase().includes('duck')
          ).length;
        }
      }
      return { ...tab, countLabel: `${count} Items` };
    });
  }, [data]);

  // Dynamic Filter Sections with Automatic Extraction from CMS Products (Method 1)
  const dynamicFilterSections = useMemo(() => {
    return data.filterSections.map((section) => {
      // 1. COUNTRY / ORIGIN SECTION
      // Automatically extracts any new country or farm added in CMS!
      if (section.id === 'country') {
        const countryMap = new Map<
          string,
          { id: string; label: string; count: number; flag?: string }
        >();

        data.products.forEach((p) => {
          const norm = normalizeCountry(p.filterCountry || p.origin);
          if (!norm.id) return;
          const existing = countryMap.get(norm.id);
          if (existing) {
            existing.count += 1;
          } else {
            countryMap.set(norm.id, {
              id: norm.id,
              label: norm.label,
              count: 1,
              flag: norm.flag,
            });
          }
        });

        // Sorted by count descending
        const options = Array.from(countryMap.values()).sort(
          (a, b) => b.count - a.count
        );
        return {
          ...section,
          options,
        };
      }

      // 2. TYPE / FORMAT SECTION
      // Automatically extracts any new cut style or preparation added in CMS!
      if (section.id === 'type') {
        const typeMap = new Map<
          string,
          { id: string; label: string; count: number }
        >();

        // For fish category: support preparation methods (Grill / Curry)
        if (data.category === 'fish') {
          const grillCount = data.products.filter(
            (p) =>
              p.bestForTitles?.some((b) => b.toLowerCase().includes('grill')) ||
              ['salmon', 'sea-bass', 'tuna-steak', 'prawns'].includes(p.id)
          ).length;
          if (grillCount > 0) {
            typeMap.set('grill', {
              id: 'grill',
              label: 'Grill Fishes',
              count: grillCount,
            });
          }

          const curryCount = data.products.filter(
            (p) =>
              p.bestForTitles?.some((b) => b.toLowerCase().includes('curry')) ||
              ['mackerel', 'tilapia', 'prawns', 'trout'].includes(p.id)
          ).length;
          if (curryCount > 0) {
            typeMap.set('curry', {
              id: 'curry',
              label: 'Curry Fishes',
              count: curryCount,
            });
          }
        }

        // For eggs category: egg varieties
        if (data.category === 'eggs') {
          const eggTypes = [
            {
              id: 'chicken-egg',
              label: 'Chicken Eggs',
              test: (p: any) =>
                (p.title || '').toLowerCase().includes('chicken'),
            },
            {
              id: 'duck-egg',
              label: 'Duck Eggs',
              test: (p: any) => (p.title || '').toLowerCase().includes('duck'),
            },
            {
              id: 'quail-egg',
              label: 'Quail Eggs',
              test: (p: any) => (p.title || '').toLowerCase().includes('quail'),
            },
          ];
          eggTypes.forEach((et) => {
            const count = data.products.filter(et.test).length;
            if (count > 0) {
              typeMap.set(et.id, { id: et.id, label: et.label, count });
            }
          });
        }

        // Automatically extract all product formats from CMS
        data.products.forEach((p) => {
          if (
            data.category === 'eggs' &&
            ((p.format || '').toLowerCase().includes('pack') ||
              (p.format || '').toLowerCase().includes('tray'))
          ) {
            return; // In eggs, pack formats belong to the 'pack' section
          }
          const norm = normalizeFormat(p.format);
          if (!norm.id) return;
          const existing = typeMap.get(norm.id);
          if (existing) {
            existing.count += 1;
          } else {
            typeMap.set(norm.id, {
              id: norm.id,
              label: norm.label,
              count: 1,
            });
          }
        });

        const options = Array.from(typeMap.values()).sort(
          (a, b) => b.count - a.count
        );
        return {
          ...section,
          options,
        };
      }

      // 3. SIZE SECTION
      if (section.id === 'size') {
        const smallCount = data.products.filter((p) => p.price < 8.0).length;
        const mediumCount = data.products.filter(
          (p) => p.price >= 8.0 && p.price < 15.0
        ).length;
        const largeCount = data.products.filter((p) => p.price >= 15.0).length;

        const options = [
          {
            id: 'small',
            label:
              data.category === 'chicken'
                ? 'Small (under 1kg)'
                : 'Small (0 - 500g)',
            count: smallCount,
          },
          {
            id: 'medium',
            label:
              data.category === 'chicken'
                ? 'Medium (1kg - 1.5kg)'
                : 'Medium (500g - 1kg)',
            count: mediumCount,
          },
          {
            id: 'large',
            label:
              data.category === 'chicken' ? 'Large (1.5kg+)' : 'Large (1kg+)',
            count: largeCount,
          },
        ];

        return {
          ...section,
          options,
        };
      }

      // 4. PACK SECTION (Eggs)
      if (section.id === 'pack') {
        const packMap = new Map<
          string,
          { id: string; label: string; count: number }
        >();
        data.products.forEach((p) => {
          const norm = normalizeFormat(p.format);
          if (norm.id.startsWith('pack-')) {
            const existing = packMap.get(norm.id);
            if (existing) {
              existing.count += 1;
            } else {
              packMap.set(norm.id, {
                id: norm.id,
                label: norm.label,
                count: 1,
              });
            }
          }
        });

        if (packMap.size === 0) {
          packMap.set('pack-6', { id: 'pack-6', label: '6 Eggs Pack', count: 0 });
          packMap.set('pack-12', { id: 'pack-12', label: '12 Eggs Pack', count: 0 });
          packMap.set('pack-30', { id: 'pack-30', label: '30 Eggs Tray', count: 0 });
        }

        const options = Array.from(packMap.values());
        return {
          ...section,
          options,
        };
      }

      // Fallback
      return section;
    });
  }, [data]);

  // Tab change handler
  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    handleResetFilters();
  };

  return (
    <>
      {/* ── LANDSCAPE VIEW ── */}
      <div className="portrait:hidden grid h-full min-h-[950px] w-full grid-rows-[minmax(0,14fr)_minmax(0,7fr)_minmax(0,68fr)_minmax(0,11fr)_auto] gap-[var(--main-gap)] select-none">
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
          <div className="col-span-4 flex h-full flex-col overflow-hidden rounded-[8px] border border-slate-100 bg-white p-2 shadow-sm">
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
        <div className="w-full shrink-0">
          <HomeFooter />
        </div>
      </div>

      {/* ── PORTRAIT VIEW (Mobile / Tablet Vertical) ── */}
      <div className="hidden portrait:flex portrait:flex-col portrait:w-full portrait:bg-white">
        {/* Mobile Hero */}
        <div className="relative mx-2 mt-2 h-[140px] shrink-0 overflow-hidden rounded-[12px]">
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

        {/* Mobile Tabs Removed */}

        {/* Mobile Product Grid */}
        <div className="w-full shrink-0">
          <MobileProductGrid
            products={processedProducts}
            category={data.category}
            totalItems={data.products.length}
            onOpenFilter={() => setIsMobileFilterOpen(true)}
          />
        </div>

        {/* Mobile About / Stories */}
        <div className="flex shrink-0 gap-3 px-2 pb-1 w-full">
          {/* About Us */}
          <div className="relative flex aspect-[4/3] flex-1 flex-col overflow-hidden rounded-[12px] border border-gray-50 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="relative z-10 flex flex-col">
              <h4 className="mb-1 text-[18px] font-bold text-[#0D55CF]">
                About Us
              </h4>
              <p className="text-[13px] leading-[1.3] font-medium text-slate-500">
                Delivering fresh & healthy food to your family.
              </p>
            </div>
          </div>

          {/* Our Stories */}
          <div className="relative flex aspect-[4/3] flex-1 flex-col overflow-hidden rounded-[12px] border border-gray-50 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="relative z-10 flex flex-col">
              <h4 className="mb-1 text-[18px] font-bold text-[#0D55CF]">
                Our Stories
              </h4>
              <p className="max-w-[90%] text-[13px] leading-[1.3] font-medium text-slate-500">
                From ocean to your kitchen, journey of freshness.
              </p>
            </div>
            <div className="absolute right-1 bottom-1 h-12 w-16 opacity-90 mix-blend-multiply">
              <Image
                src="/assets/boat_exact.png"
                alt="Our Stories"
                fill
                className="object-contain object-right-bottom"
              />
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="relative mx-2 flex shrink-0 flex-col justify-center gap-2 overflow-hidden rounded-[12px] border border-gray-50 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-2">
          <div className="relative z-10 flex w-full flex-col items-center gap-2 text-center">
            <h4 className="mb-1 text-[18px] font-bold text-[#0D55CF]">
              Contact Us
            </h4>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-[#0D55CF]" />
              <span className="text-[14px] leading-tight font-medium text-slate-600">
                Unit 5 Hythe Quay, England, CO2 8JB
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <PhoneCall className="h-4 w-4 shrink-0 text-[#0D55CF]" />
              <span className="text-[14px] font-bold text-[#0B1F5B]">
                +44 1206 123456
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-[#0D55CF]" />
              <span className="text-[14px] font-bold text-[#0D55CF]">
                hello@fishcart.co.uk
              </span>
            </div>
          </div>

          <div className="absolute top-1/2 right-2 h-14 w-16 -translate-y-1/2 opacity-20 mix-blend-multiply">
            <Image
              src="/assets/fishdd.png"
              alt="Address"
              fill
              className="object-contain object-right"
            />
          </div>
        </div>

        {/* Mobile Filter Modal */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex flex-col bg-white">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 p-4">
              <h2 className="text-[18px] font-bold text-slate-800">Filters</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <X className="h-5 w-5 stroke-[2.5]" />
              </button>
            </div>
            {/* Body */}
            <div className="flex-1 overflow-y-auto px-4 py-2 pb-24">
              <FilterSidebar
                filterSections={dynamicFilterSections}
                selectedOptions={tempFilters}
                onFilterToggle={handleFilterToggle}
                activeSort={activeSort}
                onSortChange={setActiveSort}
                onApply={() => {
                  handleApplyFilters();
                  setIsMobileFilterOpen(false);
                }}
                category={data.category}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
