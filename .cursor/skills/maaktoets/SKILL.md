---
name: maaktoets
description: >
  Maak uitleg- en oefenlessen (via /teach) voor middelbare schoolvakken van
  Lucie (4 VWO) en Lennart (3 gymnasium). Gebruik bij /maaktoets, MaakToets,
  toetsvoorbereiding, of wanneer de gebruiker een boek+hoofdstuk/paragraaf
  opgeeft voor uitlegpagina's met visuals en oefeningen.
disable-model-invocation: true
argument-hint: "kind | vak | @boek-alias | H… §…"
---

# MaakToets

Doel: toetsvoorbereiding voor Lucie (4 VWO) of Lennart (3 gymnasium). Output =
teach-workspace lessen (`./lessons/*.html`) + reference + boeken-index.

Deze skill **delegeert lesbouw aan teach** (`~/.claude/skills/teach/SKILL.md`).
Volg teach voor MISSION, lessons, assets, RESOURCES, learning-records, glossary
van *vakbegrippen*. Deze skill voegt toe: kind/vak-routing, leerboek-resolutie,
hoofdstukanalyse, externe media, en toetsgerichte lesstructuur.

Workspace-root = deze School-repo.

## Inputs (parse uit de user-query)

1. **Kind:** Lucie | Lennart (verplicht; vraag als onduidelijk)
2. **Vak:** afkorting of naam (AK, WIS, …)
3. **Boek:** `@alias` uit `BOEKEN.md`, of vrije titel → match/update `BOEKEN.md`
4. **Scope:** hoofdstukken + paragrafen (bv. H3§1-3, H5§1,3)
5. **Deadline/toetsdatum** (optioneel) → zet in MISSION constraints

## Pipeline (strikt in deze volgorde)

### 1. Workspace check

- Lees `.cursor/TASK.md` (maak/update bij multi-step werk).
- Lees `NOTES.md`, `kids/<kind>.md`, bestaande `learning-records/`.
- Update of maak `MISSION.md` volgens teach MISSION-FORMAT: waarom = slagen
  voor deze toets; success = begrippen + toepassen; constraints = niveau + tijd.

### 2. Leerboek resolveren

1. Open `BOEKEN.md`. Zoek alias / titel / kind+vak.
2. Als entry bestaat met `Status: aanwezig` en lokaal pad: gebruik dat pad.
3. Zoek ook in `books/` (glob op titel/ISBN/kind).
4. Als **niet** aanwezig:
   - Zoek op internet alleen **legale** metadata: uitgever, ISBN, editie,
     inhoudsopgave, LRN·line / schoolplatform.
   - **Verboden:** torrents, shadow libraries, “gratis PDF”-sites, scrapen van
     betaalde leerboeken, downloaden zonder licentie.
   - Zet/update `BOEKEN.md` met metadata + `Status: ontbreekt`.
   - Vraag de gebruiker: plaats een legaal verkregen PDF/scan in
     `books/<kind>/…` of geef pad naar school-digitale toegang.
   - Zonder tekstbron: ga door met **publieke** bronnen (uitgever-info,
     schoolvideo’s, KNMI, CBS, betrouwbare uitleg) en markeer in de les
     “controleer tegen je boek”.
5. Nooit het volledige leerboek in chat of in lessons plakken. Citeer kort
   (leerdoelen/begrippen); geen pagina’s kopiëren.

### 3. Hoofdstuk / paragraaf analyseren

Uit het lokale boek (of metadata + publieke inhoudsopgaven):

- Leerdoelen per paragraaf
- Kernbegrippen → `reference/<slug>-begrippen.html` cheat sheet voor de toets;
  promote naar `GLOSSARY.md` pas na bewijs van begrip (teach-regel)
- Basisboek-koppelingen (De Geo: B-nummers) indien zichtbaar
- Toetsverwachting: definities, oorzaak-gevolg, kaartlezen, diagram, casus

Schrijf analyse kort in `NOTES.md`.

### 4. Lesstructuur via teach (eerste pass)

Maak **meerdere korte** lessen (één kernidee per les), niet één megapagina.
Nummering: volgende `lessons/NNNN-….html`.

Aanbevolen bundle per toets-scope:

1. Overzicht / routekaart
2. Per paragraaf-cluster: uitleg + 1 visual + korte quiz
3. Integratieles: gemengde oefenvragen (interleaving)
4. Reference: begrippenkaart + must-know diagrammen

Elke les:

- Teach-stijl (Tufte, kort, ZPD, retrieval practice)
- Link naar `assets/` (gedeelde CSS verplicht)
- Primary source = relevante boekparagraaf + beste externe bron
- Reminder: stel vervolgvragen aan de agent
- Quizopties: gelijke woord-/tekenlengte (geen antwoordhints)

### 5. Visuals (tweede pass)

- Hergebruik `assets/` (quiz, diagram-helpers). Nieuw = component in `assets/`.
- Visuals: 1 diagram = 1 mechanisme (geen decoratie).
- Open de eerste les in de browser indien mogelijk.

### 6. Externe uitlegbronnen

Zoek en noteer in `RESOURCES.md` + onderaan elke les:

- YouTube / Schooltv (titel + waarom)
- Officiële / educatieve sites
- Max 2–4 links per les, geannoteerd

### 7. Afronden

- Update `BOEKEN.md` als metadata/pad veranderde
- Update `RESOURCES.md` en `kids/<kind>.md`
- Update `.cursor/TASK.md`
- Zeg in chat: welke lessen, wat openstaat (boek?), volgende oefensessie

## Kind-profielen (defaults)

| Kind    | Niveau        | Notities |
|---------|---------------|----------|
| Lucie   | 4 VWO         | abstractie ok; examengericht |
| Lennart | 3 gymnasium   | onderbouw vwo; concreet + visual eerst |

Lees `kids/<kind>.md` voor voorkeuren.

## Anti-patronen

- Heel hoofdstuk in één HTML
- Parametric “ik weet wat er in De Geo staat” zonder boek of bron
- Illegale downloads
- Volledige boektekst in lessen
- Cards/dashboard-rommel; één idee per sectie
