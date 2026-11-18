# PowerPoint for staben

`lag.js` bygger «Infoskjermen i våpenhuset.pptx» med pptxgenjs. Bildene av plakatene ligger i `img/`.

    cd presentasjon
    APPLY_THEME=<sti til pptx-skillens scripts/apply_theme.js> node lag.js

`norsk.py` kjøres av `lag.js` til slutt og setter språket til norsk (nb-NO), så stavekontrollen
i PowerPoint ikke setter røde streker under teksten. Nye bilder av plakatene lages med
`python3 ../verktoy/plakat.py <dato> <nøkkel>=img/<fil>.png`.
