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
    {d:"2026-11-22",t:"11.00",title:"Gudstjeneste og KRIK 10+",note:"Avskjed for kapellan Sara Krog",place:"Byåsen kirke",cat:"gud"},
    {d:"2026-11-23",t:"17.00",title:"Familiekoret, første øvelse",place:"Ungdomssalen",cat:"barn"},
    {d:"2026-11-24",t:"10.30",title:"Babykonsert",note:"Avslutning på høstens babysang",place:"Ungdomssalen",cat:"barn"},
    {d:"2026-11-24",t:"11.30",tt:"11.30–13.30",title:"Åpen kafé",place:"Menighetssalen",cat:"mote"},
    {d:"2026-11-28",t:"11.00",tt:"11.00–13.00",title:"Legokafé",note:"Barnesangstund kl. 12.30",place:"Kirkerommet",cat:"barn",alsoMote:true},
    {d:"2026-11-29",t:"11.00",title:"Gudstjeneste for liten og stor",note:"1. søndag i advent",place:"Byåsen kirke",cat:"gud",alsoBarn:true,jul:true},
    {d:"2026-12-05",t:"14.00",title:"Menighetens julemiddag",note:"Med underholdning",place:"Menighetssalen",cat:"mote"},
    {d:"2026-12-06",t:"15.00",title:"Adventsgudstjeneste på Lian",note:"Julemagi på Lian gård",place:"Julemagi på Lian gård",cat:"gud",feat:true,id:"lian",jul:true,
      lead:"Gudstjeneste inne, og juletregang ute etterpå. Prest er Maren Græsli Evensen.",art:"skog",relieff:"krystall",pynt:"advent"},
    // Overstyrt: kalenderen sier Byåsen kirke i stedsfeltet og lar seg ikke rette. Stedet er Selsbakk menighetshus (stabsmøtet 18.11).
    {d:"2026-12-06",t:"17.00",title:"Adventssamling med julegrantenning",place:"Selsbakk menighetshus",cat:"mote",alsoBarn:true},
    {d:"2026-12-06",t:"19.00",title:"Kveldsgudstjeneste",place:"Byåsen kirke",cat:"gud",jul:true},
    {d:"2026-12-07",t:"17.00",title:"Familiekoret, øvelse",place:"Ungdomssalen",cat:"barn"},
    {d:"2026-12-12",t:"13.00",title:"Lørdagsskolen 40 år, jubileumskonsert",note:"Gratis",place:"Byåsen kirke",cat:"kons",id:"lordagsskolen-rad"},
    {d:"2026-12-13",t:"11.00",title:"Vi synger julen inn",note:"Gudstjeneste",place:"Byåsen kirke",cat:"gud",jul:true},
    {d:"2026-12-24",t:"13.00",tt:"13.00 · 14.30 · 16.00",last:"16.00",title:"Julaftensgudstjenester",note:"Byåsen skolemusikkorps spiller kl. 13.00",place:"Byåsen kirke",cat:"gud",jul:true},
    {d:"2026-12-25",t:"13.00",title:"Høytidsgudstjeneste",note:"1. juledag",place:"Byåsen kirke",cat:"gud",jul:true},
    {d:"2027-01-10",t:"11.00",title:"Juletrefest for liten og stor",note:"Gudstjeneste",place:"Byåsen kirke",cat:"gud",alsoBarn:true},
    {d:"2027-01-12",t:"11.30",tt:"11.30–13.30",title:"Åpen kafé",note:"Oppstart etter nyttår",place:"Ungdomssalen",cat:"mote"},
    {d:"2027-01-17",t:"11.00",title:"Gudstjeneste",place:"Byåsen kirke",cat:"gud"},
    {d:"2027-01-19",t:"11.30",title:"Hyggestund: nyttårsfest",note:"Trekkspillmusikk ved Dagfinn Gården",place:"Menighetssalen",cat:"mote"},
    {d:"2027-01-24",t:"11.00",title:"Gudstjeneste",place:"Byåsen kirke",cat:"gud"},
    {d:"2027-01-31",t:"11.00",title:"Gudstjeneste med søndagsskole",place:"Byåsen kirke",cat:"gud"},
    {d:"2027-02-02",t:"11.30",title:"Hyggestund: «Fra gata til Nordkapp»",note:"Dokumentar på storskjerm",place:"Menighetssalen",cat:"mote"},

    // ---- Forslag fra skjerminnboksen. utkast:true til stabsmøtet har godkjent dem. ----
    // erstatter: id-en til raden eller plakaten forslaget skal erstatte når det godkjennes.
    {d:"2026-11-21",t:"11.00",tt:"11.00–15.00",title:"Julemesse",place:"Byåsen kirke",cat:"mote",feat:true,id:"julemesse",art:"jul",pynt:"gaver",
      prog:[["11.00","Salget åpner. Kor Læne synger"],["12.15","Byåsen Soul Kids"],["12.30","Grøt"],["13.45","Byåsen familiekor"],["14.30","Trekning av hovedlotteriet"]]},
    {d:"2026-12-04",t:"19.00",title:"Julekonsert med Trondheimsolistene",note:"Solist: Stine Bogsveen",place:"Byåsen kirke, ungdomssalen",cat:"kons",feat:true,id:"julekonsert",relieff:"krystall",
      lead:"Solist er Stine Bogsveen. Skann koden for billetter på Hoopla.",qr:"https://trondheimsolistene.hoopla.no/event/1360741619",
      img:"bilder/trondheimsolistene.jpg",credit:"Trondheimsolistene"},
    {d:"2026-12-08",t:"19.00",title:"Adventskonsert med Byåsen sangkor",place:"Byåsen kirke",cat:"kons",feat:true,id:"adventskonsert",art:"jul",pynt:"advent",
      lead:"Gjester: Byåsen skoleorkester, Harmonien kor og Else Bø. Kafé fra 18.15.",
      hint:"150 kr, barn under 16 gratis."},
    {d:"2026-12-12",t:"13.00",title:"Lørdagsskolen 40 år: jubileumskonsert",note:"Gratis",place:"Byåsen kirke",cat:"kons",feat:true,id:"lordagsskolen",erstatter:"lordagsskolen-rad",utkast:true,relieff:"krystall",
      lead:"Elever fra kulturskolens Lørdagsskolen spiller klassisk musikk. Konsert nummer 1192 i en serie fra 1986.",
      hint:"Gratis. Hjertelig velkommen!",qr:"https://trondheimkulturskole.no/arrangementer/",qrtxt:"Les mer"}
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
     nedtelling:true,
     text:"Lørdag 5. desember kl. 14 i menighetssalen, 450 kr. Hjertelig velkommen!",
     act:"Skriv deg på lista der, eller sms Lin‑Silvia: 418 08 744",art:"middag",relieff:"tre"}
  ];
  // Fast innhold: uten dato. Én per runde, og bare når det er plass.
  var FAST=[
    {id:"giver",title:"Bli fast giver",text:"Arbeidet i menigheten er avhengig av gaver. Faste givere gir oss stabile og forutsigbare rammer.",
     kicker:"Støttelaget",qr:"https://minpamelding.agrando.no/?skjemaId=2e12e62a-9180-409c-a5a8-700412289220",qrtxt:"Skann for å bli giver"},
    {id:"ramallah",title:"Vår vennskapsmenighet i Ramallah",text:"Vi har vennskapsavtale med Church of Hope i Ramallah, og ber for hverandre.",
     kicker:"Church of Hope",img:"bilder/ramallah.jpg",credit:"Foto: Byåsen menighet"},
    {id:"kafe",neste:"Åpen kafé",title:"Åpen kafé",
     text:"God mat og drikke, og du forsyner deg selv. Anbefalt kaffegave 75 kr.",
     img:"bilder/kafe.jpg",credit:"Foto: Byåsen kirke",qrtxt:""},
    {id:"samisk",lav:true,until:"2027-01-31",kicker:"Samisk kirkeråd",title:"Samisk konfirmantleir 2027",
     text:"For samiske konfirmanter fra hele landet. 11.–14. februar i Skogn, gratis reise og opphold.",
     img:"bilder/samisk.jpg",credit:"Bilde: Samisk kirkeråd",qr:"https://event.checkin.no/227741/samisk-konfirmantleir-2027",qrtxt:"Meld deg på"}
  ];
  // Siste nyhetssak fra misjonsprosjektet. Byttes når NMS publiserer en ny.
  var NEWS={published:new Date(2026,9,5),kicker:"Misjonsprosjektet vårt · NMS i Asia",
    title:"Tretti deltakere kartla talentene sine i Yangon",
    text:"Kurs for fire lutherske kirker i Myanmar, med ny bok på burmesisk.",
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
        bb+='<path d="M'+cx+' 38v13" stroke="rgba(255,255,255,.22)" stroke-width="1.6"/><circle cx="'+cx+'" cy="64" r="11" fill="rgba(0,0,0,.16)" transform="translate(2 2)"/>'+
            '<circle cx="'+cx+'" cy="64" r="11" fill="rgba(255,255,255,.16)"/>';
      }
      return '<div class="art-top"><svg viewBox="0 0 1000 90" preserveAspectRatio="xMidYMin meet" aria-hidden="true"><g fill="none" stroke-linecap="round" stroke-width="3.2">'+
             '<path stroke="rgba(0,0,0,.24)" d="'+P[0]+'"/><path stroke="rgba(0,0,0,.12)" d="'+P[1]+'"/><path stroke="rgba(255,255,255,.14)" d="'+P[2]+'"/></g>'+bb+'</svg></div>';
    },
    // Gaver og pepperkakehjerte, til julemessa
    gaver:function(){
      var h='M150 108C122 90 108 75 108 60a21 21 0 0 1 42-6a21 21 0 0 1 42 6c0 15-14 30-42 48z';
      return '<svg viewBox="0 0 200 170" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">'+
        '<g transform="rotate(-12 150 78)"><path d="'+h+'"/><path d="'+h+'" transform="translate(150 78) scale(.78) translate(-150 -78)" stroke-dasharray=".5 7"/></g>'+
        '<path d="M20 86h92v76H20zM14 70h104v16H14zM66 70v92M66 70c-16-22-36-12-26-2s26 2 26 2zm0 0c16-22 36-12 26-2s-26 2-26 2z"/>'+
        '<path d="M106 118h70v44h-70zM102 106h78v12h-78zM141 106v56M141 106c-11-15-26-8-18-1s18 1 18 1zm0 0c11-15 26-8 18-1s-18 1-18 1z"/></svg>';
    },
    bjeller:function(){
      var bell='<path d="M0 0c-15 0-23 13-23 31v17l-9 11h64l-9-11V31C23 13 15 0 0 0z"/><circle cy="66" r="6"/>';
      return '<svg viewBox="0 0 200 170" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">'+
        '<path d="M100 50L66 74M100 50l34 24"/><g transform="translate(64 74) rotate(-20)">'+bell+'</g><g transform="translate(136 74) rotate(20)">'+bell+'</g>'+
        '<path d="M100 46c-10-16-30-18-30-6s20 8 30 6zm0 0c10-16 30-18 30-6s-20 8-30 6z"/></svg>';
    },
    // Granskog i silhuett langs bunnen, til gudstjenesten ute på Lian
    skog:function(){
      var r=rnd(5),h="",x,w,ht,y0=160,k;
      for(x=-20;x<1020;x+=34+r()*30){
        w=34+r()*26; ht=70+r()*80; k='';
        for(var j=0;j<3;j++){var top=y0-ht+j*ht*.28,bot=y0-ht*(.42-j*.21);k+='M'+(x+w/2).toFixed(0)+' '+top.toFixed(0)+'L'+(x+w*(.5+.18+j*.16)).toFixed(0)+' '+bot.toFixed(0)+'H'+(x+w*(.5-.18-j*.16)).toFixed(0)+'Z';}
        h+='<path d="'+k+'"/>';
      }
      return '<div class="art-bot"><svg viewBox="0 0 1000 160" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><g fill="#fff" opacity=".13">'+h+'</g></svg></div>';
    },
    // Kaffekopp med damp, i strek som relieff
    mote:function(){
      return '<svg viewBox="0 0 72 80" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">'+
        '<path d="M24 22c-3-4 3-6 0-10s3-6 0-9M34 22c-3-4 3-6 0-10s3-6 0-9M44 22c-3-4 3-6 0-10s3-6 0-9"/>'+
        '<path d="M12 30h44v14a22 22 0 0 1-44 0z"/><path d="M56 34h5a8 8 0 0 1 0 16h-6"/><path d="M4 72h60"/>'+
        '</svg>';
    },
    // Én stor snøkrystall, ton i ton
    krystall:function(){
      var arm='<path d="M0 0V-92M0-30l-18-16M0-30l18-16M0-58l-14-12M0-58l14-12M0-80l-8-8M0-80l8-8"/>', g="";
      for(var i=0;i<6;i++) g+='<g transform="rotate('+(i*60)+')">'+arm+'</g>';
      return '<div class="art-krystall"><svg viewBox="-100 -100 200 200" aria-hidden="true"><g fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".12">'+g+
        '<circle r="10"/></g></svg></div>';
    },
    // Adventsstake med fire lys. Lysene som er tent, følger adventssøndagene fram til arrangementet.
    advent:function(e){
      var n=e?ADVENT.filter(function(d){return d<=dt(e);}).length:4, h="";
      for(var k=0;k<4;k++){
        var x=30+k*40;
        h+='<rect x="'+(x-8)+'" y="70" width="16" height="66" rx="2"/>';
        h+=k<n?'<path d="M'+x+' 62c-7-8-5-16 0-24 5 8 7 16 0 24z" fill="currentColor"/>':'<path d="M'+x+' 70v-6"/>';
      }
      return '<svg viewBox="0 0 200 170" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">'+h+
        '<path d="M8 136h184M22 136c0 14 10 22 24 22h108c14 0 24-8 24-22"/></svg>';
    },
    // Ballong og en liten giraff, i strek
    barn:function(){
      return '<svg viewBox="0 0 120 100" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">'+
        '<ellipse cx="22" cy="20" rx="12" ry="15"/><path d="M22 35l-2 3h4zM22 38c0 10-8 14-4 26s12 14 16 18"/>'+
        '<path d="M40 70C40 62 50 60 64 60H76L84 27C85 21 92 19 99 22C105 25 104 31 98 31H92L87 63C89 68 89 72 86 76V96H81V80H76V96H71V80H56V96H51V80H46V96H41V78C38 76 38 72 40 70Z"/>'+
        '<path d="M40 70c-4 2-6 6-6 12M88 22l-1-7M95 21l1-7M86 26c-4-1-6 1-6 3"/><circle cx="87" cy="13" r="1.8"/><circle cx="96" cy="12" r="1.8"/><circle cx="96" cy="25" r=".7"/>'+
        '<circle cx="57" cy="68" r="2.4"/><circle cx="68" cy="71" r="2"/><circle cx="84" cy="44" r="1.8"/>'+
        '</svg>';
    },
    // Juletre i relieff: samme farge som bakgrunnen, med lys kant oppe og skygge nede
    tre:function(){
      var cx=260, T=[[40,150,74],[104,246,114],[178,346,156],[262,452,200]], f="";
      T.forEach(function(q){f+='M'+cx+' '+q[0]+'L'+(cx+q[2])+' '+q[1]+'Q'+cx+' '+(q[1]+30)+' '+(cx-q[2])+' '+q[1]+'Z';});
      f+='M'+(cx-22)+' 452h44v40h-44z';
      var kuler=[[228,206,10],[302,292,12],[206,384,13],[334,414,10],[272,128,8],[250,316,9]].map(function(k){return 'M'+(k[0]-k[2])+' '+k[1]+'a'+k[2]+' '+k[2]+' 0 1 0 '+(2*k[2])+' 0a'+k[2]+' '+k[2]+' 0 1 0 '+(-2*k[2])+' 0z';}).join("");
      var lag=function(d){return '<path d="'+d+'" transform="translate(5 6)" fill="#e3ddd0"/><path d="'+d+'" transform="translate(-3 -3)" fill="#fcfaf6"/><path d="'+d+'" fill="#efebe2"/>';};
      var st=[],r;for(var i=0;i<10;i++){r=i%2?9:22;st.push((cx+r*Math.sin(i*Math.PI/5)).toFixed(1)+' '+(30-r*Math.cos(i*Math.PI/5)).toFixed(1));}
      return '<div class="art-tre"><svg viewBox="0 0 520 492" preserveAspectRatio="xMidYMax meet" aria-hidden="true">'+lag(f)+lag(kuler)+
        lag('M'+st.join("L")+'Z')+'</svg></div>';
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
  function row(e,now,farge){
    var x=dt(e),n=dayDiff(x,now),tag=n<=0?'<span class="tag">I dag</span>':n===1?'<span class="tag">I morgen</span>':'';
    var k=farge&&CAT[e.cat]?CAT[e.cat]:null;
    return '<li'+(k?' style="--c:'+(k.cat==="barn"||e.cat==="barn"?"#b37a00":k.c)+'"':'')+'><span class="num">'+x.getDate()+'</span><span class="wd">'+DAYS[x.getDay()]+'<span>'+MON[x.getMonth()]+'</span></span><div class="what"><h3>'+
      esc(e.title)+tag+'</h3><p><b>kl. '+esc(e.tt||e.t)+'</b>'+esc([e.note,e.place==="Byåsen kirke"?"":e.place].filter(Boolean).map(function(x){return " · "+x;}).join(""))+'</p></div></li>';
  }
  function listSlide(name,sub,c,on,items,extra,now,farge){
    if(!items.length) return "";
    return '<section class="slide" style="--c:'+c+(on?';--on:'+on:'')+'"><aside class="panel"><div class="kicker">Byåsen kirke</div><h2>'+
      esc(name)+'</h2><p class="sub">'+esc(sub)+'</p>'+(extra||'')+'</aside><ol class="rows" style="--c:'+(on?'var(--ink)':c)+'">'+
      items.map(function(e){return row(e,now,farge);}).join("")+'</ol></section>';
  }
  function featSlide(e,now){
    var k=CAT[e.cat],x=dt(e),code=e.qr?qr(e.qr):"",cls="slide feat"+(e.art?" "+e.art:"")+(e.img?" bilde":"");
    var date='<div class="big"><b>'+x.getDate()+'</b><span>'+MON[x.getMonth()]+'</span><em>'+DAYL[x.getDay()]+' kl. '+esc(e.tt||e.t)+'</em></div>';
    var qrd=code?'<div class="qrw">'+code+'<div class="qrtxt">'+esc(e.qrtxt||"Skann for billetter")+'</div></div>':'';
    var side=e.img?'<div class="side"><div class="pic"><img src="'+esc(e.img)+'" alt="">'+(e.credit?'<span class="cred">'+esc(e.credit)+'</span>':'')+'</div><div class="when">'+date+qrd+'</div></div>'
                  :'<div class="side">'+date+qrd+'</div>';
    var prog=e.prog?'<ul class="prog">'+e.prog.map(function(p){return '<li><b>'+esc(p[0])+'</b><span>'+esc(p[1])+'</span></li>';}).join("")+'</ul>':'';
    return '<section class="'+cls+'" style="--c:'+k.c+(k.on?';--on:'+k.on:'')+'">'+(e.relieff&&ART[e.relieff]?ART[e.relieff]():'')+(e.art&&ART[e.art]?ART[e.art]():'')+(e.pynt&&!e.qr&&!e.img?'<div class="art-hj">'+ART[e.pynt](e)+'</div>':'')+'<div class="main"><div class="kicker">'+
      esc(e.cat==="gud"?"Gudstjeneste":e.cat==="kons"?"Konsert":"Byåsen kirke")+'<span class="chip">'+rel(x,now)+'</span></div><h2>'+
      esc(e.title)+'</h2>'+((e.lead||e.note)?'<p class="lead">'+esc(e.lead||e.note)+'</p>':'')+prog+'<div class="place">'+(e.hint?esc(e.place==="Byåsen kirke"?e.hint:e.place+" · "+e.hint):esc(e.place))+'</div></div>'+side+'</section>';
  }
  function fristTekst(N,left){
    var u=ymd(N.until), d=u.getDate()+". "+["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember"][u.getMonth()];
    return left<=0?"Siste frist for påmelding er i dag":"Påmelding innen "+d;
  }
  function noteSlide(N,now){
    var left=dayDiff(ymd(N.until),now);
    var badge='<div class="badge"><b'+(left<=0?' class="txt"':'')+'>'+(left<=0?"I dag":left)+'</b><span>'+(left<=0?"siste frist<br>for påmelding":(left===1?"dag igjen":"dager igjen")+"<br>å melde seg på")+'</span></div>';
    return '<section class="slide note'+(N.art?' medart':'')+'">'+(N.relieff&&ART[N.relieff]?ART[N.relieff]():'')+'<div class="main"><div class="kicker'+(N.nedtelling?' frist':'')+'">'+esc(N.nedtelling?fristTekst(N,left):(N.kicker||"Påmelding"))+'</div><h2>'+esc(N.title)+'</h2><p>'+esc(N.text)+
      '</p><p class="act">'+esc(N.act)+'</p></div>'+(N.art&&ART[N.art]?'<div class="nside"><div class="nart">'+ART[N.art]()+'</div>'+badge+'</div>':badge)+'</section>';
  }
  function newsSlide(){
    var ph=NEWS.img?'<div class="photo img"><img src="'+esc(NEWS.img)+'" alt=""><span class="cred">'+esc(NEWS.credit||"")+'</span></div>':'<div class="photo">'+esc(NEWS.photo||"")+'</div>';
    return '<section class="slide fast nytt">'+ph+'<div class="main"><div class="kicker">'+esc(NEWS.kicker)+
      '</div><h2>'+esc(NEWS.title)+'</h2><p>'+esc(NEWS.text)+'</p><div class="src">'+esc(NEWS.src)+'</div></div><div class="side">'+
      (qr(NEWS.url)||'<div class="ico">'+icon("globe")+'</div>')+'<div class="qrtxt">Les hele saken</div></div></section>';
  }
  function nesteGang(title,now){
    return E.filter(function(e){return e.title===title&&!e.utkast&&dt(e,e.last).getTime()>now.getTime();})[0];
  }
  function fastSlide(fa,now){
    var kicker=fa.kicker;
    if(fa.neste){var n=nesteGang(fa.neste,now||new Date());if(!n) return "";kicker="Neste gang "+dLong(dt(n)).toLowerCase()+" kl. "+(n.tt||n.t)+" · "+n.place;}
    var ph=fa.img?'<div class="photo img"><img src="'+esc(fa.img)+'" alt=""><span class="cred">'+esc(fa.credit||"")+'</span></div>':'';
    var side=(fa.img&&!fa.qr)?'':(fa.photo&&!fa.img)?'<div class="photo">'+esc(fa.photo)+'</div>':
      '<div class="side">'+(qr(fa.qr)||'<div class="ico">'+icon("heart")+'</div>')+'<div class="qrtxt">'+esc(fa.qrtxt)+'</div></div>';
    return '<section class="slide fast'+(fa.img?' medbilde':'')+(fa.img&&!fa.qr?' stort':'')+'">'+ph+'<div class="main"><div class="kicker">'+esc(kicker)+'</div><h2>'+esc(fa.title)+'</h2><p>'+esc(fa.text)+
      '</p></div>'+side+'</section>';
  }

  // ---- Regler for runden. Justeres her. ----
  // Bygger på rapporten «Infoskjerm i våpenhuset: anbefalinger for plakater og karusell» (november 2026).
  // Rapporten anbefaler 6–8 plakater, 8–12 s hver og en runde på 60–90 s. Vi bruker den øvre grensen.
  var REGLER={
    maks:8,                 // plakater i runden
    maksSek:90,             // lengste runde i sekunder
    sek:{vanlig:10, lang:12},  // 10 s for en vanlig plakat (≤ 20 ord), 12 s for samlesider, programlister og plakater med QR-kode
    ord:{tittel:7, totalt:20}, // overskrift ≤ 7 ord, hele plakaten ≤ 20 ord, klokkeslett og tall ikke medregnet (sjekk.js)
    fremhevet:{dager:21, konsertDager:42},   // egen plakat fra 3 uker før, konserter med billettsalg fra 6 uker før
    liste:{                 // samlesider: høyst 5 linjer, 3 uker fram (konserter 6 uker)
      gud:{antall:5,dager:21}, barn:{antall:5,dager:21}, mote:{antall:5,dager:21}, kons:{antall:5,dager:42}
    },
    // Tidskritisk: alt som skjer de neste 8 dagene, og påmeldingsfrister de neste 8 dagene, skal stå i hver runde.
    // Trengs det, kan runden da gå opp til 10 plakater og 120 sekunder. Holder ikke det heller, samles
    // arrangementene de neste 8 dagene som ikke har egen plakat, på siden «Denne uka i kirka».
    kritisk:{dager:8, maks:10, maksSek:120},
    // Rekkefølgen plassene fordeles i. Gudstjenester er alltid med.
    prioritet:["gud","feat1","note1","barn","mote","feat2","kons","feat3"]
  };
  function varighet(h){return /^<section class="slide" |qrbox|class="prog"/.test(h)?REGLER.sek.lang:REGLER.sek.vanlig;}

  // ---- Samlesidene for en gitt dato ----
  function lists(now,withDrafts){
    var up=E.filter(function(e){return !e.erstatter&&(withDrafts||!e.utkast)&&dt(e,e.last).getTime()+2*3600e3>now.getTime();}).sort(function(a,b){return dt(a)-dt(b);});
    var days=function(e){return (dt(e)-now)/864e5;};
    var R=REGLER.liste, within=function(k){return function(e){return days(e)<=R[k].dager;};};
    var season=now>=SEASON[0]&&now<SEASON[1], S={}, I={};
    var gudItems=[], gName, gSub, gC, gExtra;
    if(season){
      gudItems=up.filter(function(e){return e.cat==="gud"&&e.jul;}).slice(0,5);
      gName="Advent og jul"; gSub="Gudstjenester fram til 1. juledag"; gC="var(--advent)"; gExtra=candles(now);
    }
    if(!season||!gudItems.length){
      var allGud=up.filter(function(e){return e.cat==="gud";});
      gudItems=allGud.filter(within("gud")).slice(0,R.gud.antall);
      if(!gudItems.length) gudItems=allGud.slice(0,R.gud.antall);
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
  // runde: tellende rundenummer fra skjermsiden. Bestemmer hvem som har plassen som går på omgang.
  function build(now,runde){
    runde=runde||0;
    var L=lists(now,false), S=L.S, RF=REGLER.fremhevet, RK=REGLER.kritisk;
    var snart=function(d){return (d-now)/864e5<=RK.dager;};
    // Fremhevet: alle som er innenfor horisonten, nærmeste først
    var FE=E.filter(function(e){return e.feat&&!e.utkast&&dt(e,e.last).getTime()+2*3600e3>now.getTime()&&L.days(e)<=(e.cat==="kons"?RF.konsertDager:RF.dager);})
            .sort(function(a,b){return dt(a)-dt(b);});
    // Påmeldinger med frist, nærmeste frist først
    var NA=NOTES.filter(function(n){return !n.utkast&&now>=ymd(n.from)&&now<new Date(ymd(n.until).getTime()+86399e3);})
            .sort(function(a,b){return ymd(a.until)-ymd(b.until);});
    // Alle kandidater med nøkkel, innhold og om de er tidskritiske
    var K={}, ekstra=[];
    K.gud={h:S.gud,krit:true};
    FE.forEach(function(e,i){K["feat"+(i+1)]={h:featSlide(e,now),krit:snart(dt(e)),e:e}; if(i>=3) ekstra.push("feat"+(i+1));});
    NA.forEach(function(n,i){K["note"+(i+1)]={h:noteSlide(n,now),krit:snart(ymd(n.until))}; if(i>=1) ekstra.push("note"+(i+1));});
    // Samlesider tas bare med når de har noe som ikke allerede har egen plakat
    var rester={};
    ["barn","mote","kons"].forEach(function(k){
      rester[k]=L.I[k].filter(function(e){return FE.indexOf(e)<0;});
      if(rester[k].length) K[k]={h:S[k],krit:rester[k].some(function(e){return snart(dt(e));})};
    });
    var orden=REGLER.prioritet.concat(ekstra).filter(function(k){return K[k];});
    var lengde=function(ks){return ks.reduce(function(a,k){return a+varighet(K[k].h);},0);};
    var krit=orden.filter(function(k){return K[k].krit;});
    var maks=REGLER.maks, maksSek=REGLER.maksSek;
    // For mye tidskritisk for 8 plakater: løft taket til 10 plakater og 120 sekunder
    if(krit.length>maks-1||lengde(krit)>maksSek-REGLER.sek.lang){maks=RK.maks;maksSek=RK.maksSek;}
    // Fortsatt for mye: samle det som skjer de neste 8 dagene, uten egen plakat, på «Denne uka i kirka»
    if(krit.length>maks||lengde(krit)>maksSek){
      var uka=[], ut=[];
      ["barn","mote","kons"].forEach(function(k){ if(K[k]&&K[k].krit){ rester[k].forEach(function(e){if(snart(dt(e))&&uka.indexOf(e)<0) uka.push(e);}); ut.push(k);} });
      ekstra.forEach(function(k){ if(/^feat/.test(k)&&K[k].krit){uka.push(K[k].e);ut.push(k);} });
      uka.sort(function(a,b){return dt(a)-dt(b);});
      ut.forEach(function(k){delete K[k];});
      for(var u=0;u*5<uka.length;u++) K["uka"+(u+1)]={h:listSlide("Denne uka i kirka","Det som skjer de neste åtte dagene","#2b2a30",null,uka.slice(u*5,u*5+5),"",now,true),krit:true};
      orden=REGLER.prioritet.concat(ekstra).concat(Object.keys(K).filter(function(k){return /^uka/.test(k);})).filter(function(k){return K[k];});
      krit=orden.filter(function(k){return K[k].krit;});
    }
    // Fast innhold: en ny misjonssak er alene om plassen i 14 dager
    var fast=FAST.filter(function(f){return !f.utkast&&(!f.until||now<new Date(ymd(f.until).getTime()+864e5));});
    var fresh=!NEWS.utkast&&dayDiff(now,NEWS.published)<=14;
    // Fast innhold med lav prioritet kommer halvparten så ofte som resten
    var vanlig=[NEWS.utkast?"":newsSlide()].concat(fast.filter(function(f){return !f.lav;}).map(function(f){return fastSlide(f,now);})).filter(Boolean);
    var lav=fast.filter(function(f){return f.lav;}).map(function(f){return fastSlide(f,now);}).filter(Boolean);
    var fastPool=fresh?[newsSlide()]:vanlig;
    // Tidskritisk først, så resten etter prioritet. Den siste plassen holdes av til omgang.
    var valgt=krit.slice(), sek=lengde(valgt), faste=maks-1, fasteSek=maksSek-REGLER.sek.lang;
    orden.forEach(function(k){
      if(valgt.indexOf(k)<0&&valgt.length<faste&&sek+varighet(K[k].h)<=fasteSek){valgt.push(k);sek+=varighet(K[k].h);}
    });
    // Det som ikke fikk fast plass, går på omgang. Alt kommer like ofte, unntatt fast innhold med lav prioritet,
    // som kommer halvparten så ofte.
    var datert=orden.filter(function(k){return valgt.indexOf(k)<0;}).map(function(k){return K[k].h;});
    var rest=datert.concat(fastPool);
    if(lav.length&&!fresh) rest=rest.concat(rest,lav);
    var fri=Math.max(0,Math.min(maks-valgt.length, Math.floor((maksSek-sek)/REGLER.sek.lang))), fyll=[], omgang=[];
    if(rest.length<=fri) fyll=rest;
    else if(fri>0){fyll=rest.slice(0,fri-1);omgang=rest.slice(fri-1);fyll.push(omgang[runde%omgang.length]);}
    // Fast rekkefølge på skjermen
    var vis=["feat1","gud","note1","barn","feat2","mote","feat3","kons"];
    var rekke=vis.filter(function(k){return valgt.indexOf(k)>=0;}).concat(valgt.filter(function(k){return vis.indexOf(k)<0;}).sort(function(a,b){return (/^uka/.test(a)?0:1)-(/^uka/.test(b)?0:1);}));
    var slides=rekke.map(function(k){return K[k].h;}).concat(fyll);
    return {slides:slides,durs:slides.map(varighet),omgang:omgang.length,next:nextText(now)};
  }
  function nextText(now){
    var n=E.filter(function(e){return !e.utkast&&!e.erstatter&&dt(e,e.last).getTime()+2*3600e3>now.getTime();}).sort(function(a,b){return dt(a)-dt(b);})[0];
    return n?dShort(dt(n)).toLowerCase()+" kl. "+n.t+"  "+n.title:"Se kirken.no for program";
  }

  // ---- Én bestemt plakat, også utkast. Brukes av forhåndsvisningen i stabsmøtet. ----
  // nøkler: feat:<id> · note:<id> · fast:<id> · nytt · liste:gud|barn|kons|mote
  function slide(key,now){
    var p=key.split(":"), e;
    if(p[0]==="feat"){e=E.filter(function(x){return x.id===p[1];})[0];return e?featSlide(e,now):"";}
    if(p[0]==="note"){e=NOTES.filter(function(x){return x.id===p[1];})[0];return e?noteSlide(e,now):"";}
    if(p[0]==="fast"){e=FAST.filter(function(x){return x.id===p[1];})[0];return e?fastSlide(e,now):"";}
    if(p[0]==="nytt") return newsSlide();
    if(p[0]==="liste") return lists(now,true).S[p[1]]||"";
    return "";
  }

  // Alle plakatnøkler, for sjekk.js
  function nokler(){
    return E.filter(function(e){return e.feat;}).map(function(e){return "feat:"+e.id;})
      .concat(NOTES.map(function(n){return "note:"+n.id;})).concat(FAST.map(function(f){return "fast:"+f.id;})).concat(["nytt"]);
  }

  return {build:build,slide:slide,nextText:nextText,dLong:dLong,nokler:nokler};
})();
