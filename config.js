// ============================================================
//  config.js — SEMUA PENGATURAN UNDANGAN ADA DI SINI
//  Edit lewat GitHub: klik file ini > ikon pensil > Commit changes
// ============================================================
window.CONFIG = {
  // 1) URL Web App Apps Script (berakhiran /exec). WAJIB diisi.
  apiUrl: 'GANTI_DENGAN_URL_WEB_APP_ANDA',

  // 2) Acara
  judul: 'The Royal Wedding — Hizul & Tania',
  tanggalIso: '2027-07-30T09:00:00+07:00',
  tanggalTeks: 'Jumat, 30 Juli 2027',
  jam: '09:00 WIB - Selesai',
  durasiJam: 4,
  tempat: 'Rumah Mempelai Wanita',
  alamat: 'Jl. Raya Pulo Bambu No.30, RT.2/RW.1, Karangbahagia, Kec. Karangbahagia, Kabupaten Bekasi, Jawa Barat',
  mapsUrl: '',   // kosong = dibuat otomatis dari alamat. Atau isi link Google Maps.
  judulKalender: 'Pernikahan Hizul & Tania',
  detailKalender: 'Akad Nikah & Resepsi Hizul Wahyudin & Tania Renata. Mohon doa restu dan kehadiran Anda.',
  namaDefault: 'Tamu Undangan',

  // 3) Amplop digital
  bank: { nama: 'Bank Mandiri', nomor: '1670004172192', atasNama: 'Hizul Wahyudin' },
  rekeningLain: [
    // { nama: 'Bank BCA', nomor: '1234567890', atasNama: 'Tania Renata' },
    // { nama: 'DANA',     nomor: '081234567890', atasNama: 'Hizul Wahyudin' },
  ],
  kado: { penerima: '', telepon: '', alamat: '' },   // isi alamat agar kartu kado muncul

  // 4) Tiket QR check-in (true = aktif; RAHASIA_QR & PIN diatur di Code.gs)
  qrAktif: true,

  // 5) FOTO, MUSIK, LOGO — ganti dengan mengunggah file ber-nama sama,
  //    atau ubah nama file di bawah ini.
  logo: 'assets/logo/logo.png',
  foto: {
    pria:   'assets/foto/hizul.jpg',
    wanita: 'assets/foto/tania.jpg'
  },
  // Jumlah foto galeri mengikuti isi daftar ini (boleh 4, 6, 9, dst.)
  galeri: [
    'assets/foto/galeri-1.jpg',
    'assets/foto/galeri-2.jpg',
    'assets/foto/galeri-3.jpg',
    'assets/foto/galeri-4.jpg',
    'assets/foto/galeri-5.jpg',
    'assets/foto/galeri-6.jpg'
  ],
  musik: 'assets/musik/musik.mp3'   // kosongkan '' bila tanpa musik
};
