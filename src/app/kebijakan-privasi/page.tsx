import type { Metadata } from "next";
import { LegalList, LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan Privasi fulgora seluler: cara kami mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi Anda.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Kebijakan Privasi"
      updated="22 Oktober 2026"
      intro="Kebijakan ini menjelaskan bagaimana fulgora seluler mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi Anda saat menggunakan situs dan layanan kami."
    >
      <LegalSection title="Pendahuluan">
        <p>
          Dengan mengakses situs dan menggunakan layanan fulgora seluler, Anda menyetujui praktik
          yang dijelaskan dalam kebijakan ini. Bila Anda tidak setuju, mohon tidak melanjutkan
          penggunaan layanan.
        </p>
        <p>
          Situs ini masih berstatus simulasi, sehingga transaksi yang berjalan hanya untuk keperluan
          demonstrasi.
        </p>
      </LegalSection>

      <LegalSection title="Data pribadi yang kami kumpulkan">
        <LegalList
          items={[
            "Data identitas layanan: nomor HP, ID pelanggan, atau ID meter yang Anda masukkan.",
            "Data kontak: nama dan nomor WhatsApp.",
            "Data transaksi: produk, nominal, metode pembayaran, waktu, dan status pesanan.",
            "Data teknis: alamat IP, jenis perangkat, dan halaman yang Anda akses.",
            "Korespondensi: isi percakapan ketika Anda menghubungi dukungan.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Dasar dan tujuan pemrosesan">
        <p>
          Kami memproses data Anda untuk menjalankan perjanjian layanan, memenuhi kewajiban hukum,
          dan atas dasar kepentingan sah kami, antara lain:
        </p>
        <LegalList
          items={[
            "Menyelesaikan transaksi dan meneruskan pesanan ke penyedia layanan.",
            "Memberikan dukungan, menangani keluhan, serta memproses pengembalian dana.",
            "Mencegah penipuan dan menjaga keamanan layanan.",
            "Memenuhi kewajiban pencatatan sesuai peraturan yang berlaku.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Pembagian data kepada pihak ketiga">
        <p>Kami hanya membagikan data sejauh diperlukan untuk menyelesaikan pesanan Anda, kepada:</p>
        <LegalList
          items={[
            "Penyedia layanan, seperti operator seluler, PLN, PDAM, dan sejenisnya.",
            "Penyedia pembayaran dan mitra kanal pembayaran.",
            "Aparat penegak hukum atau regulator, bila diwajibkan oleh peraturan.",
          ]}
        />
        <p>
          Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak ketiga untuk tujuan
          pemasaran.
        </p>
      </LegalSection>

      <LegalSection title="Penyimpanan dan retensi">
        <p>
          Kami menyimpan data pada server yang kami kelola dan mitra tepercaya dengan periode
          sebagai berikut:
        </p>
        <LegalList
          items={[
            "Data transaksi disimpan selama masa yang diwajibkan oleh peraturan yang berlaku.",
            "Data teknis disimpan dalam periode terbatas untuk keamanan dan analisis.",
            "Setelah tidak diperlukan, data dihapus atau dianonimkan.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Keamanan data">
        <p>
          Kami menerapkan langkah teknis dan organisasi yang wajar, termasuk koneksi terenkripsi
          (HTTPS), pembatasan akses internal, dan pemantauan aktivitas mencurigakan. Meski demikian,
          tidak ada sistem yang sepenuhnya bebas risiko, sehingga kami menyarankan Anda menjaga
          kerahasiaan data pesanan Anda.
        </p>
      </LegalSection>

      <LegalSection title="Hak Anda">
        <p>Sebagai pemilik data, Anda berhak untuk:</p>
        <LegalList
          items={[
            "Meminta akses dan salinan data pribadi Anda.",
            "Meminta perbaikan data yang tidak akurat.",
            "Meminta penghapusan data sepanjang tidak dibatasi kewajiban hukum.",
            "Menarik persetujuan pemrosesan kapan saja.",
            "Mengajukan keberatan atau pengaduan atas pemrosesan data Anda.",
          ]}
        />
        <p>
          Untuk menggunakan hak tersebut, hubungi kami melalui kanal yang tercantum pada bagian
          Kontak.
        </p>
      </LegalSection>

      <LegalSection title="Cookie dan teknologi serupa">
        <p>
          Situs dapat menggunakan cookie atau penyimpanan lokal secara minimal untuk mengingat
          preferensi dan mengukur performa halaman. Anda dapat mengelola atau menonaktifkan cookie
          melalui pengaturan peramban Anda.
        </p>
      </LegalSection>

      <LegalSection title="Pengguna di bawah umur">
        <p>
          Layanan ini ditujukan untuk pengguna berusia 18 tahun ke atas. Bila kami mengetahui adanya
          data anak yang dikumpulkan tanpa izin, kami akan menghapusnya. Hubungi kami bila Anda
          menemukan hal tersebut.
        </p>
      </LegalSection>

      <LegalSection title="Perubahan kebijakan">
        <p>
          Kami dapat memperbarui kebijakan ini dari waktu ke waktu. Tanggal revisi pada bagian atas
          halaman akan diperbarui, dan perubahan yang bersifat material akan diberitahukan melalui
          situs.
        </p>
      </LegalSection>

      <LegalSection title="Kontak">
        <p>
          Pertanyaan tentang kebijakan ini dapat disampaikan ke{" "}
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
