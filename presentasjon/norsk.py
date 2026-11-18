# Setter norsk bokmål som språk på all tekst i en .pptx (pptxgenjs skriver en-US)
import sys, zipfile, shutil, os
src = sys.argv[1]; tmp = src + ".tmp"
with zipfile.ZipFile(src) as zin, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
    for it in zin.infolist():
        data = zin.read(it.filename)
        if it.filename.endswith(".xml"):
            data = data.replace(b'lang="en-US"', b'lang="nb-NO"')
        zout.writestr(it, data)
shutil.move(tmp, src)
