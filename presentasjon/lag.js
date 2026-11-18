const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");
const { applyTheme } = require(process.env.APPLY_THEME || require("path").join(require("os").homedir(),".claude/skills/pptx/scripts/apply_theme.js"));

const THEME = {
  name: "Byåsen kirke infoskjerm",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "16151A", lt1: "FFFFFF", dk2: "1B1470", lt2: "F3F1EC",
    accent1: "C8102E", accent2: "1F6F5B", accent3: "1B1470",
    accent4: "E9A100", accent5: "5B2A86", accent6: "5D5B63",
    hlink: "1B1470", folHlink: "5B2A86",
  },
};
const HEX = THEME.colors;

async function icon(Comp, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: "#" + color, size: String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
  pres.author = "Torkil Skille";
  pres.title = "Infoskjermen i våpenhuset";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  const C = pres.SchemeColor;

  // ---------- Layouter ----------
  pres.defineSlideMaster({
    title: "MORK",
    background: { color: C.text1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.7, y: 2.0, w: 6.0, h: 1.9, fontSize: 44, bold: true, color: C.background1, valign: "bottom", align: "left", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.7, y: 4.1, w: 6.0, h: 1.4, fontSize: 18, color: "D9D6CF", valign: "top", align: "left", margin: 0 }, text: "" } },
    ],
  });
  pres.defineSlideMaster({
    title: "INNHOLD",
    background: { color: C.background1 },
    margin: [0.5, 0.6, 0.6, 0.6],
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.4, w: 12.1, h: 0.9, fontSize: 34, bold: true, color: C.text1, valign: "middle", align: "left", margin: 0 }, text: "" } },
      { text: { text: "Infoskjermen i våpenhuset · Byåsen kirke", options: { x: 0.6, y: 7.0, w: 6, h: 0.3, fontSize: 10, color: "8A8790", margin: 0 } } },
    ],
    slideNumber: { x: 12.2, y: 7.0, w: 0.5, h: 0.3, fontSize: 10, color: "8A8790", align: "right" },
  });

  const shadow = () => ({ type: "outer", color: "000000", blur: 8, offset: 3, angle: 90, opacity: 0.22 });
  const I = {
    clock: await icon(fa.FaSyncAlt, HEX.accent1),
    hand: await icon(fa.FaHandsHelping, HEX.accent1),
    palette: await icon(fa.FaPalette, HEX.accent1),
    cal: await icon(fa.FaCalendarAlt, "FFFFFF"),
    mail: await icon(fa.FaEnvelope, "FFFFFF"),
    globe: await icon(fa.FaGlobeEurope, "FFFFFF"),
    robot: await icon(fa.FaMagic, "FFFFFF"),
    users: await icon(fa.FaUsers, "FFFFFF"),
    tv: await icon(fa.FaTv, "FFFFFF"),
    lock: await icon(fa.FaLock, HEX.accent2),
    check: await icon(fa.FaCheckCircle, HEX.accent2),
    eye: await icon(fa.FaUserShield, HEX.accent1),
    ticket: await icon(fa.FaTicketAlt, HEX.accent3),
    list: await icon(fa.FaListUl, HEX.accent3),
    ban: await icon(fa.FaEyeSlash, HEX.accent3),
    trash: await icon(fa.FaTrashAlt, HEX.accent3),
  };

  // Hjelper: ikon i farget sirkel
  function iconCircle(slide, img, x, y, d, fill) {
    slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill }, objectName: "ikonsirkel" });
    slide.addImage({ data: img, x: x + d * 0.24, y: y + d * 0.24, w: d * 0.52, h: d * 0.52, objectName: "ikon" });
  }

  // ---------- 1. Tittel ----------
  pres.addSection({ title: "Innledning" });
  let s = pres.addSlide({ masterName: "MORK", sectionTitle: "Innledning" });
  s.addText("Infoskjermen i våpenhuset", { placeholder: "title" });
  s.addText("Slik fungerer den nye løsningen\nStabsmøtet 18. november 2026", { placeholder: "body" });
  s.addImage({ path: "img/advent.png", x: 6.9, y: 0.9, w: 5.9, h: 3.32, shadow: shadow(), objectName: "plakat advent" , altText: "Plakaten Advent og jul" });
  s.addImage({ path: "img/julemesse.png", x: 8.4, y: 3.6, w: 4.4, h: 2.48, shadow: shadow(), objectName: "plakat julemesse", altText: "Plakaten for julemessa" });
  s.addNotes("Kort om hva dette er: en skjerm i våpenhuset som holder seg oppdatert av seg selv, med plakater i én felles profil. Målet i dag er at alle forstår hvordan det henger sammen, hva som skjer automatisk, og hva vi i staben gjør. Selve gjennomgangen av ukas plakater tar vi etterpå, på gjennomgangssiden.");

  // ---------- 2. Før og etter ----------
  s = pres.addSlide({ masterName: "INNHOLD", sectionTitle: "Innledning" });
  s.addText("Fra hastverksplakater til én felles mal", { placeholder: "title" });
  s.addImage({ path: "img/for_crop.jpg", x: 0.6, y: 1.6, w: 5.9, h: 3.19, shadow: shadow(), objectName: "før", altText: "Skjermen slik den var: to stående A4-plakater med liten tekst" });
  s.addImage({ path: "img/julemesse.png", x: 6.83, y: 1.6, w: 5.9, h: 3.32, shadow: shadow(), objectName: "etter", altText: "Ny plakat for julemessa" });
  s.addText([{ text: "Før", options: { bold: true, color: C.text1 } }, { text: "  Stående A4-plakater og skjermbilder av nettsider. Teksten er for liten til å leses på avstand.", options: { color: "5D5B63" } }],
    { x: 0.6, y: 5.1, w: 5.9, h: 1.0, fontSize: 15, valign: "top", margin: 0, isTextBox: true });
  s.addText([{ text: "Nå", options: { bold: true, color: C.accent1 } }, { text: "  Laget for liggende skjerm: dato først, stor tekst, og én QR-kode der det trengs.", options: { color: "5D5B63" } }],
    { x: 6.83, y: 5.1, w: 5.9, h: 1.0, fontSize: 15, valign: "top", margin: 0, isTextBox: true });
  s.addNotes("Til venstre: slik skjermen så ut. Mye god vilje, men A4-plakater på en liggende skjerm blir små, og gudstjenestelista viste ting som allerede hadde vært. Til høyre: samme julemesse i den nye malen. Datoen er det første du ser, og teksten er kort nok til å leses i forbifarten.");

  // ---------- 3. Tre mål ----------
  s = pres.addSlide({ masterName: "INNHOLD", sectionTitle: "Innledning" });
  s.addText("Tre ting løsningen skal gjøre", { placeholder: "title" });
  const goals = [
    [I.clock, "Alltid oppdatert", "Utløpte plakater forsvinner av seg selv, og nye arrangementer kommer fra kalenderen."],
    [I.hand, "Lite ekstraarbeid", "Kalenderen gjør det meste. Staben bruker 5–10 minutter i stabsmøtet på å godkjenne."],
    [I.palette, "Én tydelig profil", "Samme mal, farger og rekkefølge på alle plakater, så skjermen er lett å kjenne igjen."],
  ];
  goals.forEach((g, i) => {
    const y = 1.7 + i * 1.6;
    s.addShape(pres.shapes.OVAL, { x: 0.8, y, w: 1.0, h: 1.0, fill: { color: "FBE7EA" }, line: { color: "FBE7EA" }, objectName: "ikonsirkel" });
    s.addImage({ data: g[0], x: 1.04, y: y + 0.24, w: 0.52, h: 0.52, objectName: "ikon" });
    s.addText(g[1], { x: 2.1, y: y - 0.02, w: 5.4, h: 0.5, fontSize: 22, bold: true, color: C.text1, fontFace: THEME.headFontFace, margin: 0, isTextBox: true });
    s.addText(g[2], { x: 2.1, y: y + 0.48, w: 5.4, h: 0.7, fontSize: 15, color: "5D5B63", margin: 0, valign: "top", isTextBox: true });
  });
  s.addImage({ path: "img/barn.png", x: 7.9, y: 2.0, w: 4.8, h: 2.7, shadow: shadow(), objectName: "plakat barn", altText: "Samleside for barn og familier" });
  s.addText("Samlesiden «For barn og familier» bygges direkte fra kalenderen.", { x: 7.9, y: 4.85, w: 4.8, h: 0.5, fontSize: 12, italic: true, color: "5D5B63", margin: 0, isTextBox: true });
  s.addNotes("Tre mål. Én: skjermen skal aldri vise noe som har vært. Dette skjer av seg selv. To: det skal ikke bli en ny jobb for noen. Kalenderen vi uansett fører, er kilden. Tre: én profil, så folk lærer seg å lese skjermen. Eksempelet til høyre er laget rett fra kalenderen, uten at noen har tegnet noe.");

  // ---------- 4. Fire plakattyper ----------
  pres.addSection({ title: "Slik virker det" });
  s = pres.addSlide({ masterName: "INNHOLD", sectionTitle: "Slik virker det" });
  s.addText("Fire typer plakater", { placeholder: "title" });
  const types = [
    ["img/julemesse.png", "Fremhevet arrangement", "Ett arrangement på hele skjermen, fra tre uker før (konserter seks)."],
    ["img/barn.png", "Samleside", "Gudstjenester, barn og familier, konserter og møteplasser. De nærmeste først."],
    ["img/julemiddag.png", "Oppslag med frist", "Påmelding og lignende, med nedtelling til fristen."],
    ["img/nytt.png", "Fast innhold", "Misjonsnytt, støttelaget, Ramallah og faste treff går på omgang."],
  ];
  types.forEach((t, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.6 + col * 6.23, y = 1.55 + row * 2.75;
    s.addImage({ path: t[0], x, y, w: 3.4, h: 1.91, shadow: shadow(), objectName: "plakat " + t[1], altText: t[1] });
    s.addText(t[1], { x: x + 3.6, y: y + 0.05, w: 2.3, h: 0.7, fontSize: 18, bold: true, color: C.text1, fontFace: THEME.headFontFace, margin: 0, valign: "top", isTextBox: true });
    s.addText(t[2], { x: x + 3.6, y: y + 0.8, w: 2.3, h: 1.1, fontSize: 14, color: "5D5B63", margin: 0, valign: "top", isTextBox: true });
  });
  s.addNotes("Det finnes bare fire typer plakater, og alt passer inn i en av dem. Fremhevet er for de store arrangementene. Samlesidene viser de neste arrangementene i hver kategori. Legokafeen står for eksempel både under barn og familier og under møteplasser. Oppslag er for ting med en frist. Fast innhold er misjonsprosjektet, støttelaget, vennskapsmenigheten og faste treff som Åpen kafé. De har ingen dato og går på omgang.");


  // ---------- 4b. Slik går runden ----------
  s = pres.addSlide({ masterName: "INNHOLD", sectionTitle: "Slik virker det" });
  s.addText("Slik går runden", { placeholder: "title" });
  const tall = [
    ["8", "plakater i runden", C.accent1],
    ["90", "sekunder per runde", C.accent2],
    ["20", "ord på hver plakat", C.accent3],
    ["3", "uker fram, konserter seks", C.accent5],
  ];
  tall.forEach((t, i) => {
    const x = 0.6 + i * 3.08;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.6, w: 2.85, h: 2.6, rectRadius: 0.12, fill: { color: "F4F1EA" }, line: { color: "F4F1EA" }, objectName: "tall " + t[1] });
    s.addText(t[0], { x: x + 0.3, y: 1.8, w: 2.3, h: 1.3, fontSize: 66, bold: true, color: t[2], fontFace: THEME.headFontFace, margin: 0, valign: "bottom", isTextBox: true });
    s.addText(t[1], { x: x + 0.3, y: 3.2, w: 2.3, h: 0.8, fontSize: 16, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  });
  s.addText([
    { text: "Gudstjenestene er alltid med. ", options: { bold: true } },
    { text: "Det som skjer de neste 8 dagene, kommer alltid med, om nødvendig med inntil 10 plakater. Den siste plassen går på omgang, så ingenting godkjent faller ut." },
  ], { x: 0.6, y: 4.6, w: 12.15, h: 0.6, fontSize: 17, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  s.addText("Bygger på forskning og bransjeråd om infoskjermer der folk vrimler. Vi bruker den øvre grensen.", { x: 0.6, y: 5.35, w: 12.15, h: 0.5, fontSize: 14, color: "5D5B63", margin: 0, valign: "top", isTextBox: true });
  s.addNotes("Reglene for runden bygger på en gjennomgang av forskning og bransjeråd om infoskjermer der folk vrimler. Anbefalingen er seks til åtte plakater og et til halvannet minutt per runde, og vi bruker den øvre grensen for å få med mest mulig. Plakatene står ti sekunder, samlesider og plakater med QR-kode tolv. Hver plakat har høyst tjue ord, og resten hører hjemme bak QR-koden. Gudstjenestene er alltid med. Det som skjer de neste åtte dagene, og påmeldingsfrister de neste åtte dagene, står alltid i runden. I travle uker kan runden da gå opp til ti plakater og to minutter, og holder ikke det, samles arrangementene på siden «Denne uka i kirka». Den siste plassen går på omgang, så det som ikke får fast plass, kommer innimellom.");


  // ---------- 4c. Denne uka i kirka ----------
  s = pres.addSlide({ masterName: "INNHOLD", sectionTitle: "Slik virker det" });
  s.addText("Når det skjer mye: «Denne uka i kirka»", { placeholder: "title" });
  s.addImage({ path: "img/uka.png", x: 0.6, y: 1.55, w: 7.4, h: 4.16, shadow: shadow(), objectName: "plakat denne uka", altText: "Samlesiden Denne uka i kirka med arrangementene de neste åtte dagene" });
  s.addText([
    { text: "Det som skjer de neste 8 dagene, og påmeldingsfrister, står alltid i runden.", options: { bullet: true, breakLine: true } },
    { text: "Trengs det, kan runden gå fra 8 til 10 plakater.", options: { bullet: true, breakLine: true } },
    { text: "Holder ikke det, samles det som ikke har egen plakat, på én side.", options: { bullet: true, breakLine: true } },
    { text: "Konserter mer enn 8 dager unna samles på konsertsiden i stedet for å få egne plakater.", options: { bullet: true, breakLine: true } },
    { text: "Datoen har kategorifargen, så barn, møteplasser og konserter skiller seg ut.", options: { bullet: true } },
  ], { x: 8.4, y: 1.7, w: 4.3, h: 3.9, fontSize: 16, color: C.text1, paraSpaceAfter: 12, valign: "top", margin: 0, isTextBox: true });
  s.addNotes("Svaret på spørsmålet om noe kan bli borte i travle uker. Alt som skjer de neste åtte dagene, og alle påmeldingsfrister de neste åtte dagene, står i hver runde. I travle uker kan runden gå opp til ti plakater og to minutter. Holder ikke det heller, samler skjermen det som ikke har egen plakat, på denne siden. Eksempelet er bygd fra kalenderen slik den ser ut fredag 20. november. Datoene har farge etter kategori: gult for barn og familier, grønt for møteplasser, blått for konserter. Siden dukker bare opp når det trengs. I travle uker samles dessuten konserter som er mer enn åtte dager unna, på konsertsiden, så de ikke tar plassene fra resten. Hver konsert får egen plakat igjen åtte dager før.");

  // ---------- 5. Sesong ----------
  s = pres.addSlide({ masterName: "INNHOLD", sectionTitle: "Slik virker det" });
  s.addText("Kirkeåret styrer sesongsidene", { placeholder: "title" });
  s.addImage({ path: "img/advent.png", x: 0.6, y: 1.55, w: 7.4, h: 4.16, shadow: shadow(), objectName: "plakat advent", altText: "Sesongsiden Advent og jul med adventslys" });
  s.addText([
    { text: "Fra 23. november til 2. juledag blir gudstjenestesiden til «Advent og jul».", options: { bullet: true, breakLine: true } },
    { text: "Adventslysene tennes søndag for søndag.", options: { bullet: true, breakLine: true } },
    { text: "Påske og sommer får egne sider på samme måte.", options: { bullet: true, breakLine: true } },
    { text: "Ingen trenger å huske å bytte. Datoen styrer det.", options: { bullet: true } },
  ], { x: 8.4, y: 1.7, w: 4.3, h: 3.9, fontSize: 16, color: C.text1, paraSpaceAfter: 12, valign: "top", margin: 0, isTextBox: true });
  s.addNotes("Et eksempel på det som går av seg selv. Når advent nærmer seg, bytter gudstjenestesiden til «Advent og jul» i kirkeårets farge, og ett nytt lys tennes hver søndag. Det samme gjør vi for påske og sommer.");

  // ---------- 6. Slik henger det sammen ----------
  s = pres.addSlide({ masterName: "INNHOLD", sectionTitle: "Slik virker det" });
  s.addText("Slik henger det sammen", { placeholder: "title" });
  const steps = [
    { x: 0.6, img: I.cal, fill: HEX.accent3, t: "Kildene", d: "Kalenderen på kirken.no, skjerminnboksen og NMS-siden" },
    { x: 3.75, img: I.robot, fill: HEX.accent5, t: "Claude", d: "Lager plakater og et ukesforslag med spørsmål" },
    { x: 6.9, img: I.users, fill: HEX.accent1, t: "Stabsmøtet", d: "Godkjenner, endrer eller avviser på 5–10 minutter" },
    { x: 10.05, img: I.tv, fill: HEX.accent2, t: "Skjermen", d: "Henter siden hvert kvarter og viser runden" },
  ];
  steps.forEach((st, i) => {
    const y = 1.8;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: st.x, y, w: 2.7, h: 3.0, rectRadius: 0.12, fill: { color: "F6F5F2" }, line: { color: "E2DFD8" }, objectName: "steg " + st.t });
    iconCircle(s, st.img, st.x + 0.85, y + 0.3, 1.0, st.fill);
    s.addText(st.t, { x: st.x + 0.15, y: y + 1.45, w: 2.4, h: 0.5, fontSize: 20, bold: true, align: "center", color: C.text1, fontFace: THEME.headFontFace, margin: 0, isTextBox: true });
    s.addText(st.d, { x: st.x + 0.2, y: y + 1.95, w: 2.3, h: 0.95, fontSize: 13, align: "center", color: "5D5B63", margin: 0, valign: "top", isTextBox: true });
    if (i < 3) s.addShape(pres.shapes.LINE, { x: st.x + 2.75, y: y + 1.5, w: 0.4, h: 0, line: { color: "8A8790", width: 2, endArrowType: "triangle" }, objectName: "pil" });
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 5.2, w: 12.15, h: 1.25, rectRadius: 0.1, fill: { color: "EEF6F3" }, line: { color: "EEF6F3" }, objectName: "merknad" });
  s.addText([
    { text: "Snarvei for kalenderen: ", options: { bold: true, color: C.accent2 } },
    { text: "Vanlige arrangementer fra kalenderen går rett på samlesidene, uten godkjenning. Alt Claude skriver selv, og alt som sendes inn, går via stabsmøtet.", options: { color: C.text1 } },
  ], { x: 0.9, y: 5.3, w: 11.6, h: 1.05, fontSize: 15, valign: "middle", margin: 0, isTextBox: true });
  s.addNotes("Fire ledd. Kildene er kalenderen vi allerede fører, en egen e-postadresse for skjermen, og NMS-siden for misjonsnytt. Claude, en KI-assistent, leser dem og lager plakater og et ukesforslag. Vi godkjenner i stabsmøtet. Skjermen viser en nettside som hentes på nytt hvert kvarter, så ingen trenger å logge inn i Samsung-systemet for å oppdatere. Det viktige poenget nederst: det som står i kalenderen fra før, går rett ut. Det som er nytt eller skrevet av Claude, venter på oss.");

  // ---------- 7. Automatisk eller godkjent ----------
  pres.addSection({ title: "Arbeidsflyt" });
  s = pres.addSlide({ masterName: "INNHOLD", sectionTitle: "Arbeidsflyt" });
  s.addText("Hva går av seg selv, og hva godkjenner vi", { placeholder: "title" });
  const colA = ["Arrangementer fra kalenderen på samlesidene", "Plakater forsvinner når datoen er passert", "Nedtelling og «Neste i kirka»", "Bytte til sesongside", "Rotasjon av fast innhold"];
  const colB = ["Fremhevede plakater", "Oppslag med frist", "Sammendrag av misjonsnytt", "Alt som kommer inn på e-post", "Bilder"];
  [[colA, "Går av seg selv", HEX.accent2, "EEF6F3", I.check], [colB, "Godkjennes i stabsmøtet", HEX.accent1, "FBEDEF", I.eye]].forEach((c, i) => {
    const x = 0.6 + i * 6.23;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.55, w: 5.92, h: 4.05, rectRadius: 0.12, fill: { color: c[3] }, line: { color: c[3] }, objectName: "kolonne " + c[1] });
    s.addImage({ data: c[4], x: x + 0.35, y: 1.85, w: 0.5, h: 0.5, objectName: "ikon" });
    s.addText(c[1], { x: x + 1.0, y: 1.82, w: 4.6, h: 0.55, fontSize: 22, bold: true, color: c[2], fontFace: THEME.headFontFace, margin: 0, valign: "middle", isTextBox: true });
    s.addText(c[0].map((t, k) => ({ text: t, options: { bullet: true, breakLine: k < c[0].length - 1 } })),
      { x: x + 0.4, y: 2.6, w: 5.2, h: 2.8, fontSize: 16, color: C.text1, paraSpaceAfter: 8, valign: "top", margin: 0, isTextBox: true });
  });
  s.addNotes("Tommelfingerregelen: står det i kalenderen, går det automatisk. Skriver Claude noe selv, eller kommer det inn utenfra, godkjenner vi det først. Godkjenner vi ingenting en uke, skjer ingenting nytt, men skjermen holder seg likevel riktig, fordi utløpt innhold forsvinner.");

  // ---------- 8. Ukesrytmen ----------
  s = pres.addSlide({ masterName: "INNHOLD", sectionTitle: "Arbeidsflyt" });
  s.addText("Ukesrytmen", { placeholder: "title" });
  const week = [
    ["Dagen før", "Claude går gjennom kalender, innboks og NMS og legger ukesforslaget klart."],
    ["Stabsmøtet", "Vi går gjennom forslaget på TV-en: godkjenn, endre eller avvis, og svar på spørsmål."],
    ["Etter møtet", "Claude leser beslutningene, publiserer det som er godkjent og retter det som skal endres."],
    ["Resten av uka", "Skjermen oppdaterer seg. Hastesaker kan Torkil eller Ingrid godkjenne direkte."],
  ];
  s.addShape(pres.shapes.LINE, { x: 1.35, y: 2.35, w: 9.45, h: 0, line: { color: "E2DFD8", width: 3 }, objectName: "tidslinje" });
  week.forEach((w, i) => {
    const x = 0.6 + i * 3.15;
    s.addShape(pres.shapes.OVAL, { x: x + 0.25, y: 1.85, w: 1.0, h: 1.0, fill: { color: i === 1 ? HEX.accent1 : HEX.dk1 }, line: { color: "FFFFFF", width: 3 }, objectName: "steg " + (i + 1) });
    s.addText(String(i + 1), { x: x + 0.25, y: 1.85, w: 1.0, h: 1.0, fontSize: 28, bold: true, color: C.background1, align: "center", valign: "middle", fontFace: THEME.headFontFace, margin: 0, isTextBox: true });
    s.addText(w[0], { x, y: 3.15, w: 2.85, h: 0.5, fontSize: 20, bold: true, color: i === 1 ? C.accent1 : C.text1, fontFace: THEME.headFontFace, margin: 0, isTextBox: true });
    s.addText(w[1], { x, y: 3.7, w: 2.85, h: 1.8, fontSize: 15, color: "5D5B63", margin: 0, valign: "top", isTextBox: true });
  });
  s.addNotes("Slik ser en vanlig uke ut. Dagen før stabsmøtet ligger forslaget klart. I møtet bruker vi 5–10 minutter. Etter møtet gjør Claude jobben, og ingen trenger å skrive noe ned for skjermen. Resten av uka går det av seg selv. Torkil er ansvarlig og Ingrid er vara, og en av dem kan godkjenne noe som haster.");

  // ---------- 9. Gjennomgangen ----------
  s = pres.addSlide({ masterName: "INNHOLD", sectionTitle: "Arbeidsflyt" });
  s.addText("Gjennomgangen i stabsmøtet", { placeholder: "title" });
  s.addImage({ path: "img/gjennomgang.png", x: 0.6, y: 1.55, w: 7.6, h: 4.28, shadow: shadow(), objectName: "gjennomgangssiden", altText: "Gjennomgangssiden med en plakat til godkjenning" });
  s.addText([
    { text: "Én sak om gangen", options: { bold: true, breakLine: true, color: C.text1 } },
    { text: "Listen til venstre viser hva som er gjort.", options: { breakLine: true, color: "5D5B63" } },
    { text: " ", options: { breakLine: true, fontSize: 8 } },
    { text: "Ett tastetrykk per sak", options: { bold: true, breakLine: true, color: C.text1 } },
    { text: "G godkjenner, E endrer, A avviser. Siden går videre av seg selv.", options: { breakLine: true, color: "5D5B63" } },
    { text: " ", options: { breakLine: true, fontSize: 8 } },
    { text: "Det du ser, er det som kommer", options: { bold: true, breakLine: true, color: C.text1 } },
    { text: "Forhåndsvisningen er laget med samme kode som skjermen.", options: { breakLine: true, color: "5D5B63" } },
    { text: " ", options: { breakLine: true, fontSize: 8 } },
    { text: "Alt lagres med en gang", options: { bold: true, breakLine: true, color: C.text1 } },
    { text: "Ingen etterarbeid. Claude leser svarene etter møtet.", options: { color: "5D5B63" } },
  ], { x: 8.6, y: 1.6, w: 4.15, h: 4.4, fontSize: 15, valign: "top", margin: 0, isTextBox: true });
  s.addNotes("Dette er siden vi bruker i møtet, på TV-en. Én sak om gangen, med plakaten nøyaktig slik den vil se ut på skjermen. Vi trykker godkjenn, endre eller avvis, og siden går videre av seg selv. Ved «endre» skriver vi hva som skal endres. Spørsmål har ferdige svaralternativer. Når vi er ferdige, ligger alt lagret, og Claude gjennomfører det.");

  // ---------- 10. Send inn stoff ----------
  s = pres.addSlide({ masterName: "INNHOLD", sectionTitle: "Arbeidsflyt" });
  s.addText("Vil du ha noe på skjermen?", { placeholder: "title" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.6, w: 12.15, h: 1.6, rectRadius: 0.14, fill: { color: HEX.dk1 }, line: { color: HEX.dk1 }, objectName: "adresse" });
  iconCircle(s, I.mail, 1.0, 1.9, 1.0, HEX.accent1);
  s.addText([
    { text: "Send en e-post til", options: { fontSize: 16, color: "D9D6CF", breakLine: true } },
    { text: "byasen-skjerm@agentmail.to", options: { fontSize: 34, bold: true, color: C.background1, fontFace: THEME.headFontFace } },
  ], { x: 2.35, y: 1.75, w: 10.1, h: 1.3, valign: "middle", margin: 0, isTextBox: true });
  const inc = [["Hva, når og hvor", "To–tre setninger holder. Claude kutter og skriver om."], ["Hvem det er for", "Og om det trengs påmelding eller billett. Send lenken, så lages QR-koden."], ["Gjerne ett bilde", "Bilder som sendes inn, kan brukes på skjermen."]];
  inc.forEach((t, i) => {
    const x = 0.6 + i * 4.12;
    s.addText(t[0], { x, y: 3.6, w: 3.9, h: 0.5, fontSize: 19, bold: true, color: C.text1, fontFace: THEME.headFontFace, margin: 0, isTextBox: true });
    s.addText(t[1], { x, y: 4.1, w: 3.9, h: 1.0, fontSize: 15, color: "5D5B63", margin: 0, valign: "top", isTextBox: true });
  });
  s.addText("Alt som sendes inn, kommer med i neste ukesforslag og godkjennes i stabsmøtet før det vises.", { x: 0.6, y: 5.55, w: 12.15, h: 0.6, fontSize: 15, italic: true, color: C.accent1, margin: 0, isTextBox: true });
  s.addNotes("Den viktigste lappen å huske: denne adressen. Alle i staben kan sende inn, og frivillige legges til ved behov. Ingenting går direkte ut. Alt kommer som et forslag i neste gjennomgang. Det holder med noen få setninger, og bilde er fint, men ikke nødvendig.");

  // ---------- 11. Kalenderen ----------
  s = pres.addSlide({ masterName: "INNHOLD", sectionTitle: "Arbeidsflyt" });
  s.addText("Kalenderen er grunnlaget", { placeholder: "title" });
  const tips = [
    [I.list, "Legg inn alt som er åpent for alle", "Det som ikke står i kalenderen, kommer ikke på skjermen. Soul Children-øvelsene mangler i dag."],
    [I.ticket, "Billettlenke i beskrivelsen", "Ikke i tittelen. Da kan både nettsiden og skjermen bruke den."],
    [I.trash, "Slett avlyste arrangementer", "«Utgår» i tittelen vises fortsatt som et arrangement på nettsiden."],
    [I.ban, "Noe vises aldri", "Gravferder, vielser og lukkede arrangementer som skolegudstjenester står i kalenderen, men aldri på skjermen."],
  ];
  tips.forEach((t, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.6 + col * 6.23, y = 1.65 + row * 2.2;
    s.addShape(pres.shapes.OVAL, { x, y, w: 0.9, h: 0.9, fill: { color: "ECEBF5" }, line: { color: "ECEBF5" }, objectName: "ikonsirkel" });
    s.addImage({ data: t[0], x: x + 0.22, y: y + 0.22, w: 0.46, h: 0.46, objectName: "ikon" });
    s.addText(t[1], { x: x + 1.15, y: y - 0.02, w: 4.7, h: 0.5, fontSize: 19, bold: true, color: C.text1, fontFace: THEME.headFontFace, margin: 0, isTextBox: true });
    s.addText(t[2], { x: x + 1.15, y: y + 0.5, w: 4.7, h: 1.1, fontSize: 15, color: "5D5B63", margin: 0, valign: "top", isTextBox: true });
  });
  s.addNotes("En bonus: når Claude leser kalenderen hver uke, får vi en kalendervask på kjøpet. Det som er uklart, kommer som spørsmål i gjennomgangen. Fire vaner som hjelper: legg inn alt, billettlenke i beskrivelsen, slett heller enn å skrive «utgår». Og det fjerde: gravferder, vielser og lukkede arrangementer kan trygt stå i kalenderen, de kommer aldri på skjermen.");

  // ---------- 12. Trygt ----------
  s = pres.addSlide({ masterName: "INNHOLD", sectionTitle: "Arbeidsflyt" });
  s.addText("Trygt og ryddig", { placeholder: "title" });
  const locks = [
    ["Skjermsiden", "Alle kan se den, men bare Torkils konto kan endre den."],
    ["Samsung VXT", "Bare de tre administratorene bestemmer hva skjermen viser."],
    ["Skjerminnboksen", "Ingenting derfra publiseres uten godkjenning."],
  ];
  locks.forEach((l, i) => {
    const x = 0.6 + i * 4.12;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.6, w: 3.9, h: 2.3, rectRadius: 0.12, fill: { color: "EEF6F3" }, line: { color: "EEF6F3" }, objectName: "lås " + l[0] });
    s.addImage({ data: I.lock, x: x + 0.3, y: 1.85, w: 0.45, h: 0.45, objectName: "ikon" });
    s.addText(l[0], { x: x + 0.9, y: 1.82, w: 2.8, h: 0.5, fontSize: 19, bold: true, color: C.accent2, fontFace: THEME.headFontFace, margin: 0, valign: "middle", isTextBox: true });
    s.addText(l[1], { x: x + 0.3, y: 2.5, w: 3.35, h: 1.2, fontSize: 15, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  });
  s.addText("Godkjente bildekilder, foreløpig", { x: 0.6, y: 4.3, w: 12.15, h: 0.5, fontSize: 20, bold: true, color: C.text1, fontFace: THEME.headFontFace, margin: 0, isTextBox: true });
  s.addText([
    { text: "Bilder som sendes inn på e-post", options: { bullet: true, breakLine: true } },
    { text: "Facebook-siden vår", options: { bullet: true, breakLine: true } },
    { text: "NMS sine sider om Thailand-prosjektet", options: { bullet: true } },
  ], { x: 0.6, y: 4.85, w: 12.15, h: 1.6, fontSize: 15, color: C.text1, paraSpaceAfter: 6, valign: "top", margin: 0, isTextBox: true });
  s.addNotes("Ofte stilt spørsmål: kan noen utenfra få noe på skjermen? Nei. Det finnes tre låser, og alle må brytes. Nettsiden ligger på GitHub og er offentlig å se, men bare Torkils konto kan endre den. Den inneholder bare det som uansett står i den offentlige kalenderen.");

  // ---------- 13. Videre ----------
  pres.addSection({ title: "Videre" });
  s = pres.addSlide({ masterName: "MORK", sectionTitle: "Videre" });
  s.addText("Prøveperiode ut februar", { placeholder: "title" });
  s.addText("Evaluering i første stabsmøte i mars", { placeholder: "body" });
  const nxt = [
    ["Torkil", "ansvarlig"],
    ["Ingrid", "vara"],
    ["Etter hvert", "Facebook-siden som kilde for tekst og bilder"],
  ];
  nxt.forEach((n, i) => {
    const y = 1.5 + i * 1.45;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.3, y, w: 5.4, h: 1.15, rectRadius: 0.12, fill: { color: "2A2930" }, line: { color: "2A2930" }, objectName: "kort " + n[0] });
    s.addText([{ text: n[0], options: { bold: true, color: C.background1, fontSize: 22, fontFace: THEME.headFontFace, breakLine: true } }, { text: n[1], options: { color: "D9D6CF", fontSize: 15 } }],
      { x: 7.6, y: y + 0.1, w: 4.9, h: 0.95, valign: "middle", margin: 0, isTextBox: true });
  });
  s.addText("Spørsmål?", { x: 7.3, y: 5.9, w: 5.4, h: 0.6, fontSize: 24, bold: true, italic: true, color: "FF8FA0", fontFace: THEME.headFontFace, margin: 0, isTextBox: true });
  s.addNotes("Vi prøver ut februar og evaluerer i første stabsmøte i mars. Torkil er ansvarlig, Ingrid er vara. Når rutinen sitter, kan vi koble på Facebook-siden, slik at Claude kan hente inspirasjon og bilder derfra. Så åpner vi for spørsmål, og går rett over til ukas gjennomgang.");

  await pres.writeFile({ fileName: "Infoskjermen i våpenhuset.pptx" });
  await applyTheme("Infoskjermen i våpenhuset.pptx", THEME);
  // Norsk bokmål på all tekst, ellers stavekontrollerer PowerPoint den norske teksten som engelsk
  require("child_process").execFileSync("python3", [__dirname + "/norsk.py", "Infoskjermen i våpenhuset.pptx"]);
  console.log("ferdig");
})();
