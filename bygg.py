"""Bygger infoskjermens sider fra kilde/.

  index.html                 skjermsiden (GitHub Pages, vises i våpenhuset)
  gjennomgang/index.html     gjennomgangssiden for stabsmøtet (publiseres som Claude-artefakt)
  plakater.html              oversikt over alle plakater og når de etter planen vises (GitHub Pages)

Begge får samme plakatmal (kilde/skjerm.css) og samme plakatkode (kilde/motor.js),
så forhåndsvisningen i stabsmøtet alltid er lik det skjermen viser.
"""
import os
import shutil

HER = os.path.dirname(os.path.abspath(__file__))


def les(navn):
    with open(os.path.join(HER, "kilde", navn), encoding="utf-8") as f:
        return f.read()


def bygg(mal, ut):
    deler = {
        "{{FARGER}}": les("farger.css"),
        "{{CSS}}": les("skjerm.css"),
        "{{QR}}": les("qrcode.html"),
        "{{MOTOR}}": les("motor.js"),
    }
    tekst = les(mal)
    for nokkel, verdi in deler.items():
        if nokkel not in tekst:
            raise SystemExit(f"{mal} mangler {nokkel}")
        tekst = tekst.replace(nokkel, verdi)
    sti = os.path.join(HER, ut)
    os.makedirs(os.path.dirname(sti) or HER, exist_ok=True)
    with open(sti, "w", encoding="utf-8") as f:
        f.write(tekst)
    print("skrev", ut, len(tekst), "tegn")


bygg("skjerm.html", "index.html")
bygg("gjennomgang.html", "gjennomgang/index.html")
bygg("plakater.html", "plakater.html")

# Bilder som plakatene bruker, må ligge ved siden av begge sidene
for bilde in ["nms-bilde.jpg"]:
    shutil.copyfile(os.path.join(HER, bilde), os.path.join(HER, "gjennomgang", bilde))
