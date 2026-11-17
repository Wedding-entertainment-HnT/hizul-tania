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
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE\u0026text='+enc(C.judulKalender||'')+'\u0026dates='+ics(s)+'/'+ics(e)+'\u0026details='+enc(C.detailKalender||'')+'\u0026location='+enc((C.tempat||'')+', '+(C.alamat||''));
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

/* Sentuhan motion: kedalaman lembut, easing sinematik, dan respons interaksi yang konsisten. */
var motion=document.createElement('style');
motion.id='motion-polish';
motion.textContent=`
:root{--motion-ease:cubic-bezier(.22,.емо,0,1);--motion-smooth:cubic-bezier(.2,.75,.25,1)}
/* Use a valid, carefully tuned easing curve across interactive elements. */
:root{--motion-ease:cubic-bezier(.22,.75,.2,1);--motion-smooth:cubic-bezier(.2,.75,.25,1)}
#cover{transition:opacity 1.25s var(--motion-smooth),visibility 1.25s,filter 1.25s var(--motion-smooth)}
#cover.opening{filter:saturate(1.08)}
.cv-stage,.ico3d,.pcw{transition:transform .65s var(--motion-smooth)}
.cv-ring{transform-style:preserve-3d}
.cv-disc{box-shadow:0 30px 70px rgba(120,50,60,.22),inset 0 0 30px rgba(255,255,255,.95),0 8px 18px rgba(120,50,60,.08)}
.cv-l svg{filter:drop-shadow(0 18px 20px rgba(90,30,40,.24));animation:cvFloat3d 8s ease-in-out infinite alternate}
@keyframes cvFloat3d{0%{transform:translate3d(0,0,0) rotateZ(-.35deg)}100%{transform:translate3d(7px,10px,16px) rotateZ(.35deg)}}
.ico-in{will-change:transform;animation:icoIdle 8s cubic-bezier(.45,0,.55,1) infinite alternate}
.ico-in .L0{filter:drop-shadow(0 16px 18px rgba(50,40,80,.23))}
.ico-in .L1{filter:drop-shadow(0 12px 10px rgba(40,30,70,.27))}
.ico-in .L2{filter:drop-shadow(0 10px 12px rgba(80,20,50,.3))}
.section-frame,.event-card,.story-book,.bank-card,.couple-card,.gallery-item,.count-item,.photo-wrap,.btn,.btn-open,#music{
  transition:transform .65s var(--motion-smooth),box-shadow .65s var(--motion-smooth),border-color .5s ease,filter .5s ease;
}
.section-frame{transform-style:preserve-3d;box-shadow:0 18px 42px rgba(70,50,20,.13),inset 0 1px 0 rgba(255,255,255,.95)}
.couple-card,.event-card,.story-book,.bank-card{transform-style:preserve-3d;backface-visibility:hidden}
.couple-card:hover{transform:translateY(-8px) rotateX(3deg) rotateY(-1deg);box-shadow:0 24px 44px rgba(70,50,20,.24),inset 0 1px 0 #fff}
.gallery-item{transform-style:preserve-3d;backface-visibility:hidden}
.gallery-item:hover{transform:translateY(-7px) perspective(700px) rotateX(4deg) rotateY(-2deg) scale(1.015);box-shadow:0 20px 34px rgba(70,50,20,.32)}
.gallery-item img{transition:transform 1s var(--motion-smooth),filter .7s ease}
.gallery-item:hover img{transform:scale(1.08) translateZ(12px);filter:saturate(1.08)}
.photo-wrap{box-shadow:0 10px 24px rgba(120,75,15,.2),0 0 26px rgba(233,200,90,.5);animation:floaty 6s ease-in-out infinite}
.photo-wrap:hover{transform:translateY(-5px) rotateX(5deg) scale(1.025);box-shadow:0 20px 36px rgba(120,75,15,.25),0 0 34px rgba(233,200,90,.72)}
.reveal{transform:translate3d(0,38px,-18px) scale(.985);transition:opacity 1s var(--motion-smooth),transform 1.05s var(--motion-smooth);will-change:opacity,transform}
.reveal.active{transform:translate3d(0,0,0) scale(1)}
.count-item{transform-style:preserve-3d;box-shadow:0 7px 0 rgba(201,162,39,.32),0 13px 22px rgba(70,50,20,.12),inset 0 1px 0 #fff}
.btn:hover,.btn-gold:hover,.btn-open:hover{transform:translateY(-3px) scale(1.025);filter:brightness(1.04);box-shadow:0 12px 25px rgba(120,75,15,.24)}
.btn:active,.btn-open:active{transform:translateY(1px) scale(.975);transition-duration:.15s}
#lightbox{opacity:0;transition:opacity .35s ease,visibility .35s ease}
#lightbox.open{opacity:1}
#lightbox img{transform:translateY(12px) scale(.96);transition:transform .5s var(--motion-smooth);will-change:transform}
#lightbox.open img{transform:translateY(0) scale(1)}
#toast{transition:opacity .35s ease,transform .45s var(--motion-smooth)}
.form-group input,.form-group select,.form-group textarea{transition:border-color .35s ease,box-shadow .35s ease,transform .35s var(--motion-smooth)}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{transform:translateY(-2px)}
#gold-curtain .panel{backface-visibility:hidden;transform-style:preserve-3d;filter:drop-shadow(0 0 18px rgba(184,144,29,.22))}
#gold-curtain .panel.left{transform-origin:left center}
#gold-curtain .panel.right{transform-origin:right center}
#gold-curtain .seal{transform-style:preserve-3d;filter:drop-shadow(0 12px 16px rgba(90,63,8,.28))}
@media(hover:none){.couple-card:hover,.gallery-item:hover,.photo-wrap:hover,.btn:hover,.btn-open:hover{transform:none;filter:none}}
@media(max-width:700px){.section-frame{box-shadow:0 12px 28px rgba(70,50,20,.12),inset 0 1px 0 rgba(255,255,255,.95)}.reveal{transform:translate3d(0,24px,-8px) scale(.99)}}
@media(prefers-reduced-motion:reduce){.reveal{transform:none;will-change:auto}.cv-l svg,.ico-in,.photo-wrap{animation:none!important}.couple-card,.gallery-item,.photo-wrap,.btn,.btn-open,#lightbox img{transition:none!important}}
`;
document.head.appendChild(motion);
})();
