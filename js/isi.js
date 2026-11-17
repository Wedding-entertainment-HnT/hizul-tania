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
    im.setAttribute('data-ok','1');var v=(C.foto||{})[im.getAttribute('data-foto')];
    if(v)im.src=v;else if(im.onerror)im.onerror();
  });
  var audio=document.getElementById('bgm');
  if(audio&&C.musik){var source=audio.querySelector('source');if(source&&!source.getAttribute('src')){source.setAttribute('src',C.musik);try{audio.load()}catch(e){}}}
}
fill();document.addEventListener('DOMContentLoaded',fill);

/* Final royal treatment: cinematic light, dimensional cards, and restrained motion. */
var style=document.createElement('style');
style.id='royal-premium-final';
style.textContent=`
:root{--royal-ease:cubic-bezier(.2,.75,.25,1);--royal-light-x:50%;--royal-light-y:35%;--royal-scroll:0}
#royal-light{position:fixed;inset:0;z-index:2;pointer-events:none;opacity:.34;background:radial-gradient(ellipse 38rem 28rem at var(--royal-light-x) var(--royal-light-y),rgba(255,244,215,.48),rgba(255,244,215,0) 72%);transition:opacity .5s ease}
#cover{isolation:isolate;transition:opacity 1.25s var(--royal-ease),visibility 1.25s,filter 1.2s ease}
#cover::after{content:'';position:absolute;inset:-25%;z-index:3;pointer-events:none;opacity:0;background:linear-gradient(112deg,transparent 35%,rgba(255,255,255,.5) 48%,rgba(255,236,180,.32) 51%,transparent 64%);transform:translateX(-70%) rotate(-8deg)}
#cover.opening::after{animation:royalLensSweep 1.35s .05s var(--royal-ease) both}
@keyframes royalLensSweep{0%{opacity:0;transform:translateX(-70%) rotate(-8deg)}22%{opacity:.9}100%{opacity:0;transform:translateX(70%) rotate(-8deg)}}
#cover.opening .cv-tl{transition:transform 1.5s cubic-bezier(.68,0,.2,1),opacity 1.1s ease}
#cover.opening .cv-br{transition:transform 1.5s cubic-bezier(.68,0,.2,1),opacity 1.1s ease}
.cv-ring,.cv-content,.ico-in,.section-frame,.couple-card,.gallery-item{transform-style:preserve-3d}
.cv-disc{box-shadow:0 28px 68px rgba(90,40,45,.22),inset 0 0 32px rgba(255,255,255,.95),0 0 0 1px rgba(201,162,39,.2)}
.cv-l svg{filter:drop-shadow(0 18px 22px rgba(70,35,38,.22))}
.ico-in .L0{filter:drop-shadow(0 16px 18px rgba(50,40,80,.23))}.ico-in .L1{filter:drop-shadow(0 12px 10px rgba(40,30,70,.27))}.ico-in .L2{filter:drop-shadow(0 10px 12px rgba(80,20,50,.3))}
.section-frame{box-shadow:0 18px 42px rgba(70,50,20,.13),inset 0 1px 0 rgba(255,255,255,.95);transition:box-shadow .65s var(--royal-ease),transform .65s var(--royal-ease)}
.couple-card,.gallery-item{--royal-spot-x:50%;--royal-spot-y:40%;backface-visibility:hidden}
.couple-card{position:relative;transform-style:preserve-3d}
.couple-card::after,.gallery-item::after{content:'';position:absolute;inset:0;z-index:2;border-radius:inherit;pointer-events:none;opacity:0;background:radial-gradient(circle at var(--royal-spot-x) var(--royal-spot-y),rgba(255,255,255,.58),transparent 58%);transition:opacity .4s ease}
.couple-card:hover::after,.gallery-item:hover::after{opacity:.8}
.gallery-grid{perspective:1100px;perspective-origin:50% 40%}
.gallery-item{transform-style:preserve-3d;transition:transform .65s var(--royal-ease),box-shadow .65s var(--royal-ease);box-shadow:0 8px 20px rgba(70,50,20,.22)}
.gallery-item:hover{transform:perspective(900px) translateY(-7px) rotateX(var(--royal-tilt-x,4deg)) rotateY(var(--royal-tilt-y,-3deg)) scale(1.02);box-shadow:0 22px 38px rgba(70,50,20,.3)}
.gallery-item img{transition:transform .9s var(--royal-ease),filter .65s ease;will-change:transform}
.gallery-item:hover img{transform:scale(1.08) translateZ(12px);filter:saturate(1.08) contrast(1.02)}
.photo-wrap{box-shadow:0 12px 26px rgba(120,75,15,.2),0 0 24px rgba(233,200,90,.42)}
.reveal{transition:opacity .9s var(--royal-ease),transform 1s var(--royal-ease);transition-delay:var(--royal-delay,0s)}
.reveal.active{transition-delay:0s}
#lightbox{opacity:0;transition:opacity .35s ease,visibility .35s ease}
#lightbox.open{opacity:1}
#lightbox img{transform:translateY(12px) scale(.95);transition:transform .5s var(--royal-ease)}
#lightbox.open img{transform:translateY(0) scale(1)}
.btn,.btn-open,#music{transition:transform .35s var(--royal-ease),box-shadow .35s var(--royal-ease),filter .35s ease}
.btn:focus-visible,.btn-open:focus-visible,#music:focus-visible,.gallery-item:focus-visible{outline:3px solid rgba(201,162,39,.8);outline-offset:4px}
@media(hover:none){.gallery-item:hover,.couple-card:hover,.photo-wrap:hover{transform:none}.gallery-item::after,.couple-card::after{display:none}}
@media(max-width:700px){#royal-light{opacity:.18}.section-frame{box-shadow:0 12px 28px rgba(70,50,20,.12),inset 0 1px 0 rgba(255,255,255,.95)}.gallery-item:hover{transform:none}}
@media(prefers-reduced-motion:reduce){#royal-light{display:none}#cover::after{display:none}.reveal{transition:none!important}.gallery-item,.gallery-item img,#lightbox img{transition:none!important}}
`;
document.head.appendChild(style);
var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var fine=window.matchMedia&&window.matchMedia('(hover:hover) and (pointer:fine)').matches;
var light=document.createElement('div');light.id='royal-light';light.setAttribute('aria-hidden','true');document.body.appendChild(light);
document.querySelectorAll('.reveal').forEach(function(section,index){section.style.setProperty('--royal-delay',Math.min(index*.045,.36).toFixed(2)+'s')});
if(!reduce&&fine){
  var pending=null,raf=0;
  document.addEventListener('pointermove',function(e){pending=e;if(!raf)raf=requestAnimationFrame(function(){
    raf=0;if(!pending)return;var event=pending;pending=null;
    document.documentElement.style.setProperty('--royal-light-x',(event.clientX/window.innerWidth*100).toFixed(1)+'%');
    document.documentElement.style.setProperty('--royal-light-y',(event.clientY/window.innerHeight*100).toFixed(1)+'%');
    var card=event.target.closest&&event.target.closest('.gallery-item,.couple-card');if(!card)return;
    var rect=card.getBoundingClientRect();if(!rect.width||!rect.height)return;
    var x=Math.max(0,Math.min(100,(event.clientX-rect.left)/rect.width*100));
    var y=Math.max(0,Math.min(100,(event.clientY-rect.top)/rect.height*100));
    card.style.setProperty('--royal-spot-x',x.toFixed(1)+'%');card.style.setProperty('--royal-spot-y',y.toFixed(1)+'%');
    if(card.classList.contains('gallery-item')){card.style.setProperty('--royal-tilt-x',((50-y)*.08).toFixed(2)+'deg');card.style.setProperty('--royal-tilt-y',((x-50)*.08).toFixed(2)+'deg')}
  })},{passive:true});
  document.addEventListener('pointerout',function(e){var card=e.target.closest&&e.target.closest('.gallery-item,.couple-card');if(card&&(!e.relatedTarget||!card.contains(e.relatedTarget))){card.style.setProperty('--royal-spot-x','50%');card.style.setProperty('--royal-spot-y','40%');card.style.setProperty('--royal-tilt-x','0deg');card.style.setProperty('--royal-tilt-y','0deg')}},{passive:true});
}
})();
