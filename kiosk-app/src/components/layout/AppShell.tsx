'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { MobileBottomNav } from './MobileBottomNav';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    /*
     * This div IS the viewport. It owns h-dvh and overflow-hidden directly —
     * no dependency on html/body height, no competing utility class cascade.
     * flex-row → Sidebar (fixed width) + content column (flex-1)
     */
    <div className="text-text-body flex h-full w-full overflow-hidden bg-[#F4F7FB] font-sans portrait:flex-col">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Content column */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden portrait:w-full">
        {/*
         * main fills the full height of the content column.
         * Padding creates the inner whitespace that matches the reference design.
         * overflow-hidden ensures no child can punch through the viewport boundary.
         */}
        <main className="h-full overflow-y-auto overflow-x-hidden py-[var(--main-padding-y)] px-[var(--main-padding-x)] portrait:px-0
         portrait:pt-0 portrait:pb-[calc(110px+env(safe-area-inset-bottom,24px))]">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation — hidden when hamburger menu is open */}
      {!isMobileMenuOpen && <MobileBottomNav />}
    </div>
  );
}
