// ====== TEMPEL INI MENGGANTIKAN fungsi doGet(e) LAMA di Code.gs ======
// (hapus doGet lama; fungsi lain — kirimRSVP, ambilUcapan, tandaiHadir, dll — tetap dipakai)

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
function bersih_(s) { return String(s || '').replace(/[\r\n\t]+/g, ' ').trim().substring(0, 80); }

function doGet(e) {
  var p = (e && e.parameter) || {}, out = { ok: true };
  if (p.aksi === 'qr') {
    var n = bersih_(p.to);
    out = { kode: (n && qrAktif_()) ? kodeTamu_(n) : '' };
  } else if (p.aksi === 'cek') {
    var nama = bersih_(p.cek), kode = String(p.k || '');
    if (!qrAktif_()) out = { valid: false, pesan: 'Fitur QR belum diaktifkan (ganti RAHASIA_QR dan PIN_PETUGAS di Code.gs).' };
    else if (!nama || kode !== kodeTamu_(nama)) out = { valid: false, pesan: 'Kode QR tidak cocok. Pastikan memindai tiket yang benar.' };
    else out = { valid: true, nama: nama, rsvp: cariRsvp_(nama), sudah: cariCheckin_(nama) };
  }
  return json_(out);
}

function doPost(e) {
  try {
    var req = JSON.parse(e.postData.contents);
    var boleh = ['kirimRSVP', 'ambilUcapan', 'tandaiHadir'];
    if (boleh.indexOf(req.fn) < 0) throw new Error('fn');
    var fn = { kirimRSVP: kirimRSVP, ambilUcapan: ambilUcapan, tandaiHadir: tandaiHadir }[req.fn];
    return json_(fn.apply(null, req.args || []));
  } catch (err) {
    return json_({ success: false, message: 'Permintaan tidak valid.' });
  }
}
