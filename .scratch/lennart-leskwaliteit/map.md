# Map: Lennart leskwaliteit → skill → EC go/no-go

Labels: `wayfinder:map`

## Destination

Skill(s) voor Lennart-toetslessen zijn aangescherpt met harde regels die de Grieks-fouten blokkeren (volledige rijtjes ev+mv; leerbare puntgewijze opsomming i.p.v. verhaal), plus een go/no-go-checklist om Praktische Economie H2 §1–4 **zonder PDF** te mogen bouwen. Daarna is de weg vrij om `/maaktoets` voor EC te draaien — dat bouwen zelf is niet deel van deze kaart.

**Status:** destination bereikt (tickets 01–05 resolved; `maaktoets` geïmplementeerd). EC-bouwen = handoff buiten deze kaart.

## Notes

- Domain: School-repo toetsvoorbereiding Lennart (3 gym).
- Skills per sessie: `wayfinder`, `grilling`, `domain-modeling`; bij skill-edit `writing-for-agents` + `.cursor/skills/maaktoets`.
- Tracker: local-markdown (`.scratch/`).
- Preferences: plan/decide first; geen EC-lessen bouwen tot destination klaar; geen illegale boekbronnen; Grieks herschrijven = out of scope.
- **`teach` terughoudend:** generieke skill onaangeroerd; School-regels in geïntegreerde `maaktoets`.
- Context: toetsdatum n.v.t.; EC-PDF niet beschikbaar; feedback Grieks = rijtjes/format.

## Decisions so far

- [Diagnose Grieks-lessen](issues/01-diagnose-grieks-lessen.md) — Ev-only/deferral = naamval-lidwoorden (`0012`); narratief = AK-diepte/anti-bullet + teach; fix eerst in repo-`maaktoets`.
- [Leerformaat-acceptatiecriteria](issues/02-leerformaat-acceptatiecriteria.md) — Volledig paradigma in les+reference; memoriseerbaar = tabel/lijst; proza alleen mechanisme; zelfde poort taal+EC.
- [Welke skills patchen](issues/03-welke-skills-patchen.md) — Integratie in `maaktoets` als enige School-entrypoint; teach upstream onaangeroerd; School wint bij conflict.
- [Skill-regels specificeren](issues/04-skill-regels-specificeren.md) — Full paradigm, memorization format, anti-bullet scoped, book-deferral A/B, geleerde fout Grieks — in `maaktoets`.
- [EC go/no-go zonder PDF](issues/05-ec-gono-go-zonder-pdf.md) — GO bij ≥2 bronnen + complete tabellen + geen half-deferral; anders NO-GO.

## Not yet specified

- Of Latijn-bundel dezelfde post-mortem krijgt (na skill-fix; buiten destination).
- Exacte eerste EC-sessie (welke les eerst) — handoff bij `/maaktoets`.

## Out of scope

- Herschrijven van bestaande Grieks-HTML-lessen (leren vooruit; fix zit in skill).
- Bouwen van EC H2-lessen (handoff ná deze kaart).
- Illegaal downloaden / scrapen van Praktische Economie PDF.
- Structurele wijzigingen aan upstream `teach`.
