import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { PaymentVerification } from "@/components/payment-verification";

export const metadata: Metadata = {
  title: "Verifikasi Pembayaran",
  description: "Pembayaran Anda sedang diproses dan diperiksa otomatis.",
};

function text(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw ?? "";
}

export default async function VerificationPage(
  props: PageProps<"/pesanan/[id]/verifikasi">,
) {
  const { id } = await props.params;
  const params = await props.searchParams;

  const total = Number(text(params.total).replace(/\D/g, "")) || 0;
  if (!total) notFound();

  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-8 sm:px-6 lg:py-12">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-faint"
      >
        <Link href="/" className="transition-colors hover:text-brand">
          Beranda
        </Link>
        <ChevronRight size={13} aria-hidden="true" />
        <Link href={`/pesanan/${id}`} className="transition-colors hover:text-brand">
          Pesanan {id}
        </Link>
        <ChevronRight size={13} aria-hidden="true" />
        <span className="font-medium text-ink">Verifikasi pembayaran</span>
      </nav>

      <h1 className="mt-5 text-[clamp(1.7rem,1.3rem+2vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
        Verifikasi pembayaran
      </h1>
      <p className="mt-2 max-w-[60ch] text-[14.5px] leading-relaxed text-muted">
        Halaman ini memeriksa status pembayaran ke sistem secara otomatis. Jangan perlu refresh
        manual.
      </p>

      <div className="mt-7">
        <PaymentVerification
          order={{
            invoice: id,
            item: text(params.item) || "Layanan",
            number: text(params.nomor) || "—",
            total,
            method: text(params.metode) || "QRIS",
            createdAt: text(params.createdAt) || new Date().toISOString(),
          }}
        />
      </div>
    </div>
  );
}
