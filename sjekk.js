// Sjekker plakatene mot reglene i REGLER.ord: overskrift ≤ 7 ord, hele plakaten ≤ 20 ord (klokkeslett og tall telles ikke).
// Kjøres før ukesforslaget: node sjekk.js
const fs=require('fs'); global.window={}; eval(fs.readFileSync(__dirname+'/kilde/motor.js','utf8'));
const S=window.Skjerm, now=new Date();
const ord=t=>(t.replace(/<[^>]+>/g,' ').match(/[\wæøåÆØÅ«»0-9.–\u2011-]+/g)||[]).filter(w=>/[A-Za-zæøåÆØÅ]/.test(w)).length;
let feil=0;
for(const k of S.nokler()){
  const h=S.slide(k,now); if(!h) continue;
  const tittel=(h.match(/<h2>([^<]*)/)||[])[1]||'';
  const tekst=['<h2>[^<]*','class="lead">[^<]*','<p>[^<]*','class="act">[^<]*','<li><b>[^<]*</b><span>[^<]*','class="place">[^<]*']
    .map(r=>(h.match(new RegExp(r,'g'))||[]).join(' ')).join(' ');
  const t=ord(tittel), n=ord(tekst.replace(/class="[a-z]+">|<h2>|<p>|<li><b>|<\/b><span>/g,' '));
  const ok=t<=7&&n<=20; if(!ok) feil++;
  console.log((ok?'  ok  ':'  FOR LANG ')+k.padEnd(22)+` overskrift ${t} ord, totalt ${n} ord`);
}
process.exit(feil?1:0);
