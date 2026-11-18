"""Tegner plakater fra den bygde skjermsiden, for å sjekke dem før de legges fram.

  python3 verktoy/plakat.py 2026-11-18 note:julemiddag=/tmp/jm.png feat:lian=/tmp/lian.png
  python3 verktoy/plakat.py --runde 2026-11-18 /tmp/runde     (hele runden: /tmp/runde0.png ...)

Kjør python3 bygg.py først. Krever playwright (pip install playwright --break-system-packages;
python3 -m playwright install chromium hvis Chrome ikke finnes).
"""
import asyncio, os, shutil, sys
from playwright.async_api import async_playwright

ROT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SIDE = "file://" + os.path.join(ROT, "index.html")


async def main():
    args = sys.argv[1:]
    async with async_playwright() as p:
        chrome = shutil.which("google-chrome") or shutil.which("chromium")
        b = await p.chromium.launch(executable_path=chrome) if chrome else await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 1600, "height": 900})
        await pg.goto(SIDE)
        await pg.wait_for_timeout(500)
        if args[0] == "--runde":
            dato, prefiks = args[1], args[2]
            n = await pg.evaluate("""(d)=>{var a=d.split('-');window._r=Skjerm.build(new Date(+a[0],+a[1]-1,+a[2],12),0);return window._r.slides.length}""", dato)
            print("plakater i runden:", n)
            for i in range(n):
                await pg.evaluate("(i)=>{var box=document.getElementById('slides');box.innerHTML=window._r.slides[i];box.firstElementChild.classList.add('on')}", i)
                await pg.wait_for_timeout(700)
                await pg.locator("#stage").screenshot(path=f"{prefiks}{i}.png")
        else:
            dato = args[0]
            for par in args[1:]:
                k, f = par.split("=")
                await pg.evaluate("""([k,d])=>{var a=d.split('-');var h=Skjerm.slide(k,new Date(+a[0],+a[1]-1,+a[2],12));
                  var box=document.getElementById('slides');box.innerHTML=h;box.firstElementChild&&box.firstElementChild.classList.add('on');}""", [k, dato])
                await pg.wait_for_timeout(900)
                await pg.locator("#stage").screenshot(path=f)
                print("skrev", f)
        await b.close()

asyncio.run(main())
