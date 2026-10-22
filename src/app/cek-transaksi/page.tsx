import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { TransactionChecker } from "@/components/transaction-checker";

export const metadata: Metadata = {
  title: "Cek Transaksi",
  description: "Cek status pesanan fulgora seluler dengan nomor invoice.",
};

export default function CheckTransactionPage() {
  return (
    <div className="mx-auto w-full max-w-[900px] px-4 py-6 sm:px-6 lg:py-10">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-faint">
        <Link href="/" className="transition-colors hover:text-brand">
          Beranda
        </Link>
        <ChevronRight size={13} aria-hidden="true" />
        <span className="font-semibold text-ink">Cek Transaksi</span>
      </nav>

      <h1 className="mt-5 text-[clamp(1.6rem,1.25rem+1.8vw,2.3rem)] font-bold leading-tight text-ink">
        Cek Transaksi
      </h1>
      <p className="mt-2 max-w-[62ch] text-[14.5px] leading-relaxed text-muted">
        Masukkan nomor invoice yang Anda terima setelah memesan. Status pembayaran dan progres
        layanan langsung tampil di sini.
      </p>

      <div className="mt-8">
        <TransactionChecker />
      </div>
    </div>
  );
}
