/* checkin.js — halaman petugas penerima tamu */
(function(){
'use strict';
var card=document.getElementById('card');
var q=new URLSearchParams(location.search);
var nama=(q.get('cek')||'').replace(/[\r\n\t]+/g,' ').trim().slice(0,80);
var kode=q.get('k')||'';
function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e}
function gagal(j,p){card.innerHTML='';card.appendChild(el('h1','',j));card.appendChild(el('p','',p))}
if(!nama||!kode){gagal('QR tidak valid','Kode QR tidak lengkap.');return}
API.get({aksi:'cek',cek:nama,k:kode}).then(function(d){
  if(!d||!d.valid){gagal('QR tidak valid',(d&&d.pesan)||'Kode QR tidak cocok.');return}
  tampil(d);
},function(){gagal('Gagal terhubung','Periksa internet dan nilai apiUrl di config.js.')});
function tampil(d){
  card.innerHTML='';
  card.appendChild(el('div','lbl','Tamu Undangan'));
  card.appendChild(el('h1','',d.nama));
  var p=el('p','');
  if(d.rsvp){
    p.appendChild(document.createTextNode('RSVP: '));p.appendChild(el('b','',d.rsvp.status));
    p.appendChild(document.createTextNode(' \u00b7 '));p.appendChild(el('b','',String(d.rsvp.jumlah)));
    p.appendChild(document.createTextNode(' orang'));
  }else p.textContent='Belum mengisi RSVP';
  card.appendChild(p);
  if(d.sudah)card.appendChild(el('div','warn','Sudah check-in pada '+d.sudah));
  var l1=el('label','','Jumlah yang datang');l1.htmlFor='jml';card.appendChild(l1);
  var jml=el('input');jml.id='jml';jml.type='number';jml.min=1;jml.max=20;jml.setAttribute('inputmode','numeric');jml.value=d.rsvp?d.rsvp.jumlah:1;card.appendChild(jml);
  var l2=el('label','','PIN petugas');l2.htmlFor='pin';card.appendChild(l2);
  var pin=el('input');pin.id='pin';pin.type='password';pin.setAttribute('inputmode','numeric');pin.autocomplete='off';card.appendChild(pin);
  var go=el('button','','Tandai Hadir');go.type='button';card.appendChild(go);
  var msg=el('div');msg.id='msg';card.appendChild(msg);
  go.addEventListener('click',function(){
    if(!pin.value){msg.className='bad';msg.textContent='Masukkan PIN petugas.';return}
    go.disabled=true;msg.className='';msg.textContent='Memproses...';
    API.post('tandaiHadir',[nama,kode,pin.value,jml.value]).then(function(r){
      msg.className=r.success?'ok':'bad';msg.textContent=r.message;go.disabled=!!r.success;
    },function(){msg.className='bad';msg.textContent='Gagal terhubung. Coba lagi.';go.disabled=false});
  });
}
})();
