import { ReactNode } from "react";

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`mx-auto w-full max-w-7xl px-6 py-20 md:py-28 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-cyan">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan" /> {children}
    </div>
  );
}
