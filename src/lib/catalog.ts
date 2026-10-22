export type ClayIconName =
  | "bolt"
  | "phone"
  | "wifi"
  | "droplet"
  | "shield"
  | "tv"
  | "wallet"
  | "car";

export type CatalogCategory =
  | "listrik"
  | "pulsa"
  | "data"
  | "tagihan"
  | "ewallet"
  | "internet"
  | "cicilan";

export type CatalogProduct = {
  id: string;
  name: string;
  price: number;
  note?: string;
  badge?: string;
  popular?: boolean;
};

export type WalletOption = {
  id: string;
  name: string;
  /** Kode singkat untuk badge */
  short: string;
  /** Warna identitas dompet */
  color: string;
  /** Logo resmi dompet */
  logo?: string;
  /** Nominal top up minimum resmi */
  min: number;
  /** Biaya admin top up lewat kanal pihak ketiga (acuan) */
  fee: number;
  /** Catatan resmi, mis. batas saldo */
  note?: string;
  denominations: number[];
};

export type CatalogItem = {
  slug: string;
  name: string;
  category: CatalogCategory;
  tagline: string;
  description: string;
  icon: string;
  accent: string;
  field: {
    label: string;
    placeholder: string;
    hint: string;
    type: "hp" | "pelanggan";
    /** Tampilkan pilihan operator (hanya relevan untuk pulsa & paket data) */
    operatorPicker?: boolean;
  };
  steps: string[];
  products: CatalogProduct[];
  wallets?: WalletOption[];
  popular?: boolean;
};

export const categoryList: { id: CatalogCategory | "all"; label: string }[] = [
  { id: "all", label: "Semua produk" },
  { id: "listrik", label: "Token Listrik" },
  { id: "pulsa", label: "Pulsa" },
  { id: "data", label: "Paket Data" },
  { id: "tagihan", label: "Tagihan" },
  { id: "ewallet", label: "E-Wallet" },
  { id: "internet", label: "TV & Internet" },
  { id: "cicilan", label: "Cicilan" },
];

export const catalog: CatalogItem[] = [
  {
    slug: "token-listrik-pln",
    name: "Token Listrik PLN",
    category: "listrik",
    tagline: "Token listrik PLN prepaid, langsung masuk meter.",
    description:
      "Beli token listrik PLN untuk meter rumah, kos, atau ruko. Nominal mulai Rp 25.000 sampai Rp 1.000.000. Token dikirim ke ID pelanggan dan meter Anda setelah pembayaran terkonfirmasi.",
    icon: "zap",
    accent: "amber",
    popular: true,
    field: {
      label: "ID Pelanggan / Nomor Meter",
      placeholder: "Contoh: 512340012345",
      hint: "Nomor meter atau ID pelanggan sesuai tagihan PLN.",
      type: "pelanggan",
    },
    steps: [
      "Masukkan ID pelanggan atau nomor meter PLN.",
      "Pilih nominal token yang tersedia.",
      "Pilih metode pembayaran.",
      "Simpan nomor invoice untuk cek status.",
      "Bayar dan token otomatis masuk ke meter Anda.",
    ],
    products: [
      { id: "t25", name: "Token Listrik 25.000", price: 25000 },
      { id: "t50", name: "Token Listrik 50.000", price: 50000 },
      { id: "t100", name: "Token Listrik 100.000", price: 100000, badge: "Terlaris", popular: true },
      { id: "t150", name: "Token Listrik 150.000", price: 150000 },
      { id: "t200", name: "Token Listrik 200.000", price: 200000 },
      { id: "t300", name: "Token Listrik 300.000", price: 300000 },
      { id: "t500", name: "Token Listrik 500.000", price: 500000 },
      { id: "t1000", name: "Token Listrik 1.000.000", price: 1000000 },
    ],
  },
  {
    slug: "pulsa",
    name: "Pulsa",
    category: "pulsa",
    tagline: "Pulsa semua operator, operator terdeteksi otomatis.",
    description:
      "Isi pulsa Telkomsel, Indosat, XL, Axis, Tri, dan Smartfren. Operator dibaca otomatis dari nomor HP tujuan, jadi cukup ketik nomor lalu pilih nominalnya.",
    icon: "smartphone",
    accent: "blue",
    popular: true,
    field: {
      label: "Nomor HP Tujuan",
      placeholder: "Contoh: 081234567890",
      hint: "Operator terdeteksi otomatis dari awalan nomor.",
      type: "hp",
      operatorPicker: true,
    },
    steps: [
      "Masukkan nomor HP tujuan.",
      "Operator terdeteksi otomatis, cek ulang di layar.",
      "Pilih nominal pulsa.",
      "Pilih metode pembayaran.",
      "Pulsa masuk dalam hitungan detik setelah pembayaran.",
    ],
    products: [
      { id: "p10", name: "Pulsa 10.000", price: 10000 },
      { id: "p15", name: "Pulsa 15.000", price: 15000 },
      { id: "p25", name: "Pulsa 25.000", price: 25000, badge: "Terlaris", popular: true },
      { id: "p50", name: "Pulsa 50.000", price: 50000 },
      { id: "p75", name: "Pulsa 75.000", price: 75000 },
      { id: "p100", name: "Pulsa 100.000", price: 100000 },
      { id: "p150", name: "Pulsa 150.000", price: 150000 },
      { id: "p200", name: "Pulsa 200.000", price: 200000 },
    ],
  },
  {
    slug: "paket-data",
    name: "Paket Data",
    category: "data",
    tagline: "Kuota internet harian sampai 30 hari.",
    description:
      "Pilih paket data sesuai pemakaian: harian untuk aktivitas ringan, atau paket 30 hari untuk pemakaian berat. Berlaku sesuai ketentuan operator.",
    icon: "wifi",
    accent: "teal",
    popular: true,
    field: {
      label: "Nomor HP Tujuan",
      placeholder: "Contoh: 081234567890",
      hint: "Operator terdeteksi otomatis dari awalan nomor.",
      type: "hp",
      operatorPicker: true,
    },
    steps: [
      "Masukkan nomor HP tujuan.",
      "Cek operator yang terdeteksi otomatis.",
      "Pilih paket data sesuai kebutuhan.",
      "Pilih metode pembayaran.",
      "Kuota aktif otomatis setelah pembayaran terkonfirmasi.",
    ],
    products: [
      { id: "d1", name: "Data 1 GB / 7 Hari", price: 20000 },
      { id: "d3", name: "Data 3 GB / 15 Hari", price: 30000 },
      { id: "d5", name: "Data 5 GB / 30 Hari", price: 45000, badge: "Terlaris", popular: true },
      { id: "d10", name: "Data 10 GB / 30 Hari", price: 70000 },
      { id: "d15", name: "Data 15 GB / 30 Hari", price: 90000 },
      { id: "d20", name: "Data 20 GB / 45 Hari", price: 120000 },
      { id: "du", name: "Unlimited / 30 Hari", price: 150000, note: "Batas kuota harian 20 GB" },
    ],
  },
  {
    slug: "bpjs-kesehatan",
    name: "BPJS Kesehatan",
    category: "tagihan",
    tagline: "Iuran 1 sampai 6 bulan sekaligus.",
    description:
      "Bayar iuran BPJS Kesehatan kelas 3 untuk 1 sampai 6 bulan dalam satu pembayaran. Pilih periode iuran, isi NIK peserta, status aktif berlaku setelah pembayaran terkonfirmasi.",
    icon: "shield-check",
    accent: "green",
    field: {
      label: "NIK Peserta",
      placeholder: "Contoh: 3273xxxxxxxxxxxx",
      hint: "NIK sesuai kartu BPJS peserta.",
      type: "pelanggan",
    },
    steps: [
      "Masukkan NIK peserta BPJS.",
      "Pilih periode iuran 1 sampai 6 bulan.",
      "Pilih metode pembayaran.",
      "Simpan nomor invoice untuk cek status.",
      "Status aktif berlaku setelah pembayaran diterima.",
    ],
    products: [
      { id: "b1", name: "Iuran 1 Bulan", price: 35000 },
      { id: "b2", name: "Iuran 2 Bulan", price: 70000, badge: "Hemat" },
      { id: "b3", name: "Iuran 3 Bulan", price: 105000 },
      { id: "b4", name: "Iuran 4 Bulan", price: 140000 },
      { id: "b5", name: "Iuran 5 Bulan", price: 175000 },
      { id: "b6", name: "Iuran 6 Bulan", price: 210000, badge: "Paling hemat", popular: true },
    ],
  },
  {
    slug: "pdam",
    name: "PDAM",
    category: "tagihan",
    tagline: "Tagihan air bersih seluruh wilayah.",
    description:
      "Bayar tagihan PDAM sesuai wilayah pelanggan. Pilih kota atau kabupaten, masukkan ID pelanggan, lalu tagihan diverifikasi otomatis sebelum pembayaran.",
    icon: "droplet",
    accent: "sky",
    field: {
      label: "ID Pelanggan PDAM",
      placeholder: "Contoh: 1234567890",
      hint: "ID pelanggan tercetak di tagihan air.",
      type: "pelanggan",
    },
    steps: [
      "Pilih wilayah PDAM.",
      "Masukkan ID pelanggan.",
      "Pilih periode tagihan.",
      "Pilih metode pembayaran.",
      "Tagihan lunas dan bukti tersimpan di invoice.",
    ],
    products: [
      { id: "w1", name: "Tagihan 1 Bulan", price: 95000 },
      { id: "w3", name: "Tagihan 3 Bulan", price: 285000, badge: "Hemat" },
      { id: "w6", name: "Tagihan 6 Bulan", price: 570000, badge: "Paling hemat", popular: true },
    ],
  },
  {
    slug: "tv-internet",
    name: "TV & Internet",
    category: "internet",
    tagline: "Langganan TV kabel dan internet rumahan.",
    description:
      "Bayar tagihan TV kabel dan internet rumahan dari provider di wilayah Anda. Pilih paket, masukkan nomor pelanggan, tagihan langsung diverifikasi.",
    icon: "tv",
    accent: "violet",
    field: {
      label: "Nomor Pelanggan",
      placeholder: "Contoh: 8871234",
      hint: "Nomor pelanggan dari tagihan TV atau internet.",
      type: "pelanggan",
    },
    steps: [
      "Masukkan nomor pelanggan.",
      "Pilih paket TV atau internet.",
      "Pilih metode pembayaran.",
      "Simpan nomor invoice untuk cek status.",
      "Tagihan lunas dan layanan tetap aktif.",
    ],
    products: [
      { id: "tv30", name: "TV Kabel 30 Channel", price: 115000 },
      { id: "tv90", name: "TV Kabel 90 Channel", price: 175000, badge: "Terlaris", popular: true },
      { id: "net10", name: "Internet 10 Mbps", price: 215000 },
      { id: "net20", name: "Internet 20 Mbps", price: 275000 },
      { id: "net30", name: "Internet + TV 30 Mbps", price: 385000, badge: "Paket hemat" },
    ],
  },
  {
    slug: "e-wallet",
    name: "E-Wallet",
    category: "ewallet",
    tagline: "Top up DANA, OVO, GoPay, ShopeePay, LinkAja.",
    description:
      "Isi saldo e-wallet dan bayar tagihan langsung dari aplikasi. Pilih dompet digital, masukkan nomor HP terdaftar, lalu pilih nominal top up sesuai ketentuan minimum masing-masing penyedia.",
    icon: "wallet",
    accent: "indigo",
    field: {
      label: "Nomor HP E-Wallet",
      placeholder: "Contoh: 081234567890",
      hint: "Nomor HP yang terdaftar di aplikasi e-wallet.",
      type: "hp",
    },
    steps: [
      "Masukkan nomor HP terdaftar di dompet digital.",
      "Pilih dompet digital yang akan diisi.",
      "Pilih nominal top up, minimal sesuai dompet.",
      "Pilih metode pembayaran.",
      "Saldo masuk otomatis ke dompet Anda.",
    ],
    wallets: [
      {
        id: "dana",
        logo: "/images/payments/dana.svg",
        name: "DANA",
        short: "DANA",
        color: "#1189D6",
        min: 10000,
        fee: 500,
        note: "Limit saldo Rp 2.000.000",
        denominations: [10000, 20000, 50000, 100000, 200000, 500000, 1000000],
      },
      {
        id: "ovo",
        logo: "/images/payments/ovo.svg",
        name: "OVO",
        short: "OVO",
        color: "#4C2A85",
        min: 20000,
        fee: 1000,
        note: "Top up dari mobile banking gratis",
        denominations: [20000, 50000, 100000, 200000, 500000, 1000000],
      },
      {
        id: "gopay",
        logo: "/images/payments/gopay.png",
        name: "GoPay",
        short: "GOP",
        color: "#00A99D",
        min: 10000,
        fee: 1000,
        note: "Top up dari mobile banking gratis",
        denominations: [10000, 20000, 50000, 100000, 200000, 500000, 1000000],
      },
      {
        id: "shopeepay",
        logo: "/images/payments/shopeepay.svg",
        name: "ShopeePay",
        short: "SHP",
        color: "#EE4D2D",
        min: 10000,
        fee: 1000,
        note: "Limit saldo Rp 2.000.000",
        denominations: [10000, 20000, 50000, 100000, 200000, 500000],
      },
      {
        id: "linkaja",
        name: "LinkAja",
        short: "LKA",
        color: "#1F8A70",
        min: 20000,
        fee: 1500,
        note: "Top up dari mobile banking gratis",
        denominations: [20000, 50000, 100000, 200000, 500000],
      },
    ],
    products: [
      { id: "e25", name: "Top Up 25.000", price: 25000 },
      { id: "e50", name: "Top Up 50.000", price: 50000 },
      { id: "e100", name: "Top Up 100.000", price: 100000 },
      { id: "e150", name: "Top Up 150.000", price: 150000 },
      { id: "e250", name: "Top Up 250.000", price: 250000, badge: "Terlaris", popular: true },
      { id: "e500", name: "Top Up 500.000", price: 500000 },
    ],
  },
  {
    slug: "multifinance",
    name: "Multifinance",
    category: "cicilan",
    tagline: "Cicilan kendaraan dan kredit tanpa ribet.",
    description:
      "Ajukan cicilan motor, mobil, atau gadget dari mitra multifinance. Tenor fleksibel, proses cepat, dan pembayaran cicilan berikutnya bisa dibayar di sini.",
    icon: "car",
    accent: "rose",
    field: {
      label: "Nomor HP Pemohon",
      placeholder: "Contoh: 081234567890",
      hint: "Nomor HP yang dipakai untuk tahap verifikasi.",
      type: "hp",
    },
    steps: [
      "Masukkan nomor HP pemohon.",
      "Pilih produk dan tenor.",
      "Pilih metode pembayaran untuk biaya admin.",
      "Simpan nomor invoice untuk cek status.",
      "Tim kami menghubungi Anda untuk verifikasi.",
    ],
    products: [
      { id: "mf-motor", name: "Cicilan Motor", price: 1200000, note: "Tenor 12–36 bulan" },
      { id: "mf-mobil", name: "Cicilan Mobil", price: 2900000, note: "Tenor 12–36 bulan" },
      { id: "mf-hp", name: "Cicilan HP", price: 900000, note: "Tenor 6–24 bulan", popular: true },
      { id: "mf-el", name: "Cicilan Elektronik", price: 750000, note: "Tenor 6–24 bulan" },
    ],
  },
];

export function getItem(slug: string) {
  return catalog.find((item) => item.slug === slug);
}

export type PaymentGroup = "qris" | "ewallet" | "retail" | "va";

export type PaymentChannel = {
  id: string;
  name: string;
  group: PaymentGroup;
  fee: number;
  note: string;
  code?: string;
  /** Logo kanal pembayaran asli */
  logo?: string;
};

export const paymentChannels: PaymentChannel[] = [
  { id: "qris", logo: "/images/payments/qris.png", name: "QRIS", group: "qris", fee: 1000, note: "Rekomendasi - dicek otomatis" },
  { id: "ovo", logo: "/images/payments/ovo.svg", name: "OVO", group: "ewallet", fee: 1500, note: "Saldo OVO - dicek otomatis" },
  { id: "dana", logo: "/images/payments/dana.svg", name: "DANA", group: "ewallet", fee: 1500, note: "Saldo DANA - dicek otomatis" },
  { id: "gopay", logo: "/images/payments/gopay.png", name: "GoPay", group: "ewallet", fee: 1500, note: "Saldo GoPay - dicek otomatis" },
  { id: "shopeepay", logo: "/images/payments/shopeepay.svg", name: "ShopeePay", group: "ewallet", fee: 1500, note: "Saldo ShopeePay - dicek otomatis" },
  { id: "alfamart", logo: "/images/payments/alfamart.svg", name: "Alfamart", group: "retail", fee: 2500, note: "Bayar di gerai - dicek otomatis" },
  { id: "indomaret", logo: "/images/payments/indomaret.png", name: "Indomaret", group: "retail", fee: 2500, note: "Bayar di gerai - dicek otomatis" },
  { id: "bri", logo: "/images/payments/bri.svg", name: "BRI VA", group: "va", fee: 2500, note: "Virtual Account BRI", code: "26215" },
  { id: "bni", logo: "/images/payments/bni.svg", name: "BNI VA", group: "va", fee: 2500, note: "Virtual Account BNI", code: "98801" },
  { id: "mandiri", logo: "/images/payments/mandiri.svg", name: "Mandiri VA", group: "va", fee: 2500, note: "Virtual Account Mandiri", code: "88908" },
  { id: "bca", logo: "/images/payments/bca.svg", name: "BCA VA", group: "va", fee: 2500, note: "Virtual Account BCA", code: "8808" },
];

export const promoCodes: Record<string, { percent: number; label: string }> = {
  FULGORA5: { percent: 5, label: "Diskon 5% untuk transaksi pertama" },
  FULGORA10: { percent: 10, label: "Diskon 10% sampai 31 Agustus" },
};

export const operators: {
  id: string;
  name: string;
  color: string;
  logo: string;
  prefixes: string[];
}[] = [
  {
    id: "telkomsel",
    name: "Telkomsel",
    color: "#E4002B",
    logo: "/images/operators/telkomsel.png",
    prefixes: ["0811", "0812", "0813", "0821", "0822", "0823", "0851", "0852", "0853"],
  },
  {
    id: "indosat",
    name: "Indosat",
    color: "#F0A500",
    logo: "/images/operators/indosat.svg",
    prefixes: ["0814", "0815", "0816", "0855", "0856", "0857", "0858"],
  },
  {
    id: "xl",
    name: "XL",
    color: "#2E7CD6",
    logo: "/images/operators/xl.png",
    prefixes: ["0817", "0818", "0819", "0859", "0877", "0878", "0879"],
  },
  {
    id: "axis",
    name: "Axis",
    color: "#0E8C4A",
    logo: "/images/operators/axis.jpg",
    prefixes: ["0831", "0832", "0833", "0838"],
  },
  {
    id: "tri",
    name: "Tri",
    color: "#8A2BE2",
    logo: "/images/operators/tri.svg",
    prefixes: ["0895", "0896", "0897", "0898", "0899"],
  },
  {
    id: "smartfren",
    name: "Smartfren",
    color: "#D8232A",
    logo: "/images/operators/smartfren.svg",
    prefixes: ["0881", "0882", "0883", "0884", "0885", "0886", "0887", "0888", "0889"],
  },
];

export function detectOperator(number: string) {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 3) return null;
  const local = digits.startsWith("62") ? `0${digits.slice(2)}` : digits;
  return operators.find((operator) => operator.prefixes.some((prefix) => local.startsWith(prefix))) ?? null;
}

export const SITE_CONTACT = {
  whatsapp: "6281200000000",
  whatsappDisplay: "0812-0000-0000",
  email: "halo@fulgoraseluler.id",
};

export const faqs = [
  {
    q: "Berapa lama transaksi diproses?",
    a: "Rata-rata 3 detik setelah pembayaran terdeteksi. Token listrik dan paket data biasanya masuk 1–5 detik.",
  },
  {
    q: "Apakah perlu membuat akun?",
    a: "Tidak. Cukup nomor tujuan saja. Akun baru dibuat otomatis saat pesanan pertama.",
  },
  {
    q: "Metode pembayaran apa saja yang tersedia?",
    a: "QRIS, e-wallet (OVO, DANA, GoPay, ShopeePay, LinkAja), gerai ritel (Alfamart, Indomaret), dan virtual account BRI, BNI, Mandiri, BCA.",
  },
  {
    q: "Bagaimana kalau pembayaran gagal?",
    a: "Saldo dan virtual account otomatis dilepas kembali, biaya admin tidak dipotong, dan pesanan berstatus gagal.",
  },
  {
    q: "Bisakah memakai kode promo?",
    a: "Bisa. Masukkan kode promo pada langkah ke-4 sebelum membayar. Satu kode per pesanan.",
  },
  {
    q: "Bagaimana cara melacak pesanan?",
    a: "Nomor invoice muncul setelah menekan tombol pesan. Simpan nomor itu, atau buka halaman Cek Transaksi kapan saja.",
  },
];

export const testimonials = [
  { name: "Rina Handayani", city: "Surabaya", item: "Token Listrik PLN", text: "Beli token cukup dari HP, prosesnya cepat dan tidak perlu antre." },
  { name: "Bagus Prasetyo", city: "Bandung", item: "Paket Data", text: "Operator terbaca otomatis jadi tidak salah pilih paket data." },
  { name: "Siti Nurhaliza", city: "Jakarta", item: "BPJS Kesehatan", text: "Iuran 6 bulan sekali, praktis dan cepat." },
  { name: "Dimas Anggara", city: "Semarang", item: "PDAM", text: "Dulu antre di loket, sekarang beres dalam hitungan detik." },
  { name: "Andi Wijaya", city: "Yogyakarta", item: "E-Wallet", text: "Biaya admin-nya masuk akal, tidak mahal seperti minimarket." },
  { name: "Melati Sari", city: "Makassar", item: "Cicilan Motor", text: "Simulasi cicilannya jelas sebelum saya apply." },
];
