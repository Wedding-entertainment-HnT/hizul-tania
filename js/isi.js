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
  var audio=document.getElementById('bgm');
  if(audio&&C.musik){var source=audio.querySelector('source');if(source&&!source.getAttribute('src')){source.setAttribute('src',C.musik);try{audio.load()}catch(e){}}}
}
fill();
document.addEventListener('DOMContentLoaded',fill);

/* Royal motion polish: cinematic entrance, pointer-responsive depth and gentle gallery parallax. */
var motion=document.createElement('style');
motion.id='motion-polish';
motion.textContent=`
:root{--motion-smooth:cubic-bezier(.2,.75,.25,1);--motion-cinematic:cubic-bezier(.76,0,.18,1);--premium-x:50%;--premium-y:35%}
#premium-light{position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.38;background:radial-gradient(ellipse 42rem 30rem at var(--premium-x) var(--premium-y),rgba(255,244,210,.48),rgba(255,255,255,0) 72%);transition:opacity .7s ease}
#cover{transition:opacity 1.25s var(--motion-smooth),visibility 1.25s,filter 1.25s var(--motion-smooth)}
#cover.opening{filter:saturate(1.08)}
.cv-stage,.ico3d,.pcw{transition:transform .65s var(--motion-smooth)}
.cv-ring,.cv-content,.ico-in,.section-frame,.couple-card,.gallery-item{transform-style:preserve-3d}
.cv-disc{box-shadow:0 30px 70px rgba(120,50,60,.22),inset 0 0 30px rgba(255,255,255,.95),0 8px 18px rgba(120,50,60,.08)}
.cv-l svg{filter:drop-shadow(0 18px 20px rgba(90,30,40,.24));animation:cvFloat3d 8s ease-in-out infinite alternate}
@keyframes cvFloat3d{0%{transform:translate3d(0,0,0) rotateZ(-.35deg)}100%{transform:translate3d(7px,10px,16px) rotateZ(.35deg)}}
#cover.opening .cv-ring{animation:ringOut 1.5s var(--motion-cinematic) forwards}
#gold-curtain .panel{backface-visibility:hidden;transform-style:preserve-3d;filter:drop-shadow(0 0 18px rgba(184,144,29,.22));will-change:transform}
#gold-curtain .panel.left{transform-origin:left center}
#gold-curtain .panel.right{transform-origin:right center}
#gold-curtain .seal{transform-style:preserve-3d;filter:drop-shadow(0 12px 16px rgba(90,63,8,.28))}
.ico-in{will-change:transform;animation:icoIdle 8s cubic-bezier(.45,0,.55,1) infinite alternate}
.ico-in .L0{filter:drop-shadow(0 16px 18px rgba(50,40,80,.23))}
.ico-in .L1{filter:drop-shadow(0 12px 10px rgba(40,30,70,.27))}
.ico-in .L2{filter:drop-shadow(0 10px 12px rgba(80,20,50,.3))}
.section-frame,.event-card,.story-book,.bank-card,.couple-card,.gallery-item,.count-item,.photo-wrap,.btn,.btn-open,#music{transition:transform .65s var(--motion-smooth),box-shadow .65s var(--motion-smooth),border-color .5s ease,filter .5s ease}
.section-frame{transform:perspective(1400px) rotateX(var(--frame-x,0deg)) rotateY(var(--frame-y,0deg));box-shadow:0 18px 42px rgba(70,50,20,.13),inset 0 1px 0 rgba(255,255,255,.95)}
.couple-card{position:relative;transform-style:preserve-3d;backface-visibility:hidden;--spot-x:50%;--spot-y:40%}
.couple-card::after{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:0;opacity:0;background:radial-gradient(circle at var(--spot-x) var(--spot-y),rgba(255,255,255,.72),transparent 58%);transition:opacity .45s ease}
.couple-card:hover::after{opacity:.8}
.couple-card>*{position:relative;z-index:1}
.couple-card:hover{transform:translateY(-8px) rotateX(3deg) rotateY(-1deg);box-shadow:0 24px 44px rgba(70,50,20,.24),inset 0 1px 0 #fff}
.gallery-item{transform-style:preserve-3d;backface-visibility:hidden;--tilt-x:0deg;--tilt-y:0deg;--spot-x:50%;--spot-y:40%}
.gallery-item::after{content:'';position:absolute;inset:0;pointer-events:none;z-index:3;opacity:0;background:radial-gradient(circle at var(--spot-x) var(--spot-y),rgba(255,255,255,.4),transparent 46%);transition:opacity .35s ease}
.gallery-item:hover::after{opacity:1}
.gallery-item:hover{transform:perspective(900px) translateY(-7px) rotateX(var(--tilt-x,4deg)) rotateY(var(--tilt-y,-2deg)) scale(1.015);box-shadow:0 20px 34px rgba(70,50,20,.32)}
.gallery-item img{transition:transform 1s var(--motion-smooth),filter .7s ease}
.gallery-item:hover img{transform:scale(1.08) translateZ(12px);filter:saturate(1.08)}
.photo-wrap{box-shadow:0 10px 24px rgba(120,75,15,.2),0 0 26px rgba(233,200,90,.5);animation:floaty 6s ease-in-out infinite}
.photo-wrap:hover{transform:translateY(-5px) rotateX(5deg) scale(1.025);box-shadow:0 20px 36px rgba(120,75,15,.25),0 0 34px rgba(233,200,90,.72)}
.reveal{transform:translate3d(0,38px,-18px) scale(.985);transition:opacity 1s var(--motion-smooth),transform 1.05s var(--motion-smooth);transition-delay:var(--reveal-delay,0s);will-change:opacity,transform}
.reveal.active{transform:translate3d(0,0,0) scale(1)}
.count-item{transform-style:preserve-3d;box-shadow:0 7px 0 rgba(201,162,39,.32),0 13px 22px rgba(70,50,20,.12),inset 0 1px 0 #fff}
.btn:hover,.btn-gold:hover,.btn-open:hover{transform:translateY(-3px) scale(1.025);filter:brightness(1.04);box-shadow:0 12px 25px rgba(120,75,15,.24)}
.btn:active,.btn-open:active{transform:translateY(1px) scale(.975);transition-duration:.15s}
#lightbox{opacity:0;transition:opacity .4s ease,visibility .4s ease}
#lightbox.open{opacity:1}
#lightbox img{transform:translateY(14px) scale(.94);transition:transform .55s var(--motion-smooth);will-change:transform}
#lightbox.open img{transform:translateY(0) scale(1)}
#toast{transition:opacity .35s ease,transform .45s var(--motion-smooth)}
.form-group input,.form-group select,.form-group textarea{transition:border-color .35s ease,box-shadow .35s ease,transform .35s var(--motion-smooth)}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{transform:translateY(-2px)}
@media(hover:none){.couple-card:hover,.gallery-item:hover,.photo-wrap:hover,.btn:hover,.btn-open:hover{transform:none;filter:none}.couple-card::after,.gallery-item::after{display:none}}
@media(max-width:700px){#premium-light{opacity:.2}.section-frame{transform:none;box-shadow:0 12px 28px rgba(70,50,20,.12),inset 0 1px 0 rgba(255,255,255,.95)}.reveal{transform:translate3d(0,24px,-8px) scale(.99);transition-delay:0s}}
@media(prefers-reduced-motion:reduce){#premium-light{display:none}.reveal{transform:none;will-change:auto;transition-delay:0s}.cv-l svg,.ico-in,.photo-wrap{animation:none!important}.couple-card,.gallery-item,.photo-wrap,.btn,.btn-open,#lightbox img{transition:none!important}}
`;
document.head.appendChild(motion);

/* Add one soft, pointer-following highlight and subtle per-card parallax on fine pointers only. */
var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var finePointer=window.matchMedia&&window.matchMedia('(hover:hover) and (pointer:fine)').matches;
var light=document.createElement('div');light.id='premium-light';light.setAttribute('aria-hidden','true');document.body.appendChild(light);
if(!reduced&&finePointer){
  var pointerFrame=null,lastPointer=null;
  function updatePointer(){
    pointerFrame=null;if(!lastPointer)return;
    var e=lastPointer;lastPointer=null;
    document.documentElement.style.setProperty('--premium-x',(e.clientX/window.innerWidth*100).toFixed(1)+'%');
    document.documentElement.style.setProperty('--premium-y',(e.clientY/window.innerHeight*100).toFixed(1)+'%');
    var frame=e.target.closest&&e.target.closest('.section-frame');
    if(frame){
      var r=frame.getBoundingClientRect();
      var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      frame.style.setProperty('--frame-x',(-y*1.6).toFixed(2)+'deg');
      frame.style.setProperty('--frame-y',(x*1.6).toFixed(2)+'deg');
    }
    var card=e.target.closest&&e.target.closest('.gallery-item,.couple-card');
    if(card){
      var cr=card.getBoundingClientRect();
      var cx=Math.max(0,Math.min(100,(e.clientX-cr.left)/cr.width*100));
      var cy=Math.max(0,Math.min(100,(e.clientY-cr.top)/cr.height*100));
      card.style.setProperty('--spot-x',cx.toFixed(1)+'%');card.style.setProperty('--spot-y',cy.toFixed(1)+'%');
      if(card.classList.contains('gallery-item')){
        card.style.setProperty('--tilt-x',(((.5-cy/100)*7)).toFixed(2)+'deg');
        card.style.setProperty('--tilt-y',(((cx/100-.5)*7)).toFixed(2)+'deg');
      }
    }
  }
  document.addEventListener('pointermove',function(e){lastPointer=e;if(!pointerFrame)pointerFrame=requestAnimationFrame(updatePointer)},{passive:true});
  document.addEventListener('pointerout',function(e){
    var frame=e.target.closest&&e.target.closest('.section-frame');
    if(frame&&(!e.relatedTarget||!frame.contains(e.relatedTarget))){frame.style.setProperty('--frame-x','0deg');frame.style.setProperty('--frame-y','0deg')}
    var card=e.target.closest&&e.target.closest('.gallery-item,.couple-card');
    if(card&&(!e.relatedTarget||!card.contains(e.relatedTarget))){card.style.setProperty('--spot-x','50%');card.style.setProperty('--spot-y','40%');card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg')}
  },{passive:true});
}
/* Short, progressively staggered section reveals for a polished scroll rhythm. */
document.querySelectorAll('.reveal').forEach(function(section,index){section.style.setProperty('--reveal-delay',Math.min(index*.055,.44).toFixed(2)+'s')});
})();
