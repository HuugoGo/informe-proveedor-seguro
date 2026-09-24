#!/usr/bin/env python3
"""
Genera un PDF por informe a partir de las paginas HTML de este proyecto.

Uso:
    python export_pdf.py

Requiere: pip install playwright pypdf  (y python -m playwright install chromium)

Como funciona: cada informe ya es una presentacion tipo "deck" con una
regla @media print (en assets/css/presentation.css) que muestra todas las
laminas seguidas, una por pagina, ocultando la barra superior y la barra
de navegacion flotante. Este script solo sirve el proyecto por HTTP local,
abre cada capitulo con Chromium en modo impresion y exporta el PDF.
"""
import http.server
import socketserver
import threading
import pathlib
import sys

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).parent.resolve()
OUT_DIR = ROOT / "pdf"
PORT = 8935

REPORTS = [
    ("chapters/01-diagnostico-maria-elena.html", "Informe Maria Elena.pdf"),
    ("chapters/02-diagnostico-sierra-gorda.html", "Informe Sierra Gorda.pdf"),
]


def serve():
    handler = lambda *a, **kw: http.server.SimpleHTTPRequestHandler(*a, directory=str(ROOT), **kw)
    httpd = socketserver.TCPServer(("127.0.0.1", PORT), handler)
    httpd.serve_forever()


def main():
    OUT_DIR.mkdir(exist_ok=True)

    server_thread = threading.Thread(target=serve, daemon=True)
    server_thread.start()

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        for rel_path, out_name in REPORTS:
            print(f"-> {rel_path}")
            url = f"http://127.0.0.1:{PORT}/{rel_path}"
            page.goto(url, wait_until="networkidle")
            page.emulate_media(media="print")
            page.wait_for_timeout(300)

            out_path = OUT_DIR / out_name
            page.pdf(
                path=str(out_path),
                format="A4",
                print_background=True,
                margin={"top": "0", "bottom": "0", "left": "0", "right": "0"},
            )
            print(f"   OK -> {out_path}")

        browser.close()

    print("\nListo. PDFs en:", OUT_DIR)


if __name__ == "__main__":
    sys.exit(main())
