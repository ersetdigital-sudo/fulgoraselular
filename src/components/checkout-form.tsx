"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  BadgePercent,
  Building2,
  Check,
  ChevronDown,
  Info,
  Landmark,
  MessageCircle,
  QrCode,
  Store,
  Tag,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ServiceIcon } from "@/components/service-icon";
import { detectOperator, paymentChannels, promoCodes, SITE_CONTACT } from "@/lib/catalog";
import type { CatalogItem, PaymentChannel, WalletOption } from "@/lib/catalog";
import { digitsOnly, rupiah } from "@/lib/format";

const FORM_ID = "checkout-form";

const GROUPS: {
  id: PaymentChannel["group"];
  label: string;
  short?: string;
  icon: LucideIcon;
}[] = [
  { id: "qris", label: "QRIS", icon: QrCode },
  { id: "ewallet", label: "E-Wallet", icon: Wallet },
  { id: "retail", label: "Gerai", icon: Store },
  { id: "va", label: "Virtual Account", short: "VA", icon: Landmark },
];

const GROUP_ICON: Record<PaymentChannel["group"], LucideIcon> = {
  qris: QrCode,
  ewallet: Wallet,
  retail: Store,
  va: Building2,
};

const PREFIX = /^(Token Listrik|Pulsa|Data|Iuran |Tagihan|Top Up|Cicilan)\s*/i;

export function CheckoutForm({ item }: { item: CatalogItem }) {
  const router = useRouter();

  const wallets = item.wallets ?? [];
  const [walletId, setWalletId] = useState(wallets[0]?.id ?? "");
  const [number, setNumber] = useState("");
  const [productId, setProductId] = useState(() => {
    const wallet = item.wallets?.[0];
    if (wallet) return `${wallet.id}-${wallet.denominations[0]}`;
    return item.products[0]?.id ?? "";
  });
  const [methodId, setMethodId] = useState("qris");
  const [group, setGroup] = useState<PaymentChannel["group"]>("qris");
  const [promoInput, setPromoInput] = useState("");
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const wallet = wallets.find((row) => row.id === walletId) ?? null;

  const products = useMemo(() => {
    if (wallet) {
      return wallet.denominations.map((price) => ({
        id: `${wallet.id}-${price}`,
        name: `Top Up ${price.toLocaleString("id-ID")}`,
        price,
        badge: undefined as string | undefined,
        note: undefined as string | undefined,
      }));
    }
    return item.products;
  }, [wallet, item.products]);

  const product = products.find((row) => row.id === productId) ?? products[0];
  const method = paymentChannels.find((row) => row.id === methodId) ?? paymentChannels[0];
  const operator = item.field.operatorPicker ? detectOperator(number) : null;

  const promo = promoCode ? promoCodes[promoCode] : null;
  const discount = promo ? Math.round((product.price * promo.percent) / 100) : 0;
  const subtotal = product.price - discount;
  const total = subtotal + method.fee;

  const numberReady = digitsOnly(number).length >= 6;

  const visibleChannels = useMemo(
    () => paymentChannels.filter((row) => row.group === group),
    [group],
  );

  function pickMethod(channel: PaymentChannel) {
    setMethodId(channel.id);
    setGroup(channel.group);
  }

  function pickWallet(next: WalletOption) {
    setWalletId(next.id);
    setProductId(`${next.id}-${next.denominations[0]}`);
  }

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      setPromoCode(null);
      setPromoMessage(null);
      return;
    }
    if (promoCodes[code]) {
      setPromoCode(code);
      setPromoMessage(`${code} aktif: ${promoCodes[code].label}`);
    } else {
      setPromoCode(null);
      setPromoMessage("Kode promo tidak ditemukan.");
    }
  }

  function placeOrder() {
    if (!numberReady) {
      setError("Isi nomor pelanggan atau nomor HP tujuan terlebih dahulu.");
      document.getElementById("nomor")?.focus();
      return;
    }
    setError(null);

    const now = new Date();
    const stamp = `${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
    const serial = String(Math.floor(Math.random() * 900) + 100);
    const invoice = `FGL-${stamp}-${serial}`;

    const params = new URLSearchParams({
      produk: item.name,
      item: product.name,
      nominal: String(product.price),
      diskon: String(discount),
      admin: String(method.fee),
      total: String(total),
      metode: method.name,
      nomor: number.trim(),
      ...(wallet ? { dompet: wallet.name } : {}),
      ...(promoCode ? { promo: promoCode } : {}),
    });

    router.push(`/pesanan/${invoice}?${params.toString()}`);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    placeOrder();
  }

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-8">
      <form id={FORM_ID} onSubmit={handleSubmit}>
        <section className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
          {/* 1 — data tujuan */}
          <div className="p-5 sm:p-6">
            <StepHeader index={1} title="Data akun Anda" hint="Wajib" />
            <label htmlFor="nomor" className="mt-4 block text-[13px] font-semibold text-ink">
              {item.field.label}
            </label>
            <div className="relative mt-2">
              <input
                id="nomor"
                value={number}
                onChange={(event) => setNumber(event.target.value)}
                placeholder={item.field.placeholder}
                inputMode={item.field.type === "hp" ? "tel" : "numeric"}
                autoComplete="off"
                aria-invalid={error ? true : undefined}
                className="min-h-13 w-full rounded-xl border border-line bg-paper px-4 py-3.5 text-[16px] text-ink placeholder:text-faint transition-colors focus:border-brand focus:bg-white focus:outline-none sm:text-[15px]"
              />
              {operator ? (
                <span className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2 rounded-lg border border-line bg-white py-1 pl-1 pr-2.5">
                  <Image
                    src={operator.logo}
                    alt={`Logo ${operator.name}`}
                    width={140}
                    height={40}
                    unoptimized
                    className="h-4 w-auto max-w-[110px] shrink-0 object-contain"
                  />
                  <span className="text-[12.5px] font-semibold text-ink">{operator.name}</span>
                </span>
              ) : null}
            </div>
            <p className="mt-2 flex items-start gap-1.5 text-[12px] leading-relaxed text-faint">
              <Info size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
              {item.field.hint}
            </p>
            {error ? (
              <p role="alert" className="mt-2 text-[12.5px] font-semibold text-rose-600">
                {error}
              </p>
            ) : null}
          </div>

          {/* 2 — dompet digital, khusus e-wallet */}
          {wallets.length ? (
            <div className="p-5 sm:p-6">
              <StepHeader index={2} title="Pilih dompet digital" />
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {wallets.map((entry) => {
                  const active = entry.id === walletId;
                  return (
                    <li key={entry.id}>
                      <button
                        type="button"
                        onClick={() => pickWallet(entry)}
                        aria-pressed={active}
                        className={`card-lift flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left ${
                          active
                            ? "border-brand bg-brand-soft"
                            : "border-line bg-paper hover:-translate-y-0.5 hover:border-brand/40 hover:bg-white"
                        }`}
                      >
                        <span
                          className="inline-flex h-10 w-14 shrink-0 items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${entry.color}1f` }}
                          aria-hidden="true"
                        >
                          {entry.logo ? (
                            <Image
                              src={entry.logo}
                              alt=""
                              width={56}
                              height={56}
                              unoptimized
                              className="h-6 w-6 object-contain"
                            />
                          ) : (
                            <span className="text-[12px] font-bold" style={{ color: entry.color }}>
                              {entry.short}
                            </span>
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13.5px] font-semibold text-ink">{entry.name}</span>
                          <span className="block text-[11.5px] text-faint">
                            Min. {rupiah(entry.min)} · biaya top up {rupiah(entry.fee)}
                          </span>
                          {entry.note ? (
                            <span className="mt-0.5 block text-[11px] leading-snug text-faint">
                              {entry.note}
                            </span>
                          ) : null}
                        </span>
                        {active ? (
                          <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                            <Check size={10} strokeWidth={4} aria-hidden="true" />
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          {/* 3 — nominal */}
          <div className="p-5 sm:p-6">
            <StepHeader index={wallets.length ? 3 : 2} title="Pilih nominal" />
            {wallet ? (
              <p className="mt-2 text-[12.5px] text-faint">
                Minimal top up {wallet.name} {rupiah(wallet.min)}.
              </p>
            ) : null}
            <ul className="mt-4 grid auto-rows-fr grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
              {products.map((row) => {
                const active = row.id === productId;
                const label = row.name.replace(PREFIX, "");
                const numericOnly = label.replace(/\D/g, "") === String(row.price);
                const tag = row.badge ?? row.note;
                return (
                  <li key={row.id}>
                    <button
                      type="button"
                      onClick={() => setProductId(row.id)}
                      aria-pressed={active}
                      className={`card-lift relative flex h-full min-h-16 w-full flex-col justify-center gap-1 rounded-xl border py-2.5 pl-3 pr-7 text-left ${
                        active
                          ? "border-brand bg-brand-soft"
                          : "border-line bg-paper hover:-translate-y-0.5 hover:border-brand/40 hover:bg-white"
                      }`}
                    >
                      {numericOnly ? null : (
                        <span className="text-[12px] font-medium leading-snug text-muted">{label}</span>
                      )}
                      <span className="flex w-full flex-wrap items-center gap-x-1.5 gap-y-1">
                        <span className="text-[15px] font-bold leading-tight text-ink">
                          {rupiah(row.price)}
                        </span>
                        {tag ? (
                          <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-bold text-muted">
                            {tag}
                          </span>
                        ) : null}
                      </span>
                      {active ? (
                        <span className="absolute right-2.5 top-2.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand text-white">
                          <Check size={10} strokeWidth={4} aria-hidden="true" />
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 4 — metode bayar */}
          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <StepHeader index={wallets.length ? 4 : 3} title="Metode pembayaran" />
              <span className="rounded-lg border border-brand/30 bg-brand-soft px-2.5 py-1 text-[11.5px] font-semibold text-brand">
                QRIS aktif
              </span>
            </div>

            <div
              className="no-scrollbar mt-4 flex gap-1.5 overflow-x-auto"
              role="tablist"
              aria-label="Grup metode pembayaran"
            >
              {GROUPS.map((entry) => {
                const active = group === entry.id;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    disabled={entry.id !== "qris"}
                    onClick={() => {
                      setGroup(entry.id);
                      const first = paymentChannels.find((row) => row.group === entry.id);
                      if (first) setMethodId(first.id);
                    }}
                    className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-[13px] font-semibold transition-colors ${
                      active
                        ? "border-brand bg-brand text-white"
                        : entry.id === "qris"
                          ? "border-line bg-paper text-muted hover:border-brand/40 hover:text-ink"
                          : "cursor-not-allowed border-line bg-paper text-faint opacity-55"
                    }`}
                  >
                    <entry.icon size={15} aria-hidden="true" />
                    <span className="sm:hidden">{entry.short ?? entry.label}</span>
                    <span className="hidden sm:inline">{entry.label}</span>
                    {entry.id !== "qris" ? (
                      <span className="rounded-md border border-line px-1.5 py-0.5 text-[10.5px] font-semibold">
                        Segera
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <ul className="mt-3 grid gap-2">
              {visibleChannels.map((channel) => {
                const active = channel.id === methodId;
                const Icon = GROUP_ICON[channel.group];
                return (
                  <li key={channel.id}>
                    <button
                      type="button"
                      onClick={() => pickMethod(channel)}
                      aria-pressed={active}
                      disabled={channel.id !== "qris"}
                      className={`card-lift flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left ${
                        active
                          ? "border-brand bg-brand-soft"
                          : channel.id === "qris"
                            ? "border-line bg-paper hover:-translate-y-0.5 hover:border-brand/40 hover:bg-white"
                            : "cursor-not-allowed border-line bg-paper opacity-55"
                      }`}
                    >
                      <span
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          active ? "bg-white ring-1 ring-brand/30" : "bg-white"
                        }`}
                      >
                        {channel.logo ? (
                          <Image
                            src={channel.logo}
                            alt={channel.name}
                            width={44}
                            height={44}
                            unoptimized
                            className="h-6 w-6 object-contain"
                          />
                        ) : (
                          <Icon size={17} aria-hidden="true" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-ink">{channel.name}</span>
                        <span className="block truncate text-[11.5px] text-faint">{channel.note}</span>
                      </span>
                      <span className="shrink-0 text-[12.5px] font-semibold text-muted">
                        +{rupiah(channel.fee)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 5 — promo */}
          <div className="p-5 sm:p-6">
            <StepHeader index={wallets.length ? 5 : 4} title="Kode promo" hint="Opsional" />
            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
              <div className="relative flex-1">
                <Tag
                  size={15}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint"
                  aria-hidden="true"
                />
                <input
                  value={promoInput}
                  onChange={(event) => setPromoInput(event.target.value)}
                  placeholder="Masukkan kode promo"
                  aria-label="Kode promo"
                  className="min-h-11 w-full rounded-xl border border-line bg-paper py-2.5 pl-10 pr-3 text-[16px] uppercase text-ink placeholder:normal-case placeholder:text-faint transition-colors focus:border-brand focus:bg-white focus:outline-none sm:text-[14px]"
                />
              </div>
              <button
                type="button"
                onClick={applyPromo}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand"
              >
                Cek promo
              </button>
            </div>

            {promoMessage ? (
              <p
                className={`mt-2.5 flex items-start gap-1.5 text-[12.5px] font-medium ${
                  promoCode ? "text-success" : "text-rose-600"
                }`}
              >
                {promoCode ? (
                  <Check size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
                ) : null}
                {promoMessage}
              </p>
            ) : null}
          </div>
        </section>
      </form>

      {/* Ringkasan + commit — desktop */}
      <aside className="hidden lg:sticky lg:top-24 lg:block">
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <div className="flex items-center gap-3 border-b border-line bg-paper px-5 py-4">
            <ServiceIcon name={item.icon} accent={item.accent} size={19} className="h-9 w-9" />
            <div className="min-w-0">
              <p className="truncate text-[13.5px] font-bold text-ink">{item.name}</p>
              <p className="text-[11.5px] text-faint">Ringkasan pesanan</p>
            </div>
          </div>

          <div className="px-5 py-4">
            <OrderRows
              productName={product?.name ?? ""}
              productPrice={product?.price ?? 0}
              number={number}
              methodName={method.name}
              methodFee={method.fee}
              discount={discount}
              promoPercent={promo?.percent ?? 0}
              walletName={wallet?.name}
              total={total}
            />

            <button
              type="submit"
              form={FORM_ID}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand text-[15px] font-bold text-white transition hover:bg-brand-dark"
            >
              Pesan sekarang
            </button>

            <Link
              href={`https://wa.me/${SITE_CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-1.5 text-[12px] font-semibold text-muted transition hover:text-brand"
            >
              <MessageCircle size={13} aria-hidden="true" />
              Ada kendala? Hubungi {SITE_CONTACT.whatsappDisplay}
            </Link>
          </div>
        </div>
      </aside>

      {/* Scrim — mobile */}
      {detailsOpen ? (
        <button
          type="button"
          aria-label="Tutup rincian pesanan"
          onClick={() => setDetailsOpen(false)}
          className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px] lg:hidden"
        />
      ) : null}

      {/* Bottom sheet + action bar — mobile */}
      <div className="fixed inset-x-0 bottom-0 z-[60] lg:hidden">
        <div className="pb-safe overflow-hidden rounded-t-[26px] border-t border-line bg-white shadow-[0_-16px_44px_-26px_rgba(11,18,32,0.6)]">
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              detailsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div id="rincian-pesanan" className="px-4 pt-2.5">
                <span
                  className="mx-auto mb-3 block h-1.5 w-10 rounded-full bg-line-strong"
                  aria-hidden="true"
                />
                <OrderRows
                  productName={product?.name ?? ""}
                  productPrice={product?.price ?? 0}
                  number={number}
                  methodName={method.name}
                  methodFee={method.fee}
                  discount={discount}
                  promoPercent={promo?.percent ?? 0}
                  walletName={wallet?.name}
                  total={total}
                />
              </div>
            </div>
          </div>

          <div className="px-4 pt-2.5">
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-[11.5px] text-faint">Total</p>
                <p className="font-display text-[20px] font-bold leading-tight tracking-tight text-ink">
                  {rupiah(total)}
                </p>
              </div>
              <button
                type="submit"
                form={FORM_ID}
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-5 text-[15px] font-bold text-white transition hover:bg-brand-dark"
              >
                Pesan sekarang
              </button>
            </div>
            <button
              type="button"
              onClick={() => setDetailsOpen((value) => !value)}
              aria-expanded={detailsOpen}
              aria-controls="rincian-pesanan"
              className="mt-1 flex w-full items-center justify-center gap-1 py-1.5 text-[12px] font-semibold text-muted"
            >
              {detailsOpen ? "Sembunyikan rincian" : "Lihat rincian"}
              <ChevronDown
                size={13}
                aria-hidden="true"
                className={`transition-transform duration-300 ${detailsOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderRows({
  productName,
  productPrice,
  number,
  methodName,
  methodFee,
  discount,
  promoPercent,
  walletName,
  total,
}: {
  productName: string;
  productPrice: number;
  number: string;
  methodName: string;
  methodFee: number;
  discount: number;
  promoPercent: number;
  walletName?: string;
  total: number;
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-3 rounded-xl bg-surface-2 px-3.5 py-3">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-ink">{productName}</p>
          <p className="mt-0.5 text-[11.5px] text-faint">{number.trim() || "Nomor belum diisi"}</p>
        </div>
        <p className="shrink-0 text-[13px] font-bold text-ink">{rupiah(productPrice)}</p>
      </div>

      <dl className="mt-4 space-y-2.5 text-[13px]">
        {walletName ? (
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted">Dompet digital</dt>
            <dd className="font-semibold text-ink">{walletName}</dd>
          </div>
        ) : null}
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted">Subtotal</dt>
          <dd className="font-semibold text-ink">{rupiah(productPrice)}</dd>
        </div>
        {discount > 0 ? (
          <div className="flex items-center justify-between gap-3">
            <dt className="inline-flex items-center gap-1.5 text-success">
              <BadgePercent size={14} aria-hidden="true" />
              Diskon {promoPercent}%
            </dt>
            <dd className="font-semibold text-success">-{rupiah(discount)}</dd>
          </div>
        ) : null}
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted">Biaya admin {methodName}</dt>
          <dd className="font-semibold text-ink">{rupiah(methodFee)}</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-line pt-4">
        <span className="text-[13.5px] font-semibold text-muted">Total</span>
        <span className="font-display text-[26px] font-bold tracking-tight text-ink">
          {rupiah(total)}
        </span>
      </div>
    </>
  );
}

function StepHeader({
  index,
  title,
  hint,
}: {
  index: number;
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand text-[12.5px] font-bold text-white">
        {index}
      </span>
      <h2 className="text-[15px] font-bold text-ink">{title}</h2>
      {hint ? (
        <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-semibold text-faint">
          {hint}
        </span>
      ) : null}
    </div>
  );
}
