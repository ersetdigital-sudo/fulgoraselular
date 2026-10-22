# fulgora seluler — Versi 2 (katalog + step form)

Versi kedua dari website PPOB **fulgora seluler**. Dibuat sebagai proyek terpisah dari Versi 1
(`../game`), dengan palet dan struktur yang berbeda total.

| | Versi 1 (`../game`) | Versi 2 (ini) |
|---|---|---|
| Tema | Dark, hitam pekat + oranye | Light, paper putih + biru elektrik |
| Aksen | `#FF7A00` oranye | `#1D4ED8` biru + `#0E9FB8` teal |
| Huruf | Plus Jakarta Sans + Inter | Sora + DM Sans, Space Grotesk (wordmark) |
| Ikon | Icon 3D clay oranye (SVG custom) | Icon garis lucide, warna per kategori |
| Struktur | Landing page: hero, feed transaksi, marquee, promo, grid kategori, cara order, testimoni, FAQ | Katalog: beranda pencarian, filter + sortir harga, halaman produk **form 5 langkah** ala nxastore.com, ringkasan order lengket, kode promo, cek transaksi |
| Biaya admin | Flat per layanan | **Berbeda per metode pembayaran** |

## Menjalankan

```bash
npm install
npm run dev -- -p 3200   # http://localhost:3200
npm run build && npm start
```

## Struktur

```
src/
  app/
    layout.tsx                 # font Sora + DM Sans, header, footer
    page.tsx                   # beranda: hero pencarian, kategori, katalog, cara beli, metode, testimoni, FAQ
    produk/[slug]/page.tsx     # halaman produk + form pemesanan
    pesanan/[id]/page.tsx      # invoice, instruksi bayar, countdown 15 menit, QR
    cek-transaksi/page.tsx     # lacak invoice
  components/
    checkout-form.tsx          # form 5 langkah + ringkasan order (lengket di desktop)
    catalog-browser.tsx        # filter kategori, pencarian, sortir harga
    order-panel.tsx            # invoice + QR + countdown
    transaction-checker.tsx    # cek status pesanan
    service-icon.tsx, faq.tsx, site-header.tsx, site-footer.tsx, brand-logo.tsx
  lib/
    catalog.ts                 # SEMUA produk, harga, metode bayar, promo, FAQ
    format.ts
```

## Kode QRIS

Gambar QRIS merchant disimpan lokal di **`public/images/qris-merchant.jpg`** (1135×1600, foto asli dari
Cloudinary) dan dirender dengan `next/image` + `unoptimized` di halaman pesanan, supaya QR tetap
tajam dan bisa discan. Ganti file tersebut untuk memakai QRIS/NMID lain.

Saat ini **hanya QRIS yang aktif**: tab E-Wallet / Gerai / Virtual Account dimatikan (`disabled` +
label "Segera"). Mengaktifkannya lagi: ubah `entry.id !== "qris"` dan `channel.id !== "qris"` di
`src/components/checkout-form.tsx`.

## Cek Transaksi

Halaman `/cek-transaksi` mengambil data dari `GET /api/orders/{invoice}` (route handler di
`src/app/api/orders/[invoice]/route.ts`, sumber data di `src/lib/orders.ts` → `findOrder()`).
Invoice yang tidak ada mengembalikan 404 dan UI menampilkan "Invoice tidak ditemukan" — tidak ada
nomor contoh atau teks demo di halaman. Ganti `findOrder` dengan query database/API partner saat
backend siap.

## Tombol "Saya sudah bayar" (v2)

Berbeda dari v1 (yang memakai state inline di halaman checkout), v2 memakai **halaman verifikasi
terpisah**: `/pesanan/[id]/verifikasi`.

| | v1 (inline) | v2 (halaman terpisah) |
|---|---|---|
| Alur | Tombol mengganti panel QR di halaman checkout | Tombol **m navigasi** ke route `/verifikasi` |
| Status | Timer lokal (simulasi) | **Polling `GET /api/orders/{invoice}` tiap 3 detik** |
| Tampilan | Checklist horizontal di dalam panel | **Timeline vertikal** bernomor + status per langkah ("Menunggu"/"Sedang berjalan…"/"Selesai") + indikator "diperbarui otomatis" |
| Sidebar | Ringkasan order | QR mini + timer berjalan + ringkasan order + 2 tombol aksi |

## Ganti harga & konten

Semua ada di **`src/lib/catalog.ts`**:

- `catalog[]` — produk per layanan: `products[].price` (angka) dan `name`.
- `catalog[].wallets[]` — khusus layanan E-Wallet: daftar dompet digital (DANA, OVO, GoPay, ShopeePay, LinkAja) lengkap dengan **nominal top up minimum**, **biaya admin acuan**, **catatan resmi** (mis. batas saldo), **warna merek**, dan **logo resmi**. Pilih dompet di form → daftar nominal menyesuaikan (OVO mulai Rp 20.000, DANA mulai Rp 10.000, dst).
- `catalog[].field.operatorPicker` — hanya `pulsa` dan `paket-data` yang memakai `true`, jadi deteksi operator (dan logo provider) **tidak muncul** di E-Wallet/Multifinance.
- `paymentChannels[]` — metode pembayaran beserta `fee` (biaya admin per metode).
- `promoCodes` — kode promo (`FULGORA5` = 5%, `FULGORA10` = 10%).
- `operators[]` + `detectOperator()` — deteksi operator dari awalan nomor HP (tabel prefix sudah diverifikasi: Telkomsel 0811–0813/0821–0823/0851–0853, Indosat 0814–0816/0855–0858, XL 0817–0819/0859/0877–0879, Axis 0831–0833/0838, Tri 0895–0899, Smartfren 0881–0889).
- `faqs`, `testimonials` — teks marketing.

## Sumber data yang dipakai

- Minimal top up & biaya admin e-wallet: ketentuan resmi penyedia yang dirangkum Kontan, Flip Help Center, GoPay, dan BRI (2025–2026).
- Prefix operator: alokasi nomoring operator Indonesia (Wikipedia, Tirto, detikcom).

> Semua nominal masih **contoh** dan perlu disesuaikan dengan tarif mitra Anda sebelum dipakai produksi.

## Catatan

- Semua harga masih contoh, ganti di `src/lib/catalog.ts`.
- Transaksi masih simulasi (belum ada API pembayaran). Nomor invoice demo untuk halaman Cek Transaksi:
  `FGL-25092024-001` (selesai), `-002` (diproses), `-003` (menunggu), `-004` (gagal).
- Tidak ada input nomor WhatsApp di form anymore; tombol bantuan memakai nomor WhatsApp konstan
  (`SITE_CONTACT.whatsapp` di `src/lib/catalog.ts`).
- Ikon memakai `lucide-react` (SVG inline, selalu tampil). Wordmark brand ada di `src/components/brand-logo.tsx` — ganti dengan file brand kit Anda.
