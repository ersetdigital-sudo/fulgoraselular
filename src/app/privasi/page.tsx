import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { LegalList, LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privasi",
  description:
    "Ringkasan bagaimana fulgora seluler mengumpulkan, memakai, dan melindungi data pribadi Anda.",
};

export default function PrivacySummaryPage() {
  return (
    <LegalPage
      title="Privasi"
      updated="22 Oktober 2026"
      intro="Kami hanya mengumpulkan data yang benar-benar dibutuhkan untuk memproses pesanan Anda. Halaman ini merangkum praktik privasi kami dalam bahasa sederhana."
    >
      <aside className="rounded-2xl border border-brand/25 bg-brand-soft p-5">
        <p className="flex items-center gap-2 text-[13.5px] font-bold text-brand">
          <ShieldCheck size={16} aria-hidden="true" />
          Versi ringkas
        </p>
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">
          Halaman ini dibuat agar cepat dibaca. Ketentuan lengkapnya ada di{" "}
          <Link
            href="/kebijakan-privasi"
            className="font-semibold text-brand underline underline-offset-2"
          >
            Kebijakan Privasi
          </Link>
          .
        </p>
      </aside>

      <LegalSection title="Data yang kami kumpulkan">
        <LegalList
          items={[
            "Nomor tujuan atau ID pelanggan yang Anda masukkan saat memesan, misalnya nomor HP atau ID meter PLN.",
            "Nama dan nomor WhatsApp untuk mengirim bukti transaksi serta menghubungi Anda jika ada kendala.",
            "Rincian pesanan: produk, nominal, metode pembayaran, dan status transaksi.",
            "Data teknis dasar seperti alamat IP dan jenis perangkat untuk mencegah penyalahgunaan.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Cara kami memakai data">
        <LegalList
          items={[
            "Memproses dan meneruskan pesanan Anda ke penyedia layanan terkait.",
            "Menampilkan status pesanan pada halaman Cek Transaksi.",
            "Menangani keluhan, pengembalian dana, dan permintaan bantuan.",
            "Menjaga keamanan layanan serta mendeteksi aktivitas mencurigakan.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Yang tidak kami lakukan">
        <LegalList
          items={[
            "Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak lain.",
            "Kami tidak menyimpan nomor kartu, PIN, atau kredensial perbankan Anda — pembayaran diproses oleh penyedia pembayaran resmi.",
            "Kami tidak pernah meminta kata sandi atau kode OTP melalui chat.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Pilihan Anda">
        <p>
          Anda berhak mengakses, memperbaiki, atau meminta penghapusan data pribadi Anda sepanjang
          tidak bertentangan dengan kewajiban hukum yang berlaku.
        </p>
        <LegalList
          items={[
            "Meminta salinan data yang kami simpan tentang Anda.",
            "Meminta perbaikan bila ada data yang tidak akurat.",
            "Menarik persetujuan pemrosesan kapan saja.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Hubungi kami">
        <p>
          Ada pertanyaan tentang data Anda? Hubungi tim kami di{" "}
          <a
            href="https://wa.me/6285711172317"
            className="font-semibold text-brand underline underline-offset-2"
          >
            WhatsApp 0857-1117-2317
          </a>{" "}
          pada jam 08.00–22.00 WIB.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
