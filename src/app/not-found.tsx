import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-[680px] flex-col items-center justify-center px-4 text-center sm:px-6">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
        <Search size={24} aria-hidden="true" />
      </span>
      <p className="mt-5 font-display text-[clamp(2.5rem,1.8rem+6vw,4.5rem)] font-bold leading-none tracking-tight text-brand">
        404
      </p>
      <h1 className="mt-3 text-[clamp(1.35rem,1.1rem+1.4vw,1.9rem)] font-bold tracking-tight text-ink">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-3 max-w-[44ch] text-[14px] leading-relaxed text-muted">
        Produk atau halaman yang Anda cari tidak tersedia. Kembali ke katalog untuk memilih
        layanan lain.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-bold text-white transition hover:bg-brand-dark"
        >
          <Home size={16} aria-hidden="true" />
          Kembali ke beranda
        </Link>
        <Link
          href="/#katalog"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line bg-white px-5 text-sm font-bold text-ink transition hover:border-brand hover:text-brand"
        >
          Lihat katalog
        </Link>
      </div>
    </div>
  );
}
