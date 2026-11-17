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

- Høyst seks plakater, ti sekunder hver (én runde er høyst ett minutt).
- Egen plakat for de to nærmeste arrangementene, fra 14 dager før (konserter 21).
- Samlesider: gudstjenester 3 uker fram, barn og møteplasser 4 uker, konserter 6 uker. En samleside vises bare når den har noe som ikke allerede har egen plakat.
- Ett påmeldingsoppslag om gangen.
- Prioritet når det er for mange: gudstjenester, nærmeste egne plakat, påmelding, barn, møteplasser, egen plakat nr. 2, konserter, fast innhold.
