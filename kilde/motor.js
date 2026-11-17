/* Plakatmotoren for infoskjermen i Byåsen kirke.
   Brukes av både skjermsiden og gjennomgangssiden for stabsmøtet, så forhåndsvisningen
   alltid er lik det skjermen viser. Endres her, og bygges med bygg.py.

   utkast:true = venter på godkjenning i stabsmøtet. Vises i forhåndsvisningen, ikke på skjermen. */
window.Skjerm=(function(){
  // ---- Arrangementslista: den eneste kilden. Sidene er visninger av denne. ----
  // cat: gud | kons | barn | mote.  feat: egen plakat (id brukes av forhåndsvisningen).  jul: med på sesongsiden.
  var E = [
    {d:"2026-11-15",t:"11.00",title:"Gudstjeneste med søndagsskole",place:"Byåsen kirke",cat:"gud"},
    {d:"2026-11-17",t:"10.30",title:"Babymassasje og babysang",note:"Babymassasje 10.30, babysang 11.00",place:"Ungdomssalen",cat:"barn"},
    {d:"2026-11-17",t:"11.30",title:"Menighetens hyggestund",note:"Ønskesnutter fra YouTube. Siste før jul",place:"Menighetssalen",cat:"mote"},
    {d:"2026-11-21",t:"11.00",title:"Julemesse",place:"Byåsen kirke",cat:"mote",feat:true,id:"julemesse",
      lead:"Hjemmelagde varer, julebakst, gaver og loddsalg. Barnekorene synger, og det serveres grøt fra 12.30.",art:"jul",pynt:"gaver"},
    {d:"2026-11-22",t:"11.00",title:"Gudstjeneste og KRIK 10+",note:"Avskjed for kapellan Sara Krog",place:"Byåsen kirke",cat:"gud"},
    {d:"2026-11-23",t:"17.00",title:"Familiekoret, første øvelse",place:"Ungdomssalen",cat:"barn"},
    {d:"2026-11-24",t:"10.30",title:"Babykonsert",note:"Avslutning på høstens babysang",place:"Ungdomssalen",cat:"barn"},
    {d:"2026-11-24",t:"11.30",title:"Åpen kafé",place:"Menighetssalen",cat:"mote",id:"kafe-rad"},
    {d:"2026-11-28",t:"11.00",tt:"11.00–13.00",title:"Legokafé",note:"Barnesangstund kl. 12.30",place:"Kirkerommet",cat:"barn",alsoMote:true},
    {d:"2026-11-29",t:"11.00",title:"Gudstjeneste for liten og stor",note:"1. søndag i advent",place:"Byåsen kirke",cat:"gud",alsoBarn:true,jul:true},
    {d:"2026-12-04",t:"19.00",title:"Julekonsert med Trondheimsolistene",note:"Solist: Stine Bogsveen",place:"Byåsen kirke, ungdomssalen",cat:"kons",feat:true,id:"julekonsert",
      lead:"Trondheimsolistene og Stine Bogsveen. Billetter på Hoopla.",qr:"https://www.hoopla.no"},
    {d:"2026-12-05",t:"14.00",title:"Menighetens julemiddag",note:"Med underholdning",place:"Menighetssalen",cat:"mote"},
    {d:"2026-12-06",t:"15.00",title:"Adventsgudstjeneste ute på Lian",note:"Julemagi Lian gård",place:"Lianvannet, ved gressletta",cat:"gud",feat:true,id:"lian",jul:true,
      lead:"Utendørs gudstjeneste under Julemagi på Lian gård. Kle deg etter været.",art:"skog"},
    {d:"2026-12-06",t:"19.00",title:"Kveldsgudstjeneste",place:"Byåsen kirke",cat:"gud",jul:true},
    {d:"2026-12-07",t:"17.00",title:"Familiekoret, øvelse",place:"Ungdomssalen",cat:"barn"},
    {d:"2026-12-08",t:"19.00",title:"Adventskonsert med Byåsen sangkor",place:"Byåsen kirke",cat:"kons",id:"adventskonsert-rad"},
    {d:"2026-12-12",t:"13.00",title:"Lørdagsskolen 40 år, jubileumskonsert",place:"Byåsen kirke",cat:"kons"},
    {d:"2026-12-13",t:"11.00",title:"Vi synger julen inn",note:"Gudstjeneste",place:"Byåsen kirke",cat:"gud",jul:true},
    {d:"2026-12-24",t:"13.00",tt:"13.00 · 14.30 · 16.00",last:"16.00",title:"Julaftensgudstjenester",note:"Byåsen skolemusikkorps spiller kl. 13.00",place:"Byåsen kirke",cat:"gud",jul:true},
    {d:"2026-12-25",t:"13.00",title:"Høytidsgudstjeneste",note:"1. juledag",place:"Byåsen kirke",cat:"gud",jul:true},
    {d:"2027-01-10",t:"11.00",title:"Juletrefest for liten og stor",note:"Gudstjeneste",place:"Byåsen kirke",cat:"gud",alsoBarn:true},
    {d:"2027-01-12",t:"11.30",title:"Åpen kafé",note:"Oppstart etter nyttår",place:"Ungdomssalen",cat:"mote"},
    {d:"2027-01-17",t:"11.00",title:"Gudstjeneste",place:"Byåsen kirke",cat:"gud"},
    {d:"2027-01-19",t:"11.30",title:"Hyggestund: nyttårsfest",note:"Trekkspillmusikk ved Dagfinn Gården",place:"Menighetssalen",cat:"mote"},
    {d:"2027-01-24",t:"11.00",title:"Gudstjeneste",place:"Byåsen kirke",cat:"gud"},
    {d:"2027-01-31",t:"11.00",title:"Gudstjeneste med søndagsskole",place:"Byåsen kirke",cat:"gud"},
    {d:"2027-02-02",t:"11.30",title:"Hyggestund: «Fra gata til Nordkapp»",note:"Dokumentar på storskjerm",place:"Menighetssalen",cat:"mote"},

    // ---- Forslag fra skjerminnboksen. utkast:true til stabsmøtet har godkjent dem. ----
    // erstatter: id-en til raden eller plakaten forslaget skal erstatte når det godkjennes.
    {d:"2026-11-21",t:"11.00",title:"Julemesse",place:"Byåsen kirke",cat:"mote",feat:true,id:"julemesse-ny",erstatter:"julemesse",utkast:true,art:"jul",pynt:"gaver",
      lead:"Kafé med god mat, håndarbeid, julebakst, lodd og åresalg. Fiskedam og lykkehjul for de minste.",
      prog:[["11.00","Salget åpner. Kor Læne synger"],["12.15","Byåsen Soul Kids"],["12.30","Grøt"],["13.45","Byåsen familiekor"],["14.30","Trekning av hovedlotteriet"]],
      hint:"Vil du gi varer, bakst eller brukte leker? Ta kontakt med kirkekontoret."},
    {d:"2026-12-04",t:"19.00",title:"Julekonsert med Trondheimsolistene",note:"Solist: Stine Bogsveen",place:"Byåsen kirke, ungdomssalen",cat:"kons",feat:true,id:"julekonsert-ny",erstatter:"julekonsert",utkast:true,
      lead:"Solist er Stine Bogsveen. Skann koden for billetter på Hoopla.",qr:"https://trondheimsolistene.hoopla.no/event/1360741619",
      img:"bilder/trondheimsolistene.jpg",credit:"Trondheimsolistene"},
    {d:"2026-12-08",t:"19.00",title:"Adventskonsert med Byåsen sangkor",place:"Byåsen kirke",cat:"kons",feat:true,id:"adventskonsert",erstatter:"adventskonsert-rad",utkast:true,art:"jul",pynt:"bjeller",
      lead:"Gjester er Byåsen skoleorkester, Harmonien kor og Else Bø på piano. Kafé fra 18.15, og kaffe og kaker er med i billetten.",
      hint:"Billett 150 kr. Barn under 16 år gratis. Loddsalg før konserten."},
    {d:"2026-11-24",t:"11.30",tt:"11.30–13.30",title:"Åpen kafé",place:"Menighetssalen",cat:"mote",feat:true,id:"kafe",erstatter:"kafe-rad",utkast:true,
      lead:"God mat og drikke, og du forsyner deg så mye du vil. Anbefalt kaffegave er 75 kr, som går til maten.",
      img:"bilder/kafe.jpg",credit:"Foto: Byåsen kirke"}
  ];
  var CAT = {
    gud:{name:"Gudstjenester",sub:"Velkommen til gudstjeneste i Byåsen kirke",c:"var(--gud)"},
    kons:{name:"Konserter",sub:"Musikk i kirka de neste ukene",c:"var(--kons)"},
    barn:{name:"For barn og familier",sub:"Sang, kor og gudstjenester for de minste",c:"var(--barn)",on:"#16151a"},
    mote:{name:"Møteplasser",sub:"Kaffe, prat og fellesskap. Alle er velkomne",c:"var(--mote)"}
  };
  // Oppslag: beskjeder med frist. Forsvinner når fristen er ute.
  var NOTES=[
    {id:"julemiddag",from:"2026-11-01",until:"2026-11-27",title:"Meld deg på julemiddagen",
     text:"Menighetens julemiddag med underholdning, lørdag 5. desember kl. 14.00 i menighetssalen. 450 kr per person.",
     act:"Påmeldingsfrist fredag 27. november",art:"middag"}
  ];
  // Fast innhold: uten dato. Én per runde, og bare når det er plass.
  var FAST=[
    {id:"giver",title:"Bli fast giver",text:"Arbeidet i menigheten er avhengig av gaver. Faste givere gir oss stabile og forutsigbare rammer.",
     kicker:"Støttelaget",qr:"https://www.kirken.no",qrtxt:"Skann for å bli giver"},
    {id:"ramallah",title:"Vår vennskapsmenighet i Ramallah",text:"Byåsen menighet har vennskapsavtale med Church of Hope i Ramallah. Vi ber for hverandre og besøker hverandre.",
     kicker:"Church of Hope",photo:"Bilde fra Church of Hope legges inn her"},
    {id:"samisk",utkast:true,until:"2027-01-31",kicker:"Samisk kirkeråd",title:"Samisk konfirmantleir 2027",
     text:"For samiske konfirmanter fra hele landet, 11.–14. februar på Laberget leirsted i Skogn. Gratis reise og opphold, og du kan være med uansett hvor du bor.",
     img:"bilder/samisk.jpg",credit:"Bilde: Samisk kirkeråd",qr:"https://event.checkin.no/227741/samisk-konfirmantleir-2027",qrtxt:"Meld deg på"}
  ];
  // Siste nyhetssak fra misjonsprosjektet. Byttes når NMS publiserer en ny.
  var NEWS={published:new Date(2026,9,5),kicker:"Misjonsprosjektet vårt · NMS i Asia",
    title:"Tretti deltakere kartla talentene sine i Yangon",
    text:"NMS holdt et tredagers kurs for fire lutherske kirker i Myanmar. Boka «Use Your Talents Asia» ble lansert på burmesisk, og kirkene fikk 500 eksemplarer.",
    src:"nms.no · 5. oktober 2026",url:"https://nms.no/nyhet/entusiasme-for-use-your-talents-i-myanmar",
    img:"nms-bilde.jpg",credit:"Foto: Marieke Rode-Christoffersen / NMS"};
  var ADVENT=[new Date(2026,10,29),new Date(2026,11,6),new Date(2026,11,13),new Date(2026,11,20)];
  var SEASON=[new Date(2026,10,23),new Date(2026,11,27)];

  var DAYS=["Søn","Man","Tir","Ons","Tor","Fre","Lør"], DAYL=["Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag"];
  var MON=["jan","feb","mars","april","mai","juni","juli","aug","sep","okt","nov","des"];
  var MONL=["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember"];

  function dt(e,time){var p=e.d.split("-"),h=(time||e.t).split(".");return new Date(+p[0],+p[1]-1,+p[2],+h[0],+h[1]);}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
  function dShort(x){return DAYS[x.getDay()]+" "+x.getDate()+". "+MON[x.getMonth()];}
  function dLong(x){return DAYL[x.getDay()]+" "+x.getDate()+". "+MONL[x.getMonth()];}
  function qr(url){
    if(typeof qrcode!=="function") return "";
    try{var q=qrcode(0,"M");q.addData(url);q.make();return '<div class="qrbox">'+q.createSvgTag({cellSize:4,margin:0,scalable:true})+'</div>';}catch(err){return "";}
  }
  var ICON={
    gud:'<path d="M24 6v36M13 17h22"/>',
    kons:'<path d="M18 34V12l18-4v22"/><circle cx="14" cy="34" r="4"/><circle cx="32" cy="30" r="4"/>',
    barn:'<ellipse cx="24" cy="18" rx="10" ry="12"/><path d="M24 30l-2 3h4zM24 33c0 5-5 5-5 10"/>',
    mote:'<path d="M10 18h22v10a11 11 0 0 1-22 0zM32 20h4a5 5 0 0 1 0 10h-4M14 8c0 3 3 3 3 6M22 8c0 3 3 3 3 6M8 42h26"/>',
    heart:'<path d="M24 40S8 30 8 18a8 8 0 0 1 16-3 8 8 0 0 1 16 3c0 12-16 22-16 22z"/>',
    globe:'<circle cx="24" cy="24" r="17"/><ellipse cx="24" cy="24" rx="7" ry="17"/><path d="M7 24h34"/>'
  };
  function icon(k){return '<svg viewBox="0 0 48 48" aria-hidden="true">'+ICON[k]+'</svg>';}
  function mark(k){return '<div class="mark">'+icon(k)+'</div>';}
  function candles(now){
    var lit=ADVENT.filter(function(d){return d<=now;}).length,h="";
    for(var k=0;k<4;k++){
      var x=6+k*22;
      h+='<rect x="'+x+'" y="24" width="10" height="36" rx="1.5" fill="#fff" opacity="'+(k<lit?1:.45)+'"/><path d="M'+(x+5)+' 24v-4" stroke="#fff" stroke-width="1"/>';
      if(k<lit) h+='<ellipse cx="'+(x+5)+'" cy="13" rx="3.6" ry="6.5" fill="#ffd35a"/>';
    }
    var txt=lit?lit+". søndag i advent":"Advent begynner 29. november";
    return '<div class="candles"><svg viewBox="0 0 88 62" aria-hidden="true">'+h+'</svg><small>'+txt+'</small></div>';
  }
  function mid(x){return new Date(x.getFullYear(),x.getMonth(),x.getDate());}
  function dayDiff(x,now){return Math.round((mid(x)-mid(now))/864e5);}
  function rel(x,now){var n=dayDiff(x,now);return n<=0?"I dag":n===1?"I morgen":"Om "+n+" dager";}
  function ymd(s){var a=s.split("-");return new Date(+a[0],+a[1]-1,+a[2]);}


  // ---- Illustrasjoner. Enkle flate tegninger i profilens farger, laget som SVG i koden. ----
  function rnd(seed){return function(){seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};}
  function star(x,y,r){return 'M'+x+' '+(y-r)+'Q'+x+' '+y+' '+(x+r)+' '+y+'Q'+x+' '+y+' '+x+' '+(y+r)+'Q'+x+' '+y+' '+(x-r)+' '+y+'Q'+x+' '+y+' '+x+' '+(y-r)+'Z';}
  var ART={
    // Granbar med julekuler langs toppen, og noen stjerner
    jul:function(){
      var r=rnd(11),P=["","",""],bb="",k,x,t,y,sl,ang,j,sd,L,d,px,py,cx;
      for(k=0;k<4;k++){
        for(x=k*250;x<=(k+1)*250;x+=3.5){
          t=(x-k*250)/250; y=4+34*4*t*(1-t); sl=Math.atan2(34*4*(1-2*t)/250,1);
          for(sd=-1;sd<=1;sd+=2) for(j=0;j<2;j++){
            ang=sl+Math.PI-sd*(0.75+r()*0.55); L=11+r()*8; px=x+(r()-.5)*4; py=y+(r()-.5)*4;
            d='M'+px.toFixed(1)+' '+py.toFixed(1)+'l'+(Math.cos(ang)*L).toFixed(1)+' '+(Math.sin(ang)*L).toFixed(1);
            P[r()<.45?0:r()<.7?1:2]+=d;
          }
        }
        cx=k*250+125;
        bb+='<path d="M'+cx+' 38v13" stroke="#f2e6c9" stroke-width="1.6"/><rect x="'+(cx-3.5)+'" y="49" width="7" height="5" rx="1" fill="#e9b949"/>'+
            '<circle cx="'+cx+'" cy="65" r="12" fill="'+(k%2?'#e9b949':'#d6223c')+'"/><ellipse cx="'+(cx-4.5)+'" cy="60" rx="3.2" ry="5" fill="#fff" opacity=".5"/>';
        [55,95,190].forEach(function(bx){var u=bx/250,by=4+34*4*u*(1-u);bx+=k*250;
          bb+='<circle cx="'+bx+'" cy="'+(by+3).toFixed(1)+'" r="4" fill="#d6223c"/><circle cx="'+(bx+6)+'" cy="'+(by+6).toFixed(1)+'" r="3.6" fill="#d6223c"/>';});
      }
      var st=[[790,385,7],[955,300,5],[700,468,5],[560,472,4],[640,140,4]].map(function(q){return '<path d="'+star(q[0],q[1],q[2])+'"/>';}).join("");
      return '<div class="art-top"><svg viewBox="0 0 1000 90" preserveAspectRatio="xMidYMin meet" aria-hidden="true"><g fill="none" stroke-linecap="round" stroke-width="3.2">'+
             '<path stroke="#0b3527" d="'+P[0]+'"/><path stroke="#1d6b4f" d="'+P[1]+'"/><path stroke="#46a37c" d="'+P[2]+'"/></g>'+bb+'</svg></div>'+
             '<div class="art-fill"><svg viewBox="0 0 1000 492" preserveAspectRatio="none" aria-hidden="true"><g fill="#f2c94c" opacity=".85">'+st+'</g></svg></div>';
    },
    // Gaver og pepperkakehjerte, til julemessa
    gaver:function(){
      var h='M150 110C120 90 106 74 106 58a22 22 0 0 1 44-6a22 22 0 0 1 44 6c0 16-14 32-44 52z';
      return '<svg viewBox="0 0 200 170" aria-hidden="true"><g transform="rotate(-12 150 78)"><path d="'+h+'" fill="#b8692e"/>'+
        '<path d="'+h+'" transform="translate(150 78) scale(.8) translate(-150 -78)" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray=".5 6" stroke-linecap="round"/></g>'+
        '<rect x="18" y="80" width="96" height="84" rx="3" fill="#d6223c"/><rect x="12" y="68" width="108" height="18" rx="3" fill="#b5162f"/><rect x="58" y="68" width="16" height="96" fill="#e9b949"/>'+
        '<path d="M66 68c-18-24-40-12-28-2s28 2 28 2zm0 0c18-24 40-12 28-2s-28 2-28 2z" fill="#e9b949"/>'+
        '<rect x="104" y="114" width="74" height="50" rx="3" fill="#e9b949"/><rect x="100" y="106" width="82" height="13" rx="3" fill="#d4a12f"/><rect x="134" y="106" width="12" height="58" fill="#d6223c"/>'+
        '<path d="M140 106c-12-16-28-8-20-1s20 1 20 1zm0 0c12-16 28-8 20-1s-20 1-20 1z" fill="#d6223c"/></svg>';
    },
    // Julebjeller med sløyfe, til julekonsertene
    bjeller:function(){
      var bell='<path d="M0 0c-15 0-23 13-23 31v17l-9 11h64l-9-11V31C23 13 15 0 0 0z" fill="#e9b949"/><path d="M-12 12c-4 6-5 14-5 22v14" stroke="#f8dc8a" stroke-width="4" fill="none" stroke-linecap="round"/><circle cy="64" r="7" fill="#c98f1c"/>';
      return '<svg viewBox="0 0 200 170" aria-hidden="true">'+
        '<g stroke="#d6223c" stroke-width="3" stroke-linecap="round"><path d="M100 52L66 74M100 52l34 22"/></g>'+
        '<g transform="translate(64 74) rotate(-20)">'+bell+'</g><g transform="translate(136 74) rotate(20)">'+bell+'</g>'+
        '<g fill="#2f8a68"><path d="M100 44c-12-12-28-14-40-8 8 3 9 9 17 10 7 1 13-1 23-2z"/><path d="M100 44c12-12 28-14 40-8-8 3-9 9-17 10-7 1-13-1-23-2z"/></g>'+
        '<path d="M100 46c-10-16-30-18-30-6s20 8 30 6zm0 0c10-16 30-18 30-6s-20 8-30 6z" fill="#d6223c"/><circle cx="100" cy="46" r="6" fill="#b5162f"/></svg>';
    },
    // Granskog i silhuett langs bunnen, til gudstjenesten ute på Lian
    skog:function(){
      var r=rnd(5),h="",x,w,ht,y0=160,k;
      for(x=-20;x<1020;x+=34+r()*30){
        w=34+r()*26; ht=70+r()*80; k='';
        for(var j=0;j<3;j++){var top=y0-ht+j*ht*.28,bot=y0-ht*(.42-j*.21);k+='M'+(x+w/2).toFixed(0)+' '+top.toFixed(0)+'L'+(x+w*(.5+.18+j*.16)).toFixed(0)+' '+bot.toFixed(0)+'H'+(x+w*(.5-.18-j*.16)).toFixed(0)+'Z';}
        h+='<path d="'+k+'"/>';
      }
      var sn="";for(var i=0;i<26;i++) sn+='<circle cx="'+(r()*1000).toFixed(0)+'" cy="'+(r()*95).toFixed(0)+'" r="'+(1.5+r()*2.5).toFixed(1)+'"/>';
      return '<div class="art-bot"><svg viewBox="0 0 1000 160" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><g fill="#fff" opacity=".13">'+h+'</g><g fill="#fff" opacity=".35">'+sn+'</g></svg></div>';
    },
    // Kaffekopp, kanelbolle og strikketøy
    mote:function(){
      return '<svg viewBox="0 0 240 124" aria-hidden="true">'+
        '<g stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".7"><path d="M50 40c-6-7 6-11 0-18s4-11 0-17"/><path d="M66 42c-6-7 6-11 0-18s4-11 0-17"/><path d="M82 40c-6-7 6-11 0-18"/></g>'+
        '<ellipse cx="66" cy="113" rx="52" ry="8" fill="#fff" opacity=".9"/>'+
        '<path d="M100 59h7a13 13 0 0 1 0 26h-11" fill="none" stroke="#fff" stroke-width="6"/>'+
        '<path d="M30 50h72v18c0 23-16 39-36 39S30 91 30 68z" fill="#fff"/>'+
        '<ellipse cx="66" cy="50" rx="36" ry="6" fill="#7a4a2a"/>'+
        '<ellipse cx="160" cy="104" rx="30" ry="13" fill="#a8652a"/>'+
        '<ellipse cx="160" cy="97" rx="30" ry="20" fill="#e2a75e"/>'+
        '<path d="M160 97m-3 0a3 2.5 0 1 1 6 0a8 6 0 1 1-15 1a14 10 0 1 1 27-1a20 14 0 1 1-37 3" fill="none" stroke="#a35a1d" stroke-width="3.2" stroke-linecap="round"/>'+
        '<g fill="#fff"><circle cx="148" cy="88" r="1.8"/><circle cx="171" cy="86" r="1.8"/><circle cx="176" cy="101" r="1.8"/><circle cx="151" cy="106" r="1.8"/><circle cx="163" cy="109" r="1.6"/></g>'+
        '<g stroke="#f6e7c8" stroke-width="4" stroke-linecap="round"><path d="M197 62l32 54"/><path d="M233 64l-30 52"/></g>'+
        '<g fill="#f6e7c8"><circle cx="196" cy="60" r="4.5"/><circle cx="234" cy="62" r="4.5"/></g>'+
        '<circle cx="214" cy="100" r="19" fill="#ffb3bd"/>'+
        '<g fill="none" stroke="#d9677c" stroke-width="2" stroke-linecap="round"><path d="M198 92c10 4 22 4 32-2"/><path d="M196 102c12 4 26 4 36-2"/><path d="M201 112c8 2 17 2 25-2"/><path d="M207 83c-5 10-5 24 1 34"/></g>'+
        '<path d="M196 106c-6 7-13 10-19 12" fill="none" stroke="#ffb3bd" stroke-width="2.4" stroke-linecap="round"/>'+
        '</svg>';
    },
    // Liten giraff med ballong
    barn:function(){
      var o='stroke="#16151a" stroke-width="3" stroke-linejoin="round"', sp='#d98a1c';
      return '<svg viewBox="0 0 200 200" aria-hidden="true">'+
        '<path d="M58 68C50 92 66 112 42 140" fill="none" stroke="#16151a" stroke-width="2" stroke-linecap="round"/>'+
        '<ellipse cx="60" cy="38" rx="25" ry="30" fill="#c8102e"/><path d="M55 67h7l-3.5 5z" fill="#c8102e"/><ellipse cx="51" cy="28" rx="6" ry="10" fill="#fff" opacity=".45"/>'+
        '<path d="M44 140c-6 6-8 12-7 18" fill="none" '+o+' stroke-linecap="round"/><circle cx="37" cy="160" r="4" fill="#16151a"/>'+
        '<g fill="#fff6e0" '+o+'><rect x="56" y="150" width="9" height="42" rx="4"/><rect x="72" y="152" width="9" height="40" rx="4"/><rect x="100" y="152" width="9" height="40" rx="4"/><rect x="115" y="150" width="9" height="42" rx="4"/>'+
        '<ellipse cx="90" cy="148" rx="44" ry="22"/><path d="M110 138L124 64h16l-8 80z"/></g>'+
        '<g fill="'+sp+'"><circle cx="72" cy="142" r="7"/><circle cx="92" cy="154" r="6"/><circle cx="98" cy="137" r="5"/><circle cx="116" cy="152" r="5"/><circle cx="128" cy="118" r="4.5"/><circle cx="130" cy="95" r="4"/><circle cx="121" cy="133" r="3.5"/></g>'+
        '<g '+o+'><path d="M129 44l-2-14M141 43l1-14" fill="none" stroke-linecap="round"/></g><g fill="'+sp+'" '+o+'><circle cx="127" cy="28" r="4"/><circle cx="142" cy="27" r="4"/></g>'+
        '<ellipse cx="121" cy="50" rx="8" ry="4.5" transform="rotate(-25 121 50)" fill="#fff6e0" '+o+'/>'+
        '<ellipse cx="143" cy="58" rx="21" ry="14" fill="#fff6e0" '+o+'/>'+
        '<circle cx="146" cy="53" r="2.6" fill="#16151a"/><path d="M152 64c3 2 6 2 8 0" fill="none" stroke="#16151a" stroke-width="2" stroke-linecap="round"/><circle cx="160" cy="57" r="1.6" fill="#16151a"/>'+
        '</svg>';
    },
    // Varm middagstallerken i strek
    middag:function(){
      return '<svg viewBox="0 0 160 120" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">'+
        '<path d="M64 34c-6-7 6-10 0-17s5-10 0-16"/><path d="M80 31c-6-7 6-10 0-17s5-10 0-16"/><path d="M96 34c-6-7 6-10 0-17s5-10 0-16"/>'+
        '<circle cx="80" cy="76" r="37"/>'+
        '<path d="M22 46v16a5 5 0 0 0 10 0V46M27 46v16M27 67v41"/>'+
        '<path d="M138 46c-8 5-9 22-8 32h8zM138 78v30"/>'+
        '</svg>';
    }
  };

  // ---- Plakattypene ----
  function row(e,now){
    var x=dt(e),n=dayDiff(x,now),tag=n<=0?'<span class="tag">I dag</span>':n===1?'<span class="tag">I morgen</span>':'';
    return '<li><span class="num">'+x.getDate()+'</span><span class="wd">'+DAYS[x.getDay()]+'<span>'+MON[x.getMonth()]+'</span></span><div class="what"><h3>'+
      esc(e.title)+tag+'</h3><p><b>kl. '+esc(e.tt||e.t)+'</b> · '+esc((e.note?e.note+" · ":"")+e.place)+'</p></div></li>';
  }
  function listSlide(name,sub,c,on,items,extra,now){
    if(!items.length) return "";
    return '<section class="slide" style="--c:'+c+(on?';--on:'+on:'')+'"><aside class="panel"><div class="kicker">Byåsen kirke</div><h2>'+
      esc(name)+'</h2><p class="sub">'+esc(sub)+'</p>'+(extra||'')+'</aside><ol class="rows" style="--c:'+(on?'var(--ink)':c)+'">'+
      items.map(function(e){return row(e,now);}).join("")+'</ol></section>';
  }
  function featSlide(e,now){
    var k=CAT[e.cat],x=dt(e),code=e.qr?qr(e.qr):"",cls="slide feat"+(e.art?" "+e.art:"")+(e.img?" bilde":"");
    var date='<div class="big"><b>'+x.getDate()+'</b><span>'+MON[x.getMonth()]+'</span><em>'+DAYL[x.getDay()]+' kl. '+esc(e.tt||e.t)+'</em></div>';
    var qrd=code?'<div class="qrw">'+code+'<div class="qrtxt">'+esc(e.qrtxt||"Skann for billetter")+'</div></div>':'';
    var side=e.img?'<div class="side"><div class="pic"><img src="'+esc(e.img)+'" alt="">'+(e.credit?'<span class="cred">'+esc(e.credit)+'</span>':'')+'</div><div class="when">'+date+qrd+'</div></div>'
                  :'<div class="side">'+date+qrd+'</div>';
    var prog=e.prog?'<ul class="prog">'+e.prog.map(function(p){return '<li><b>'+esc(p[0])+'</b><span>'+esc(p[1])+'</span></li>';}).join("")+'</ul>':'';
    return '<section class="'+cls+'" style="--c:'+k.c+(k.on?';--on:'+k.on:'')+'">'+(e.art&&ART[e.art]?ART[e.art]():'')+(e.pynt&&!e.qr&&!e.img?'<div class="art-hj">'+ART[e.pynt]()+'</div>':'')+'<div class="main"><div class="kicker">'+
      esc(e.cat==="gud"?"Gudstjeneste":e.cat==="kons"?"Konsert":"Byåsen kirke")+'<span class="chip">'+rel(x,now)+'</span></div><h2>'+
      esc(e.title)+'</h2><p class="lead">'+esc(e.lead||e.note||"")+'</p>'+prog+'<div class="place">'+(e.hint?esc(e.place==="Byåsen kirke"?e.hint:e.place+" · "+e.hint):esc(e.place))+'</div></div>'+side+'</section>';
  }
  function noteSlide(N,now){
    var left=dayDiff(ymd(N.until),now);
    var badge='<div class="badge"><b'+(left<=0?' class="txt"':'')+'>'+(left<=0?"I dag":left)+'</b><span>'+(left<=0?"siste frist":left===1?"dag igjen":"dager igjen")+'</span></div>';
    return '<section class="slide note'+(N.art?' medart':'')+'"><div class="main"><div class="kicker">Påmelding</div><h2>'+esc(N.title)+'</h2><p>'+esc(N.text)+
      '</p><p class="act">'+esc(N.act)+'</p></div>'+(N.art&&ART[N.art]?'<div class="nside"><div class="nart">'+ART[N.art]()+'</div>'+badge+'</div>':badge)+'</section>';
  }
  function newsSlide(){
    var ph=NEWS.img?'<div class="photo img"><img src="'+esc(NEWS.img)+'" alt=""><span class="cred">'+esc(NEWS.credit||"")+'</span></div>':'<div class="photo">'+esc(NEWS.photo||"")+'</div>';
    return '<section class="slide fast nytt">'+ph+'<div class="main"><div class="kicker">'+esc(NEWS.kicker)+
      '</div><h2>'+esc(NEWS.title)+'</h2><p>'+esc(NEWS.text)+'</p><div class="src">'+esc(NEWS.src)+'</div></div><div class="side">'+
      (qr(NEWS.url)||'<div class="ico">'+icon("globe")+'</div>')+'<div class="qrtxt">Les hele saken</div></div></section>';
  }
  function fastSlide(fa){
    var ph=fa.img?'<div class="photo img"><img src="'+esc(fa.img)+'" alt=""><span class="cred">'+esc(fa.credit||"")+'</span></div>':'';
    var side=(fa.photo&&!fa.img)?'<div class="photo">'+esc(fa.photo)+'</div>':
      '<div class="side">'+(qr(fa.qr)||'<div class="ico">'+icon("heart")+'</div>')+'<div class="qrtxt">'+esc(fa.qrtxt)+'</div></div>';
    return '<section class="slide fast'+(fa.img?' medbilde':'')+'">'+ph+'<div class="main"><div class="kicker">'+esc(fa.kicker)+'</div><h2>'+esc(fa.title)+'</h2><p>'+esc(fa.text)+
      '</p></div>'+side+'</section>';
  }

  // ---- Regler for runden. Justeres her. ----
  // Runden skal være kort nok til at den som står og venter, ser det de gikk glipp av igjen innen et minutt.
  var REGLER={
    maks:6,                 // plakater i runden (10 sek hver, altså høyst ett minutt)
    fremhevet:{antall:2, dager:14, konsertDager:21},   // egen plakat: de to nærmeste, fra 14 dager før (konserter 21)
    liste:{                 // samlesider: hvor mange linjer og hvor langt fram
      gud:{antall:4,dager:21}, barn:{antall:5,dager:28}, mote:{antall:5,dager:28}, kons:{antall:4,dager:42}
    },
    // Når det er flere kandidater enn plass, beholdes de øverst i lista. Rekkefølgen på skjermen er en annen (se build).
    prioritet:["gud","feat1","note","barn","mote","feat2","kons","fast"]
  };

  // ---- Samlesidene for en gitt dato ----
  function lists(now,withDrafts){
    var up=E.filter(function(e){return !e.erstatter&&(withDrafts||!e.utkast)&&dt(e,e.last).getTime()+2*3600e3>now.getTime();});
    var days=function(e){return (dt(e)-now)/864e5;};
    var R=REGLER.liste, within=function(k){return function(e){return days(e)<=R[k].dager;};};
    var season=now>=SEASON[0]&&now<SEASON[1], S={}, I={};
    var gudItems=[], gName, gSub, gC, gExtra;
    if(season){
      gudItems=up.filter(function(e){return e.cat==="gud"&&e.jul;}).slice(0,5);
      gName="Advent og jul"; gSub="Gudstjenester fram til 1. juledag"; gC="var(--advent)"; gExtra=candles(now);
    }
    if(!season||!gudItems.length){
      gudItems=up.filter(function(e){return e.cat==="gud";}).filter(within("gud")).slice(0,R.gud.antall);
      gName=CAT.gud.name; gSub=CAT.gud.sub; gC=CAT.gud.c; gExtra=mark("gud");
    }
    I.gud=gudItems;
    I.kons=up.filter(function(e){return e.cat==="kons";}).filter(within("kons")).slice(0,R.kons.antall);
    I.barn=up.filter(function(e){return e.cat==="barn"||e.alsoBarn;}).filter(within("barn")).slice(0,R.barn.antall);
    I.mote=up.filter(function(e){return e.cat==="mote"||e.alsoMote;}).filter(within("mote")).slice(0,R.mote.antall);
    var kqr=I.kons.length?qr("https://www.hoopla.no"):"";
    S.gud=listSlide(gName,gSub,gC,null,I.gud,gExtra,now);
    S.barn=listSlide(CAT.barn.name,CAT.barn.sub,CAT.barn.c,CAT.barn.on,I.barn,'<div class="art barn">'+ART.barn()+'</div>',now);
    S.kons=listSlide(CAT.kons.name,CAT.kons.sub,CAT.kons.c,null,I.kons,kqr?'<div class="qr">'+kqr+'<div class="qrtxt">Billetter og<br>mer informasjon</div></div>':mark("kons"),now);
    S.mote=listSlide(CAT.mote.name,CAT.mote.sub,CAT.mote.c,null,I.mote,'<div class="art mote">'+ART.mote()+'</div>',now);
    return {S:S,I:I,up:up,days:days};
  }

  // ---- Hele runden på skjermen ----
  function build(now){
    var L=lists(now,false), S=L.S, RF=REGLER.fremhevet;
    // Fremhevet: de nærmeste, fra 14 dager før (konserter 21)
    var FE=E.filter(function(e){return e.feat&&!e.utkast&&dt(e,e.last).getTime()+2*3600e3>now.getTime()&&L.days(e)<=(e.cat==="kons"?RF.konsertDager:RF.dager);})
            .sort(function(a,b){return dt(a)-dt(b);}).slice(0,RF.antall);
    var C={feat1:FE[0]?featSlide(FE[0],now):"", feat2:FE[1]?featSlide(FE[1],now):""};
    // En samleside vises bare når den har noe som ikke allerede har egen plakat i runden
    ["gud","barn","mote","kons"].forEach(function(k){
      var rest=L.I[k].filter(function(e){return FE.indexOf(e)<0;});
      C[k]=rest.length?S[k]:"";
    });
    // Oppslag med frist: ett om gangen
    var N=NOTES.filter(function(n){return !n.utkast&&now>=ymd(n.from)&&now<new Date(ymd(n.until).getTime()+86399e3);})[0];
    C.note=N?noteSlide(N,now):"";
    // Fast innhold: ny misjonssak har plassen alene i 14 dager, deretter bytter de på fra dag til dag. Kommer bare med når det er plass.
    var fast=FAST.filter(function(f){return !f.utkast&&(!f.until||now<new Date(ymd(f.until).getTime()+864e5));});
    var rot=[NEWS.utkast?null:newsSlide()].concat(fast.map(fastSlide)).filter(Boolean);
    var fresh=!NEWS.utkast&&dayDiff(now,NEWS.published)<=14, turn=rot.length?((dayDiff(now,new Date(2026,10,12))%rot.length)+rot.length)%rot.length:0;
    C.fast=fresh?newsSlide():rot[turn]||"";
    // Velg etter prioritet, vis i fast rekkefølge
    var keep=REGLER.prioritet.filter(function(k){return C[k];}).slice(0,REGLER.maks);
    var order=["feat1","gud","note","barn","feat2","mote","kons","fast"].filter(function(k){return keep.indexOf(k)>=0;}).map(function(k){return C[k];});
    return {slides:order,next:nextText(now)};
  }
  function nextText(now){
    var n=E.filter(function(e){return !e.utkast&&dt(e,e.last).getTime()+2*3600e3>now.getTime();})[0];
    return n?dShort(dt(n)).toLowerCase()+" kl. "+n.t+"  "+n.title:"Se kirken.no for program";
  }

  // ---- Én bestemt plakat, også utkast. Brukes av forhåndsvisningen i stabsmøtet. ----
  // nøkler: feat:<id> · note:<id> · fast:<id> · nytt · liste:gud|barn|kons|mote
  function slide(key,now){
    var p=key.split(":"), e;
    if(p[0]==="feat"){e=E.filter(function(x){return x.id===p[1];})[0];return e?featSlide(e,now):"";}
    if(p[0]==="note"){e=NOTES.filter(function(x){return x.id===p[1];})[0];return e?noteSlide(e,now):"";}
    if(p[0]==="fast"){e=FAST.filter(function(x){return x.id===p[1];})[0];return e?fastSlide(e):"";}
    if(p[0]==="nytt") return newsSlide();
    if(p[0]==="liste") return lists(now,true).S[p[1]]||"";
    return "";
  }

  return {build:build,slide:slide,nextText:nextText,dLong:dLong};
})();
