import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen overflow-hidden bg-[#F4F7FB] font-sans text-text-body relative">
      <div className="w-full h-full bg-[#F4F7FB] relative flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 h-full overflow-hidden">
          <main className="w-full h-full flex flex-col p-6 overflow-hidden">
            <div className="w-full h-full overflow-hidden">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
