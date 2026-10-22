import type { Metadata } from "next";
import { LegalList, LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Syarat & Ketentuan penggunaan layanan fulgora seluler, termasuk ketentuan pemesanan, pembayaran, dan pengembalian dana.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Syarat & Ketentuan"
      updated="22 Oktober 2026"
      intro="Dengan mengakses dan bertransaksi di fulgora seluler, Anda menyetujui ketentuan berikut. Mohon dibaca sebelum memesan."
    >
      <LegalSection title="Penerimaan ketentuan">
        <p>
          Dengan mengakses situs fulgora seluler dan melakukan pemesanan, Anda dianggap telah
          membaca, memahami, dan menyetujui Syarat & Ketentuan ini. Bila Anda tidak menyetujuinya,
          mohon tidak menggunakan layanan.
        </p>
      </LegalSection>

      <LegalSection title="Definisi">
        <LegalList
          items={[
            "“Kami” atau “fulgora seluler” adalah pengelola situs dan layanan ini.",
            "“Anda” adalah pengguna yang mengakses situs atau melakukan pemesanan.",
            "“Layanan” adalah kanal pembelian produk digital dan pembayaran tagihan yang tersedia di situs.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Layanan kami">
        <p>
          fulgora seluler menyediakan kanal untuk membeli produk prabayar dan membayar tagihan,
          antara lain token listrik, pulsa, paket data, BPJS, PDAM, dan e-wallet. Produk serta harga
          yang tampil merupakan contoh dan dapat berubah sewaktu-waktu tanpa pemberitahuan lebih
          dulu.
        </p>
        <p>
          Situs ini masih berstatus simulasi: transaksi tidak menyalurkan produk sungguhan dan hanya
          ditujukan untuk keperluan demonstrasi.
        </p>
      </LegalSection>

      <LegalSection title="Pemesanan tanpa registrasi">
        <LegalList
          items={[
            "Anda tidak perlu membuat akun untuk memesan.",
            "Anda bertanggung jawab atas kebenaran nomor atau ID pelanggan yang dimasukkan.",
            "Pesanan yang sudah dibayar dengan data yang salah tidak dapat dibatalkan.",
            "Simpan nomor invoice Anda untuk melacak status pesanan di halaman Cek Transaksi.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Harga dan biaya">
        <p>
          Harga produk ditampilkan secara jelas sebelum Anda membayar. Biaya admin dapat berbeda
          untuk setiap metode pembayaran dan selalu ditampilkan sebelum pembayaran, sehingga tidak
          ada biaya tersembunyi.
        </p>
      </LegalSection>

      <LegalSection title="Pembayaran">
        <p>
          Pembayaran dilakukan melalui kanal resmi yang tersedia, seperti QRIS, e-wallet, gerai
          ritel, atau virtual account. Pesanan diproses setelah pembayaran terverifikasi, dan setiap
          pesanan memiliki batas waktu pembayaran.
        </p>
      </LegalSection>

      <LegalSection title="Pembatalan dan pengembalian dana">
        <LegalList
          items={[
            "Pesanan yang belum dibayar akan otomatis dibatalkan setelah batas waktu terlewati.",
            "Transaksi yang sudah diteruskan ke penyedia layanan tidak dapat dibatalkan.",
            "Dana dikembalikan bila layanan gagal diselesaikan, misalnya produk tidak terkirim, sesuai kebijakan penyedia.",
            "Pengembalian dana dikirim ke metode pembayaran asal; waktu proses bergantung pada kanal pembayaran.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Kewajiban pengguna">
        <LegalList
          items={[
            "Tidak menyalahgunakan layanan untuk tindakan melanggar hukum.",
            "Tidak melakukan penipuan, pencucian uang, atau aktivitas terlarang lainnya.",
            "Tidak mengganggu, merusak, atau mengakses sistem tanpa izin.",
            "Menggunakan layanan hanya untuk tujuan yang sah.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Kekayaan intelektual">
        <p>
          Nama, logo, dan seluruh materi di situs ini dilindungi hak kekayaan intelektual. Anda tidak
          diperbolehkan menyalin atau menggunakannya untuk kepentingan komersial tanpa izin tertulis
          dari kami.
        </p>
      </LegalSection>

      <LegalSection title="Batasan tanggung jawab">
        <p>
          Layanan disediakan “sebagaimana adanya”. Sejauh diizinkan hukum, kami tidak bertanggung
          jawab atas gangguan yang berasal dari pihak ketiga, kesalahan input data oleh pengguna,
          atau keadaan di luar kendali kami. Tanggung jawab kami, bila ada, dibatasi pada nilai
          transaksi terkait.
        </p>
      </LegalSection>

      <LegalSection title="Keadaan di luar kendali">
        <p>
          Kami tidak dianggap lalai atas keterlambatan atau kegagalan yang disebabkan oleh keadaan di
          luar kendali kami, seperti gangguan jaringan, pemadaman listrik, kebijakan penyedia
          layanan, atau bencana alam.
        </p>
      </LegalSection>

      <LegalSection title="Perubahan ketentuan">
        <p>
          Kami dapat mengubah Syarat & Ketentuan ini sewaktu-waktu. Versi terbaru selalu tersedia di
          halaman ini, dan tanggal revisi pada bagian atas akan diperbarui.
        </p>
      </LegalSection>

      <LegalSection title="Hukum yang berlaku dan penyelesaian sengketa">
        <p>
          Ketentuan ini tunduk pada hukum Republik Indonesia. Setiap perselisihan diupayakan
          diselesaikan secara musyawarah terlebih dahulu sebelum menempuh jalur hukum.
        </p>
      </LegalSection>

      <LegalSection title="Kontak">
        <p>
          Pertanyaan mengenai ketentuan ini dapat disampaikan ke{" "}
          <a
            href="https://wa.me/6281200000000"
            className="font-semibold text-brand underline underline-offset-2"
          >
            WhatsApp 0812-0000-0000
          </a>{" "}
          pada jam 08.00–22.00 WIB.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
