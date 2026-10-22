import Link from "next/link";
import { CopyrightYear } from "@/components/copyright-year";
import { BrandLogo } from "@/components/brand-logo";
import { catalog, categoryList } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <BrandLogo size={30} className="h-7 w-auto" />
            <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-muted">
              Katalog pembayaran instan: token listrik, pulsa, paket data, tagihan bulanan, dan
              e-wallet. Satu halaman, semua kebutuhan harian.
            </p>
            <p className="mt-4 text-[12.5px] text-faint">
              Harga pada situs ini masih contoh dan dapat berubah sewaktu-waktu.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-ink">Produk</h3>
            <ul className="mt-4 space-y-2.5">
              {catalog.slice(0, 6).map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/produk/${item.slug}`}
                    className="text-sm text-muted transition-colors hover:text-brand"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-ink">Kategori</h3>
            <ul className="mt-4 space-y-2.5">
              {categoryList.slice(1).map((item) => (
                <li key={item.id}>
                  <Link
                    href="/#katalog"
                    className="text-sm text-muted transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-ink">Bantuan</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>
                <Link href="/cek-transaksi" className="transition-colors hover:text-brand">
                  Cek Transaksi
                </Link>
              </li>
              <li>
                <Link href="/#cara-beli" className="transition-colors hover:text-brand">
                  Cara Beli
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="transition-colors hover:text-brand">
                  FAQ
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/6281200000000"
                  className="font-semibold text-brand transition-colors hover:text-brand-dark"
                >
                  0812-0000-0000
                  <span className="mt-0.5 block text-xs font-normal text-faint">
                    WhatsApp, 08.00–22.00
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> fulgora seluler. Transaksi pada situs ini masih simulasi.
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>Privasi</span>
            <span>Syarat &amp; Ketentuan</span>
            <span>Kebijakan Privasi</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
