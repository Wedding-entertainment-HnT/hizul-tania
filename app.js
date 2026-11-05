/* Pengganti server Apps Script: mengisi data dari config.js dan menghubungkan RSVP/ucapan/QR ke API */
(function(){
'use strict';
var C = window.UNDANGAN || {};
var q = new URLSearchParams(location.search);
var nama = (q.get('to') || '').replace(/[\r\n\t]+/g, ' ').trim().substring(0, 80);
var API = C.apiUrl || '';

/* --- shim google.script.run -> fetch ke Apps Script --- */
if (API) {
  var mk = function (ok, fail) {
    var r = {
      withSuccessHandler: function (f) { return mk(f, fail); },
      withFailureHandler: function (f) { return mk(ok, f); }
    };
    ['kirimRSVP', 'ambilUcapan', 'tandaiHadir'].forEach(function (n) {
      r[n] = function () {
        var a = [].slice.call(arguments);
        fetch(API, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ fn: n, args: a }) })
          .then(function (x) { return x.json(); })
          .then(function (j) { if (ok) ok(j); })
          .catch(function (e) { if (fail) fail(e); });
      };
    });
    return r;
  };
  window.google = { script: { run: mk() } };
}

/* --- isi teks & tautan --- */
var mulai = new Date(C.tanggalIso), selesai = new Date(mulai.getTime() + (C.durasiJam || 4) * 36e5);
function f(d) { return d.toISOString().replace(/[-:]/g, '').replace(/\.\d+/, ''); }
var vals = {
  namaTamu: nama || C.namaDefault || 'Tamu Undangan', tanggalTeks: C.tanggalTeks, jam: C.jam, tempat: C.tempat,
  alamat: C.alamat, noRek: C.bankNorek, bank: C.bankNama, atasNama: C.bankAtasNama,
  mapsUrl: C.mapsUrl || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(C.alamat || '')),
  kalenderUrl: isNaN(mulai) ? '#' : 'https://calendar.google.com/calendar/render?action=TEMPLATE'
    + '&text=' + encodeURIComponent(C.judulKalender || '')
    + '&dates=' + f(mulai) + '/' + f(selesai)
    + '&details=' + encodeURIComponent('Akad Nikah & Resepsi. Mohon doa restu dan kehadiran Anda.')
    + '&location=' + encodeURIComponent((C.tempat || '') + ', ' + (C.alamat || '')) + '&ctz=Asia%2FJakarta'
};
function isi() {
  document.querySelectorAll('[data-cfg]').forEach(function (e) { e.textContent = vals[e.getAttribute('data-cfg')] || ''; });
  document.querySelectorAll('[data-href]').forEach(function (e) { e.setAttribute('href', vals[e.getAttribute('data-href')] || '#'); });
}
isi();
document.addEventListener('DOMContentLoaded', function () {
  isi();
  var bg = document.getElementById('bgfx');
  if (bg && C.latar) bg.style.setProperty('--bgimg', 'url(' + C.latar + ')');
});

/* --- foto mempelai --- */
document.querySelectorAll('img[data-foto]').forEach(function (img) {
  var src = C[img.getAttribute('data-foto')];
  if (src) img.src = src; else img.dispatchEvent(new Event('error'));
});

/* --- musik --- */
var src = document.querySelector('#bgm source'), bgm = document.getElementById('bgm');
if (src && bgm && C.musik) { src.setAttribute('src', C.musik); bgm.load(); }

/* --- tiket QR --- */
function hapusTiket() { var t = document.getElementById('tiket-sec'); if (t) t.remove(); }
if (!nama || !API) hapusTiket();
else fetch(API + '?aksi=qr&to=' + encodeURIComponent(nama))
  .then(function (x) { return x.json(); })
  .then(function (j) {
    if (!j.kode) return hapusTiket();
    var u = new URL('checkin.html', location.href);
    u.search = '?cek=' + encodeURIComponent(nama) + '&k=' + j.kode;
    window.__qrUrl = u.href;
    window.dispatchEvent(new CustomEvent('qr-ready', { detail: u.href }));
  }).catch(hapusTiket);
})();
