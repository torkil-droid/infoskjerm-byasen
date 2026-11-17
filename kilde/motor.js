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
      lead:"Hjemmelagde varer, julebakst, gaver og loddsalg. Barnekorene synger, og det serveres grøt fra 12.30."},
    {d:"2026-11-22",t:"11.00",title:"Gudstjeneste og KRIK 10+",note:"Avskjed for kapellan Sara Krog",place:"Byåsen kirke",cat:"gud"},
    {d:"2026-11-23",t:"17.00",title:"Familiekoret, første øvelse",place:"Ungdomssalen",cat:"barn"},
    {d:"2026-11-24",t:"10.30",title:"Babykonsert",note:"Avslutning på høstens babysang",place:"Ungdomssalen",cat:"barn"},
    {d:"2026-11-24",t:"11.30",title:"Åpen kafé",place:"Menighetssalen",cat:"mote"},
    {d:"2026-11-28",t:"11.00",tt:"11.00–13.00",title:"Legokafé",note:"Barnesangstund kl. 12.30",place:"Kirkerommet",cat:"barn",alsoMote:true},
    {d:"2026-11-29",t:"11.00",title:"Gudstjeneste for liten og stor",note:"1. søndag i advent",place:"Byåsen kirke",cat:"gud",alsoBarn:true,jul:true},
    {d:"2026-12-04",t:"19.00",title:"Julekonsert med Trondheimsolistene",note:"Solist: Stine Bogsveen",place:"Byåsen kirke, ungdomssalen",cat:"kons",feat:true,id:"julekonsert",
      lead:"Trondheimsolistene og Stine Bogsveen. Billetter på Hoopla.",qr:"https://www.hoopla.no"},
    {d:"2026-12-05",t:"14.00",title:"Menighetens julemiddag",note:"Med underholdning",place:"Menighetssalen",cat:"mote"},
    {d:"2026-12-06",t:"15.00",title:"Adventsgudstjeneste ute på Lian",note:"Julemagi Lian gård",place:"Lianvannet, ved gressletta",cat:"gud",feat:true,id:"lian",jul:true,
      lead:"Utendørs gudstjeneste under Julemagi på Lian gård. Kle deg etter været."},
    {d:"2026-12-06",t:"19.00",title:"Kveldsgudstjeneste",place:"Byåsen kirke",cat:"gud",jul:true},
    {d:"2026-12-07",t:"17.00",title:"Familiekoret, øvelse",place:"Ungdomssalen",cat:"barn"},
    {d:"2026-12-08",t:"19.00",title:"Adventskonsert med Byåsen sangkor",place:"Byåsen kirke",cat:"kons"},
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
    {d:"2027-02-02",t:"11.30",title:"Hyggestund: «Fra gata til Nordkapp»",note:"Dokumentar på storskjerm",place:"Menighetssalen",cat:"mote"}
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
     act:"Påmeldingsfrist fredag 27. november"}
  ];
  // Fast innhold: uten dato. Én per runde, og bare når det er plass.
  var FAST=[
    {id:"giver",title:"Bli fast giver",text:"Arbeidet i menigheten er avhengig av gaver. Faste givere gir oss stabile og forutsigbare rammer.",
     kicker:"Støttelaget",qr:"https://www.kirken.no",qrtxt:"Skann for å bli giver"},
    {id:"ramallah",title:"Vår vennskapsmenighet i Ramallah",text:"Byåsen menighet har vennskapsavtale med Church of Hope i Ramallah. Vi ber for hverandre og besøker hverandre.",
     kicker:"Church of Hope",photo:"Bilde fra Church of Hope legges inn her"}
  ];
  // Siste nyhetssak fra misjonsprosjektet. Byttes når NMS publiserer en ny.
  var NEWS={published:new Date(2026,9,5),kicker:"Misjonsprosjektet vårt · NMS i Asia",
    title:"Tretti deltakere kartla talentene sine i Yangon",
    text:"NMS holdt et tredagers kurs for fire lutherske kirker i Myanmar. Boka «Use Your Talents Asia» ble lansert på burmesisk, og kirkene fikk 500 eksemplarer.",
    src:"nms.no · 5. oktober 2026",url:"https://nms.no/nyhet/entusiasme-for-use-your-talents-i-myanmar",
    photo:"Toppbildet fra nyhetssaken hentes inn her. Foto: Marieke Rode-Christoffersen"};
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
    var k=CAT[e.cat],x=dt(e),code=e.qr?qr(e.qr):"";
    return '<section class="slide feat" style="--c:'+k.c+(k.on?';--on:'+k.on:'')+'"><div class="main"><div class="kicker">'+
      esc(e.cat==="gud"?"Gudstjeneste":e.cat==="kons"?"Konsert":"Byåsen kirke")+'<span class="chip">'+rel(x,now)+'</span></div><h2>'+
      esc(e.title)+'</h2><p class="lead">'+esc(e.lead||e.note||"")+'</p><div class="place">'+esc(e.place)+'</div></div><div class="side"><div class="big"><b>'+
      x.getDate()+'</b><span>'+MON[x.getMonth()]+'</span><em>'+DAYL[x.getDay()]+' kl. '+esc(e.t)+'</em></div>'+
      (code?'<div>'+code+'<div class="qrtxt">Skann for billetter</div></div>':'')+'</div></section>';
  }
  function noteSlide(N,now){
    var left=dayDiff(ymd(N.until),now);
    return '<section class="slide note"><div class="main"><div class="kicker">Påmelding</div><h2>'+esc(N.title)+'</h2><p>'+esc(N.text)+
      '</p><p class="act">'+esc(N.act)+'</p></div><div class="badge"><b>'+(left<=0?"I dag":left)+'</b><span>'+(left<=0?"siste frist":left===1?"dag igjen":"dager igjen")+'</span></div></section>';
  }
  function newsSlide(){
    return '<section class="slide fast nytt"><div class="photo">'+esc(NEWS.photo)+'</div><div class="main"><div class="kicker">'+esc(NEWS.kicker)+
      '</div><h2>'+esc(NEWS.title)+'</h2><p>'+esc(NEWS.text)+'</p><div class="src">'+esc(NEWS.src)+'</div></div><div class="side">'+
      (qr(NEWS.url)||'<div class="ico">'+icon("globe")+'</div>')+'<div class="qrtxt">Les hele saken</div></div></section>';
  }
  function fastSlide(fa){
    return '<section class="slide fast"><div class="main"><div class="kicker">'+esc(fa.kicker)+'</div><h2>'+esc(fa.title)+'</h2><p>'+esc(fa.text)+
      '</p></div>'+(fa.photo?'<div class="photo">'+esc(fa.photo)+'</div>':'<div class="side">'+(qr(fa.qr)||'<div class="ico">'+icon("heart")+'</div>')+
      '<div class="qrtxt">'+esc(fa.qrtxt)+'</div></div>')+'</section>';
  }

  // ---- Samlesidene for en gitt dato ----
  function lists(now,withDrafts){
    var up=E.filter(function(e){return (withDrafts||!e.utkast)&&dt(e,e.last).getTime()+2*3600e3>now.getTime();});
    var days=function(e){return (dt(e)-now)/864e5;};
    var season=now>=SEASON[0]&&now<SEASON[1], S={};
    var gudItems=[], gName, gSub, gC, gExtra;
    if(season){
      gudItems=up.filter(function(e){return e.cat==="gud"&&e.jul;}).slice(0,5);
      gName="Advent og jul"; gSub="Gudstjenester fram til 1. juledag"; gC="var(--advent)"; gExtra=candles(now);
    }
    if(!season||!gudItems.length){
      gudItems=up.filter(function(e){return e.cat==="gud";}).slice(0,4);
      gName=CAT.gud.name; gSub=CAT.gud.sub; gC=CAT.gud.c; gExtra=mark("gud");
    }
    var kons=up.filter(function(e){return e.cat==="kons"&&days(e)<=56;}).slice(0,4);
    var barn=up.filter(function(e){return e.cat==="barn"||e.alsoBarn;}).slice(0,5);
    var mote=up.filter(function(e){return e.cat==="mote"||e.alsoMote;}).slice(0,5);
    var kqr=kons.length?qr("https://www.hoopla.no"):"";
    S.gud=listSlide(gName,gSub,gC,null,gudItems,gExtra,now);
    S.barn=listSlide(CAT.barn.name,CAT.barn.sub,CAT.barn.c,CAT.barn.on,barn,mark("barn"),now);
    S.kons=listSlide(CAT.kons.name,CAT.kons.sub,CAT.kons.c,null,kons,kqr?'<div class="qr">'+kqr+'<div class="qrtxt">Billetter og<br>mer informasjon</div></div>':mark("kons"),now);
    S.mote=listSlide(CAT.mote.name,CAT.mote.sub,CAT.mote.c,null,mote,mark("mote"),now);
    return {S:S,up:up,days:days};
  }

  // ---- Hele runden på skjermen ----
  function build(now){
    var L=lists(now,false), S=L.S, up=L.up;
    var F=up.filter(function(e){return e.feat&&L.days(e)<=21;}).slice(0,2).map(function(e){return featSlide(e,now);});
    var N=NOTES.filter(function(n){return !n.utkast&&now>=ymd(n.from)&&now<new Date(ymd(n.until).getTime()+86399e3);})[0];
    if(N) S.note=noteSlide(N,now);
    // Fast plass: ny misjonssak har plassen alene i 14 dager, deretter bytter de på fra dag til dag.
    var fast=FAST.filter(function(f){return !f.utkast;});
    var rot=[NEWS.utkast?null:newsSlide()].concat(fast.map(fastSlide)).filter(Boolean);
    var fresh=!NEWS.utkast&&dayDiff(now,NEWS.published)<=14, turn=rot.length?((dayDiff(now,new Date(2026,10,12))%rot.length)+rot.length)%rot.length:0;
    S.fast=fresh?newsSlide():rot[turn]||"";
    // Rekkefølge i runden. Blir det flere enn sju, viker fast innhold først.
    var order=[F[0],S.gud,S.note,S.barn,F[1],S.kons,S.mote,S.fast].filter(Boolean);
    if(order.length>7) order=order.filter(function(x){return x!==S.fast;});
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
