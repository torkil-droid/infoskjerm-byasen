# Infoskjerm Byåsen kirke

Testversjon av infoskjermen i våpenhuset. Siden vises på Samsung-skjermen via Samsung VXT som nettinnhold (Web URL).

Innholdet er hentet fra den offentlige kalenderen på kirken.no. Dette er en prototype.

## Slik er det bygget

- `kilde/motor.js`: plakatkoden og arrangementslista. Det er her innholdet endres.
- `kilde/skjerm.css`: plakatmalen (farger, typografi, layout).
- `bygg.py`: bygger `index.html` (skjermen) og `gjennomgang/index.html` (gjennomgangssiden for stabsmøtet) fra de samme filene, så forhåndsvisningen i stabsmøtet alltid er lik det skjermen viser.
- Arrangementer med `utkast:true` venter på godkjenning: de vises i forhåndsvisningen, men ikke på skjermen.

## Regler for runden

Står i `REGLER` øverst i rundekoden i `kilde/motor.js`:

- Seks faste plasser etter prioritet: gudstjenester (alltid med), nærmeste egne plakat, påmelding, barn, møteplasser, egen plakat nr. 2, konserter.
- Én plass til som går på omgang mellom resten, med nytt innhold for hver runde. Er det ledig plass, får resten fast plass i stedet.
- Samlesider vises 10 sekunder, andre plakater 8. En runde tar omtrent ett minutt.
- Egen plakat fra 14 dager før (konserter 21).
- Samlesider: gudstjenester 3 uker fram, barn og møteplasser 4 uker, konserter 6 uker. En samleside vises bare når den har noe som ikke allerede har egen plakat.
- Faste, gjentakende ting får fast innhold uten dato (`neste:` henter neste dato fra kalenderen).
