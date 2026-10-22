import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  CreditCard,
  MessageCircle,
  Search,
  ShieldCheck,
  Star,
  Store,
  Zap,
} from "lucide-react";
import { CatalogBrowser } from "@/components/catalog-browser";
import { Faq } from "@/components/faq";
import { ServiceIcon } from "@/components/service-icon";
import { catalog, paymentChannels, testimonials } from "@/lib/catalog";
import { rupiah } from "@/lib/format";

const quickSearches = ["Token Listrik", "Pulsa", "Paket Data", "BPJS", "PDAM"];

export default function Home() {
  const popular = catalog.filter((item) => item.popular);

  return (
    <>
      {/* Hero — search first, ala kios */}
      <section className="relative overflow-hidden border-b border-line bg-white">
        <div className="dotted-paper pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-[1180px] px-4 pb-12 pt-12 sm:px-6 lg:pb-16 lg:pt-16">
          <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-soft px-3 py-1.5 text-[12px] font-bold text-brand">
                <BadgeCheck size={14} aria-hidden="true" />
                Transaksi diproses 3 detik
              </span>

              <h1 className="mt-5 text-[clamp(2.1rem,1.35rem+3.6vw,3.4rem)] font-bold leading-[1.06] text-ink">
                Beli tagihan tanpa antre, tanpa registrasi.
              </h1>
              <p className="mt-4 max-w-[54ch] text-[15.5px] leading-relaxed text-muted">
                Token listrik, pulsa, paket data, BPJS, PDAM, sampai e-wallet. Pilih produk, isi
                nomor, bayar lewat QRIS atau virtual account — bukti transaksi tersimpan di
                invoice dan bisa dilacak kapan saja.
              </p>

              <form
                action="/#katalog"
                method="get"
                className="mt-7 flex flex-col gap-2.5 sm:flex-row"
              >
                <div className="relative flex-1">
                  <Search
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint"
                    aria-hidden="true"
                  />
                  <input
                    name="q"
                    type="search"
                    placeholder="Cari produk, mis. token listrik PLN"
                    aria-label="Cari produk"
                    className="min-h-14 w-full rounded-2xl border border-line bg-white py-3.5 pl-12 pr-4 text-[15px] text-ink shadow-[0_2px_10px_-6px_rgba(11,18,32,0.35)] placeholder:text-faint transition-colors focus:border-brand focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-brand px-6 text-[15px] font-bold text-white transition hover:bg-brand-dark"
                >
                  Cari produk
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </form>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-[12.5px] font-medium text-faint">Populer:</span>
                {quickSearches.map((item) => (
                  <Link
                    key={item}
                    href={`/?q=${encodeURIComponent(item)}#katalog`}
                    className="rounded-full border border-line bg-white px-3 py-1.5 text-[12.5px] font-medium text-muted transition hover:border-brand/50 hover:text-brand"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              <dl className="mt-9 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6">
                {[
                  { icon: Clock3, value: "3 detik", label: "Rata-rata proses" },
                  { icon: Store, value: "8 kategori", label: "Layanan tersedia" },
                  { icon: ShieldCheck, value: "4,9/5", label: "Rating 12.400+ pengguna" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-start gap-2.5">
                    <stat.icon size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                    <div>
                      <dt className="text-[15px] font-bold text-ink">{stat.value}</dt>
                      <dd className="text-[12px] leading-tight text-faint">{stat.label}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_24px_60px_-40px_rgba(11,18,32,0.45)]">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[15px] font-bold text-ink">Produk paling dibeli</h2>
                <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-bold text-muted">
                  24 jam
                </span>
              </div>

              <ul className="mt-4 divide-y divide-line">
                {popular.map((item) => (
                  <li key={item.slug} className="flex items-center gap-3 py-3">
                    <ServiceIcon name={item.icon} accent={item.accent} size={19} className="h-9 w-9" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13.5px] font-semibold text-ink">{item.name}</p>
                      <p className="text-[12px] text-faint">Mulai {rupiah(item.products[0].price)}</p>
                    </div>
                    <Link
                      href={`/produk/${item.slug}`}
                      className="shrink-0 rounded-lg border border-line px-3 py-1.5 text-[12.5px] font-bold text-ink transition hover:border-brand hover:text-brand"
                    >
                      Beli
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-4 rounded-xl bg-brand-soft p-4">
                <p className="flex items-center gap-2 text-[13px] font-bold text-brand">
                  <Zap size={15} aria-hidden="true" />
                  Cashback 5% tiap transaksi
                </p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-2">
                  Berlaku untuk token, pulsa, paket data, dan iuran BPJS. Saldo e-wallet masuk maksimal
                  1×24 jam.
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[12.5px] text-muted">
                <CreditCard size={15} className="shrink-0 text-faint" aria-hidden="true" />
                {paymentChannels.length} metode pembayaran, dicek otomatis
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kategori cepat */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-8 sm:px-6">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {catalog.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/produk/${item.slug}`}
                  className="card-lift flex flex-col items-center gap-2 rounded-2xl border border-line bg-white px-2 py-4 text-center hover:-translate-y-0.5 hover:border-brand/40"
                >
                  <ServiceIcon name={item.icon} accent={item.accent} size={20} className="h-10 w-10" />
                  <span className="text-[12px] font-semibold leading-tight text-ink">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Katalog */}
      <section id="katalog" className="scroll-mt-28">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:py-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[clamp(1.55rem,1.15rem+1.9vw,2.3rem)] font-bold leading-tight text-ink">
                Katalog produk
              </h2>
              <p className="mt-2 max-w-[60ch] text-[14.5px] leading-relaxed text-muted">
                Harga contoh, siap diganti. Pilih produk untuk masuk ke halaman pemesanan.
              </p>
            </div>
            <p className="text-[13px] text-faint">
              {catalog.length} produk · {paymentChannels.length} metode pembayaran
            </p>
          </div>

          <div className="mt-7">
            <CatalogBrowser />
          </div>
        </div>
      </section>

      {/* Cara beli */}
      <section id="cara-beli" className="scroll-mt-28 border-y border-line bg-white">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:py-16">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(1.55rem,1.15rem+1.9vw,2.3rem)] font-bold leading-tight text-ink">
              Lima langkah, tanpa akun
            </h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
              Formulirnya pendek dan produknya jelas. Tidak ada registrasi, tidak ada deposit awal.
            </p>
          </div>

          <ol className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { title: "Pilih produk", body: "Cari token, pulsa, atau tagihan yang Anda butuhkan." },
              { title: "Isi nomor", body: "Masukkan ID pelanggan atau nomor HP tujuan." },
              { title: "Pilih nominal", body: "Harga terlihat jelas sebelum Anda membayar." },
              { title: "Bayar", body: "QRIS, e-wallet, gerai ritel, atau virtual account." },
              { title: "Selesai", body: "Layanan masuk, bukti transaksi tersimpan di invoice." },
            ].map((step, index) => (
              <li key={step.title} className="relative rounded-2xl border border-line bg-paper p-5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-[13px] font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-3 text-[14.5px] font-bold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Metode pembayaran */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <h2 className="text-[clamp(1.55rem,1.15rem+1.9vw,2.3rem)] font-bold leading-tight text-ink">
                Bayar dengan cara yang paling dekat
              </h2>
              <p className="mt-3 max-w-[52ch] text-[14.5px] leading-relaxed text-muted">
                Semua metode diproses lewat kanal resmi. Biaya admin berbeda per metode dan
                ditampilkan sebelum Anda membayar, jadi tidak ada kejutan di akhir.
              </p>
              <Link
                href="/#katalog"
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-bold text-white transition hover:bg-brand-dark"
              >
                Lihat katalog
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {paymentChannels.map((channel) => {
                const aktif = channel.id === "qris";
                return (
                  <li
                    key={channel.id}
                    className={`rounded-xl border px-3.5 py-3 transition ${
                      aktif
                        ? "border-brand/40 bg-brand-soft"
                        : "border-line bg-white opacity-60"
                    }`}
                  >
                    <p className="text-[13px] font-bold text-ink">{channel.name}</p>
                    <p className="mt-0.5 text-[11.5px] text-faint">
                      {aktif ? "Aktif sekarang" : "Segera hadir"}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:py-16">
          <h2 className="text-[clamp(1.55rem,1.15rem+1.9vw,2.3rem)] font-bold leading-tight text-ink">
            Kata mereka yang sudah pakai
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <li key={item.name} className="rounded-2xl border border-line bg-paper p-5">
                <div className="flex items-center gap-1" aria-label="5 dari 5 bintang">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star
                      key={star}
                      size={14}
                      className="fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-2">{item.text}</p>
                <p className="mt-4 text-[12.5px] font-bold text-ink">{item.name}</p>
                <p className="text-[11.5px] text-faint">
                  {item.city} · {item.item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-28 border-t border-line bg-paper">
        <div className="mx-auto grid w-full max-w-[1180px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-16">
          <div>
            <h2 className="text-[clamp(1.55rem,1.15rem+1.9vw,2.3rem)] font-bold leading-tight text-ink">
              Pertanyaan umum
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
              Tidak menemukan jawabannya? WhatsApp kami siap bantu di jam kerja.
            </p>
            <a
              href="https://wa.me/6281200000000"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-4 text-sm font-bold text-ink transition hover:border-brand hover:text-brand"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Chat WhatsApp
            </a>
          </div>
          <Faq />
        </div>
      </section>
    </>
  );
}
