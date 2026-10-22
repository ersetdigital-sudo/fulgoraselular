"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

const NAV = [
  { label: "Beranda", href: "/" },
  { label: "Semua Produk", href: "/#katalog" },
  { label: "Cek Transaksi", href: "/cek-transaksi" },
  { label: "Bantuan", href: "/#faq" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="bg-brand text-white pt-safe">
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-center gap-2 px-4 py-2 text-center text-[12.5px] sm:px-6">
          <span className="font-semibold">Diskon 5% untuk transaksi pertama</span>
          <span className="hidden sm:inline">Gunakan kode promo FULGORA5 saat checkout.</span>
          <span className="sm:hidden">Gunakan kode FULGORA5 saat checkout.</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur transition-shadow ${
          scrolled ? "border-line shadow-[0_6px_24px_-18px_rgba(11,18,32,0.5)]" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" aria-label="fulgora seluler, beranda">
            <BrandLogo size={30} className="h-7 w-auto sm:h-8" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-[14px] font-medium transition-colors ${
                  pathname === item.href ? "text-brand" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/#katalog"
              className="inline-flex min-h-10 items-center justify-center rounded-xl bg-brand px-4 text-sm font-semibold text-white transition hover:bg-brand-dark sm:min-h-11 sm:px-5"
            >
              Mulai Beli
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="v2-menu"
              aria-label={open ? "Tutup menu" : "Buka menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-ink transition hover:border-brand md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open ? (
          <div id="v2-menu" className="border-t border-line bg-white pb-2 md:hidden">
            <nav className="mx-auto max-w-[1180px] px-4 sm:px-6" aria-label="Navigasi mobile">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex min-h-14 items-center justify-between border-b border-line text-[15px] font-semibold text-ink-2 last:border-b-0"
                >
                  {item.label}
                  <ChevronRight size={16} className="text-faint" aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </header>
    </>
  );
}
