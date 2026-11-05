#!/usr/bin/env python3
"""Ubah file Apps Script (Index, Animasi, Fitur, Mobile, Latar, Transisi .html)
menjadi situs statis di folder dist/ yang siap diupload ke GitHub Pages."""
import re, os, sys, base64, hashlib, shutil

BASE = os.path.dirname(os.path.abspath(__file__))
SRC, OUT = os.path.join(BASE, 'sumber'), os.path.join(BASE, 'dist')
ASSETS = os.path.join(OUT, 'assets')
PARTS = ['Index', 'Animasi', 'Fitur', 'Mobile', 'Latar', 'Transisi']
warn = []

def read(n):
    p = os.path.join(SRC, n + '.html')
    if not os.path.exists(p):
        sys.exit('File tidak ditemukan: sumber/%s.html' % n)
    return open(p, encoding='utf-8').read()

# ---- 1. ekstrak gambar base64 menjadi file di assets/ ----
EXT = {'png': 'png', 'jpeg': 'jpg', 'webp': 'webp'}
BASEN = {'png': 'logo', 'jpeg': 'latar', 'webp': 'bunga'}
seen, count = {}, {}
def extract(m):
    kind, b64 = m.group(1), m.group(2)
    h = hashlib.md5(b64.encode()).hexdigest()
    if h not in seen:
        count[kind] = count.get(kind, 0) + 1
        n = count[kind]
        name = '%s.%s' % (BASEN[kind], EXT[kind]) if (n == 1 and kind != 'webp') else '%s-%d.%s' % (BASEN[kind], n, EXT[kind])
        os.makedirs(ASSETS, exist_ok=True)
        open(os.path.join(ASSETS, name), 'wb').write(base64.b64decode(b64))
        seen[h] = name
    return 'assets/' + seen[h]

def sub(pat, rep, text, label, regex=True, need=True):
    new, n = (re.subn(pat, rep, text) if regex else (text.replace(pat, rep), text.count(pat)))
    if need and n == 0:
        warn.append('Pola tidak ditemukan: ' + label)
    return new

def convert(t):
    t = re.sub(r'data:image/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)', extract, t)
    t = re.sub(r"<\?!=\s*JSON\.stringify\(logoUrl\)\s*\?>", "(window.UNDANGAN.logo||'')", t)
    t = re.sub(r"<\?!=\s*ctxJson\s*\?>",
               "{qrUrl:'',rekening:(window.UNDANGAN.rekeningLain||[]),kado:(window.UNDANGAN.kado||{})}", t)
    t = re.sub(r"<\?\s*if \(adaTiket\) \{ \?>|<\?\s*\} \?>", '', t)
    t = re.sub(r'href="<\?=\s*(\w+)\s*\?>"', r'href="#" data-href="\1"', t)
    t = re.sub(r"'<\?=\s*tanggalIso\s*\?>'", 'window.UNDANGAN.tanggalIso', t)
    t = re.sub(r'<\?=\s*(\w+)\s*\?>', r'<span data-cfg="\1"></span>', t)
    return t

parts = {n: convert(read(n)) for n in PARTS}
idx = parts['Index']

# foto mempelai & galeri
idx = re.sub(r'<img src="" alt="(Hizul|Tania)"',
             lambda m: '<img data-foto="%s" alt="%s"' % ('fotoPria' if m.group(1) == 'Hizul' else 'fotoWanita', m.group(1)), idx)
if 'data-foto=' not in idx: warn.append('Foto mempelai tidak ditemukan')
idx = sub('''src="" alt="Foto '+n+'"''',
          '''src="'+((window.UNDANGAN&&window.UNDANGAN.galeri||[])[n-1]||'')+'" alt="Foto '+n+'"''',
          idx, 'galeri', regex=False)

# Fitur: QR menunggu API
fit = parts['Fitur']
fit = sub("var box=$('#qr-box');if(!box||!CTX.qrUrl)return;", "var box=$('#qr-box');if(!box)return;", fit, 'qr-box', regex=False)
fit = sub(r'\n  gambar\(\);\n',
          "\n  if(CTX.qrUrl||window.__qrUrl){CTX.qrUrl=CTX.qrUrl||window.__qrUrl;gambar()}"
          "else window.addEventListener('qr-ready',function(e){CTX.qrUrl=e.detail;gambar()});\n", fit, 'gambar()')
parts['Fitur'] = fit

# sisipkan config.js + app.js sebelum skrip utama, lalu gabungkan include
marker = '<div id="scroll-bar" aria-hidden="true"></div>'
idx = sub(marker, marker + '\n<script src="config.js"></script>\n<script src="app.js"></script>', idx, 'scroll-bar', regex=False)
for n in PARTS[1:]:
    idx = idx.replace("<?!= include('%s'); ?>" % n, parts[n])

left = re.findall(r'<\?.*?\?>', idx)
if left: warn.append('Masih ada tag template: %s' % left[:3])

os.makedirs(OUT, exist_ok=True)
open(os.path.join(OUT, 'index.html'), 'w', encoding='utf-8').write(idx)
for f in ['config.js', 'app.js', 'checkin.html']:
    shutil.copy(os.path.join(BASE, f), os.path.join(OUT, f))
open(os.path.join(OUT, '.nojekyll'), 'w').close()
os.makedirs(ASSETS, exist_ok=True)

print('Selesai. Folder siap upload:', OUT)
print('Gambar diekstrak:', ', '.join(sorted(seen.values())))
for w in warn: print('PERINGATAN:', w)
