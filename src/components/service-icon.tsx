import {
  Car,
  Droplet,
  ShieldCheck,
  Smartphone,
  Tv,
  Wallet,
  Wifi,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  zap: Zap,
  smartphone: Smartphone,
  wifi: Wifi,
  droplet: Droplet,
  "shield-check": ShieldCheck,
  tv: Tv,
  wallet: Wallet,
  car: Car,
};

const ACCENTS: Record<string, { box: string; ink: string; dot: string }> = {
  amber: { box: "bg-amber-100", ink: "text-amber-700", dot: "bg-amber-500" },
  blue: { box: "bg-blue-100", ink: "text-blue-700", dot: "bg-blue-500" },
  teal: { box: "bg-teal-100", ink: "text-teal-700", dot: "bg-teal-500" },
  green: { box: "bg-emerald-100", ink: "text-emerald-700", dot: "bg-emerald-500" },
  sky: { box: "bg-sky-100", ink: "text-sky-700", dot: "bg-sky-500" },
  violet: { box: "bg-violet-100", ink: "text-violet-700", dot: "bg-violet-500" },
  indigo: { box: "bg-indigo-100", ink: "text-indigo-700", dot: "bg-indigo-500" },
  rose: { box: "bg-rose-100", ink: "text-rose-700", dot: "bg-rose-500" },
};

export function ServiceIcon({
  name,
  accent = "blue",
  size = 22,
  className,
}: {
  name: string;
  accent?: string;
  size?: number;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Zap;
  const tone = ACCENTS[accent] ?? ACCENTS.blue;

  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl ${tone.box} ${tone.ink} ${className ?? ""}`}
    >
      <Icon size={size} strokeWidth={2} aria-hidden="true" />
    </span>
  );
}

export function accentDot(accent: string) {
  return (ACCENTS[accent] ?? ACCENTS.blue).dot;
}
