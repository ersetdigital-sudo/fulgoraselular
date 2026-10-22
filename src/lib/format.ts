export function rupiah(value: number): string {
  return `Rp ${new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(value)}`;
}

export function pad(value: number, length = 2): string {
  return String(value).padStart(length, "0");
}

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}
