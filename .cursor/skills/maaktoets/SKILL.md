---
name: maaktoets
description: >
  Maak uitleg- en oefenlessen voor middelbare schoolvakken van Lucie (4 VWO)
  en Lennart (3 gymnasium). Gebruik bij /maaktoets, MaakToets, toetsvoorbereiding,
  of wanneer de gebruiker een boek+hoofdstuk/paragraaf opgeeft voor uitlegpagina's
  met visuals en oefeningen. School-entrypoint: integreert teach-workspace
  conventies met School-toetsregels; patch teach niet voor School-format.
disable-model-invocation: true
argument-hint: "kind | vak | @boek-alias | H… §…"
---

# MaakToets

Doel: toetsvoorbereiding voor Lucie (4 VWO) of Lennart (3 gymnasium). Output =
teach-workspace lessen (`./lessons/<Vak>/*.html`) + reference + boeken-index.
Vakmap = afkorting of korte naam (`AK`, `Grieks`, `WIS`, `EC`, …).

## Entrypoint (integratie)

Deze skill is de **enige School-entrypoint** voor lesbouw. Ze combineert:

- **Teach-workspace conventies** (MISSION-format, `lessons/`, `assets/`,
  `reference/`, RESOURCES, learning-records, glossary-discipline) — zie
  `~/.claude/skills/teach/SKILL.md` als naslag voor die infrastructuur.
- **School-specifieke** kind/vak-routing, leerboek-resolutie, toetsdiepte,
  leerformaat en book-deferral-regels (dit bestand).

**Conflictregel:** bij botsing tussen teach (Tufte-proza, “kort”, …) en dit
bestand **wint dit bestand**. **Patch `teach` niet** voor School-format —
`teach` blijft generiek.

Workspace-root = deze School-repo.

## Inputs (parse uit de user-query)

1. **Kind:** Lucie | Lennart (verplicht; vraag als onduidelijk)
2. **Vak:** afkorting of naam (AK, WIS, EC, …)
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
   - Zonder tekstbron: zie **Book-deferral** hieronder (niet half leveren).
5. Nooit het volledige leerboek in chat of in lessons plakken. Citeer kort
   (leerdoelen/begrippen); geen pagina’s kopiëren.

### Book-deferral (zonder PDF)

“Controleer tegen je boek” mag **spelling, accenten, opdrachtnummers, exacte
boekcijfers** corrigeren — **niet** een ontbrekende helft van een leerlijst
vervangen.

Zonder PDF kies **één**:

- **(A) GO:** lever complete, publiek-verifieerbare must-know tabellen/lijsten
  in les + reference (≥2 legale bronnen bij twijfel); markeer alleen
  cijfers/opdrachtnummers als “check boek”.
- **(B) NO-GO:** stop en vraag het boek — als §-indeling/begrippen conflicteren,
  of de toets boek-specifieke opgaven/cijfers eist die niet publiek zijn.

Verboden: half paradigma / half matrix + “check je boek” voor de ontbrekende
rijen.

### 3. Hoofdstuk / paragraaf analyseren

Uit het lokale boek (of metadata + publieke inhoudsopgaven):

- Leerdoelen per paragraaf
- Kernbegrippen → `reference/<slug>-begrippen.html` cheat sheet voor de toets;
  promote naar `GLOSSARY.md` pas na bewijs van begrip (teach-regel)
- Basisboek-koppelingen (De Geo: B-nummers) indien zichtbaar
- Toetsverwachting: definities, oorzaak-gevolg, kaartlezen, diagram, casus,
  **uit-het-hoofd-rijtjes/matrices**

Schrijf analyse kort in `NOTES.md`.

### 4. Lesstructuur (eerste pass)

Maak **meerdere lessen** (één kernidee per les), niet één megapagina.
Nummering: volgende `lessons/<Vak>/NNNN-….html` (per vak apart doornummeren).
Relatieve paden vanuit de les: `../../assets/`, `../../reference/`, `../../index.html`.

**Diepte (schooltoets ≠ teaser):** “Kort” bij teach = één idee per les, **niet**
oppervlakkig. Per paragraaf-les mik op ongeveer **2×** de dunne schetsversie
*voor mechanisme-stof* (AK-processen, EC marktwerking, …):

- Waarom/hoe-keten (oorzaak → mechanisme → gevolg), niet alleen labels
- Richtingen en herkomst waar relevant (N/Z/O/W; Z→N zeestroom; etc.)
- Contrast of misconceptie (“zeestroom ≠ wind”)
- Modeltoetszin + ≥3 quizvragen
- Figuur met volledige legenda (zie §5)

**Memoriseerbare stof** (paradigma’s, lidwoorden, conjugaties, begrippen-
definities, marktvormen-matrix, kernformules): zie **Leerformaat** — diepte =
complete scanbare tabel, niet extra verhaal.

Aanbevolen bundle per toets-scope:

1. Overzicht / routekaart
2. Per paragraaf-cluster: uitleg + visual(s) + quiz
3. Integratieles: gemengde oefenvragen (interleaving)
4. Reference: begrippenkaart + must-know diagrammen/tabellen (**compleet**)

Elke les:

- Teach-workspace HTML/CSS + School-diepte/leerformaat hierboven
- Link naar `assets/` (gedeelde CSS verplicht)
- Primary source = relevante boekparagraaf + beste externe bron
- Reminder: stel vervolgvragen aan de agent
- Quizopties: gelijke woord-/tekenlengte (geen antwoordhints)
- Distractors: elke foute optie = typische misconceptie of naburig begrip uit
  dezelfde stof; absurde/onwaarschijnlijke opties verboden (check: “zou iemand
  die half geleerd heeft dit serieus kiezen?”)
- Begrippenspel (match/koppel/uitsluiten): **alleen** als de les zich leent —
  veel verwisselbare labels/definities. Skip bij mechanisme-/kaart-/casuslessen;
  daar volstaat toepassingsquiz

### Leerformaat (harde poort)

1. **Full paradigm / complete leerlijst:** alles wat de toets uit het hoofd
   vraagt (ww-personen ev+mv, imperativus ev+mv, lidwoorden alle naamvallen
   ev+mv, declinaties, EC-marktvormen 2×2, kernformules, …) staat **compleet**
   in de les **én** in `reference/`. Geen “alleen enkelvoud + check boek”.
2. **Primair formaat:** memoriseerbare stof = scanbare **tabel of puntlijst**.
   Proza alleen voor mechanisme (waarom/hoe); max. korte omlijsting
   (≤1 korte alinea + optioneel 1 figuur rond de tabel).
3. **Verboden als hoofddrager van grammatica/definities:** verhaalcontext
   (Troje, Romulus, …) i.p.v. het rijtje; GPS-lijstjes met alleen ev.
4. Zelfde poort voor **taalvakken en EC** (en andere vakken met must-know
   matrices): leerbaar = lijst/tabel eerst.

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

## EC go/no-go zonder PDF (Praktische Economie e.d.)

Voor economie (en vergelijkbare vakken) **zonder** lokale PDF — **GO** alleen als:

1. §-titels + begrippen geverifieerd via ≥2 legale publieke bronnen.
2. Les + reference bevatten **complete** must-know tabellen (geen half).
3. Geen boekpagina’s gekopieerd; wel “check cijfers/opdrachtnummers tegen boek”.
4. Leerformaat-poort gevolgd.
5. `BOEKEN.md` entry met metadata + `Status: ontbreekt`.

Anders **NO-GO**: stop, vraag boek.

## Kind-profielen (defaults)

| Kind    | Niveau        | Notities |
|---------|---------------|----------|
| Lucie   | 4 VWO         | abstractie ok; examengericht |
| Lennart | 3 gymnasium   | onderbouw vwo; concreet + visual eerst; memoriseerbare stof = tabel eerst |

Lees `kids/<kind>.md` voor voorkeuren.

## Anti-patronen

- Heel hoofdstuk in één HTML
- Parametric “ik weet wat er in De Geo staat” zonder boek of bron
- Illegale downloads
- Volledige boektekst in lessen
- Cards/dashboard-rommel; één idee per sectie
- Bullet-lijst met alleen begrippen **zonder mechanisme** bij **oorzaak-gevolg**-stof
  (AK/EC-processen: “Humboldt = koud” zonder Z→N + herkomst). *Uitzondering:*
  kale complete paradigma-/begrippen-/matrix-tabellen voor memoriseerbare stof
  zijn **vereist**, geen anti-patroon.
- Half paradigma / alleen ev / “check boek” voor ontbrekende rijen
- Verhaal als hoofddrager van grammatica of definities
- SVG-paden zonder pijl, label of legenda (leerling raadt: wind of water?)
- Wind en zeestroom visueel identiek
- Foute quizopties die te absurd zijn om serieus te kiezen
- Begrippenspel forceren in een les die vooral mechanisme/kaart/casus is
- `teach` upstream patchen voor School-format

## Geleerde fouten

Oorzaak → regel:

| Oorzaak | Regel |
|---------|--------|
| Teach “kort” te letterlijk → te dun voor toets | Diepte-eis in §4 (~2× schets; keten + richting + quiz≥3) voor mechanisme-stof |
| Schets-SVG afgeraffeld | SVG-checklist in §5 |
| Zeestroom/wind niet onderscheiden | Verplichte legenda + stijlcontrast |
| Richting niet gemaakt | N/Z op kaart; Humboldt Z→N expliciet in tekst én pijl |
| Foute antwoorden te onwaarschijnlijk → gokbaar | Distractors = misconcepties / naburige begrippen; absurde opties verboden (§4) |
| Begrippen niet speels geoefend waar dat past | Begrippenspel alleen als les zich leent; anders skip (§4) |
| Grieks: lidwoord-GPS alleen ev + “check boek” voor mv | Full paradigm in les + reference; book-deferral demoted (Book-deferral + Leerformaat) |
| AK-diepte/anti-bullet → grammatica als verhaal i.p.v. dreunlijst | Anti-bullet scoped; memoriseerbare stof = tabel eerst (Leerformaat) |
| Teach-proza botst met School-leerformaat | School-entrypoint: dit bestand winnen; teach niet patchen (Entrypoint) |
