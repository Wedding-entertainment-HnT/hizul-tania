/* isi.js — mengisi teks, foto, link, dan rekening dari config.js */
(function () {
  'use strict';
  var C = window.CONFIG || {};
  var params = new URLSearchParams(location.search);
  var tamu = (params.get('to') || '').trim();

  // Nama tamu: hanya diset bila ada ?to=... (dipakai fitur tiket QR)
  if (tamu) window.NAMA_TAMU = tamu;

  var bank = C.bank || {};
  var nilai = {
    namaTamu: tamu || C.namaDefault || 'Tamu Undangan',
    tanggalTeks: C.tanggalTeks,
    jam: C.jam,
    tempat: C.tempat,
    alamat: C.alamat,
    bank: bank.nama,
    noRek: bank.nomor,
    atasNama: bank.atasNama
  };

  // 1) Isi teks [data-cfg]
  document.querySelectorAll('[data-cfg]').forEach(function (el) {
    var v = nilai[el.getAttribute('data-cfg')];
    if (v == null) v = C[el.getAttribute('data-cfg')];
    if (v != null) el.textContent = v;
  });

  // 2) Foto mempelai [data-foto]
  document.querySelectorAll('[data-foto]').forEach(function (img) {
    var src = (C.foto || {})[img.getAttribute('data-foto')];
    if (src) img.src = src;
  });

  // 3) Link Google Maps
  var maps = C.mapsUrl ||
    'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(C.alamat || C.tempat || '');

  // 4) Link Google Calendar
  function fmt(d) { return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); }
  var mulai = new Date(C.tanggalIso);
  var selesai = new Date(mulai.getTime() + (C.durasiJam || 3) * 3600000);
  var kalender = isNaN(mulai) ? '#' :
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text=' + encodeURIComponent(C.judulKalender || C.judul || 'Pernikahan') +
    '&dates=' + fmt(mulai) + '/' + fmt(selesai) +
    '&details=' + encodeURIComponent(C.detailKalender || '') +
    '&location=' + encodeURIComponent((C.tempat ? C.tempat + ', ' : '') + (C.alamat || ''));

  var links = { mapsUrl: maps, kalenderUrl: kalender };
  document.querySelectorAll('[data-href]').forEach(function (a) {
    var u = links[a.getAttribute('data-href')];
    if (u) a.href = u;
  });

  // 5) Musik
  if (C.musik) {
    var s = document.querySelector('#bgm source');
    if (s) { s.src = C.musik; var a = document.getElementById('bgm'); if (a) a.load(); }
  }

  // 6) Judul tab
  if (C.judul) document.title = C.judul;
})();
