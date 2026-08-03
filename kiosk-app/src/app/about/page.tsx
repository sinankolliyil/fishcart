import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="grid h-full w-full grid-rows-[minmax(0,84fr)_minmax(0,10fr)] gap-[var(--main-gap)] overflow-hidden">
      {/* Content area — empty, stretches to fill all available space above footer */}
      <div className="flex flex-col overflow-hidden">
        <h1 className="text-2xl font-extrabold text-slate-800">About Us</h1>
      </div>

      {/* Footer row — same 10fr fraction as homepage row 5 */}
      <div className="overflow-hidden">
        <Footer />
      </div>
    </div>
  );
}
