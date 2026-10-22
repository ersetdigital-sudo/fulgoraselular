import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function LegalPage({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[900px] px-4 py-6 sm:px-6 lg:py-10">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-faint"
      >
        <Link href="/" className="transition-colors hover:text-brand">
          Beranda
        </Link>
        <ChevronRight size={13} aria-hidden="true" />
        <span className="font-semibold text-ink">{title}</span>
      </nav>

      <h1 className="mt-5 text-[clamp(1.6rem,1.25rem+1.8vw,2.3rem)] font-bold leading-tight text-ink">
        {title}
      </h1>
      <p className="mt-2 max-w-[62ch] text-[14.5px] leading-relaxed text-muted">{intro}</p>
      <p className="mt-3 text-[12.5px] text-faint">Terakhir diperbarui: {updated}</p>

      <div className="mt-8 space-y-8">{children}</div>
    </div>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-[1.05rem] font-bold text-ink sm:text-[1.18rem]">{title}</h2>
      <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-brand">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
