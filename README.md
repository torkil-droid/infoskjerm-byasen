# Infoskjerm Byåsen kirke

Testversjon av infoskjermen i våpenhuset. Siden vises på Samsung-skjermen via Samsung VXT som nettinnhold (Web URL).

Innholdet er hentet fra den offentlige kalenderen på kirken.no. Dette er en prototype.

## Slik er det bygget

- `kilde/motor.js`: plakatkoden og arrangementslista. Det er her innholdet endres.
- `kilde/skjerm.css`: plakatmalen (farger, typografi, layout).
- `bygg.py`: bygger `index.html` (skjermen) og `gjennomgang/index.html` (gjennomgangssiden for stabsmøtet) fra de samme filene, så forhåndsvisningen i stabsmøtet alltid er lik det skjermen viser.
- Arrangementer med `utkast:true` venter på godkjenning: de vises i forhåndsvisningen, men ikke på skjermen.

## Regler for runden

Står i `REGLER` øverst i rundekoden i `kilde/motor.js`. De bygger på rapporten «Infoskjerm i våpenhuset i Byåsen kirke: anbefalinger for plakater og karusell» (november 2026). Vi bruker den øvre grensen av anbefalingene.

- Høyst 8 plakater og 90 sekunder per runde.
- 10 sekunder for en vanlig plakat, 12 for samlesider, programlister og plakater med QR-kode.
- Overskrift ≤ 7 ord, hele plakaten ≤ 20 ord (klokkeslett og tall telles ikke). Sjekkes med `node sjekk.js`.
- Samlesider: høyst 5 linjer, 3 uker fram (konserter 6 uker). Vises bare når de har noe som ikke allerede har egen plakat. «Byåsen kirke» som sted utelates i linjene.
- Egen plakat fra 3 uker før (konserter 6 uker). Inntil tre får fast plass.
- Prioritet: gudstjenester (alltid med), egen plakat 1, påmelding, barn, møteplasser, egen plakat 2, konserter, egen plakat 3.
- Siste plass går alltid på omgang mellom resten, ny for hver runde.
- Tidskritisk (arrangementer og påmeldingsfrister de neste 8 dagene) står i hver runde. Trengs det, går runden opp til 10 plakater og 120 sekunder. Holder ikke det, samles arrangementene de neste 8 dagene uten egen plakat på «Denne uka i kirka».
- Flere påmeldinger kan vises samtidig.
- Faste, gjentakende ting får fast innhold uten dato (`neste:` henter neste dato fra kalenderen).
