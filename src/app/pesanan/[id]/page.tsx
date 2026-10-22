import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { OrderPanel } from "@/components/order-panel";

export const metadata: Metadata = {
  title: "Pembayaran",
  description: "Selesaikan pembayaran pesanan fulgora seluler.",
};

function text(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw ?? "";
}

export default async function OrderPage(props: PageProps<"/pesanan/[id]">) {
  const { id } = await props.params;
  const params = await props.searchParams;

  const total = Number(text(params.total).replace(/\D/g, "")) || 0;
  if (!total) notFound();

  const createdAt = new Date().toISOString();

  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 lg:py-10">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-faint">
        <Link href="/" className="transition-colors hover:text-brand">
          Beranda
        </Link>
        <ChevronRight size={13} aria-hidden="true" />
        <Link href="/cek-transaksi" className="transition-colors hover:text-brand">
          Cek Transaksi
        </Link>
        <ChevronRight size={13} aria-hidden="true" />
        <span className="font-semibold text-ink">{id}</span>
      </nav>

      <h1 className="mt-5 text-[clamp(1.6rem,1.25rem+1.8vw,2.3rem)] font-bold leading-tight text-ink">
        Pesanan Anda sudah dibuat
      </h1>
      <p className="mt-2 max-w-[62ch] text-[14.5px] leading-relaxed text-muted">
        Selesaikan pembayaran sebelum waktu habis. Status pembayaran diperiksa otomatis setiap
        beberapa detik.
      </p>

      <div className="mt-8">
        <OrderPanel
          invoice={id}
          item={text(params.produk)}
          produk={text(params.item)}
          total={total}
          metode={text(params.metode) || "QRIS"}
          nomor={text(params.nomor)}
          dompet={text(params.dompet)}
          promo={text(params.promo)}
          createdAt={createdAt}
        />
      </div>
    </div>
  );
}
