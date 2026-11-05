/* ===== PENGATURAN UNDANGAN — edit file ini saja ===== */
window.UNDANGAN = {
  // URL Web App Apps Script (berakhiran /exec). Kosongkan = mode preview (RSVP tidak terkirim)
  apiUrl: '',

  namaDefault: 'Tamu Undangan',
  tanggalIso: '2027-07-30T09:00:00+07:00',
  tanggalTeks: 'Jumat, 30 Juli 2027',
  jam: '09:00 WIB - Selesai',
  durasiJam: 4,
  tempat: 'Rumah Mempelai Wanita',
  alamat: 'Jl. Raya Pulo Bambu No.30, RT.2/RW.1, Karangbahagia, Kec. Karangbahagia, Kabupaten Bekasi, Jawa Barat',
  mapsUrl: '',                       // kosong = otomatis dari alamat
  judulKalender: 'Pernikahan Hizul & Tania',

  bankNama: 'Bank Mandiri',
  bankNorek: '1670004172192',
  bankAtasNama: 'Hizul Wahyudin',
  rekeningLain: [
    // { nama: 'DANA', nomor: '081234567890', atasNama: 'Tania Renata' },
  ],
  kado: { penerima: '', telepon: '', alamat: '' },

  /* ===== MUSIK & FOTO: taruh file di folder assets/, lalu samakan namanya di sini ===== */
  musik: 'assets/musik.mp3',         // kosongkan '' untuk tanpa musik
  fotoPria: 'assets/foto-hizul.jpg',
  fotoWanita: 'assets/foto-tania.jpg',
  galeri: [
    'assets/galeri-1.jpg', 'assets/galeri-2.jpg', 'assets/galeri-3.jpg',
    'assets/galeri-4.jpg', 'assets/galeri-5.jpg', 'assets/galeri-6.jpg'
  ],
  logo: '',                          // kosong = pakai assets/logo.png bawaan
  latar: ''                          // kosong = pakai assets/latar.jpg bawaan
};
