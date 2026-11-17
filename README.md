# Infoskjerm Byåsen kirke

Testversjon av infoskjermen i våpenhuset. Siden vises på Samsung-skjermen via Samsung VXT som nettinnhold (Web URL).

Innholdet er hentet fra den offentlige kalenderen på kirken.no. Dette er en prototype.

## Slik er det bygget

- `kilde/motor.js`: plakatkoden og arrangementslista. Det er her innholdet endres.
- `kilde/skjerm.css`: plakatmalen (farger, typografi, layout).
- `bygg.py`: bygger `index.html` (skjermen) og `gjennomgang/index.html` (gjennomgangssiden for stabsmøtet) fra de samme filene, så forhåndsvisningen i stabsmøtet alltid er lik det skjermen viser.
- Arrangementer med `utkast:true` venter på godkjenning: de vises i forhåndsvisningen, men ikke på skjermen.
