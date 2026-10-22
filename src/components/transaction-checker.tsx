"use client";

import { FormEvent, useState } from "react";
import { Check, Search, XCircle } from "lucide-react";

import type { Order, OrderStatus } from "@/lib/orders";
import { rupiah } from "@/lib/format";

type Status = OrderStatus;

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


const STATUS_META: Record<Status, { label: string; tone: string }> = {
  selesai: { label: "Selesai", tone: "bg-success-soft text-success" },
  diproses: { label: "Sedang diproses", tone: "bg-warn-soft text-warn" },
  menunggu: { label: "Menunggu pembayaran", tone: "bg-brand-soft text-brand" },
  gagal: { label: "Gagal", tone: "bg-rose-50 text-rose-700" },
};

export function TransactionChecker() {
  const [invoice, setInvoice] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = invoice.trim().toUpperCase();
    if (!/^FGL-[A-Z0-9-]{4,}$/.test(value)) {
      setError("Format invoice belum tepat. Format: FGL-YYMMDD-XXX");
      setOrder(null);
      setNotFound(false);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`/api/orders/${encodeURIComponent(value)}`, {
        headers: { accept: "application/json" },
      });
      if (response.ok) {
        setOrder((await response.json()) as Order);
        setNotFound(false);
      } else {
        setOrder(null);
        setNotFound(true);
      }
    } catch {
      setOrder(null);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }

  const meta = order ? STATUS_META[order.status] : null;

  return (
    <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <label htmlFor="invoice" className="block text-[13px] font-semibold text-ink">
            Nomor invoice
          </label>
          <div className="relative mt-2">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint"
              aria-hidden="true"
            />
            <input
              id="invoice"
              value={invoice}
              onChange={(event) => setInvoice(event.target.value)}
              placeholder="FGL-YYMMDD-XXX"
              autoComplete="off"
              aria-invalid={error ? true : undefined}
              className={`min-h-12 w-full rounded-xl border bg-paper py-3 pl-10 pr-3 text-[15px] text-ink placeholder:text-faint transition-colors focus:outline-none ${
                error ? "border-rose-400" : "border-line focus:border-brand"
              }`}
            />
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 text-sm font-bold text-white transition hover:bg-brand-dark sm:mt-[30px]"
        >
          {loading ? "Mencari…" : "Cek Transaksi"}
        </button>
      </form>

      {error ? (
        <p role="alert" className="mt-3 flex items-center gap-1.5 text-[13px] font-semibold text-rose-600">
          <XCircle size={14} aria-hidden="true" />
          {error}
        </p>
      ) : null}

      {order && meta ? (
        <div className="mt-5 rounded-xl border border-line bg-paper p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[12px] text-faint">Invoice</p>
              <p className="font-display text-[16px] font-bold text-ink">{order.invoice}</p>
            </div>
            <span className={`rounded-lg px-2.5 py-1 text-[12px] font-bold ${meta.tone}`}>
              {meta.label}
            </span>
          </div>

          <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {[
              ["Produk", order.item],
              ["Nomor", order.number],
              ["Total", rupiah(order.total)],
              ["Metode", order.method],
              ["Kanal", order.channel],
              ["Waktu", formatWaktu(order.createdAt)],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-[12px] text-faint">{label}</dt>
                <dd className="text-[13.5px] font-semibold text-ink">{value}</dd>
              </div>
            ))}
          </dl>

          <ol className="mt-5 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:gap-6">
            {[
              { label: "Pesanan dibuat", done: true },
              { label: "Pembayaran diterima", done: order.status !== "menunggu" },
              { label: "Layanan dikirim", done: order.status === "selesai" },
            ].map((step) => (
              <li key={step.label} className="flex items-center gap-2 text-[12.5px]">
                <span
                  className={`inline-flex h-4 w-4 items-center justify-center rounded-full ${
                    step.done ? "bg-brand text-white" : "border border-line-strong bg-white"
                  }`}
                >
                  {step.done ? <Check size={10} strokeWidth={4} aria-hidden="true" /> : null}
                </span>
                <span className={step.done ? "text-ink-2" : "text-faint"}>{step.label}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {notFound ? (
        <div className="mt-4 rounded-xl border border-line bg-surface-2 p-4">
          <p className="text-[13.5px] font-semibold text-ink">Invoice tidak ditemukan</p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
            Periksa kembali nomor invoice yang kamu terima, atau hubungi WhatsApp kami untuk
            pengecekan manual.
          </p>
        </div>
      ) : null}
    </div>
  );
}


