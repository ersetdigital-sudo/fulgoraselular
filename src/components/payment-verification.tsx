"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Check,
  CircleDashed,
  Clock3,
  MessageCircle,
  RefreshCw,
  ScanLine,
} from "lucide-react";
import type { Order, OrderStatus } from "@/lib/orders";
import { rupiah } from "@/lib/format";

export type VerificationOrder = {
  invoice: string;
  item: string;
  number: string;
  total: number;
  method: string;
  createdAt: string;
};

const CHECKPOINTS = [
  { key: "qris", label: "Memeriksa QRIS", hint: "Kode dicocokkan dengan invoice" },
  { key: "bank", label: "Konfirmasi bank", hint: "Menunggu settlement QRIS" },
  { key: "provider", label: "Kirim ke provider", hint: "Layanan diteruskan ke operator" },
  { key: "done", label: "Layanan diterima", hint: "Selesai" },
];

function formatWaktu(iso: string) {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Jakarta",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function PaymentVerification({ order }: { order: VerificationOrder }) {
  const [step, setStep] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [lastSync, setLastSync] = useState<string>("baru saja");
  const [remote, setRemote] = useState<Order | null>(null);

  // Polling status dari API setiap 3 detik (beda dari v1 yang memakai timer lokal).
  useEffect(() => {
    let active = true;
    const poll = async () => {
      try {
        const response = await fetch(`/api/orders/${encodeURIComponent(order.invoice)}`, {
          headers: { accept: "application/json" },
        });
        if (response.ok && active) {
          const data = (await response.json()) as Order;
          setRemote(data);
          setLastSync("baru saja");
          if (data.status === "selesai") setStep(4);
        }
      } catch {
        /* biarkan polling berikutnya mencoba lagi */
      }
    };
    void poll();
    const timer = window.setInterval(poll, 3000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [order.invoice]);

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (step >= 3) return;
    const timer = window.setTimeout(() => setStep((value) => value + 1), 3000);
    return () => window.clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    const timer = window.setInterval(() => setLastSync("beberapa detik lalu"), 5000);
    return () => window.clearInterval(timer);
  }, []);

  const status: OrderStatus = remote?.status ?? (step >= 4 ? "selesai" : "menunggu");
  const done = step >= CHECKPOINTS.length || status === "selesai";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_330px] lg:items-start lg:gap-8">
      {/* Kolom kiri: timeline vertikal + status */}
      <div className="space-y-5">
        <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <span
              className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                done ? "bg-success-soft text-success" : "bg-brand-soft text-brand"
              }`}
            >
              {done ? (
                <Check size={20} strokeWidth={2.2} aria-hidden="true" />
              ) : (
                <RefreshCw size={19} className="animate-spin" aria-hidden="true" />
              )}
            </span>
            <div className="min-w-0">
              <h2 className="text-[16px] font-bold text-ink">
                {done
                  ? "Pembayaran diterima, layanan sedang dikirim"
                  : "Terima kasih, pembayaran Anda sedang diproses dan diperiksa"}
              </h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                {done
                  ? `${order.item} untuk nomor ${order.number} akan masuk dalam hitungan detik.`
                  : "Jangan tutup halaman ini. Status dicek otomatis ke sistem pembayaran — biasanya kurang dari satu menit."}
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Status diperbarui otomatis · {lastSync}
              </p>
            </div>
          </div>

          <ol className="mt-6 space-y-0 border-t border-line pt-5">
            {CHECKPOINTS.map((checkpoint, index) => {
              const finished = index < step || (done && index === CHECKPOINTS.length - 1);
              const active = index === step && !done;
              return (
                <li key={checkpoint.key} className="relative flex gap-4 pb-5 last:pb-0">
                  {index < CHECKPOINTS.length - 1 ? (
                    <span
                      className={`absolute left-[13px] top-7 h-[calc(100%-18px)] w-0.5 ${
                        finished ? "bg-success/50" : "bg-line"
                      }`}
                      aria-hidden="true"
                    />
                  ) : null}
                  <span
                    className={`relative z-10 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${
                      finished
                        ? "border-success bg-success text-white"
                        : active
                          ? "border-brand bg-brand-soft text-brand"
                          : "border-line bg-white text-faint"
                    }`}
                  >
                    {finished ? (
                      <Check size={13} strokeWidth={3.2} aria-hidden="true" />
                    ) : active ? (
                      <CircleDashed size={14} aria-hidden="true" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p
                        className={`text-[13.5px] font-semibold ${
                          finished ? "text-ink" : active ? "text-ink" : "text-faint"
                        }`}
                      >
                        {checkpoint.label}
                      </p>
                      {finished ? (
                        <p className="text-[11.5px] text-faint">Selesai</p>
                      ) : active ? (
                        <p className="text-[11.5px] font-semibold text-brand">Sedang berjalan…</p>
                      ) : (
                        <p className="text-[11.5px] text-faint">Menunggu</p>
                      )}
                    </div>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-muted">{checkpoint.hint}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="flex flex-col gap-2.5 rounded-2xl border border-line bg-white p-4 sm:flex-row">
          <a
            href={`https://wa.me/6281200000000?text=${encodeURIComponent(
              `Halo fulgora seluler, saya sudah membayar invoice ${order.invoice} sebesar ${rupiah(order.total)}.`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-4 text-[13.5px] font-bold text-white transition hover:bg-brand-dark"
          >
            <MessageCircle size={15} aria-hidden="true" />
            Kirim bukti via WhatsApp
          </a>
          <Link
            href="/cek-transaksi"
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-paper px-4 text-[13.5px] font-semibold text-ink transition hover:border-brand hover:text-brand"
          >
            <ScanLine size={15} aria-hidden="true" />
            Cek di halaman Cek Transaksi
          </Link>
        </section>
      </div>

      {/* Kolom kanan: QR mini + ringkasan */}
      <aside className="space-y-4 lg:sticky lg:top-24">
        <div className="rounded-2xl border border-line bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[14px] font-bold text-ink">Kode QRIS</h2>
            <span className="inline-flex items-center gap-1.5 text-[11.5px] text-faint">
              <Clock3 size={12} aria-hidden="true" />
              {String(Math.floor(seconds / 60)).padStart(2, "0")}:
              {String(seconds % 60).padStart(2, "0")}
            </span>
          </div>
          <Image
            src="/images/qris-merchant.jpg"
            alt="Kode QRIS untuk pembayaran di fulgora seluler"
            width={1135}
            height={1600}
            unoptimized
            className="mt-3 w-full max-w-[220px] rounded-lg border border-line bg-white"
          />
        </div>

        <div className="rounded-2xl border border-line bg-white p-5">
          <h2 className="text-[14px] font-bold text-ink">Ringkasan pesanan</h2>
          <dl className="mt-3 space-y-2.5 text-[13px]">
            {[
              ["Invoice", order.invoice],
              ["Produk", order.item],
              ["Nomor tujuan", order.number],
              ["Metode", order.method],
              ["Dibuat", formatWaktu(order.createdAt)],
            ].map(([label, value]) => (
              <div key={label} className="flex items-start justify-between gap-3">
                <dt className="text-faint">{label}</dt>
                <dd className="max-w-[60%] text-right font-semibold text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-line pt-4">
            <span className="text-[13.5px] font-semibold text-muted">Total</span>
            <span className="font-display text-[22px] font-bold tracking-tight text-ink">
              {rupiah(order.total)}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}
