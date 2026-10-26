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

Maak **meerdere lessen** (één kernidee per les), niet één megapagina.
Nummering: volgende `lessons/NNNN-….html`.

**Diepte (schooltoets ≠ teaser):** “Kort” bij teach = één idee per les, **niet** oppervlakkig.
Per paragraaf-les mik op ongeveer **2×** de dunne schetsversie:

- Waarom/hoe-keten (oorzaak → mechanisme → gevolg), niet alleen labels
- Richtingen en herkomst waar relevant (N/Z/O/W; Z→N zeestroom; etc.)
- Contrast of misconceptie (“zeestroom ≠ wind”)
- Modeltoetszin + ≥3 quizvragen
- Figuur met volledige legenda (zie §5)

Aanbevolen bundle per toets-scope:

1. Overzicht / routekaart
2. Per paragraaf-cluster: uitleg + visual(s) + quiz
3. Integratieles: gemengde oefenvragen (interleaving)
4. Reference: begrippenkaart + must-know diagrammen

Elke les:

- Teach-stijl (Tufte, ZPD, retrieval practice) + schooltoets-diepte hierboven
- Link naar `assets/` (gedeelde CSS verplicht)
- Primary source = relevante boekparagraaf + beste externe bron
- Reminder: stel vervolgvragen aan de agent
- Quizopties: gelijke woord-/tekenlengte (geen antwoordhints)

### 5. Visuals (tweede pass) — harde checklist

- Hergebruik `assets/` (quiz, diagram-helpers, `.legend`). Nieuw = component in `assets/`.
- Visuals: 1 hoofddiagram = 1 mechanisme (geen decoratie).
- Open de les en **lees het diagram als leerling**: elk pad moet begrijpelijk zijn zonder de bodytekst.

**SVG mag niet shippen als één van deze faalt:**

1. Elke lijn/pijl heeft een **label** (wat is het?) én een **pijlpunt** (welke kant?).
2. Geen “halve krommen” of open paden zonder einde/legenda.
3. **Verschillende media = verschillende stijl + legenda**, bv.:
   - zeestroom / water: dik, doorgetrokken, blauw
   - luchtstroom / wind: dun, gestippeld, andere kleur
4. Richtingsfeiten verifiëren (web/boek) vóór tekenen: Humboldtstroom = water **zuid → noord**; kaartschets toont N↑ Z↓.
5. `figcaption` noemt wat de leerling moet aflezen; optioneel `<desc>` voor toegankelijkheid.
6. Gebruik `.legend` uit `lesson.css` onder het figuur.

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
- Bullet-lijst met alleen begrippen, zonder mechanisme/richting (“Humboldt = koud” zonder Z→N + herkomst)
- SVG-paden zonder pijl, label of legenda (leerling raadt: wind of water?)
- Wind en zeestroom visueel identiek

## Geleerde fouten (feedback Lennart AK §3.1)

Oorzaak → regel:

| Oorzaak | Regel |
|---------|--------|
| Teach “kort” te letterlijk → te dun voor toets | Diepte-eis in §4 (~2× schets; keten + richting + quiz≥3) |
| Schets-SVG afgeraffeld | SVG-checklist in §5 |
| Zeestroom/wind niet onderscheiden | Verplichte legenda + stijlcontrast |
| Richting niet gemaakt | N/Z op kaart; Humboldt Z→N expliciet in tekst én pijl |
