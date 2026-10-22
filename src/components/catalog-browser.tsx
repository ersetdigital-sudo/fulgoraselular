"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { ServiceIcon } from "@/components/service-icon";
import { catalog, categoryList } from "@/lib/catalog";
import type { CatalogCategory } from "@/lib/catalog";
import { rupiah } from "@/lib/format";

type SortKey = "populer" | "murah" | "mahal";

const SORTS: { id: SortKey; label: string }[] = [
  { id: "populer", label: "Paling populer" },
  { id: "murah", label: "Harga terendah" },
  { id: "mahal", label: "Harga tertinggi" },
];

export function CatalogBrowser() {
  const [category, setCategory] = useState<CatalogCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("populer");

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = catalog.filter((item) => {
      const matchCategory = category === "all" || item.category === category;
      const matchQuery =
        normalized.length === 0 ||
        item.name.toLowerCase().includes(normalized) ||
        item.tagline.toLowerCase().includes(normalized);
      return matchCategory && matchQuery;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "murah") return a.products[0].price - b.products[0].price;
      if (sort === "mahal") return b.products[0].price - a.products[0].price;
      return Number(Boolean(b.popular)) - Number(Boolean(a.popular));
    });
  }, [category, query, sort]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:px-0">
          {categoryList.map((item) => {
            const active = category === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                aria-pressed={active}
                className={`min-h-10 shrink-0 rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors ${
                  active
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-white text-muted hover:border-brand/50 hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row">
          <div className="relative sm:w-64">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari produk, mis. token listrik"
              aria-label="Cari produk"
              className="min-h-11 w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-3 text-[14px] text-ink placeholder:text-faint transition-colors focus:border-brand focus:outline-none"
            />
          </div>
          <div className="relative sm:w-48">
            <SlidersHorizontal
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint"
              aria-hidden="true"
            />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              aria-label="Urutkan produk"
              className="min-h-11 w-full appearance-none rounded-xl border border-line bg-white py-2.5 pl-9 pr-8 text-[13.5px] font-medium text-ink transition-colors focus:border-brand focus:outline-none"
            >
              {SORTS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line-strong bg-white px-6 py-14 text-center">
          <p className="text-[15px] font-bold text-ink">Produk tidak ditemukan</p>
          <p className="mx-auto mt-2 max-w-[44ch] text-sm text-muted">
            Coba kata kunci lain, atau pilih kategori yang berbeda.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl border border-line bg-surface-2 px-5 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand"
          >
            Atur ulang
          </button>
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/produk/${item.slug}`}
                className="card-lift group flex h-full flex-col rounded-2xl border border-line bg-white p-5 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_20px_40px_-28px_rgba(29,78,216,0.55)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <ServiceIcon name={item.icon} accent={item.accent} size={22} className="h-11 w-11" />
                  {item.popular ? (
                    <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-bold text-brand">
                      Populer
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-4 text-[16px] font-bold text-ink">{item.name}</h3>
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted">{item.tagline}</p>

                <dl className="mt-4 space-y-1.5 border-t border-line pt-3.5 text-[13px]">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-faint">Mulai dari</dt>
                    <dd className="font-bold text-ink">{rupiah(item.products[0].price)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-faint">Pilihan nominal</dt>
                    <dd className="text-muted">{item.products.length} pilihan</dd>
                  </div>
                </dl>

                <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-brand">
                  Beli sekarang
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
