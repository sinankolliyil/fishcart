import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FilterSection } from '@/types/catalog';

// Custom SVG Flags for visual excellence on Windows
function CountryFlag({ code }: { code: string }) {
  switch (code) {
    case 'UK':
      return (
        <svg
          viewBox="0 0 16 12"
          className="h-3 w-4 shrink-0 rounded-sm select-none"
        >
          <rect width="16" height="12" fill="#012169" />
          <path d="M0 0 L16 12 M0 12 L16 0" stroke="#fff" strokeWidth="2" />
          <path
            d="M0 0 L16 12 M0 12 L16 0"
            stroke="#C8102E"
            strokeWidth="1.2"
          />
          <path d="M8 0 V12 M0 6 H16" stroke="#fff" strokeWidth="3" />
          <path d="M8 0 V12 M0 6 H16" stroke="#C8102E" strokeWidth="1.8" />
        </svg>
      );
    case 'Norway':
      return (
        <svg
          viewBox="0 0 16 12"
          className="h-3 w-4 shrink-0 rounded-sm select-none"
        >
          <rect width="16" height="12" fill="#BA0C2F" />
          <path d="M5 0 V12 M0 5 H16" stroke="#fff" strokeWidth="2.5" />
          <path d="M5 0 V12 M0 5 H16" stroke="#00205B" strokeWidth="1.2" />
        </svg>
      );
    case 'Scotland':
      return (
        <svg
          viewBox="0 0 16 12"
          className="h-3 w-4 shrink-0 rounded-sm select-none"
        >
          <rect width="16" height="12" fill="#005EB8" />
          <path d="M0 0 L16 12 M0 12 L16 0" stroke="#fff" strokeWidth="1.8" />
        </svg>
      );
    case 'Iceland':
      return (
        <svg
          viewBox="0 0 16 12"
          className="h-3 w-4 shrink-0 rounded-sm select-none"
        >
          <rect width="16" height="12" fill="#003897" />
          <path d="M5 0 V12 M0 5 H16" stroke="#fff" strokeWidth="2.5" />
          <path d="M5 0 V12 M0 5 H16" stroke="#D7282F" strokeWidth="1.2" />
        </svg>
      );
    case 'Netherlands':
      return (
        <svg
          viewBox="0 0 16 12"
          className="h-3 w-4 shrink-0 rounded-sm select-none"
        >
          <rect width="16" height="4" fill="#AE1C28" />
          <rect y="4" width="16" height="4" fill="#FFF" />
          <rect y="8" width="16" height="4" fill="#21468B" />
        </svg>
      );
    default:
      return null;
  }
}

export interface FilterSidebarProps {
  filterSections: FilterSection[];
  selectedOptions: Record<string, string[]>;
  onFilterToggle: (sectionId: string, optionId: string) => void;
  activeSort: string;
  onSortChange: (sort: string) => void;
  onApply: () => void;
  category: 'fish' | 'meat' | 'chicken' | 'eggs';
}

export function FilterSidebar({
  filterSections,
  selectedOptions,
  onFilterToggle,
  activeSort,
  onSortChange,
  onApply,
  category,
}: FilterSidebarProps) {
  const btnBgColors = {
    fish: 'bg-[#0D55CF] hover:bg-[#0c4dbd] active:scale-[0.98]',
    meat: 'bg-[#F0314A] hover:bg-[#db233b] active:scale-[0.98]',
    chicken: 'bg-[#F59000] hover:bg-[#dd8000] active:scale-[0.98]',
    eggs: 'bg-[#10B981] hover:bg-[#0e9f6e] active:scale-[0.98]',
  };

  const checkboxBgColors = {
    fish: 'peer-checked:bg-[#0D55CF] peer-checked:border-[#0D55CF]',
    meat: 'peer-checked:bg-[#F0314A] peer-checked:border-[#F0314A]',
    chicken: 'peer-checked:bg-[#F59000] peer-checked:border-[#F59000]',
    eggs: 'peer-checked:bg-[#10B981] peer-checked:border-[#10B981]',
  };

  const applyBtnClass = btnBgColors[category] || btnBgColors.fish;
  const currentCheckboxBg = checkboxBgColors[category] || checkboxBgColors.fish;

  return (
    <div className="flex h-full min-h-0 w-full flex-col justify-between overflow-hidden rounded-[8px] bg-white p-[clamp(10px,1.2vw,16px)]  select-none">
      {/* Inline styles for custom minimal scrollbar inside the sidebar */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scrollbar-minimal::-webkit-scrollbar {
          width: 5px;
        }
        .scrollbar-minimal::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-minimal::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 9999px;
        }
        .scrollbar-minimal::-webkit-scrollbar-thumb:hover {
          background: #94A3B8;
        }
      `,
        }}
      />

      {/* Header Section: Title & Sort By Selection */}
      <div className="flex shrink-0 flex-col gap-2 border-b border-gray-100 pb-2">
        <h3 className="text-text-heading text-[clamp(15px,min(1.4vw,2svh),20px)] font-bold">
          Filters
        </h3>
        <div className="mt-1 flex items-center justify-between gap-2">
          <label className="text-[clamp(12px,min(1.1vw,1.55svh),16px)] font-bold text-[#475569]">
            Sort By
          </label>
          <div className="relative max-w-[72%] flex-1">
            <select
              value={activeSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="border-gray-250 w-full cursor-pointer appearance-none rounded-lg border bg-white py-1 pr-8 pl-3 text-[clamp(12px,min(1.1vw,1.55svh),16px)] font-bold text-[#1E293B]  transition-colors outline-none focus:border-[#0D55CF]"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popularity">Popularity</option>
            </select>
            <ChevronDown className="text-text-muted pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* Options List Container - Vertically scrollable with custom minimal scrollbar */}
      <div className="scrollbar-minimal min-h-0 flex-1 overflow-x-hidden overflow-y-auto pr-1">
        {' '}
        {filterSections.map((section) => {
          const visibleOptions = section.options;

          return (
            <div
              key={section.id}
              className="flex min-h-0 flex-col gap-2 border-t border-gray-50 pt-2 first:border-t-0 first:pt-0"
            >
              <h4 className="text-text-heading text-[clamp(13px,min(1.2vw,1.75svh),18px)] font-bold">
                {section.title}
              </h4>

              <div className="flex min-h-0 flex-col gap-2">
                {visibleOptions.map((option) => {
                  const isChecked = (
                    selectedOptions[section.id] || []
                  ).includes(option.id);

                  return (
                    <label
                      key={option.id}
                      className="group flex cursor-pointer items-center justify-between text-[clamp(12px,min(1.1vw,1.55svh),16px)]"
                    >
                      <span className="flex items-center gap-2">
                        <span className="relative flex shrink-0 items-center">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() =>
                              onFilterToggle(section.id, option.id)
                            }
                            className="peer sr-only"
                          />
                          <span
                            className={cn(
                              'flex h-[clamp(13px,1.1vw,16px)] w-[clamp(13px,1.1vw,16px)] shrink-0 items-center justify-center rounded border border-gray-300 bg-white transition-colors duration-150',
                              currentCheckboxBg
                            )}
                          >
                            <svg
                              className={cn(
                                "h-[clamp(8px,0.7vw,11px)] w-[clamp(8px,0.7vw,11px)] stroke-[4.5] text-white transition-transform",
                                isChecked ? "scale-100" : "scale-0"
                              )}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        </span>

                        

                        <span
                          className={cn(
                            'group-hover:text-text-heading inline-block max-w-[140px] truncate leading-tight font-bold text-[#475569] transition-colors pb-[2px]',
                            isChecked && 'font-bold text-[#1E293B]'
                          )}
                        >
                          {option.label}
                        </span>
                      </span>

                      {option.count !== undefined && (
                        <span className="text-text-muted shrink-0 text-[clamp(11px,min(0.95vw,1.4svh),14px)] font-bold">
                          {option.count}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Section: Apply Filters Button */}
      <button
        onClick={onApply}
        className={cn(
          'flex w-full shrink-0 cursor-pointer items-center justify-center rounded-[8px] py-2 text-[clamp(12px,min(1.1vw,1.55svh),16px)] font-bold text-white  transition-all duration-150',
          applyBtnClass
        )}
      >
        Apply Filters
      </button>
    </div>
  );
}
