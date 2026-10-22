import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Zap } from "lucide-react";
import { CheckoutForm } from "@/components/checkout-form";
import { ServiceIcon } from "@/components/service-icon";
import { catalog, getItem, paymentChannels } from "@/lib/catalog";
import { rupiah } from "@/lib/format";

export function generateStaticParams() {
  return catalog.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata(
  props: PageProps<"/produk/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const item = getItem(slug);
  if (!item) return {};
  return { title: item.name, description: item.description };
}

export default async function ProductPage(props: PageProps<"/produk/[slug]">) {
  const { slug } = await props.params;
  const item = getItem(slug);
  if (!item) notFound();

  const others = catalog.filter((row) => row.slug !== item.slug);
  const cheapest = item.products.reduce(
    (lowest, row) => (row.price < lowest.price ? row : lowest),
    item.products[0],
  );
  const lowestFee = Math.min(...paymentChannels.map((row) => row.fee));

  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 pb-28 pt-5 sm:px-6 lg:pb-16 lg:pt-8">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-faint">
        <Link href="/" className="transition-colors hover:text-brand">
          Beranda
        </Link>
        <ChevronRight size={13} aria-hidden="true" />
        <Link href="/#katalog" className="transition-colors hover:text-brand">
          Produk
        </Link>
        <ChevronRight size={13} aria-hidden="true" />
        <span className="font-semibold text-ink">{item.name}</span>
      </nav>

      <section className="mt-4 grid gap-8 border-b border-line pb-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14 lg:pb-9">
        <div>
          <div className="flex items-start gap-4">
            <ServiceIcon
              name={item.icon}
              accent={item.accent}
              size={26}
              className="h-13 w-13 shrink-0 rounded-2xl sm:h-14 sm:w-14"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[clamp(1.45rem,1.15rem+1.4vw,2rem)] font-bold leading-tight tracking-tight text-ink">
                  {item.name}
                </h1>
                {item.popular ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-bold text-brand">
                    <Zap size={12} aria-hidden="true" />
                    Populer
                  </span>
                ) : null}
              </div>
              <p className="mt-2.5 max-w-[60ch] text-[14.5px] leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:border-l lg:border-line lg:pl-14">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <dt className="text-[12px] text-faint">Mulai dari</dt>
              <dd className="mt-0.5 font-display text-[20px] font-bold leading-tight tracking-tight text-ink">
                {rupiah(cheapest.price)}
              </dd>
            </div>
            <div>
              <dt className="text-[12px] text-faint">Biaya admin</dt>
              <dd className="mt-0.5 text-[15px] font-semibold text-ink">dari {rupiah(lowestFee)}</dd>
            </div>
            <div>
              <dt className="text-[12px] text-faint">Metode bayar</dt>
              <dd className="mt-0.5 text-[15px] font-semibold text-ink">{paymentChannels.length} pilihan</dd>
            </div>
            <div>
              <dt className="text-[12px] text-faint">Proses</dt>
              <dd className="mt-0.5 text-[15px] font-semibold text-ink">± 3 detik</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="mt-7">
        <CheckoutForm item={item} />
      </div>

      <section className="mt-14 border-t border-line pt-8">
        <h2 className="text-[15px] font-bold text-ink">Produk lain</h2>
        <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
          {others.map((row) => (
            <li key={row.slug}>
              <Link
                href={`/produk/${row.slug}`}
                className="flex items-center gap-2.5 rounded-xl border border-line bg-white px-3 py-2.5 text-[13px] font-semibold text-ink transition hover:-translate-y-0.5 hover:border-brand hover:text-brand"
              >
                <ServiceIcon name={row.icon} accent={row.accent} size={15} className="h-7 w-7 shrink-0" />
                <span className="truncate">{row.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
