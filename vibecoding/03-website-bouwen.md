# 03 — Website bouwen: kies je vibe (stack of vanilla)

Doel: bouw een kleine website en laat de agent helpen met structuur, styles en iteraties. Twee routes:
- Stack‑route (bijv. Next.js/React, Node/Express, Drupal).
- Zero‑install: pure HTML/CSS/JS.

## Route A — Bekende stack (Next.js voorbeeld)
Voorwaarden: Node.js geïnstalleerd. In je tool/agent aangeven dat het package‑installs mag voorstellen maar jij bevestigt.

Aanpak (met agent):
1) Prompt: “Scaffold een minimal Next.js app met 1 pagina ‘Vibecoding’. Voeg een basic layout, een ‘Try the vibe’ knop en een About‑sectie toe. Succes: start script werkt, pagina styled, mobiel oké. Plan → implementatie → diffs → run‑instructies.”
2) Laat de agent bestanden creëren (`package.json`, `app/` of `pages/`, `styles/`).
3) Vraag om 1 component (Hero) en 1 eenvoudige server action of API route (bijv. `GET /api/ping`).
4) Itereer op styling (light/dark toggle) en accessibility (landmarks, aria‑labels).
5) Vraag om een kleine e2e‑check (Playwright snippet) zonder te installeren, alleen als referentie.


## Route B — Zero‑install (vanilla)
Laat de agent een minimal site aanmaken met 3 files en simpele styling.

Suggestie‑prompt:
“Maak een minimal website met `index.html`, `styles.css`, `app.js`. Hero met titel ‘Vibecoding Workshop’, 2 CTA‑knoppen, responsive grid voor 3 kaarten (Tools, Oefeningen, MCP’s). Geen externe fonts. Voeg een lichte/donkere modus toe met `prefers-color-scheme` en een toggle. Toon diffs en leg in 3 bullets uit hoe ik deze lokaal open.”

Bonusopdrachten (kies er 1):
- Voeg een eenvoudige router toe (hash‑based) en 2 ‘pagina’s’ (About, Contact).
- Implementeer een component‑achtige structuur met template strings (zonder bundler).
- Laat de agent 1 accessibility‑check doen (tab flow + contrast) en suggesties geven.

## Bonusopdracht — Onbekende stack (met dependency‑check)
Doel: maak een mini‑app in een stack die je nog niet gebruikt. Houd de agent onder strikte controle zodat er geen ongewenste dependencies of globale installs plaatsvinden.

Aanpak (stuur dit als constraints mee in je prompt):
- Geen netwerk/deps installeren zonder expliciet akkoord. Eerst een plan + lijst met dependencies tonen (requirements.txt, Cargo.toml, build.gradle, enz.).
- Gebruik waar mogelijk standaardbibliotheek of een geïsoleerde omgeving (Python `venv`, Rust via `cargo` zonder globale tools, Java met minimale `javac`/`jar`).
- Toon diffs/patches en wacht op akkoord vóór run/validatie.

Voorbeelden om uit te kiezen (laat de agent er 2 voorstellen, kies 1):
- Python: een kleine CLI of mini‑webserver met standaardlib (bijv. `http.server`) of, met akkoord, een minimale Flask‑app in een `venv` met gepinde versies.
- Rust: `cargo new vibecli` met 1 subcommand en kleurige output. Alleen crates toevoegen na jouw akkoord (pin versies in `Cargo.toml`).
- C: simpele `make`‑based build met 1 `.c` file die “Hello Vibe” print of een poort opent en een response terugstuurt.
- Java: minimale `javac` build (of een piepkleine HTTP‑server met `com.sun.net.httpserver`), vermijd zware frameworks tenzij jij akkoord geeft.

Acceptatiecriteria:
- App start lokaal met een enkel commando (`python3 app.py`, `cargo run`, `make && ./app`, of `javac Main.java && java Main`).
- Geen globale installs; alle dependencies zijn expliciet en gepind (of helemaal geen).
- De agent heeft diffs getoond en jij hebt ze goedgekeurd vóór het draaien.
- Korte README‑instructies zijn aanwezig met run/stop en eventuele flags.

## Succescriteria
- De site draait lokaal (of is openbaar als statische files).
- Er is 1 feature‑iteratie gedaan o.b.v. agent‑suggesties.
- Je hebt 3 notities: wat de agent goed deed, wat je zelf stuurde, wat je volgende keer anders wil prompten.

---

Volgende: 04 — MCP’s: context en tools koppelen via Model Context Protocol.
