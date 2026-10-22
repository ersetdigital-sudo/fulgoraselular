"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Clock3, Copy, MessageCircle } from "lucide-react";
import { SITE_CONTACT } from "@/lib/catalog";
import { pad, rupiah } from "@/lib/format";

export function OrderPanel({
  invoice,
  item,
  produk,
  total,
  metode,
  nomor,
  dompet,
  promo,
  createdAt,
}: {
  invoice: string;
  item: string;
  produk: string;
  total: number;
  metode: string;
  nomor: string;
  dompet?: string;
  promo?: string;
  createdAt: string;
}) {
  const [remaining, setRemaining] = useState(15 * 60);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const expired = remaining <= 0;
  const vaNumber = `8808${invoice.replace(/\D/g, "").slice(-8).padStart(8, "0")}`;

  async function copyInvoice() {
    try {
      await navigator.clipboard.writeText(invoice);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start lg:gap-8">
      <div className="space-y-4">
        <section className="rounded-2xl border border-brand/30 bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[12.5px] font-semibold text-faint">Nomor invoice</p>
              <p className="font-display text-[22px] font-bold tracking-tight text-ink">{invoice}</p>
            </div>
            <button
              type="button"
              onClick={copyInvoice}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-line bg-paper px-3.5 text-[12.5px] font-semibold text-ink transition hover:border-brand hover:text-brand"
            >
              {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
              {copied ? "Tersalin" : "Salin"}
            </button>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-xl bg-warn-soft px-4 py-3.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white text-warn">
              <Clock3 size={17} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[12.5px] font-semibold text-ink-2">Selesaikan pembayaran dalam</p>
              <p className="font-display text-[22px] font-bold tabular-nums text-ink">
                {pad(Math.floor(remaining / 60))}:{pad(remaining % 60)}
              </p>
            </div>
          </div>

          {expired ? (
            <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-[13px] font-semibold text-rose-700">
              Waktu pembayaran habis. Buat pesanan baru untuk melanjutkan.
            </p>
          ) : (
            <div className="mt-4 rounded-xl border border-line bg-paper p-5">
              <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                <Image
                      src="/images/qris-merchant.jpg"
                      alt="Kode QRIS untuk pembayaran di fulgora seluler"
                      width={1135}
                      height={1600}
                      unoptimized
                      className="w-full max-w-[280px] rounded-lg border border-line bg-white"
                      priority
                    />
                <div>
                  <p className="text-[14px] font-bold text-ink">
                    {metode.includes("VA") ? `Virtual Account ${metode}` : `Bayar lewat ${metode}`}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">
                    {metode.includes("VA")
                      ? "Transfer tepat ke nomor di bawah, lalu masukkan nomor invoice sebagai berita acara. Pembayaran terdeteksi otomatis."
                      : "Buka aplikasi e-wallet atau mobile banking Anda, pilih menu Scan QR, lalu arahkan ke kode di samping."}
                  </p>
                  {metode.includes("VA") ? (
                    <p className="mt-3 font-display text-[22px] font-bold tracking-[0.04em] text-ink">
                      {vaNumber}
                    </p>
                  ) : null}
                  <p className="mt-3 text-[13px] text-ink-2">
                    Total yang dibayar{" "}
                    <strong className="font-display text-[17px] font-bold text-ink">
                      {rupiah(total)}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          )}

          <Link
            href={`/pesanan/${invoice}/verifikasi?${new URLSearchParams({
              item: produk,
              nomor,
              total: String(total),
              metode,
              createdAt,
            }).toString()}`}
            className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 text-[15px] font-bold text-white transition hover:bg-brand-dark"
          >
            <Check size={17} strokeWidth={2.2} aria-hidden="true" />
            Saya sudah bayar
          </Link>

          <a
            href={`https://wa.me/${SITE_CONTACT.whatsapp}?text=${encodeURIComponent(
              `Halo fulgora seluler, saya sudah membayar invoice ${invoice} sebesar ${rupiah(total)}.`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-line bg-paper px-5 text-[13.5px] font-semibold text-ink transition hover:border-brand hover:text-brand"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Kirim bukti via WhatsApp
          </a>

          <p className="mt-3 text-[11.5px] leading-relaxed text-faint">
            Simulasi pembayaran: tidak ada uang yang berpindah. Simpan nomor invoice ini untuk
            cek status di halaman Cek Transaksi.
          </p>
        </section>
      </div>

      <aside className="lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <div className="border-b border-line bg-paper px-5 py-4">
            <p className="text-[13.5px] font-bold text-ink">Ringkasan pesanan</p>
          </div>
          <dl className="space-y-3 px-5 py-4 text-[13px]">
            <div className="flex items-start justify-between gap-3">
              <dt className="text-muted">Produk</dt>
              <dd className="max-w-[60%] text-right font-semibold text-ink">{produk}</dd>
            </div>
            <div className="flex items-start justify-between gap-3">
              <dt className="text-muted">Layanan</dt>
              <dd className="text-right font-semibold text-ink">{item}</dd>
            </div>
            <div className="flex items-start justify-between gap-3">
              <dt className="text-muted">Nomor</dt>
              <dd className="max-w-[60%] break-words text-right font-semibold text-ink">{nomor}</dd>
            </div>
            {dompet ? (
              <div className="flex items-start justify-between gap-3">
                <dt className="text-muted">Dompet digital</dt>
                <dd className="text-right font-semibold text-ink">{dompet}</dd>
              </div>
            ) : null}
            <div className="flex items-start justify-between gap-3">
              <dt className="text-muted">Metode</dt>
              <dd className="text-right font-semibold text-ink">{metode}</dd>
            </div>
            {promo ? (
              <div className="flex items-start justify-between gap-3">
                <dt className="text-muted">Kode promo</dt>
                <dd className="text-right font-semibold text-success">{promo}</dd>
              </div>
            ) : null}
          </dl>
          <div className="flex items-baseline justify-between gap-3 border-t border-line px-5 py-4">
            <span className="text-[13.5px] font-semibold text-muted">Total</span>
            <span className="font-display text-[24px] font-bold tracking-tight text-ink">
              {rupiah(total)}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}
