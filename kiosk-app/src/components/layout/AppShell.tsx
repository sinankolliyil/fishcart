import { Sidebar } from './Sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    /*
     * This div IS the viewport. It owns h-dvh and overflow-hidden directly —
     * no dependency on html/body height, no competing utility class cascade.
     * flex-row → Sidebar (fixed width) + content column (flex-1)
     */
    <div className="text-text-body flex h-dvh w-screen overflow-hidden bg-[#F4F7FB] font-sans">
      <Sidebar />

      {/* Content column */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/*
         * main fills the full height of the content column.
         * Padding creates the inner whitespace that matches the reference design.
         * overflow-hidden ensures no child can punch through the viewport boundary.
         */}
        <main className="h-full overflow-hidden py-[var(--main-padding-y)] px-[var(--main-padding-x)]">{children}</main>
      </div>
    </div>
  );
}
