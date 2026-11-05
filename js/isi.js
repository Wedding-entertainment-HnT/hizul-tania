/* isi.js — mengisi teks, tautan, foto & musik dari config.js */
(function(){
'use strict';
var C=window.CONFIG||{};
var q=new URLSearchParams(location.search);
var to=(q.get('to')||'').replace(/\s+/g,' ').trim().slice(0,80);
window.NAMA_TAMU=to;
var B=C.bank||{};
var T={namaTamu:to||C.namaDefault||'Tamu Undangan',tanggalTeks:C.tanggalTeks,jam:C.jam,tempat:C.tempat,alamat:C.alamat,bank:B.nama,noRek:B.nomor,atasNama:B.atasNama};
var enc=encodeURIComponent;
function mapsUrl(){return C.mapsUrl||('https://www.google.com/maps/search/?api=1\u0026query='+enc((C.tempat||'')+', '+(C.alamat||'')))}
function ics(d){return d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'')}
function kalenderUrl(){
  var s=new Date(C.tanggalIso);if(isNaN(s))return '#';
  var e=new Date(s.getTime()+(C.durasiJam||4)*3600000);
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE\u0026text='+enc(C.judulKalender||'')+'\u0026dates='+ics(s)+'/'+ics(e)+'\u0026details='+enc(C.detailKalender||'')+'\u0026location='+enc((C.tempat||'')+', '+(C.alamat||''))+'\u0026ctz=Asia%2FJakarta';
}
if(C.judul)document.title=C.judul;
function fill(){
  document.querySelectorAll('[data-cfg]:not([data-ok])').forEach(function(e){
    var v=T[e.getAttribute('data-cfg')];if(v==null)return;
    e.textContent=v;e.setAttribute('data-ok','1');
  });
  document.querySelectorAll('a[data-href]:not([data-ok])').forEach(function(a){
    var k=a.getAttribute('data-href');a.href=(k==='mapsUrl')?mapsUrl():kalenderUrl();a.setAttribute('data-ok','1');
  });
  document.querySelectorAll('img[data-foto]:not([data-ok])').forEach(function(im){
    im.setAttribute('data-ok','1');
    var v=(C.foto||{})[im.getAttribute('data-foto')];
    if(v)im.src=v;else if(im.onerror)im.onerror();
  });
  var a=document.getElementById('bgm');
  if(a&&C.musik){
    var s=a.querySelector('source');
    if(s&&!s.getAttribute('src')){s.setAttribute('src',C.musik);try{a.load()}catch(e){}}
  }
}
fill();
document.addEventListener('DOMContentLoaded',fill);
})();
