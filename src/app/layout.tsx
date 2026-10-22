import type { Metadata, Viewport } from "next";
import { DM_Sans, Sora, Space_Grotesk } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "fulgora seluler — Beli pulsa, token listrik, dan tagihan online",
    template: "%s · fulgora seluler",
  },
  description:
    "Beli token listrik PLN, pulsa, paket data, BPJS, PDAM, e-wallet, dan cicilan. Bayar dengan QRIS, e-wallet, gerai ritel, atau virtual account.",
  applicationName: "fulgora seluler",
};

export const viewport: Viewport = {
  themeColor: "#1D4ED8",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${dmSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
