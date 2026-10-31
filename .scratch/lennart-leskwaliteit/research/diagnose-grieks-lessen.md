# Diagnose: Lennart Grieks-lessen vs gebruikersfeedback

Sources: `lessons/Grieks/0008`–`0013`, `reference/grieks-argo-11-14-begrippen.html`, `.cursor/skills/maaktoets/SKILL.md`, `~/.claude/skills/teach/SKILL.md` (maaktoets-target), `kids/lennart.md`, `NOTES.md` (GR-analyse + AK-feedback).

## Summary

1. Feedback (1) “rijtjes alleen enkelvoud” klopt **niet** voor de ww-paradigmata λύω / εἰμί: die staan in les + reference met alle 6 personen (ev+mv).
2. Feedback (1) klopt **wel** voor **naamval/lidwoord**: les `0012` geeft alleen enkelvoudige lidwoord-GPS en schuift “volledige rijtjes” door naar het boek; de reference heeft geen lidwoord-/declinatieparadigma (mv ontbreekt).
3. Dat doorgeven is geen ongelukje maar beleid uit maaktoets §2: zonder PDF mag je verder met publieke bronnen en **“controleer tegen je boek”** markeren — gebruikt als escape hatch i.p.v. complete leerbare tabellen.
4. Feedback (2) “te verhalend” klopt als lesvorm: prose + Troje-framing + modeltoetszinnen + mechanismediagrammen; memoriseerbare puntlijsten zijn ondergeschikt (behalve de ww-tabellen).
5. Die narratieve diepte is **afgedwongen** door maaktoets na AK-feedback: diepte ≈2× schets, “keten niet alleen labels”, anti-patroon tegen bullet-lijsten zonder mechanisme.
6. Teach (upstream) versterkt dat: “beautiful” / Tufte / korte prose-lessen; geen klassieke-talen regel voor volledige paradigma’s of dreunlijsten.
7. Root cause: AK-geografie-regels overgegeneraliseerd naar grammatica; geen harde “full paradigm (ev+mv / alle naamvallen)”-eis; boek-deferral toegestaan als inhoudsvervanging.
8. Skill-fix hoort in **repo-`maaktoets`** (klassieke-talen + toetsformat); teach alleen als je upstream “reference = complete paradigm tables” wilt; geen HTML-rewrite in scope.

## Evidence table

| File | Fail type | Wat faalt | Bewijs (quote / sectie) |
|------|-----------|-----------|-------------------------|
| `lessons/Grieks/0012-naamval-in-tekst-troje.html` | **ev-only** + book-deferral | Lidwoorden alleen ev; mv/paradigma → boek | §3 “Lidwoorden als GPS”: `ὁ / ἡ / τό → vaak nominativus ev` … `τῷ / τῇ / τῷ → dativus ev`; daarna: *“Controleer de volledige rijtjes tegen je hulpboek — dit is de snelle toetsstrategie.”* |
| `reference/grieks-argo-11-14-begrippen.html` | **ev-only** (gap) + book-deferral | Naamval = functiedefs, geen tabel ev+mv; lede defer | Lede: *“Controleer spelling/accenten tegen je hulpboek.”*; §“Naamval (snel)” = alleen Nominativus/Acc/… dd’s, geen οἱ/αἱ/τά e.d. |
| `lessons/Grieks/0008-toetsroute-argo-les11-14.html` | book-deferral | Scope zonder boek → callout | Callout: *“Controleer tegen je boek (`@argo-1`). PDF nog niet in de repo…”* |
| `lessons/Grieks/0009` / `0010` / `0011` / `0013` sources | book-deferral (habit) | Elke les eindigt met boek-check | Bronnenregel: *“Primair: … — controleer tegen je boek.”* |
| `lessons/Grieks/0009-indicativus-praesens.html` | *(niet ev-only)* | λύω-rijtje **wel** 1e–3e ev **én** mv | Tabel §2: 1e ev … 3e mv `-ουσι(ν)` |
| `lessons/Grieks/0011-eimi-en-modi-kiezen.html` | *(niet ev-only)* | εἰμί ind. **wel** ev+mv; imp ev+mv | Tabel §1 + §2 `ἴσθι` / `ἔστε` |
| `reference/grieks-argo-11-14-begrippen.html` | *(niet ev-only voor ww)* | λύω + εἰμί tabellen compleet 6 personen | Tabellen “λύω — ind. praes.” / “εἰμί” |
| `lessons/Grieks/0008-….html` | **narrative** | Route als Troje-verhaalcontext | Lede: *“Vier teksten over Troje…”*; §“Teksten (context)” = plotlijst Agamemnon/Hektor/… |
| `lessons/Grieks/0010-….html` | **narrative** | Modi via Troje-sfeer-proza i.p.v. alleen dreunlijst | §3: *“Voorbeeld (Troje-sfeer): ὁ Ἀχιλλεὺς ἐθέλει…”*; §4 modeltoetszin over Agamemnon |
| `lessons/Grieks/0011-….html` | **narrative** | Keuze via beslisboom + verhaalzin | §3: *“In tekst 11: ‘je zegt dat je de leider bent’…”* |
| `lessons/Grieks/0012-….html` | **narrative** | Waarom-proza + zin-SVG i.p.v. volledige declinatietabel | §1 “Waarom dit bij les 11–14?”; §4 modeltoetszin Achilles/Agamemnon |
| `lessons/Grieks/0009-….html` | **mixed** | Heeft wel rijtjestabel, omringd door bouw-proza + misconceptie-proza | §1 bouwstam + SVG; §2 tabel; §4 modeltoetszin Achilles |
| `NOTES.md` (GR-analyse) | other (intent) | Naamval bewust “meelezen”, niet “volledig paradigma dreunen” | *“Naamval meelezen (nom/acc/voc/gen/dat) zodat onderwerp ≠ LV”* — geen eis volledige lidwoord-mv |
| `kids/lennart.md` | other (scope pointer) | Bundel = 0008–0013 + reference | *“Eerdere bundel Grieks: `lessons/Grieks/0008` … `0013` + `reference/grieks-argo-11-14-begrippen.html`”* |

## Skill gap analysis

### Wat maaktoets aanmoedigde / toeliet

| Skillregel | Effect op Grieks-bundel | Bron |
|------------|-------------------------|------|
| Zonder boek: publieke bronnen + markeer **“controleer tegen je boek”** | Inhoud die moeizaam zonder PDF is (volledige lidwoordrijtjes) werd **doorgeschoven** i.p.v. volledig geleverd | `maaktoets/SKILL.md` §2 stap 4 |
| **Diepte** ~2× schets: waarom/hoe-keten, niet alleen labels; modeltoetszin + quiz≥3 | Proza + mechanismediagram + verhaalachtige modelzin als default lesvorm | `maaktoets/SKILL.md` §4 |
| Anti-patroon: **“Bullet-lijst met alleen begrippen, zonder mechanisme”** | Verbiedt precies de puntgewijze dreunlijst die grammatica-memoriseren vraagt (tenzij je “mechanisme” toevoegt → meer narratief) | `maaktoets/SKILL.md` Anti-patronen |
| **Geleerde fouten (Lennart AK):** teach “kort” → te dun → diepte-eis | Overcorrectie van te-dunne AK-bullets naar te-rijke uitleg; geen uitzondering voor paradigma-vakken | `maaktoets/SKILL.md` Geleerde fouten; `NOTES.md` Feedback 2026-10-26 |
| Visuals / één mechanisme-diagram | SVG-framing (stam+uitgang, modi-jobs, naamval-rollen) i.p.v. printbare volledige paradigma-grids als hoofddish | `maaktoets/SKILL.md` §5 |
| Geen regel “volledig paradigma (ev+mv / alle naamvallen/geslachten) in les én reference” | Ev-only lidwoorden + book-deferral blijven checklist-compliant | Afwezig in hele `maaktoets/SKILL.md` |

### Wat teach (maaktoets-target) aanmoedigde

maaktoets delegeert expliciet naar `~/.claude/skills/teach/SKILL.md` (regel “Deze skill **delegeert lesbouw aan teach**”).

| Teach-regel | Effect | Bron |
|-------------|--------|------|
| Lesson **short**, **beautiful**, Think **Tufte** | Proza/essay-achtige lespagina’s; niet “rijtjesblok als primaire unit” | `teach/SKILL.md` Lessons |
| Knowledge first (low difficulty), then interactive skill practice | Uitlegblokken vóór quiz; memoriseerbare tabellen zijn optioneel, geen must | `teach/SKILL.md` Knowledge / Skills |
| Reference = compressed essence, printvriendelijk | Reference *kan* paradigma’s zijn, maar teach eist geen “complete paradigm coverage” | `teach/SKILL.md` Reference Documents |
| Primary source + citations | Versterkt “check boek / LessonUp” i.p.v. self-contained dreunmateriaal | `teach/SKILL.md` Lessons |

### Wat *niet* faalde t.o.v. feedback (1) voor ww

Indicativus- en εἰμί-rijtjes in `0009`, `0011` en de reference **bevatten meervoud**. Gebruikersclaim “rijtjes alleen enkelvoud” moet dus gelezen worden als: (a) **naamval/lidwoord**-rijtjes, en/of (b) het patroon “ontbrekende helft → check boek”, niet als feitelijke afwezigheid van mv in λύω/εἰμί.

## Recommended skill rules (proposed wording only — do not apply)

1. **Full paradigm (klassieke talen):**  
   *“Voor Grieks/Latijn: elk paradigma dat de toets vraagt (ww-personen, imperativus ev+mv, lidwoorden, adiectiva, relativa, …) staat **compleet** in les én reference — enkelvoud én meervoud (en alle relevante geslachten/naamvallen). ‘Controleer tegen je boek’ mag alleen spelling/accent/exacte boeknummers corrigeren, nooit een ontbrekende helft van het rijtje vervangen.”*

2. **Memorization format gate:**  
   *“Als de toetstaak = uit-het-hoofd-rijtje of begrippenlijst: primaire lesinhoud = scanbare tabel/lijst (puntgewijs). Proza/modelzin/SVG max. als korte omlijsting (≤1 korte alinea + 1 figuur). Verboden: Troje/Romulus-verhaal als hoofddrager van grammatica.”*

3. **Scope anti-bullet herijken:**  
   *“Anti-patroon ‘bullet zonder mechanisme’ geldt voor **oorzaak-gevolg**-stof (AK/EC). Voor paradigma-/declinatie-/conjugatiestof is een kale complete tabel **vereist**, geen overtreding.”*

4. **Book-deferral demote:**  
   *“Zonder PDF: ofwel (A) lever volledige publiek-verifieerbare paradigma’s in de les, ofwel (B) stop en vraag het boek — niet half leveren + ‘check je boek’ voor de ontbrekende rijen.”*

5. **Geleerde fout (na deze diagnose):**  
   *Oorzaak → regel:* naamval-GPS alleen ev + deferral; diepte-regels uit AK → narratief i.p.v. dreunlijst → regels 1–4 hierboven.

Canonical patch target (diagnose): **`.cursor/skills/maaktoets/SKILL.md`** eerst; teach alleen als reference-format upstream ook “complete tables” moet eisen.

## Sources (claim index)

- User feedback / ticket framing: `.scratch/lennart-leskwaliteit/issues/01-diagnose-grieks-lessen.md`, `map.md` Notes/Context
- Lessons: `lessons/Grieks/0008-toetsroute-argo-les11-14.html` … `0013-toets-mix-argo-11-14.html`
- Reference: `reference/grieks-argo-11-14-begrippen.html`
- Skills: `.cursor/skills/maaktoets/SKILL.md`; teach target `~/.claude/skills/teach/SKILL.md`
- Context: `kids/lennart.md`; `NOTES.md` (Analyse GR; Feedback AK 2026-10-26)
